'use client';

import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';

// Site-wide scroll-driven vine. A large 5-petal forest blossom sits in
// the hero; as the visitor scrolls, an organic stem snakes left/right
// down the page, big leaves bloom directly off it, and the line
// resolves into a fanning root system above the footer.
//
// Mounted INSIDE <main> as an absolutely-positioned child (main is
// `relative`). That means the SVG scrolls naturally with the document,
// so the drawn portion of the path always sits inside the user's
// viewport rather than trailing above. `pointer-events-none` so it
// never intercepts clicks; z-index -10 so every card/section paints
// over it cleanly.

interface LeafSpec {
  x: number;
  y: number;
  rotate: number;
  size: number;
}

const VINE_LEFT_X = 0.32;
const VINE_RIGHT_X = 0.68;
const VINE_CENTER_X = 0.5;

export function RootedVine() {
  const [doc, setDoc] = useState({ height: 0, width: 0, footerTop: 0 });

  // Track total document height + viewport width AND where the <footer>
  // begins. The vine's root system has to terminate above the footer's
  // top edge — otherwise the footer's solid background paints over the
  // root branches and the visitor only sees the single stem.
  useEffect(() => {
    const measure = () => {
      const height = document.documentElement.scrollHeight;
      const width = window.innerWidth;
      const footerEl = document.querySelector('footer');
      const footerTop = footerEl
        ? footerEl.getBoundingClientRect().top + window.scrollY
        : height - 80;
      setDoc({ height, width, footerTop });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll();
  // Tight spring + small head-start so the line catches up faster on
  // the first/second fold. Original (stiffness 80, damping 22, mass 0.5)
  // had a 250ms settling time which left the drawn endpoint trailing
  // 300-600px behind the visitor's scroll position. New values settle
  // in ~80ms and the [0.04, 1] remap pre-draws ~4% of the vine before
  // any scrolling so the hero stretch reads correctly from the start.
  const rawSpring = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.25
  });
  const smoothedProgress = useTransform(rawSpring, [0, 1], [0.04, 1]);

  if (doc.height === 0 || doc.width === 0) return null;

  // Vine geometry. Big flower at the top means we start the stem ~180px
  // below page top. Stem extends 20px past the footer's top edge so the
  // line visually tucks behind the footer's painted background instead
  // of stopping short with a stub.
  const startY = 220;
  const endY = doc.footerTop + 20;
  const usableHeight = endY - startY;
  const segmentHeight = 520;
  const segmentCount = Math.max(1, Math.ceil(usableHeight / segmentHeight));
  const segH = usableHeight / segmentCount;

  const xCenter = doc.width * VINE_CENTER_X;
  const xLeft = doc.width * VINE_LEFT_X;
  const xRight = doc.width * VINE_RIGHT_X;

  // Build the snaking stem. Each S-segment swings to one anchor and
  // back to centre via a smooth cubic curve.
  let pathD = `M ${xCenter} ${startY}`;
  for (let i = 0; i < segmentCount; i += 1) {
    const yA = startY + i * segH;
    const yB = startY + (i + 1) * segH;
    const yC1 = yA + segH * 0.45;
    const yC2 = yB - segH * 0.45;
    const swingX = i % 2 === 0 ? xRight : xLeft;
    pathD += ` C ${swingX} ${yC1}, ${swingX} ${yC2}, ${xCenter} ${yB}`;
  }

  // Leaves bloom directly on top of the stem at curve apex points.
  // Larger size + attached to the line itself (no offset) so they
  // actually read as leaves growing from the branch.
  const leaves: LeafSpec[] = [];
  for (let i = 0; i < segmentCount; i += 1) {
    const yA = startY + i * segH;
    const apexY = yA + segH * 0.5;
    const isRight = i % 2 === 0;
    // Big primary leaf at the swing apex
    leaves.push({
      x: isRight ? xRight : xLeft,
      y: apexY,
      rotate: isRight ? 35 : 145,
      size: 1.0
    });
    // Mid-segment companion leaf on the opposite side, smaller
    if (i < segmentCount - 1) {
      leaves.push({
        x: xCenter,
        y: yA + segH * 0.85,
        rotate: isRight ? 200 : -20,
        size: 0.75
      });
    }
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[-10] overflow-hidden text-[#4A9970]"
      style={{ opacity: 0.45 }}
    >
      <motion.svg
        width="100%"
        height={doc.height}
        viewBox={`0 0 ${doc.width} ${doc.height}`}
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ overflow: 'visible' }}
      >
        {/* Big flower at the top. Center is anchored at y=150 (rather
            than relative to startY) so the now-larger outer petals
            (which extend ~116px above center) stay fully inside the
            hero rather than getting clipped at the page top. */}
        <Flower x={xCenter} y={150} />

        {/* The growing stem. pathLength tied to scrollYProgress so the
            line draws top-to-bottom as the visitor scrolls — and since
            this SVG is in document flow (not fixed), the drawn endpoint
            always lands in the user's viewport. */}
        <motion.path
          d={pathD}
          strokeWidth={2.5}
          style={{ pathLength: smoothedProgress }}
          vectorEffect="non-scaling-stroke"
        />

        {/* Leaves bloom directly off the stem at apex points. Each
            leaf's reveal fires once scrollYProgress crosses its Y
            threshold. */}
        {leaves.map((leaf, i) => (
          <Leaf
            key={`leaf-${i}`}
            spec={leaf}
            docHeight={doc.height}
            progress={smoothedProgress}
          />
        ))}
      </motion.svg>
    </div>
  );
}

