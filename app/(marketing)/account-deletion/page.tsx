import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/landing/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Account & Data Deletion — Rooted',
  description:
    'How to delete your Rooted account and associated data. In-app option, email request option, what is deleted, what is retained, retention periods.',
  alternates: { canonical: '/account-deletion' },
  openGraph: { url: '/account-deletion' },
  robots: { index: true, follow: true }
};

// Mandatory page for the Play Console Data Safety form. Public, indexable,
// reachable via direct URL. Not linked from the navbar or footer — Google's
// policy only requires that the URL works and prominently shows the
// deletion steps. Linked from the privacy policy and the in-app
// "Delete account" flow.
export default function AccountDeletionPage() {
  const updated = 'April 26, 2026';
  return (
    <article>
      <BreadcrumbJsonLd name="Account & Data Deletion" path="/account-deletion" />
      <h1>Account &amp; Data Deletion</h1>
      <p>
        <em>Last updated: {updated}</em>
      </p>

      <p>
        This page explains how to delete your <strong>Rooted Plant Identifier &amp;
        Care</strong> account and the personal data associated with it. Rooted
        is operated by Manav Jain (sole proprietor, India).
      </p>

      <h2>1. How to request deletion</h2>

      <h3>Option A — Inside the app (fastest)</h3>
      <ol>
        <li>Open Rooted on your device.</li>
        <li>
          Go to <strong>Profile</strong> tab (bottom-right).
        </li>
        <li>
          Scroll to <strong>Account</strong> &rarr; tap{' '}
          <strong>Delete account</strong>.
        </li>
        <li>
          Confirm the prompt. Your account, plants, photos, community posts,
          plant-swap listings, chat messages and care history are permanently
          deleted within <strong>30 days</strong>.
        </li>
      </ol>

      <h3>Option B — By email</h3>
      <p>
        If you no longer have access to the app, email us at{' '}
        <a href="mailto:support.rootedas@gmail.com">
          support.rootedas@gmail.com
        </a>{' '}
        from the email address registered to your Rooted account. Subject line:{' '}
        <em>"Account deletion request"</em>. We action requests within{' '}
        <strong>7 days</strong>.
      </p>

      <h2>2. What gets deleted</h2>
      <p>
        On deletion, the following are permanently removed from our active
        systems and from all backups within 30 days:
      </p>
      <ul>
        <li>Your account row (email, display name, avatar)</li>
        <li>All plants you've added to your garden</li>
        <li>All photos you've uploaded (plant photos, post images, avatar)</li>
        <li>All community posts, comments, and likes you've made</li>
        <li>All plant-swap listings you've created</li>
        <li>All plant-swap chat messages you've sent or received</li>
        <li>Your care logs and watering history</li>
        <li>Your care preferences (skill level, garden name, notification settings)</li>
        <li>Google Sign-In tokens and any OAuth grants</li>
        <li>Your RevenueCat subscription record (active subscriptions are
          cancelled if you choose; otherwise they continue per Google Play /
          App Store policy until natural expiry)</li>
      </ul>

      <h2>3. What is retained, and why</h2>
      <p>
        A small amount of data is retained for legal and operational reasons,
        in line with India's DPDP Act 2023 and the EU GDPR:
      </p>
      <ul>
        <li>
          <strong>Billing records</strong> &mdash; subscription invoices and tax
          documentation are retained for <strong>7 years</strong> as required by
          Indian tax and GST law. These records contain only your name,
          subscription type, amount paid, and dates &mdash; not in-app data.
        </li>
        <li>
          <strong>Aggregated analytics</strong> &mdash; anonymised usage events
          (which features were tapped, retention curves) are retained
          indefinitely but are no longer linked to any user identifier
          after deletion.
        </li>
        <li>
          <strong>Crash logs</strong> &mdash; Sentry retains crash reports for
          <strong> 90 days</strong>; we do not extend this retention. After 90
          days they are automatically purged.
        </li>
        <li>
          <strong>Community content from other users</strong> &mdash; if another
          user replied to one of your posts, their reply is retained (it is
          their content, not yours). Your replies are deleted; threads remain
          coherent without your contributions.
        </li>
      </ul>

      <h2>4. Subscription cancellation is separate</h2>
      <p>
        Deleting your Rooted account <strong>does not</strong> automatically
        cancel any active Pro subscription. To stop future billing, also cancel
        the subscription via:
      </p>
      <ul>
        <li>
          <strong>Android</strong> &mdash; Google Play app &rarr; Profile &rarr;
          Payments &amp; subscriptions &rarr; Subscriptions &rarr; Rooted
          &rarr; Cancel subscription.
        </li>
        <li>
          <strong>iOS</strong> (when iOS launches) &mdash; iPhone Settings &rarr;
          [your name] &rarr; Subscriptions &rarr; Rooted &rarr; Cancel.
        </li>
      </ul>

      <h2>5. Partial deletion (without deleting the account)</h2>
      <p>
        Inside the app you can independently delete most of your data without
        deleting your account:
      </p>
      <ul>
        <li>Long-press a plant in your garden &rarr; Delete</li>
        <li>Long-press a community post or comment &rarr; Delete</li>
        <li>Long-press a plant-swap listing &rarr; Delete</li>
        <li>Profile &rarr; tap avatar &rarr; Remove avatar</li>
        <li>Plant detail &rarr; care logs &rarr; swipe to delete a log</li>
      </ul>

      <h2>6. Confirmation</h2>
      <p>
        We will email you when your deletion is complete (within 30 days for
        in-app, within 7 days for email requests). If you do not receive
        confirmation, please write to{' '}
        <a href="mailto:support.rootedas@gmail.com">
          support.rootedas@gmail.com
        </a>
        .
      </p>

      <h2>7. Data Protection Officer</h2>
      <p>
        For DPDP Act 2023 (India) and GDPR (EU) requests, our Data Protection
        contact is Manav Jain at{' '}
        <a href="mailto:support.rootedas@gmail.com">
          support.rootedas@gmail.com
        </a>
        . We respond to verified requests within 30 days as required by law.
      </p>

      <p>
        <a href="/privacy">&larr; Back to Privacy Policy</a>
      </p>
    </article>
  );
}
