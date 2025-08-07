import { test, expect, Page } from '@playwright/test';
import { NavigationPage } from '../utils/NavigationPage';
import { clickMenuItem } from '../utils/MainMenu';
import { expandMenuIfCollapsed } from '../utils/MainMenu';
import { DateHelper } from '../utils/DateHelper';
import { PurchaseRequisitionPage } from '../pages/PurchaseRequisitionPage';
import { SupplierVendorPage } from '../pages/SupplierVendorPage';
import { CustomerPage } from '../pages/CustomerPage';
import { FixedAssetsPage } from '../pages/FixedAssetsPage';
import { setEnvVariable, readEnvVariable } from '../utils/EnvHelper';
import { generateRandomPostcode } from '../utils/CommonUtils';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const baseURL = process.env.BASE_URL;
if (!baseURL) {
  throw new Error('BASE_URL environment variable is not set');
}
test.describe('UAT Account Receivable', () => {
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

  //*********************************Create Customer***************************** */
  test('Create New Customer/Vendor', async ({ page }) => {
    test.setTimeout(50000);
    const navigationPage = new NavigationPage(page);
    const customerPage = new CustomerPage(page);
    const fixedAssetsPage = new FixedAssetsPage(page);
    const customerAddress = readEnvVariable('CUSTOMER_ADDRESS');
    if (!customerAddress) {
      throw new Error('SUPPLIER_ADDRESS environment variable is not set');
    }

    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'Sales ledger', false);
    await page.waitForTimeout(5000);
    await expandMenuIfCollapsed(page, 'Customers', 'All customers');
    await navigationPage.waitUntilProcessingMessageDisappears();
    await navigationPage.clickNewCustomer();
    const customerNumber = Math.floor(100000 + Math.random() * 900000);
    console.log(`Customer Number is: ${customerNumber}`);

    await customerPage.enterCustomerAccountNumber(customerNumber.toString());
    const stringRandom = Math.random().toString(36).substring(2, 6).toUpperCase();
    const customerName = `Test-${stringRandom}${customerNumber}`;
    console.log(`Customer Name is: ${customerName}`);
    setEnvVariable('CUSTOMER_NAME', customerName);
    await customerPage.enterCustomerAccountName(customerName.toString());
    await customerPage.enterAndSelectGroup("SSL");
    await customerPage.enterPaymentTerm("30 Days");
    await customerPage.enterAndSelectVatGroupInInvoiceLine("UK");
    const zipCode = generateRandomPostcode();
    await customerPage.enterzipCodeSupplier(await zipCode);
    await customerPage.enterStreetSupplier(customerAddress);
    await customerPage.enterAndSelectCity("BRADFORD");
    await customerPage.enterPhone("01274575511");
    await customerPage.enterEmail(customerName + "@test.com")
    await navigationPage.clickOkButton();
    await navigationPage.waitUntilProcessingMessageDisappears();

    await fixedAssetsPage.enterBusinessUnit('freemans');
    await fixedAssetsPage.enterCostCenter('GFA');
    await fixedAssetsPage.enterPublications('NA');
    await navigationPage.clickSaveButton();
  });

  //*********************************All free text invoices***************************** */
  test('All free text invoices', async ({ page }) => {
    test.setTimeout(43000);
    const navigationPage = new NavigationPage(page);
    const customerPage = new CustomerPage(page);
    const requisitionPage = new PurchaseRequisitionPage(page);
    const customerNameFromEnv = readEnvVariable('CUSTOMER_NAME');
    if (!customerNameFromEnv) {
      throw new Error('CUSTOMER_NAME environment variable is not set');
    }

    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'Sales ledger', false);
    await page.waitForTimeout(5000);
    await expandMenuIfCollapsed(page, 'Invoices', 'All free text invoices');
    await navigationPage.waitUntilProcessingMessageDisappears();
    await navigationPage.clickNewButton();
    const customerNumber = Math.floor(100000 + Math.random() * 900000);
    console.log(`Customer Number is: ${customerNumber}`);
    await customerPage.enterAndAddCustomerAccountOnFreeTaxInvoice(customerNameFromEnv)
    await customerPage.enterDescription("Vehicle Storage", 335003, 0, "UK", 1, 0);
    await customerPage.addButtonAddLine();
    await customerPage.enterDescription("Week Ending 28th this week", 335003, 1, "UK", 100, 1);
    await customerPage.clickButtonPostInvoice();
    await navigationPage.waitUntilProcessingMessageDisappears();
    await requisitionPage.submitRequisition();
    const message = await requisitionPage.checkMessageBar();
    const cleaned = message.replace(/\s+/g, ' ').trim();
    expect(cleaned).toContain("Operation completed The free text invoice posting process is complete.");
  });

  //*********************************Customer Payment Journal***************************** */
  test('Customer Payment Journal', async ({ page }) => {
    test.setTimeout(40000);
    const navigationPage = new NavigationPage(page);
    const supplierVendorPage = new SupplierVendorPage(page);
    const fixedAssetsPage = new FixedAssetsPage(page);
    const requisitionPage = new PurchaseRequisitionPage(page);
    const customerNameFromEnv = readEnvVariable('CUSTOMER_NAME');

    if (!customerNameFromEnv) {
      throw new Error('CUSTOMER_NAME environment variable is not set');
    }

    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'Sales ledger', false);
    await page.waitForTimeout(5000);
    await expandMenuIfCollapsed(page, 'Payments', 'Customer payment journal');
    await navigationPage.waitUntilProcessingMessageDisappears();
    await navigationPage.clickNewButton();
    await fixedAssetsPage.selectFixedAssetJournalName('CAT');
    const random4Digit3 = Math.floor(1000 + Math.random() * 9000);
    console.log(`Random 4-digit number: ${random4Digit3}`);
    await fixedAssetsPage.enterJournalFixedAssetDescription("Credit-" + random4Digit3);
    await fixedAssetsPage.clickFixedAssetJournalLine();
    await navigationPage.waitUntilProcessingMessageDisappears();
    await supplierVendorPage.enterAndSelectAccountNumberJournal(customerNameFromEnv);
    const descprtion = generateRandomPostcode();
    await supplierVendorPage.enterDescriptionInvoiceLine("Payment Received" + descprtion);
    await fixedAssetsPage.enterCreditAmountJournal('120.00');
    await fixedAssetsPage.enterAndSelectOffsetAccountType('Bank');
    await fixedAssetsPage.enteroffsetAccountNumber('BP02');
    await fixedAssetsPage.clickPostButton();
    const message = await requisitionPage.checkMessageBar();
    const cleaned = message.replace(/\s+/g, ' ').trim();
    expect(cleaned).toContain("Operation completed Number of vouchers posted to the journal: 1");
    await fixedAssetsPage.clickBackButtonUnderMainMenu();
  });
});


