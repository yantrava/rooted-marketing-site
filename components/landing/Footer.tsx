'use client';

import { Wordmark } from './Wordmark';
import { ModeToggle } from './mode-toggle';

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const columns: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { text: 'How it works', href: '/#how-it-works' },
      { text: 'Features', href: '/#features' },
      { text: 'Science', href: '/#science' },
      { text: 'Pricing', href: '/#pricing' },
      { text: 'FAQ', href: '/#faq' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { text: 'Privacy', href: '/privacy' },
      { text: 'Terms', href: '/terms' },
      { text: 'Attribution', href: '/attribution' }
    ]
  },
  {
    title: 'Help',
    links: [
      { text: 'Support', href: '/support' },
      { text: 'Join the beta', href: '/#waitlist' }
    ]
  }
];

export const Footer = () => {
  return (
    <footer className="bg-background border-border/60 w-full border-t px-4">
      <div className="max-w-container mx-auto">
        <div className="grid gap-10 py-14 md:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-4">
            <Wordmark />
            <p className="text-muted-foreground max-w-xs text-sm text-pretty">
              Care for plants like a botanist, not a guesser. Science, not
              guesswork.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-2">
              <h3 className="text-foreground pt-1 text-sm font-semibold">
                {column.title}
              </h3>
              {column.links.map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {link.text}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="border-border/60 flex flex-col items-start justify-between gap-4 border-t py-6 sm:flex-row sm:items-center">
          <div className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Rooted. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-sm">
            <ModeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
};
