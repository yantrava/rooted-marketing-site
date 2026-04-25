import type { MetadataRoute } from 'next';
import { getURL } from '@/utils/helpers';

export default function robots(): MetadataRoute.Robots {
  const base = getURL();
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/account/', '/api/']
      }
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base
  };
}
