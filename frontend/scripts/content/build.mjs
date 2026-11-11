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
    .replace(/<a href="(https?:\/\/[^"]+)"/g, (m, href) => `<a href="${href}" rel="noopener"`)
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, '</table></div>');
}

// {{img:key}} on its own line in the Markdown -> a <figure> from the page's front-matter `images`.
// Images must be the studio's own work (or properly licensed) and captioned honestly.
// `photo: p07-1` pulls src/size/alt from data/portfolio-images.json (generated from src/content/portfolio.js).
const PHOTOS = JSON.parse(fs.readFileSync(path.join(DATA, 'portfolio-images.json'), 'utf8'));
function insertImages(html, images = {}, file = '') {
  return html.replace(/<p>\{\{img:([a-z0-9-]+)\}\}<\/p>/g, (_, key) => {
    const im = images[key]?.photo ? { ...PHOTOS[images[key].photo], ...images[key] } : images[key];
    if (images[key]?.photo && !PHOTOS[images[key].photo]) throw new Error(`${file}: unknown photo ${images[key].photo}`);
    if (!im) throw new Error(`${file}: {{img:${key}}} has no entry under images in the front matter`);
    return `<figure><img src="${esc(im.src)}" width="${im.width}" height="${im.height}" alt="${esc(im.alt)}" loading="lazy" decoding="async">${im.caption ? `<figcaption>${esc(im.caption)}</figcaption>` : ''}</figure>`;
  });
}

const leadUrl = () => (config.leadUrl ? config.leadUrl + (config.leadUrlParams || '') : '');

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

