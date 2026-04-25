// Server-rendered BreadcrumbList JSON-LD for sub-pages. Renders as a
// plain <script type="application/ld+json"> tag so non-JS crawlers and
// the first-pass Googlebot indexer pick it up immediately.
//
// Usage: <BreadcrumbJsonLd name="Privacy Policy" path="/privacy" />

const SITE_URL = 'https://rootedplant.org';

interface Props {
  /** Display name of the current page (e.g. "Privacy Policy"). */
  name: string;
  /** Absolute path of the current page, leading slash (e.g. "/privacy"). */
  path: string;
}

export const BreadcrumbJsonLd = ({ name, path }: Props) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL
      },
      {
        '@type': 'ListItem',
        position: 2,
        name,
        item: `${SITE_URL}${path}`
      }
    ]
  };

  return (
    <script id="ld-breadcrumb" type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
};
