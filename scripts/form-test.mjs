// Checks the quote form payload without sending a real email: the Web3Forms request is intercepted.
import { chromium } from 'file:///C:/Users/admin/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
const base = process.env.BASE || 'http://localhost:3100';
const browser = await chromium.launch();
const page = await (await browser.newContext()).newPage();
let sent = null;
await page.route('https://api.web3forms.com/submit', async (route) => {
  sent = route.request().postDataBuffer()?.toString('latin1') || '';
  await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true, message: 'Email sent successfully!' }) });
});
await page.goto(base + '/contact/', { waitUntil: 'networkidle' });

// 1. short phone is rejected before any request
await page.fill('#lf-name', 'Test Customer');
await page.fill('#lf-phone', '555');
await page.fill('#lf-town', 'Lititz, PA');
await page.selectOption('#lf-service', 'Driveway sealcoating');
await page.click('button[type=submit]');
await page.waitForTimeout(500);
console.log('short phone blocked:', (await page.locator('p[role=alert]').innerText()).includes('area code'), '| request sent:', sent !== null);

// 2. valid submit
await page.fill('#lf-phone', '717-555-0123');
await page.fill('#lf-msg', 'Long driveway, a few cracks.');
await page.click('button[type=submit]');
await page.waitForSelector('text=Request received', { timeout: 10000 });
const fields = {};
for (const m of sent.matchAll(/name="([^"]+)"\r\n\r\n([^\r]*)/g)) fields[m[1]] = m[2];
console.log('success state shown; fields sent:', JSON.stringify(fields, null, 1));
await browser.close();