// Shared look with the main React site: same fonts, near-black + amber palette, same header/footer structure.
const FONTS = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap';
const CSS = `
:root{--dark:#0e0e0e;--dark2:#141414;--foot:#080808;--amber:#fbbf24;--amber3:#fcd34d;--amber2:#fde68a;--paper:#f9f9f8;--ink:#111;--text:#2a2a2a;--muted:#6b6b6b;--line:#e6e4df;--card:#fff;--link:#92400e}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper);color:var(--text);font:17px/1.8 "Plus Jakarta Sans",system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}
img{max-width:100%}a{color:var(--link);text-decoration-color:rgba(180,83,9,.35);text-underline-offset:3px}a:hover{text-decoration-color:currentColor}
.syne,h1,h2,h3{font-family:Syne,"Plus Jakarta Sans",sans-serif}
.in{max-width:1240px;margin:0 auto;padding:0 24px}
.eyebrow{display:inline-block;font:600 12px/1 "Plus Jakarta Sans",sans-serif;letter-spacing:.2em;text-transform:uppercase;color:var(--amber3)}
.pill{border:1px solid rgba(251,191,36,.35);border-radius:999px;padding:8px 14px;background:rgba(251,191,36,.06)}
.btn{display:inline-flex;align-items:center;gap:8px;background:var(--amber);color:#111;font:700 12px/1 "Plus Jakarta Sans",sans-serif;letter-spacing:.16em;text-transform:uppercase;padding:15px 24px;border-radius:999px;text-decoration:none;transition:background .2s}.btn:hover{background:var(--amber3)}
.btn-o{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(251,191,36,.4);color:var(--amber2);font:600 12px/1 "Plus Jakarta Sans",sans-serif;letter-spacing:.16em;text-transform:uppercase;padding:12px 20px;border-radius:999px;text-decoration:none;transition:all .2s}.btn-o:hover{background:var(--amber);color:#111}
.logo{text-decoration:none;display:inline-flex;align-items:baseline;gap:10px;font-family:Syne,sans-serif}.logo b{font-weight:800;font-size:24px;letter-spacing:-.02em;color:var(--amber3)}.logo span{font-weight:300;font-size:16px;letter-spacing:.25em;color:#e5e5e5}
/* header */
header.site{position:sticky;top:0;z-index:50;background:rgba(14,14,14,.94);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.1)}
header.site .in{display:flex;align-items:center;justify-content:space-between;gap:24px;height:72px}
header.site nav.main{display:flex;gap:32px}header.site nav.main a{color:#d4d4d4;text-decoration:none;font-size:14px;font-weight:500;padding:4px 0;border-bottom:2px solid transparent}header.site nav.main a:hover{color:#fff}header.site nav.main a[aria-current]{color:var(--amber3);font-weight:700;border-color:var(--amber)}
.mnav{display:none;position:relative}.mnav summary{list-style:none;cursor:pointer;color:#e5e5e5;padding:8px}.mnav summary::-webkit-details-marker{display:none}
.mnav .drawer{position:fixed;left:0;right:0;top:72px;background:rgba(14,14,14,.98);border-bottom:1px solid rgba(255,255,255,.1);padding:24px;display:flex;flex-direction:column;gap:18px}.mnav .drawer a{color:#e5e5e5;text-decoration:none;font-size:18px;font-weight:500}.mnav .drawer a[aria-current]{color:var(--amber3);font-weight:700}.mnav .drawer .btn{justify-content:center;margin-top:8px}
/* hero */
.hero{background:radial-gradient(1200px 400px at 85% -10%,rgba(251,191,36,.10),transparent 60%),var(--dark);color:#f5f5f5;padding:40px 0 64px;border-bottom:1px solid rgba(255,255,255,.08)}
.crumbs{font-size:13px;color:#a3a3a3;margin-bottom:28px}.crumbs ol{list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;gap:8px}.crumbs li+li:before{content:"/";margin-right:8px;color:#525252}.crumbs a{color:#d4d4d4;text-decoration:none}.crumbs a:hover{color:var(--amber3)}
.hero h1{font-weight:700;font-size:clamp(32px,5.2vw,60px);line-height:1.08;letter-spacing:-.025em;color:#fff;margin:20px 0 18px;max-width:950px}
.hero .lede{color:#d4d4d4;font-size:18px;font-weight:300;max-width:720px;margin:0}.byline{font-size:14px;color:#a3a3a3;margin:0}.byline b{color:#e5e5e5;font-weight:600}
/* article layout */
.layout{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:72px;padding-top:56px;padding-bottom:88px;align-items:start}
article{max-width:760px;min-width:0}
article h2{font-weight:700;font-size:clamp(24px,3vw,32px);line-height:1.2;letter-spacing:-.015em;color:var(--ink);margin:64px 0 18px;scroll-margin-top:96px}
.prose h2:before{content:"";display:block;width:44px;height:3px;background:var(--amber);border-radius:2px;margin-bottom:18px}
article h3{font-weight:600;font-size:20px;line-height:1.35;color:var(--ink);margin:32px 0 8px}
article strong{color:var(--ink)}article ul,article ol{padding-left:22px}article li{margin:8px 0}article li::marker{color:#b45309}
.prose>blockquote:first-child,.prose blockquote{margin:0 0 32px;background:var(--card);border:1px solid var(--line);border-left:4px solid var(--amber);border-radius:16px;padding:6px 26px;box-shadow:0 1px 2px rgba(0,0,0,.03)}
.table-wrap{overflow-x:auto;margin:24px 0;border:1px solid var(--line);border-radius:16px;background:var(--card)}
table{border-collapse:collapse;width:100%;font-size:15px;line-height:1.6}th{background:var(--dark2);color:#f5f5f5;font-weight:600;text-align:left;padding:12px 16px;font-size:14px}td{padding:12px 16px;border-top:1px solid #eeece8;vertical-align:top}tr:nth-child(even) td{background:#fbfaf8}
sup.ref{font-size:11px;margin-left:1px;line-height:0}sup.ref a{text-decoration:none;color:#b45309;font-weight:600}
figure{margin:36px 0}figure img{display:block;width:100%;height:auto;border-radius:20px;background:#e7e5e4}figcaption{font-size:13px;line-height:1.6;color:var(--muted);margin-top:12px}
/* cta */
.cta{background:radial-gradient(600px 200px at 100% 0,rgba(251,191,36,.12),transparent 70%),var(--dark);color:#f5f5f5;border-radius:24px;padding:44px 40px;margin:72px 0 0}
.cta h2{color:#fff;margin:14px 0 12px;font-size:clamp(24px,3vw,34px)}.cta p{color:#d4d4d4;font-weight:300;margin:0 0 26px;max-width:560px}
/* nearby */
.nearby{margin-top:72px}.cards{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:14px}
.cards li{margin:0}.cards a{display:flex;flex-direction:column;gap:4px;height:100%;background:var(--card);border:1px solid var(--line);border-radius:16px;padding:18px 20px;text-decoration:none;color:var(--ink);transition:border-color .2s,transform .2s}.cards a:hover{border-color:var(--amber);transform:translateY(-2px)}
.cards .t{font:600 16px/1.35 Syne,sans-serif}.cards small{color:var(--muted);font-size:13px}.cards .go{color:#b45309;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-top:auto;padding-top:10px}
/* sources */
.sources{font-size:14px;line-height:1.7;color:#525252;margin-top:72px;padding-top:8px;border-top:1px solid var(--line)}.sources h2{font-size:22px}.sources h2:before{display:none}.sources li{margin:6px 0;overflow-wrap:anywhere}
/* sidebar */
aside.side{position:sticky;top:96px;display:flex;flex-direction:column;gap:20px}
.toc{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:0 24px}.toc summary{list-style:none;cursor:pointer;padding:20px 0;min-height:44px;color:#b45309;display:flex;justify-content:space-between;align-items:center}.toc summary:after{content:"+";font:400 22px/1 "Plus Jakarta Sans",sans-serif;letter-spacing:0}.toc[open] summary:after{content:"−"}.toc[open] summary{padding-bottom:6px}.toc summary::-webkit-details-marker{display:none}
.toc ol{list-style:none;padding:0 0 14px;margin:0;counter-reset:t}.toc li{counter-increment:t;margin:0;border-top:1px solid #f0eee9}.toc li:first-child{border-top:0}
.toc a{display:flex;gap:10px;padding:9px 0;font-size:14px;line-height:1.45;color:#3f3f3f;text-decoration:none}.toc a:before{content:counter(t,decimal-leading-zero);font:600 11px/2 Syne,sans-serif;color:#b45309}.toc a:hover{color:var(--ink)}
.side-cta{background:var(--dark);color:#e5e5e5;border-radius:20px;padding:26px 24px}.side-cta p{margin:12px 0 20px;font-size:15px;line-height:1.6;color:#d4d4d4}.side-cta .t{font:700 20px/1.25 Syne,sans-serif;color:#fff;margin:12px 0 8px}.side-cta .btn{width:100%;justify-content:center}
.mcta{display:none}
/* hubs */
.hub{padding-top:56px;padding-bottom:88px}.hub h2{font-weight:700;font-size:clamp(24px,3vw,32px);color:var(--ink);margin:0 0 24px;letter-spacing:-.015em}.hub h2 a{color:inherit;text-decoration:none}.hub section+section{margin-top:64px}
.grid{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px}
.grid a{display:flex;flex-direction:column;height:100%;background:var(--card);border:1px solid var(--line);border-radius:20px;overflow:hidden;text-decoration:none;color:var(--text);transition:border-color .2s,transform .25s,box-shadow .25s}.grid a:hover{border-color:var(--amber);transform:translateY(-3px);box-shadow:0 18px 40px -24px rgba(0,0,0,.35)}
.grid img{display:block;width:100%;height:auto;aspect-ratio:16/10;object-fit:cover;background:#e7e5e4}.grid .b{padding:20px 22px 22px;display:flex;flex-direction:column;gap:8px;flex:1}
.grid .k{font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#b45309}.grid .n{font:700 22px/1.2 Syne,sans-serif;color:var(--ink)}.grid .d{font-size:14px;line-height:1.6;color:var(--muted)}.grid .go{margin-top:auto;padding-top:8px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#b45309}
.stat{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}.stat span{font-size:13px;color:#d4d4d4;border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:8px 14px}
/* footer */
footer.site{background:var(--foot);color:#a3a3a3;border-top:1px solid rgba(255,255,255,.12);padding:72px 0 32px;font-size:14px;line-height:1.7}
footer.site .cols{display:grid;grid-template-columns:1.4fr 1fr 2fr;gap:48px;padding-bottom:48px;border-bottom:1px solid rgba(255,255,255,.08)}
footer.site h2{font:600 12px/1 "Plus Jakarta Sans",sans-serif;letter-spacing:.2em;text-transform:uppercase;color:var(--amber3);margin:0 0 18px}
footer.site ul{list-style:none;padding:0;margin:0}footer.site li{margin:0 0 8px}footer.site a{color:#d4d4d4;text-decoration:none;font-size:13px}footer.site a:hover{color:#fff}footer.site a.btn,.mnav .drawer a.btn{color:#111;font-size:12px}footer.site a.btn:hover,.mnav .drawer a.btn:hover{color:#111}
footer.site .cities{columns:3;column-gap:24px}footer.site .brand p{max-width:340px;font-size:13px;margin:18px 0}footer.site .bottom{padding-top:24px;font-size:12px;color:#737373;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
.draft{background:#7f1d1d;color:#fee2e2;padding:8px 16px;text-align:center;font-size:14px}
@media (max-width:1060px){.layout{grid-template-columns:1fr;gap:0;padding-top:28px}aside.side{position:static;order:-1;margin-bottom:8px}.side-cta{display:none}article{max-width:none}
 .mcta{display:flex;position:fixed;left:12px;right:12px;bottom:12px;z-index:40;justify-content:center;box-shadow:0 10px 30px rgba(0,0,0,.35)}body.has-mcta{padding-bottom:76px}}
@media (max-width:900px){header.site nav.main,header.site .btn-o{display:none}.mnav{display:block}footer.site .cols{grid-template-columns:1fr 1fr}footer.site .brand{grid-column:1/-1}footer.site .cities{columns:2}}
@media (max-width:560px){.in{padding-left:16px;padding-right:16px}.hero{padding:28px 0 44px}.cta{padding:32px 24px;border-radius:20px}footer.site .cols{grid-template-columns:1fr}.logo b{font-size:21px}.logo span{font-size:14px}}`;

const ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';
const MENU = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
const NAV = [
  { name: 'Home', url: '/' }, { name: 'About Studio', url: '/about/' }, { name: 'Services', url: '/services/' },
  { name: 'Portfolio', url: '/portfolio/' }, { name: 'City Guides', url: `${SECTION}/` },
];
const logo = (tag = '') => `<a class="logo" href="/" aria-label="${esc(config.siteName)} home"${tag}><b>2BHK</b><span>INTERIORS</span></a>`;
const navLinks = () => NAV.map((n) => `<a href="${n.url}"${n.url === `${SECTION}/` ? ' aria-current="page"' : ''}>${n.name}</a>`).join('');
const photoFor = (images = {}) => {
  const first = Object.values(images)[0];
  return first ? (first.photo ? { ...PHOTOS[first.photo], ...first } : first) : null;
};

function siteFooter() {
  const list = [...built].filter((c) => c.status === 'published' || MODE === 'preview')
    .sort((a, b) => Number(b.population || 0) - Number(a.population || 0));
  return `<footer class="site"><div class="in">
<div class="cols">
<div class="brand">${logo()}<p>Residential interior design studio based in Bengaluru, taking on projects in cities across India: mood boards, scaled 2D layouts and photorealistic 3D visualisation.</p>
<a class="btn" href="${leadUrl()}">Book consultation ${ARROW}</a></div>
<div><h2>Navigation</h2><ul>${NAV.map((n) => `<li><a href="${n.url}">${n.name}</a></li>`).join('')}<li><a href="mailto:hello@2bhkinteriors.in">hello@2bhkinteriors.in</a></li></ul></div>
${list.length ? `<div><h2>City guides</h2><ul class="cities">${list.map((c) => `<li><a href="${c.url}">${esc(c.city)}</a></li>`).join('')}</ul></div>` : ''}
</div>
<div class="bottom"><span>© ${new Date().getFullYear()} ${esc(config.siteName)}. All rights reserved.</span><span>Exclusively residential design</span></div>
</div></footer>`;
}

