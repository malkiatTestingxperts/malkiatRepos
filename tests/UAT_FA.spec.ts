// PurchaseRequisitionTest.spec.ts
import { test, expect } from '@playwright/test';
import { NavigationPage } from '../utils/NavigationPage';
import { selectQuickFilter, checkMatchingRow } from '../utils/Filter';
import { clickMenuItem } from '../utils/Menu';
import { expandMenuIfCollapsed } from '../utils/Menu';
import { getFormattedDateOffset } from '../utils/DateHelper';
import { PurchaseRequisitionPage } from '../pages/PurchaseRequisitionPage';
import { FixedAssetsPage } from '../pages/FixedAssetsPage';
import { setEnvVariable, readEnvVariable } from '../utils/envHelper';
import path from 'path';
import dotenv from 'dotenv';
import { Console } from 'console';
import { waitForInputValue } from '../utils/waitForWithRetry';
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


  // test('Create Fixed Asset', async ({ page }) => {

  //   const navigationPage = new NavigationPage(page);
  //   const requisitionPage = new PurchaseRequisitionPage(page);
  //   const fixedAssetsPage = new FixedAssetsPage(page);

  //   navigationPage.openModulesMenu();
  //   await clickMenuItem(page, 'Fixed assets', false);
  //   await page.waitForTimeout(5000);
  //   await expandMenuIfCollapsed(page, 'Fixed assets', 'Fixed assets');


  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   await expect(navigationPage.actionsGroupNewButton).toBeVisible();
  //   await navigationPage.clickNewButton();
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   await fixedAssetsPage.selectFixedAssetGroup('Operational ');
  //   const random5Digit = Math.floor(10000 + Math.random() * 90000);
  //   console.log(`Random 4-digit number: ${random5Digit}`);
  //   await fixedAssetsPage.enterCapexNumber(random5Digit.toString());

  //   const randomString = Math.random().toString(36).substring(2, 6).toUpperCase();
  //   const fixeAssetDescription = `CCTV Expansion${randomString}`;
  //   console.log(`fixed asset description: ${fixeAssetDescription}`);
  //   setEnvVariable('FIXED_ASSET_NAME', fixeAssetDescription);
  //   await fixedAssetsPage.enterFADescr(fixeAssetDescription);
  //   await fixedAssetsPage.enterFADescrAlias(fixeAssetDescription);
  //   await fixedAssetsPage.selectFixedAssetLocation('VICAR LANE');
  //   await fixedAssetsPage.selectFixedAssetSorting('Grattan');
  //   await fixedAssetsPage.selectFixedAssetSorting2('NA');
  //   // await page.waitForTimeout(9000);
  //   await fixedAssetsPage.clickBooksButton()
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   // await requisitionPage.clickFinancialDimensions();
  //   await fixedAssetsPage.enterBusinessUnit('HDQ');
  //   await fixedAssetsPage.enterCostCenter('QHO');
  //   await fixedAssetsPage.enterPublications('NA');

  //   await fixedAssetsPage.clickSaveButton();
  //   await fixedAssetsPage.clickBackButtonBooksPage();
  //   await page.waitForTimeout(4000);
  //   await fixedAssetsPage.clickBackButtonFAPage();
  // });

  // test('Create Fixed Asset Journal', async ({ page }) => {
  //   //*****************Create Journal FA*/
  //   const navigationPage = new NavigationPage(page);
  //   const requisitionPage = new PurchaseRequisitionPage(page);
  //   const fixedAssetsPage = new FixedAssetsPage(page);
  //   const fixedAssetName = readEnvVariable('FIXED_ASSET_NAME');
  //   console.log(`Updated PR_NAME: ${fixedAssetName}`);
  //   navigationPage.openModulesMenu();
  //   await clickMenuItem(page, 'Fixed assets', false);
  //   await page.waitForTimeout(5000);
  //   await expandMenuIfCollapsed(page, 'Journal entries', 'Fixed assets journal');
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   await navigationPage.clickNewButton();
  //   await fixedAssetsPage.selectFixedAssetJournalName('FXA');

  //   const random4Digit3 = Math.floor(1000 + Math.random() * 9000);
  //   console.log(`Random 4-digit number: ${random4Digit3}`);
  //   await fixedAssetsPage.enterJournalFixedAssetDescription("JournalFA-" + random4Digit3);
  //   await fixedAssetsPage.clickFixedAssetJournalLine();
  //   await navigationPage.waitUntilProcessingMessageDisappears();

  //   var journalDate = getFormattedDateOffset(-1);
  //   console.log(`Journal Date: ${journalDate}`);
  //   await fixedAssetsPage.enterJournalDate(journalDate);
  //   if (!fixedAssetName) {
  //     throw new Error('FIXED_ASSET_NAME environment variable is not set');
  //   }
  //   await fixedAssetsPage.enterAndSelectAccountNumberJournal(fixedAssetName);
  //   await fixedAssetsPage.enterDebitAmountJournal('15000.00');
  //   await fixedAssetsPage.clickValidateButton();
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   const message3 = await requisitionPage.checkMessageBar();
  //   expect(message3).toContain("Journal is OK.");
  //   await fixedAssetsPage.clickPostButton();
  //   await fixedAssetsPage.clickBackButtonUnderMainMenu();

  // });

  // test('Create Fixed Asset Journal Scrap', async ({ page }) => {
  //   //*****************Create Journal FA Scrapping*/
  //   const navigationPage = new NavigationPage(page);
  //   const requisitionPage = new PurchaseRequisitionPage(page);
  //   const fixedAssetsPage = new FixedAssetsPage(page);
  //   const fixedAssetName = readEnvVariable('FIXED_ASSET_NAME');
  //   navigationPage.openModulesMenu();
  //   await clickMenuItem(page, 'Fixed assets', false);
  //   await page.waitForTimeout(5000);
  //   await expandMenuIfCollapsed(page, 'Journal entries', 'Fixed assets journal');
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   await navigationPage.clickNewButton();
  //   await fixedAssetsPage.selectFixedAssetJournalName('FXA');

  //   const random4Digit2 = Math.floor(1000 + Math.random() * 9000);
  //   console.log(`Random 4-digit number: ${random4Digit2}`);
  //   await fixedAssetsPage.enterJournalFixedAssetDescription(random4Digit2 + "Scraping");
  //   await fixedAssetsPage.clickFixedAssetJournalLine();
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   if (!fixedAssetName) {
  //     throw new Error('FIXED_ASSET_NAME environment variable is not set');
  //   }
  //   var journalDate = getFormattedDateOffset(-1);
  //   console.log(`Journal Date: ${journalDate}`);
  //   await fixedAssetsPage.enterJournalDate(journalDate);
  //   await fixedAssetsPage.enterAndSelectTransactionType('Disposal - scrap');
  //   await fixedAssetsPage.enterAndSelectAccountNumberJournal(fixedAssetName);
  //   await fixedAssetsPage.enterDebitAmountJournal('00.00');
  //   await fixedAssetsPage.clickValidateButton();
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   const message = await requisitionPage.checkMessageBar();
  //   expect(message).toContain("Journal is OK.");
  //   await fixedAssetsPage.clickPostButton();
  //   await fixedAssetsPage.clickBackButtonUnderMainMenu();
  // });


  //********************************Create FA Journal Disposal - Sale */
  test('Create Fixed Asset Journal Sale', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const requisitionPage = new PurchaseRequisitionPage(page);
    const fixedAssetsPage = new FixedAssetsPage(page);
    const fixedAssetName = process.env.FIXED_ASSET_NAME;

    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'Fixed assets', false);
    await page.waitForTimeout(5000);
    await expandMenuIfCollapsed(page, 'Journal entries', 'Fixed assets journal');
    await navigationPage.waitUntilProcessingMessageDisappears();
    await navigationPage.clickNewButton();
    await fixedAssetsPage.selectFixedAssetJournalName('FXA');

    const random4Digit2 = Math.floor(1000 + Math.random() * 9000);
    console.log(`Random 4-digit number: ${random4Digit2}`);
    await fixedAssetsPage.enterJournalFixedAssetDescription(random4Digit2 + "Sale");
    await fixedAssetsPage.clickFixedAssetJournalLine();
    await navigationPage.waitUntilProcessingMessageDisappears();

    var journalDate = getFormattedDateOffset(-0);
    console.log(`Journal Date: ${journalDate}`);
    await fixedAssetsPage.enterJournalDate(journalDate);
    if (!fixedAssetName) {
      throw new Error('FIXED_ASSET_NAME environment variable is not set');
    }
    await fixedAssetsPage.enterAndSelectTransactionType('Disposal - sale');
    await fixedAssetsPage.enterAndSelectAccountNumberJournal(fixedAssetName);
    await fixedAssetsPage.enterCreditAmountJournal('100');
    await fixedAssetsPage.clickAndWaitForBookIdToAppear();
    await fixedAssetsPage.enterAndSelectOffsetAccountType('Ledger');

    await fixedAssetsPage.enteroffsetAccountNumber('630003-HDQ-QHO-NA');

    await fixedAssetsPage.clickValidateButton();
    await navigationPage.waitUntilProcessingMessageDisappears();
    const message = await requisitionPage.checkMessageBar();
    const cleaned = message.replace(/\s+/g, ' ').trim();
    expect(cleaned).toContain("Operation completed Journal is OK.");
    await fixedAssetsPage.clickPostButton();
    const message2 = await requisitionPage.checkMessageBar();
    const cleanedw = message2.replace(/\s+/g, ' ').trim();
    expect(cleanedw).toContain("Operation completed Number of vouchers posted to the journal: 1 Operation completed");
    await fixedAssetsPage.clickBackButtonUnderMainMenu();












    // const preRquisi tionName = await requisitionPage.fillRequisitionName();
    // console.log(`Requisition Name: ${preRquisitionName}`);
    // setEnvVariable('PR_NAME', preRquisitionName);
    //   await requisitionPage.clickCapexToggle();
    //   await requisitionPage.submitRequisition();
    //   await navigationPage.waitUntilProcessingMessageDisappears();
    //   const actualTitle = await requisitionPage.getHeaderTitle();
    //   expect(actualTitle).toContain(preRquisitionName);

    //   await requisitionPage.setAndSelectBusinessJustificationReason('Business Justification');
    //   const justificationDetails = `** Capex PR ${preRquisitionName}`;
    //   console.log('Filling justification:', justificationDetails);
    //   await requisitionPage.enterBusinessJustificationHeaderDetails(justificationDetails);

    //   await requisitionPage.clickAddNewPRLineButton();
    //   await navigationPage.waitUntilProcessingMessageDisappears();


    //   await requisitionPage.selectItemName('101100');

    //   await requisitionPage.selectSupplier('TT118');
    //   await requisitionPage.enterPurchaseQuantity('100');
    //   await requisitionPage.selectCapexNum('2350');
    //   await requisitionPage.clickFinancialDimensions();
    //   await requisitionPage.enterBusinessUnit('HDQ');
    //   await requisitionPage.enterCostCenter('FPC');
    //   await requisitionPage.enterPublications('NA');
    //   await navigationPage.clickSaveButton();
    //   await navigationPage.waitUntilProcessingMessageDisappears();
    //   await page.waitForTimeout(2000);
    //   await navigationPage.clickBackButton();
    //   await selectQuickFilter(page, preRquisitionName, 'Name');
    //   await page.waitForTimeout(2000);
    //   await checkMatchingRow(page, preRquisitionName);
    //   await requisitionPage.clickWorkflow()
    //   await requisitionPage.getSpanByLabel("Submit");
    //   const message = await requisitionPage.checkMessageBar();
    //   expect(message).toBe("Operation completed");

    //   await requisitionPage.clickSubmitButton()
    //   // await requisitionPage.clickSubmitButtonOnWorkflowDialog();
    //   await navigationPage.waitUntilProcessingMessageDisappears();

    // });



    // test('Create Good Receipt For Capex PR', async ({ page }) => {
    //   const navigationPage = new NavigationPage(page);
    //   const requisitionPage = new PurchaseRequisitionPage(page);
    //   const prName = readEnvVariable('PR_NAME');
    //   console.log(`Updated PR_NAME: ${prName}`);
    //   navigationPage.openModulesMenu();
    //   await clickMenuItem(page, 'Procurement and sourcing', false);
    //   await clickMenuItem(page, 'Purchase requisitions', true);
    //   await clickMenuItem(page, 'Purchase requisitions prepared by me', false);
    //   await navigationPage.waitUntilProcessingMessageDisappears();
    //   await expect(navigationPage.isElementVisible).toBeVisible();

    //   if (!prName) {
    //     throw new Error('PR_NAME environment variable is not set');
    //   }
    //   await selectQuickFilter(page, prName, 'Name');
    //   await page.waitForTimeout(2000);
    //   await checkMatchingRow(page, prName);
    //   const purchaseRequisitionId = requisitionPage.getPurchaseRequisitionId()
    //   console.log(`Purchase Requisition ID: ${purchaseRequisitionId}`);
    //   await requisitionPage.clickWorkflow()

    //   await requisitionPage.getSpanByLabel("Workflow history");
    //   await navigationPage.waitUntilProcessingMessageDisappears();
    //   await requisitionPage.waitForPendingStatusRowAndSelect();
    //   await requisitionPage.clickReassignWorkItem();
    //   await navigationPage.waitUntilProcessingMessageDisappears();
    //   await requisitionPage.enterUserName('ETXP001');
    //   await requisitionPage.clickActionButton();

    //   await requisitionPage.waitForStatusContains("Pending");
    //   await navigationPage.clickHomeButton();
    //   await navigationPage.waitUntilProcessingMessageDisappears();

    //   if (purchaseRequisitionId) {
    //     const approvalLink = await requisitionPage.getApprovalRequestLink(await purchaseRequisitionId + ".");
    //     await approvalLink.click();
    //     await navigationPage.waitUntilProcessingMessageDisappears();
    //   } else {
    //     throw new Error('Purchase Requisition ID is null');
    //   }
    //   await page.waitForTimeout(2000);
    //   await requisitionPage.clickWorkflow()
    //   await page.waitForTimeout(2000);
    //   await requisitionPage.getSpanByLabel("Approve");
    //   await navigationPage.waitUntilProcessingMessageDisappears();
    //   await requisitionPage.clickActionButton();
    //   await navigationPage.waitUntilProcessingMessageDisappears();



    //   ///********e*********Again the same code */

    //   navigationPage.openModulesMenu();
    //   await clickMenuItem(page, 'Procurement and sourcing', false);
    //   await clickMenuItem(page, 'Purchase requisitions', true);
    //   await clickMenuItem(page, 'Purchase requisitions prepared by me', false);
    //   await navigationPage.waitUntilProcessingMessageDisappears();
    //   await expect(navigationPage.isElementVisible).toBeVisible();

    //   await selectQuickFilter(page, prName, 'Name');
    //   await page.waitForTimeout(2000);
    //   await checkMatchingRow(page, prName);
    //   // const purchaseRequisitionId = requisitionPage.getPurchaseRequisitionId()
    //   // console.log(`Purchase Requisition ID: ${purchaseRequisitionId}`);
    //   await requisitionPage.clickWorkflow()
    //   await page.waitForTimeout(2000);
    //   await requisitionPage.getSpanByLabel("Workflow history");
    //   await navigationPage.waitUntilProcessingMessageDisappears();


    //   // //////*******************from here debug */
    //   await requisitionPage.waitForPendingStatusRowAndSelect();
    //   await requisitionPage.clickReassignWorkItem();
    //   await navigationPage.waitUntilProcessingMessageDisappears();
    //   await requisitionPage.enterUserName('ETXP001');
    //   await requisitionPage.clickActionButton();

    //   // await requisitionPage.waitForStatusContains("Pending");
    //   await navigationPage.clickHomeButton();
    //   await navigationPage.waitUntilProcessingMessageDisappears();

    //   if (purchaseRequisitionId) {
    //     const approvalLink = await requisitionPage.getApprovalRequestLink(await purchaseRequisitionId + ".");
    //     await approvalLink.click();
    //     await navigationPage.waitUntilProcessingMessageDisappears();
    //   } else {
    //     throw new Error('Purchase Requisition ID is null');
    //   }
    //   await page.waitForTimeout(2000);
    //   await requisitionPage.clickWorkflow()
    //   await page.waitForTimeout(2000);
    //   await requisitionPage.getSpanByLabel("Approve");
    //   await navigationPage.waitUntilProcessingMessageDisappears();
    //   await requisitionPage.clickActionButton();
    //   await navigationPage.waitUntilProcessingMessageDisappears();



    //   //****************************Purchase Order  */

    //   navigationPage.openModulesMenu();
    //   await clickMenuItem(page, 'Procurement and sourcing', false);
    //   await clickMenuItem(page, 'Purchase requisitions', true);
    //   await clickMenuItem(page, 'Purchase requisitions prepared by me', false);
    //   await navigationPage.waitUntilProcessingMessageDisappears();
    //   await expect(navigationPage.isElementVisible).toBeVisible();
    //   await selectQuickFilter(page, prName, 'Name');
    //   await page.waitForTimeout(2000);
    //   await checkMatchingRow(page, prName);
    //   await requisitionPage.clickOnPurchaseRequisition();
    //   await navigationPage.waitUntilProcessingMessageDisappears();

    //   await requisitionPage.waitForPOLinkInPRDetailsAndClick();
    //   await navigationPage.waitUntilProcessingMessageDisappears();
    //   await requisitionPage.clickPurchaseButton();
    //   await requisitionPage.clickConfirmPoButton();
    //   await requisitionPage.waitForDialogBoxToHide();
    //   const isOperationCompletedMessageDisplayedOnPOPage = await requisitionPage.checkMessageBar();
    //   expect(isOperationCompletedMessageDisplayedOnPOPage).toBe("Operation completed");
    //   await requisitionPage.clickReceiveButton();
    //   await requisitionPage.clickProductReceiptButton();
    //   await navigationPage.waitUntilProcessingMessageDisappears();
    //   const randomString = Math.random().toString(36).substring(2, 6).toUpperCase();
    //   const capexGRName = `capexgr${randomString}`;
    //   await requisitionPage.enterProductReceiptText(capexGRName);
    //   await requisitionPage.enterGoodRecieveQuantity('50.00');
    //   await requisitionPage.submitRequisition();
    //   await navigationPage.waitUntilProcessingMessageDisappears();

    //   await requisitionPage.clickJournalProductReceiptButton();
    //   await requisitionPage.clickVouchersButton();
    //   await navigationPage.waitUntilProcessingMessageDisappears();
    //   await requisitionPage.waitForJournalVoucherRowsOnGoodReceipt();
    //   const matchedQuantity = await requisitionPage.isAmountInputWithValuePresent('-50.00');
    //   console.log(`Matched Quantity: ${matchedQuantity}`);
    //   expect(matchedQuantity).toBe(true);

  });

});
