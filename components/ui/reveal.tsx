'use client';

import { cn } from '@/utils/cn';
import { motion, type HTMLMotionProps, type Variant } from 'motion/react';
import React, { forwardRef } from 'react';

// Scroll-triggered reveal primitive adapted from the 21st.dev
// `Scroll Animation` + `timeline-animation` patterns. Children enter
// the viewport with a soft blur-to-clarity, fade, and vertical nudge.
// Direction controls which axis the nudge runs on.
//
// Usage:
//   <Reveal>                   — default (fades in from below)
//   <Reveal delay={0.1}>       — stagger siblings manually
//   <Reveal direction="left">  — slides in from the left
//
// All motion is wrapped so `prefers-reduced-motion` users get the final
// state with no animation — motion/react respects that by default.

type Direction = 'up' | 'down' | 'left' | 'right';

const buildVariants = (
  direction: Direction
): { hidden: Variant; visible: Variant } => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const distance = direction === 'right' || direction === 'down' ? 40 : -40;

  return {
    hidden: { opacity: 0, filter: 'blur(8px)', [axis]: distance },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      [axis]: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };
};

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  amount?: number;
  once?: boolean;
}

export const Reveal = forwardRef<HTMLDivElement, RevealProps>(
  (
    {
      children,
      className,
      direction = 'up',
      delay = 0,
      amount = 0.2,
      once = true,
      ...rest
    },
    ref
  ) => {
    const base = buildVariants(direction);
    const variants = {
      hidden: base.hidden,
      visible: {
        ...(base.visible as { transition?: unknown }),
        transition: {
          ...((base.visible as { transition?: Record<string, unknown> })
            .transition ?? {}),
          delay
        }
      }
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
        variants={variants}
        className={cn(className)}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);
Reveal.displayName = 'Reveal';
