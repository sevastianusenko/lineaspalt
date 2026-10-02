import { chromium } from 'file:///C:/Users/admin/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 }, locale: 'en-US', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36' });
const page = await ctx.newPage();
const url = 'https://www.google.com/search?q=Lancaster+Lines+%26+Asphalt+Strasburg+PA&hl=en&gl=us&ludocid=10068187502945296993#lrd=0x4391ccebe38decb7:0x8bb96330bd14e261,1';
await page.goto(url, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(5000);
const consent = page.locator('button:has-text("Accept all"), button:has-text("I agree")');
if (await consent.count()) { await consent.first().click(); await page.waitForTimeout(3000); }
await page.screenshot({ path: 'C:/Users/admin/Projects/line-asphalt/_old/shots/gbp-search.png' });
console.log('title:', await page.title());
const txt = await page.evaluate(() => document.body.innerText);
console.log('has captcha:', /unusual traffic|not a robot/i.test(txt));
console.log('review count snippets:', (txt.match(/\d+ Google reviews?|\d\.\d\s*\(\d+\)|\(\d+\)\s*reviews?/g) || []).slice(0, 5));
const items = await page.evaluate(() => [...document.querySelectorAll('[data-review-id], [role="listitem"]')].map((el) => el.innerText.replace(/\s+/g, ' ').trim().slice(0, 400)).filter((t) => t.length > 20).slice(0, 20));
console.log('items:', items.length);
items.forEach((t) => console.log(' *', t));
await browser.close();
