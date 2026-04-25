'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

if (typeof window !== 'undefined') {
  // capture_exceptions is supported by the posthog-js runtime but the TS
  // types in 1.139.x lag — cast to suppress until next bump. Disabling it
  // avoids the deprecated `extendPostHogWithExceptionAutocapture` plugin
  // chunk that's currently throwing a console error on first load.
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false, // we capture pageviews manually in PostHogPageView
    disable_session_recording: true, // marketing site doesn't need replay
    capture_exceptions: false // exceptions go to Sentry on Flutter; PostHog autocapture is unstable
  } as Parameters<typeof posthog.init>[1]);
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
