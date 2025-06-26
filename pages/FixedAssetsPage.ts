import { get } from 'http';
import { NavigationPage } from '../utils/NavigationPage';
import { waitForWithRetry } from '../utils/waitForWithRetry';
import { waitForElementToHide } from '../utils/waitForWithRetry';
import { waitForInputValue } from '../utils/waitForWithRetry';
import { off } from 'process';
import { Locator } from '@playwright/test';

export class FixedAssetsPage {
    constructor(private page: import('@playwright/test').Page) { }

    get requisitionName() {
        return this.page.locator("[data-dyn-controlname='DialogContent'] [name='PurchReqTable_PurchReqName']");
    }

    get okButton() {
        return this.page.locator('button[data-dyn-controlname="OK"]');
    }

    get purchaseRequisitionFilter() {
        return this.page.locator('input[name="PurchReqTableQuickFilter_Input"]');
    }

    get setbusinessJustification() {
        return this.page.locator('[data-dyn-controlname="PurchReqTable_BusinessJustification_Description"] input');
    }

    get selectbusinessJustification() {
        return this.page.locator('[role="gridcell"] [data-dyn-controlname="SysGen_Reason"]');
    }

    get selectItem() {
        return this.page.locator('[role="gridcell"] [data-dyn-controlname="SysGen_ItemId"]');
    }

    get selectFinancialDimensions() {
        return this.page.locator('[data-dyn-controlname="tabFinancialDimensions_header"]');
    }

    get enterCapexNumberInFA() {

        return this.page.locator('[data-dyn-controlname="Identification_AssetId"] input');
    }

    get enterItemNumberInPRLine() {

        return this.page.locator('[data-dyn-controlname="PurchReqLine_ItemId"] input');
    }

    get enterAssetIdInPRLine() {

        return this.page.locator('[data-dyn-controlname="PurchReqLine_TMLFGH_AssetId"] input');
    }
    get enterFixedAssetGroup() {

        return this.page.locator('[data-dyn-controlname="Identification_AssetGroup"] input');
    }
    get enterFixedAssetLoc() {

        return this.page.locator('[data-dyn-controlname="Physical"] input');
    }

    get enterJournalFixedAssetName() {
        return this.page.locator('[data-dyn-controlname="JournalName"] input');
    }

    get selectFixedAssetInputGrid() {

        return this.page.locator('[data-dyn-controlname="SysGen_JournalName"] input');
    }
    get enterFixedAssetSorting() {

        return this.page.locator('[data-dyn-controlname="Sorting_SortingId"] input');
    }
    get enterFixedAssetSorting2() {

        return this.page.locator('[data-dyn-controlname="Sorting_SortingId2"] input');
    }

    get selectFixedAssetGroupFromGrid() {

        return this.page.locator('[role="gridcell"] [data-dyn-controlname="Sel"]');
    }


    get enterBusinessUnitinFinancialDimensions() {
        return this.page.locator('[data-dyn-controlname="DimensionEntryControl_DECValue_BusinessUnit"] input');
    }
    get selectBusinessUnit() {
        return this.page.locator('[role="gridcell"] [data-dyn-controlname="SysGen_BusinessUnit"]');
    }

    get selectValueInFinancialDimensions() {
        return this.page.locator('[data-dyn-controlname="ValueColumn"][data-dyn-focus="input"]');
    }

    clickPublication(labelText: string) {
        return this.page.locator(`div[data-dyn-controlname="ValueColumn"] input[value*='${labelText}']`);
    }


    get selectWorkflowButton() {
        return this.page.locator('//button//span[text()="Workflow"]');//'[data-dyn-controlname="PurchReqTableWorkflowDropDialogButtonGroup"] button');
    }

    get submitWorkFlowButton() {
        return this.page.locator('[data-dyn-controlname="PromotedAction1"]');
    }

    get submitButton() {
        return this.page.locator('[data-dyn-controlname="Submit"]');
    }
    get enterCostCenterinFinancialDimensions() {
        return this.page.locator('[data-dyn-controlname="DimensionEntryControl_DECValue_CostCenter"] input');
    }


    get messageBar() {
        return this.page.locator('[class="messageBar-messageRegion"]');
    }
    get enterPublicationinFinancialDimensions() {
        return this.page.locator('[data-dyn-controlname="DimensionEntryControl_DECValue_Publications"] input');
    }

    get purchaseRequisitionId() {
        return this.page.locator('[data-dyn-controlname="PurchReqTable_PurchReqId"] input');
    }

