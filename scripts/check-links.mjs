// Crawls every URL in the sitemap on a running server, then checks every internal link, image and canonical.
const base = process.env.BASE || 'http://localhost:3100';
const sm = await (await fetch(base + '/sitemap.xml')).text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace('https://linesasphalt.com', base));
const seen = new Map();
const problems = [];
const check = async (u, from) => {
  if (seen.has(u)) return seen.get(u);
  const r = await fetch(u, { redirect: 'manual' });
  seen.set(u, r.status);
  if (r.status >= 400) problems.push(`${r.status} ${u} (from ${from})`);
  if (r.status >= 300 && r.status < 400) problems.push(`${r.status} redirect ${u} -> ${r.headers.get('location')} (from ${from})`);
  return r.status;
};
let pages = 0;
const meta = [];
for (const u of urls) {
  const r = await fetch(u);
  if (r.status !== 200) { problems.push(`${r.status} PAGE ${u}`); continue; }
  const html = await r.text();
  pages++;
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
  const h1 = (html.match(/<h1[^>]*>/g) || []).length;
  meta.push({ u, tl: title.length, dl: desc.length, canon, h1 });
  const hrefs = new Set([...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]));
  const imgs = new Set([...html.matchAll(/(?:src|srcSet)="(\/[^"]+)"/g)].map((m) => m[1]));
  for (const h of hrefs) if (!h.startsWith('/_next') && !h.includes('.')) await check(base + h, u);
  for (const i of imgs) if (!i.startsWith('/_next')) await check(base + i, u);
}
console.log('pages', pages, 'unique urls checked', seen.size);
console.log('problems', problems.length); problems.slice(0, 40).forEach((p) => console.log(' ', p));
const bad = meta.filter((m) => m.tl > 68 || m.tl < 20 || m.dl > 165 || m.dl < 70 || m.h1 !== 1 || !m.canon);
console.log('meta issues', bad.length); bad.slice(0, 40).forEach((m) => console.log(' ', JSON.stringify(m)));
