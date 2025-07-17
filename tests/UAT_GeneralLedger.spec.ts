import { test, expect, Page } from '@playwright/test';
import { NavigationPage } from '../utils/NavigationPage';
import { clickMenuItem } from '../utils/MainMenu';
import { expandMenuIfCollapsed } from '../utils/MainMenu';
import { DateHelper } from '../utils/DateHelper';
import { PurchaseRequisitionPage } from '../pages/PurchaseRequisitionPage';
import { SupplierVendorPage } from '../pages/SupplierVendorPage';
import { CustomerPage } from '../pages/CustomerPage';
import { FixedAssetsPage } from '../pages/FixedAssetsPage';
import { GeneralLedgerPage } from '../pages/GeneralLedgerPage';
import { setEnvVariable, readEnvVariable } from '../utils/EnvHelper';
import { generateRandomPostcode } from '../utils/CommonUtils';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const baseURL = process.env.BASE_URL;
if (!baseURL) {
  throw new Error('BASE_URL environment variable is not set');
}
test.describe('UAT General Ledger', () => {
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

  // //*********************************Chart Accounts***************************** */
  // test('Create Chart Accounts', async ({ page }) => {
  //   const navigationPage = new NavigationPage(page);
  //   const customerPage = new CustomerPage(page);
  //   const fixedAssetsPage = new FixedAssetsPage(page);
  //   const generalLedgerPage = new GeneralLedgerPage(page);
  //   const customerAddress = readEnvVariable('CUSTOMER_ADDRESS');
  //   if (!customerAddress) {
  //     throw new Error('SUPPLIER_ADDRESS environment variable is not set');
  //   }

  //   navigationPage.openModulesMenu();
  //   await clickMenuItem(page, 'General ledger', false);
  //   await page.waitForTimeout(5000);
  //   await expandMenuIfCollapsed(page, 'Accounts', 'Main accounts');
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   await navigationPage.clickNewButton();
  //   const mainAccount = Math.floor(100000 + Math.random() * 900000);
  //   console.log(`Main Account is: ${mainAccount}`);
  //   await generalLedgerPage.enterMainAccount(mainAccount.toString());
  //   const mainAccountName = Math.floor(100000 + Math.random() * 900000);
  //   console.log(`Main Account is: Test_${mainAccount}`);
  //   await generalLedgerPage.enterMainAccountName("Test_" + mainAccountName.toString())
  //   await generalLedgerPage.enterAndSelectLedgerTypeGroup("Balance sheet");
  //   await generalLedgerPage.enterAndSelectStarCode("10305");

  //   await navigationPage.clickSaveButton();

  // });

  //*********************************General Journals***************************** */
  test('Create General Journals', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const customerPage = new CustomerPage(page);
    const fixedAssetsPage = new FixedAssetsPage(page);
    const supplierVendorPage = new SupplierVendorPage(page);
    const requisitionPage = new PurchaseRequisitionPage(page);
    const generalLedgerPage = new GeneralLedgerPage(page);
    const customerAddress = readEnvVariable('CUSTOMER_ADDRESS');
    if (!customerAddress) {
      throw new Error('SUPPLIER_ADDRESS environment variable is not set');
    }

    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'General ledger', false);
    await page.waitForTimeout(5000);
    await expandMenuIfCollapsed(page, 'Journal entries', 'General journals');
    await navigationPage.waitUntilProcessingMessageDisappears();
    await navigationPage.clickNewButton();
    const mainAccount = Math.floor(100000 + Math.random() * 900000);
    console.log(`Main Account is: ${mainAccount}`);
    await fixedAssetsPage.selectFixedAssetJournalName('ADJ');
    const random4Digit3 = Math.floor(1000 + Math.random() * 9000);
    console.log(`Random 4-digit number: ${random4Digit3}`);
    await fixedAssetsPage.enterJournalFixedAssetDescription("Test-" + random4Digit3);
    await fixedAssetsPage.clickFixedAssetJournalLine();
    await navigationPage.waitUntilProcessingMessageDisappears();
    await generalLedgerPage.enterAndSelectAccountNumber(0, "615001-HDQ-FCF-NA");
    await fixedAssetsPage.enterDebitAmountJournal('10.00');
    await generalLedgerPage.clickAddNewLine();
    await page.waitForTimeout(6000);
    await navigationPage.waitUntilProcessingMessageDisappears();
    await generalLedgerPage.enterAndSelectAccountNumber(0, "640001-FSC-GGA-NA");
    await generalLedgerPage.enterCreditAmountJournal("10.00");
    await navigationPage.clickSaveButtonSecond();
    await page.waitForTimeout(6000);
    await fixedAssetsPage.clickPostButton();
    const message = await requisitionPage.checkMessageBar();
    const cleanedw = message.replace(/\s+/g, ' ').trim();
    expect(cleanedw).toContain("Operation completed Number of vouchers posted to the journal: 1");
    await fixedAssetsPage.clickBackButtonUnderMainMenu();
  });

});


