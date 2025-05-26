import { Page } from '@playwright/test';

/**
 * Selects a quick filter field (like Preparer, Name, Status) from the dropdown
 * @param page page instance
 * @param filterValue The value to type and filter with (e.g. "Test-SNPJ2890")
 * @param fieldName The field to select (e.g. "Preparer", "Name", etc.)
 */
export async function selectQuickFilter(page: Page, filterValue: string, fieldName: string) {
    // Type in the filter input
    const filterInput = page.locator('input[aria-label="Filter"]'); // Adjust if your selector differs
    await filterInput.fill(filterValue);

    // Wait for flyout options to appear
    const optionsList = page.locator('ul[role="listbox"] > li');
    await optionsList.first().waitFor();

    // Click on the matching field name (e.g., Preparer)
    const targetOption = optionsList.filter({ hasText: fieldName });
    if (await targetOption.count() === 0) {
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
