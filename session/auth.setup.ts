import { chromium } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();
const baseURL = process.env.BASE_URL;
if (!baseURL) {
  throw new Error('BASE_URL environment variable is not set');
}
(async () => {
  const browser = await chromium.launch({ headless: false, channel: 'chrome' });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(baseURL, { waitUntil: 'domcontentloaded' });

  console.log('Manually complete the login and MFA.');
  await page.waitForTimeout(90000);

  await context.storageState({ path: 'auth.json' });
  console.log(' Auth state saved to auth.json');

  await browser.close();
})();