    clickWorkFlowRequiredButton(labelText: string) {
        return this.page.locator(`//span[@class='button-label' and text()='${labelText}']`);
    }

    get workflowStatusReassignWorkItem() {
        return this.page.locator('[data-dyn-controlname="WorkflowStatusReassignWorkItem"]');
    }

    get user() {
        return this.page.locator('[data-dyn-controlname="User"] input');
    }


    get actionButton() {
        return this.page.locator('button[data-dyn-controlname="Action"]');
    }

    get workflowStatus() {
        return this.page.locator('[data-dyn-controlname="WorkflowWorkItemTable_Status"] input');
    }

    get rowHavingPendingStatus() {
        return this.page.locator("//div[@role='row'][.//input[@aria-label='Status' and @value='Pending']]");
    }
    get clickRowHavingPendingStatus() {
        return this.page.locator("//div[@role='row'][.//input[@aria-label='Status' and @value='Pending']]//div[@role='checkbox']");
    }

    get purchaseOrderInPRDetails() {
        return this.page.locator('[data-dyn-controlname="LineViewLineDetails_References_PurchId"][role="link"]');
    }

    get purchaseRequisitionLink() {
        return this.page.locator('[data-dyn-controlname="PurchReqTable_PurchReqId"] input[class="dyn-field dyn-hyperlink _nrrlfe"]');
    }
    get enterFADescription() {

        return this.page.locator('[data-dyn-controlname="Description_Name"] input');
    }

    get enterFADescriptionAlias() {

        return this.page.locator('[data-dyn-controlname="Description_NameAlias"] input');
    }
    get receiveButton() {
        return this.page.locator('[data-dyn-controlname="Receive"][data-dyn-role="AppBarTab"]');
    }

    get purchaseButton() {
        return this.page.locator('[data-dyn-controlname="Purchase"][data-dyn-role="AppBarTab"]');
    }

    get confirmPoButton() {
        return this.page.locator('[data-dyn-controlname="buttonConfirm"][data-dyn-role="MenuItemButton"]');
    }

    get dialogBox() {
        return this.page.locator('[data-dyn-formname="SysBoxForm"][role="dialog"]');
    }


    get purchaseQuantity() {
        return this.page.locator('[data-dyn-controlname="PurchReqLine_PurchQty"] input');
    }

    get buttonProductReceipt() {
        return this.page.locator('button[name="buttonUpdatePackingSlip"]');
    }

    get productReceiptText() {
        return this.page.locator('[data-dyn-controlname="PurchParmTable_Num"] input');
    }

    get receiveQuantity() {
        return this.page.locator('[data-dyn-controlname="PurchParmLine_ReceiveNow"] input');
    }

    get buttonJournalProductReceipt() {
        return this.page.locator('[data-dyn-controlname="buttonJournalPackingSlip"]');
    }

    get buttonVouchers() {
        return this.page.locator('button[data-dyn-controlname="LedgerTransactVoucher"]');
    }

    get yearClosedColumn() {
        return this.page.locator('[data-dyn-columnname="YearClosed"]');
    }

    get enterJournalFADescription() {
        return this.page.locator('[data-dyn-controlname="LedgerJournalTable_Name"] input[id*="LedgerJournalTable"]');

    }
    get journalVoucherRow() {
        return this.page.locator('[data-dyn-controlname="LedgerTrans_AmountCur"] input');
    }

    get fixedAssetJournalLine() {
        return this.page.locator('[data-dyn-controlname="JournalLines"]');
    }
    get capexToggle() {
        return this.page.locator("//span[starts-with(@id, 'PurchReqCreate_') and contains(@id, '_Capex_toggle')]");
    }
    get journalDate() {
        return this.page.locator("[data-dyn-controlname='LedgerJournalTrans_TransDate'] input");
    }

    get selectCapexNumber() {
        return this.page.locator('[role="gridcell"] [data-dyn-controlname="SysGen_AssetId"]');
    }

    get selectAccountNumberJournal() {

        return this.page.locator('[data-dyn-controlname="LedgerJournalTrans_AccountNum"] input');
    }

    get selectTransactionType() {

        return this.page.locator('[data-dyn-controlname="LedgerJournalTrans_AssetTransType"] input');
    }
    get selectAccountNumberJournalFromGrid() {
        return this.page.locator('[data-dyn-controlname="AssetTable_Name"] input');
    }

    get selectTransactionTypeFromGrid() {
        return this.page.locator('[class*="dyn-combobox-list"] li');
    }

