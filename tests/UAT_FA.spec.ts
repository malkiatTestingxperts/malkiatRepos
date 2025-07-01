// PurchaseRequisitionTest.spec.ts
import { test, expect, Page } from '@playwright/test';
import { NavigationPage } from '../utils/NavigationPage';
import { selectQuickFilter, checkRowWithMachedText } from '../utils/Filter';
import { clickMenuItem } from '../utils/MainMenu';
import { expandMenuIfCollapsed } from '../utils/MainMenu';
import { DateHelper } from '../utils/DateHelper';
import { PurchaseRequisitionPage } from '../pages/PurchaseRequisitionPage';
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


  // test('Create Fixed Asset', async ({ page }) => {


  //   const navigationPage = new NavigationPage(page);
  //   const requisitionPage = new PurchaseRequisitionPage(page);
  //   const fixedAssetsPage = new FixedAssetsPage(page);
  //   for (let i = 1; i <= 4; i++) {
  //     navigationPage.openModulesMenu();
  //     await clickMenuItem(page, 'Fixed assets', false);
  //     await page.waitForTimeout(5000);
  //     await expandMenuIfCollapsed(page, 'Fixed assets', 'Fixed assets');


  //     await navigationPage.waitUntilProcessingMessageDisappears();
  //     await expect(navigationPage.actionsGroupNewButton).toBeVisible();
  //     await navigationPage.clickNewButton();
  //     await navigationPage.waitUntilProcessingMessageDisappears();
  //     await fixedAssetsPage.selectFixedAssetGroup('Operational ');
  //     const random5Digit = Math.floor(10000 + Math.random() * 90000);
  //     console.log(`Random 4-digit number: ${random5Digit}`);
  //     let capexNumber = random5Digit.toString() + i
  //     setEnvVariable('CAPEX_NUMBER' + i, capexNumber);
  //     await fixedAssetsPage.enterCapexNumber(capexNumber);

  //     const randomString = Math.random().toString(36).substring(2, 6).toUpperCase();
  //     const fixeAssetDescription = `CCTV Expansion${randomString}` + i;
  //     console.log(`fixed asset description: ${fixeAssetDescription}`);
  //     setEnvVariable('FIXED_ASSET_NAME' + i, fixeAssetDescription);
  //     await fixedAssetsPage.enterFADescr(fixeAssetDescription);
  //     await fixedAssetsPage.enterFADescrAlias(fixeAssetDescription);
  //     await fixedAssetsPage.selectFixedAssetLocation('VICAR LANE');
  //     await fixedAssetsPage.selectFixedAssetSorting('Grattan');
  //     await fixedAssetsPage.selectFixedAssetSorting2('NA');
  //     // await page.waitForTimeout(9000);
  //     await fixedAssetsPage.clickBooksButton()
  //     await navigationPage.waitUntilProcessingMessageDisappears();
  //     //await requisitionPage.clickFinancialDimensions();
  //     await fixedAssetsPage.enterBusinessUnit('HDQ');
  //     await fixedAssetsPage.enterCostCenter('QHO');
  //     await fixedAssetsPage.enterPublications('NA');

  //     await fixedAssetsPage.clickSaveButton();
  //     await page.waitForTimeout(5000);
  //     await fixedAssetsPage.clickDimesionsInSecondGrid();
  //     await fixedAssetsPage.enterBusinessUnit('HDQ');
  //     await fixedAssetsPage.enterCostCenter('QHO');
  //     await fixedAssetsPage.enterPublications('NA');

  //     await fixedAssetsPage.clickSaveButton();
  //     await fixedAssetsPage.clickBackButtonBooksPage();
  //     await page.waitForTimeout(4000);
  //     await fixedAssetsPage.clickBackButtonFAPage();
  //   }
  // });


  // test('Create Fixed Asset Journal', async ({ page }) => {
  //   //*****************Create Journal FA*/
  //   const navigationPage = new NavigationPage(page);
  //   const requisitionPage = new PurchaseRequisitionPage(page);
  //   const fixedAssetsPage = new FixedAssetsPage(page);
  //   const dateHelper = new DateHelper(page);
  //   for (let i = 1; i <= 4; i++) {
  //     const fixedAssetName = readEnvVariable('FIXED_ASSET_NAME' + i);
  //     console.log(`Updated FIXED_ASSET_NAME: ${fixedAssetName}`);
  //     navigationPage.openModulesMenu();
  //     await clickMenuItem(page, 'Fixed assets', false);
  //     await page.waitForTimeout(5000);
  //     await expandMenuIfCollapsed(page, 'Journal entries', 'Fixed assets journal');
  //     await navigationPage.waitUntilProcessingMessageDisappears();
  //     await navigationPage.clickNewButton();
  //     await fixedAssetsPage.selectFixedAssetJournalName('FXA');

  //     const random4Digit3 = Math.floor(1000 + Math.random() * 9000);
  //     console.log(`Random 4-digit number: ${random4Digit3}`);
  //     await fixedAssetsPage.enterJournalFixedAssetDescription("JournalFA-" + random4Digit3);
  //     await fixedAssetsPage.clickFixedAssetJournalLine();
  //     await navigationPage.waitUntilProcessingMessageDisappears();

  //     var journalDate = dateHelper.getFormattedDateOffset(-0);
  //     console.log(`Journal Date: ${journalDate}`);
  //     await fixedAssetsPage.enterJournalDate(journalDate);
  //     if (!fixedAssetName) {
  //       throw new Error('FIXED_ASSET_NAME environment variable is not set');
  //     }
  //     await fixedAssetsPage.enterAndSelectAccountNumberJournal(fixedAssetName);
  //     await fixedAssetsPage.enterDebitAmountJournal('15000.00');
  //     await fixedAssetsPage.clickValidateButton();
  //     await navigationPage.waitUntilProcessingMessageDisappears();
  //     const message3 = await requisitionPage.checkMessageBar();
  //     expect(message3).toContain("Journal is OK.");
  //     await fixedAssetsPage.clickPostButton();
  //     await fixedAssetsPage.clickBackButtonUnderMainMenu();
  //   }
  // });

  // test('Create Fixed Asset Journal Scrap', async ({ page }) => {
  //   //*****************Create Journal FA Scrapping*/
  //   const navigationPage = new NavigationPage(page);
  //   const requisitionPage = new PurchaseRequisitionPage(page);
  //   const fixedAssetsPage = new FixedAssetsPage(page);
  //   const dateHelper = new DateHelper(page);
  //   const fixedAssetName = readEnvVariable('FIXED_ASSET_NAME1');
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
  //     throw new Error('FIXED_ASSET_NAME1 environment variable is not set');
  //   }
  //   var journalDate = dateHelper.getFormattedDateOffset(-0);
  //   console.log(`Journal Date: ${journalDate}`);
  //   await fixedAssetsPage.enterJournalDate(journalDate);
  //   await fixedAssetsPage.enterAndSelectTransactionType('Disposal - scrap');
  //   await fixedAssetsPage.enterAndSelectAccountNumberJournal(fixedAssetName);
  //   await fixedAssetsPage.enterDebitAmountJournal('00');
  //   await fixedAssetsPage.clickAndWaitForBookIdToAppear();
  //   await fixedAssetsPage.enterAndSelectOffsetAccountType('Ledger');
  //   await fixedAssetsPage.clickValidateButton();
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   const message = await requisitionPage.checkMessageBar();
  //   expect(message).toContain("Journal is OK.");
  //   await fixedAssetsPage.clickPostButton();
  //   await fixedAssetsPage.clickBackButtonUnderMainMenu();
  // });


  // // //********************************Create FA Journal Disposal - Sale */
  // test('Create Fixed Asset Journal Sale', async ({ page }) => {
  //   const navigationPage = new NavigationPage(page);
  //   const requisitionPage = new PurchaseRequisitionPage(page);
  //   const fixedAssetsPage = new FixedAssetsPage(page);
  //   const dateHelper = new DateHelper(page);
  //   const fixedAssetName = readEnvVariable('FIXED_ASSET_NAME2');
  //   navigationPage.openModulesMenu();
  //   await clickMenuItem(page, 'Fixed assets', false);
  //   await page.waitForTimeout(5000);
  //   await expandMenuIfCollapsed(page, 'Journal entries', 'Fixed assets journal');
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   await navigationPage.clickNewButton();
  //   await fixedAssetsPage.selectFixedAssetJournalName('FXA');

  //   const random4Digit2 = Math.floor(1000 + Math.random() * 9000);
  //   console.log(`Random 4-digit number: ${random4Digit2}`);
  //   await fixedAssetsPage.enterJournalFixedAssetDescription(random4Digit2 + "Sale");
  //   await fixedAssetsPage.clickFixedAssetJournalLine();
  //   await navigationPage.waitUntilProcessingMessageDisappears();

  //   var journalDate = dateHelper.getFormattedDateOffset(-0);
  //   console.log(`Journal Date: ${journalDate}`);
  //   await fixedAssetsPage.enterJournalDate(journalDate);
  //   if (!fixedAssetName) {
  //     throw new Error('FIXED_ASSET_NAME environment variable is not set');
  //   }
  //   await fixedAssetsPage.enterAndSelectTransactionType('Disposal - sale');
  //   await fixedAssetsPage.enterAndSelectAccountNumberJournal(fixedAssetName);
  //   await fixedAssetsPage.enterCreditAmountJournal('100');
  //   await fixedAssetsPage.clickAndWaitForBookIdToAppear();
  //   await fixedAssetsPage.enterAndSelectOffsetAccountType('Ledger');

  //   await fixedAssetsPage.enteroffsetAccountNumber('630003-HDQ-QHO-NA');

  //   await fixedAssetsPage.clickValidateButton();
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   const message = await requisitionPage.checkMessageBar();
  //   const cleaned = message.replace(/\s+/g, ' ').trim();
  //   expect(cleaned).toContain("Operation completed Journal is OK.");
  //   await fixedAssetsPage.clickPostButton();
  //   const message2 = await requisitionPage.checkMessageBar();
  //   const cleanedw = message2.replace(/\s+/g, ' ').trim();
  //   expect(cleanedw).toContain("Operation completed Number of vouchers posted to the journal: 1 Operation completed");
  //   await fixedAssetsPage.clickBackButtonUnderMainMenu();
  // });



  // //************************ Validate both sale and disposed ************ */


  // test('Valuations Validations for Sale and Scrap FA', async ({ page }) => {
  //   const navigationPage = new NavigationPage(page);
  //   const requisitionPage = new PurchaseRequisitionPage(page);
  //   const fixedAssetsPage = new FixedAssetsPage(page);
  //   const fixedAssetNameSale = readEnvVariable('FIXED_ASSET_NAME2');
  //   const fixedAssetNameScrap = readEnvVariable('FIXED_ASSET_NAME1');
  //   if (!fixedAssetNameSale || !fixedAssetNameScrap) {
  //     throw new Error('Either FIXED_ASSET_NAME_SALE or FIXED_ASSET_NAME_SCRAP must be set');
  //   }
  //   navigationPage.openModulesMenu();
  //   await clickMenuItem(page, 'Fixed assets', false);
  //   await page.waitForTimeout(5000);
  //   await expandMenuIfCollapsed(page, 'Fixed assets', 'Fixed assets');
  //   await navigationPage.waitUntilProcessingMessageDisappears();

  //   await selectQuickFilter(page, fixedAssetNameSale, 'Name');
  //   await fixedAssetsPage.clickValuationAssetButton();
  //   let values = await fixedAssetsPage.getDisposalSaleValue();
  //   expect(values).toEqual(["-100.00", "-100.00"]);
  //   await fixedAssetsPage.clickBackButtonOnValuationPage();

  //   await selectQuickFilter(page, fixedAssetNameScrap, 'Name');
  //   await fixedAssetsPage.clickValuationAssetButton();
  //   let valuesScrap = await fixedAssetsPage.getDisposalSaleValue();
  //   expect(valuesScrap).toEqual(["0.00", "0.00"]);

  // });













  // //********************************Splitting functionality */
  // test('Verify the splitting functionality', async ({ page }) => {
  //   const navigationPage = new NavigationPage(page);
  //   const fixedAssetsPage = new FixedAssetsPage(page);
  //   const fixedAssetNameSplit = readEnvVariable('FIXED_ASSET_NAME4');
  //   const fixedAssetNumber = readEnvVariable('CAPEX_NUMBER4');

  //   if (!fixedAssetNameSplit || !fixedAssetNumber) {
  //     throw new Error('Either FIXED_ASSET_NAME3 or CAPEX_NUMBER3 must be set');
  //   }
  //   navigationPage.openModulesMenu();
  //   await clickMenuItem(page, 'Fixed assets', false);
  //   await page.waitForTimeout(5000);
  //   await expandMenuIfCollapsed(page, 'Fixed assets', 'Fixed assets');
  //   await navigationPage.waitUntilProcessingMessageDisappears();

  //   await selectQuickFilter(page, fixedAssetNameSplit, 'Name');
  //   await fixedAssetsPage.clickCopyFixedAsset();
  //   await fixedAssetsPage.enterCopyFixedAssetName(fixedAssetNumber + "(a)");
  //   await fixedAssetsPage.clickCopyFixedAssetOkButton();

  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   await checkRowWithMachedText(page, fixedAssetNumber, 'Capex number', 0);
  //   await fixedAssetsPage.clickBooksButton();
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   await fixedAssetsPage.clickFunctionsButton();
  //   await fixedAssetsPage.clickSplitButton();
  //   await fixedAssetsPage.enterToAssetId(fixedAssetNumber + " (a)");
  //   await fixedAssetsPage.enterToBookId("IFRS");
  //   await fixedAssetsPage.enterPercentageBox("50");
  //   await fixedAssetsPage.enterJournalName("FXA-OP");
  //   await fixedAssetsPage.clickOkButtonFromFromGrid();
  //   const message1 = await fixedAssetsPage.checkMessageBar();
  //   expect(message1).toContain("The split fixed asset transactions have been placed in journal FXA-OP");
  //   await fixedAssetsPage.clickDimesionsInSecondGrid();
  //   await fixedAssetsPage.clickFunctionsButton();
  //   await fixedAssetsPage.clickSplitButton();
  //   await fixedAssetsPage.enterToAssetId(fixedAssetNumber + " (a)");
  //   await fixedAssetsPage.enterToBookId("UK");
  //   await fixedAssetsPage.enterPercentageBox("50");
  //   await fixedAssetsPage.enterJournalName("FXA");
  //   await fixedAssetsPage.clickOkButtonFromFromGrid();
  //   const message2 = await fixedAssetsPage.checkMessageBar();
  //   expect(message2).toContain("The split fixed asset transactions have been placed in journal FXA, number");
  // });



  // //*************************************Post the Splitted FA's */
  // test('Post the both splitted Fixed Asset Journals', async ({ page }) => {
  //   const navigationPage = new NavigationPage(page);
  //   const fixedAssetsPage = new FixedAssetsPage(page);
  //   const fixedAssetNameSplit = readEnvVariable('FIXED_ASSET_NAME4');
  //   const fixedAssetNumber = readEnvVariable('CAPEX_NUMBER4');
  //   if (!fixedAssetNameSplit || !fixedAssetNumber) {
  //     throw new Error('Either FIXED_ASSET_NAME4 or CAPEX_NUMBER4 must be set');
  //   }
  //   navigationPage.openModulesMenu();
  //   await clickMenuItem(page, 'Fixed assets', false);
  //   await page.waitForTimeout(5000);
  //   await expandMenuIfCollapsed(page, 'Journal entries', 'Fixed assets journal');
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   await fixedAssetsPage.clickCheckBoxOnMyUserCreated();
  //   await fixedAssetsPage.clickAndSelectOptionFromDropDownForFixedAssetJournal('Not posted');
  //   await fixedAssetsPage.sortJournalBatchNumberWithDescendingOrder();
  //   await fixedAssetsPage.selectJournalNumberFromList(0);
  //   await postFixedAssetJournalAndVerify(page);
  //   await fixedAssetsPage.selectJournalNumberFromList(0);
  //   await page.waitForTimeout(5000);
  // });





  // //********************************Proposal Depriciation UK */
  // test('Verify Proposal Depriciation Functionality For UK', async ({ page }) => {
  //   const navigationPage = new NavigationPage(page);
  //   const fixedAssetsPage = new FixedAssetsPage(page);
  //   const requisitionPage = new PurchaseRequisitionPage(page);
  //   const dateHelper = new DateHelper(page);
  //   const menusOption = new PageMenus(page);
  //   const fixedAssetNameSplit = readEnvVariable('FIXED_ASSET_NAME3');
  //   const fixedAssetNumber = readEnvVariable('CAPEX_NUMBER3');

  //   if (!fixedAssetNameSplit || !fixedAssetNumber) {
  //     throw new Error('Either FIXED_ASSET_NAME3 or CAPEX_NUMBER3 must be set');
  //   }
  //   navigationPage.openModulesMenu();
  //   await clickMenuItem(page, 'Fixed assets', false);
  //   await page.waitForTimeout(5000);
  //   await expandMenuIfCollapsed(page, 'Journal entries', 'Fixed assets journal');
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   await navigationPage.clickNewButton();
  //   await fixedAssetsPage.selectFixedAssetJournalName('FXA');

  //   const random4Digit3 = Math.floor(1000 + Math.random() * 9000);
  //   console.log(`Random 4-digit number: ${random4Digit3}`);
  //   await fixedAssetsPage.enterJournalFixedAssetDescription(random4Digit3 + "ProposalCheck");
  //   await fixedAssetsPage.clickFixedAssetJournalLine();
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   await menusOption.clickMenuSubMenuOptionOnSpecificPage("Proposals", "Depreciation proposal");
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   await fixedAssetsPage.clickCheckBoxSummariseDepreciation();
  //   await dateHelper.setDateInput(-4,'Dialog');
  //   await fixedAssetsPage.clickDepreciationFilterButton();
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   await verifyDepriciationProposal(page, 'UK');
  //   await page.waitForTimeout(65000);
  //   await fixedAssetsPage.clickPostButton();
  //   const message2 = await fixedAssetsPage.checkMessageBar();
  //   expect(message2).toContain("Operation completed");
  // });

  // //********************************Proposal Depriciation IFRS */
  // test('Verify Proposal Depriciation Functionality For IFRS', async ({ page }) => {
  //   const navigationPage = new NavigationPage(page);
  //   const fixedAssetsPage = new FixedAssetsPage(page);
  //   const requisitionPage = new PurchaseRequisitionPage(page);
  //   const dateHelper = new DateHelper(page);
  //   const menusOption = new PageMenus(page);
  //   const fixedAssetNameSplit = readEnvVariable('FIXED_ASSET_NAME3');
  //   const fixedAssetNumber = readEnvVariable('CAPEX_NUMBER3');

  //   if (!fixedAssetNameSplit || !fixedAssetNumber) {
  //     throw new Error('Either FIXED_ASSET_NAME3 or CAPEX_NUMBER3 must be set');
  //   }
  //   navigationPage.openModulesMenu();
  //   await clickMenuItem(page, 'Fixed assets', false);
  //   await page.waitForTimeout(5000);
  //   await expandMenuIfCollapsed(page, 'Journal entries', 'Fixed assets journal');
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   await navigationPage.clickNewButton();
  //   await fixedAssetsPage.selectFixedAssetJournalName('FXA');

  //   const random4Digit3 = Math.floor(1000 + Math.random() * 9000);
  //   console.log(`Random 4-digit number: ${random4Digit3}`);
  //   await fixedAssetsPage.enterJournalFixedAssetDescription(random4Digit3 + "ProposalCheck");
  //   await fixedAssetsPage.clickFixedAssetJournalLine();
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   await menusOption.clickMenuSubMenuOptionOnSpecificPage("Proposals", "Depreciation proposal");
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   await fixedAssetsPage.clickCheckBoxSummariseDepreciation();
  //   await dateHelper.setDateInput(-4,'Dialog');
  //   await fixedAssetsPage.clickDepreciationFilterButton();
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   await verifyDepriciationProposal(page, 'IFRS');
  // });


  // //********************************Reports */
  //*******************************Fixed Asset Balance  */
  // test('Verify Fixed Assets Balance Report', async ({ page }) => {
  //   const navigationPage = new NavigationPage(page);
  //   const fixedAssetsPage = new FixedAssetsPage(page);
  //   const requisitionPage = new PurchaseRequisitionPage(page);
  //   const dateHelper = new DateHelper(page);
  //   const menusOption = new PageMenus(page);
  //   const fixedAssetNameSplit = readEnvVariable('FIXED_ASSET_NAME3');
  //   const fixedAssetNumber = readEnvVariable('CAPEX_NUMBER4');
  //   if (!fixedAssetNameSplit || !fixedAssetNumber) {
  //     throw new Error('Either FIXED_ASSET_NAME3 or CAPEX_NUMBER3 must be set');
  //   }
  //   navigationPage.openModulesMenu();
  //   await clickMenuItem(page, 'Fixed assets', false);
  //   await page.waitForTimeout(5000);
  //   await expandMenuIfCollapsed(page, 'Inquiries and reports', 'Fixed asset balances');
  //   await navigationPage.waitUntilProcessingMessageDisappears();
  //   await fixedAssetsPage.clickButtonRecordsToInclude();
  //   await fixedAssetsPage.clickDepreciationFilterButton();
  //   let arrayAssetNumberToPass = fixedAssetNumber + ".." + fixedAssetNumber + "(a)";
  //   await fixedAssetsPage.enterFilterInBalanceReport(1, arrayAssetNumberToPass);
  //   await fixedAssetsPage.fixedAssetBalanceReportPage();
  //   const pdfText = await ReadPdf(page);
  //   const expectedValues = ["7,500", "15,000"];
  //   for (const expected of expectedValues) {
  //     expect(pdfText).toContain(expected);
  //   }
  //   await DeletePdf(page, "D:\\fgh_automation\\test-data\\downloaded.pdf");
  // });




  //*******************************Fixed Asset Summary  */
  test('Verify Fixed Assets Summary Report', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    const fixedAssetsPage = new FixedAssetsPage(page);
    const requisitionPage = new PurchaseRequisitionPage(page);
    const dateHelper = new DateHelper(page);
    const menusOption = new PageMenus(page);
    const fixedAssetNameSplit = readEnvVariable('FIXED_ASSET_NAME3');
    const fixedAssetNumber = readEnvVariable('CAPEX_NUMBER4');
    if (!fixedAssetNameSplit || !fixedAssetNumber) {
      throw new Error('Either FIXED_ASSET_NAME3 or CAPEX_NUMBER3 must be set');
    }
    navigationPage.openModulesMenu();
    await clickMenuItem(page, 'Fixed assets', false);
    await page.waitForTimeout(5000);
    await expandMenuIfCollapsed(page, 'Inquiries and reports', 'FGH Fixed asset summary');
    await navigationPage.waitUntilProcessingMessageDisappears();
    console.log('Setting date input...');
    await dateHelper.setDateInput(0, 'StartDate');

    console.log('Entering asset book ID...');

    await dateHelper.setDateInput(0, 'EndDate');
    await fixedAssetsPage.enterTransactionTypeOnAssetSummaryReport('Acquisition');

    await fixedAssetsPage.enterSortCode1OnDetailedSummary('Grattan');
    await fixedAssetsPage.enterAssetBookIdDetailedSummaryReport("UK");
    await fixedAssetsPage.clickCalculateBalancesDetailedSummary();
  });













  // await selectQuickFilter(page, fixedAssetNameSplit, 'Name');
  // await fixedAssetsPage.clickCopyFixedAsset();
  // await fixedAssetsPage.enterCopyFixedAssetName(fixedAssetNumber + "(a)");
  // await fixedAssetsPage.clickCopyFixedAssetOkButton();

  // await navigationPage.waitUntilProcessingMessageDisappears();
  // await checkRowWithMachedText(page, fixedAssetNumber, 'Capex number', 0);
  // await fixedAssetsPage.clickBooksButton();
  // await navigationPage.waitUntilProcessingMessageDisappears();
  // await fixedAssetsPage.clickFunctionsButton();
  // await fixedAssetsPage.clickSplitButton();
  // await fixedAssetsPage.enterToAssetId(fixedAssetNumber + " (a)");
  // await fixedAssetsPage.enterToBookId("IFRS");
  // await fixedAssetsPage.enterPercentageBox("50");
  // await fixedAssetsPage.enterJournalName("FXA-OP");
  // await fixedAssetsPage.clickOkButtonFromFromGrid();
  // await page.waitForTimeout(5000);
  // await fixedAssetsPage.clickDimesionsInSecondGrid();
  // await fixedAssetsPage.clickFunctionsButton();
  // await fixedAssetsPage.clickSplitButton();
  // await fixedAssetsPage.enterToAssetId(fixedAssetNumber + " (a)");
  // await fixedAssetsPage.enterToBookId("UK");
  // await fixedAssetsPage.enterPercentageBox("50");
  // await fixedAssetsPage.enterJournalName("FXA");
  // await fixedAssetsPage.clickOkButtonFromFromGrid();

});
async function postFixedAssetJournalAndVerify(page: Page) {
  const navigationPage = new NavigationPage(page);
  const fixedAssetsPage = new FixedAssetsPage(page);


  await fixedAssetsPage.clickFixedAssetJournalLine();
  await navigationPage.waitUntilProcessingMessageDisappears();
  await fixedAssetsPage.clickPostButton();

  const message = await fixedAssetsPage.checkMessageBar();
  const cleaned = message.replace(/\s+/g, ' ').trim();
  expect(cleaned).toContain("Operation completed Number of vouchers posted to the journal: 2");
  await fixedAssetsPage.clickBackButtonUnderMainMenu();

}

async function verifyDepriciationProposal(page: Page, type: string) {
  const navigationPage = new NavigationPage(page);
  const fixedAssetsPage = new FixedAssetsPage(page);
  await fixedAssetsPage.enterFilterBookField(3, type);
  const message = await fixedAssetsPage.checkMessageBar();
  expect(message).toContain("Operation completed");

}





