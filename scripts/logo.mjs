import sharp from 'sharp';
const src = '../source-media/May 8, 2025, 08_08_03 PM.png';
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const out = Buffer.alloc(info.width * info.height * 4);
let minX = 1e9, minY = 1e9, maxX = 0, maxY = 0;
for (let i = 0; i < info.width * info.height; i++) {
  const r = data[i * 4];
  const a = Math.max(0, Math.min(255, Math.round(((r - 70) * 255) / (235 - 70))));
  out[i * 4] = 255; out[i * 4 + 1] = 180; out[i * 4 + 2] = 0; out[i * 4 + 3] = a;
  if (a > 128) {
    const x = i % info.width, y = (i / info.width) | 0;
    minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
  }
}
console.log(minX, minY, maxX, maxY, 'sample', data[(500 * info.width + 300) * 4], data[(500 * info.width + 300) * 4 + 1], data[(500 * info.width + 300) * 4 + 2]);
const pad = 8;
const raw = { raw: { width: info.width, height: info.height, channels: 4 } };
await sharp(out, raw).extract({ left: minX - pad, top: minY - pad, width: maxX - minX + 2 * pad, height: maxY - minY + 2 * pad }).png().toFile('public/img/logo-mark.png');
await sharp('public/img/logo-mark.png').resize(512).webp({ quality: 90 }).toFile('public/img/logo-mark.webp');
await sharp('public/img/logo-mark.png').resize(160, 160, { fit: 'contain', background: '#0d0e10' }).extend({ top: 16, bottom: 16, left: 16, right: 16, background: '#0d0e10' }).flatten({ background: '#0d0e10' }).png().toFile('src/app/apple-icon.png');
await sharp('public/img/logo-mark.png').resize(160, 160, { fit: 'contain', background: '#0d0e10' }).extend({ top: 16, bottom: 16, left: 16, right: 16, background: '#0d0e10' }).flatten({ background: '#0d0e10' }).png().toFile('src/app/icon.png');
