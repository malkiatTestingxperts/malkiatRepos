import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: false, channel: 'chrome' }); // Launch Chrome
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://fgh-test.sandbox.operations.dynamics.com/?cmp=010&mi=BankAccountTableListPage');

  console.log('Manually complete the login and MFA.');
  await page.waitForTimeout(60000); // Give yourself 60 seconds to log in manually

  await context.storageState({ path: 'auth2.json' });
  console.log(' Auth state saved to auth.json');

  await browser.close();
})();
