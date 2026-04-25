'use client';

import { cn } from '@/utils/cn';
import { useEffect, useRef, useState, type ReactNode } from 'react';

// Mouse-follow spotlight card, adapted from 21st.dev's Spotlight Card
// pattern. A soft radial gradient tracks the pointer, fading in on hover
// and out on leave. The spotlight colour is tuned to Rooted's deep-forest
// primary so it reads as "warm highlight" rather than "neon".
//
// Wraps an existing `<Item>` or any children. The wrapper sets its own
// border/radius so the visible edge matches shadcn's Item styling.

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  /** CSS color for the spotlight centre. Defaults to Rooted forest. */
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(18, 53, 36, 0.08)'
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn('relative h-full overflow-hidden', className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ease-out"
        style={{
          opacity,
          background: `radial-gradient(240px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 70%)`
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// GlowCard — adapted from 21st.dev easemize/spotlight-card. Differs from
// SpotlightCard above: the spotlight tracks the cursor across the whole
// viewport (not just the card), and it draws a glowing border that
// brightens under the cursor. Brand-tuned via a `rooted` glowColor preset
// that keeps the hue pinned to our forest-to-sage range (150-180) instead
// of drifting across the full spectrum as the mouse moves.

type GlowColor = 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'rooted';

interface GlowCardProps {
  children?: ReactNode;
  className?: string;
  glowColor?: GlowColor;
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
  /** Override or extend inline styles. Use to swap the backdrop colour
   *  for an opaque brand value (e.g. flat phthalo) without losing the
   *  cursor-follow spotlight + glowing border behaviour. */
  style?: React.CSSProperties;
}

const glowColorMap: Record<GlowColor, { base: number; spread: number }> = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
  // Rooted brand: forest (150) → sage-teal (180). 30° spread keeps the
  // cursor-driven hue from drifting into yellow or blue.
  rooted: { base: 150, spread: 30 }
};

const sizeMap: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96'
};

export function GlowCard({
  children,
  className = '',
  glowColor = 'rooted',
  size = 'md',
  width,
  height,
  customSize = false,
  style
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      if (!cardRef.current) return;
      cardRef.current.style.setProperty('--x', x.toFixed(2));
      cardRef.current.style.setProperty(
        '--xp',
        (x / window.innerWidth).toFixed(2)
      );
      cardRef.current.style.setProperty('--y', y.toFixed(2));
      cardRef.current.style.setProperty(
        '--yp',
        (y / window.innerHeight).toFixed(2)
      );
    };
    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const sizeClasses = customSize ? '' : sizeMap[size];

  const inlineStyles: React.CSSProperties & Record<string, string | number> = {
    '--base': base,
    '--spread': spread,
    '--radius': '14',
    '--border': '2',
    // Cream-tinted backdrop in light, phthalo-tinted in dark. Picks up
    // the theme via `var(--card)` so light/dark modes read correctly.
    '--backdrop': 'rgb(from var(--card) r g b / 0.6)',
    '--backup-border': 'rgb(from var(--primary) r g b / 0.2)',
    '--size': '220',
    '--outer': '1',
    '--border-size': 'calc(var(--border, 2) * 1px)',
    '--spotlight-size': 'calc(var(--size, 150) * 1px)',
    '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 150) calc(var(--saturation, 40) * 1%) calc(var(--lightness, 55) * 1%) / var(--bg-spot-opacity, 0.12)),
      transparent
    )`,
    backgroundColor: 'var(--backdrop)',
    backgroundSize:
      'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
    backgroundPosition: '50% 50%',
    backgroundAttachment: 'fixed',
    border: 'var(--border-size) solid var(--backup-border)',
    position: 'relative',
    touchAction: 'none'
  };

  if (width !== undefined) {
    inlineStyles.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (height !== undefined) {
    inlineStyles.height = typeof height === 'number' ? `${height}px` : height;
  }

  return (
    <>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        [data-glow] {
          /* container reset so the ::before / ::after pseudo-elements
             position against the card edge. */
        }
        [data-glow]::before,
        [data-glow]::after {
          pointer-events: none;
          content: '';
          position: absolute;
          inset: calc(var(--border-size) * -1);
          border: var(--border-size) solid transparent;
          border-radius: calc(var(--radius) * 1px);
          background-attachment: fixed;
          background-size: calc(100% + (2 * var(--border-size)))
            calc(100% + (2 * var(--border-size)));
          background-repeat: no-repeat;
          background-position: 50% 50%;
          mask: linear-gradient(transparent, transparent),
            linear-gradient(white, white);
          -webkit-mask-clip: padding-box, border-box;
          mask-clip: padding-box, border-box;
          -webkit-mask-composite: source-in, source-over;
          mask-composite: intersect;
        }
        [data-glow]::before {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.75)
              calc(var(--spotlight-size) * 0.75) at
              calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
            hsl(
              var(--hue, 150) 55% 45% /
                var(--border-spot-opacity, 0.9)
            ),
            transparent 100%
          );
          filter: brightness(1.4);
        }
        [data-glow]::after {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.5)
              calc(var(--spotlight-size) * 0.5) at
              calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
            hsl(150 25% 95% / var(--border-light-opacity, 0.5)),
            transparent 100%
          );
        }
        [data-glow] [data-glow] {
          position: absolute;
          inset: 0;
          will-change: filter;
          opacity: var(--outer, 1);
          border-radius: calc(var(--radius) * 1px);
          border-width: calc(var(--border-size) * 20);
          filter: blur(calc(var(--border-size) * 10));
          background: none;
          pointer-events: none;
          border: none;
        }
        [data-glow] > [data-glow]::before {
          inset: -10px;
          border-width: 10px;
        }
        @media (prefers-reduced-motion: reduce) {
          [data-glow]::before,
          [data-glow]::after {
            background-attachment: scroll;
          }
        }
      `}</style>
      <div
        ref={cardRef}
        data-glow
        style={{ ...inlineStyles, ...style }}
        className={cn(
          sizeClasses,
          !customSize && 'aspect-[3/4]',
          'relative grid grid-rows-[1fr_auto] gap-4 rounded-2xl p-4 shadow-[0_1rem_2rem_-1rem_rgb(18_53_36_/_0.25)] backdrop-blur-[5px]',
          className
        )}
      >
        <div data-glow />
        {children}
      </div>
    </>
  );
}
