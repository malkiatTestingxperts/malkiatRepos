import { test, expect } from '@playwright/test';
import { NavigationPage } from '../utils/NavigationPage';
import { selectQuickFilter, checkMatchingRow, checkRowWithMachedText } from '../utils/Filter';
import { clickMenuItem } from '../utils/MainMenu';
import { PurchaseRequisitionPage } from '../pages/PurchaseRequisitionPage';
import { setEnvVariable, readEnvVariable } from '../utils/EnvHelper';
import { expandMenuIfCollapsed } from '../utils/MainMenu';
import { SupplierVendorPage } from '../pages/SupplierVendorPage';
import { FixedAssetsPage } from '../pages/FixedAssetsPage';
import { generateRandomPostcode } from '../utils/CommonUtils';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
const baseURL = process.env.BASE_URL;
if (!baseURL) {
  throw new Error('BASE_URL environment variable is not set');
}
test.describe('UAT Purchase Requisition Flow', () => {

  test.beforeEach(async ({ page }) => {
    console.log('#############1');
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

  //********************************* Create Supplier ***************************** */
  test('Create New Supplier/Vendor', async ({ page }) => {
    //test.setTimeout(206000);
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
    console.log(`Supplier Name is: ${supplierNumber}`);
    setEnvVariable('SUPPLIER_NUMBER', supplierNumber.toString());
    await supplierVendorPage.enterSupplierAccountNumber(supplierNumber.toString());
    const stringRandom = Math.random().toString(36).substring(2, 6).toUpperCase();
    const supplierName = `Test-${stringRandom}${supplierNumber}`;
    setEnvVariable('SUPPLIER_NAME', supplierName.toString());
    await supplierVendorPage.enterSupplierAccountName(supplierName);
    await supplierVendorPage.enterAndSelectGroup('DS');
    await supplierVendorPage.clickButtonAddSupplierAddress();
    await navigationPage.waitUntilProcessingMessageDisappears();
    await supplierVendorPage.enterDescriptionSupplierAddress("Test Address:" + supplierName);
    const zipCode = generateRandomPostcode();
    await supplierVendorPage.enterzipCodeSupplier(await zipCode);
    await supplierVendorPage.enterStreetSupplier(supplierAddress);
    await navigationPage.clickOkButton();
    await navigationPage.waitUntilProcessingMessageDisappears();
    await navigationPage.clickSaveButton();
    await supplierVendorPage.clickSupplierBackButton();
  });

  test('Enter Supplier/Vendor Information', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const supplierVendorPage = new SupplierVendorPage(page);
    const fixedAssetsPage = new FixedAssetsPage(page);
    const requisitionPage = new PurchaseRequisitionPage(page);
    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'Purchase ledger', false);
    await page.waitForTimeout(5000);
    await expandMenuIfCollapsed(page, 'Suppliers', 'All suppliers');
    await navigationPage.waitUntilProcessingMessageDisappears();
    const supplierNameFromEnv = readEnvVariable('SUPPLIER_NAME');
    if (!supplierNameFromEnv) {
      throw new Error('SUPPLIER_NAME environment variable is not set');
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
    const cleanedMessage = message.replace(/\s+/g, ' ').trim();
    expect(cleanedMessage).toContain("Submitted to workflow Supplier bank account approval is not active until a new record is created");
    await supplierVendorPage.clickBankAccountsBackButton();
    await supplierVendorPage.clickSupplierBackButton();
  });

  //****************************Create Purchase Requisition****************************************** */
  test('Create new purchase requisition', async ({ page }) => {
    //test.setTimeout(158000);
    const navigationPage = new NavigationPage(page);
    const requisitionPage = new PurchaseRequisitionPage(page);
    const supplierNameFromEnv = readEnvVariable('SUPPLIER_NAME');
    if (!supplierNameFromEnv) {
      throw new Error('SUPPLIER_NAME environment variable is not set');
    }
    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'Procurement and sourcing', false);
    await expandMenuIfCollapsed(page, 'Purchase requisitions', 'Purchase requisitions prepared by me');
    await navigationPage.waitUntilProcessingMessageDisappears();
    await expect(navigationPage.isElementVisible).toBeVisible();
    await navigationPage.clickNewButton();
    const preRquisitionName = await requisitionPage.fillRequisitionName();
    console.log(`Requisition Name: ${preRquisitionName}`);
    setEnvVariable('PR_NAME', preRquisitionName);
    await requisitionPage.submitRequisition();
    await navigationPage.waitUntilProcessingMessageDisappears();
    const actualTitle = await requisitionPage.getHeaderTitle();
    expect(actualTitle).toContain(preRquisitionName);
    await requisitionPage.setAndSelectBusinessJustificationReason('Business Justification');
    const justificationDetails = `** Non-Capex PR ${preRquisitionName}`;
    console.log('Filling justification:', justificationDetails);
    await requisitionPage.enterBusinessJustificationHeaderDetails(justificationDetails);
    await requisitionPage.clickAddNewPRLineButton();
    await navigationPage.waitUntilProcessingMessageDisappears();
    await requisitionPage.selectItemName('101100');
    await requisitionPage.selectSupplier(supplierNameFromEnv);
    await requisitionPage.enterPurchaseQuantity('100');
    await requisitionPage.clickFinancialDimensions();
    await requisitionPage.enterBusinessUnit('HDQ');
    await requisitionPage.enterCostCenter('FPC');
    await requisitionPage.enterPublications('NA');
    await navigationPage.clickSaveButton();
    await navigationPage.waitUntilProcessingMessageDisappears();
    await page.waitForTimeout(2000);
    await navigationPage.clickBackButton();
    await selectQuickFilter(page, preRquisitionName, 'Name');
    await page.waitForTimeout(2000);
    await checkMatchingRow(page, preRquisitionName);
    await requisitionPage.clickWorkflow()
    await requisitionPage.getSpanByLabel("Submit");
    const message = await requisitionPage.checkMessageBar();
    expect(message).toBe("Operation completed");
    await requisitionPage.clickSubmitButton()
    await navigationPage.waitUntilProcessingMessageDisappears();
  });

  //*************************************** Ceate Purchase Order and GR for Purchase Requisition *********************************** */
  test('Create Good Receipt', async ({ page }) => {
    //test.setTimeout(588000);
    const navigationPage = new NavigationPage(page);
    const requisitionPage = new PurchaseRequisitionPage(page);
    const prName = readEnvVariable('PR_NAME');
    console.log(`Updated PR_NAME: ${prName}`);
    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'Procurement and sourcing', false);
    await expandMenuIfCollapsed(page, 'Purchase requisitions', 'Purchase requisitions prepared by me');
    await navigationPage.waitUntilProcessingMessageDisappears();
    await expect(navigationPage.isElementVisible).toBeVisible();

    if (!prName) {
      throw new Error('PR_NAME environment variable is not set');
    }
    await selectQuickFilter(page, prName, 'Name');
    await checkMatchingRow(page, prName);
    const purchaseRequisitionId = requisitionPage.getPurchaseRequisitionId()
    console.log(`Purchase Requisition ID: ${purchaseRequisitionId}`);
    await requisitionPage.clickWorkflow();
    await requisitionPage.getSpanByLabel("Workflow history");
    await requisitionPage.workflowStatusReassignWorkItem
    await navigationPage.waitUntilProcessingMessageDisappears();
    await requisitionPage.waitForPendingStatusRowAndSelect();
    await requisitionPage.clickReassignWorkItem();
    await navigationPage.waitUntilProcessingMessageDisappears();
    await requisitionPage.enterUserName('ETXP001');
    await requisitionPage.clickActionButton();
    await requisitionPage.waitForStatusContains("Pending");
    await navigationPage.clickHomeButton();
    await navigationPage.waitUntilProcessingMessageDisappears();
    if (purchaseRequisitionId) {
      const approvalLink = await requisitionPage.getApprovalRequestLink(await purchaseRequisitionId + ".");
      await approvalLink.click();
      await navigationPage.waitUntilProcessingMessageDisappears();
    } else {
      throw new Error('Purchase Requisition ID is null');
    }
    await requisitionPage.clickWorkflow()
    await requisitionPage.getSpanByLabel("Approve");
    await navigationPage.waitUntilProcessingMessageDisappears();
    await requisitionPage.clickActionButton();
    await navigationPage.waitUntilProcessingMessageDisappears();
    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'Procurement and sourcing', false);
    await expandMenuIfCollapsed(page, 'Purchase requisitions', 'Purchase requisitions prepared by me');
    await navigationPage.waitUntilProcessingMessageDisappears();
    await expect(navigationPage.isElementVisible).toBeVisible();
    await selectQuickFilter(page, prName, 'Name');
    await checkMatchingRow(page, prName);
    await requisitionPage.clickWorkflow()
    await requisitionPage.getSpanByLabel("Workflow history");
    await navigationPage.waitUntilProcessingMessageDisappears();
    await requisitionPage.waitForPendingStatusRowAndSelect();
    await requisitionPage.clickReassignWorkItem();
    await navigationPage.waitUntilProcessingMessageDisappears();
    await requisitionPage.enterUserName('ETXP001');
    await requisitionPage.clickActionButton();
    await navigationPage.clickHomeButton();
    await navigationPage.waitUntilProcessingMessageDisappears();
    if (purchaseRequisitionId) {
      const approvalLink = await requisitionPage.getApprovalRequestLink(await purchaseRequisitionId + ".");
      await approvalLink.click();
      await navigationPage.waitUntilProcessingMessageDisappears();
    } else {
      throw new Error('Purchase Requisition ID is null');
    }
    await requisitionPage.clickWorkflow()
    await requisitionPage.getSpanByLabel("Approve");
    await navigationPage.waitUntilProcessingMessageDisappears();
    await requisitionPage.clickActionButton();
    await navigationPage.waitUntilProcessingMessageDisappears();
    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'Procurement and sourcing', false);
    await expandMenuIfCollapsed(page, 'Purchase requisitions', 'Purchase requisitions prepared by me');
    await navigationPage.waitUntilProcessingMessageDisappears();
    await expect(navigationPage.isElementVisible).toBeVisible();
    await selectQuickFilter(page, prName, 'Name');
    await checkMatchingRow(page, prName);
    await requisitionPage.clickOnPurchaseRequisition();
    await navigationPage.waitUntilProcessingMessageDisappears();
    const poNumber = await requisitionPage.waitForPOLinkInPRDetailsAndClick();
    console.log(`Found and clicked PO number: ${poNumber}`);
    setEnvVariable('PO_NUMBER', poNumber);
    await navigationPage.waitUntilProcessingMessageDisappears();
    await requisitionPage.clickPurchaseButton();
    await requisitionPage.clickConfirmPoButton();
    await requisitionPage.waitForDialogBoxToHide();
    const isOperationCompletedMessageDisplayedOnPOPage = await requisitionPage.checkMessageBar();
    expect(isOperationCompletedMessageDisplayedOnPOPage).toBe("Operation completed");
    await requisitionPage.clickReceiveButton();
    await requisitionPage.clickProductReceiptButton();
    await navigationPage.waitUntilProcessingMessageDisappears();
    const randomString = Math.random().toString(36).substring(2, 6).toUpperCase();
    const gRName = `GR${randomString}`;
    await requisitionPage.enterProductReceiptText(gRName);
    await requisitionPage.enterGoodRecieveQuantity('100.00');
    await requisitionPage.submitRequisition();
    await navigationPage.waitUntilProcessingMessageDisappears();
    await requisitionPage.clickJournalProductReceiptButton();
    await requisitionPage.clickVouchersButton();
    await navigationPage.waitUntilProcessingMessageDisappears();
    await requisitionPage.waitForJournalVoucherRowsOnGoodReceipt();
    const matchedQuantity = await requisitionPage.isAmountInputWithValuePresent('-100.00');
    console.log(`Matched Quantity: ${matchedQuantity}`);
    expect(matchedQuantity).toBe(true);
  });

  //*******************************FGH PR to PO Report**********************/
  test('Verify FGH PR to PO Report', async ({ page }) => {
    //test.setTimeout(90000);
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForSelector('body');
    const navigationPage = new NavigationPage(page);
    const requisitionPage = new PurchaseRequisitionPage(page);
    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'Procurement and sourcing', false);
    await page.waitForTimeout(5000);
    await requisitionPage.selctReportPRToPO();
    await navigationPage.waitUntilProcessingMessageDisappears();
    let countOfRecords = await requisitionPage.getNoOfPORecordsOnPRToPoReport();
    expect(countOfRecords).toBeGreaterThan(0);
  });
});