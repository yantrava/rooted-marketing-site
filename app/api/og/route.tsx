import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

// Rooted OG image — deep-forest surface with cream editorial block.
// Matches the "Verdant Cartography" palette used across the app and site.
// Rendered at 1200×630 (Twitter Card / Facebook OG spec). Fonts are
// deliberately system-stack so this route doesn't have to ship a
// ~100 KB variable font for a single image. Visual hierarchy comes
// from size + weight + the subtle vertical-axis composition.
const colors = {
  surface: '#0A1F15', // primary-deep, matches dark mode background
  primary: '#123524', // deep forest
  cream: '#F5F0E8',
  creamMuted: '#D8D0BE',
  mint: '#A8C89A'
};

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: `linear-gradient(180deg, ${colors.primary} 0%, ${colors.surface} 100%)`,
          position: 'relative',
          padding: 64
        }}
      >
        {/* Subtle top-axis pill */}
        <div
          style={{
            position: 'absolute',
            top: 64,
            left: 64,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '8px 16px',
            borderRadius: 999,
            border: `1px solid ${colors.cream}33`,
            color: colors.creamMuted,
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: colors.mint
            }}
          />
          Rooted · Coming soon
        </div>

        {/* Main wordmark + tagline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 28,
            maxWidth: 980,
            textAlign: 'center'
          }}
        >
          <h1
            style={{
              fontSize: 120,
              fontWeight: 700,
              color: colors.cream,
              margin: 0,
              letterSpacing: '-0.025em',
              lineHeight: 1,
              fontFamily: 'serif'
            }}
          >
            Rooted
          </h1>
          <p
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: colors.creamMuted,
              margin: 0,
              lineHeight: 1.25
            }}
          >
            Care for plants like a botanist, not a guesser.
          </p>
        </div>

        {/* Bottom strip — spec callouts */}
        <div
          style={{
            position: 'absolute',
            bottom: 56,
            display: 'flex',
            alignItems: 'center',
            gap: 40,
            color: colors.creamMuted,
            fontSize: 22,
            fontWeight: 500
          }}
        >
          <span>AI plant identification</span>
          <span style={{ color: colors.mint }}>·</span>
          <span>Science-backed watering</span>
          <span style={{ color: colors.mint }}>·</span>
          <span>Verified species data</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
