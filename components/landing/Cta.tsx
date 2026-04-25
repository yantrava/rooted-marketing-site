'use client';

import { useState } from 'react';
import { AnimatedHeading } from '@/components/ui/animated-heading';
import { FloatingInput } from '@/components/ui/floating-input';
import { GradientBorderButton } from '@/components/ui/gradient-border-button';
import { Section } from '@/components/ui/section';
import { useToast } from '@/components/ui/use-toast';
import { StoreBadges } from './StoreBadges';

// Final CTA. Doubles as the #waitlist anchor every store badge on the
// page scrolls to. POSTs the email to /api/waitlist which writes into
// the waitlist_emails Supabase table (RLS: anon INSERT only).
export const Cta = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'idle') return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('done');
      toast({
        title: "You're on the list.",
        description: 'We will email you the moment Rooted lands on the stores.'
      });
    } catch {
      setStatus('idle');
      toast({
        title: "Couldn't save that — try again?",
        description: 'If it keeps happening, drop us a line at /support.',
        variant: 'destructive'
      });
    }
  };

  return (
    <Section
      id="waitlist"
      className="group relative scroll-mt-20 overflow-hidden py-20 sm:py-32"
    >
      <div className="max-w-container relative z-10 mx-auto flex flex-col items-center gap-10 px-4 text-center sm:gap-16">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            Join the beta
          </p>
          <h2 className="font-display text-primary text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
            <AnimatedHeading>Know your plants. Grow with science.</AnimatedHeading>
          </h2>
          <p className="text-muted-foreground text-pretty">
            One email when Rooted lands on the stores. No newsletter, no
            marketing spam — just the launch note and maybe a thank-you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col items-end gap-6 sm:flex-row sm:items-center"
        >
          <FloatingInput
            type="email"
            required
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status !== 'idle'}
            aria-label="Email address"
          />
          <GradientBorderButton
            type="submit"
            size="lg"
            disabled={status !== 'idle'}
            className="sm:min-w-[11rem]"
          >
            {status === 'done'
              ? 'On the list'
              : status === 'submitting'
                ? 'Saving…'
                : 'Notify me'}
          </GradientBorderButton>
        </form>

        <div className="mt-4 flex flex-col items-center gap-3">
          <span className="text-muted-foreground text-xs">
            Or tap a store badge when listings go live:
          </span>
          <StoreBadges size="sm" />
        </div>
      </div>
    </Section>
  );
};
