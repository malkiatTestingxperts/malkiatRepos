import { Page, expect } from '@playwright/test';
import { waitForWithRetry } from './waitForWithRetry';


/**
 * Clicks on a menu item with the specified title.
 * If isSubMenu is true, it will also check if the menu is expanded before clicking.
 * @param {Page} page - The Playwright page object.
 * @param {string} title - The title of the menu item to click.
 * @param {boolean} [isSubMenu=false] - Whether the menu item is a sub-menu.
 */
export async function clickMenuItem(page: Page, title: string, isSubMenu = false) {
  const locator = page.locator(`[aria-label="Navigation menu"] [data-dyn-title="${title}"]`);

  await waitForWithRetry(locator, page, 5, 15000, 2000);

  if (isSubMenu) {
    if (await locator.getAttribute('data-dyn-expanded') === 'false') {
      await expect(locator).toBeVisible();
      await locator.click();
    }
  } else {
    // If it's not a submenu, click directly
    await expect(locator).toBeVisible();
    await locator.click();
  }
}

export async function expandMenuIfCollapsed(page: Page, label: string, labelsubmenu: string) {
  // Parent expandable menu item
  const parentMenu = page.locator(`a.modulesFlyout-LinkGroup[aria-label="${label}"]`);

  await parentMenu.waitFor({ state: 'visible' });

  // Expand if not already
  const isExpanded = await parentMenu.getAttribute('aria-expanded');
  if (isExpanded !== 'true') {
    await parentMenu.click();
    await page.waitForTimeout(500); // allow animation to finish
  }

  // Sub-menu item inside the expanded section
  const subLink = page.locator(`div.modulesFlyout-link[aria-label="${labelsubmenu}"] > a.modulesFlyout-linkText`);
  await subLink.waitFor({ state: 'visible' });
  await subLink.click();
}