function layout({ url, title, description, status, jsonld, body, image, ogType = 'article', mobileCta = false }) {
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
<meta name="theme-color" content="#0e0e0e">
<meta property="og:type" content="${ogType}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="${esc(config.siteName)}">
${image ? `<meta property="og:image" content="${SITE}${esc(image.src)}">\n<meta name="twitter:card" content="summary_large_image">` : ''}
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
<style>${CSS}</style>
</head>
<body${mobileCta ? ' class="has-mcta"' : ''}>
${MODE === 'preview' ? `<div class="draft">Preview build: status "${esc(status)}", not for publishing (noindex)</div>` : ''}
<header class="site"><div class="in">${logo()}
<nav class="main" aria-label="Main">${navLinks()}</nav>
<a class="btn-o" href="${leadUrl()}">Book consultation ${ARROW}</a>
<details class="mnav"><summary aria-label="Open menu">${MENU}</summary><nav class="drawer" aria-label="Mobile">${navLinks()}<a class="btn" href="${leadUrl()}">Book consultation ${ARROW}</a></nav></details>
</div></header>
${body}
${mobileCta ? `<a class="btn mcta" href="${leadUrl()}">Book a design consultation ${ARROW}</a>` : ''}
${siteFooter()}
<script>try{if(matchMedia('(max-width:1060px)').matches)document.querySelectorAll('details.toc').forEach(function(d){d.removeAttribute('open')});document.querySelectorAll('.mnav .drawer a').forEach(function(a){a.addEventListener('click',function(){a.closest('details').removeAttribute('open')})})}catch(e){}</script>
</body>
</html>
`;
}

// H2s in the guide body get ids so the "On this page" list can link to them.
function addHeadingIds(html) {
  const toc = [];
  const used = new Set();
  const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner) => {
    const text = inner.replace(/<[^>]+>/g, '');
    let id = text.toLowerCase().replace(/&[#a-z0-9]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
    while (used.has(id)) id += '-2';
    used.add(id);
    toc.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, toc };
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

const hubCard = (c, i) => {
  const meta = loadCityPage(c).meta;
  const img = photoFor(meta.images);
  return `<li><a href="${c.url}">${img ? `<img src="${esc(img.src)}" width="${img.width}" height="${img.height}" alt="" loading="${i < 3 ? 'eager' : 'lazy'}" decoding="async">` : ''}<span class="b"><span class="k">${esc(c.state)}</span><span class="n">${esc(c.city)}</span><span class="d">${esc(meta.description)}</span><span class="go">Read the guide →</span></span></a></li>`;
};
const byPopulation = (a, b) => Number(b.population || 0) - Number(a.population || 0);

const author = config.author;
const authorLine = `${esc(author.name)}${author.role ? `, ${esc(author.role)}` : ''}`;

// --- City pages ---------------------------------------------------------------
for (const c of built) {
  const page = loadCityPage(c);
  const { facts } = loadFacts(c.slug);
  const m = page.meta;
  const { html, sources } = renderBody(page.body, facts);
  const content = insertImages(finishHtml(html), m.images, page.file);
  const linked = new Set([...content.matchAll(/href="(\/interior-design\/[^"#]+)"/g)].map((x) => x[1]));
  const nearby = nearbyFor(c, linked);
  const faqs = extractFaqs(page.body);
  const bc = crumbs([
    { name: 'Home', url: '/' }, { name: 'Interior Design', url: `${SECTION}/` },
    { name: c.state, url: `${SECTION}/${c.state_slug}/` }, { name: c.city, url: c.url },
  ]);
  const lead = leadUrl();
  const disclosure = config.disclosure || '';
  const updated = m.updated || today();
  const published = c.publish_date || m.published || updated;
  const jsonld = [
    {
      '@context': 'https://schema.org', '@type': 'Article', headline: m.h1, description: m.description,
      author: { '@type': 'Person', name: author.name, ...(author.url ? { url: author.url } : {}) },
      publisher: { '@type': 'Organization', '@id': SITE + '/#organization', name: config.siteName, url: SITE + '/' },
      datePublished: published, dateModified: updated, mainEntityOfPage: SITE + c.url, inLanguage: 'en-IN',
    },
    bc.ld,
    ...(faqs.length ? [{
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    }] : []),
  ];
  const sourceTypes = [...new Set(facts.filter((f) => sources.some((s) => s.url === f.source_url)).map((f) => f.source_type).filter(Boolean))];
  const { html: prose, toc } = addHeadingIds(content);
  const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const body = `<main>
<section class="hero"><div class="in">
${bc.html}
<span class="eyebrow pill">City guide · ${esc(c.state)}</span>
<h1>${esc(m.h1)}</h1>
<p class="byline">Last updated <time datetime="${updated}">${fmt(updated)}</time> · Written by <b>${authorLine}</b>${config.reviewer ? ` · Reviewed by ${esc(config.reviewer.name)}` : ''}</p>
${disclosure ? `<p class="byline">${esc(disclosure)}</p>` : ''}
</div></section>
<div class="in layout">
<article>
<div class="prose">
${prose}
</div>
${lead ? `<section class="cta" aria-labelledby="cta-h"><span class="eyebrow">Design consultation</span><h2 id="cta-h">${esc(m.cta_heading || `Planning interiors in ${c.city}?`)}</h2>
<p>${esc(m.cta_text || `Tell us about your home and we will get back to you to talk through your floor plan, budget and timeline.`)}</p>
<a class="btn" href="${lead}">Talk to 2BHK Interiors ${ARROW}</a></section>` : ''}
${nearby.length ? `<section class="nearby" aria-labelledby="nearby-h"><h2 id="nearby-h">Nearby city guides</h2><ul class="cards">${nearby
    .map(({ o, d }) => `<li><a href="${o.url}"><span class="t">Interior design in ${esc(o.city)}</span><small>${Math.round(d)} km away</small><span class="go">Read guide →</span></a></li>`).join('')}</ul></section>` : ''}
<section class="sources" aria-labelledby="src-h"><h2 id="src-h">How we researched this page</h2>
<p>We checked every figure on this page against the sources below on the dates shown${sourceTypes.length ? ` (${sourceTypes.map(esc).join(', ')})` : ''}. If you spot something out of date, tell us and we will correct it.</p>
<ol>${sources.map((s, i) => `<li id="source-${i + 1}">${esc(s.publisher)}: <a href="${s.url}" rel="noopener">${esc(s.title)}</a> (accessed ${esc(s.accessed)})</li>`).join('')}</ol>
</section>
</article>
<aside class="side" aria-label="On this page">
${toc.length ? `<details class="toc" open><summary class="eyebrow">On this page</summary><ol>${toc.map((t) => `<li><a href="#${t.id}">${t.text}</a></li>`).join('')}</ol></details>` : ''}
${lead ? `<div class="side-cta"><span class="eyebrow">Free to ask</span><p class="t">Planning a home in ${esc(c.city)}?</p><p>Share your floor plan and budget. We will suggest layouts and materials that suit your home.</p><a class="btn" href="${lead}">Book consultation ${ARROW}</a></div>` : ''}
</aside>
</div>
</main>`;
  write(c.url, layout({ url: c.url, title: m.title, description: m.description, status: c.status, jsonld, body, image: photoFor(m.images), mobileCta: !!lead }));
}

// --- Guides --------------------------------------------------------------------
for (const g of guides) {
  const { html } = renderBody(g.body, []);
  const bc = crumbs([{ name: 'Home', url: '/' }, { name: 'Interior Design', url: `${SECTION}/` }, { name: g.meta.h1, url: g.url }]);
  write(g.url, layout({
    url: g.url, title: g.meta.title, description: g.meta.description, status: g.status, jsonld: [bc.ld],
    body: `<main><section class="hero"><div class="in">${bc.html}<span class="eyebrow pill">Planning guide</span><h1>${esc(g.meta.h1)}</h1></div></section><div class="in layout"><article><div class="prose">${finishHtml(html)}</div></article></div></main>`,
  }));
}

// --- Hubs (only when there is something to list) --------------------------------
const hubCta = () => (leadUrl() ? `<section class="cta" aria-labelledby="hub-cta-h"><span class="eyebrow">Design consultation</span><h2 id="hub-cta-h">Planning interiors for your home?</h2><p>2BHK Interiors takes on projects in cities across India. Share your floor plan and budget, and we will suggest layouts, storage and materials that fit.</p><a class="btn" href="${leadUrl()}">Book a design consultation ${ARROW}</a></section>` : '');
for (const s of states) {
  const bc = crumbs([{ name: 'Home', url: '/' }, { name: 'Interior Design', url: `${SECTION}/` }, { name: s.name, url: s.url }]);
  const list = [...s.cities].sort(byPopulation).map(hubCard).join('');
  write(s.url, layout({
    url: s.url, status: s.cities.some((c) => c.status === 'published') ? 'published' : 'drafted', ogType: 'website',
    title: `Interior Design City Guides for ${s.name} | ${config.siteName}`,
    description: `Researched interior design guides for cities in ${s.name}: local homes, climate-led material choices, budgets and how to choose a designer.`,
    image: photoFor(loadCityPage([...s.cities].sort(byPopulation)[0]).meta.images),
    jsonld: [bc.ld],
    body: `<main><section class="hero"><div class="in">${bc.html}<span class="eyebrow pill">City guides · ${esc(s.name)}</span><h1>Interior design guides for ${esc(s.name)}</h1><p class="lede">Each guide covers the homes, climate and practical planning questions specific to that city, with a source for every figure.</p><div class="stat"><span>${s.cities.length} city guides</span><span>Census, IMD and state economic data</span><span>Written by ${esc(author.name)}</span></div></div></section>
<div class="in hub"><section aria-label="Cities in ${esc(s.name)}"><ul class="grid">${list}</ul></section>
<section><p><a href="${SECTION}/">See guides for other states</a></p>${hubCta()}</section></div></main>`,
  }));
}
if (states.length) {
  const bc = crumbs([{ name: 'Home', url: '/' }, { name: 'Interior Design', url: `${SECTION}/` }]);
  const groups = states.map((s) => `<section aria-labelledby="st-${s.slug}"><h2 id="st-${s.slug}"><a href="${s.url}">${esc(s.name)}</a></h2><ul class="grid">${[...s.cities].sort(byPopulation).map(hubCard).join('')}</ul></section>`).join('');
  const guideList = guides.length ? `<section><h2>Planning guides</h2><ul class="cards">${guides.map((g) => `<li><a href="${g.url}"><span class="t">${esc(g.meta.h1)}</span></a></li>`).join('')}</ul></section>` : '';
  write(`${SECTION}/`, layout({
    url: `${SECTION}/`, status: built.some((c) => c.status === 'published') ? 'published' : 'drafted', ogType: 'website',
    title: `Interior Design Guides for Indian Cities | ${config.siteName}`,
    description: 'City-by-city interior design guides for India: housing, climate-led material choices, budgets and how to choose a designer, with sources for every figure.',
    image: photoFor(loadCityPage([...built].sort(byPopulation)[0]).meta.images),
    jsonld: [bc.ld],
    body: `<main><section class="hero"><div class="in">${bc.html}<span class="eyebrow pill">City guides</span><h1>Interior design guides for Indian cities</h1><p class="lede">Practical, sourced guides to planning home interiors city by city: what homes are like, how the climate affects materials, and how to compare quotes.</p><div class="stat"><span>${built.length} city guides</span><span>${states.length} ${states.length === 1 ? 'state' : 'states'}</span></div></div></section>
<div class="in hub">${guideList}${groups}<section>${hubCta()}</section></div></main>`,
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
const urlTags = pages.map((p) => `  <url>\n    <loc>${SITE}${p.url}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n  </url>`).join('\n');
if (MODE === 'production') {
  // One sitemap for the whole site: add the guides to the sitemap.xml that prerender.mjs wrote.
  const sitemapFile = path.join(OUT, 'sitemap.xml');
  if (pages.length) {
    if (!fs.existsSync(sitemapFile)) throw new Error('dist/sitemap.xml missing: run the Vite build and prerender first');
    const xml = fs.readFileSync(sitemapFile, 'utf8');
    fs.writeFileSync(sitemapFile, xml.replace('</urlset>', `${urlTags}\n</urlset>`));
  }
} else if (pages.length) {
  // Preview only (QA reads it); never deployed.
  fs.writeFileSync(path.join(OUT, 'sitemap-interior-design.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlTags}
</urlset>
`);
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
