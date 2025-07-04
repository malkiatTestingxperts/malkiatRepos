import { test, expect, Page } from '@playwright/test';
import { NavigationPage } from '../utils/NavigationPage';
import { selectQuickFilter, checkMatchingRow } from '../utils/Filter';
import { clickMenuItem } from '../utils/MainMenu';
import { expandMenuIfCollapsed } from '../utils/MainMenu';
import { DateHelper } from '../utils/DateHelper';
import { PurchaseRequisitionPage } from '../pages/PurchaseRequisitionPage';
import { SupplierVendorPage } from '../pages/SupplierVendorPage';
import { FixedAssetsPage } from '../pages/FixedAssetsPage';
import { ReadPdf, DeletePdf } from '../utils/FileReader';
import { PageMenus } from '../utils/PageMenus';
import { setEnvVariable, readEnvVariable } from '../utils/EnvHelper';
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

  //*********************************Create Supplier***************************** */
  test('Create New Supplier/Vendor', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const supplierVendorPage = new SupplierVendorPage(page);
    const fixedAssetsPage = new FixedAssetsPage(page);
    const supplierAddress = readEnvVariable('SUPPLIER_ADDRESS');
    if (!supplierAddress) {
      throw new Error('SUPPLIER_ADDRESS environment variable is not set');
    }

    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'Purchase ledger', false);
    await page.waitForTimeout(5000);
    await expandMenuIfCollapsed(page, 'Suppliers', 'All suppliers');
    await navigationPage.waitUntilProcessingMessageDisappears();
    await navigationPage.clickNewButton();
    const supplierNumber = Math.floor(100000 + Math.random() * 900000);
    console.log(`Random 4-digit number: ${supplierNumber}`);

    await supplierVendorPage.enterSupplierAccountNumber(supplierNumber.toString());
    const stringRandom = Math.random().toString(36).substring(2, 6).toUpperCase();
    const supplierName = `Test-${stringRandom}${supplierNumber}`;
    console.log(`Supplier Name is: ${supplierName}`);
    setEnvVariable('SUPPLIER_NUMBER', supplierName);
    await supplierVendorPage.enterSupplierAccountName(supplierName);
    await supplierVendorPage.enterAndSelectGroup('DS');
    await supplierVendorPage.clickButtonAddSupplierAddress();
    await navigationPage.waitUntilProcessingMessageDisappears();
    await supplierVendorPage.enterDescriptionSupplierAddress("Test Address:" + supplierName);
    const zipCode = generateRandomPostcode();
    await supplierVendorPage.enterzipCodeSupplier(zipCode);
    await supplierVendorPage.enterStreetSupplier(supplierAddress);
    await navigationPage.clickOkButton();
    await navigationPage.waitUntilProcessingMessageDisappears();
    await navigationPage.clickSaveButton();
    await supplierVendorPage.clickSupplierBackButton();
    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'Purchase ledger', false);
    await page.waitForTimeout(5000);
    await expandMenuIfCollapsed(page, 'Suppliers', 'All suppliers');
    await navigationPage.waitUntilProcessingMessageDisappears();
    const supplierNameFromEnv = readEnvVariable('SUPPLIER_NUMBER');
    if (!supplierNameFromEnv) {
      throw new Error('SUPPLIER_NUMBER environment variable is not set');
    }
    await selectQuickFilter(page, supplierNameFromEnv, 'Name');

    await checkMatchingRow(page, supplierNameFromEnv);
    await supplierVendorPage.clickOpenSupplierAfterSearch();
    await navigationPage.waitUntilProcessingMessageDisappears();
    await supplierVendorPage.AddContactInfoInSupplier(0, 'Phone', supplierNameFromEnv, "Details: " + "Phone");
    await supplierVendorPage.checkPrimary(0);
    await page.waitForTimeout(5000);
    await supplierVendorPage.AddContactInfoInSupplier(0, 'Email address', supplierNameFromEnv, "Details: " + supplierNameFromEnv + "@test.com");
    await supplierVendorPage.checkPrimary(0);
    await supplierVendorPage.clickPaymentOption();
    await supplierVendorPage.enterPaymentMode("ET-DOM_B");
    await supplierVendorPage.enterPaymentTerm("30 Days");
    await supplierVendorPage.selectSettlementDiscount();
    await supplierVendorPage.enterPurposeText("Purpose: " + supplierNameFromEnv);

    await supplierVendorPage.clickFinancDimOption();
    await fixedAssetsPage.enterBusinessUnit('freemans');
    await fixedAssetsPage.enterCostCenter('GFA');
    await fixedAssetsPage.enterPublications('NA');
    await navigationPage.clickSaveButton();

    await supplierVendorPage.clickBankAccountsOption();
    await navigationPage.clickNewButton();
    await supplierVendorPage.enterBankAccountsType("Pay");
    await supplierVendorPage.enterbankAccountsName(supplierNameFromEnv);
    await supplierVendorPage.enterRoutingNumber("207775");
    await supplierVendorPage.enterBankAccountNumber("50422827");
    await navigationPage.clickSaveButton();

  });
});
























//****************Helper functions*********************************************/
function generateRandomPostcode(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';

  const part1 =
    letters.charAt(Math.floor(Math.random() * letters.length)) +
    letters.charAt(Math.floor(Math.random() * letters.length)) +
    digits.charAt(Math.floor(Math.random() * digits.length)) +
    letters.charAt(Math.floor(Math.random() * letters.length));

  const part2 =
    digits.charAt(Math.floor(Math.random() * digits.length)) +
    letters.charAt(Math.floor(Math.random() * letters.length)) +
    letters.charAt(Math.floor(Math.random() * letters.length));

  return `${part1} ${part2}`;
}

console.log("The random zip code is: " + generateRandomPostcode()); 