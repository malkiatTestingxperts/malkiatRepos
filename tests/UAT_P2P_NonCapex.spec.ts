// PurchaseRequisitionTest.spec.ts
import { test, expect } from '@playwright/test';
import { NavigationPage } from '../utils/NavigationPage';
import { selectQuickFilter, checkMatchingRow, checkRowWithMachedText } from '../utils/Filter';
import { clickMenuItem } from '../utils/MainMenu';
import { PurchaseRequisitionPage } from '../pages/PurchaseRequisitionPage';
import { setEnvVariable, readEnvVariable } from '../utils/EnvHelper';
import { expandMenuIfCollapsed } from '../utils/MainMenu';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
const baseURL = process.env.BASE_URL;
if (!baseURL) {
  throw new Error('BASE_URL environment variable is not set');
}
test.describe('UAT Purchase Requisition Flow', () => {
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

  //****************************Create Purchase Requisition****************************************** */
  test('Create new purchase requisition', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const requisitionPage = new PurchaseRequisitionPage(page);
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
    await requisitionPage.selectSupplier('TT118');
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

  //***************************************Ceate Purchase Order and GR for Purchase Requisition*********************************** */
  test('Create Good Receipt', async ({ page }) => {
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
    await requisitionPage.waitForPOLinkInPRDetailsAndClick();
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
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForSelector('body');
    // await page.evaluate(() => {
    //   document.body.style.zoom = "85%";
    // });
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