'use client';

import { AnimatedHeading } from '@/components/ui/animated-heading';
import { Counter } from '@/components/ui/counter';
import { ParticleField } from '@/components/ui/particle-field';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';
import { GlowCard } from '@/components/ui/spotlight-card';

// Editorial science card. Anchors the "plants, not guesses" positioning
// with a concrete look at how identification actually works inside the
// app — several vision models vote, confidence scores weight those
// votes, and a disagreement check suppresses low-quality results before
// the user ever sees them. The right-hand panel mirrors the data-sheet
// feel of a research abstract without revealing the proprietary weights.
export function Science() {
  return (
    <Section id="science" className="py-20 sm:py-32">
      <div className="max-w-container mx-auto flex flex-col gap-10 px-4 sm:gap-16 lg:flex-row">
        <Reveal direction="left" className="flex max-w-md flex-col gap-4">
          <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            The science
          </p>
          <h2 className="font-display text-primary text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
            <AnimatedHeading>Identification, as a consensus.</AnimatedHeading>
          </h2>
          <p className="text-muted-foreground text-pretty">
            Every photo runs through several vision models trained on
            different plant datasets. Each model returns a candidate species
            and a confidence score. Rooted weights the votes, flags
            disagreement, and keeps the result only when the ensemble agrees
            with itself.
          </p>
        </Reveal>

        <Reveal direction="right" delay={0.15} className="relative flex-1">
          {/* GlowCard restored — cursor-tracking spotlight + brand-tuned
              forest-to-sage glowing border (21st.dev easemize/spotlight-
              card adapted via the `rooted` glowColor preset). Backdrop
              overridden to the same flat phthalo OKLCH as the Features
              cards so the surface colour stays locked; the GlowCard only
              adds the animated border + cursor spotlight on top. */}
          <GlowCard
            customSize
            glowColor="rooted"
            className="dark p-6 sm:p-10"
            style={{ backgroundColor: 'oklch(20% 0.028 155)' }}
          >
            <ParticleField className="z-0" count={36} />
            <div className="relative z-10">
              <div className="text-[#F5F0E8]/70 mb-4 flex items-center justify-between text-xs font-semibold tracking-widest uppercase">
                <span>Ensemble trace</span>
                <span>Sample photo</span>
              </div>
              <pre className="text-[#F5F0E8] font-mono text-xs leading-relaxed whitespace-pre-wrap sm:text-sm">{`photo  ──▶  model a  ·  0.91   →  Monstera deliciosa
       ──▶  model b  ·  0.87   →  Monstera deliciosa
       ──▶  model c  ·  0.34   →  Monstera adansonii
       ──▶  model d  ·  0.72   →  Monstera deliciosa
       ─────────────────────────────────────────────
       weighted result          →  Monstera deliciosa
       ensemble confidence      →  0.89
       disagreement             →  1 model (non-decisive)`}</pre>
              <dl className="text-[#F5F0E8]/85 mt-8 grid grid-cols-1 gap-x-6 gap-y-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-[#F5F0E8] font-medium">Confidence floor</dt>
                  <dd>Result suppressed below 0.60. Rooted asks for a second photo.</dd>
                </div>
                <div>
                  <dt className="text-[#F5F0E8] font-medium">Disagreement policy</dt>
                  <dd>Flagged when two or more models disagree on genus.</dd>
                </div>
                <div>
                  <dt className="text-[#F5F0E8] font-medium">Sources cited</dt>
                  <dd>ASPCA · Pet Poison · NIH PubMed</dd>
                </div>
                <div>
                  <dt className="text-[#F5F0E8] font-medium">Verified species</dt>
                  <dd>
                    <Counter to={234} className="text-[#F5F0E8] font-medium" /> of
                    382 with hand-checked toxicity data.
                  </dd>
                </div>
              </dl>
            </div>
          </GlowCard>
        </Reveal>
      </div>
    </Section>
  );
}
