// Builds public/icons/*.png from the client's own icon files.
import sharp from 'sharp';
import fs from 'fs';

const SRC = '../source-media';
const OUT = 'public/icons';
fs.mkdirSync(OUT, { recursive: true });
const SIZE = 320;

// Make near-white (or near-black) pixels transparent, keep everything else.
async function keyOut(input, mode) {
  const { data, info } = await input.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const lum = (r + g + b) / 3;
    const sat = Math.max(r, g, b) - Math.min(r, g, b);
    if (mode === 'white' && lum > 225 && sat < 30) data[i + 3] = 0;
    else if (mode === 'white' && lum > 200 && sat < 30) data[i + 3] = Math.round(((225 - lum) / 25) * 255);
    if (mode === 'black') {
      // Yellow on black: alpha from brightness, colour forced to the brand yellow so edges stay smooth.
      const a = Math.min(255, Math.round(Math.max(r, g, b) * 1.15));
      data[i] = 255; data[i + 1] = 205; data[i + 2] = 5; data[i + 3] = a < 24 ? 0 : a;
    }
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
}

async function finish(img, name) {
  const trimmed = await img.png().toBuffer().then((b) => sharp(b).trim({ threshold: 10 }).toBuffer());
  const m = await sharp(trimmed).metadata();
  const side = Math.max(m.width, m.height);
  const pad = Math.round(side * 0.08);
  await sharp(trimmed)
    .extend({ top: pad + Math.round((side - m.height) / 2), bottom: pad + Math.round((side - m.height) / 2), left: pad + Math.round((side - m.width) / 2), right: pad + Math.round((side - m.width) / 2), background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize(SIZE, SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(`${OUT}/${name}.png`);
  console.log('icon', name);
}

// 1. Four outline icons from the hi-res composite (1536x1024, off-white background).
const comp = `${SRC}/ChatGPT Image May 8, 2025, 07_39_25 PM.png`;
const crops = {
  striper: { left: 60, top: 280, width: 310, height: 340 },
  sealing: { left: 410, top: 280, width: 330, height: 340 },
  coating: { left: 770, top: 280, width: 350, height: 340 },
  repair: { left: 1180, top: 280, width: 310, height: 340 },
};
for (const [name, c] of Object.entries(crops)) {
  const img = await keyOut(sharp(comp).extract(c), 'white');
  await finish(img, name);
}

// 2. Yellow silhouettes the client already had (transparent PNGs).
await finish(sharp(`${SRC}/lot.png`), 'lot');
await finish(sharp(`${SRC}/adda.png`), 'fire-lane');
await finish(sharp(`${SRC}/line.png`), 'striper-solid');
await finish(sharp(`${SRC}/lopata.png`), 'shovel-solid');

// 3. Wheelchair only, cropped out of the FIRE LANE icon (left half).
{
  const m = await sharp(`${SRC}/adda.png`).metadata();
  await finish(sharp(`${SRC}/adda.png`).extract({ left: 0, top: 0, width: Math.round(m.width * 0.42), height: m.height }), 'ada');
}

// 4. Crack filler gun: yellow on black, key the black out.
await finish(await keyOut(sharp(`${SRC}/ChatGPT Image May 12, 2025, 04_52_50 PM (2).png`).flatten({ background: '#000' }), 'black'), 'crack');

// 5. Horizontal logo, trimmed.
await sharp(`${SRC}/LOGO LINES.png`).trim({ threshold: 10 }).png().toFile('public/img/logo-horizontal.png');
const lm = await sharp('public/img/logo-horizontal.png').metadata();
console.log('logo', lm.width, lm.height);
