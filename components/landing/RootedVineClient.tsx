'use client';

import dynamic from 'next/dynamic';

// Client-only wrapper around RootedVine. Next.js 16 forbids
// `ssr: false` inside Server Components — the dynamic() with that flag
// must live in a Client Component. This file is the boundary.
//
// The vine is purely a scroll-driven animation (motion/react +
// scrollYProgress + DOM measurement of <footer>). Server rendering it
// adds zero value and contributes to TBT during hydration.
export const RootedVineClient = dynamic(
  () => import('./RootedVine').then((m) => m.RootedVine),
  { ssr: false }
);
