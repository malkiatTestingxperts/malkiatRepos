import { Page, Locator } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export async function waitForWithRetry(
  locator: Locator,
  page: Page,
  retries = 3,
  timeout = 5000,
  delayBetweenRetries = 1000,
  label = 'element',
  elemenState = String
): Promise<void> {
  const screenshotDir = path.resolve('screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`[${label}] Attempt ${attempt}/${retries}: waiting for visible (timeout ${timeout}ms)...`);
      await locator.waitFor({ state: 'visible', timeout });
      console.log(`[${label}] Element became visible.`);
      return;
    } catch (error) {
      const screenshotPath = path.join(screenshotDir, `${label}-retry-${attempt}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.warn(`[${label}] Retry ${attempt} failed. Screenshot saved: ${screenshotPath}`);

      if (attempt === retries) {
        throw new Error(`[${label}] Element not visible after ${retries} retries.\nLast error: ${error}`);
      }
      await new Promise((res) => setTimeout(res, delayBetweenRetries));
    }
  }
}
