// Single source of truth for URLs, per-page SEO tags, structured data and business details.
// Used by the React app (client-side head updates), the prerender step (static HTML per route)
// and the sitemap generator, so they can't drift apart.
import { homeFaqs, aboutFaqs, servicesFaqs, portfolioFaqs } from './content/faqs';

export const SITE_URL = 'https://2bhkinteriors.in';
export const SITE_NAME = '2BHK Interiors';

// Business details shown on the site and in structured data.
// Leave a field null until the real value exists: nothing renders for null fields,
// so placeholder phone numbers, inboxes or social profiles never reach the live site.
export const BUSINESS = {
  phone: null, // e.g. '+91 XXXXX XXXXX'
  email: null, // a working inbox on the live domain, e.g. 'hello@2bhkinteriors.in'
  city: 'Mumbai',
  region: 'Maharashtra',
  country: 'IN',
  social: {
    instagram: null, // full profile URL, e.g. 'https://www.instagram.com/<handle>/'
    pinterest: null,
    linkedin: null,
    houzz: null,
  },
};

// Real client testimonials only, each with the client's permission: { quote, author, detail }.
// The testimonials section stays hidden while this list is empty.
export const TESTIMONIALS = [];

const OG_IMAGE = { url: '/images/home_hero_bg.jpg', width: 1376, height: 768 };

export const ROUTES = [
  {
    page: 'home',
    path: '/',
    title: '2BHK Interiors | Residential Interior Designer in Mumbai',
    description:
      'Residential interior design studio in Mumbai for apartments and homes: 2D space planning, 3D visualisation and mood boards agreed before any work begins.',
    faqs: homeFaqs,
    lastmod: '2026-10-31',
    images: ['/images/home_hero_bg.jpg', '/images/project-highlight.jpg'],
  },
  {
    page: 'about',
    path: '/about/',
    name: 'About',
    title: 'About 2BHK Interiors | Residential Design Studio, Mumbai',
    description:
      '2BHK Interiors is a Mumbai studio that designs only homes. See how we plan, visualise and specify each home before execution, and why we stay residential.',
    faqs: aboutFaqs,
    lastmod: '2026-10-31',
    images: ['/images/about_banner.jpg', '/images/about_story.jpg'],
  },
  {
    page: 'services',
    path: '/services/',
    name: 'Services',
    title: 'Interior Design Services in Mumbai: 2D, 3D & Mood Boards',
    description:
      'Three residential interior design services in Mumbai: 2D layout planning, photorealistic 3D visualisation and mood boards, booked alone or together.',
    faqs: servicesFaqs,
    lastmod: '2026-10-31',
    images: ['/images/service_moodboard.jpg', '/images/service_2d_plan.jpg', '/images/service_3d_render.jpg'],
  },
  {
    page: 'portfolio',
    path: '/portfolio/',
    name: 'Portfolio',
    title: 'Interior Design Portfolio: Homes by 2BHK Interiors, Mumbai',
    description:
      'Residential interior design portfolio from 2BHK Interiors: apartment and home projects with 2D floor plans, 3D renders and mood boards, plus a PDF deck.',
    faqs: portfolioFaqs,
    lastmod: '2026-10-31',
    images: ['/images/linden-house.jpg', '/images/urban-dwelling.jpg', '/images/casa-serene.jpg'],
  },
];

export const NOT_FOUND_ROUTE = {
  page: 'notfound',
  path: '/404.html',
  title: 'Page not found | 2BHK Interiors',
  description: 'This page does not exist. Browse the 2BHK Interiors home page, services or portfolio instead.',
  noindex: true,
};

export function routeForPath(pathname = '/') {
  const clean = pathname.replace(/index\.html$/, '');
  const withSlash = clean.endsWith('/') ? clean : `${clean}/`;
  return ROUTES.find((r) => r.path === withSlash) || NOT_FOUND_ROUTE;
}

export function routeForPage(page) {
  return ROUTES.find((r) => r.page === page) || ROUTES[0];
}

export function pathForPage(page, hash) {
  return routeForPage(page).path + (hash ? `#${hash}` : '');
}

const abs = (p) => SITE_URL + p;

// Tags that change per page. The client updates these on navigation; the prerender step writes them into HTML.
export function headTags(route) {
  const canonical = route.noindex ? null : abs(route.path);
  return {
    title: route.title,
    description: route.description,
    robots: route.noindex
      ? 'noindex, follow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    canonical,
    ogUrl: canonical,
  };
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function headHtml(route) {
  const t = headTags(route);
  const lines = [
    `<title>${esc(t.title)}</title>`,
    `<meta name="description" content="${esc(t.description)}" />`,
    `<meta name="robots" content="${t.robots}" />`,
  ];
  if (t.canonical) lines.push(`<link rel="canonical" href="${t.canonical}" />`);
  lines.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${esc(t.title)}" />`,
    `<meta property="og:description" content="${esc(t.description)}" />`,
    `<meta property="og:image" content="${abs(OG_IMAGE.url)}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(t.title)}" />`,
    `<meta name="twitter:description" content="${esc(t.description)}" />`,
    `<meta name="twitter:image" content="${abs(OG_IMAGE.url)}" />`,
  );
  if (t.ogUrl) lines.push(`<meta property="og:url" content="${t.ogUrl}" />`);
  for (const ld of jsonLd(route)) {
    lines.push(`<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`);
  }
  return lines.join('\n    ');
}

function organization() {
  const sameAs = Object.values(BUSINESS.social).filter(Boolean);
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description: ROUTES[0].description,
    areaServed: { '@type': 'City', name: BUSINESS.city },
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.country,
    },
    ...(BUSINESS.phone ? { telephone: BUSINESS.phone } : {}),
    ...(BUSINESS.email ? { email: BUSINESS.email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function jsonLd(route) {
  if (route.noindex) return [];
  const graph = [];
  if (route.page === 'home') {
    graph.push(organization(), {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      inLanguage: 'en-IN',
      publisher: { '@id': `${SITE_URL}/#organization` },
    });
  } else {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: route.name, item: abs(route.path) },
      ],
    });
  }
  graph.push({
    '@type': 'WebPage',
    '@id': `${abs(route.path)}#webpage`,
    url: abs(route.path),
    name: route.title,
    description: route.description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
  });
  if (route.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: route.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }
  return [{ '@context': 'https://schema.org', '@graph': graph }];
}

// Called on client-side navigation so the open tab matches what the static HTML for that URL says.
export function applyHead(route) {
  if (typeof document === 'undefined') return;
  const t = headTags(route);
  document.title = t.title;
  const set = (selector, attr, value) => {
    const el = document.head.querySelector(selector);
    if (el && value) el.setAttribute(attr, value);
  };
  set('meta[name="description"]', 'content', t.description);
  set('meta[name="robots"]', 'content', t.robots);
  set('link[rel="canonical"]', 'href', t.canonical);
  set('meta[property="og:url"]', 'content', t.ogUrl);
  set('meta[property="og:title"]', 'content', t.title);
  set('meta[property="og:description"]', 'content', t.description);
  set('meta[name="twitter:title"]', 'content', t.title);
  set('meta[name="twitter:description"]', 'content', t.description);
}

export function sitemapXml() {
  const urls = ROUTES.map((r) => {
    const imgs = (r.images || [])
      .map((src) => `\n    <image:image><image:loc>${abs(src)}</image:loc></image:image>`)
      .join('');
    return `  <url>\n    <loc>${abs(r.path)}</loc>\n    <lastmod>${r.lastmod}</lastmod>${imgs}\n  </url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
}

export function robotsTxt() {
  return `# robots.txt for ${SITE_URL}
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}
