// Security headers — added 2026-05-22 per audit item 10 (security-auditor).
//
// Cloudflare orange-cloud sets a few of these at the edge already (HSTS in
// particular), but owning them in the app layer means:
//   1. Local dev + Vercel preview deployments get the same protection.
//   2. CF rule changes don't silently drop headers we depend on.
//   3. The CSP must live here because it references our specific origins
//      (Supabase project + PostHog + Sentry CDN + Cloudflare CDN).
//
// CSP is intentionally permissive enough for Next 14 dev (inline scripts
// for hydration) but locked-down for prod by removing 'unsafe-eval' in
// release builds. If you tighten further, run the marketing site locally
// (`pnpm dev`) + browse every page with DevTools open and fix any CSP
// violation reports before merging.

const isProd = process.env.NODE_ENV === 'production';

const csp = [
  // Default to self; everything explicit below.
  "default-src 'self'",
  // Scripts: self + Vercel Live preview banner + PostHog autocapture +
  // Sentry browser bundle. 'unsafe-inline' required by Next's hydration
  // scripts; 'unsafe-eval' only allowed in dev (Next dev tooling needs it).
  isProd
    ? "script-src 'self' 'unsafe-inline' https://*.posthog.com https://*.sentry-cdn.com https://*.ingest.sentry.io https://vercel.live"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.posthog.com https://*.sentry-cdn.com https://*.ingest.sentry.io https://vercel.live",
  // Styles: Tailwind inlines a few critical CSS chunks + Google Fonts CSS.
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Fonts: Google Fonts CDN.
  "font-src 'self' https://fonts.gstatic.com data:",
  // Images: self + Supabase storage + Vercel image optimizer + data: URIs
  // (used for inline placeholders + tiny SVG icons).
  "img-src 'self' data: blob: https://*.supabase.co https://*.vercel.app https://images.unsplash.com",
  // Connect (XHR/fetch/WebSocket): Supabase API + Realtime + Storage,
  // PostHog ingest, Sentry ingest, Vercel Live.
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.posthog.com https://*.sentry.io https://*.ingest.sentry.io https://vercel.live wss://vercel.live",
  // No frames embedded (clickjacking defense beyond X-Frame-Options).
  "frame-src 'none'",
  // No <object>/<embed>/<applet>.
  "object-src 'none'",
  // Form posts only to self (waitlist API).
  "form-action 'self'",
  // Restrict <base> tag — prevents <base href=...> injection attacks.
  "base-uri 'self'",
  // Don't allow ancestors to frame us (clickjacking) — paired with
  // X-Frame-Options DENY below.
  "frame-ancestors 'none'",
].join('; ');

const securityHeaders = [
  // Force HTTPS for 1 year + all subdomains; preload list eligible.
  // Cloudflare already sets this at the edge; the app-layer duplicate is
  // a belt-and-suspenders so preview deployments also get the protection.
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // Stop MIME-sniffing — browser must trust our Content-Type. Defends
  // against polyglot file attacks.
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Clickjacking defense — no embedding rootedplant.org in any iframe.
  { key: 'X-Frame-Options', value: 'DENY' },
  // Don't leak full URLs to cross-origin destinations.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disable browser APIs we don't use on the marketing site.
  // (Camera/microphone/geolocation belong in the Flutter app, not here.)
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  // CSP — see csp build above.
  { key: 'Content-Security-Policy', value: csp },
];

module.exports = {
  // NOTE: previously tried pinning `turbopack.root` here to silence the
  // "multiple lockfiles" warning, but it broke PostCSS's Tailwind
  // resolution in dev. Leaving unset — the warning is cosmetic; killing
  // the stray ~/package-lock.json is the real fix (user-side cleanup).
  rewrites: async () => {
    return [
      {
        source: '/auth',
        destination: '/auth/signin',
      },
    ];
  },
  headers: async () => {
    return [
      {
        // Apply to every route. Static assets get them too — harmless.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
