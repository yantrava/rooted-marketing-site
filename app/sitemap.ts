import type { MetadataRoute } from 'next';
import { getURL } from '@/utils/helpers';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getURL();
  const routes: Array<{ path: string; priority: number; changeFreq: 'daily' | 'weekly' | 'monthly' }> = [
    { path: '/', priority: 1.0, changeFreq: 'weekly' },
    { path: '/privacy', priority: 0.6, changeFreq: 'monthly' },
    { path: '/terms', priority: 0.6, changeFreq: 'monthly' },
    { path: '/support', priority: 0.7, changeFreq: 'monthly' },
    { path: '/attribution', priority: 0.5, changeFreq: 'monthly' }
  ];
  const now = new Date();
  return routes.map(({ path, priority, changeFreq }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: changeFreq,
    priority
  }));
}
