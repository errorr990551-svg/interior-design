// QA gates for city guides. Builds a preview, then checks each target page.
//   npm run content:qa                         -> pages with status drafted/qa_failed/ready
//   npm run content:qa -- --cities=pune,nashik -> specific pages
//   npm run content:qa -- --apply              -> also set status to ready / qa_failed
//   npm run content:qa -- --full               -> also run the full Vite build
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { parse } from 'node-html-parser';
import {
  ROOT, REPORTS, loadConfig, loadCities, saveCities, loadCityPage, loadFacts, loadGuides,
  factIdsIn, plainText, h2Sections, isFaqHeading, FACT_TOKEN, today,
} from './lib.mjs';

const argv = process.argv.slice(2);
const opt = (n) => (argv.find((a) => a.startsWith(`--${n}=`)) || '').split('=')[1];
const flag = (n) => argv.includes(`--${n}`);
const PREVIEW = path.join(ROOT, '.content-preview');

execSync(`node ${path.join(ROOT, 'scripts/content/build.mjs')} --mode=preview`, { stdio: 'inherit' });
if (flag('full')) execSync('npm run build', { cwd: ROOT, stdio: 'inherit' });

const config = loadConfig();
const SITE = config.siteUrl.replace(/\/$/, '');
const cities = loadCities();
const withPage = cities.filter((c) => loadCityPage(c));
const wanted = opt('cities')?.split(',');
const targets = withPage.filter((c) => (wanted ? wanted.includes(c.slug) : ['drafted', 'qa_failed', 'ready'].includes(c.status)));
const graph = JSON.parse(fs.readFileSync(path.join(PREVIEW, 'link-graph.json'), 'utf8')).pages;
const sitemap = fs.readFileSync(path.join(PREVIEW, 'sitemap-interior-design.xml'), 'utf8');
const guideCount = loadGuides().length;
const builtCities = withPage.filter((c) => fs.existsSync(path.join(PREVIEW, c.url, 'index.html')));

const BANNED = [
  "in today's fast-paced world", 'look no further', 'transform your dream home', 'dream home', 'unlock', 'elevate',
  'nestled', 'a testament to', 'in the realm of', 'game-changer', 'seamless', 'hassle-free', 'one-stop',
  'it is important to note', 'when it comes to', 'delve', 'tapestry', 'vibrant city',
];
const SUPERLATIVES = /\b(the best|best interior|#1|number one|no\.\s?1|cheapest|top-rated|top rated|leading interior|guaranteed|lowest price)\b/i;
const GENERIC_ANCHORS = /^(click here|here|read more|this page|link|more|learn more)$/i;
// Digits that are not factual claims: BHK labels, ordinals used as list numbering.
const EXEMPT_NUMBERS = [/\b[1-5]\s?-?BHK\b/gi, /^\s*\d+\.\s/gm];

const shingles = (text) => {
  const w = text.toLowerCase().replace(/[^a-z0-9₹% ]+/g, ' ').split(/\s+/).filter(Boolean);
  const s = new Set();
  for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(' '));
  return s;
};
const jaccard = (a, b) => {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter || 1);
};
const otherBodies = new Map(withPage.map((c) => [c.slug, shingles(plainText(loadCityPage(c).body))]));

