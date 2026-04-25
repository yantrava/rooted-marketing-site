'use client';

import { cn } from '@/utils/cn';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';

// Organic vine that draws itself as the user scrolls through its parent
// section. Built from a hand-crafted SVG path (s-curves with three leaf
// glyphs spaced along the stem) and tied to the section's scroll
// progress via `useScroll` + `useTransform` + a springy `pathLength`.
// Inspired by 21st.dev's "Svg follow scroll" and "GoogleGeminiEffect"
// patterns but redrawn for Rooted's plant-care brand.
//
// Use inside a section that contains step cards. The vine is absolutely
// positioned and pointer-events-none — it sits behind the cards without
// intercepting any interactions.

interface ScrollVineProps {
  className?: string;
  /** CSS color for the vine stroke. */
  color?: string;
  /** Stroke width in px. */
  width?: number;
}

export function ScrollVine({
  className,
  color = 'currentColor',
  width = 2
}: ScrollVineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 20%']
  });
  // Spring-smoothed path length so it feels organic rather than linear.
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4
  });
  // Leaves fade in a hair behind the stem reaching them.
  const leafOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0.6, 1]);
  const leafScale = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        'text-primary/35 dark:text-brand/45 pointer-events-none absolute inset-0 z-0',
        className
      )}
    >
      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        {/* Primary sinuous stem weaving under the three step cards. */}
        <motion.path
          d="M 60 60
             C 220 60, 320 180, 410 180
             S 600 60, 720 60
             S 980 220, 1140 220
             C 1160 260, 1100 340, 960 360
             S 680 480, 560 480
             S 280 420, 140 460
             C 60 500, 40 540, 120 560"
          stroke={color}
          strokeWidth={width}
          strokeLinecap="round"
          style={{ pathLength }}
        />

        {/* Three leaf glyphs positioned at the stem's midpoints. Each
            leaf is a simple curved path that scales/fades in as the
            section scrolls in. */}
        <motion.g
          style={{ opacity: leafOpacity, scale: leafScale }}
          transform="translate(410 180)"
        >
          <Leaf color={color} />
        </motion.g>
        <motion.g
          style={{ opacity: leafOpacity, scale: leafScale }}
          transform="translate(720 60) rotate(25)"
        >
          <Leaf color={color} />
        </motion.g>
        <motion.g
          style={{ opacity: leafOpacity, scale: leafScale }}
          transform="translate(960 360) rotate(-15)"
        >
          <Leaf color={color} />
        </motion.g>
      </svg>
    </div>
  );
}

function Leaf({ color }: { color: string }) {
  return (
    <g>
      <path
        d="M -22 0 C -22 -14, -4 -22, 22 -22 C 22 -4, 14 14, -22 0 Z"
        fill={color}
        fillOpacity={0.22}
        stroke={color}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      <path
        d="M -22 0 L 14 -14"
        stroke={color}
        strokeWidth={0.9}
        strokeLinecap="round"
      />
    </g>
  );
}
