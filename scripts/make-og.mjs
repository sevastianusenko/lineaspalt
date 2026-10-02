import sharp from 'sharp'; import fs from 'fs';
const m = JSON.parse(fs.readFileSync('src/content/images.json', 'utf8'));
fs.mkdirSync('public/og', { recursive: true });
for (const slug of Object.keys(m)) {
  await sharp(`public/img/${slug}.webp`).resize(1200, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 74, mozjpeg: true }).toFile(`public/og/${slug}.jpg`);
}
console.log('og images', Object.keys(m).length);
