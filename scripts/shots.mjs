import { chromium } from 'file:///C:/Users/admin/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
import fs from 'fs';

const base = process.env.BASE || 'http://localhost:3100';
const pages = (process.argv[2] || '/').split(',');
const mode = process.argv[3] || 'desktop';
const out = '../_shots';
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const vp = mode === 'mobile' ? { width: 390, height: 844 } : { width: 1440, height: 900 };
const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, isMobile: mode === 'mobile' });
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(String(e)));

for (const p of pages) {
  await page.goto(base + p, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  const name = (p === '/' ? 'home' : p.replace(/\//g, '_').replace(/^_|_$/g, '')) + '-' + mode;
  const step = vp.height - 80;
  let i = 0;
  const maxShots = Number(process.env.MAX || 8);
  for (let y = 0; y < total && i < maxShots; y += step, i++) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(1300);
    await page.screenshot({ path: `${out}/${name}-${String(i).padStart(2, '0')}.png` });
  }
  console.log(p, 'height', total, 'shots', i, 'hOverflow', overflow);
}
console.log('console errors:', errors.length ? errors.slice(0, 8) : 'none');
await browser.close();
