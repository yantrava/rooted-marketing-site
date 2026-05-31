import dynamic from 'next/dynamic';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Items } from '@/components/landing/Items';
import { Navbar } from '@/components/landing/Navbar';
import { Science } from '@/components/landing/Science';

// Above-the-fold sections (Navbar, Hero) plus the first scroll
// (HowItWorks, Items, Science) load eagerly. The four sections that sit
// below the visible viewport on first paint — Pricing, FAQ, Cta, Footer
// — are wrapped in `next/dynamic`. Default `ssr: true` so the SSR HTML
// is identical to before (zero visual change, zero CLS, zero hydration
// warnings); only the client-side JS for those sections is split into a
// separate chunk that the browser can fetch after the critical render.
const Screenshots = dynamic(() =>
  import('@/components/landing/Screenshots').then(m => m.Screenshots)
);
const Pricing = dynamic(() =>
  import('@/components/landing/Pricing').then(m => m.Pricing)
);
const FAQ = dynamic(() =>
  import('@/components/landing/FAQ').then(m => m.FAQ)
);
const Cta = dynamic(() =>
  import('@/components/landing/Cta').then(m => m.Cta)
);
const Footer = dynamic(() =>
  import('@/components/landing/Footer').then(m => m.Footer)
);

// Marketing home is fully public — no auth gating, no Supabase queries.
// The /account route still exists from the boilerplate for future web-
// parity work, but nothing on the landing path touches it.
export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Items />
      <Science />
      <Screenshots />
      <Pricing />
      <FAQ />
      <Cta />
      <Footer />
    </>
  );
}
