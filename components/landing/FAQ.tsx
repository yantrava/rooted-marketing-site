'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { AnimatedHeading } from '@/components/ui/animated-heading';
import { Reveal } from '@/components/ui/reveal';
import { Section } from '@/components/ui/section';

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

// Six FAQs drafted to answer what reviewers and first-touch users
// actually ask. Answers are specific, cite real numbers, don't hide the
// app's current state ("coming soon", not "launched").
const FAQList: FAQProps[] = [
  {
    question: 'When will Rooted launch on Google Play and the App Store?',
    answer:
      'Rooted is in closed beta right now. Join the waitlist and we will email you the day the listings go live.',
    value: 'item-1'
  },
  {
    question: 'What data does Rooted collect about me and my plants?',
    answer:
      'Email, authentication token, plant photos you upload, and approximate location (for the weather-aware watering factor). We never share data with advertisers. Details in the Privacy Policy, written to be DPDP-compliant for India and GDPR-compliant for future EU users. You can request a full data export from inside the app at any time.',
    value: 'item-2'
  },
  {
    question: 'How accurate is the plant identification?',
    answer:
      'Rooted blends multiple AI identification engines, each weighted by its confidence score, so a single engine’s mistake does not end up as the final result. An on-device identification fallback for poor-connectivity locations is in development and will ship before public launch.',
    value: 'item-3'
  },
  {
    question: 'Is Rooted free?',
    answer:
      'Yes. Identification, the watering schedule, the community, the 25-pest library, and unlimited plants are free forever. Rooted Pro adds unlimited Dr. Rooted diagnoses and deeper care analytics. Pricing is being finalised; beta users get a clear discount on their first year.',
    value: 'item-4'
  },
  {
    question: 'Does it work offline?',
    answer:
      'Your garden and plant data stay available when you lose signal, and watering calculations run locally on your phone. Identification, Community, Plant Swap, and weather-aware adjustments all need a connection today; an offline identification fallback is in development.',
    value: 'item-5'
  },
  {
    question: 'How is Rooted built?',
    answer:
      'Rooted is built around verified plant data. Every toxicity claim is cross-checked against ASPCA, Pet Poison Helpline, and peer-reviewed NIH sources. 234 of 382 species are verified so far and the full set will be done before public launch. The app itself runs on Flutter and Supabase.',
    value: 'item-6'
  }
];

// FAQPage schema so Google surfaces the Q&A pairs as rich results and
// LLM-driven search engines can cite specific answers. Rendered via
// next/script in JSON-LD mode — no raw HTML injection needed.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQList.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer }
  }))
};

export const FAQ = () => {
  return (
    <Section id="faq" className="py-20 sm:py-32">
      {/* JSON-LD rendered as a plain <script> so it lands in the SSR
          HTML — afterInteractive injection happens too late for the
          first crawl pass. */}
      <script id="ld-faq" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <div className="max-w-container mx-auto flex flex-col items-center gap-10 px-4">
        <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            Questions
          </p>
          <h2 className="font-display text-primary text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
            <AnimatedHeading>Frequently asked.</AnimatedHeading>
          </h2>
        </div>

        <Reveal className="w-full max-w-3xl">
          <Accordion
            type="single"
            collapsible
            className="AccordionRoot w-full"
          >
            {FAQList.map(({ question, answer, value }) => (
              <AccordionItem key={value} value={value}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-pretty">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <p className="text-muted-foreground text-sm">
          Still have a question?{' '}
          <a
            href="/support"
            className="text-primary dark:text-brand hover:border-primary border-b border-transparent font-medium transition-colors"
          >
            Visit the support page
          </a>
          .
        </p>
      </div>
    </Section>
  );
};
