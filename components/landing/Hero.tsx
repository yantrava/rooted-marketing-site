'use client';

import { AnimatedHeading } from '@/components/ui/animated-heading';
import { AuroraBlobs } from '@/components/ui/aurora-blobs';
import { Section } from '@/components/ui/section';
import { ScreenshotMarquee } from './Screenshots';
import { StoreBadges } from './StoreBadges';

// First fold. Per ui-ux-pro-max §"Style Selection" + the Verdant
// Cartography philosophy: centered composition, serif H1 anchoring the
// page, cream background, single primary accent. Badges are the primary
// action — "Join the beta" scrolls to #waitlist since stores aren't
// live yet. Pill microcopy reinforces trust without over-claiming.
export const Hero = () => {
  return (
    <Section className="fade-bottom relative overflow-hidden pb-0 sm:pb-0 md:pb-0">
      <AuroraBlobs />
      <div className="max-w-container mx-auto flex flex-col gap-12 pt-16 sm:gap-16 sm:pt-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-8">
          <span className="animate-appear border-border/60 bg-background/40 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase backdrop-blur-sm">
            <span
              aria-hidden
              className="bg-primary h-1.5 w-1.5 rounded-full"
            />
            Coming soon · Free during beta · No ads, ever
          </span>

          <h1 className="font-display text-primary relative z-10 max-w-4xl text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl">
            <AnimatedHeading>Care for plants like a botanist, not a guesser.</AnimatedHeading>
          </h1>

          <p className="animate-appear text-muted-foreground relative z-10 max-w-2xl text-base font-medium text-balance opacity-0 delay-100 sm:text-lg">
            Rooted identifies your plants and builds a watering schedule tuned
            to your home. It reads your pot, your light, your humidity, and
            the real weather at your location, then tells you when each plant
            needs water.
          </p>

          <div className="animate-appear relative z-10 flex flex-col items-center gap-4 pt-2 opacity-0 delay-300">
            <StoreBadges />
            <span className="text-muted-foreground text-xs">
              Stores launch next. Tap either badge to join the beta waitlist.
            </span>
          </div>
        </div>

        {/* Product shot — the real app screens, auto-sliding. Fills the
         * first-fold slot that previously held an empty placeholder box. */}
        <div className="animate-appear-zoom relative mx-auto w-full max-w-5xl opacity-0 delay-500">
          <ScreenshotMarquee />
        </div>
      </div>
    </Section>
  );
};
