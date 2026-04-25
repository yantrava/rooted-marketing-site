'use client';

import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect, useRef } from 'react';

// Rolling-digit counter adapted from 21st.dev's Animated Counter + motion
// countdown examples. Counts up from 0 (or `from`) to `to` when it enters
// the viewport, once. Uses `motion/react`'s animate() on a MotionValue so
// it runs on the compositor thread without triggering React re-renders.

interface CounterProps {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
}

export function Counter({ to, from = 0, duration = 1.6, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(from);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [inView, mv, to, duration]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
}
