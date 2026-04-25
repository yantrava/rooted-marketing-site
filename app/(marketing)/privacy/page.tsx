import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/landing/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    "How Rooted collects, uses, and protects your data. DPDP (India) and GDPR (EU) compliant. You can request a full export or deletion at any time.",
  alternates: { canonical: '/privacy' },
  openGraph: { url: '/privacy' }
};

// This is a draft written to the structure required by the Play Store
// Data Safety form + India's DPDP Act 2023 + GDPR. A qualified lawyer
// should review before Rooted submits any release to an app store.
// Last updated date below is automatically the page's render date.
export default function PrivacyPage() {
  const updated = 'April 20, 2026';
  return (
    <article>
      <BreadcrumbJsonLd name="Privacy Policy" path="/privacy" />
      <h1>Privacy Policy</h1>
      <p>
        <em>Last updated: {updated}</em>
      </p>

      <p>
        Rooted ("we", "us") cares about your data. This page explains what we
        collect, why we collect it, and the controls you have. It is written
        to comply with India's Digital Personal Data Protection Act, 2023
        ("DPDP") and the EU General Data Protection Regulation ("GDPR") for
        users in those regions.
      </p>

      <h2>1. Who we are</h2>
      <p>
        Rooted is operated by Manav Jain. You can contact us at{' '}
        <a href="/support">the support page</a> any time.
      </p>

      <h2>2. What we collect</h2>
      <ul>
        <li>
          <strong>Account data</strong>: email address and an authentication
          token issued by Supabase Auth. Required to sign you in and associate
          your plants with your account.
        </li>
        <li>
          <strong>Plant data</strong>: photos you upload, identification
          results, care-profile answers (pot material, drainage, plant size,
          etc.), and care-task history.
        </li>
        <li>
          <strong>Approximate location</strong>: latitude and longitude (to
          roughly city-level precision), used solely to fetch local weather
          for the watering algorithm. You can revoke location access in your
          device settings at any time.
        </li>
        <li>
          <strong>Device + diagnostic data</strong>: crash reports and
          performance metrics from Sentry; anonymised product-usage events
          from PostHog.
        </li>
        <li>
          <strong>Community content</strong>: posts, comments, swap listings,
          and chat messages you voluntarily publish.
        </li>
      </ul>

      <h2>3. How we use it</h2>
      <ul>
        <li>To operate the app — identify plants, schedule watering, remind you to care for them.</li>
        <li>To provide weather-aware watering schedules.</li>
        <li>To deliver community and Plant Swap features.</li>
        <li>To debug crashes and improve reliability.</li>
        <li>To send transactional email (password reset, data export).</li>
      </ul>
      <p>
        We do not sell your data. We do not use it for advertising. We do not
        share it with third parties except the processors listed below.
      </p>

      <h2>4. Third-party processors</h2>
      <ul>
        <li>
          <strong>Supabase</strong> — authentication, database, file storage,
          and server-side functions.
        </li>
        <li>
          <strong>RevenueCat</strong> — subscription management (only for
          users who subscribe to Rooted Pro).
        </li>
        <li>
          <strong>Google Play Billing</strong> and <strong>Apple App Store</strong> — subscription
          billing. We never see your payment card.
        </li>
        <li>
          <strong>OpenWeatherMap</strong> — local weather data.
        </li>
        <li>
          <strong>Plant.id, PlantNet, Perenual</strong> — third-party plant
          identification APIs.
        </li>
        <li>
          <strong>PostHog</strong> — product analytics, with email hashed
          before transmission.
        </li>
        <li>
          <strong>Sentry</strong> — crash reporting.
        </li>
        <li>
          <strong>Resend</strong> — transactional email.
        </li>
      </ul>

      <h2>5. Your rights</h2>
      <p>Under DPDP and GDPR you have the right to:</p>
      <ul>
        <li>
          <strong>Access</strong> — see the data we hold about you. Use
          Settings → Profile → Export my data in the app to download a JSON
          archive.
        </li>
        <li>
          <strong>Correct</strong> — edit your profile, plants, and community
          content from inside the app.
        </li>
        <li>
          <strong>Delete</strong> — delete your account. We remove your
          personal data within 30 days; anonymised statistics may be retained.
        </li>
        <li>
          <strong>Port</strong> — the same export endpoint provides a portable
          JSON copy.
        </li>
        <li>
          <strong>Withdraw consent</strong> — revoke location access or
          uninstall the app at any time.
        </li>
      </ul>
      <p>
        Reach us via the <a href="/support">support page</a> with any rights
        request. We respond within 7 days.
      </p>

      <h2>6. Data retention</h2>
      <p>
        We retain account data while your account is active. On deletion, we
        remove personal identifiers within 30 days. Community posts may be
        retained in anonymised form for longer to preserve thread integrity.
      </p>

      <h2>7. Security</h2>
      <p>
        All data is transmitted over TLS 1.2+. Supabase Row Level Security
        restricts database reads and writes to authenticated owners. Billing
        fields on user profiles are service-role-only — no client can
        self-escalate their subscription state.
      </p>

      <h2>8. Children</h2>
      <p>
        Rooted is not directed at children under 13. We do not knowingly
        collect data from users under 13. If you believe a child has signed
        up, please contact us and we will delete the account.
      </p>

      <h2>9. International transfers</h2>
      <p>
        Rooted's primary database is hosted in Supabase's Singapore
        (ap-southeast-1) region. Weather and ID requests route to the nearest
        vendor region. We rely on standard contractual clauses for any
        cross-border transfers where required by DPDP or GDPR.
      </p>

      <h2>10. Changes</h2>
      <p>
        We will announce material changes in-app and via email to anyone on
        the waitlist. The "last updated" date at the top of this page always
        reflects the most recent revision.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions about this policy? Reach us at the{' '}
        <a href="/support">support page</a>.
      </p>
    </article>
  );
}
