'use client';

import React from 'react';
import { cn } from '@/utils/cn';

// Adapted from 21st.dev Shatlyk1011/gradient-borders-button/default.
// The original uses a violet->sky radial gradient; tuned here to Rooted's
// forest-green-to-sage brand palette. Inner pill surface uses `--background`
// in light and `--card` in dark so the button reads as branded chrome on
// either mode. Polymorphic — renders <button> by default, <a> when href is
// passed (used for Navbar "Join the beta" anchors).

type CommonProps = {
  className?: string;
  children?: React.ReactNode;
  /** Size preset. sm = navbar pill, md = default body CTA, lg = hero form submit. */
  size?: 'sm' | 'md' | 'lg';
};

type AsAnchor = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
    type?: never;
    disabled?: never;
  };

type AsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: never;
  };

export type GradientBorderButtonProps = AsAnchor | AsButton;

const SIZE_STYLES: Record<NonNullable<CommonProps['size']>, string> = {
  sm: 'h-8 px-4 text-xs',
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-6 text-base'
};

export function GradientBorderButton(props: GradientBorderButtonProps) {
  const { className, children, size = 'md' } = props;

  const outerClass = cn(
    'group relative inline-block cursor-pointer rounded-full border-none bg-secondary p-[1.5px] font-semibold leading-6 no-underline outline-none',
    'focus:ring-primary focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background',
    'dark:bg-card dark:focus-visible:ring-offset-background',
    (props as AsButton).disabled && 'cursor-not-allowed opacity-60',
    className
  );

  const inner = (
    <>
      {/* Animated radial gradient — forest at top, sage at bottom. Dims to
       * 40% outside hover so the button is still legible; intensifies to
       * 100% on hover. Keep the gradient inside an absolutely positioned
       * <span> so it doesn't bleed into the inner pill. */}
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span
          className={cn(
            'absolute inset-0 rounded-full opacity-60 transition-opacity duration-500 group-hover:opacity-100 dark:opacity-50 dark:group-hover:opacity-100'
          )}
          style={{
            background:
              'radial-gradient(85% 100% at 50% 0%, rgb(74 153 112 / 1) 0%, rgb(18 53 36 / 1) 75%)'
          }}
        />
      </span>
      {/* Inner pill — brand background with subtle ring. */}
      <span
        className={cn(
          'relative z-10 flex items-center justify-center gap-2 rounded-full ring-1 ring-primary/15',
          'bg-background text-foreground/90 dark:bg-card dark:text-foreground/90',
          SIZE_STYLES[size]
        )}
      >
        {children}
      </span>
      {/* Soft sage underline accent — subtle flourish on hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[18px] h-px w-[calc(100%-36px)] opacity-0 transition-opacity duration-500 group-hover:opacity-70"
        style={{
          background:
            'linear-gradient(to right, rgb(74 153 112 / 0) 0%, rgb(74 153 112 / 0.9) 50%, rgb(74 153 112 / 0) 100%)'
        }}
      />
    </>
  );

  if ('href' in props && props.href) {
    const { href, size: _s, className: _c, children: _ch, ...anchorRest } = props as AsAnchor;
    return (
      <a href={href} className={outerClass} {...anchorRest}>
        {inner}
      </a>
    );
  }

  const {
    size: _s,
    className: _c,
    children: _ch,
    type = 'button',
    ...buttonRest
  } = props as AsButton;
  return (
    <button type={type} className={outerClass} {...buttonRest}>
      {inner}
    </button>
  );
}
