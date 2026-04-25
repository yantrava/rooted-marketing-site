# Rooted — Marketing Site

Production marketing website for [Rooted](https://rootedplant.org), the plant-care app.
This repo deploys to Vercel and serves `rootedplant.org`.

## Stack

- Next.js 16 (App Router) + Turbopack
- TypeScript
- Tailwind v4 (OKLCH tokens)
- shadcn/ui + Radix primitives
- motion/react animations
- Supabase (waitlist persistence + auth via service role)
- PostHog analytics
- Vercel hosting

## Local development

```bash
pnpm install
cp .env.example .env.local      # then fill in real values
pnpm dev                         # runs at http://localhost:3002
```

If `pnpm` isn't on PATH, use the local binary:
```bash
./node_modules/.bin/next dev --turbopack -p 3002
```

## Environment variables

See `.env.example`. Six values needed:

| Var | Where | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Vercel + local | `https://rootedplant.org` in prod |
| `NEXT_PUBLIC_SUPABASE_URL` | Vercel + local | Public, safe in client |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Vercel + local | Public, safe in client |
| `SUPABASE_SERVICE_ROLE_KEY` | Vercel only | **Server-side only — NEVER expose to client** |
| `NEXT_PUBLIC_POSTHOG_KEY` | Vercel + local | Public PostHog project key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Vercel + local | `https://us.i.posthog.com` |

## Routes

| Path | Purpose |
|---|---|
| `/` | Landing — Hero, HowItWorks, Features, Science, Pricing, CTA |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/support` | Support info |
| `/attribution` | Open-source / asset attribution |
| `/sitemap.xml` | Auto-generated sitemap (5 absolute URLs) |
| `/robots.txt` | Robots policy |
| `/api/waitlist` | POST — waitlist signup → Supabase `waitlist_emails` |
| `/api/og` | Dynamic OG card generator |

## Deploy

Connected to Vercel project `rooted-marketing-site` under team `team_1ZzzIYY7PoSlaCgLWX7BITiT`.
Pushing to `main` triggers a production deploy. Custom domain: `rootedplant.org`.

Security headers (HSTS, X-Frame-Options DENY, Content-Type-Options nosniff, etc.) are set
via `vercel.json` at the project root.

## Design system

See `DESIGN.md` for the visual language: phthalo dark cards, OKLCH tokens,
cinematic theme toggle, scroll-driven vine, official store badges.

## Attribution

Originally derived from [vercel/nextjs-subscription-payments](https://github.com/vercel/nextjs-subscription-payments)
under MIT — substantially modified for Rooted's marketing-only use case.
