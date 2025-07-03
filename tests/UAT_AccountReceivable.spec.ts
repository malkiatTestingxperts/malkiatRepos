// PurchaseRequisitionTest.spec.ts
import { test, expect, Page } from '@playwright/test';
import { NavigationPage } from '../utils/NavigationPage';
import { selectQuickFilter, checkRowWithMachedText } from '../utils/Filter';
import { clickMenuItem } from '../utils/MainMenu';
import { expandMenuIfCollapsed } from '../utils/MainMenu';
import { DateHelper } from '../utils/DateHelper';
import { SupplierVendorPage } from '../pages/SupplierVendorPage';
import { FixedAssetsPage } from '../pages/FixedAssetsPage';
import { ReadPdf, DeletePdf } from '../utils/FileReader';
import { PageMenus } from '../utils/PageMenus';
import { setEnvVariable, readEnvVariable } from '../utils/envHelper';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const baseURL = process.env.BASE_URL;

if (!baseURL) {
  throw new Error('BASE_URL environment variable is not set');
}
test.describe('UAT Fixed Asset Flow', () => {
  test.beforeEach(async ({ page }) => {

    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
  });

  test.afterEach(async ({ page }, testInfo) => {

    console.log('Running teardown from afterEach');

    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = path.join('screenshots', `${testInfo.title.replace(/\s+/g, '_')}.png`);

      // Take screenshot and save it
      await page.screenshot({ path: screenshotPath, fullPage: true });

      // Attach to HTML report
      await testInfo.attach('Failure Screenshot', {
        path: screenshotPath,
        contentType: 'image/png',
      });

      console.log(`Screenshot attached to report at ${screenshotPath}`);
    }
    await page.close();
  });

  test('Create New Supplier/Vendor', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const supplierVendorPage = new SupplierVendorPage(page);
    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'Purchase ledger', false);
    await page.waitForTimeout(5000);
    await expandMenuIfCollapsed(page, 'Suppliers', 'All suppliers');
    await navigationPage.waitUntilProcessingMessageDisappears();
    await navigationPage.clickNewButton();
    await supplierVendorPage.enterAndSelectNewSupplierAccount();

  });

});



