import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// Waitlist capture endpoint. Validates the payload, then INSERTs into
// the waitlist_emails Supabase table. RLS on the table permits anon
// INSERT only — no read, no update, no delete from the client. Emails
// are UNIQUE-indexed; duplicate submissions return 200 so we don't
// leak which addresses are already on the list.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
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

  return NextResponse.json({ ok: true });
}
