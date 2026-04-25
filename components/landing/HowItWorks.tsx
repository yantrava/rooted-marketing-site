'use client';

import { motion } from 'motion/react';
import type * as React from 'react';
import { AnimatedHeading } from '@/components/ui/animated-heading';
import { Section } from '@/components/ui/section';
import { CameraIcon, ClipboardCheckIcon, BellIcon } from 'lucide-react';

// Three-step explainer, placed immediately after the hero. Matches the
// Planta-esque cadence — snap, answer, remind — without borrowing their UI.
//
// Cards: flat phthalo-green surface (same OKLCH value as the dark-mode
// `--card` token, hardcoded so it stays phthalo on the cream light page
// too). Animations adapted from 21st.dev moazamtrade/feature — staggered
// fade-in-up on scroll into view, plus a subtle press-in on hover
// (whileHover={ scale: 0.98 }) and tap (whileTap={ scale: 0.96 }).
const cardSurfaceStyle: React.CSSProperties = {
  backgroundColor: 'oklch(20% 0.028 155)'
};
const steps = [
  {
    n: '01',
    title: 'Snap a photo',
    body:
      'Point your camera at any houseplant and Rooted returns a species match in seconds, even for plants you have never seen before.',
    icon: CameraIcon
  },
  {
    n: '02',
    title: 'Get personalised plant care',
    body:
      'Tell Rooted about your pot, your light, and the plant’s spot in your home. Each answer tunes the watering plan for that species.',
    icon: ClipboardCheckIcon
  },
  {
    n: '03',
    title: 'Right reminder at the right moment',
    body:
      'Today and Upcoming views group tasks by plant. One tap marks watering done, and undo is always there if you hit the chip by mistake.',
    icon: BellIcon
  }
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="py-20 sm:py-32">
      <div className="max-w-container mx-auto flex flex-col items-center gap-10 px-4 sm:gap-16">
        <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            How it works
          </p>
          <h2 className="font-display text-primary text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
            <AnimatedHeading>From a photo to the watering schedule your plant needs.</AnimatedHeading>
          </h2>
        </div>
        <div className="relative grid w-full auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {steps.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover="hover"
              variants={{ hover: { scale: 0.98 } }}
              whileTap={{ scale: 0.96 }}
              style={cardSurfaceStyle}
              className="dark group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl p-6 sm:p-8"
              data-clickable
            >
              <div className="relative z-10 flex items-center justify-between">
                <motion.div
                  variants={{ hover: { scale: 1.08, rotate: -6 } }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="bg-brand/15 ring-brand/30 flex size-12 items-center justify-center rounded-full ring-1"
                >
                  <s.icon className="text-brand size-6 stroke-1" />
                </motion.div>
                <span className="text-[#F5F0E8]/70 font-display text-sm font-semibold tracking-widest uppercase">
                  Step {s.n}
                </span>
              </div>
              <h3 className="font-display text-[#F5F0E8] relative z-10 text-xl font-semibold tracking-tight text-balance">
                {s.title}
              </h3>
              <p className="text-[#F5F0E8]/85 relative z-10 text-sm leading-relaxed">
                {s.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}