    get debitAmountJournal() {
        return this.page.locator('[data-dyn-controlname="LedgerJournalTrans_AmountCurDebit"] input');
    }
    get creditAmountJournal() {
        return this.page.locator('[data-dyn-controlname="LedgerJournalTrans_AmountCurCredit"] input');
    }
    get validateButton() {

        return this.page.locator('//div[@data-dyn-controlname="buttonCheckJournal"]//button//span[normalize-space(text())="Validate"]');
    }

    get validateButtonUnderMainMenu() {

        return this.page.locator('//button//span[text()="Validate" and substring(@id, string-length(@id) - string-length("_CheckJournal_label") + 1) = "_CheckJournal_label"]');
    }

    get postButton() {
        return this.page.locator('[data-dyn-controlname="PostJournal"][data-dyn-role="MenuItemButton"]');
    }

    get offsetAccount() {
        return this.page.locator('[data-dyn-controlname="LedgerJournalTrans_OffsetAccountType"] input');
    }

    get offSetAccountNumber() {
        return this.page.locator('[data-dyn-controlname="LedgerJournalTrans_OffsetAccount"] input');

    }

    get bookId() {

        return this.page.locator('[data-dyn-controlname="Grid"][data-dyn-role="ReactList"]');
    }

    get valuationAssetButton() {
        return this.page.locator('button[data-dyn-controlname="AssetHub"]');

    }

    get disposalSaleValue() {
        return this.page.locator('[data-dyn-controlname="actualDisposalSaleValue"]');

    }

    get headerBalancesOnValuationPage() {
        return this.page.locator('[data-dyn-controlname="BalancesHeader1"]');
    }

    get backButtonOnValuationPage() {
        return this.page.locator('[data-dyn-controlname="SystemDefinedButtonsActionPane"] button[data-dyn-controlname="SystemDefinedCloseButton"]');
    }

    get actionsGroupSaveButton() {
        return this.page.locator('button[data-dyn-controlname="SystemDefinedSaveButton"][id^="AssetBook_"]');
    }

    get dimesionsInSecondGrid() {
        return this.page.locator('[data-dyn-controlname="StatusComboBox"]');
    }

    get actionsGroupBackButtonBooksPage() {
        return this.page.locator('[data-dyn-controlname="SysCloseGroup"][id^="AssetBook_"]');
    }

    get actionsGroupBackButtonFAPage() {
        return this.page.locator('[data-dyn-controlname="SysCloseGroup"][id^="assettable_"]');
    }

    get actionsGroupBackButtonJournalFAPage() {
        return this.page.locator('[data-dyn-controlname="SysCloseGroup"][id^="LedgerJournalTransAsset_"]');
    }

    get processingOperationPopup() {
        return this.page.locator('//span[@id="titleField" and contains(text(), "Processing operation")]');
    }






    // Method's Fixed Asset Details
    async fillRequisitionName() {
        const randomString = Math.random().toString(36).substring(2, 6).toUpperCase();
        const randomNumber = Math.floor(Math.random() * 10000);
        const requisitionTitle = `Test-${randomString}${randomNumber}`;

        await this.requisitionName.fill(requisitionTitle);
        return requisitionTitle;
    }

    async submitRequisition() {
        await this.okButton.click();
    }

    async getHeaderTitle() {
        const titleLocator = this.page.locator('[data-dyn-controlname="HeaderTitle"]');
        await titleLocator.waitFor({ state: 'visible', timeout: 10000 });
        return titleLocator.innerText();
    }
    async typePurchaseRequisitionNameInFilter(requisitionName: string) {
        await this.purchaseRequisitionFilter.fill(requisitionName);
    }


    async selectQuickFilterOption(fieldName: string) {
        await this.purchaseRequisitionFilter.fill(fieldName);
        const optionLocator = this.page.locator(`li.quickFilter-listItem >> text=${fieldName}`);

        await optionLocator.waitFor({ state: 'visible', timeout: 10000 });

        await optionLocator.click();

        console.log(`Selected quick filter option: ${fieldName}`);
    }

    async clickAddNewPRLineButton() {
        const addNewLineButton = this.page.locator('button[data-dyn-controlname="PurchReqNewLine"]');
        await addNewLineButton.click();
    }

    async setAndSelectBusinessJustificationReason(reason: string) {
        await this.setbusinessJustification.fill(reason);
        await this.setbusinessJustification.press('Enter');
        await this.selectbusinessJustification.waitFor({ state: 'visible', timeout: 100000 });
        await this.selectbusinessJustification.click();
        await this.page.waitForTimeout(2000);
    }

