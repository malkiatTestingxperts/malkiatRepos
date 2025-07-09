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
    const requisitionPage = new PurchaseRequisitionPage(page);
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
    await supplierVendorPage.clickNewButton();
    await navigationPage.waitUntilProcessingMessageDisappears();
    await supplierVendorPage.enterBankAccountsType("Pay");
    await supplierVendorPage.enterbankAccountsName(supplierNameFromEnv);
    await supplierVendorPage.enterRoutingNumber("207775");
    await supplierVendorPage.enterBankAccountNumber("50422827");
    await supplierVendorPage.clickSaveButton();
    await requisitionPage.clickWorkflow();
    await requisitionPage.getSpanByLabel("Submit");

    await requisitionPage.clickSubmitButton()


    const message = await requisitionPage.checkMessageBar();
    const cleaned = message.replace(/\s+/g, ' ').trim();
    expect(cleaned).toContain("Submitted to workflow Supplier bank account approval is not active until a new record is created");
    await supplierVendorPage.clickBankAccountsBackButton();
    await supplierVendorPage.clickSupplierBackButton();
  });

  //*********************************Create Invoice Credit Journal***************************** */
  test('Create Invoice Credit Journal', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const supplierVendorPage = new SupplierVendorPage(page);
    const fixedAssetsPage = new FixedAssetsPage(page);
    const requisitionPage = new PurchaseRequisitionPage(page);
    const dateHelper = new DateHelper(page);

    const supplierNameFromEnv = readEnvVariable('SUPPLIER_NUMBER');
    if (!supplierNameFromEnv) {
      throw new Error('SUPPLIER_ADDRESS environment variable is not set');
    }

    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'Purchase ledger', false);
    await page.waitForTimeout(5000);
    await expandMenuIfCollapsed(page, 'Invoices', 'Invoice journal');
    await navigationPage.waitUntilProcessingMessageDisappears();
    await navigationPage.clickNewButton();
    await fixedAssetsPage.selectFixedAssetJournalName('VII');
    const random4Digit3 = Math.floor(1000 + Math.random() * 9000);
    console.log(`Random 4-digit number: ${random4Digit3}`);
    await fixedAssetsPage.enterJournalFixedAssetDescription("Credit-" + random4Digit3);
    await fixedAssetsPage.clickFixedAssetJournalLine();
    await navigationPage.waitUntilProcessingMessageDisappears();
    await supplierVendorPage.enterAndSelectAccountNumberJournal("TT118");
    var journalDate = dateHelper.getFormattedDateOffset(-0);
    console.log(`Journal Date: ${journalDate}`);
    await supplierVendorPage.enterInvoiceDate(journalDate);
    const random4Digi4 = Math.floor(1000 + Math.random() * 9000);
    console.log(`Random 4-digit number: ${random4Digi4}`);
    await supplierVendorPage.enterInvoiceName("Test" + random4Digi4.toString());
    console.log("***************" + random4Digi4.toString());
    const descprtion = generateRandomPostcode();
    await supplierVendorPage.enterDescriptionInvoiceLine("Test_" + descprtion);
    await fixedAssetsPage.enterCreditAmountJournal('100.00');
    await supplierVendorPage.enterAndSelectVatGroup("UK");
    await supplierVendorPage.enterAndSelectVatGroup2("STD");
    await fixedAssetsPage.enterAndSelectOffsetAccountType('Ledger');
    await fixedAssetsPage.enteroffsetAccountNumber('505030-WHS-BIM-NA');
    await fixedAssetsPage.clickPostButton();
    const message = await requisitionPage.checkMessageBar();
    const cleaned = message.replace(/\s+/g, ' ').trim();
    expect(cleaned).toContain("Operation completed Number of vouchers posted to the journal: 1");
    await fixedAssetsPage.clickBackButtonUnderMainMenu();
  })


  // //*********************************Create Invoice Journal Debit***************************** */
  test('Create Invoice Journal Debit', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const supplierVendorPage = new SupplierVendorPage(page);
    const fixedAssetsPage = new FixedAssetsPage(page);
    const requisitionPage = new PurchaseRequisitionPage(page);
    const dateHelper = new DateHelper(page);
    const supplierNameFromEnv = readEnvVariable('SUPPLIER_NUMBER');
    if (!supplierNameFromEnv) {
      throw new Error('SUPPLIER_ADDRESS environment variable is not set');
    }

    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'Purchase ledger', false);
    await page.waitForTimeout(5000);
    await expandMenuIfCollapsed(page, 'Invoices', 'Invoice journal');
    await navigationPage.waitUntilProcessingMessageDisappears();
    await navigationPage.clickNewButton();
    await fixedAssetsPage.selectFixedAssetJournalName('VII');
    const random4Digit3 = Math.floor(1000 + Math.random() * 9000);
    console.log(`Random 4-digit number: ${random4Digit3}`);
    await fixedAssetsPage.enterJournalFixedAssetDescription("Debit-" + random4Digit3);
    await fixedAssetsPage.clickFixedAssetJournalLine();
    await navigationPage.waitUntilProcessingMessageDisappears();
    await supplierVendorPage.enterAndSelectAccountNumberJournal('TT118');
    var journalDate = dateHelper.getFormattedDateOffset(-0);
    console.log(`Journal Date: ${journalDate}`);
    await supplierVendorPage.enterInvoiceDate(journalDate);
    const random4Digi4 = Math.floor(1000 + Math.random() * 9000);
    console.log(`Random 4-digit number: ${random4Digi4}`);
    await supplierVendorPage.enterInvoiceName("TestDebit" + random4Digi4.toString());

    const descprtion = generateRandomPostcode();
    await supplierVendorPage.enterDescriptionInvoiceLine("Test_" + descprtion);
    await fixedAssetsPage.enterDebitAmountJournal('100.00');
    await supplierVendorPage.enterAndSelectVatGroup("UK");
    await supplierVendorPage.enterAndSelectVatGroup2("STD");
    await fixedAssetsPage.enterAndSelectOffsetAccountType('Ledger');
    await fixedAssetsPage.enteroffsetAccountNumber('505030-WHS-BIM-NA');
    await fixedAssetsPage.clickPostButton();
    const message = await requisitionPage.checkMessageBar();
    const cleaned = message.replace(/\s+/g, ' ').trim();
    expect(cleaned).toContain("Operation completed Number of vouchers posted to the journal: 1");
    await fixedAssetsPage.clickBackButtonUnderMainMenu();
  })


  //*********************************Invoice Register and the Purchase Order Pick***************************** */
  test('Invoice Register And the Purchase Order Details', async ({ page }) => {
    await page.setViewportSize({ width: 1536, height: 864 });
    const navigationPage = new NavigationPage(page);
    const supplierVendorPage = new SupplierVendorPage(page);
    const fixedAssetsPage = new FixedAssetsPage(page);
    const requisitionPage = new PurchaseRequisitionPage(page);
    const dateHelper = new DateHelper(page);
    const poNum = readEnvVariable('PO_NUMBER');
    const supplierNameFromEnv = readEnvVariable('SUPPLIER_NUMBER');
    if (!supplierNameFromEnv || !poNum) {
      throw new Error('SUPPLIER_ADDRESS and PO_NUMBER environment variable are not set');
    }
    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'Purchase ledger', false);
    await page.waitForTimeout(5000);
    await expandMenuIfCollapsed(page, 'Invoices', 'Invoice register');
    await navigationPage.waitUntilProcessingMessageDisappears();
    await navigationPage.clickNewButton();
    await fixedAssetsPage.selectFixedAssetJournalName('V1S');
    const random4Digit3 = Math.floor(1000 + Math.random() * 9000);
    console.log(`Random 4-digit number: ${random4Digit3}`);
    await fixedAssetsPage.enterJournalFixedAssetDescription("Test-" + random4Digit3);
    await fixedAssetsPage.clickFixedAssetJournalLine();
    await supplierVendorPage.enterAndSelectAccountNumberJournal("TT118");
    var journalDate = dateHelper.getFormattedDateOffset(-0);
    console.log(`Journal Date: ${journalDate}`);
    await supplierVendorPage.enterInvoiceDate(journalDate);
    await supplierVendorPage.enterAndSelectPO(poNum);
    await fixedAssetsPage.enterCreditAmountJournal('15.00');
    const invoiceName = Math.floor(1000 + Math.random() * 9000);
    console.log(`Random 4-digit number: ${invoiceName}`);
    setEnvVariable('INVOICE_NAME', "Test_" + invoiceName.toString());
    await supplierVendorPage.enterInvoiceName("Test_" + invoiceName.toString());
    const descprtion = generateRandomPostcode();
    await supplierVendorPage.enterDescriptionInvoiceLine("Test_" + descprtion);

    await supplierVendorPage.enterAndSelectVatGroupInInvoiceLine("UK", 0);
    await supplierVendorPage.enterAndSelectVatGroupInInvoiceLine("STD", 1);
    await supplierVendorPage.enterApproverBy("Malkiat Singh");
    await requisitionPage.submitRequisition();
    await fixedAssetsPage.clickPostButton();
    const message = await requisitionPage.checkMessageBar();
    const cleaned = message.replace(/\s+/g, ' ').trim();
    expect(cleaned).toContain("Operation completed Number of vouchers posted to the journal: 1");
    await fixedAssetsPage.clickBackButtonUnderMainMenu();
  });



  //*********************************Invoice Pool***************************** */
  test('Invoice Pool', async ({ page }) => {
    await page.setViewportSize({ width: 1536, height: 864 });
    const navigationPage = new NavigationPage(page);
    const supplierVendorPage = new SupplierVendorPage(page);
    const fixedAssetsPage = new FixedAssetsPage(page);
    const requisitionPage = new PurchaseRequisitionPage(page);
    const dateHelper = new DateHelper(page);
    const menusOption = new PageMenus(page);

    const invoiceName = readEnvVariable('INVOICE_NAME');
    if (!invoiceName) {
      throw new Error('SUPPLIER_ADDRESS environment variable is not set');
    }

    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'Purchase ledger', false);
    await page.waitForTimeout(5000);
    await expandMenuIfCollapsed(page, 'Invoices', 'Invoice pool');
    await navigationPage.waitUntilProcessingMessageDisappears();
    await supplierVendorPage.enterSupplierAccountFilter("TT118");
    await supplierVendorPage.enterInvoiceFilter(invoiceName);
    await supplierVendorPage.clickPurchaseOrderOption();
    await navigationPage.waitUntilProcessingMessageDisappears();
    await supplierVendorPage.clickMatchProductReceipt();
    await navigationPage.waitUntilProcessingMessageDisappears();
    await supplierVendorPage.checkMatchProductReceipt();
    await supplierVendorPage.clickOkButtonAfterCheckingTheMatchingLine();
    await supplierVendorPage.clickButtonUpdateMatchStatus();
    const matchStatus = await supplierVendorPage.getMatchStatus();
    expect(matchStatus).toContain("Passed");
    // await menusOption.clickMenuSubMenuOptionOnSpecificPage("VendorInvoiceHeaderWorkflowDropDialog", "Submit");
    await supplierVendorPage.clickworkflowInvoicePoolMatchingSubmit();
    await supplierVendorPage.clickSubmitButton();
    await navigationPage.waitUntilProcessingMessageDisappears();
  });



  //*********************************Invoice Payments***************************** */
  test('Invoice Payments', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const supplierVendorPage = new SupplierVendorPage(page);
    const fixedAssetsPage = new FixedAssetsPage(page);
    const requisitionPage = new PurchaseRequisitionPage(page);
    const dateHelper = new DateHelper(page);
    const menusOption = new PageMenus(page);

    const invoiceName = readEnvVariable('INVOICE_NAME');
    if (!invoiceName) {
      throw new Error('INVOICE_NAME environment variable is not set');
    }

    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'Purchase ledger', false);
    await page.waitForTimeout(5000);
    await expandMenuIfCollapsed(page, 'Payments', 'Supplier payment journal');
    await navigationPage.waitUntilProcessingMessageDisappears();
    await navigationPage.clickNewButton();
    await fixedAssetsPage.selectFixedAssetJournalName('ET-DOM_B');
    const random4Digit3 = Math.floor(1000 + Math.random() * 9000);
    console.log(`Random 4-digit number: ${random4Digit3}`);
    await fixedAssetsPage.enterJournalFixedAssetDescription("Payment-" + random4Digit3);
    await fixedAssetsPage.clickFixedAssetJournalLine();
    await navigationPage.waitUntilProcessingMessageDisappears();

    await menusOption.clickMenuSubMenuOptionOnSpecificPage("buttonPaymProposal", "Create payment proposal");

    await dateHelper.withIndex(0).setDateInput(0, 'Dialog');
    await dateHelper.withIndex(1).setDateInput(0, 'Dialog');
    await dateHelper.withIndex(2).setDateInput(0, 'Dialog');
    await fixedAssetsPage.clickDepreciationFilterButton();
    await navigationPage.waitUntilProcessingMessageDisappears();
    await fixedAssetsPage.enterFilterBookField(0, 'TT118');
    await supplierVendorPage.enterPaymentAmount("2");
    await fixedAssetsPage.clickOkButtonFromFromGrid();
    await supplierVendorPage.waitNotificationMessageToHide();
    await supplierVendorPage.enterPaymentStatus('Sent');
    await supplierVendorPage.clickPostButton();
    const message = await fixedAssetsPage.checkMessageBar();
    expect(message).toContain("Operation completed");
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