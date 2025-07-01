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
    const cleanedValue = checkboxLocator.trim();
    // Locate the row that contains the Name "Test-SNPJ2890"
    const rowLocator = page.locator('div[role="row"]', {
        has: page.locator(`input[aria-label="Name"][value="${cleanedValue}"]`)
    });

    // Click the checkbox within that row
    await rowLocator.locator('div[role="checkbox"]').first().click();
}

// export async function checkMatchingRow(page: Page, checkboxLocator: string) {
//     const cleanedValue = checkboxLocator.trim();
//     const rowLocator = page.locator(`xpath=//div[@role="row"][.//input[@aria-label="Name" and @value="${cleanedValue}"]]`);
//     await rowLocator.locator('div[role="checkbox"]').first().click();
// }


export async function checkRowWithMachedText(
    page: Page,
    expectedValue: string,
    fieldName: string,
    rowIndex: number = 0
) {
    const cleanValue = expectedValue.trim(); // remove any hidden \r or \n

    const rowLocator = page.locator('div[role="row"]').filter({
        has: page.locator(`input[aria-label="${fieldName}"][value="${cleanValue}"]`)
    });

    const count = await rowLocator.count();
    if (count <= rowIndex) {
        throw new Error(`Expected at least ${rowIndex + 1} matching rows, but found ${count}`);
    }

    const targetRow = rowLocator.nth(rowIndex);
    const checkbox = targetRow.locator('div[role="checkbox"]');

    await checkbox.click();
}

