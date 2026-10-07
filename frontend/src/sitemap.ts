/**
 * Standard Sitemap Item interface compatible with Next.js MetadataRoute.Sitemap
 */
export interface SitemapItem {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const BASE_URL = 'https://2bhkinteriors.com';

export const SITEMAP_ROUTES: SitemapItem[] = [
  {
    url: `${BASE_URL}/`,
    lastModified: new Date('2026-10-07'),
    changeFrequency: 'weekly',
    priority: 1.0,
  },
  {
    url: `${BASE_URL}/about`,
    lastModified: new Date('2026-10-07'),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/services`,
    lastModified: new Date('2026-10-07'),
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/portfolio`,
    lastModified: new Date('2026-10-07'),
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/pptt.pdf`,
    lastModified: new Date('2026-10-07'),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
];

/**
 * Next.js / TypeScript metadata route compatible default export.
 */
export default function sitemap(): SitemapItem[] {
  return SITEMAP_ROUTES;
}

/**
 * Formats routes into standard XML sitemap format.
 */
export function generateSitemapXml(routes: SitemapItem[] = SITEMAP_ROUTES): string {
  const xmlEntries = routes
    .map((item) => {
      const lastModStr = item.lastModified
        ? (item.lastModified instanceof Date
            ? item.lastModified.toISOString().split('T')[0]
            : item.lastModified)
        : '';

      return `  <url>
    <loc>${item.url}</loc>${lastModStr ? `\n    <lastmod>${lastModStr}</lastmod>` : ''}${item.changeFrequency ? `\n    <changefreq>${item.changeFrequency}</changefreq>` : ''}${item.priority !== undefined ? `\n    <priority>${item.priority.toFixed(1)}</priority>` : ''}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
}
