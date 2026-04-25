import { PropsWithChildren } from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

// Shared chrome for the legal + support routes so they inherit the same
// Navbar + Footer the landing page uses. Route group (marketing) keeps
// the URL flat — /privacy instead of /marketing/privacy.
export default function MarketingLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <div className="prose prose-neutral dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-h1:text-4xl prose-h2:text-2xl prose-a:text-primary dark:prose-a:text-primary-foreground prose-a:no-underline hover:prose-a:underline mx-auto max-w-3xl px-4 py-16 sm:py-24">
        {children}
      </div>
      <Footer />
    </>
  );
}
