'use client';

import { useState } from 'react';
import type { User } from '@supabase/supabase-js';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { GradientBorderButton } from '@/components/ui/gradient-border-button';
import { Menu } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import { Wordmark } from './Wordmark';

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#features', label: 'Features' },
  { href: '/#science', label: 'Science' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#faq', label: 'FAQ' }
];

// Marketing-only nav. No auth menu — the landing path is public and the
// /account route (inherited from the boilerplate) is reached separately
// once a user signs in through the app. "Join the beta" CTA scrolls to
// the waitlist anchor at the bottom of the home page.
//
// The optional `user` prop is a no-op here; /auth and /account (inherited
// from the boilerplate) still pass it. Accepting the prop without using
// it keeps those routes compiling until their own rebrand lands.
interface NavbarProps {
  user?: User | null;
}

export const Navbar = ({ user: _user }: NavbarProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="glass-2 sticky top-0 z-40 w-full backdrop-blur-md">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="max-w-container mx-auto flex h-14 w-screen justify-between px-4 sm:h-16">
          <NavigationMenuItem className="flex font-bold">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 flex items-center gap-2"
              aria-label="Rooted — home"
            >
              <Wordmark />
            </a>
          </NavigationMenuItem>

          {/* mobile menu — wrapped in NavigationMenuItem so it renders
              as <li>, satisfying the WHATWG rule that <ul> direct
              children must all be <li>. Lighthouse's "Lists do not
              contain only <li>" audit catches the non-<li> case. */}
          <NavigationMenuItem className="flex md:hidden">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2" asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="text-left font-serif text-2xl">
                    Rooted
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-4 px-4">
                  {routeList.map(({ href, label }) => (
                    <a
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="text-foreground hover:text-primary text-base font-medium transition-colors"
                    >
                      {label}
                    </a>
                  ))}
                  <GradientBorderButton
                    href="#waitlist"
                    size="md"
                    onClick={() => setIsOpen(false)}
                  >
                    Join the beta
                  </GradientBorderButton>
                </nav>
              </SheetContent>
            </Sheet>
          </NavigationMenuItem>

          {/* desktop nav links — also wrapped as <li> */}
          <NavigationMenuItem className="hidden gap-2 md:flex">
            {routeList.map(({ href, label }) => (
              <a
                rel="noreferrer noopener"
                key={label}
                href={href}
                className={`${buttonVariants({ variant: 'ghost' })} text-muted-foreground hover:text-foreground`}
              >
                {label}
              </a>
            ))}
          </NavigationMenuItem>

          <NavigationMenuItem className="hidden items-center gap-2 md:flex">
            <ModeToggle />
            <GradientBorderButton href="#waitlist" size="sm">
              Join the beta
            </GradientBorderButton>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
