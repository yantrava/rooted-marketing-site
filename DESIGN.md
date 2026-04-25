# Rooted — Design System

Synthesized 2026-04-20 from:
- `Plant App/logos/rooted-philosophy.md` — the "Verdant Cartography" brand philosophy
- The Flutter app's production tokens at `flutter/lib/**/*.dart` (especially `#123524` accent and `#F5F0E8` cream seen across `home_screen.dart`, `garden_screen.dart`, `wizard_screen.dart`)
- `ui-ux-pro-max` Quick Reference §1–§9 (accessibility, touch, performance, style, layout, typography, animation, forms, navigation)

The single source of truth for marketing-site tokens is `styles/main.css`. This doc exists so future agents pick up the same language on day 1.

## Brand in one paragraph

Rooted lives in the "Verdant Cartography" aesthetic: deep phthalo green (almost black at depth, luminous at edges) on warm cream. The wordmark is a high-contrast serif; body is a clean sans. Compositions are vertically organised and editorial, with golden-ratio root imagery as the atmospheric reference. Nothing casual — restraint over decoration.

## Colors

All tokens live in `:root` / `.dark` in `styles/main.css`. The OKLCH values target WCAG AA contrast in both themes.

| Token | Light | Dark | Purpose |
|---|---|---|---|
| `--background` | cream `#F5F0E8` | primary-deep `#0A1F15` | Page canvas |
| `--foreground` | ink `#1A1614` | cream `#F5F0E8` | Body copy |
| `--primary` | deep forest `#123524` | cream `#F5F0E8` | CTAs, headings, logomark |
| `--primary-foreground` | cream | deep forest | Text on primary surfaces |
| `--secondary` | cream-deeper `#E8DFC9` | mid-forest | Section dividers, card alt |
| `--muted` | cream-deeper | mid-forest | Muted surfaces |
| `--muted-foreground` | ink-muted `#5A554E` | cream-muted | Secondary copy |
| `--accent` | same as secondary | same as secondary | Hover + pressed states |
| `--destructive` | `#D32F2F` | lighter red | Toxic badges, danger CTAs |
| `--border` | warm tan tint | forest tint | 1px dividers, card outlines |
| `--ring` | deep forest | cream | Focus rings (always visible) |
| `--brand` | deep forest | softer mint-green (`oklch(82% 0.08 155)`) | Marketing accent fills |

Non-color-background darks stay above `#0A1F15` to avoid a pure-black feel; cream text on dark surfaces clears 4.5:1.

## Typography

| Role | Face | Weight | Scale |
|---|---|---|---|
| Display / H1 / wordmark | **Fraunces** (variable serif, Google Fonts) | 600, opsz tuned for 96+ | 40 / 48 / 64 / 80 / 96 |
| Section heading | Fraunces | 600 | 28 / 36 / 48 |
| Body | **Inter** (variable sans, Google Fonts) | 400 / 500 / 600 | 14 / 15 / 17 |
| Label / eyebrow | Inter | 600, letter-spacing 0.08em, `uppercase` | 11 / 12 |
| Code / formula | `ui-monospace` stack | 400 | 12 / 13 |

- Line height: 1.1–1.15 for display, 1.45 for body, 1.3 for long-form editorial.
- `font-display: swap` on both Fraunces + Inter.
- The "high-contrast serif of classical proportions" mandate from the philosophy doc is honoured by using Fraunces' `opsz` axis so large sizes get tighter tracking and thinner counters automatically.

## Space + rhythm

- Spacing scale (rem units in Tailwind): `4, 8, 12, 16, 20, 24, 32, 48, 64, 96, 128`.
- Section vertical padding: `py-20` mobile, `py-32` desktop.
- Container: `max-w-6xl` (landing sections) + `max-w-3xl` (editorial pages, legal routes).
- Horizontal inset: `px-4`.
- Card gap inside a section: `gap-4` mobile, `gap-6` desktop.

## Radius

- Pills + chips: `rounded-full`
- Buttons: `rounded-md` (default shadcn)
- Cards + inputs: `rounded-xl` (12pt)
- Sheets + modals + hero media: `rounded-2xl` (16pt)
- Never hard corners on interactive surfaces.

## Elevation

Subtle over strong — matches the app's `surfaceContainerHighest` + `border-primary/10` pattern rather than a hard drop shadow:

- Default card: `bg-card ring-1 ring-primary/10`
- Elevated card (hovered or active): `ring-1 ring-primary/20` + `shadow-md`
- Modals: `shadow-2xl`
- Wordmark + hero media get no elevation; the brand rests on layout weight, not shadow.

## Motion

- Durations: 180–240ms enter, ~140ms exit.
- Easing: `ease-out` for enter, `ease-in` for exit.
- Keyframes: `@keyframes appear` + `appear-zoom` already defined in `main.css` and reused for the hero.
- Stagger: 30–50ms per item on grid reveals.
- Hard rule: honour `prefers-reduced-motion`; the animations-to-none variant in Tailwind covers this automatically.

## Components in use

Section shells: `components/ui/section.tsx` (shadcn-adjacent).
Cards: `components/ui/card.tsx`.
Buttons: `components/ui/button.tsx` with `variant="default"` (primary fill) and `variant="ghost"` (nav links).
Pills / badges: `components/ui/badge.tsx`.
Accordion (FAQ): `components/ui/accordion.tsx` (Radix).
Navigation menu (navbar): `components/ui/navigation-menu.tsx` (Radix).
Sheet (mobile menu): `components/ui/sheet.tsx` (Radix).
Toaster (waitlist success): `components/ui/toaster.tsx` + `use-toast.tsx`.

All marketing components live in `components/landing/*.tsx` and compose these primitives. Do not add bespoke animation libraries beyond what `tw-animate-css` + the existing keyframes in `main.css` provide.

## Voice

- Editorial but plain. "Verdant Cartography"-adjacent, never startup-cliché.
- Numbers over adjectives. "382-species care database" > "vast library". "8-factor watering algorithm" > "smart reminders".
- English-only for v1; no forced localisation.
- No emoji anywhere in marketing copy (matches the app).
- Present tense, active voice. "Rooted identifies" > "Rooted is an app that will help you identify".

## Accessibility non-negotiables

Per `ui-ux-pro-max` §1 + §2:

- All interactive surfaces ≥ 44×44pt.
- Focus rings visible in every theme (`--ring` is wired).
- Text contrast ≥ 4.5:1 body, ≥ 3:1 secondary; verified in both themes.
- `alt=""` on decorative imagery, real alt text on logos and screenshots.
- `aria-label` on icon-only buttons.
- Keyboard order matches visual order — never rely on `tabIndex` overrides.
- `prefers-reduced-motion` respected (automatic via Tailwind animate utilities).

## SEO + schema

- Metadata + OG in `app/layout.tsx` via `generateMetadata()`.
- JSON-LD: `SoftwareApplication` + `Organization` in root layout; `FAQPage` on the home route inside `FAQ.tsx`.
- Sitemap auto-generated via `app/sitemap.ts`.
- `robots.ts` allows everything except `/account/*` and `/api/*`.
- Canonical URL on every route.

## When you deviate

If a design decision ever feels restrained-to-the-point-of-bland, reach for the philosophy doc:
> "Space is organized around a single vertical axis — the spine of growth. Above: open, luminous, reaching. Below: dense, recursive, radiating outward in fibonacci arcs."

That's the north star. Pick the option that looks more like a botanical illustration than a landing-page template.
