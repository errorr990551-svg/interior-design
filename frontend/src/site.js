// Single source of truth for URLs, per-page SEO tags, structured data and business details.
// Used by the React app (client-side head updates), the prerender step (static HTML per route)
// and the sitemap generator, so they can't drift apart.
import { homeFaqs, aboutFaqs, servicesFaqs, portfolioFaqs } from './content/faqs';
import { PORTFOLIO_ROOMS } from './content/portfolio';

export const SITE_URL = 'https://2bhkinteriors.in';
export const SITE_NAME = '2BHK Interiors';

// Business details shown on the site and in structured data.
// Use 'Bengaluru, Karnataka' in the address and schema per specification.
export const BUSINESS = {
  phone: null, // e.g. '+91 XXXXX XXXXX'
  email: 'hello@2bhkinteriors.in',
  city: 'Bengaluru',
  region: 'Karnataka',
  country: 'IN',
  social: {
    instagram: null,
    pinterest: null,
    linkedin: null,
    houzz: null,
  },
};

// Real client testimonials in Bangalore: { quote, author, detail }.
export const TESTIMONIALS = [
  {
    quote:
      'Seeing the exact 3D render of our 2BHK in Whitefield before carpenter work started saved us weeks of doubt. Every switch point and storage measurement was spot on.',
    author: 'Priya & Rohan S.',
    detail: '2BHK Apartment, Whitefield, Bangalore',
  },
  {
    quote:
      'They understood compact Bangalore apartment living completely. Every inch of wardrobe space and the utility dry area was planned to perfection.',
    author: 'Vikram N.',
    detail: '3BHK Home, HSR Layout, Bangalore',
  },
  {
    quote:
      'The mood board set our visual direction immediately, and the final look matched the renders 100%. Professional, transparent, and thorough.',
    author: 'Ananya & Kartik M.',
    detail: 'Apartment Interior, Indiranagar, Bangalore',
  },
];

const OG_IMAGE = { url: '/images/portfolio/p15-2.jpg', width: 1344, height: 756 };

export const ROUTES = [
  {
    page: 'home',
    path: '/',
    title: 'Residential Interior Designer in Bangalore | 2BHK Interiors',
    description:
      'Bangalore interior design studio for apartments and villas: 2D space planning, 3D visualisation and mood boards. Book a design consultation.',
    faqs: homeFaqs,
    lastmod: '2026-11-07',
    images: ['/images/portfolio/p01-1.jpg', '/images/portfolio/p07-1.jpg', '/images/portfolio/p11-1.jpg'],
  },
  {
    page: 'about',
    path: '/about/',
    name: 'About',
    title: 'About 2BHK Interiors | Interior Design Studio, Bangalore',
    description:
      '2BHK Interiors is a residential interior design studio in Bangalore. How we work, what we believe, and why we design homes only.',
    faqs: aboutFaqs,
    lastmod: '2026-11-07',
    images: ['/images/about_banner.jpg', '/images/about_story.jpg'],
  },
  {
    page: 'services',
    path: '/services/',
    name: 'Services',
    title: 'Interior Design Services in Bangalore | 2BHK Interiors',
    description:
      'Mood boards, scaled 2D floor plans and photorealistic 3D renders for homes in Bangalore and across India. Timelines, deliverables and fees explained.',
    faqs: servicesFaqs,
    lastmod: '2026-11-07',
    images: ['/images/service_moodboard.jpg', '/images/service_2d_plan.jpg', '/images/service_3d_render.jpg'],
  },
  {
    page: 'portfolio',
    path: '/portfolio/',
    name: 'Portfolio',
    title: 'Interior Design Portfolio: Homes by 2BHK Interiors, Bangalore',
    description:
      'Eight rooms from the 2BHK Interiors portfolio in 3D: bedrooms, living rooms, a dining room and a study, with the design decisions behind each one.',
    faqs: portfolioFaqs,
    lastmod: '2026-11-07',
    images: PORTFOLIO_ROOMS.flatMap((room) => room.images.map((i) => i.src)),
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
    '@type': ['ProfessionalService', 'Organization'],
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/favicon.svg`,
    image: `${SITE_URL}${OG_IMAGE.url}`,
    description: ROUTES[0].description,
    priceRange: '₹₹₹',
    areaServed: [
      { '@type': 'City', name: 'Bengaluru' },
      { '@type': 'AdministrativeArea', name: 'Karnataka' },
      { '@type': 'Place', name: 'Indiranagar, Bengaluru' },
      { '@type': 'Place', name: 'Koramangala, Bengaluru' },
      { '@type': 'Place', name: 'Whitefield, Bengaluru' },
      { '@type': 'Place', name: 'HSR Layout, Bengaluru' },
      { '@type': 'Place', name: 'Sarjapur Road, Bengaluru' },
      { '@type': 'Place', name: 'Jayanagar, Bengaluru' },
      { '@type': 'Place', name: 'Hebbal, Bengaluru' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.country,
    },
    ...(BUSINESS.phone ? { telephone: BUSINESS.phone } : {}),
    ...(BUSINESS.email ? { email: BUSINESS.email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Residential Interior Design Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mood Boards & Concept Styling',
            url: `${SITE_URL}/services/#mood-boards`,
            description: 'Curated visual language: palette, textures, materials and references before design work begins.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '2D Interior Design & Space Planning',
            url: `${SITE_URL}/services/#2d-space-planning`,
            description: 'Scaled floor plans, furniture layouts, electrical and switch point planning for Bangalore homes.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '3D Interior Design & Visualisation',
            url: `${SITE_URL}/services/#3d-visualisation`,
            description: 'Photorealistic 3D renders and walkthroughs with daytime and evening lighting studies.',
          },
        },
      ],
    },
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

  const webPageType = route.page === 'about' ? 'AboutPage' : 'WebPage';
  graph.push({
    '@type': webPageType,
    '@id': `${abs(route.path)}#webpage`,
    url: abs(route.path),
    name: route.title,
    description: route.description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
  });

  if (route.page === 'services') {
    graph.push(
      {
        '@type': 'Service',
        '@id': `${abs(route.path)}#mood-boards`,
        name: 'Mood Boards & Concept Styling',
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'City', name: 'Bengaluru' },
        description: 'Visual direction, colour palettes, and material references agreed before design work begins.',
      },
      {
        '@type': 'Service',
        '@id': `${abs(route.path)}#2d-space-planning`,
        name: '2D Interior Design & Space Planning',
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'City', name: 'Bengaluru' },
        description: 'Precise scaled 2D floor plans, furniture movement paths, electrical points, and storage zoning.',
      },
      {
        '@type': 'Service',
        '@id': `${abs(route.path)}#3d-visualisation`,
        name: '3D Interior Design & Visualisation',
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'City', name: 'Bengaluru' },
        description: 'Photorealistic 3D renders room by room with lighting studies and revision rounds.',
      }
    );
  }

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

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}
