import { chromium } from 'file:///C:/Users/admin/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
import fs from 'fs';
const out = '../_old/shots';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const pages = ['/', '/services/', '/sealcoating-lancaster-pa/', '/about/'];
for (const p of pages) {
  await page.goto('https://linesasphalt.com' + p, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const name = p === '/' ? 'home' : p.replace(/\//g, '');
  let i = 0;
  for (let y = 0; y < total && i < 8; y += 820, i++) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${out}/${name}-${String(i).padStart(2, '0')}.png` });
  }
  console.log(p, total, i);
}
await browser.close();
