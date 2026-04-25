import { Cta } from '@/components/landing/Cta';
import { FAQ } from '@/components/landing/FAQ';
import { Footer } from '@/components/landing/Footer';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Items } from '@/components/landing/Items';
import { Navbar } from '@/components/landing/Navbar';
import { Pricing } from '@/components/landing/Pricing';
import { Science } from '@/components/landing/Science';

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
      <Pricing />
      <FAQ />
      <Cta />
      <Footer />
    </>
  );
}
