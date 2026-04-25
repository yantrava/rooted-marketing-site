'use client';

import { type ReactNode } from 'react';

interface GlowingShadowProps {
  children: ReactNode;
  className?: string;
}

// Adapted from 21st.dev aliimam/glowing-shadow/default. The original cycles
// through the full hue wheel (rainbow) — brand-tuned here so the animated
// glow stays within Rooted's forest-green-to-sage range (hue 140-170) and
// the inner card surface uses our `--card` token. Fluid width (fills the
// parent) — no fixed aspect ratio, so content decides the height.
//
// Respects `prefers-reduced-motion` — animations freeze but the static
// glow + card chrome stays visible.
export function GlowingShadow({ children, className }: GlowingShadowProps) {
  return (
    <>
      <style jsx>{`
        @property --hue {
          syntax: '<number>';
          inherits: true;
          initial-value: 150;
        }
        @property --rotate {
          syntax: '<number>';
          inherits: true;
          initial-value: 0;
        }
        @property --bg-y {
          syntax: '<number>';
          inherits: true;
          initial-value: 0;
        }
        @property --bg-x {
          syntax: '<number>';
          inherits: true;
          initial-value: 0;
        }
        @property --glow-translate-y {
          syntax: '<number>';
          inherits: true;
          initial-value: 0;
        }
        @property --bg-size {
          syntax: '<number>';
          inherits: true;
          initial-value: 0;
        }
        @property --glow-opacity {
          syntax: '<number>';
          inherits: true;
          initial-value: 0;
        }
        @property --glow-blur {
          syntax: '<number>';
          inherits: true;
          initial-value: 0;
        }
        @property --glow-scale {
          syntax: '<number>';
          inherits: true;
          initial-value: 2;
        }
        @property --glow-radius {
          syntax: '<number>';
          inherits: true;
          initial-value: 2;
        }

        .glow-container {
          --card-radius: 1rem;
          --border-width: 2px;
          --bg-size: 1;
          --hue: 150;
          --rotate: 0;
          --animation-speed: 12s;
          --interaction-speed: 0.55s;
          --glow-scale: 1.1;
          --scale-factor: 1;
          --glow-blur: 4;
          --glow-opacity: 0.55;
          --glow-radius: 100;
          --glow-rotate-unit: 1deg;

          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
          z-index: 2;
          border-radius: var(--card-radius);
        }

        .glow-container::before,
        .glow-container::after {
          content: '';
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: var(--card-radius);
        }

        .glow-content {
          position: relative;
          width: 100%;
          background: var(--card);
          border-radius: calc(var(--card-radius) * 0.96);
          overflow: hidden;
        }

        .glow-content::before {
          content: '';
          display: block;
          position: absolute;
          inset: calc(var(--border-width) * -1);
          border-radius: var(--card-radius);
          z-index: -1;
          background: radial-gradient(
            30% 30% at calc(var(--bg-x) * 1%) calc(var(--bg-y) * 1%),
            hsl(calc(var(--hue) * 1deg) 55% 55%) calc(0% * var(--bg-size)),
            hsl(calc(var(--hue) * 1deg) 45% 40%) calc(20% * var(--bg-size)),
            hsl(calc(var(--hue) * 1deg) 35% 28%) calc(40% * var(--bg-size)),
            transparent 100%
          );
          animation:
            hue-drift var(--animation-speed) ease-in-out infinite,
            rotate-bg var(--animation-speed) linear infinite;
          transition: --bg-size var(--interaction-speed) ease;
        }

        .glow {
          --glow-translate-y: 0;
          display: block;
          position: absolute;
          inset: 0;
          pointer-events: none;
          animation: rotate var(--animation-speed) linear infinite;
          transform: rotateZ(calc(var(--rotate) * var(--glow-rotate-unit)));
          transform-origin: center;
          z-index: -1;
        }

        .glow::after {
          content: '';
          display: block;
          z-index: -2;
          filter: blur(calc(var(--glow-blur) * 10px));
          width: 130%;
          height: 130%;
          left: -15%;
          top: -15%;
          background: hsl(calc(var(--hue) * 1deg) 45% 50%);
          position: relative;
          border-radius: calc(var(--glow-radius) * 1%);
          animation: hue-drift var(--animation-speed) ease-in-out infinite;
          transform:
            scaleY(calc(var(--glow-scale) * var(--scale-factor) / 1.1))
            scaleX(calc(var(--glow-scale) * var(--scale-factor) * 1.2))
            translateY(calc(var(--glow-translate-y) * 1%));
          opacity: var(--glow-opacity);
        }

        .glow-container:hover .glow-content::before {
          --bg-size: 4;
          animation-play-state: paused;
          transition: --bg-size var(--interaction-speed) ease;
        }

        .glow-container:hover .glow {
          --glow-blur: 2;
          --glow-opacity: 0.75;
          --glow-scale: 1.3;
          --glow-radius: 50;
          --scale-factor: 1.15;
          animation-play-state: paused;
        }

        .glow-container:hover .glow::after {
          animation-play-state: paused;
          transition:
            --glow-blur 0.25s ease,
            --glow-opacity 0.25s ease,
            --glow-scale 0.25s ease,
            --glow-radius 0.25s ease;
        }

        @keyframes rotate-bg {
          0% {
            --bg-x: 0;
            --bg-y: 0;
          }
          25% {
            --bg-x: 100;
            --bg-y: 0;
          }
          50% {
            --bg-x: 100;
            --bg-y: 100;
          }
          75% {
            --bg-x: 0;
            --bg-y: 100;
          }
          100% {
            --bg-x: 0;
            --bg-y: 0;
          }
        }

        @keyframes rotate {
          from {
            --rotate: 0;
          }
          to {
            --rotate: 360;
          }
        }

        /* Brand-tuned hue range: 140 (forest) -> 170 (sage-teal) and back.
         * Replaces the original 0->360 rainbow cycle. */
        @keyframes hue-drift {
          0% {
            --hue: 140;
          }
          50% {
            --hue: 170;
          }
          100% {
            --hue: 140;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .glow,
          .glow-content::before {
            animation: none !important;
          }
        }
      `}</style>

      <div className={`glow-container ${className ?? ''}`}>
        <span className="glow" aria-hidden />
        <div className="glow-content">{children}</div>
      </div>
    </>
  );
}