    async enterCapexNumber(detail: string) {
        await this.enterCapexNumberInFA.waitFor({ state: 'visible' });
        await this.enterCapexNumberInFA.click({ force: true });
        await this.enterCapexNumberInFA.type(detail, { delay: 200 }); // optional delay for realism
    }

    async selectItemName(itemName: string) {
        await this.enterItemNumberInPRLine.fill(itemName);
        await this.enterItemNumberInPRLine.press('Enter');
        await this.selectItem.waitFor({ state: 'visible', timeout: 10000 });
        await this.selectItem.click();
    }

    async selectFixedAssetGroup(fixedAssetGroup: string) {
        await this.enterFixedAssetGroup.scrollIntoViewIfNeeded();
        await this.enterFixedAssetGroup.click();
        await this.enterFixedAssetGroup.type(fixedAssetGroup, { delay: 300 });
        await this.enterFixedAssetGroup.press('Enter');
        // await this.selectFixedAssetGroupFromGrid.waitFor({ state: 'visible', timeout: 10000 });
        // await this.selectFixedAssetGroupFromGrid.click();
    }
    async selectFixedAssetJournalName(fixedAssetJournal: string) {
        const input = this.enterJournalFixedAssetName.first();
        await input.click({ clickCount: 3 });
        for (const char of fixedAssetJournal) {
            await this.page.keyboard.type(char);
            await this.page.waitForTimeout(50);
        }
        await this.selectFixedAssetInputGrid.first().waitFor({ state: 'visible', timeout: 100000 });
        this.selectFixedAssetInputGrid.first().click();
    }


    async selectFixedAssetLocation(fixedLocation: string) {
        await this.enterFixedAssetLoc.scrollIntoViewIfNeeded();
        await this.enterFixedAssetLoc.click();
        await this.enterFixedAssetLoc.pressSequentially(fixedLocation);
        await this.enterFixedAssetLoc.press('Enter');
        // await this.selectFixedAssetGroupFromGrid.waitFor({ state: 'visible', timeout: 10000 });
        // await this.selectFixedAssetGroupFromGrid.click();
    }

    async selectFixedAssetSorting(fixedAssetSorting: string) {
        await this.enterFixedAssetSorting.scrollIntoViewIfNeeded();
        await this.enterFixedAssetSorting.click();
        await this.enterFixedAssetSorting.pressSequentially(fixedAssetSorting);
        await this.enterFixedAssetSorting.press('Enter');
        // await this.selectFixedAssetGroupFromGrid.waitFor({ state: 'visible', timeout: 10000 });
        // await this.selectFixedAssetGroupFromGrid.click();
    }

    async selectFixedAssetSorting2(fixedAssetSorting: string) {
        await this.enterFixedAssetSorting2.scrollIntoViewIfNeeded();
        await this.enterFixedAssetSorting2.click();
        await this.enterFixedAssetSorting2.pressSequentially(fixedAssetSorting);
        await this.enterFixedAssetSorting2.press('Enter');
        // await this.selectFixedAssetGroupFromGrid.waitFor({ state: 'visible', timeout: 10000 });
        // await this.selectFixedAssetGroupFromGrid.click();
    }

    async clickFinancialDimensions() {
        await this.selectFinancialDimensions.click();
    }

    async enterBusinessUnit(businessUnit: string) {
        const field = this.enterBusinessUnitinFinancialDimensions;

        await field.waitFor({ state: 'visible' });
        await field.fill(''); // Clear any prefilled value
        await field.type(businessUnit, { delay: 100 }); // Or use fill() if no delay needed

        await this.page.locator('[data-dyn-controlname="DimensionEntryControl_DECValue_BusinessUnit"] .lookupButton').click();
        await this.selectValueInFinancialDimensions.waitFor({ state: 'visible', timeout: 10000 });
        await this.selectValueInFinancialDimensions.click();
        await this.page.waitForTimeout(2000);
    }

    async enterCostCenter(costCenter: string) {
        await this.enterCostCenterinFinancialDimensions.scrollIntoViewIfNeeded();
        await this.enterCostCenterinFinancialDimensions.fill('');
        await this.enterCostCenterinFinancialDimensions.pressSequentially(costCenter, { delay: 100 })
        await this.page.locator("[data-dyn-controlname='DimensionEntryControl_DECValue_CostCenter'] [class='lookupButton']").click();
        await this.selectValueInFinancialDimensions.waitFor({ state: 'visible', timeout: 10000 });
        await this.selectValueInFinancialDimensions.click();
        await this.page.waitForTimeout(2000);
    }
    async enterPublications(publication: string) {
        await this.enterPublicationinFinancialDimensions.scrollIntoViewIfNeeded();
        await this.enterPublicationinFinancialDimensions.clear();
        await this.enterPublicationinFinancialDimensions.fill(publication);
        await this.page.waitForTimeout(5000);
        //await this.page.locator("[data-dyn-controlname='LineDimensionEntryControl_DECValue_Publications'] [class='lookupButton']").click();
        await this.clickPublication(publication).waitFor({ state: 'visible', timeout: 10000 });
        await this.clickPublication(publication).click();
    }

