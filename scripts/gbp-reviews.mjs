// Reads public Google reviews from the Maps listing.
import { chromium } from 'file:///C:/Users/admin/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
import fs from 'fs';
const cid = '10068187502945296993';
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1280, height: 1000 }, locale: 'en-US' })).newPage();
await page.goto(`https://www.google.com/maps?cid=${cid}&hl=en`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(4000);

// Open the reviews tab
const tab = page.locator('button[role="tab"]:has-text("Reviews"), button[aria-label*="reviews" i], span:has-text("reviews")').first();
console.log('reviews control found:', await tab.count());
if (await tab.count()) await tab.click({ force: true }).catch((e) => console.log('click err', e.message));
await page.waitForTimeout(3000);

// Scroll the side panel to load everything
for (let i = 0; i < 8; i++) {
  await page.evaluate(() => {
    const panel = [...document.querySelectorAll('div[role="main"] div')].find((d) => d.scrollHeight > d.clientHeight + 200 && getComputedStyle(d).overflowY !== 'visible');
    if (panel) panel.scrollTop = panel.scrollHeight;
  });
  await page.waitForTimeout(1200);
}
// Expand "More" on long reviews
for (const b of await page.locator('button[aria-label="See more"], button:has-text("More")').all()) await b.click({ force: true }).catch(() => {});
await page.waitForTimeout(800);
await page.screenshot({ path: '../_old/shots/gbp-reviews.png', fullPage: false });

const reviews = await page.evaluate(() => {
  const out = [];
  for (const el of document.querySelectorAll('[data-review-id]')) {
    const name = el.querySelector('[class*="d4r55"], a[href*="/maps/contrib/"] div, button[aria-label] div')?.innerText?.trim() || el.querySelector('a[href*="/maps/contrib/"]')?.getAttribute('aria-label') || '';
    const stars = el.querySelector('[role="img"][aria-label*="star"]')?.getAttribute('aria-label') || '';
    const date = [...el.querySelectorAll('span')].map((s) => s.innerText.trim()).find((t) => /ago$/.test(t)) || '';
    const text = el.querySelector('[class*="wiI7pd"], span[jsan*="wiI7pd"]')?.innerText?.trim() || '';
    if (name || text) out.push({ id: el.getAttribute('data-review-id'), name, stars, date, text });
  }
  // de-dupe by id
  const seen = new Set();
  return out.filter((r) => (seen.has(r.id) ? false : (seen.add(r.id), true)));
});
const summary = await page.evaluate(() => (document.body.innerText.match(/(\d\.\d)\s*\n?\s*(\d+)\s*reviews?/) || []).slice(1));
console.log('summary:', summary);
console.log('count:', reviews.length);
for (const r of reviews) console.log(`- ${r.name} | ${r.stars} | ${r.date}\n  ${r.text.replace(/\n/g, ' ').slice(0, 300)}`);
fs.writeFileSync('../_old/gbp-reviews.json', JSON.stringify(reviews, null, 1));
await browser.close();
