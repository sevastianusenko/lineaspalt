import { chromium } from 'file:///C:/Users/admin/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
const base = process.env.BASE || 'http://localhost:3100';
const browser = await chromium.launch();

// 1. mobile menu
const m = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
const mp = await m.newPage();
await mp.goto(base + '/', { waitUntil: 'networkidle' });
await mp.click('button[aria-label="Open menu"]');
await mp.waitForTimeout(700);
await mp.screenshot({ path: '../_shots/menu-mobile.png' });
await mp.click('#mobile-nav a[href="/pricing/"]');
await mp.waitForURL('**/pricing/');
await mp.waitForTimeout(400);
console.log('menu closed after nav:', (await mp.locator('#mobile-nav').count()) === 0);

// 2. quote form
const d = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p = await d.newPage();
await p.goto(base + '/contact/', { waitUntil: 'networkidle' });
await p.fill('#lf-name', 'Test Customer');
await p.fill('#lf-phone', '717-555-0123');
await p.fill('#lf-town', 'Lititz, PA');
await p.selectOption('#lf-service', 'Driveway sealcoating');
await p.click('button[type=submit]');
await p.waitForSelector('text=Request received');
console.log('form: success state shown');

// 3. calc
await p.goto(base + '/pricing/', { waitUntil: 'networkidle' });
await p.click('button[role=tab]:has-text("Re-striping")');
await p.fill('#pc-n', '40');
console.log('calc re-stripe 40 stalls ->', (await p.locator('[aria-live=polite] p').nth(1).innerText()));

// 4. gallery lightbox
await p.goto(base + '/gallery/', { waitUntil: 'networkidle' });
await p.click('ul li button >> nth=0');
await p.waitForTimeout(400);
console.log('lightbox open:', await p.locator('dialog[open]').count());
await p.keyboard.press('Escape');
await browser.close();
