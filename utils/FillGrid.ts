import { Page, expect } from '@playwright/test';
import { waitForWithRetry } from './waitForWithRetry';


/**
 * Dynamically fills a cell in the D365 grid based on column header name and row index.
 * @param page Playwright Page object
 * @param columnName Column header text (e.g., "Capex", "Project ID")
 * @param value Value to input
 * @param rowIndex Zero-based index (defaults to first row)
 */
export async function fillGridCell(page: Page, columnName: string, value: string, rowIndex = 0) {
  // Wait for the table header and locate the column index
  const headers = page.locator('.public_fixedDataTableCell_cellContent');
  const count = await headers.count();

  let colIndex = -1;
  for (let i = 0; i < count; i++) {
    const text = await headers.nth(i).innerText();
    if (text.trim() === columnName.trim()) {
      colIndex = i;
      break;
    }
  }

  if (colIndex === -1) throw new Error(`Column "${columnName}" not found`);

  // Locate the input in the target row and column
  const rowSelector = `.public_fixedDataTableCellGroup_cellGroupWrapper:nth-child(${colIndex + 1})`;
  const row = page.locator(rowSelector).nth(rowIndex);
  const input = row.locator('input');

  // Focus and fill the input
  await input.click({ force: true });
  await input.fill(value);
  await input.press('Tab'); // Ensure value gets committed
}