    async clickBooksButton() {
        waitForWithRetry(this.selectBooksButton, this.page, 5, 4000, 2000);
        await this.selectBooksButton.scrollIntoViewIfNeeded();
        await this.selectBooksButton.click();

    }

    async clickSubmitButton() {
        await waitForWithRetry(this.submitButton, this.page, 5, 4000, 2000);
        await this.submitButton.click();
        await this.page.waitForTimeout(12000);
    }


    async checkMessageBar() {
        await waitForWithRetry(this.messageBar, this.page, 5, 4000, 2000);
        const message = await this.messageBar.innerText();
        console.log(`Message Bar: ${message}`);
        return message;
    }

    async getSpanByLabel(labelText: string) {
        const span = this.clickWorkFlowRequiredButton(labelText);
        await span.scrollIntoViewIfNeeded();
        await span.click();
    }

    async clickReassignWorkItem() {
        await waitForWithRetry(this.workflowStatusReassignWorkItem, this.page, 5, 4000, 2000);
        await this.workflowStatusReassignWorkItem.scrollIntoViewIfNeeded();
        await this.workflowStatusReassignWorkItem.click();
    }

    async enterUserName(userName: string) {
        await waitForWithRetry(this.user, this.page, 5, 4000, 2000);
        await this.user.scrollIntoViewIfNeeded();
        await this.user.pressSequentially(userName);
        // await this.user.press('Enter');
    }

    async clickActionButton() {
        await this.actionButton.click();
        await this.page.waitForTimeout(2000);
    }

    async checkWorkflowStatus() {
        await this.workflowStatus.scrollIntoViewIfNeeded();
        await waitForWithRetry(this.workflowStatus, this.page, 5, 4000, 2000);
        const status = await this.workflowStatus.getAttribute('value');
        console.log(`Workflow Status: ${status}`);
        return status;
    }

    async getApprovalRequestLink(prNumber: string) {
        await waitForWithRetry(this.page.locator(`//a[.//span[@class='button-label' and text()='Approval request for ${prNumber}']]`), this.page, 5, 4000, 2000);
        return this.page.locator(`//a[.//span[@class='button-label' and text()='Approval request for ${prNumber}']]`);
    }

    async getPurchaseRequisitionId() {
        await waitForWithRetry(this.purchaseRequisitionId, this.page, 5, 4000, 2000);
        const requisitionId = await this.purchaseRequisitionId.getAttribute('value');
        console.log(`Purchase Requisition ID: ${requisitionId}`);
        return requisitionId;
    }

    async waitForStatusContains(

        expectedText: string,
        maxRetries: number = 10,
        intervalMs: number = 3000
    ): Promise<void> {
        const refreshButton = this.page.locator(
            '#WorkflowStatus_4_SystemDefinedRefreshButton'
        );

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            console.log(`Attempt ${attempt}: Refreshing status...`);
            await refreshButton.click();
            await this.page.waitForTimeout(intervalMs);
            const status = await this.checkWorkflowStatus();

            if (status && status.includes(expectedText)) {
                console.log(`status matched expected: "${status}"`);
                return;
            }

            console.log(`Current status: "${status}", waiting for "${expectedText}"...`);
        }

