'use client';

import posthog from 'posthog-js';
import { MotionConfig } from 'motion/react';
import { PostHogProvider } from 'posthog-js/react';
import { useEffect } from 'react';

// PostHog initialization is deferred to browser idle time so the analytics
// SDK doesn't compete with the critical first-paint render. On modern
// browsers we use `requestIdleCallback` with a 2-second hard timeout; on
// older Safari (pre-14ish) we fall back to a setTimeout(1). Pageview
// captures fired before init are silently no-op'd by posthog-js, which is
// an acceptable tradeoff — a sub-2s navigation is rare and not a primary
// signal anyway. The PostHogProvider always passes the live posthog
// singleton via React context, so any consumer that calls into it after
// init lands on a fully ready instance.
export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initPosthog = () => {
      // capture_exceptions is supported by the posthog-js runtime but the
      // TS types in 1.139.x lag — cast to suppress until next bump.
      // Disabling it avoids the deprecated
      // `extendPostHogWithExceptionAutocapture` plugin chunk that's
      // currently throwing a console error on first load.
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        capture_pageview: false, // we capture pageviews manually in PostHogPageView
        disable_session_recording: true, // marketing site doesn't need replay
        capture_exceptions: false // exceptions go to Sentry on Flutter; PostHog autocapture is unstable
      } as Parameters<typeof posthog.init>[1]);
    };

    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const w = window as IdleWindow;

    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(initPosthog, { timeout: 2000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(initPosthog, 1);
    return () => window.clearTimeout(id);
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

// Site-wide reduced-motion policy for every `motion` component. With
// reducedMotion="user" and the OS Reduce Motion setting on, transform and
// layout animations stop while opacity and colour still animate. Scroll-linked
// values (useScroll / useTransform / useSpring) are outside what MotionConfig
// controls; they need their own useReducedMotion() guard.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
