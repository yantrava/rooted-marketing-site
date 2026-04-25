'use client';

import { cn } from '@/utils/cn';

// Hero background "aurora" — two soft gradient blobs drifting in opposite
// directions. Tinted to Rooted's palette: deep forest (phthalo) greens in
// dark mode, brighter sage greens in light mode so they actually register
// against the cream background.
//
// Light-mode fix (2026-04-24): the old build used `bg-primary/20` where
// `--primary` is a very dark forest at 25.9% lightness. At 20% opacity on
// cream this reads as a faint grey, not green. Switched to inline RGB sage
// greens at 50%/40% opacity for light mode, kept the brand/primary tokens
// for dark. Radial mask widened from 40% -> 55% transparent so the core of
// each blob is no longer hollowed out.
//
// Respects `prefers-reduced-motion` — blobs stay still for reduced-motion
// users.

export function AuroraBlobs({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
        className
      )}
    >
      <style>{`
        @keyframes aurora-drift-a {
          0%, 100% { transform: translate(-20%, -10%) scale(1); }
          50%      { transform: translate(15%, 10%) scale(1.15); }
        }
        @keyframes aurora-drift-b {
          0%, 100% { transform: translate(20%, 30%) scale(1); }
          50%      { transform: translate(-10%, 5%) scale(0.95); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-blob { animation: none !important; }
        }
        /* Light-mode sage greens — explicit RGB so they don't get
         * swallowed by the dark-lightness primary token at low opacity. */
        .aurora-a { background: rgb(74 153 112 / 0.55); }   /* sage */
        .aurora-b { background: rgb(120 180 135 / 0.45); }  /* pale sage */
        /* Dark mode: use brand/primary tokens (brand is a light sage in
         * dark, primary is cream — both read well on phthalo bg). */
        :is(.dark *) .aurora-a { background: rgb(from var(--brand) r g b / 0.28); }
        :is(.dark *) .aurora-b { background: rgb(from var(--primary) r g b / 0.20); }
      `}</style>
      {/* Primary forest blob (top-left drift) */}
      <div
        className="aurora-blob aurora-a absolute top-[-20%] left-[-10%] h-[46rem] w-[46rem] rounded-full blur-3xl"
        style={{ animation: 'aurora-drift-a 22s ease-in-out infinite' }}
      />
      {/* Secondary sage blob (bottom-right drift) */}
      <div
        className="aurora-blob aurora-b absolute bottom-[-30%] right-[-15%] h-[42rem] w-[42rem] rounded-full blur-3xl"
        style={{ animation: 'aurora-drift-b 26s ease-in-out infinite' }}
      />
      {/* Radial mask so edges fade into the page rather than stopping
       * abruptly. Widened from the old 40% to 55% so the blob cores stay
       * readable in light mode. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 35%, transparent 55%, var(--background) 92%)'
        }}
      />
    </div>
  );
}
