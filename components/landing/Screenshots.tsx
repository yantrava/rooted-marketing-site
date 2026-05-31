'use client';

import Image from 'next/image';

// Auto-sliding screenshot marquee. The track holds the eight phone shots
// rendered TWICE back-to-back; a pure-CSS keyframe (`marquee-x`, defined
// in styles/main.css) translates the flex track from 0 to -50% on an
// infinite linear loop. Because the second half is pixel-identical to the
// first, the reset at -50% lands on the same frame as 0 — the seam is
// invisible, so it reads as one continuous, never-jumping slide.
//
// CSS transform is used deliberately over framer-motion: a compositor-only
// `translateX` animation never drops a frame during long scrolls and keeps
// sliding even while React is busy. Pause-on-hover via a group class; a
// `prefers-reduced-motion` media query in the stylesheet freezes the track
// and lets it fall back to a normal horizontal scroll.
//
// Embedded in the Hero's product-shot slot (first fold) — no own heading,
// since the Hero H1 already carries the page. Exported as a bare marquee.
const shots = [
  { src: '/screenshots/01.png', alt: 'Rooted home dashboard with today’s plant-care tasks' },
  { src: '/screenshots/02.png', alt: 'Rooted plant identification result with care details' },
  { src: '/screenshots/03.png', alt: 'Rooted garden view of a personal plant collection' },
  { src: '/screenshots/04.png', alt: 'Rooted watering schedule tuned to your home' },
  { src: '/screenshots/05.png', alt: 'Rooted Dr. Rooted plant-diagnosis screen' },
  { src: '/screenshots/06.png', alt: 'Rooted plant detail with light and humidity guidance' },
  { src: '/screenshots/07.png', alt: 'Rooted community feed and plant swap' },
  { src: '/screenshots/08.png', alt: 'Rooted seasonal garden hero screen' }
];

// Doubled list — the seamless-loop requirement. `aria-hidden` on the clone
// so screen readers announce each shot only once.
const track = [
  ...shots.map((s) => ({ ...s, clone: false })),
  ...shots.map((s) => ({ ...s, clone: true }))
];

// Bare sliding strip. Drop into any slot; sizes to its container width.
// Edge fade via mask-image; pause-on-hover via the `group` wrapper.
export function ScreenshotMarquee() {
  return (
    <div
      className="group relative w-full overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
      }}
    >
      <ul className="animate-marquee-x flex w-max gap-4 sm:gap-6 group-hover:[animation-play-state:paused]">
        {track.map((shot, i) => (
          <li
            key={i}
            aria-hidden={shot.clone}
            className="border-border/40 bg-card ring-primary/5 relative h-[420px] w-[194px] shrink-0 overflow-hidden rounded-3xl border shadow-xl ring-1 sm:h-[560px] sm:w-[259px]"
          >
            <Image
              src={shot.src}
              alt={shot.clone ? '' : shot.alt}
              fill
              sizes="(max-width: 640px) 194px, 259px"
              className="object-cover"
              draggable={false}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
