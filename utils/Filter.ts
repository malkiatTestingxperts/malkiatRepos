import { Page } from '@playwright/test';
import { waitForWithRetry } from '../utils/waitForWithRetry';
/**
 * Selects a quick filter field (like Preparer, Name, Status) from the dropdown
 * @param page page instance
 * @param filterValue The value to type and filte
 * @param fieldName The field to select (e.g. "Preparer", "Name", etc.)
 */
export async function selectQuickFilter(page: Page, filterValue: string, fieldName: string) {
    const filterInput = page.locator('input[aria-label="Filter"]');
    await waitForWithRetry(filterInput, page, 5, 4000, 2000);

    await filterInput.click(); // ensure focus
    await filterInput.fill(filterValue);
    await filterInput.press('Enter'); // trigger dropdown if needed

    // Wait until list items appear in the DOM
    await page.waitForSelector('ul[role="listbox"] > li', { state: 'attached', timeout: 5000 });

    const optionsList = page.locator('ul[role="listbox"] > li');
    await optionsList.first().waitFor({ state: 'visible', timeout: 5000 });

    const targetOption = optionsList.filter({ hasText: fieldName });
    const count = await targetOption.count();
    if (count === 0) {
        throw new Error(`Field "${fieldName}" not found in the filter dropdown.`);
    }

    await targetOption.first().click();
}


export async function checkMatchingRow(page: Page, checkboxLocator: string) {
    // Locate the row that contains the Name "Test-SNPJ2890"
    const rowLocator = page.locator('div[role="row"]', {
        has: page.locator(`input[aria-label="Name"][value="${checkboxLocator}"]`)
    });

    // Click the checkbox within that row
    await rowLocator.locator('div[role="checkbox"]').first().click();
}
