// Builds the /interior-design/ section as static HTML (content is in the HTML at
// load time, no client-side rendering needed).
//   node scripts/content/build.mjs                -> production: published pages into dist/
//   node scripts/content/build.mjs --mode=preview -> all drafted+ pages, noindex, into .content-preview/
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';
import {
  ROOT, DATA, SECTION, MODE_STATUSES, loadConfig, loadCities, loadCityPage, loadFacts, loadGuides,
  renderBody, km, escapeHtml as esc, h2Sections, isFaqHeading, today,
} from './lib.mjs';

const arg = (name, dflt) => (process.argv.find((a) => a.startsWith(`--${name}=`)) || '').split('=')[1] || dflt;
const MODE = arg('mode', 'production');
const OUT = path.resolve(ROOT, arg('out', MODE === 'production' ? 'dist' : '.content-preview'));
const statuses = MODE_STATUSES[MODE];
if (!statuses) throw new Error(`Unknown mode ${MODE}`);

const config = loadConfig();
const SITE = config.siteUrl.replace(/\/$/, '');
const commercialRel = config.relationship === 'official' ? '' : 'sponsored nofollow';
const cities = loadCities();
const built = cities.filter((c) => statuses.includes(c.status) && loadCityPage(c));
const builtUrls = new Set(built.map((c) => c.url));
const guides = loadGuides().filter((g) => statuses.includes(g.status));
const states = [...new Map(built.map((c) => [c.state_slug, c.state])).entries()]
  .map(([slug, name]) => ({ slug, name, url: `${SECTION}/${slug}/`, cities: built.filter((c) => c.state_slug === slug) }))
  .sort((a, b) => a.name.localeCompare(b.name));
const robots = (status) => (MODE === 'preview' || status !== 'published' ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

function write(url, html) {
  const file = path.join(OUT, url, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

// Post-process rendered Markdown: rel on outbound links, scrollable tables.
function finishHtml(html) {
  return html
    .replace(/<a href="(https?:\/\/[^"]+)"/g, (m, href) => {
      const rel = /(^|\.)livspace\.com\//.test(new URL(href).host + '/') ? commercialRel : 'noopener';
      return rel ? `<a href="${href}" rel="${rel}"` : m;
    })
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, '</table></div>');
}

function leadUrl(c) {
  const base = config.leadUrl || c.livspace_city_url;
  return base ? base + (config.leadUrlParams || '') : '';
}

function nearbyFor(c, alreadyLinked) {
  return built
    .filter((o) => o.slug !== c.slug && !alreadyLinked.has(o.url))
    .map((o) => ({ o, d: km(c, o), same: o.state_slug === c.state_slug }))
    .filter((x) => x.d <= 300 || x.same)
    .sort((a, b) => (b.same - a.same) || (a.d - b.d))
    .slice(0, 5);
}

function extractFaqs(body) {
  const sec = h2Sections(body).find((s) => isFaqHeading(s.heading));
  if (!sec) return [];
  return sec.body.split(/^### /m).slice(1).map((p) => {
    const nl = p.indexOf('\n');
    const answerHtml = finishHtml(renderBody(p.slice(nl + 1).trim(), []).html);
    return { q: p.slice(0, nl).trim(), a: parse(answerHtml).textContent.replace(/\s+/g, ' ').trim() };
  });
}

