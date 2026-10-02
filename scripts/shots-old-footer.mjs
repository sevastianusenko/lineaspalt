import { chromium } from 'file:///C:/Users/admin/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto('https://linesasphalt.com/', { waitUntil: 'networkidle' });
await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
await page.waitForTimeout(1500);
await page.screenshot({ path: '../_old/shots/home-footer.png' });
const info = await page.evaluate(() => {
  const f = document.querySelector('footer');
  const imgs = [...f.querySelectorAll('img')].map((i) => ({ src: i.currentSrc, w: i.naturalWidth, h: i.naturalHeight }));
  return { bg: getComputedStyle(f).backgroundColor, text: f.innerText.slice(0, 1200), imgs };
});
console.log(JSON.stringify(info, null, 1));
// Also: how often does the brand name appear on the old home page?
const count = await page.evaluate(() => (document.body.innerText.match(/Lancaster Lines/g) || []).length);
console.log('brand mentions on old home:', count);
await browser.close();
