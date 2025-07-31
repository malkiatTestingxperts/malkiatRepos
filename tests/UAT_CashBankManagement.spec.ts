import { test, expect, Page } from '@playwright/test';
import { NavigationPage } from '../utils/NavigationPage';
import { clickMenuItem } from '../utils/MainMenu';
import { expandMenuIfCollapsed } from '../utils/MainMenu';
import { DateHelper } from '../utils/DateHelper';
import { UpdateExcelFile, DeleteFile, GetChequeNumbers } from '../utils/FileReader';
import { PurchaseRequisitionPage } from '../pages/PurchaseRequisitionPage';
import { SupplierVendorPage } from '../pages/SupplierVendorPage';
import { PageMenus } from '../utils/PageMenus';
import { CustomerPage } from '../pages/CustomerPage';
import { FixedAssetsPage } from '../pages/FixedAssetsPage';
import { GeneralLedgerPage } from '../pages/GeneralLedgerPage';
import { CashBankManagement } from '../pages/CashBankManagement';
import { setEnvVariable, readEnvVariable } from '../utils/EnvHelper';
import { generateRandomPostcode } from '../utils/CommonUtils';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const baseURL = process.env.BASE_URL;
if (!baseURL) {
  throw new Error('BASE_URL environment variable is not set');
}
test.describe('UAT Cash and Bank Management', () => {
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
  //   await generalLedgerPage.enterMainAccountName("Test_" + mainAccountName.toString())
  //   setEnvVariable('MAIN_ACCOUNT', mainAccount.toString());
  //   await generalLedgerPage.enterAndSelectLedgerTypeGroup("Balance sheet");
  //   await generalLedgerPage.enterAndSelectStarCode("10305");
  //   await navigationPage.clickSaveButton();
  // });

  // //*********************************Bank statement reconciliation***************************** */
  // test('Bank statement reconciliation', async ({ page }) => {
  //   const navigationPage = new NavigationPage(page);
  //   const customerPage = new CustomerPage(page);
  //   const fixedAssetsPage = new FixedAssetsPage(page);
  //   const supplierVendorPage = new SupplierVendorPage(page);
  //   const cashAndBankPage = new CashBankManagement(page);
  //   const requisitionPage = new PurchaseRequisitionPage(page);
  //   const generalLedgerPage = new GeneralLedgerPage(page);
  //   const mainAccount = readEnvVariable('MAIN_ACCOUNT');
  //   if (!mainAccount) {
  //     throw new Error('MAIN_ACCOUNT environment variable is not set');
  //   }

  //   navigationPage.openModulesMenu();
  //   await clickMenuItem(page, 'Cash and bank management', false);
  //   await page.waitForTimeout(5000);
  //   await cashAndBankPage.expandMenuIfCollapsedCashAndBank('Bank statement reconciliation', 'Bank accounts');
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   await navigationPage.clickNewButton();
  //   const bankAccountName = Math.floor(100000 + Math.random() * 900000);
  //   console.log(`Bank Account Name: ${bankAccountName}`);
  //   await cashAndBankPage.enterBankAccountName(bankAccountName.toString());
  //   const bankAccountNumber = Math.floor(100000 + Math.random() * 900000);
  //   console.log(`Bank Account Number: Test_${bankAccountNumber}`);
  //   await cashAndBankPage.enterBankAccountNumber('01571907');
  //   await cashAndBankPage.enterRoutingNumber('090720');
  //   await cashAndBankPage.enterMainAccount(mainAccount);
  //   await cashAndBankPage.enterAccountDescription("Descrip" + bankAccountName.toString());
  //   await cashAndBankPage.enterSwiftCode('ABBYGB2L');
  //   await cashAndBankPage.enterIBAN('GB27ABBY09072001571907');
  //   await navigationPage.clickSaveButton();
  //   await navigationPage.clickHomeButton();
  // });


  // //*********************************Bank statements***************************** */
  // test('Bank statements', async ({ page }) => {
  //   const navigationPage = new NavigationPage(page);
  //   const customerPage = new CustomerPage(page);
  //   const fixedAssetsPage = new FixedAssetsPage(page);
  //   const supplierVendorPage = new SupplierVendorPage(page);
  //   const cashAndBankPage = new CashBankManagement(page);
  //   const requisitionPage = new PurchaseRequisitionPage(page);
  //   const generalLedgerPage = new GeneralLedgerPage(page);
  //   const mainAccount = readEnvVariable('MAIN_ACCOUNT');
  //   if (!mainAccount) {
  //     throw new Error('MAIN_ACCOUNT environment variable is not set');
  //   }
  //   navigationPage.openModulesMenu();
  //   await clickMenuItem(page, 'Cash and bank management', false);
  //   await page.waitForTimeout(5000);
  //   await expandMenuIfCollapsed(page, 'Bank statement reconciliation', 'Bank statements');
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   await cashAndBankPage.importBankStatement(path.join(__dirname, '../test-data/14042025_121609_65707429_SAP MT940 - BP08.txt'));
  //   await cashAndBankPage.checkPrimary(0);
  //   await cashAndBankPage.checkPrimary(2);
  //   await navigationPage.clickOkButtonMore();
  //   const message = await fixedAssetsPage.checkMessageBar();
  //   expect(message).toContain("The Import bank statements job is added to the batch queue.");
  // });

  //*********************************Import Manual Cheque***************************** */
  test('Import Manual Cheque', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const cashAndBankPage = new CashBankManagement(page);
    const mainAccount = readEnvVariable('MAIN_ACCOUNT');
    if (!mainAccount) {
      throw new Error('MAIN_ACCOUNT environment variable is not set');
    }
    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'Cash and bank management', false);
    await page.waitForTimeout(5000);
    UpdateExcelFile(page);
    await expandMenuIfCollapsed(page, 'Enquiries and reports', 'Import Manual Cheque');
    await cashAndBankPage.importManualCheque(path.join(__dirname, '../updated-file.xlsx'));
    await navigationPage.waitUntilProcessingMessageDisappears();
    await page.waitForTimeout(5000);
  });

  //*********************************Get Cheques Report***************************** */
  test('Get Cheques Report', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const cashAndBankPage = new CashBankManagement(page);
    const mainAccount = readEnvVariable('MAIN_ACCOUNT');
    if (!mainAccount) {
      throw new Error('MAIN_ACCOUNT environment variable is not set');
    }
    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'Cash and bank management', false);
    await page.waitForTimeout(5000);
    await expandMenuIfCollapsed(page, 'Enquiries and reports', 'Cheques');
    await navigationPage.waitUntilProcessingMessageDisappears();
    await cashAndBankPage.applyDateDescFilter();
    AssertChequeNumbersNotVisible(page, "D:\\fgh_automation\\updated-file.xlsx");
    await page.waitForTimeout(5000);
    await DeleteFile(page, "D:\\fgh_automation\\updated-file.xlsx");
  });
});

async function AssertChequeNumbersNotVisible(page: Page, filePath: string) {
  const cashAndBankPage = new CashBankManagement(page);
  const chequeNumbers = await GetChequeNumbers("D:\\fgh_automation\\updated-file.xlsx");

  for (let index = 0; index < chequeNumbers.length; index++) {
    const cheque = chequeNumbers[index].toString();
    const uiIndex = chequeNumbers.length - 1 - index;

    const chequeElement = cashAndBankPage.getCheckqueNumberFromDisplayedGrid.nth(uiIndex);

    await expect(chequeElement).toBeVisible();

    const text = await chequeElement.getAttribute('value');
    console.log("*******************" + text);

    expect(text?.trim()).toBe(cheque);
  }
}
