import { chromium } from 'file:///C:/Users/admin/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1280, height: 1000 }, locale: 'en-US' })).newPage();
await page.goto('https://www.google.com/maps?cid=10068187502945296993&hl=en', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(4500);
// scroll the overview panel all the way down and dump its text
for (let i = 0; i < 10; i++) {
  await page.evaluate(() => { const p = document.querySelector('div[role="main"]'); const s = p && [...p.querySelectorAll('div')].find((d) => d.scrollHeight > d.clientHeight + 100); if (s) s.scrollTop = s.scrollHeight; });
  await page.waitForTimeout(900);
}
const txt = await page.evaluate(() => document.querySelector('div[role="main"]')?.innerText || document.body.innerText);
console.log(txt.replace(/\n{2,}/g, '\n').slice(0, 3500));
console.log('--- aria labels mentioning review/star:');
console.log(await page.evaluate(() => [...document.querySelectorAll('[aria-label]')].map((e) => e.getAttribute('aria-label')).filter((a) => /review|star/i.test(a)).slice(0, 20)));
await page.screenshot({ path: '../_old/shots/gbp-bottom.png' });
await browser.close();
