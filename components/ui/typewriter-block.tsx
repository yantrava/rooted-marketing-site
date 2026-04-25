'use client';

import { cn } from '@/utils/cn';
import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

// Typewriter block adapted from 21st.dev's Typewriter pattern, trimmed
// to a single-pass reveal (no loop, no delete). When the block enters
// the viewport it types the full string character-by-character, then
// parks the cursor at the end and fades it out. Respects
// `prefers-reduced-motion` by showing the full text immediately.

interface TypewriterBlockProps {
  text: string;
  /** Milliseconds per character. Default 8 (fast enough to feel fluent). */
  speed?: number;
  /** Delay before typing starts, in ms. */
  initialDelay?: number;
  className?: string;
  /** Tag to render as. Default `pre` for code-like feel. */
  as?: 'pre' | 'div' | 'span';
}

export function TypewriterBlock({
  text,
  speed = 8,
  initialDelay = 200,
  className,
  as = 'pre'
}: TypewriterBlockProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [display, setDisplay] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;

    // Respect reduced-motion: jump straight to the final state.
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(text);
      setDone(true);
      return;
    }

    let i = 0;
    let cancelled = false;
    const start = setTimeout(() => {
      const tick = () => {
        if (cancelled) return;
        i += 1;
        setDisplay(text.slice(0, i));
        if (i < text.length) {
          setTimeout(tick, speed);
        } else {
          setDone(true);
        }
      };
      tick();
    }, initialDelay);

    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [inView, text, speed, initialDelay]);

  const Tag = as as 'pre';
  return (
    <Tag ref={ref as never} className={cn(className)}>
      {display}
      <motion.span
        aria-hidden
        className="bg-primary/70 ml-0.5 inline-block h-[1em] w-[2px] align-text-bottom"
        initial={{ opacity: 1 }}
        animate={{
          opacity: done ? [1, 0] : [1, 0, 1]
        }}
        transition={
          done
            ? { duration: 0.6, delay: 0.4, times: [0, 1] }
            : { duration: 1, repeat: Infinity, ease: 'linear' }
        }
      />
    </Tag>
  );
}
