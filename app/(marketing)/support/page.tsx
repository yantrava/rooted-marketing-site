import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/landing/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Get help with Rooted. Contact the team, check the FAQ, or request a full export of your data.',
  alternates: { canonical: '/support' },
  openGraph: { url: '/support' }
};

export default function SupportPage() {
  return (
    <article>
      <BreadcrumbJsonLd name="Support" path="/support" />
      <h1>Support</h1>
      <p>
        Need a hand? Pick the fastest path below. Replies usually land
        within a day or two on weekdays.
      </p>

      <h2>Email us</h2>
      <p>
        <a href="mailto:support@rooted.app">support@rooted.app</a> — once the
        domain is live. Until then, please DM on the social handles in the
        footer, or email us at{' '}
        <a href="mailto:manavj10@gmail.com">manavj10@gmail.com</a> with the
        subject line starting <code>[Rooted]</code>.
      </p>

      <h2>Common issues</h2>
      <ul>
        <li>
          <strong>Plant identification feels off</strong> — make sure you are
          photographing a single leaf or the whole plant against a plain
          background. Backlit photos lose resolution and make it harder for
          Rooted to place the species correctly.
        </li>
        <li>
          <strong>Watering schedule looks wrong</strong> — check your plant's
          care profile (pot material, drainage, light, AC/heater). If any
          of those changed recently, tap Edit plant → Save to regenerate the
          schedule.
        </li>
        <li>
          <strong>Didn't get the password-reset email</strong> — check spam.
          If still missing, email us with the account address.
        </li>
        <li>
          <strong>I want to delete my account / export my data</strong> —
          both options live at Settings → Profile inside the app, per DPDP
          and GDPR. See our{' '}
          <a href="/privacy">Privacy Policy</a> for the exact process.
        </li>
      </ul>

      <h2>Report a bug</h2>
      <p>
        Include the device, Android/iOS version, and what you were doing
        when it broke. Screenshots help a lot.
      </p>

      <h2>Business + press</h2>
      <p>
        For press or partnership enquiries, reach us at{' '}
        <a href="mailto:manavj10@gmail.com">manavj10@gmail.com</a>.
      </p>
    </article>
  );
}
