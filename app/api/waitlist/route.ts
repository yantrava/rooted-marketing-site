import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// Waitlist capture endpoint. Validates the payload, then INSERTs into
// the waitlist_emails Supabase table. RLS on the table permits anon
// INSERT only — no read, no update, no delete from the client. Emails
// are UNIQUE-indexed; duplicate submissions return 200 so we don't
// leak which addresses are already on the list.
//
// Rate-limiting (audit item 12, 2026-05-23): the Cloudflare Free plan
// doesn't expose a Rate-Limit action in Custom Rules — only Block /
// Managed Challenge / Skip — so the actual counter lives here in-app.
// Cloudflare runs a Managed Challenge filter on this same path as an
// edge-layer bot filter (2-layer defense). When/if scale demands it,
// swap the in-memory Map for Upstash Redis or Vercel KV without any
// other code changes — the IP-keyed window stays the same.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sliding-window rate limit: at most RATE_LIMIT_MAX requests per
// RATE_LIMIT_WINDOW_MS per client IP. Marketing-site waitlist traffic is
// 1 submission per visit — 5/min is generous for humans, narrow for bots.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;

// Module-scoped Map keyed by IP → ring buffer of recent timestamps (ms).
// In-process state: lives only as long as the serverless function
// instance stays warm. After a cold start, each new instance starts
// empty — accepted tradeoff for a free-tier marketing endpoint. The
// edge-layer Managed Challenge (Cloudflare Custom Rule) catches the
// case where a botnet rotates IPs to defeat this counter.
const ipHits = new Map<string, number[]>();

// Drain stale entries opportunistically so the Map doesn't grow
// unboundedly on long-warm instances. Cheap: O(active IPs) per call.
function pruneStale(now: number) {
  // .forEach avoids needing --downlevelIteration on Map iterators.
  // Mutating the Map inside .forEach is safe in V8 (entries deleted
  // after the iterator has visited them are simply skipped).
  ipHits.forEach((timestamps, ip) => {
    const fresh = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (fresh.length === 0) {
      ipHits.delete(ip);
    } else if (fresh.length !== timestamps.length) {
      ipHits.set(ip, fresh);
    }
  });
}

function clientIp(req: Request): string {
  // Cloudflare-fronted requests: the genuine client IP is in
  // cf-connecting-ip. Vercel proxies via x-forwarded-for. Fall back to
  // x-real-ip and finally a constant so the limit still applies even
  // when the runtime can't see a header (worst case: shared bucket).
  const headers = req.headers;
  const cf = headers.get('cf-connecting-ip');
  if (cf) return cf;
  const xff = headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const real = headers.get('x-real-ip');
  if (real) return real;
  return 'unknown';
}

function rateLimitCheck(ip: string): {
  allowed: boolean;
  retryAfterSec: number;
  remaining: number;
} {
  const now = Date.now();
  pruneStale(now);
  const bucket = ipHits.get(ip) ?? [];
  const fresh = bucket.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (fresh.length >= RATE_LIMIT_MAX) {
    // Compute when the oldest hit in the window expires — that's the
    // earliest retry-after the client should respect.
    const oldest = fresh[0];
    const retryAfterMs = Math.max(1_000, RATE_LIMIT_WINDOW_MS - (now - oldest));
    return {
      allowed: false,
      retryAfterSec: Math.ceil(retryAfterMs / 1_000),
      remaining: 0,
    };
  }
  fresh.push(now);
  ipHits.set(ip, fresh);
  return {
    allowed: true,
    retryAfterSec: 0,
    remaining: RATE_LIMIT_MAX - fresh.length,
  };
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limit = rateLimitCheck(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Slow down — too many submissions. Try again shortly.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(limit.retryAfterSec),
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Window': `${RATE_LIMIT_WINDOW_MS / 1_000}s`,
        },
      }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    );
  }

  const email =
    typeof body === 'object' && body !== null && 'email' in body
      ? String((body as { email: unknown }).email ?? '').trim().toLowerCase()
      : '';

  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email.' },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  // types_db.ts was generated before the waitlist_emails migration landed.
  // Regenerate via `pnpm supabase:generate-types` when the CLI is linked;
  // until then, a narrow local cast is the honest shim.
  const { error } = await (supabase.from as unknown as (
    t: string
  ) => {
    insert: (row: Record<string, string>) => Promise<{ error: { code?: string } | null }>;
  })('waitlist_emails').insert({ email, source: 'marketing_site' });

  // Collapse duplicate-key errors (unique violation on email) into a 200
  // so the form never tells anyone whether an address is already on the
  // list. Only log-and-fail for genuine server errors.
  if (error && error.code !== '23505') {
    // eslint-disable-next-line no-console
    console.error('[waitlist] insert failed', error);
    return NextResponse.json(
      { error: 'Could not save that — try again shortly.' },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { ok: true },
    {
      headers: {
        'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
        'X-RateLimit-Remaining': String(limit.remaining),
        'X-RateLimit-Window': `${RATE_LIMIT_WINDOW_MS / 1_000}s`,
      },
    }
  );
}
