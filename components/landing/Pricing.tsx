'use client';

import { AnimatedHeading } from '@/components/ui/animated-heading';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { Check, Leaf, Sparkles } from 'lucide-react';
import { type ReactNode } from 'react';
import { StoreBadges } from './StoreBadges';

// Rooted pricing. Glassmorphism card style adapted from
// 21st.dev/dhileepkumargm/pricing-page — rebuilt on our design tokens so the
// surface reads as cream glass over forest gradients in light mode and
// phthalo glass over sage gradients in dark mode. Subscriptions are still
// billed through Google Play + App Store via RevenueCat; the web never takes
// a card, so each card's CTA is the shared StoreBadges component.

interface Tier {
  title: 'Free' | 'Rooted Pro';
  popular: boolean;
  priceLine: string;
  priceSuffix?: string;
  description: string;
  benefits: string[];
  icon: ReactNode;
  iconRing: string;
}

const tiers: Tier[] = [
  {
    title: 'Free',
    popular: false,
    priceLine: 'Free',
    priceSuffix: 'forever',
    description:
      'Everything most plant owners need. Unlimited plants, watering algorithm, garden, community.',
    icon: <Leaf className="size-5 stroke-[1.5]" />,
    iconRing: 'from-[hsl(150_45%_35%)]/30 to-[hsl(170_40%_55%)]/20',
    benefits: [
      'Multi-level AI plant identification',
      'Unlimited garden and sites',
      'Science-backed watering schedule',
      'Community feed and Plant Swap',
      '25-pest houseplant library',
      'Ten-language support',
      'Dark mode and offline-first',
      'No ads, ever'
    ]
  },
  {
    title: 'Rooted Pro',
    popular: true,
    priceLine: 'Pricing',
    priceSuffix: 'finalising',
    description:
      'For plant people who want unlimited diagnoses and deeper care analytics.',
    icon: <Sparkles className="size-5 stroke-[1.5]" />,
    iconRing: 'from-[hsl(140_60%_30%)]/40 to-[hsl(160_50%_50%)]/30',
    benefits: [
      'Everything in Free',
      'Unlimited Dr. Rooted diagnoses',
      'Deeper care analytics',
      'Early access to new species data',
      'Priority feature requests',
      'Support within 24 hours'
    ]
  }
];

function PricingCard({ tier }: { tier: Tier }) {
  // Flat phthalo-green surface — same OKLCH as the Features cards, the
  // HowItWorks step cards, and the dark-mode `--card` token. The cards
  // sit as deliberate dark islands on the cream page in light mode.
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'oklch(20% 0.028 155)'
  };

  // Rotating edge glow — a conic sweep around the border, tuned to the
  // brand's forest-to-sage range.
  const borderContainerStyle: React.CSSProperties = {
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: -10,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'calc(100% + 2px)',
    height: 'calc(100% + 2px)',
    backgroundImage:
      'linear-gradient(0deg, rgb(from var(--primary) r g b / 0.4) -50%, rgb(from var(--primary) r g b / 0.05) 100%)',
    borderRadius: '1rem'
  };

  const rotatingBorderStyle: React.CSSProperties = {
    content: '""',
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 200,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(0deg)',
    transformOrigin: 'left',
    width: '200%',
    height: '10rem',
    backgroundImage:
      'linear-gradient(0deg, transparent 0%, hsl(150 50% 45% / 0.7) 40%, hsl(165 45% 55% / 0.7) 60%, transparent 100%)',
    animation: 'rooted-pricing-rotate 10s linear infinite'
  };

  return (
    <div
      className="dark group ring-brand/15 relative flex h-full flex-col rounded-2xl p-6 pt-10 ring-1 transition-all duration-300 sm:p-8 sm:pt-12"
      style={cardStyle}
    >
      <style>{`@keyframes rooted-pricing-rotate { to { transform: translate(-50%, -50%) rotate(360deg); } }`}</style>

      {tier.popular && (
        <div className="absolute top-0 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <span className="bg-brand text-[#0A1F15] rounded-full px-4 py-1 text-xs font-semibold tracking-wide whitespace-nowrap">
            MOST POPULAR
          </span>
        </div>
      )}

      <div className="relative flex flex-grow flex-col">
        <div style={borderContainerStyle} className="overflow-hidden">
          <div style={rotatingBorderStyle} />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`ring-brand/30 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ring-1 ${tier.iconRing} text-brand`}
            >
              {tier.icon}
            </div>
            <div>
              <h3 className="font-display text-[#F5F0E8] text-xl font-semibold tracking-tight">
                {tier.title}
              </h3>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-[#F5F0E8] text-4xl font-semibold tracking-tight">
              {tier.priceLine}
            </span>
            {tier.priceSuffix && (
              <span className="text-[#F5F0E8]/70 text-sm">
                {tier.priceSuffix}
              </span>
            )}
          </div>
          <p className="text-[#F5F0E8]/85 mt-2 text-sm leading-relaxed">
            {tier.description}
          </p>
        </div>

        <ul className="space-y-3 text-sm">
          {tier.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3">
              <div className="bg-brand/20 ring-brand/35 mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ring-1">
                <Check className="text-brand size-3 stroke-[3]" />
              </div>
              <span className="text-[#F5F0E8]/90">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <StoreBadges size="sm" />
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <Section id="pricing" className="py-20 sm:py-32">
      <div className="max-w-container mx-auto flex flex-col items-center gap-10 px-4 sm:gap-16">
        <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            Pricing
          </p>
          <h2 className="font-display text-primary text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
            <AnimatedHeading>Free forever for the essentials.</AnimatedHeading>
          </h2>
          <p className="text-muted-foreground text-pretty">
            Subscriptions are billed through Google Play and the App Store
            once the app is live — not on this website. You never hand a
            card to us directly.
          </p>
        </div>

        <div className="grid w-full max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
          {tiers.map((tier, i) => (
            <Reveal key={tier.title} delay={i * 0.12} amount={0.25}>
              <PricingCard tier={tier} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
