'use client';

import { cn } from '@/utils/cn';
import { motion } from 'motion/react';

// Word-stagger heading, adapted from 21st.dev's AnimatedText pattern.
// Each word animates in from below with a short delay, creating a gentle
// "the line finishes itself" effect as the heading enters view. Respects
// `prefers-reduced-motion` automatically via motion/react.
//
// Use as a drop-in for the `text` content of landing `<h2>` elements:
//   <h2 className="...">
//     <AnimatedHeading>From a photo to the watering…</AnimatedHeading>
//   </h2>

interface AnimatedHeadingProps {
  children: string;
  className?: string;
  /** Seconds between each word's entry. Default 0.06. */
  staggerDelay?: number;
  /** Seconds before the first word fires. Default 0. */
  delay?: number;
}

export function AnimatedHeading({
  children,
  className,
  staggerDelay = 0.06,
  delay = 0
}: AnimatedHeadingProps) {
  const words = children.split(' ');

  return (
    <motion.span
      className={cn('inline-block', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: staggerDelay, delayChildren: delay }
        }
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
            }
          }}
          style={{ marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
