/**
 * Official Play Store + App Store download badges. The actual SVG artwork
 * lives in /public/store-badges/; we use Google's "Get it on Google Play"
 * badge (color, English) and Apple's "Download on the App Store" badge
 * (black lockup, English) — both straight from the official partner kits.
 *
 * Sizing strategy: both badges rendered at the SAME pixel height with
 * width auto-scaling from each SVG's intrinsic aspect. Apple's official
 * SVG has a hardcoded `width="119.66407" height="40"` attribute inside
 * the file which would otherwise lock its rendered size; we explicitly
 * override via `width:auto; height:Npx` plus a `data-rooted-badge` hook
 * styled in main.css so the browser respects our height regardless.
 *
 * Per Apple guidelines: minimum 40pt, no aspect distortion, no recolour.
 * Per Google guidelines: minimum 60dp, no aspect distortion, no recolour.
 * Both badges therefore render at slightly different widths (Google 3.37:1,
 * Apple 2.99:1) — that's the official spec, accepted on every major SaaS
 * marketing site.
 *
 * While Rooted isn't live on either store yet, both badges scroll to the
 * `#waitlist` anchor on the landing page so visitors can still opt in.
 * Swap the anchors for the real store URLs once listings go live.
 */
export function StoreBadges({
  size = 'md',
  className = ''
}: {
  size?: 'sm' | 'md';
  className?: string;
}) {
  const appleHeight = size === 'sm' ? 44 : 52;
  // Google's badge is naturally ~13% wider than Apple's at the same height
  // (3.37:1 vs 2.99:1). We dial Google's height fractionally below Apple's
  // so its rendered width lands within touching distance — at md size that
  // puts Google at ~174px wide vs Apple at ~155px, a difference small
  // enough to read as visual parity.
  const playHeight = size === 'sm' ? 43.5 : 51.5;

  const baseStyle: React.CSSProperties = {
    width: 'auto',
    maxWidth: 'none',
    display: 'block'
  };

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-5 sm:gap-7 ${className}`}
    >
      <a
        href="#waitlist"
        aria-label="Join the Rooted waitlist, coming soon to Google Play"
        className="transition-transform hover:-translate-y-0.5"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/store-badges/google-play.svg?v=5"
          alt="Get it on Google Play"
          style={{ ...baseStyle, height: `${playHeight}px` }}
        />
      </a>
      <a
        href="#waitlist"
        aria-label="Join the Rooted waitlist, coming soon to the App Store"
        className="transition-transform hover:-translate-y-0.5"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/store-badges/app-store.svg?v=5"
          alt="Download on the App Store"
          style={{ ...baseStyle, height: `${appleHeight}px` }}
        />
      </a>
    </div>
  );
}
