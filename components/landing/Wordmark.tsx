import Image from 'next/image';

// Compact Rooted lockup: the official mark paired with the serif
// wordmark. Two mark variants are shipped — light-background + dark-
// background — and swapped via Tailwind's dark: variant so the mark
// stays legible in both themes without needing a client-side theme
// hook. Wordmark uses the Fraunces display face loaded in root layout.
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/brand/logo-light.svg"
        alt=""
        width={28}
        height={28}
        priority
        className="block shrink-0 dark:hidden"
      />
      <Image
        src="/brand/logo-dark.svg"
        alt=""
        width={28}
        height={28}
        priority
        className="hidden shrink-0 dark:block"
      />
      <span className="font-display text-xl font-semibold tracking-tight text-primary dark:text-brand">
        Rooted
      </span>
    </span>
  );
}