const results = [];
for (const c of targets) {
  const page = loadCityPage(c);
  const { facts = [] } = loadFacts(c.slug);
  const byId = new Map(facts.map((f) => [f.id, f]));
  const gates = {};
  const fail = (g, msg) => (gates[g] ||= []).push(msg);

  // Gate 1: facts — every marker resolves, every numeric sentence carries a marker.
  const ids = factIdsIn(page.body);
  for (const id of new Set(ids)) {
    const f = byId.get(id);
    if (!f) fail(1, `marker {{f:${id}}} has no entry in data/facts/${c.slug}.json`);
    else for (const k of ['claim', 'source_url', 'source_title', 'publisher', 'date_accessed', 'quote'])
      if (!f[k]) fail(1, `fact ${id} is missing "${k}"`);
  }
  const prose = page.body.replace(/^\s*#{1,6} .*$/gm, '').replace(/\]\([^)]*\)/g, ']');
  const units = prose.split(/\n+|(?<=[.!?])\s+(?=[A-Z₹"(])/).map((s) => s.trim()).filter(Boolean);
  for (const u of units) {
    if (u.startsWith('|') && /^\|[\s:|-]+\|?$/.test(u)) continue;
    let check = u.replace(FACT_TOKEN, '');
    for (const re of EXEMPT_NUMBERS) check = check.replace(re, '');
    if (/\d/.test(check) && !u.includes('{{f:')) fail(1, `number without a source marker: "${check.slice(0, 110)}"`);
  }
  const usedSpecific = [...new Set(ids)].filter((id) => byId.get(id)?.city_specific);

  // Gate 2: uniqueness against every other city page (shared template parts are not in the Markdown).
  const mine = otherBodies.get(c.slug);
  let worst = { slug: null, score: 0 };
  for (const [slug, sh] of otherBodies) {
    if (slug === c.slug) continue;
    const score = jaccard(mine, sh);
    if (score > worst.score) worst = { slug, score };
  }
  if (worst.score > 0.3) fail(2, `${(worst.score * 100).toFixed(1)}% overlap with ${worst.slug}`);

  // Gate 3: thin content.
  for (const s of h2Sections(page.body)) {
    const words = plainText(s.body).split(' ').filter(Boolean).length;
    if (words < 120) fail(3, `section "${s.heading}" has ${words} words (min 120)`);
  }
  if (usedSpecific.length < 8) fail(3, `only ${usedSpecific.length} verified city-specific facts used (min 8)`);
  const totalWords = plainText(page.body).split(' ').filter(Boolean).length;

  // Gate 4: banned phrases and unsourced superlatives (quoted text is allowed).
  const unquoted = plainText(page.body).replace(/"[^"]*"|“[^”]*”/g, '').toLowerCase();
  for (const b of BANNED) if (unquoted.includes(b)) fail(4, `banned phrase: "${b}"`);
  const sup = unquoted.match(SUPERLATIVES);
  if (sup) fail(4, `unsourced superlative: "${sup[0]}"`);

  // Gates 5 and 6 work on the built HTML.
  const htmlFile = path.join(PREVIEW, c.url, 'index.html');
  const root = parse(fs.readFileSync(htmlFile, 'utf8'));
  const article = root.querySelector('article');
  const nearbySec = root.querySelector('section[aria-labelledby="nearby-h"]');
  const sourcesSec = root.querySelector('section.sources');
  const contentLinks = article.querySelectorAll('a').filter((a) => !a.closest('section.sources') && !a.closest('section[aria-labelledby="nearby-h"]') && !a.closest('section.cta'));
  const anchors = new Map();
  const targetsSeen = new Map();
  for (const a of article.querySelectorAll('a')) {
    const href = a.getAttribute('href') || '';
    const text = a.textContent.trim();
    if (href.startsWith('#')) continue;
    if (GENERIC_ANCHORS.test(text)) fail(5, `generic anchor text "${text}" -> ${href}`);
    if (href.startsWith('/')) {
      const file = path.join(PREVIEW, href.split('#')[0], href.endsWith('/') ? 'index.html' : '');
      if (!href.startsWith('/interior-design/') && href !== '/') fail(5, `internal link outside the section: ${href}`);
      else if (href !== '/' && !fs.existsSync(file)) fail(5, `broken internal link: ${href}`);
      if (!a.closest('section.sources')) {
        targetsSeen.set(href, (targetsSeen.get(href) || 0) + 1);
        const key = text.toLowerCase();
        if (anchors.has(key) && anchors.get(key) !== href) fail(5, `anchor text "${text}" reused for different targets`);
        if (anchors.has(key) && anchors.get(key) === href) fail(5, `anchor text "${text}" repeated`);
        anchors.set(key, href);
      }
    }
    if (/livspace\.com/.test(href) && config.relationship !== 'official') {
      const rel = a.getAttribute('rel') || '';
      if (!/sponsored/.test(rel) || !/nofollow/.test(rel)) fail(5, `Livspace link without rel="sponsored nofollow": ${href}`);
    }
  }
  for (const [href, n] of targetsSeen) if (n > 1) fail(5, `${n} links to ${href} in the article (max 1)`);
  const cityLinks = new Set([...targetsSeen.keys()].filter((h) => builtCities.some((o) => o.url === h && o.slug !== c.slug)));
  const contextualCity = contentLinks.filter((a) => builtCities.some((o) => o.url === a.getAttribute('href') && o.slug !== c.slug));
  const needCities = Math.min(3, builtCities.length - 1);
  if (cityLinks.size < needCities) fail(5, `${cityLinks.size} nearby-city links (need ${needCities})`);
  if (builtCities.length > 1 && !contextualCity.length) fail(5, 'no contextual in-text link to another city guide');
  const guideLinks = contentLinks.filter((a) => (a.getAttribute('href') || '').startsWith('/interior-design/guides/'));
  const needGuides = Math.min(2, guideCount);
  if (guideLinks.length < needGuides) fail(5, `${guideLinks.length} topic-guide links (need ${needGuides})`);
  const crumbHrefs = root.querySelectorAll('nav.crumbs a').map((a) => a.getAttribute('href'));
  if (!crumbHrefs.includes(`/interior-design/${c.state_slug}/`) || !crumbHrefs.includes('/interior-design/')) fail(5, 'breadcrumbs missing state or national hub link');
  if (!(graph[c.url]?.inbound.length)) fail(5, 'orphan page: no inbound internal links');
  if (!nearbySec && builtCities.length > 2) fail(5, 'no "Nearby city guides" block');
  if (!sourcesSec) fail(5, 'no sources section');

  // Gate 6: technical.
  const title = root.querySelector('title')?.textContent || '';
  const desc = root.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  if (title.length < 50 || title.length > 60) fail(6, `title is ${title.length} chars (50-60): "${title}"`);
  if (desc.length < 140 || desc.length > 155) fail(6, `meta description is ${desc.length} chars (140-155)`);
  const h1s = root.querySelectorAll('h1');
  if (h1s.length !== 1) fail(6, `${h1s.length} H1 tags (need exactly 1)`);
  const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute('href');
  if (canonical !== SITE + c.url) fail(6, `canonical ${canonical} should be ${SITE + c.url}`);
  if (!/^[a-z0-9-]+$/.test(c.slug) || !/^[a-z0-9-]+$/.test(c.state_slug)) fail(6, `slug not lowercase-hyphenated: ${c.url}`);
  let last = 1;
  for (const h of article.querySelectorAll('h1, h2, h3, h4, h5, h6')) {
    const lvl = Number(h.tagName[1]);
    if (lvl > last + 1) fail(6, `heading level jumps from h${last} to h${lvl}: "${h.textContent.trim()}"`);
    last = lvl;
  }
  const lds = root.querySelectorAll('script[type="application/ld+json"]').map((s) => {
    try { return JSON.parse(s.textContent); } catch { fail(6, 'invalid JSON-LD'); return {}; }
  });
  const art = lds.find((j) => j['@type'] === 'Article');
  if (!art?.headline || !art?.author?.name || !art?.datePublished || !art?.dateModified) fail(6, 'Article schema missing headline/author/dates');
  if (!lds.some((j) => j['@type'] === 'BreadcrumbList')) fail(6, 'BreadcrumbList schema missing');
  const faqSec = h2Sections(page.body).find((s) => isFaqHeading(s.heading));
  const visibleFaqs = faqSec ? faqSec.body.split(/^### /m).length - 1 : 0;
  const faqLd = lds.find((j) => j['@type'] === 'FAQPage');
  if ((faqLd?.mainEntity.length || 0) !== visibleFaqs) fail(6, `FAQPage schema has ${faqLd?.mainEntity.length || 0} questions, page shows ${visibleFaqs}`);
  if (visibleFaqs && (visibleFaqs < 5 || visibleFaqs > 8)) fail(6, `${visibleFaqs} FAQs (5-8 expected)`);
  for (const img of article.querySelectorAll('img'))
    if (!img.getAttribute('alt') || !img.getAttribute('width') || !img.getAttribute('height')) fail(6, `image without alt/width/height: ${img.getAttribute('src')}`);
  if (!sitemap.includes(SITE + c.url)) fail(6, 'missing from sitemap');
  if (c.status === 'published' && /noindex/.test(root.querySelector('meta[name="robots"]')?.getAttribute('content') || '')) fail(6, 'published page is noindex');

  // Publishing blockers: not quality failures, but the page cannot go live.
  const blockers = [];
  if (!['official', 'partner', 'affiliate', 'independent'].includes(config.relationship)) blockers.push('relationship with Livspace not set in data/site.config.json (disclosure is a TODO)');
  if (/TODO/.test(JSON.stringify(config.author))) blockers.push('author name/role/credentials are TODO in data/site.config.json');
  if (c.livspace_served !== 'yes') blockers.push(`Livspace service in ${c.city} is "${c.livspace_served}"`);
  if (!config.leadUrl && !c.livspace_city_url) blockers.push('no lead URL');
  if (!article.querySelectorAll('img').length) blockers.push('no images (add licensed images or confirm text-only)');

  results.push({ c, gates, blockers, words: totalWords, facts: usedSpecific.length, overlap: worst });
}

// Site-wide link checks across every built page.
const orphans = Object.values(graph).filter((p) => p.type === 'city' && !p.inbound.length).map((p) => p.url);
const heavy = Object.values(graph).filter((p) => p.outbound.length > 100).map((p) => p.url);

const GATE_NAMES = { 1: 'Facts', 2: 'Uniqueness', 3: 'Depth', 4: 'Phrasing', 5: 'Links', 6: 'Technical' };
let md = `# Content QA — ${today()}\n\nPreview build: \`.content-preview/\`. Gate 7 (skeptical-homeowner self-review) is manual.\n\n`;
md += `| City | Words | City facts | Max overlap | ${Object.values(GATE_NAMES).join(' | ')} | Publish blockers |\n|---|---|---|---|${Object.keys(GATE_NAMES).map(() => '---').join('|')}|---|\n`;
for (const r of results) {
  md += `| ${r.c.city} | ${r.words} | ${r.facts} | ${(r.overlap.score * 100).toFixed(1)}%${r.overlap.slug ? ` (${r.overlap.slug})` : ''} | ${Object.keys(GATE_NAMES).map((g) => (r.gates[g] ? `FAIL (${r.gates[g].length})` : 'pass')).join(' | ')} | ${r.blockers.length} |\n`;
}
for (const r of results) {
  md += `\n## ${r.c.city} (${r.c.url})\n`;
  for (const g of Object.keys(GATE_NAMES)) if (r.gates[g]) md += `\n**Gate ${g} — ${GATE_NAMES[g]}**\n${r.gates[g].map((m) => `- ${m}`).join('\n')}\n`;
  if (!Object.keys(r.gates).length) md += '\nAll automated gates pass.\n';
  if (r.blockers.length) md += `\n**Publish blockers**\n${r.blockers.map((m) => `- ${m}`).join('\n')}\n`;
}
md += `\n## Site-wide links\n- Orphan city pages: ${orphans.length ? orphans.join(', ') : 'none'}\n- Pages with >100 internal links: ${heavy.length ? heavy.join(', ') : 'none'}\n- Topic guides available: ${guideCount}\n`;
fs.mkdirSync(REPORTS, { recursive: true });
fs.writeFileSync(path.join(REPORTS, `qa-${today()}.md`), md);
console.log('\n' + md);

if (flag('apply')) {
  for (const r of results) {
    const row = cities.find((x) => x.slug === r.c.slug);
    if (row.status !== 'published') row.status = Object.keys(r.gates).length ? 'qa_failed' : 'ready';
  }
  saveCities(cities);
  console.log('[qa] statuses updated in data/cities.csv');
}
process.exitCode = results.some((r) => Object.keys(r.gates).length) || orphans.length ? 1 : 0;