const CSS = `
:root{--ink:#1c1917;--muted:#57534e;--line:#e7e5e4;--bg:#faf8f4;--card:#fff;--accent:#b45309;--accent-bg:#fef3c7;--head:#0e0e0e}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.7 "Plus Jakarta Sans",system-ui,-apple-system,"Segoe UI",sans-serif}
a{color:var(--accent)}header.site{background:var(--head);color:#f5f5f5;padding:14px 16px}header.site .in{max-width:728px;margin:0 auto;display:flex;justify-content:space-between;gap:16px;align-items:center}
header.site a{color:#f5f5f5;text-decoration:none;font-weight:700;letter-spacing:.02em}header.site nav a{font-weight:500;font-size:15px;color:#fbbf24}
main{max-width:760px;margin:0 auto;padding:20px 16px 48px}.crumbs{font-size:14px;color:var(--muted)}.crumbs ol{list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;gap:6px}.crumbs li+li:before{content:"›";margin-right:6px}
h1{font-size:clamp(28px,5vw,40px);line-height:1.2;margin:16px 0 8px}h2{font-size:clamp(22px,3.5vw,28px);line-height:1.3;margin:40px 0 12px}h3{font-size:19px;margin:28px 0 8px}
.byline{font-size:14px;color:var(--muted)}.disclosure{font-size:14px;background:var(--card);border:1px solid var(--line);border-left:4px solid var(--accent);padding:10px 14px;border-radius:8px;margin:16px 0}
blockquote{margin:20px 0;background:var(--accent-bg);border-radius:10px;padding:4px 18px}.table-wrap{overflow-x:auto;margin:16px 0}table{border-collapse:collapse;width:100%;font-size:15px;background:var(--card)}th,td{border:1px solid var(--line);padding:8px 10px;text-align:left;vertical-align:top}th{background:#f5f5f4}
sup.ref{font-size:11px;margin-left:1px}sup.ref a{text-decoration:none}.cta{background:var(--head);color:#f5f5f5;border-radius:14px;padding:22px;margin:40px 0}.cta h2{margin-top:0;color:#fff}.cta a.btn{display:inline-block;background:#fbbf24;color:#111;font-weight:700;padding:12px 20px;border-radius:999px;text-decoration:none}.cta p{color:#e7e5e4}
.cards{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}.cards li{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:12px}
.sources{font-size:14px;color:var(--muted)}.sources li{margin:4px 0;overflow-wrap:anywhere}.draft{background:#fee2e2;color:#7f1d1d;padding:8px 16px;text-align:center;font-size:14px}
footer{border-top:1px solid var(--line);padding:24px 16px;font-size:14px;color:var(--muted);text-align:center}`;

function layout({ url, title, description, status, jsonld, body }) {
  const canonical = SITE + url;
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${robots(status)}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="${esc(config.siteName)}">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
<style>${CSS}</style>
</head>
<body>
${MODE === 'preview' ? `<div class="draft">Preview build: status "${esc(status)}", not for publishing (noindex)</div>` : ''}
<header class="site"><div class="in"><a href="/">${esc(config.siteName)}</a><nav><a href="${SECTION}/">City guides</a></nav></div></header>
${body}
<footer>© ${new Date().getFullYear()} ${esc(config.siteName)} · <a href="${SECTION}/">All city guides</a></footer>
</body>
</html>
`;
}

function crumbs(items) {
  const html = `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items
    .map((it, i) => (i === items.length - 1 ? `<li aria-current="page">${esc(it.name)}</li>` : `<li><a href="${it.url}">${esc(it.name)}</a></li>`))
    .join('')}</ol></nav>`;
  const ld = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: SITE + it.url })),
  };
  return { html, ld };
}

const author = config.author;
const authorLine = `${esc(author.name)}${author.role ? `, ${esc(author.role)}` : ''}`;

// --- City pages ---------------------------------------------------------------
for (const c of built) {
  const page = loadCityPage(c);
  const { facts } = loadFacts(c.slug);
  const m = page.meta;
  const { html, sources } = renderBody(page.body, facts);
  const content = finishHtml(html);
  const linked = new Set([...content.matchAll(/href="(\/interior-design\/[^"#]+)"/g)].map((x) => x[1]));
  const nearby = nearbyFor(c, linked);
  const faqs = extractFaqs(page.body);
  const bc = crumbs([
    { name: 'Home', url: '/' }, { name: 'Interior Design', url: `${SECTION}/` },
    { name: c.state, url: `${SECTION}/${c.state_slug}/` }, { name: c.city, url: c.url },
  ]);
  const served = c.livspace_served === 'yes';
  const lead = leadUrl(c);
  const disclosure = config.disclosures[config.relationship] ?? config.disclosures.unset;
  const updated = m.updated || today();
  const published = c.publish_date || m.published || updated;
  const jsonld = [
    {
      '@context': 'https://schema.org', '@type': 'Article', headline: m.h1, description: m.description,
      author: { '@type': 'Person', name: author.name, ...(author.url ? { url: author.url } : {}) },
      publisher: { '@type': 'Organization', name: config.siteName, url: SITE + '/' },
      datePublished: published, dateModified: updated, mainEntityOfPage: SITE + c.url, inLanguage: 'en-IN',
    },
    bc.ld,
    ...(faqs.length ? [{
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    }] : []),
  ];
  const sourceTypes = [...new Set(facts.filter((f) => sources.some((s) => s.url === f.source_url)).map((f) => f.source_type).filter(Boolean))];
  const body = `<main>
