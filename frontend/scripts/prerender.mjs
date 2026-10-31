// Renders every route of the React site to static HTML after `vite build`, so each URL
// ships its own content, title, description, canonical and JSON-LD without needing JavaScript.
// Also writes sitemap.xml, robots.txt and 404.html from the route list in src/site.js.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SSR_DIR = path.join(ROOT, 'dist-ssr');

const ssrEntry = fs.readdirSync(SSR_DIR).find((f) => /^entry-server\.(m?js)$/.test(f));
const { render, ROUTES, NOT_FOUND_ROUTE, headHtml, sitemapXml, robotsTxt } = await import(
  pathToFileURL(path.join(SSR_DIR, ssrEntry)).href
);

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
const HEAD_BLOCK = /<!--head:start-->[\s\S]*?<!--head:end-->/;
if (!HEAD_BLOCK.test(template) || !template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is missing the <!--head:start/end--> or <!--app-html--> markers');
}

function page(route) {
  return template.replace(HEAD_BLOCK, headHtml(route)).replace('<!--app-html-->', render(route.path));
}

for (const route of ROUTES) {
  const file = path.join(DIST, route.path, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page(route));
}
fs.writeFileSync(path.join(DIST, '404.html'), page(NOT_FOUND_ROUTE));
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemapXml());
fs.writeFileSync(path.join(DIST, 'robots.txt'), robotsTxt());
fs.rmSync(SSR_DIR, { recursive: true, force: true });

console.log(`[prerender] ${ROUTES.length} pages + 404.html, sitemap.xml, robots.txt -> dist`);
