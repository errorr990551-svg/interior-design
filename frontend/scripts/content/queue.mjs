// Queue helper.
//   npm run content:queue                              -> status counts + next batch of 5
//   npm run content:queue -- --set=pune:published      -> change a status (publish date set automatically)
import { loadCities, saveCities, loadCityPage, today } from './lib.mjs';

const STATUSES = ['queued', 'researching', 'drafted', 'qa_failed', 'ready', 'published'];
const cities = loadCities();
const sets = process.argv.filter((a) => a.startsWith('--set=')).map((a) => a.slice(6).split(':'));
for (const [slug, status] of sets) {
  const c = cities.find((x) => x.slug === slug);
  if (!c || !STATUSES.includes(status)) throw new Error(`Bad --set ${slug}:${status}`);
  if (status === 'published' && !loadCityPage(c)) throw new Error(`${slug} has no content file`);
  c.status = status;
  if (status === 'published' && !c.publish_date) c.publish_date = today();
}
if (sets.length) saveCities(cities);

const counts = Object.fromEntries(STATUSES.map((s) => [s, cities.filter((c) => c.status === s).length]));
console.log('Status:', Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(' · '));
const next = cities.filter((c) => ['queued', 'researching'].includes(c.status));
const batch = next.length ? next.filter((c) => c.queue_batch === next[0].queue_batch) : [];
console.log(batch.length ? `Next batch (${batch[0].queue_batch}):` : 'Queue empty.');
for (const c of batch) console.log(`  ${c.city}, ${c.state} — Livspace: ${c.livspace_served}${c.livspace_city_url ? ` (${c.livspace_city_url})` : ''}`);
const unserved = batch.filter((c) => c.livspace_served !== 'yes');
if (unserved.length) console.log('  ! Not confirmed as Livspace service cities — see rule 11 before writing.');
