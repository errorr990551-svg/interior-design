import React, { useEffect } from 'react';

/**
 * Standard Robots Rule interface aligned with modern frameworks (e.g. Next.js MetadataRoute.Robots).
 */
export interface RobotsRule {
  userAgent: string | string[];
  allow?: string | string[];
  disallow?: string | string[];
  crawlDelay?: number;
}

export interface RobotsConfig {
  rules: RobotsRule | RobotsRule[];
  sitemap?: string | string[];
  host?: string;
}

/**
 * Default Robots Configuration for 2BHK Interiors
 */
export const ROBOTS_CONFIG: RobotsConfig = {
  rules: [
    {
      userAgent: '*',
      allow: ['/', '/images/', '/pptt.pdf'],
      disallow: [],
      crawlDelay: 1,
    },
    {
      userAgent: 'Googlebot',
      allow: ['/'],
    },
    {
      userAgent: 'Bingbot',
      allow: ['/'],
    },
  ],
  sitemap: 'https://2bhkinteriors.com/sitemap.xml',
  host: 'https://2bhkinteriors.com',
};

/**
 * Next.js / TypeScript metadata route compatible default export.
 * If used in Next.js or SSR pipelines, export default robots().
 */
export default function robots(): RobotsConfig {
  return ROBOTS_CONFIG;
}

/**
 * Formats the configuration into standard robots.txt text format.
 */
export function generateRobotsTxt(config: RobotsConfig = ROBOTS_CONFIG): string {
  const lines: string[] = [
    '# robots.txt generated for 2BHK Interiors Studio',
    `# Host: ${config.host || 'https://2bhkinteriors.com'}`,
    '',
  ];

  const rulesList = Array.isArray(config.rules) ? config.rules : [config.rules];

  rulesList.forEach((rule) => {
    const agents = Array.isArray(rule.userAgent) ? rule.userAgent : [rule.userAgent];
    agents.forEach((agent) => lines.push(`User-agent: ${agent}`));

    if (rule.allow) {
      const allows = Array.isArray(rule.allow) ? rule.allow : [rule.allow];
      allows.forEach((p) => lines.push(`Allow: ${p}`));
    }

    if (rule.disallow) {
      const disallows = Array.isArray(rule.disallow) ? rule.disallow : [rule.disallow];
      disallows.forEach((p) => lines.push(`Disallow: ${p}`));
    }

    if (rule.crawlDelay) {
      lines.push(`Crawl-delay: ${rule.crawlDelay}`);
    }

    lines.push('');
  });

  if (config.sitemap) {
    const sitemaps = Array.isArray(config.sitemap) ? config.sitemap : [config.sitemap];
    sitemaps.forEach((sm) => lines.push(`Sitemap: ${sm}`));
  }

  return lines.join('\n');
}

/**
 * React SEO Helper Component: Injects or updates robots meta tags in the document head.
 */
export interface RobotsMetaProps {
  index?: boolean;
  follow?: boolean;
  maxImagePreview?: 'none' | 'standard' | 'large';
  sitemapUrl?: string;
}

export const RobotsMeta: React.FC<RobotsMetaProps> = ({
  index = true,
  follow = true,
  maxImagePreview = 'large',
  sitemapUrl = 'https://2bhkinteriors.com/sitemap.xml',
}) => {
  useEffect(() => {
    const content = [
      index ? 'index' : 'noindex',
      follow ? 'follow' : 'nofollow',
      `max-image-preview:${maxImagePreview}`,
      'max-snippet:-1',
      'max-video-preview:-1',
    ].join(', ');

    // 1. Update or create <meta name="robots">
    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = content;

    // 2. Update or create sitemap link tag
    if (sitemapUrl) {
      let sitemapLink = document.querySelector('link[rel="sitemap"]') as HTMLLinkElement | null;
      if (!sitemapLink) {
        sitemapLink = document.createElement('link');
        sitemapLink.rel = 'sitemap';
        sitemapLink.type = 'application/xml';
        sitemapLink.title = 'Sitemap';
        document.head.appendChild(sitemapLink);
      }
      sitemapLink.href = sitemapUrl;
    }
  }, [index, follow, maxImagePreview, sitemapUrl]);

  return null;
};
