import fs from 'fs';
import path from 'path';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const posts = JSON.parse(fs.readFileSync('../_old/posts.json', 'utf8'));
const cats = Object.fromEntries(JSON.parse(fs.readFileSync('../_old/cats.json', 'utf8')).map((c) => [c.id, c.slug]));
const manifest = JSON.parse(fs.readFileSync('src/content/images.json', 'utf8'));

// original file base name -> new slug (parsed from process-images.mjs)
const imgMap = {};
for (const m of fs.readFileSync('scripts/process-images.mjs', 'utf8').matchAll(/\('([^']+\.(?:jpe?g|JPE?G|JPG|png))','([^']+)'/g)) {
  imgMap[m[1].replace(/\.\w+$/, '').toLowerCase()] = m[2];
}

const decode = (s) =>
  s
    .replace(/&#8217;|&#039;|&rsquo;/g, "'")
    .replace(/&#8216;|&lsquo;/g, "'")
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#8212;|&mdash;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#038;/g, '&')
    .replace(/&#8230;/g, '...');

const noEm = (s) =>
  s
    .replace(/\s*—\s*/g, ', ')
    .replace(/\s+–\s+/g, ', ')
    .replace(/, ,/g, ',')
    .replace(/:, /g, ': ')
    .replace(/\?, /g, '? ')
    .replace(/\., /g, '. ');

const stripEmoji = (s) => s.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}️]/gu, '').replace(/^\s+/, '').trim();

const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced' });
td.use(gfm);
td.remove(['style', 'script']);
td.addRule('iframe', {
  filter: 'iframe',
  replacement: (_c, node) => {
    const src = node.getAttribute('src') || '';
    const m = src.match(/embed\/([\w-]+)/);
    const title = (node.getAttribute('title') || 'Video').replace(/"/g, "'");
    return m ? `\n\n::youtube[${m[1]}|${title}]\n\n` : '';
  },
});
td.addRule('img', {
  filter: 'img',
  replacement: (_c, node) => {
    let src = node.getAttribute('src') || '';
    const base = path.basename(src).replace(/-\d+x\d+(\.\w+)$/, '$1').replace(/\.\w+$/, '').toLowerCase();
    const slug = imgMap[base];
    if (!slug) return '';
    const alt = (manifest[slug]?.alt || '').replace(/[\[\]]/g, '');
    return `![${alt}](/img/${slug}.webp)`;
  },
});
td.addRule('figure', {
  filter: 'figure',
  replacement: (content) => {
    const c = content.trim();
    return c.startsWith('![') || c.includes('::youtube') ? `\n\n${c}\n\n` : '';
  },
});
td.addRule('figcaption', { filter: 'figcaption', replacement: (c) => (c.trim() ? `\n*${c.trim()}*\n` : '') });
td.addRule('hr', { filter: 'hr', replacement: () => '\n\n' });

const fixLink = (u) => {
  u = u.replace(/^https?:\/\/(www\.)?linesasphalt\.com/, '');
  if (u === '/pothole-repair-vs-repaving/') u = '/pothole-repair-vs-full-repaving-which-one-do-you-actually-need/';
  return u;
};

const outDir = 'src/content/posts';
fs.mkdirSync(outDir, { recursive: true });

const catName = {
  'sealcoating-benefits': 'Sealcoating',
  'crack-filling': 'Crack Filling',
  'line-striping': 'Line Striping',
  'pothole-repair': 'Pothole Repair',
  'commercial-services': 'Commercial',
  'business-safety': 'ADA and Safety',
  'parking-lot-maintenance': 'Parking Lot Maintenance',
  'asphalt-tips': 'Asphalt Tips',
};
const catRank = ['sealcoating-benefits', 'crack-filling', 'line-striping', 'pothole-repair', 'business-safety', 'parking-lot-maintenance', 'commercial-services', 'asphalt-tips'];

for (const p of posts) {
  let html = p.content.rendered.replace(/<style[\s\S]*?<\/style>/g, '');
  let md = td.turndown(html);
  md = md.replace(/\]\((https?:\/\/(?:www\.)?linesasphalt\.com[^)\s]*|\/pothole-repair-vs-repaving\/)\)/g, (_m, u) => `](${fixLink(u)})`);
  md = decode(md);
  md = noEm(md).replace(/\n{3,}/g, '\n\n').trim();
  // drop a leading H1 if present (page renders its own)
  md = md.replace(/^# .*\n+/, '');
  // collapse runs of 3+ consecutive images into a gallery marker
  md = md.replace(/((?:!\[[^\]]*\]\(\/img\/[^)]+\.webp\)\n\n){3,})/g, (run) => {
    const slugs = [...run.matchAll(/\/img\/([^)]+)\.webp/g)].map((m) => m[1]).slice(0, 6);
    return `::gallery[${slugs.join(',')}]\n\n`;
  });
  const title = noEm(stripEmoji(decode(p.title.rendered)));
  // seo title + description from the live page
  let seoTitle = title, desc = '';
  try {
    const page = await (await fetch(`https://linesasphalt.com/${p.slug}/`)).text();
    const t = page.match(/<title>([^<]*)/)?.[1];
    const d = page.match(/<meta name="description" content="([^"]*)/)?.[1];
    if (t) seoTitle = noEm(stripEmoji(decode(t))).replace(/\s*[|-]\s*Lancaster Lines & Asphalt\s*$/i, '');
    if (d) desc = noEm(decode(d));
  } catch {}
  if (!desc) {
    const first = md.split('\n').find((l) => l.length > 80 && !l.startsWith('!') && !l.startsWith('#') && !l.startsWith('::')) || '';
    desc = first.replace(/[*_\[\]]/g, '').slice(0, 155);
  }
  const catSlugs = p.categories.map((id) => cats[id]).filter(Boolean);
  const cat = catRank.find((c) => catSlugs.includes(c)) || 'asphalt-tips';
  const firstImg = md.match(/!\[[^\]]*\]\(\/img\/([^)]+)\.webp\)/)?.[1] || '';
  const words = md.replace(/!\[[^\]]*\]\([^)]*\)/g, '').split(/\s+/).length;
  const fm = {
    title, seoTitle, description: desc, date: p.date.slice(0, 10), modified: p.modified.slice(0, 10),
    category: cat, categoryName: catName[cat], image: firstImg, words,
  };
  const front = Object.entries(fm).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join('\n');
  fs.writeFileSync(path.join(outDir, `${p.slug}.md`), `---\n${front}\n---\n\n${md}\n`);
  console.log(p.slug.padEnd(95), words, fm.image || '(no img)', (md.match(/—/g) || []).length);
}
