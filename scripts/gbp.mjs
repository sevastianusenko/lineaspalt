// Reads the public Google Maps listing (rendered) and prints what the profile shows.
import { chromium } from 'file:///C:/Users/admin/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
const cid = process.argv[2] || '10068187502945296993';
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: 'en-US' })).newPage();
await page.goto(`https://www.google.com/maps?cid=${cid}&hl=en`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(4000);
// consent screen (EU style) if any
const consent = page.locator('button:has-text("Accept all"), button:has-text("Reject all")');
if (await consent.count()) { await consent.first().click(); await page.waitForTimeout(3000); }
await page.screenshot({ path: '../_old/shots/gbp.png' });
const data = await page.evaluate(() => {
  const h1 = document.querySelector('h1')?.innerText || '';
  const txt = document.body.innerText;
  const rating = txt.match(/(\d\.\d)\s*\(?\s*(\d+)\s*(reviews?|\))/);
  const btn = (label) => [...document.querySelectorAll('button, a')].find((b) => (b.getAttribute('aria-label') || '').startsWith(label))?.getAttribute('aria-label');
  return {
    h1,
    url: location.href,
    rating: rating ? rating[0] : null,
    address: btn('Address:'),
    phone: btn('Phone:'),
    website: btn('Website:'),
    hours: btn('Hours') || null,
    plus: btn('Plus code:'),
    category: document.querySelector('button[jsaction*="category"]')?.innerText || null,
  };
});
console.log(JSON.stringify(data, null, 1));
// Try to read the hours table if present
const hours = await page.evaluate(() => [...document.querySelectorAll('table tr')].map((r) => r.innerText.replace(/\s+/g, ' ').trim()).filter(Boolean).slice(0, 10));
console.log('hours rows:', hours);
const placeId = await page.evaluate(() => (document.documentElement.outerHTML.match(/ChIJ[A-Za-z0-9_-]{20,}/) || [])[0] || null);
console.log('placeId:', placeId);
await browser.close();
