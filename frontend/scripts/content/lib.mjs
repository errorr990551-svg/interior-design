// Shared helpers for the /interior-design/ city-guide system.
// Pages are authored as Markdown in content/interior-design/, facts live in
// data/facts/{city}.json, the queue and statuses live in data/cities.csv.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { marked } from 'marked';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const DATA = path.join(ROOT, 'data');
export const CONTENT = path.join(ROOT, 'content', 'interior-design');
export const REPORTS = path.join(ROOT, 'reports');
export const SECTION = '/interior-design';

// Which statuses get built in each mode. Preview pages are always noindex.
export const MODE_STATUSES = {
  production: ['published'],
  preview: ['drafted', 'qa_failed', 'ready', 'published'],
};

export function loadConfig() {
  return JSON.parse(fs.readFileSync(path.join(DATA, 'site.config.json'), 'utf8'));
}

// --- CSV (RFC 4180 subset: quoted fields, escaped quotes) -------------------
function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (ch !== '\r') field += ch;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const csvCell = (v) => (/[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v));

export function loadCities() {
  const [header, ...rows] = parseCsv(fs.readFileSync(path.join(DATA, 'cities.csv'), 'utf8'));
  return rows.filter((r) => r.length > 1).map((r) => {
    const c = Object.fromEntries(header.map((h, i) => [h, r[i] ?? '']));
    c.lat = Number(c.latitude);
    c.lon = Number(c.longitude);
    c.url = `${SECTION}/${c.state_slug}/${c.slug}/`;
    return c;
  });
}

export function saveCities(cities) {
  const text = fs.readFileSync(path.join(DATA, 'cities.csv'), 'utf8');
  const header = parseCsv(text)[0];
  const lines = [header.join(','), ...cities.map((c) => header.map((h) => csvCell(c[h] ?? '')).join(','))];
  fs.writeFileSync(path.join(DATA, 'cities.csv'), lines.join('\n') + '\n');
}

export function km(a, b) {
  const rad = (d) => (d * Math.PI) / 180;
  const h = Math.sin(rad(b.lat - a.lat) / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lon - a.lon) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

// --- Content -----------------------------------------------------------------
export const cityFile = (c) => path.join(CONTENT, 'cities', c.state_slug, `${c.slug}.md`);

export function loadCityPage(c) {
  const file = cityFile(c);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  return { meta: data, body: content, file };
}

export function loadFacts(slug) {
  const file = path.join(DATA, 'facts', `${slug}.json`);
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : { facts: [] };
}

export function loadGuides() {
  const dir = path.join(CONTENT, 'guides');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => {
    const { data, content } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
    const slug = f.replace(/\.md$/, '');
    return { slug, meta: data, body: content, url: `${SECTION}/guides/${slug}/`, status: data.status || 'drafted' };
  });
}

// Fact markers look like {{f:pune-rain}} or {{f:pune-rain,pune-humidity}}.
export const FACT_TOKEN = /\{\{f:([a-z0-9,\- ]+)\}\}/g;

export function factIdsIn(body) {
  return [...body.matchAll(FACT_TOKEN)].flatMap((m) => m[1].split(',').map((s) => s.trim()));
}

// Replace fact markers with numbered superscripts; one number per source URL.
export function renderBody(body, facts) {
  const byId = new Map(facts.map((f) => [f.id, f]));
  const sources = [];
  const numberFor = (f) => {
    let i = sources.findIndex((s) => s.url === f.source_url);
    if (i === -1) { sources.push({ url: f.source_url, title: f.source_title, publisher: f.publisher, accessed: f.date_accessed }); i = sources.length - 1; }
    return i + 1;
  };
  const withRefs = body.replace(FACT_TOKEN, (_, ids) => {
    const nums = [...new Set(ids.split(',').map((s) => byId.get(s.trim())).filter(Boolean).map(numberFor))];
    return nums.map((n) => `<sup class="ref"><a href="#source-${n}" aria-label="Source ${n}">${n}</a></sup>`).join('');
  });
  return { html: marked.parse(withRefs), sources };
}

// Plain prose of a Markdown body: no markers, link targets, tables syntax or headings.
export function plainText(body, { keepHeadings = false } = {}) {
  return body
    .replace(FACT_TOKEN, '')
    .replace(/^\s*#{1,6} .*$/gm, keepHeadings ? '$&' : '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^\s*\|?\s*:?-{3,}.*$/gm, '')
    .replace(/[|*_>`#]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Split a Markdown body into its H2 sections.
export function h2Sections(body) {
  const parts = body.split(/^## /m).slice(1);
  return parts.map((p) => {
    const nl = p.indexOf('\n');
    return { heading: p.slice(0, nl).trim(), body: p.slice(nl + 1) };
  });
}

export const isFaqHeading = (h) => /frequently asked|faq/i.test(h);

export function today() {
  return new Date().toISOString().slice(0, 10);
}

export function escapeHtml(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