// Big 5-petal stylized blossom. ~170px tall — bumped 20% from v2 for a
// touch more hero presence. Two-layer petals (outer halo + inner) with
// a stroke on the inner ring give it depth without losing the editorial
// feel.
function Flower({ x, y }: { x: number; y: number }) {
  const petalAngles = [0, 72, 144, 216, 288];
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Outer petal halo for depth */}
      {petalAngles.map((angle) => (
        <ellipse
          key={`outer-${angle}`}
          cx="0"
          cy="-56"
          rx="26"
          ry="60"
          fill="currentColor"
          fillOpacity="0.25"
          transform={`rotate(${angle})`}
        />
      ))}
      {/* Inner petals */}
      {petalAngles.map((angle) => (
        <ellipse
          key={`inner-${angle}`}
          cx="0"
          cy="-46"
          rx="17"
          ry="44"
          fill="currentColor"
          fillOpacity="0.6"
          stroke="currentColor"
          strokeOpacity="0.85"
          strokeWidth="1.4"
          transform={`rotate(${angle})`}
        />
      ))}
      <circle cx="0" cy="0" r="17" fill="currentColor" fillOpacity="0.95" />
      <circle cx="0" cy="0" r="7" fill="currentColor" fillOpacity="0.5" />
    </g>
  );
}

// Big almond-shaped leaf. Drawn from the line outward so the base is
// at (0,0). When transformed to a position on the stem, the base
// touches the line and the tip extends out perpendicular.
function Leaf({
  spec,
  docHeight,
  progress
}: {
  spec: LeafSpec;
  docHeight: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const yProgress = spec.y / docHeight;
  const start = Math.max(0, yProgress - 0.05);
  const end = Math.min(1, yProgress + 0.005);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.2, spec.size]);

  // Almond leaf shape: from origin (the stem) sweeping out to the tip.
  // Larger than v1 — ~60px long.
  return (
    <motion.g
      style={{ opacity }}
      transform={`translate(${spec.x}, ${spec.y}) rotate(${spec.rotate})`}
    >
      <motion.g style={{ scale }}>
        <path
          d="M 0 0 Q 22 -22, 60 -8 Q 70 0, 60 8 Q 22 22, 0 0 Z"
          fill="currentColor"
          fillOpacity="0.55"
          stroke="currentColor"
          strokeOpacity="0.9"
          strokeWidth="1.4"
        />
        {/* leaf vein down the centre */}
        <line
          x1="2"
          y1="0"
          x2="58"
          y2="0"
          stroke="currentColor"
          strokeOpacity="0.7"
          strokeWidth="1"
        />
      </motion.g>
    </motion.g>
  );
}

