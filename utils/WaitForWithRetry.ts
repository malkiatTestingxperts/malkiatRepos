import { Page, Locator } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export async function waitForWithRetry(
  locator: Locator,
  page: Page,
  retries = 3,
  timeout = 25000,
  delayBetweenRetries = 1000,
  label = 'element',
  elemenState = String
): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`[${label}] Attempt ${attempt}/${retries}: waiting for visible (timeout ${timeout}ms)...`);
      await locator.waitFor({ state: 'visible', timeout });
      console.log(`[${label}] Element became visible.`);
      return;
    } catch (error) {
      console.warn(`[${label}] Retry ${attempt} failed.`);
      if (attempt === retries) {
        throw new Error(`[${label}] Element not visible after ${retries} retries.\nLast error: ${error}`);
      }
      await new Promise((res) => setTimeout(res, delayBetweenRetries));
    }
  }
}

export async function waitForElementToHide(element: Locator, timeout = 12000): Promise<boolean> {
  try {
    await element.waitFor({ state: 'visible', timeout });
    return true;
  } catch (e) {
    return false;
  }
}

export async function waitForInputValue(locator: Locator, page: Page, retries = 5, delay = 300, expectedValue: string): Promise<string> {
  for (let i = 0; i < retries; i++) {
    await locator.click();
    await locator.page().waitForTimeout(delay);
    const value = (await locator.inputValue()).trim();
    if (value === expectedValue)
      console.log("****************" + value);
    return value;
  }
  throw new Error(`Expected input value "${expectedValue}" not found after ${retries} retries.`);
}

