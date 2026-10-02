import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { Fraunces, Inter } from 'next/font/google';
import { getURL } from '@/utils/helpers';
import '@/styles/main.css';
import { MotionProvider, PHProvider } from './providers';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import PostHogPageViewWrapper from '@/components/misc/PostHogPageViewWrapper';
// RootedVine is wrapped in a Client Component because Next.js 16 doesn't
// permit `dynamic({ ssr: false })` directly inside Server Components.
// See components/landing/RootedVineClient.tsx for the reasoning.
import { RootedVineClient as RootedVine } from '@/components/landing/RootedVineClient';

// Serif display face per the "Verdant Cartography" philosophy — a
// high-contrast serif of classical proportions that anchors the wordmark
// and H1s. Variable font, optical-sized, display:swap so text paints
// immediately and re-lays-out when the custom weights arrive.
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  axes: ['opsz', 'SOFT']
});

// Body + UI face. Variable Inter, all weights available at runtime.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans'
});

const site = {
  name: 'Rooted',
  tagline: 'Care for plants like a botanist, not a guesser.',
  description:
    'Rooted identifies your plants and builds a watering schedule tuned to your home — your pot, your light, your humidity, and the real weather outside. A verified care database cross-checked against ASPCA and the Pet Poison Helpline.',
  cardImage: getURL('/api/og'),
  url: getURL(),
  twitterHandle: '@rootedapp'
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: `${site.name} — ${site.tagline}`,
      template: `%s — ${site.name}`
    },
    description: site.description,
    keywords: [
      'plant care app',
      'plant identification',
      'watering schedule',
      'indoor plants',
      'houseplant care',
      'plant health diagnosis',
      'plant pest identification',
      'Planta alternative',
      'PictureThis alternative'
    ],
    authors: [{ name: 'Manav Jain', url: site.url }],
    creator: 'Manav Jain',
    publisher: site.name,
    referrer: 'origin-when-cross-origin',
    robots: 'follow, index',
    icons: { icon: '/favicon.ico', apple: '/apple-icon.png' },
    metadataBase: new URL(site.url),
    alternates: { canonical: '/' },
    openGraph: {
      url: site.url,
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
      images: [{ url: site.cardImage, width: 1200, height: 630, alt: site.name }],
      type: 'website',
      siteName: site.name,
      locale: 'en_IN'
    },
    twitter: {
      card: 'summary_large_image',
      site: site.twitterHandle,
      creator: site.twitterHandle,
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
      images: [{ url: site.cardImage, width: 1200, height: 630 }]
    }
  };
}

// JSON-LD: two schema blocks describing the app + the organization so
// Google surfaces rich results and LLM-driven search engines (ChatGPT
// Search, Perplexity) can reason about Rooted. FAQPage schema lives
// with the FAQ section on the home route itself.
const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Rooted',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Android, iOS',
  description: site.description,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
    availability: 'https://schema.org/PreOrder'
  },
  url: site.url,
  image: site.cardImage,
  publisher: {
    '@type': 'Organization',
    name: 'Rooted',
    url: site.url
  }
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Rooted',
  url: site.url,
  logo: `${site.url}/icon.png`,
  description: site.description,
  sameAs: [] as string[]
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable}`}
    >
      <body className="font-sans antialiased">
        {/* JSON-LD must render in the SSR HTML so non-JS crawlers (Bing,
            social previews, AI bots) and Googlebot's first-pass indexer
            see the schema before any client hydration. next/script
            injects after page load, which is too late. */}
        <script id="ld-softwareapp" type="application/ld+json">
          {JSON.stringify(softwareAppSchema)}
        </script>
        <script id="ld-organization" type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <PHProvider>
            <MotionProvider>
              <PostHogPageViewWrapper />
              <main
                id="skip"
                className="relative min-h-[calc(100dvh-4rem)] md:min-h-[calc(100dvh-5rem)]"
              >
                {/* Site-wide scroll-driven vine. Absolutely positioned
                    inside <main> (which is now `relative`) so it scrolls
                    with the document — drawn portion always lands inside
                    the user's viewport instead of trailing above. */}
                <RootedVine />
                {children}
              </main>
              <Toaster />
            </MotionProvider>
          </PHProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
