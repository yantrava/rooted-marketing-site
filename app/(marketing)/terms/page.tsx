import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    "The simple terms of using Rooted. App access, subscriptions, community rules, and termination."
};

// Initial terms draft — lawyer review required before any app store
// submission. Last-updated string reflects the date in the footer.
export default function TermsPage() {
  const updated = 'April 20, 2026';
  return (
    <article>
      <h1>Terms of Service</h1>
      <p>
        <em>Last updated: {updated}</em>
      </p>

      <p>
        These Terms of Service ("Terms") govern your use of the Rooted
        mobile app and this website ("Rooted", "we", "us"). By creating an
        account or using Rooted you agree to these Terms.
      </p>

      <h2>1. Your account</h2>
      <p>
        You must be at least 13 years old to use Rooted. Keep your login
        credentials private. You are responsible for activity on your
        account.
      </p>

      <h2>2. Acceptable use</h2>
      <ul>
        <li>Do not post illegal, harassing, or infringing content.</li>
        <li>Do not attempt to scrape, reverse-engineer, or overload our servers.</li>
        <li>Plant Swap is for hobbyist plant swaps only — not a commercial marketplace for protected or endangered species.</li>
        <li>Do not impersonate anyone in community posts or chat.</li>
      </ul>

      <h2>3. Subscriptions</h2>
      <p>
        Rooted Pro is billed by Google Play or the App Store, not by us
        directly. Manage, change, or cancel your subscription through your
        store account. Refunds follow the store's policy.
      </p>
      <p>
        Prices shown in the app are inclusive of applicable taxes for the
        region you subscribe from. We reserve the right to change Rooted
        Pro pricing with 30 days' notice; existing subscribers keep their
        price through the end of their current billing period.
      </p>

      <h2>4. Your content</h2>
      <p>
        You keep ownership of photos and posts you upload. By posting to
        the community or Plant Swap you grant us a non-exclusive, worldwide
        licence to display that content within Rooted so other users can
        see and interact with it. This licence ends when you delete the
        content, with a short retention window for backups.
      </p>

      <h2>5. No plant medicine</h2>
      <p>
        Rooted provides plant-care information on a best-effort basis. Our
        toxicity data is cross-checked against ASPCA, Pet Poison Helpline,
        and NIH sources, but you should still consult a qualified
        veterinarian if a pet has ingested a plant. We are not a substitute
        for professional veterinary or human medical advice.
      </p>

      <h2>6. Termination</h2>
      <p>
        You may delete your account at any time through Settings → Profile.
        We may suspend or terminate an account that violates these Terms.
        On termination we remove personal data per the Privacy Policy.
      </p>

      <h2>7. Disclaimers</h2>
      <p>
        Rooted is provided "as is". We do not warrant that it will be
        uninterrupted or error-free. To the fullest extent allowed by law,
        we disclaim all implied warranties of merchantability, fitness for
        purpose, and non-infringement.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the fullest extent allowed by law, our aggregate liability to
        you for any claim arising out of or related to Rooted is capped at
        the greater of ₹2,000 or the amount you paid us for subscription
        services in the 12 months before the claim.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These Terms are governed by the laws of India. Any dispute not
        resolved through support will be submitted to the exclusive
        jurisdiction of the courts of New Delhi, India.
      </p>

      <h2>10. Changes</h2>
      <p>
        We will notify material changes via in-app banner and email. The
        "last updated" date reflects the most recent revision.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions? Visit the <a href="/support">support page</a>.
      </p>
    </article>
  );
}
