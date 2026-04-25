'use client';

import { cn } from '@/utils/cn';

// Animated border beam adapted from 21st.dev's Border Beam pattern. A
// softly-glowing light rides the edge of the element, making the outline
// feel alive. Colours default to Rooted's forest/sage palette so the beam
// reads as "warm highlight" rather than "synthwave".
//
// Absolute-positioned — must live inside a `relative` parent that has its
// own border-radius.

interface BorderBeamProps {
  className?: string;
  /** Size of the light halo in px. */
  size?: number;
  /** Seconds for one full lap around the border. */
  duration?: number;
  borderWidth?: number;
  /** Delay before the beam starts (seconds, can be negative for offset). */
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  className,
  size = 180,
  duration = 9,
  borderWidth = 1.5,
  delay = 0,
  colorFrom = 'rgba(18, 53, 36, 0.8)',
  colorTo = 'rgba(120, 180, 140, 0.0)'
}: BorderBeamProps) {
  return (
    <>
      <style>{`
        @keyframes border-beam {
          to { offset-distance: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .border-beam-ring::after { animation: none !important; }
        }
      `}</style>
      <div
        aria-hidden
        className={cn(
          'border-beam-ring pointer-events-none absolute inset-0 rounded-[inherit]',
          '[border:calc(var(--bw)*1px)_solid_transparent]',
          '![mask-clip:padding-box,border-box] ![mask-composite:intersect]',
          '[mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]',
          'after:absolute after:aspect-square after:w-[calc(var(--size)*1px)]',
          'after:[background:linear-gradient(to_left,var(--from),var(--to),transparent)]',
          'after:[offset-anchor:90%_50%]',
          'after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]',
          'after:animate-[border-beam_var(--duration)_linear_infinite]',
          'after:[animation-delay:var(--delay)]',
          className
        )}
        style={
          {
            '--size': size,
            '--duration': `${duration}s`,
            '--bw': borderWidth,
            '--delay': `${delay}s`,
            '--from': colorFrom,
            '--to': colorTo
          } as React.CSSProperties
        }
      />
    </>
  );
}
