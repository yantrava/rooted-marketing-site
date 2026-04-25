'use client';

import { useState, type InputHTMLAttributes } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/utils/cn';

// Floating-label input adapted from 21st.dev/berlix/input. Letters of the
// label stagger upward when the input is focused or has a value — matches
// Rooted's editorial voice, replaces the placeholder pattern with a moving
// label so the form reads as a deliberate piece of UI rather than a chrome
// box. Brand-tuned: bottom-border in `--foreground` (forest in light /
// cream in dark), label rises into `--muted-foreground`.

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
}

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.04
    }
  }
};

const letterVariants = {
  initial: {
    y: 0,
    color: 'var(--foreground)'
  },
  animate: {
    y: '-130%',
    color: 'var(--muted-foreground)',
    transition: {
      type: 'spring' as const,
      stiffness: 320,
      damping: 22
    }
  }
};

export function FloatingInput({
  label,
  className = '',
  value,
  ...props
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const showLabel = isFocused || (typeof value === 'string' && value.length > 0);

  return (
    <div className={cn('relative w-full', className)}>
      <motion.div
        className="text-foreground pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 text-base"
        variants={containerVariants}
        initial="initial"
        animate={showLabel ? 'animate' : 'initial'}
      >
        {label.split('').map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={letterVariants}
            style={{ willChange: 'transform' }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        ))}
      </motion.div>

      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        {...props}
        className="border-foreground/60 focus:border-primary text-foreground w-full border-b-2 bg-transparent py-3 text-base font-medium outline-none transition-colors placeholder:text-transparent"
      />
    </div>
  );
}