        throw new Error(`Status did not contain "${expectedText}" after ${maxRetries} attempts.`);
    }

    async clickRowHavingPendingSatusToReassign() {
        await this.rowHavingPendingStatus.scrollIntoViewIfNeeded();
        await this.rowHavingPendingStatus.click();
    }

    async waitForPendingStatusRowAndSelect(maxRetries = 20, interval = 3000) {
        const refreshButton = this.page.locator("//button[starts-with(@id, 'WorkflowStatus') and contains(@id, 'SystemDefinedRefreshButton') and @aria-label='Refresh']");

        for (let i = 0; i < maxRetries; i++) {
            const rowCount = await this.rowHavingPendingStatus.count();
            console.log(`row count is ${rowCount}`);
            if (rowCount >= 1) {
                console.log(`Second 'Pending' row found after ${i} refresh(es)`);
                await this.clickRowHavingPendingStatus.click();
                return true;
            }

            console.log(`Attempt ${i + 1}: Second 'Pending' row not found, refreshing...`);
            await refreshButton.click();
            await this.page.waitForTimeout(interval); // wait between retries
        }

        throw new Error(`Second 'Pending' row not found after ${maxRetries} refresh attempts.`);
    }

    async waitForPOLinkInPRDetailsAndClick(maxRetries = 60, interval = 4000) {
        const refreshButton = this.page.locator("//button[starts-with(@id, 'PurchReqTable') and contains(@id, 'SystemDefinedRefreshButton') and @aria-label='Refresh']");

        for (let i = 0; i < maxRetries; i++) {
            if (await this.purchaseOrderInPRDetails.isVisible()) {
                await this.purchaseOrderInPRDetails.click();
                return true;
            }
            else {
                console.log(`Attempt ${i + 1}: PO not found, refreshing...`);
                await refreshButton.click();
                await this.page.waitForTimeout(interval); // wait between retries
            }
        }

        throw new Error(`PO not found after ${maxRetries} refresh attempts.`);
    }

    async clickOnPurchaseRequisition() {

        await waitForWithRetry(this.purchaseRequisitionId, this.page, 5, 4000, 2000);
        for (let i = 0; i < 10; i++) {

            if (!await this.page.locator('[data-dyn-controlname="HeaderTitle"]').isVisible()) {
                await this.purchaseRequisitionId.click();
                this.page.keyboard.press('Enter');
                console.log("clicked on Purchase Requisition ID");
                break;
            }
            else {
                console.log("Purchase Requisition ID is not visible, retrying...");
            }
        }
    }
    async clickReceiveButton() {
        await waitForWithRetry(this.receiveButton, this.page, 5, 4000, 2000);
        await this.receiveButton.click();
    }

    async clickPurchaseButton() {
        await waitForWithRetry(this.purchaseButton, this.page, 5, 4000, 2000);
        await this.purchaseButton.click();
    }

    async clickConfirmPoButton() {
        await waitForWithRetry(this.confirmPoButton, this.page, 5, 4000, 2000);
        await this.confirmPoButton.click();
    }

    async waitForDialogBoxToHide() {
        await this.dialogBox.waitFor({ state: 'hidden', timeout: 10000 });
        return this.dialogBox;
    }

    async enterPurchaseQuantity(quantity: string) {
        await this.purchaseQuantity.click();
        await this.purchaseQuantity.clear();
        await this.purchaseQuantity.type(quantity, { delay: 200 });
        await this.page.waitForTimeout(2000);
    }

    async enterFADescr(description: string) {
        await this.enterFADescription.scrollIntoViewIfNeeded();
        await this.enterFADescription.type(description, { delay: 200 });
    }
    get selectBooksButton() {
        return this.page.locator('//button//span[text()="Books"]');//'[data-dyn-controlname="PurchReqTableWorkflowDropDialogButtonGroup"] button');
    }

    async enterFADescrAlias(description: string) {
        await this.enterFADescriptionAlias.scrollIntoViewIfNeeded();
        await this.enterFADescriptionAlias.type(description, { delay: 200 });
    }

    async clickProductReceiptButton() {
        await waitForWithRetry(this.buttonProductReceipt, this.page, 5, 4000, 2000);
        await this.buttonProductReceipt.click();
    }

    async enterProductReceiptText(receiptText: string) {
        const input = this.productReceiptText;
        await input.scrollIntoViewIfNeeded();
        await input.waitFor({ state: 'visible' });
        await input.click({ force: true }); // Sometimes necessary for custom input boxes
        await input.fill(''); // Clear existing text
        await input.type(receiptText, { delay: 100 });
        await this.page.waitForTimeout(2000);
    }


    async enterGoodRecieveQuantity(quantity: string) {
        const input = this.receiveQuantity;

        await input.scrollIntoViewIfNeeded();
        await input.waitFor({ state: 'visible' });
        await input.click({ force: true }); // Focus the field

        // Clear it (double-click + backspace as backup)
        await input.click({ clickCount: 3 });
        await this.page.keyboard.press('Backspace');

        // Type one character at a time using keyboard
        for (const char of quantity) {
            await this.page.keyboard.type(char);
            await this.page.waitForTimeout(50); // tiny delay between characters
        }

        // Optional: blur the input to trigger any model update
        await this.page.keyboard.press('Tab');

        await this.page.waitForTimeout(2000);
    }



    async clickJournalProductReceiptButton() {
        await waitForWithRetry(this.buttonJournalProductReceipt, this.page, 5, 4000, 2000);
        await this.buttonJournalProductReceipt.click();
        await this.page.waitForTimeout(2000);
    }

    async clickVouchersButton() {
        await waitForWithRetry(this.buttonVouchers, this.page, 5, 4000, 2000);
        await this.buttonVouchers.click();
    }

    async isAmountInputWithValuePresent(expectedValue: string): Promise<boolean> {
        const amountInputs = this.journalVoucherRow;
        const count = await amountInputs.count();
        for (let i = 0; i < count; i++) {
            const value = await amountInputs.nth(i).inputValue();
            if (value.trim() === expectedValue.trim()) {
                return true;
            }
        }
        return false;
    }

    async waitForJournalVoucherRowsOnGoodReceipt(maxRetries = 80, interval = 4000) {
        const refreshButton = this.page.locator("//button[starts-with(@id, 'LedgerTransVoucher') and contains(@id, 'SystemDefinedRefreshButton') and @aria-label='Refresh']");
        for (let i = 0; i < maxRetries; i++) {
            if (await this.journalVoucherRow.first().isVisible()) {
                console.log(`Journal voucher row found after ${i + 1} refresh(es)`);
                return true;
            }
            else {
                console.log(`Attempt ${i + 1}: Journal voucher row not found, refreshing...`);
                await refreshButton.click();
                await this.page.waitForTimeout(interval);
            }
        }
        throw new Error(`Journal voucher rows not found after ${maxRetries} refresh attempts.`);
    }

    async clickCapexToggle() {
        await this.capexToggle.click();
    }

    async selectCapexNum(capexNumber: string) {
        await this.enterAssetIdInPRLine.fill(capexNumber);
        await this.enterAssetIdInPRLine.press('Enter');
        await this.selectCapexNumber.waitFor({ state: 'visible', timeout: 100000 });
        await this.selectCapexNumber.click();
    }
    async fillGRName() {
        const randomString = Math.random().toString(36).substring(2, 6).toUpperCase();
        const randomNumber = Math.floor(Math.random() * 10000);
        const requisitionTitle = `Test-${randomString}${randomNumber}`;
        await this.requisitionName.fill(requisitionTitle);
        return requisitionTitle;
    }

    async clickSaveButton() {
        await waitForWithRetry(this.actionsGroupSaveButton, this.page, 5, 4000, 2000);
        await this.actionsGroupSaveButton.click();
    }
    async clickBackButtonBooksPage() {
        await waitForWithRetry(this.actionsGroupBackButtonBooksPage, this.page, 5, 4000, 2000);
        await this.actionsGroupBackButtonBooksPage.click();
    }
    async clickBackButtonFAPage() {
        await waitForWithRetry(this.actionsGroupBackButtonFAPage, this.page, 5, 4000, 2000);
        await this.actionsGroupBackButtonFAPage.click();
    }

    async enterJournalFixedAssetDescription(journalDescription: string) {
        await this.enterJournalFADescription.first().scrollIntoViewIfNeeded();
        await this.enterJournalFADescription.first().fill(journalDescription);
        await this.page.waitForTimeout(2000);
    }

    async clickFixedAssetJournalLine() {
        await waitForWithRetry(this.fixedAssetJournalLine, this.page, 5, 4000, 2000);
        await this.fixedAssetJournalLine.click();
    }

    async enterJournalDate(date: string) {
        await this.journalDate.scrollIntoViewIfNeeded();
        await this.journalDate.fill(date);
        await this.journalDate.press('Enter');
        await this.page.waitForTimeout(2000);
    }

    async enterAndSelectAccountNumberJournal(accountNumber: string) {
        await this.selectAccountNumberJournal.scrollIntoViewIfNeeded();
        await this.selectAccountNumberJournal.fill(accountNumber);
        await this.selectAccountNumberJournalFromGrid.waitFor({ state: 'visible', timeout: 100000 });
        await this.selectAccountNumberJournalFromGrid.press('Enter');
        await this.page.waitForTimeout(2000);
    }

    async enterAndSelectTransactionType(transactionType: string) {
        const input = this.selectTransactionType;
        await input.scrollIntoViewIfNeeded();
        await input.waitFor({ state: 'visible' });
        await input.click({ force: true });
        await input.click({ clickCount: 3 });
        for (const char of transactionType) {
            await this.page.keyboard.type(char);
            await this.page.waitForTimeout(50); // tiny delay between characters
        }
        await this.selectTransactionTypeFromGrid.click();
        await this.page.waitForTimeout(2000);
    }

    async enterAndSelectOffsetAccountType(offsetAccountType: string) {
        const input = this.offsetAccount;
        await input.scrollIntoViewIfNeeded();
        await input.waitFor({ state: 'visible' });
        await input.click({ force: true });
        await input.click({ clickCount: 3 });
        for (const char of offsetAccountType) {
            await this.page.keyboard.type(char);
            await this.page.waitForTimeout(50); // tiny delay between characters
        }
        await this.selectTransactionTypeFromGrid.click();
        await this.page.waitForTimeout(2000);
    }



    async enterDebitAmountJournal(quantity: string) {
        const input = this.debitAmountJournal;

        await input.scrollIntoViewIfNeeded();
        await input.waitFor({ state: 'visible' });
        await input.click({ force: true }); // Focus the field

        // Clear it (double-click + backspace as backup)
        await input.click({ clickCount: 3 });
        await this.page.keyboard.press('Backspace');

        // Type one character at a time using keyboard
        for (const char of quantity) {
            await this.page.keyboard.type(char);
            await this.page.waitForTimeout(50); // tiny delay between characters
        }

        // Optional: blur the input to trigger any model update
        await this.page.keyboard.press('Tab');

        await this.page.waitForTimeout(2000);
    }

    async enteroffsetAccountNumber(offSet: string) {
        await this.offSetAccountNumber.scrollIntoViewIfNeeded();
        await this.offSetAccountNumber.clear();
        await this.offSetAccountNumber.fill(offSet);
        await this.offSetAccountNumber.press('Enter');
        await this.page.waitForTimeout(2000);
    }

    async enterCreditAmountJournal(quantity: string) {
        const input = this.creditAmountJournal;

        await input.scrollIntoViewIfNeeded();
        await input.waitFor({ state: 'visible' });
        await input.click({ force: true }); // Focus the field

        // Clear it (double-click + backspace as backup)
        await input.click({ clickCount: 3 });
        await this.page.keyboard.press('Backspace');

        // Type one character at a time using keyboard
        for (const char of quantity) {
            await this.page.keyboard.type(char);
            await this.page.waitForTimeout(50); // tiny delay between characters
        }

        // Optional: blur the input to trigger any model update
        await this.page.keyboard.press('Tab');

        await this.page.waitForTimeout(2000);
    }

    async clickValidateButton() {
        await this.validateButton.scrollIntoViewIfNeeded();
        const maxRetries = 5;
        for (let i = 0; i < maxRetries; i++) {
            const isDropdownVisible = await this.validateButtonUnderMainMenu.isVisible();
            if (isDropdownVisible) break;

            try {
                await this.validateButton.first().click({ timeout: 5000 });
            } catch (error) {
                console.warn(`Attempt ${i + 1} to click validateButton failed:`, error);
            }
        }
        if (!await this.validateButtonUnderMainMenu.first().isVisible()) {
            throw new Error('Validate dropdown did not appear after clicking');
        }
        await this.validateButtonUnderMainMenu.first().scrollIntoViewIfNeeded();
        await this.validateButtonUnderMainMenu.first().click();
    }


    async clickBackButtonUnderMainMenu() {
        await waitForWithRetry(this.actionsGroupBackButtonJournalFAPage, this.page, 5, 4000, 2000);
        await this.actionsGroupBackButtonJournalFAPage.click();
    }

    async clickPostButton() {
        await waitForWithRetry(this.postButton, this.page, 5, 4000, 2000);
        await this.postButton.click();
    }

    async clickAndWaitForBookIdToAppear() {
        await this.page.waitForTimeout(4000);
        await this.bookId.scrollIntoViewIfNeeded();
        await this.bookId.first().click();

    }

    async clickValuationAssetButton() {
        await waitForWithRetry(this.valuationAssetButton, this.page, 5, 4000, 2000);
        await this.valuationAssetButton.click();
    }

    async getDisposalSaleValue() {
        await waitForWithRetry(this.headerBalancesOnValuationPage, this.page, 5, 4000, 2000);
        let values = this.disposalSaleValue.allInnerTexts();
        return values;
    }

    async clickBackButtonOnValuationPage() {
        await waitForWithRetry(this.backButtonOnValuationPage, this.page, 5, 4000, 2000);
        await this.backButtonOnValuationPage.click();
    }

    async clickDimesionsInSecondGrid() {
        await this.dimesionsInSecondGrid.nth(1).click();
    }
}
