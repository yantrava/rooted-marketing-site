import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/landing/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Attribution',
  description:
    'Open-source libraries, ML models, data sources, and creative assets that power Rooted. Credit where credit is due.',
  alternates: { canonical: '/attribution' },
  openGraph: { url: '/attribution' }
};

export default function AttributionPage() {
  return (
    <article>
      <BreadcrumbJsonLd name="Attribution" path="/attribution" />
      <h1>Attribution</h1>
      <p>
        Rooted stands on a lot of shoulders. This page lists the libraries,
        datasets, and public sources we built on top of. If you maintain
        one of these and something is missing or miscredited, please{' '}
        <a href="/support">let us know</a>.
      </p>

      <h2>Machine-learning models</h2>
      <ul>
        <li>
          <strong>Plant.id</strong> — commercial plant identification API.{' '}
          <a href="https://web.plant.id/">plant.id</a>
        </li>
        <li>
          <strong>PlantNet</strong> — non-commercial research API for plant
          recognition from citizen-science imagery.{' '}
          <a href="https://my.plantnet.org/">my.plantnet.org</a>
        </li>
        <li>
          <strong>Perenual</strong> — plant species encyclopaedia + care
          data API.{' '}
          <a href="https://perenual.com/">perenual.com</a>
        </li>
        <li>
          <strong>MobileNetV1 (TFLite)</strong> — on-device classifier for
          offline identification.
        </li>
      </ul>

      <h2>Toxicity + care data</h2>
      <ul>
        <li>
          <strong>ASPCA Toxic and Non-Toxic Plants</strong> —{' '}
          <a href="https://www.aspca.org/pet-care/animal-poison-control/toxic-and-non-toxic-plants">
            aspca.org
          </a>
        </li>
        <li>
          <strong>Pet Poison Helpline</strong> —{' '}
          <a href="https://www.petpoisonhelpline.com/">petpoisonhelpline.com</a>
        </li>
        <li>
          <strong>NIH / NCBI</strong> — veterinary toxicology references
          for species-level confirmation.
        </li>
        <li>
          <strong>FAO Irrigation and Drainage Paper No. 56</strong> — the
          Penman-Monteith model we simplified for the watering algorithm.
        </li>
      </ul>

      <h2>Weather</h2>
      <ul>
        <li>
          <strong>OpenWeatherMap</strong> — current conditions + humidity.{' '}
          <a href="https://openweathermap.org/">openweathermap.org</a>
        </li>
      </ul>

      <h2>Infrastructure</h2>
      <ul>
        <li>
          <strong>Supabase</strong> (authentication, Postgres, storage,
          edge functions)
        </li>
        <li>
          <strong>RevenueCat</strong> (subscription management)
        </li>
        <li>
          <strong>Vercel</strong> (web hosting)
        </li>
        <li>
          <strong>Resend</strong> (transactional email)
        </li>
        <li>
          <strong>PostHog</strong> (product analytics)
        </li>
        <li>
          <strong>Sentry</strong> (crash reporting)
        </li>
        <li>
          <strong>Firebase Cloud Messaging</strong> (push notifications)
        </li>
      </ul>

      <h2>Open-source libraries (selected)</h2>
      <ul>
        <li>
          <strong>Flutter + Dart</strong> — BSD-3-Clause, Google.
        </li>
        <li>
          <strong>flutter_riverpod</strong>, <strong>go_router</strong>,{' '}
          <strong>supabase_flutter</strong>, <strong>purchases_flutter</strong>,{' '}
          <strong>flutter_litert</strong>, <strong>image_picker</strong>,{' '}
          <strong>geolocator</strong>,{' '}
          <strong>flutter_local_notifications</strong>,{' '}
          <strong>shared_preferences</strong>, <strong>hive</strong>.
        </li>
        <li>
          <strong>Next.js</strong>, <strong>React</strong>, <strong>Tailwind CSS</strong>,{' '}
          <strong>Radix UI</strong>, <strong>shadcn/ui</strong>, <strong>Lucide Icons</strong>.
        </li>
      </ul>

      <h2>Typography</h2>
      <ul>
        <li>
          <strong>Fraunces</strong> — Open Font License 1.1, Underware.
        </li>
        <li>
          <strong>Inter</strong> — Open Font License 1.1, Rasmus Andersson.
        </li>
      </ul>

      <h2>Imagery</h2>
      <p>
        Placeholder wizard-hero JPGs are generated locally using Python
        Pillow as temporary branded gradients. They will be replaced with
        free-license photography from Unsplash and Pexels before launch;
        full per-image attribution will land here when we swap them in.
      </p>

      <h2>Brand marks</h2>
      <p>
        Google Play badge is used under the Google Play Developer
        Distribution Agreement. Apple App Store badge is used per Apple's
        Marketing and Advertising Guidelines. Both are rendered at or
        above minimum size and in their approved colour variants.
      </p>
    </article>
  );
}
