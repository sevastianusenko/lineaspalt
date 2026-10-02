import { chromium } from 'file:///C:/Users/admin/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1280, height: 1000 }, locale: 'en-US' })).newPage();
await page.goto('https://www.google.com/maps?cid=10068187502945296993&hl=en', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(4000);
const toggle = page.locator('img[aria-label*="open hours"], [aria-label*="Show open hours"], [aria-expanded="false"]:has-text("Closes")').first();
console.log('toggle found:', await toggle.count());
if (await toggle.count()) { await toggle.click({ force: true }).catch((e) => console.log('click fail', e.message)); await page.waitForTimeout(1500); }
const rows = await page.evaluate(() => [...document.querySelectorAll('table tr')].map((r) => r.innerText.replace(/\s+/g, ' ').trim()).filter(Boolean));
console.log('hours:', rows);
const aria = await page.evaluate(() => [...document.querySelectorAll('[aria-label*=" to "]')].map((e) => e.getAttribute('aria-label')).filter((a) => /AM|PM|Closed/.test(a)).slice(0, 10));
console.log('aria:', aria);
await browser.close();