${bc.html}
<article>
<h1>${esc(m.h1)}</h1>
<p class="byline">Last updated <time datetime="${updated}">${new Date(updated).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</time> · Written by ${authorLine}${config.reviewer ? ` · Reviewed by ${esc(config.reviewer.name)}` : ''}</p>
${disclosure ? `<p class="disclosure">${esc(disclosure)}</p>` : ''}
${content}
${served && lead ? `<section class="cta" aria-labelledby="cta-h"><h2 id="cta-h">${esc(m.cta_heading || `Talk to a Livspace designer in ${c.city}`)}</h2>
<p>${esc(m.cta_text || `Book a free consultation and get a quote based on your floor plan. Check current prices, inclusions and warranty terms with Livspace before you sign.`)}</p>
<a class="btn" href="${lead}"${commercialRel ? ` rel="${commercialRel}"` : ''}>Book a free consultation with Livspace</a></section>` : ''}
${nearby.length ? `<section aria-labelledby="nearby-h"><h2 id="nearby-h">Nearby city guides</h2><ul class="cards">${nearby
    .map(({ o, d }) => `<li><a href="${o.url}">Interior design in ${esc(o.city)}</a><br><small>${Math.round(d)} km away</small></li>`).join('')}</ul></section>` : ''}
<section class="sources" aria-labelledby="src-h"><h2 id="src-h">How we researched this page</h2>
<p>We checked every figure on this page against the sources below on the dates shown${sourceTypes.length ? ` (${sourceTypes.map(esc).join(', ')})` : ''}. Livspace prices, offers and warranty terms change, so confirm them on Livspace's own pages before you book. If you spot something out of date, tell us and we will correct it.</p>
<ol>${sources.map((s, i) => `<li id="source-${i + 1}">${esc(s.publisher)}: <a href="${s.url}"${/livspace\.com/.test(s.url) && commercialRel ? ` rel="${commercialRel}"` : ' rel="noopener"'}>${esc(s.title)}</a> (accessed ${esc(s.accessed)})</li>`).join('')}</ol>
</section>
</article>
</main>`;
  write(c.url, layout({ url: c.url, title: m.title, description: m.description, status: c.status, jsonld, body }));
}

// --- Guides --------------------------------------------------------------------
for (const g of guides) {
  const { html } = renderBody(g.body, []);
  const bc = crumbs([{ name: 'Home', url: '/' }, { name: 'Interior Design', url: `${SECTION}/` }, { name: g.meta.h1, url: g.url }]);
  write(g.url, layout({
    url: g.url, title: g.meta.title, description: g.meta.description, status: g.status, jsonld: [bc.ld],
    body: `<main>${bc.html}<article><h1>${esc(g.meta.h1)}</h1>${finishHtml(html)}</article></main>`,
  }));
}

// --- Hubs (only when there is something to list) --------------------------------
for (const s of states) {
  const bc = crumbs([{ name: 'Home', url: '/' }, { name: 'Interior Design', url: `${SECTION}/` }, { name: s.name, url: s.url }]);
  const list = s.cities.sort((a, b) => a.city.localeCompare(b.city))
    .map((c) => `<li><a href="${c.url}">Interior design in ${esc(c.city)}</a></li>`).join('');
  write(s.url, layout({
    url: s.url, status: s.cities.some((c) => c.status === 'published') ? 'published' : 'drafted',
    title: `Interior Design City Guides for ${s.name} | ${config.siteName}`,
    description: `Researched interior design guides for cities in ${s.name}: local homes, climate-led material choices, budgets and how to choose a designer.`,
    jsonld: [bc.ld],
    body: `<main>${bc.html}<h1>Interior design guides for ${esc(s.name)}</h1><p>Each guide covers the homes, climate and practical planning questions specific to that city, with sources for every figure.</p><ul class="cards">${list}</ul><p><a href="${SECTION}/">See guides for other states</a></p></main>`,
  }));
}
if (states.length) {
  const bc = crumbs([{ name: 'Home', url: '/' }, { name: 'Interior Design', url: `${SECTION}/` }]);
  const groups = states.map((s) => `<h2><a href="${s.url}">${esc(s.name)}</a></h2><ul class="cards">${s.cities
    .map((c) => `<li><a href="${c.url}">Interior design in ${esc(c.city)}</a></li>`).join('')}</ul>`).join('');
  const guideList = guides.length ? `<h2>Planning guides</h2><ul class="cards">${guides.map((g) => `<li><a href="${g.url}">${esc(g.meta.h1)}</a></li>`).join('')}</ul>` : '';
  write(`${SECTION}/`, layout({
    url: `${SECTION}/`, status: built.some((c) => c.status === 'published') ? 'published' : 'drafted',
    title: `Interior Design Guides for Indian Cities | ${config.siteName}`,
    description: 'City-by-city interior design guides for India: housing, climate-led material choices, budgets and how to choose a designer, with sources for every figure.',
    jsonld: [bc.ld],
    body: `<main>${bc.html}<h1>Interior design guides for Indian cities</h1><p>Practical, sourced guides to planning home interiors city by city.</p>${guideList}${groups}</main>`,
  }));
}

// --- Sitemap + robots -------------------------------------------------------------
const pages = [
  ...(states.length ? [{ url: `${SECTION}/`, lastmod: today() }] : []),
  ...states.map((s) => ({ url: s.url, lastmod: today() })),
  ...built.map((c) => ({ url: c.url, lastmod: loadCityPage(c).meta.updated || today(), status: c.status })),
  ...guides.map((g) => ({ url: g.url, lastmod: g.meta.updated || today(), status: g.status })),
].filter((p) => MODE === 'preview' || !p.status || p.status === 'published');
fs.mkdirSync(OUT, { recursive: true });
// Nothing published yet: don't ship an empty sitemap or point robots.txt at one.
if (pages.length) {
  fs.writeFileSync(path.join(OUT, 'sitemap-interior-design.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${SITE}${p.url}</loc><lastmod>${p.lastmod}</lastmod></url>`).join('\n')}
