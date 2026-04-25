'use client';

import {
  CameraIcon,
  BookOpenIcon,
  DropletsIcon,
  LeafIcon,
  StethoscopeIcon,
  UsersIcon,
  WifiOffIcon,
  LanguagesIcon
} from 'lucide-react';
import type * as React from 'react';
import { ReactNode } from 'react';
import { AnimatedHeading } from '@/components/ui/animated-heading';
import { BorderBeam } from '@/components/ui/border-beam';
import {
  Item,
  ItemDescription,
  ItemIcon,
  ItemTitle
} from '@/components/ui/item';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { TiltCard } from '@/components/ui/tilt-card';

interface ItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

// Flat phthalo-green surface — hardcoded to the same OKLCH value as the
// dark-mode `--card` token (which is what the Science GlowCard renders
// against). No gradients, no light/dark contrast variance. The BorderBeam
// handles the edge on hover, in cream.
const cardSurfaceStyle: React.CSSProperties = {
  backgroundColor: 'oklch(20% 0.028 155)'
};

// Eight features mapped 1:1 to what Rooted actually ships today. Bodies
// are held to roughly equal word counts so the grid reads as a flat
// rhythm rather than a ragged edge.
const items: ItemProps[] = [
  {
    title: 'Next-gen AI plant identification',
    description:
      'Rooted runs every photo through multiple identification models and weights each vote by confidence, so a single bad guess never decides the result.',
    icon: <CameraIcon className="size-5 stroke-1" />
  },
  {
    title: 'Verified plant-care database',
    description:
      'Hundreds of common houseplants with watering, light, and toxicity data hand-checked against ASPCA, Pet Poison Helpline, and peer-reviewed NIH research.',
    icon: <BookOpenIcon className="size-5 stroke-1" />
  },
  {
    title: 'Science-backed watering',
    description:
      'A watering plan for every plant, shaped by your pot, light, humidity, drainage, and the real weather at your location. Rooted keeps it in step with the seasons.',
    icon: <DropletsIcon className="size-5 stroke-1" />
  },
  {
    title: 'Guided add-plant setup',
    description:
      'A one-minute walkthrough captures everything Rooted needs for a new plant. Your answers stay visible on the plant’s detail screen if you want to revisit them.',
    icon: <LeafIcon className="size-5 stroke-1" />
  },
  {
    title: 'Dr. Rooted diagnosis',
    description:
      'Send a photo of a sick leaf and Dr. Rooted suggests the likely cause, matched against a 25-pest library of the problems houseplants typically run into.',
    icon: <StethoscopeIcon className="size-5 stroke-1" />
  },
  {
    title: 'Community and Plant Swap',
    description:
      'A live feed of care tips and photos from other plant keepers, plus a proximity-based plant swap with one-to-one chat when you find something to trade.',
    icon: <UsersIcon className="size-5 stroke-1" />
  },
  {
    title: 'Offline-first and no ads',
    description:
      'Your garden, care history, and plant data stay available when you lose signal. Dark mode follows your system, and Rooted has never shown an ad.',
    icon: <WifiOffIcon className="size-5 stroke-1" />
  },
  {
    title: 'Ten-language support',
    description:
      'Rooted ships in English, Hindi, Spanish, Portuguese, French, German, Tamil, Telugu, Bengali, and Marathi. Pick yours anytime and Rooted remembers it.',
    icon: <LanguagesIcon className="size-5 stroke-1" />
  }
];

export function Items() {
  return (
    <Section id="features" className="py-20 sm:py-32">
      <div className="max-w-container mx-auto flex flex-col items-center gap-10 px-4 sm:gap-16">
        <div className="flex max-w-3xl flex-col items-center gap-4 text-center">
          <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            Features
          </p>
          <h2 className="font-display text-primary text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
            <AnimatedHeading>Every capability here already ships in the app.</AnimatedHeading>
          </h2>
          <p className="text-muted-foreground max-w-xl text-pretty">
            If it's on this list, you'll see it the minute you open Rooted.
          </p>
        </div>
        <div className="grid w-full auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal
              key={index}
              delay={(index % 4) * 0.08}
              amount={0.25}
              className="h-full"
            >
              <TiltCard
                tiltLimit={10}
                scale={1.03}
                spotlight={false}
                className="dark group h-full rounded-xl"
                style={cardSurfaceStyle}
              >
                <Item className="relative h-full rounded-xl text-[#F5F0E8]">
                  <ItemTitle className="text-[#F5F0E8] flex items-center gap-2">
                    <ItemIcon className="text-brand">{item.icon}</ItemIcon>
                    {item.title}
                  </ItemTitle>
                  <ItemDescription className="text-[#F5F0E8]/85 max-w-none">
                    {item.description}
                  </ItemDescription>
                  <BorderBeam
                    duration={7}
                    delay={-(index * 0.9)}
                    colorFrom="rgba(245, 240, 232, 0.85)"
                    colorTo="rgba(245, 240, 232, 0)"
                    className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </Item>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
