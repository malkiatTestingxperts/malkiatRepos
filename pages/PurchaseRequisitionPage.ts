import { get } from 'http';
import { NavigationPage } from '../utils/NavigationPage';
import { waitForWithRetry } from '../utils/waitForWithRetry';

export class PurchaseRequisitionPage {
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

    get enterPRHeaderDetails() {

        return this.page.locator('textarea[name="BusinessJustificationHeader_BusinessJustification"]');
    }

    get enterItemNumberInPRLine() {

        return this.page.locator('[data-dyn-controlname="PurchReqLine_ItemId"] input');
    }

    get enterAssetIdInPRLine() {

        return this.page.locator('[data-dyn-controlname="PurchReqLine_TMLFGH_AssetId"] input');
    }
    get enterSupplierNameInPRLine() {

        return this.page.locator('[data-dyn-controlname="PurchReqLine_VendAccount"] input');
    }

    get selectSupplierNameInPRLine() {

        return this.page.locator('[role="gridcell"] [data-dyn-controlname="SysGen_AccountNum"]');
    }

    get enterBusinessUnitinFinancialDimensions() {
        return this.page.locator('[data-dyn-controlname="LineDimensionEntryControl_DECValue_BusinessUnit"] input');
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
        return this.page.locator('[data-dyn-controlname="LineDimensionEntryControl_DECValue_CostCenter"] input');
    }


    get messageBar() {
        return this.page.locator('[class="messageBar-messageRegion"]');
    }
    get enterPublicationinFinancialDimensions() {
        return this.page.locator('[data-dyn-controlname="LineDimensionEntryControl_DECValue_Publications"] input');
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

    get journalVoucherRow() {
        return this.page.locator('[data-dyn-controlname="LedgerTrans_AmountCur"] input');
    }

    get capexToggle() {
        return this.page.locator("//span[starts-with(@id, 'PurchReqCreate_') and contains(@id, '_Capex_toggle')]");
    }

    get selectCapexNumber() {
        return this.page.locator('[role="gridcell"] [data-dyn-controlname="SysGen_AssetId"]');
    }
    // Method to fill the requisition details

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

    async enterBusinessJustificationHeaderDetails(detail: string) {
        await this.enterPRHeaderDetails.waitFor({ state: 'visible' });
        await this.enterPRHeaderDetails.click({ force: true });
        await this.enterPRHeaderDetails.type(detail, { delay: 200 }); // optional delay for realism
    }

    async selectItemName(itemName: string) {
        await this.enterItemNumberInPRLine.fill(itemName);
        await this.enterItemNumberInPRLine.press('Enter');
        await this.selectItem.waitFor({ state: 'visible', timeout: 10000 });
        await this.selectItem.click();
    }
    async selectSupplier(supplierName: string) {
        await this.enterSupplierNameInPRLine.scrollIntoViewIfNeeded();
        await this.enterSupplierNameInPRLine.click();
        await this.enterSupplierNameInPRLine.pressSequentially(supplierName);
        await this.enterSupplierNameInPRLine.press('Enter');
        await this.selectSupplierNameInPRLine.waitFor({ state: 'visible', timeout: 10000 });
        await this.selectSupplierNameInPRLine.click();
    }

    async clickFinancialDimensions() {
        await this.selectFinancialDimensions.click();
    }

    async enterBusinessUnit(businessUnit: string) {
        const field = this.enterBusinessUnitinFinancialDimensions;

        await field.waitFor({ state: 'visible' });
        await field.fill(''); // Clear any prefilled value
        await field.type(businessUnit, { delay: 100 }); // Or use fill() if no delay needed

        await this.page.locator('[data-dyn-controlname="LineDimensionEntryControl_DECValue_BusinessUnit"] .lookupButton').click();
        await this.selectValueInFinancialDimensions.waitFor({ state: 'visible', timeout: 10000 });
        await this.selectValueInFinancialDimensions.click();
        await this.page.waitForTimeout(2000);
    }

    async enterCostCenter(costCenter: string) {
        await this.enterCostCenterinFinancialDimensions.scrollIntoViewIfNeeded();
        await this.enterCostCenterinFinancialDimensions.fill('');
        await this.enterCostCenterinFinancialDimensions.pressSequentially(costCenter, { delay: 100 })
        await this.page.locator("[data-dyn-controlname='LineDimensionEntryControl_DECValue_CostCenter'] [class='lookupButton']").click();
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

    async clickWorkflow() {
        waitForWithRetry(this.selectWorkflowButton, this.page, 5, 4000, 2000);
        await this.selectWorkflowButton.scrollIntoViewIfNeeded();
        await this.selectWorkflowButton.click();

    }
    // async clickSubmitButtonOnWorkflowDialog() {
    //     waitForWithRetry(this.submitWorkFlowButton, this.page, 5, 4000, 2000);
    //     await this.submitWorkFlowButton.click();
    //     await waitForWithRetry(this.page.locator('[data-dyn-controlname="MainGroup"]'), this.page, 5, 4000, 2000);
    //     await this.page.locator('[data-dyn-controlname="MainGroup"]').waitFor({ state: 'hidden', timeout: 90000 });
    // }
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
}