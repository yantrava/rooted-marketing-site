'use client';

import { useRef, useState, useCallback } from 'react';
import { cn } from '@/utils/cn';

export interface TiltCardProps {
  /** Maximum tilt angle in degrees. Default 12 — subtle enough to feel real, strong enough to notice. */
  tiltLimit?: number;
  /** Scale factor on hover. Default 1.03. */
  scale?: number;
  /** Perspective distance in pixels. Default 1200. */
  perspective?: number;
  /** Tilt direction: "gravitate" leans toward the cursor, "evade" leans away. Default "evade". */
  effect?: 'gravitate' | 'evade';
  /** Show a radial spotlight that follows the cursor on hover. Default true. Set false when the child already renders its own spotlight (e.g. SpotlightCard in Items). */
  spotlight?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// 3D tilt wrapper. Adapted from 21st.dev tom_ui/tilt-card/default with the
// spotlight tuned to Rooted's brand — subtle on cream, brighter on phthalo
// dark. Consumer controls the inner card surface; this wrapper only handles
// transform + spotlight overlay. Pair with SpotlightCard (spotlight={false})
// to avoid stacking two radial highlights.
export function TiltCard({
  tiltLimit = 12,
  scale = 1.03,
  perspective = 1200,
  effect = 'evade',
  spotlight = true,
  className,
  style,
  children
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
  );
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const dir = effect === 'evade' ? -1 : 1;

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const xRot = (py - 0.5) * (tiltLimit * 2) * dir;
      const yRot = (px - 0.5) * -(tiltLimit * 2) * dir;
      setTransform(
        `perspective(${perspective}px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale3d(${scale}, ${scale}, ${scale})`
      );
      if (spotlight) setSpotlightPos({ x: px * 100, y: py * 100 });
    },
    [tiltLimit, scale, perspective, dir, spotlight]
  );

  const handlePointerEnter = useCallback(() => setIsHovered(true), []);
  const handlePointerLeave = useCallback(() => {
    setTransform(
      `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    );
    setIsHovered(false);
  }, [perspective]);

  return (
    <div
      ref={cardRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        'relative h-full overflow-hidden will-change-transform',
        className
      )}
      style={{
        transform,
        transition: 'transform 0.2s ease-out',
        transformStyle: 'preserve-3d',
        ...style
      }}
    >
      {children}
      {spotlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit]"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s'
          }}
        >
          <div
            className="absolute h-[200%] w-[200%] rounded-full"
            style={{
              left: `${spotlightPos.x}%`,
              top: `${spotlightPos.y}%`,
              transform: 'translate(-50%, -50%)',
              // Brand-tuned: forest-green spotlight in light mode (shows on
              // cream), warm cream spotlight in dark mode (shows on phthalo).
              // Uses currentColor via mix-blend so it adapts automatically.
              background:
                'radial-gradient(circle, rgb(from var(--primary) r g b / 0.12) 0%, transparent 45%)'
            }}
          />
        </div>
      )}
    </div>
  );
}