</urlset>
`);
  const robotsFile = path.join(OUT, 'robots.txt');
  if (fs.existsSync(robotsFile)) {
    const line = `Sitemap: ${SITE}/sitemap-interior-design.xml`;
    const txt = fs.readFileSync(robotsFile, 'utf8');
    if (!txt.includes(line)) fs.writeFileSync(robotsFile, txt.trimEnd() + '\n' + line + '\n');
  }
}

// --- Link graph (article/main links only, header/footer excluded) ---------------
const graph = {};
const allPages = [
  ...built.map((c) => ({ url: c.url, title: loadCityPage(c).meta.title, type: 'city', state: c.state, lat: c.lat, lon: c.lon })),
  ...states.map((s) => ({ url: s.url, title: s.name, type: 'state-hub', state: s.name })),
  ...(states.length ? [{ url: `${SECTION}/`, title: 'National hub', type: 'national-hub' }] : []),
  ...guides.map((g) => ({ url: g.url, title: g.meta.title, type: 'guide' })),
];
for (const p of allPages) {
  const root = parse(fs.readFileSync(path.join(OUT, p.url, 'index.html'), 'utf8'));
  const out = [...new Set(root.querySelectorAll('main a').map((a) => a.getAttribute('href')).filter((h) => h && h.startsWith(SECTION)))];
  graph[p.url] = { ...p, outbound: out, inbound: [] };
}
for (const [from, p] of Object.entries(graph)) for (const to of p.outbound) graph[to]?.inbound.push(from);
const graphFile = MODE === 'production' ? path.join(DATA, 'link-graph.json') : path.join(OUT, 'link-graph.json');
fs.writeFileSync(graphFile, JSON.stringify({ generated: today(), mode: MODE, pages: graph }, null, 2) + '\n');

console.log(`[content] ${MODE}: ${built.length} city pages, ${states.length} state hubs, ${guides.length} guides -> ${path.relative(ROOT, OUT)}`);
if (!builtUrls.size) console.log('[content] no city pages with a buildable status yet');
