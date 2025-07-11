import { get } from 'http';
import { NavigationPage } from '../utils/NavigationPage';
import { waitForWithRetry } from '../utils/waitForWithRetry';

export class SupplierVendorPage {

    constructor(private page: import('@playwright/test').Page) { }

    get supplierAccount() {
        return this.page.locator("[data-dyn-controlname='Identification_AccountNum'] input");
    }

    get supplierAccountName() {
        return this.page.locator("[data-dyn-controlname='OrgGroup'] input");
    }


    get enterGroup() {
        return this.page.locator('[data-dyn-controlname="Posting"] input');

    }

    get buttonAddSupplierAddress() {
        return this.page.locator('button[data-dyn-controlname="NewAddress"]');
    }

    get descriptionSupplierAddress() {
        return this.page.locator('input[name="Details_Description"]');
    }

    get zipCodeSupplier() {
        return this.page.locator('input[name="LogisticsPostalAddress_ZipCode"]');
    }

    get streetSupplier() {
        return this.page.locator('textarea[name="LogisticsPostalAddress_Street"]');
    }

    get supplierBackButton() {
        return this.page.locator('button[data-dyn-controlname="SystemDefinedCloseButton"]');
    }

    get openSupplierAfterSearch() {
        return this.page.locator('[data-dyn-controlname="VendTable_AccountNum"] input[class*="dyn-field dyn-hyperlink"][title*="Click to follow link"]');
    }

    get addContactButtonInSupplier() {
        return this.page.locator('button[data-dyn-controlname="NewContactInfo"]');
    }

    get contactInfoDescSupplier() {
        return this.page.locator('[data-dyn-controlname="ContactInfo_Description"] input');
    }

    get contactInfoInput() {
        return this.page.locator('[data-dyn-controlname="ContactInfo_Locator"] input');
    }

    get contactInfoTypeInput() {
        return this.page.locator('[data-dyn-controlname="ContactInfo_Type"] input');
    }

    get contactInfoPrimaryCheckbox() {
        return this.page.locator('[data-dyn-controlname="ContactInfo_IsPrimary"] [role = "checkbox"]');
    }

    get paymentOption() {
        return this.page.locator('[data-dyn-controlname="TabPayment"] button');
    }

    get paymentTerm() {
        return this.page.locator('input[name="Payment_PaymTermId"]');
    }

    get paymentTermOption() {
        return this.page.locator("[data-dyn-controlname='Sel'] input");
    }

    get paymentMode() {
        return this.page.locator('input[name="Payment_PaymMode"]');
    }

    get settleMentDiscount() {
        return this.page.locator('[data-dyn-controlname="Payment_UseCashDisc"] [role="combobox"]');
    }
    get purposeText() {
        return this.page.locator('textarea[name="NotificationToTheCentralBank_BankCentralBankPurposeText"]');
    }

    get financedimOption() {
        return this.page.locator('[data-dyn-controlname="TabFinancialDimensions"] button[id*="FinancialDimensions_caption"]');
    }

    get bankAccountsOption() {
        return this.page.locator('button[data-dyn-controlname="BankAccounts"]');
    }

    get bankAccountsType() {
        return this.page.locator('[data-dyn-controlname="DetailsHeader_AccountID"] input');
    }

    get bankAccountsName() {
        return this.page.locator('[data-dyn-controlname="DetailsHeader_Name"] input');
    }

    get routingNumber() {
        return this.page.locator('[data-dyn-controlname="Identification_RegistrationNum"] input');
    }

    get bankAccountNumber() {
        return this.page.locator('[data-dyn-controlname="Identification_AccountNum"] input');
    }

    get saveButton() {
        return this.page.locator('button[data-dyn-controlname="SystemDefinedSaveButton"][id*="VendBankAccounts"]');
    }

    get bankAccountsBackButton() {
        return this.page.locator('[data-dyn-controlname="BankAccountActionPane"] button[data-dyn-controlname="SystemDefinedCloseButton"]');
    }

    get selectAccountNumberJournal() {

        return this.page.locator('[data-dyn-controlname="LedgerJournalTrans_AccountNum"] input');
    }

    get selectAccountNumberJournalFromGrid() {
        return this.page.locator('[data-dyn-controlname="DirPartyTable_Name"] input');
    }

    get invoiceDate() {
        return this.page.locator('[data-dyn-controlname="DocumentDateGrid"] input');
    }

    get invoiceName() {
        return this.page.locator('[data-dyn-controlname="LedgerJournalTrans_Invoice"] input');
    }

    get selectVatGroup() {

        return this.page.locator('[data-dyn-controlname="LedgerJournalTrans_TaxGroup1"] input');
    }

    get selectVatGroupGrid() {

        return this.page.locator('[data-dyn-controlname="TaxGroupHeading_TaxGroup"] input');
    }

    get selectVatGroup2() {

        return this.page.locator('[data-dyn-controlname="LedgerJournalTrans_TaxItemGroup2"] input');
    }

    get selectVatGroupGrid2() {

        return this.page.locator('[data-dyn-controlname="TaxItemGroupHeading_TaxItemGroup"] input');
    }

    get descriptionInvoiceLine() {
        return this.page.locator('[data-dyn-controlname="LedgerJournalTrans_Txt"] input');
    }

    get puchaseOrderNumber() {
        return this.page.locator('[data-dyn-controlname="PurchIdRange"] input');
    }

    get approveByLookupButton() {
        return this.page.locator('[data-dyn-controlname="InvoiceOverview"] .lookupButton');
    }

    get approveByLookupLines() {
        return this.page.locator('[data-dyn-controlname="DirPerson_Name"]');
    }

    get enterApprover() {
        return this.page.locator('[data-dyn-controlname="FilterField_DirPerson_Name_Name_Input_0"] input');
    }

    get applyApproverFilter() {
        return this.page.locator('button[data-dyn-controlname="DirPerson_Name_ApplyFilters"]');
    }

    get selectApproverAfterFilter() {
        return this.page.locator('input[id*="DirPerson_Name"]');
    }

    get supplierAccountApproverFilter() {
        return this.page.locator('[data-dyn-columnname="LedgerJournalTrans_AccountNum"]');
    }

    get enterSupplierInFilter() {
        return this.page.locator('[data-dyn-controlname="FilterField_LedgerJournalTrans_AccountNum_DisplayValue_Input_0"] input');
    }

    get applySupplierFilter() {
        return this.page.locator('button[data-dyn-controlname="LedgerJournalTrans_AccountNum_ApplyFilters"]');
    }

    get purchaseOrderOption() {
        return this.page.locator('button[data-dyn-controlname="btnApproveJournal"]');
    }

    get matchProductReceipt() {

        return this.page.locator('button[data-dyn-controlname="buttonParmTablePackingSlips"]');
    }


    get gridPurchase() {

        return this.page.locator('[data-dyn-controlname="GridPurchParmLine"]');
    }

    get invoicePoolDateFilter() {

        return this.page.locator('[data-dyn-columnname="LedgerJournalTrans_TransDate"]');
    }

    get buttonInvoicePoolDateFilterDesc() {

        return this.page.locator('button[data-dyn-controlname="Descending_LedgerJournalTrans_TransDate"]');
    }

    get buttonInvoicePoolDateApplyFilter() {

        return this.page.locator('button[data-dyn-controlname="LedgerJournalTrans_TransDate_ApplyFilters"]');
    }

    get invoiceMatchProductReceipt() {
        return this.page.locator('[data-dyn-controlname="CheckBoxMatched"] [role = "checkbox"]');
    }

    get okButtonAfterCheckingTheMatchingLine() {
        return this.page.locator('button[data-dyn-controlname="CommandButtonOK"]');
    }

    get buttonUpdateMatchStatus() {
        return this.page.locator('button[data-dyn-controlname="UpdateMatchStatus"]');
    }

    get matchStatus() {
        return this.page.locator('[data-dyn-controlname="gridParmTable_MatchVariance"] input');
    }

    get workflowInvoicePoolMatching() {
        return this.page.locator('button[data-dyn-controlname="VendorInvoiceHeaderWorkflowDropDialog"]');
    }

    get submitworkflowInvoicePoolMatching() {
        return this.page.locator('button[data-dyn-controlname="PromotedAction1"]');
    }

    get invoiceFilter() {
        return this.page.locator('[data-dyn-columnname="LedgerJournalTrans_Invoice"]');
    }

    get applyInvoiceFilter() {
        return this.page.locator('button[data-dyn-controlname="LedgerJournalTrans_Invoice_ApplyFilters"]');
    }

    get invoiceFilterText() {
        return this.page.locator('[data-dyn-controlname="FilterField_LedgerJournalTrans_Invoice_Invoice"] input');
    }

    get paymentStatus() {
        return this.page.locator('[data-dyn-controlname="LedgerJournalTrans_PaymentStatus"] input');
    }

    get paymentSelectStatus() {
        return this.page.locator('[id*="comboBoxListItem"]');
    }

    get paymentAmount() {
        return this.page.locator('[data-dyn-controlname="PaymAmountPaymCur"] input');
    }

    get postButton() {
        return this.page.locator('[data-dyn-controlname="PostJournal"][data-dyn-role="MenuItemButton"]');
    }

    get notificationMessage() {
        return this.page.locator('[class="notificationPopup-message"]');
    }























    get selectGroupFromDisplayedGrid() {
        return this.page.locator('[data-dyn-controlname="Sel"] input');
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

    get messageBarToggle() {

        return this.page.locator('button[data-dyn-controlname="MessageBarToggle"]');
    }
    get enterPublicationinFinancialDimensions() {
        return this.page.locator('[data-dyn-controlname="LineDimensionEntryControl_DECValue_Publications"] input');
    }

    get purchaseRequisitionId() {
        return this.page.locator('[data-dyn-controlname="PurchReqTable_PurchReqId"] input');
    }

    get moreButtonUnderMainMenuWorkflow() {

        return this.page.locator('[data-dyn-controlname="OverflowActions"] button');
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

    get pRToPoReportTitle() {
        return this.page.locator('//span[contains(text(),"PR to PO report")]');
    }
    get noOfPORecordsOnPRToPoReport() {
        return this.page.locator('[data-dyn-controlname*="PRTOPOReportView_PurchId"] input');
    }

    get pRToPOReport() {

        return this.page.locator('div.modulesFlyout-link[aria-label="FGH PR to PO report"] > a.modulesFlyout-linkText');
    }

    async enterSupplierAccountNumber(supplierNumber: string) {
        await waitForWithRetry(this.supplierAccount, this.page, 5, 4000, 2000);
        await this.supplierAccount.fill(supplierNumber);
    }

    async enterSupplierAccountName(supplierName: string) {
        await waitForWithRetry(this.supplierAccountName, this.page, 5, 4000, 2000);
        await this.supplierAccountName.fill(supplierName);
    }

    async enterAndSelectGroup(groupName: string) {
        await this.enterGroup.scrollIntoViewIfNeeded();
        await this.enterGroup.click({ clickCount: 1 });
        for (const char of groupName) {
            await this.page.keyboard.type(char);
            await this.page.waitForTimeout(900); // tiny delay between characters
        }
        await waitForWithRetry(this.selectGroupFromDisplayedGrid.nth(0), this.page, 5, 10000, 2000);
        await this.selectGroupFromDisplayedGrid.nth(0).click();
    }

    async checkMessageBar() {
        await waitForWithRetry(this.messageBar, this.page, 5, 4000, 2000);

        const toggle = this.messageBarToggle.first();
        if (await toggle.isVisible()) {
            try {
                await toggle.click();
                console.log("Message Bar is toggled");
            } catch (e) {
                console.warn("Toggle button was visible but could not be clicked:", e);
            }
        } else {
            console.log("Message Bar Toggle is not visible, skipping toggle.");
        }

        let message = "";
        try {
            message = await this.messageBar.innerText();
            console.log(`Message Bar: ${message}`);
        } catch (e) {
            console.warn("Unable to read message bar:", e);
        }

        if (await toggle.isVisible()) {
            try {
                await toggle.click();
            } catch (e) {
                console.warn("Toggle could not be closed:", e);
            }
        }

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

    async waitForPendingStatusRowAndSelect(maxRetries = 40, interval = 2000) {
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

    async getNoOfPORecordsOnPRToPoReport() {
        await waitForWithRetry(this.pRToPoReportTitle, this.page, 5, 15000, 2000);
        const cells = this.noOfPORecordsOnPRToPoReport;
        const cellCount = await cells.count();
        return cellCount;
    }

    async selctReportPRToPO() {
        await waitForWithRetry(this.pRToPOReport, this.page, 5, 15000, 2000);
        this.pRToPOReport.click();
    }

    async clickButtonAddSupplierAddress() {
        await this.buttonAddSupplierAddress.scrollIntoViewIfNeeded();
        await this.buttonAddSupplierAddress.click();
    }

    async enterDescriptionSupplierAddress(description: string) {
        await waitForWithRetry(this.descriptionSupplierAddress, this.page, 5, 15000, 2000);
        await this.descriptionSupplierAddress.scrollIntoViewIfNeeded();
        await this.descriptionSupplierAddress.fill(description);
    }

    async enterzipCodeSupplier(zipcode: string) {
        await waitForWithRetry(this.zipCodeSupplier, this.page, 5, 15000, 2000);
        await this.zipCodeSupplier.scrollIntoViewIfNeeded();
        await this.zipCodeSupplier.fill(zipcode);
    }

    async enterStreetSupplier(street: string) {
        await waitForWithRetry(this.streetSupplier, this.page, 5, 15000, 2000);
        await this.streetSupplier.scrollIntoViewIfNeeded();
        await this.streetSupplier.fill(street);
    }

    async clickSupplierBackButton() {
        await waitForWithRetry(this.supplierBackButton, this.page, 5, 15000, 2000);
        await this.supplierBackButton.scrollIntoViewIfNeeded();
        await this.supplierBackButton.click();
    }

    async clickOpenSupplierAfterSearch() {
        await waitForWithRetry(this.openSupplierAfterSearch, this.page, 5, 15000, 2000);
        await this.openSupplierAfterSearch.scrollIntoViewIfNeeded();
        await this.openSupplierAfterSearch.hover();
        await this.openSupplierAfterSearch.click();
        await this.page.keyboard.press('Enter');
    }

    async AddContactInfoInSupplier(index: number, type: string, desc: string, detail: string) {
        await waitForWithRetry(this.addContactButtonInSupplier, this.page, 5, 15000, 2000);
        await this.addContactButtonInSupplier.scrollIntoViewIfNeeded();
        await this.addContactButtonInSupplier.click();
        await this.contactInfoDescSupplier.nth(index).fill(desc);
        await this.contactInfoTypeInput.nth(index).click({ clickCount: 2 });
        await this.contactInfoTypeInput.nth(index).fill('');
        for (const char of type) {
            await this.page.keyboard.type(char);
            await this.page.waitForTimeout(300);
        }
        await this.contactInfoInput.nth(index).click();
        await this.contactInfoInput.nth(index).fill(detail);
    }

    async checkPrimary(index: number) {
        try {
            const checkbox = this.contactInfoPrimaryCheckbox.nth(index);

            await waitForWithRetry(checkbox, this.page, 5, 4000, 2000);

            const isChecked = await checkbox.getAttribute('aria-checked');
            if (isChecked !== 'true') {
                await checkbox.scrollIntoViewIfNeeded();
                await checkbox.waitFor({ state: 'visible' });

                await checkbox.focus();
                await this.page.keyboard.press('Space');
                await this.page.waitForTimeout(1000);

                const afterClickState = await checkbox.getAttribute('aria-checked');
                if (afterClickState === 'true') {
                    console.log("Checkbox was successfully checked.");
                } else {
                    await checkbox.click({ force: true });
                }

                await this.page.waitForTimeout(2000);
            } else {
                console.log("Checkbox is already checked, skipping click.");
            }
        } catch (error: any) {
            console.error(`Error while attempting to click checkbox: ${error.message}`);
            throw error;
        }
    }


    async clickPaymentOption() {
        await this.paymentOption.scrollIntoViewIfNeeded();
        await waitForWithRetry(this.paymentOption, this.page, 5, 15000, 2000)
        if (await this.paymentOption.getAttribute('data-dyn-expanded') === 'false') {
            await this.paymentOption.click();
        }
    }

    async enterPaymentMode(mode: string) {
        await this.paymentMode.click();

        for (const char of mode) {
            await this.page.keyboard.type(char);
            await this.page.waitForTimeout(300);
        }
        await this.paymentTermOption.click();
    }
    async enterPaymentTerm(term: string) {
        await this.paymentTerm.scrollIntoViewIfNeeded();
        await this.paymentTerm.click();
        for (const char of term) {
            await this.page.keyboard.type(char);
            await this.page.waitForTimeout(300);
        }
        await this.paymentTermOption.click();
    }
    async selectSettlementDiscount() {
        await this.settleMentDiscount.click();
        await this.page.getByRole('option', { name: 'Always' }).click();
    }
    async enterPurposeText(text: string) {
        await this.purposeText.click();
        await this.purposeText.fill(text);
    }

    async clickFinancDimOption() {
        await this.financedimOption.scrollIntoViewIfNeeded();
        await waitForWithRetry(this.financedimOption, this.page, 5, 15000, 2000)
        if (await this.financedimOption.getAttribute('data-dyn-expanded') === 'false') {
            await this.financedimOption.click();
        }
    }

    async clickBankAccountsOption() {
        await this.bankAccountsOption.scrollIntoViewIfNeeded();
        await waitForWithRetry(this.bankAccountsOption, this.page, 5, 15000, 2000)
        await this.bankAccountsOption.click();
    }

    async enterBankAccountsType(type: string) {
        await waitForWithRetry(this.bankAccountsType, this.page, 5, 15000, 2000)
        await this.bankAccountsType.click();
        await this.bankAccountsType.fill(type);
    }
    async enterbankAccountsName(type: string) {
        await this.bankAccountsName.click();
        await this.bankAccountsName.fill(type);
    }

    async enterRoutingNumber(routing: string) {
        await this.routingNumber.click();
        await this.routingNumber.fill(routing);
    }
    async enterBankAccountNumber(routing: string) {
        //await this.bankAccountNumber.click();
        await this.bankAccountNumber.last().fill(routing);
    }

    async clickNewButton() {
        await this.page.waitForTimeout(5000);
        await this.page.keyboard.press('Alt+N');
    }

    async clickSaveButton() {
        await this.saveButton.click();
    }

    async clickBankAccountsBackButton() {
        this.bankAccountsBackButton.click();
    }

    async enterAndSelectAccountNumberJournal(accountNumber: string) {
        await this.selectAccountNumberJournal.scrollIntoViewIfNeeded();
        await this.selectAccountNumberJournal.fill(accountNumber);
        await this.selectAccountNumberJournalFromGrid.waitFor({ state: 'visible', timeout: 100000 });
        await this.selectAccountNumberJournalFromGrid.press('Enter');
        await this.page.waitForTimeout(2000);
    }

    async enterInvoiceDate(date: string) {
        await this.invoiceDate.click();
        await this.invoiceDate.fill(date);
    }
    async enterInvoiceName(invoiceName: string) {
        await this.invoiceName.click();
        await this.invoiceName.fill(invoiceName);
    }

    async enterAndSelectVatGroup(vatGroup: string) {
        await this.selectVatGroup.scrollIntoViewIfNeeded();
        await this.selectVatGroup.click({ clickCount: 2 });
        for (const char of vatGroup) {
            await this.page.keyboard.type(char);
            await this.page.waitForTimeout(700);
        }
        // await this.selectVatGroupGrid.waitFor({ state: 'visible', timeout: 100000 });
        // await this.selectVatGroupGrid.click();
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('Tab');
    }

    async enterAndSelectVatGroup2(vatGroup: string) {
        await this.selectVatGroup2.scrollIntoViewIfNeeded();
        await this.selectVatGroup2.click({ clickCount: 2 });
        for (const char of vatGroup) {
            await this.page.keyboard.type(char);
            await this.page.waitForTimeout(500);
        }
        //  await this.selectVatGroupGrid2.waitFor({ state: 'visible', timeout: 100000 });
        await this.selectVatGroupGrid2.nth(0).click();
        await this.page.waitForTimeout(2000);
    }

    async enterDescriptionInvoiceLine(desc: string) {

        await this.descriptionInvoiceLine.click();
        await this.descriptionInvoiceLine.fill(desc);
    }

    async enterAndSelectPO(poNumber: string) {
        await this.puchaseOrderNumber.scrollIntoViewIfNeeded();
        await this.puchaseOrderNumber.fill(poNumber);
        await this.page.waitForTimeout(2000);
    }


    async enterApproverBy(approver: string) {
        const field = this.enterApprover;
        await this.approveByLookupButton.scrollIntoViewIfNeeded();
        await this.approveByLookupButton.click();
        await waitForWithRetry(this.approveByLookupLines.first(), this.page, 5, 15000, 2000)
        await this.approveByLookupLines.first().click();
        await this.page.waitForTimeout(5000);
        await field.waitFor({ state: 'visible' });
        for (const char of approver) {
            await this.page.keyboard.type(char);
            await this.page.waitForTimeout(90); // tiny delay between characters
        }
        await this.applyApproverFilter.click();
        await waitForWithRetry(this.selectApproverAfterFilter.first(), this.page, 5, 15000, 2000)
        await this.selectApproverAfterFilter.first().click();
    }

    async enterAndSelectVatGroupInInvoiceLine(vatGroup: string, index: number) {
        const fields = this.page.locator(
            '[data-dyn-controlname="LedgerJournalTrans_TaxGroup"] input, [data-dyn-controlname="LedgerJournalTrans_TaxItemGroup1"] input'
        );

        const count = await fields.count();

        if (index >= count) {
            throw new Error(`Index ${index} is out of bounds. Only ${count} fields found.`);
        }

        const targetField = fields.nth(index);

        await targetField.waitFor({ state: 'visible', timeout: 10000 });
        await targetField.click({ clickCount: 2 });
        await targetField.fill('');
        await targetField.type(vatGroup, { delay: 100 });
        await this.page.keyboard.press('Tab');
    }

    async enterSupplierAccountFilter(supplier: string) {
        const field = this.enterSupplierInFilter;
        await this.supplierAccountApproverFilter.scrollIntoViewIfNeeded();
        await this.supplierAccountApproverFilter.click();
        await waitForWithRetry(this.enterSupplierInFilter.first(), this.page, 5, 15000, 2000)
        await field.waitFor({ state: 'visible' });
        await field.fill(''); // Clear any prefilled value
        await field.type(supplier, { delay: 50 }); // Or use fill() if no delay needed
        await this.applySupplierFilter.click();
        // await waitForWithRetry(this.selectApproverAfterFilter, this.page, 5, 15000, 2000)
        // await this.selectApproverAfterFilter.click();
    }

    async selectInvoicePoolDateFilter() {
        await waitForWithRetry(this.invoicePoolDateFilter, this.page, 5, 15000, 2000)
        await this.invoicePoolDateFilter.scrollIntoViewIfNeeded();
        await this.invoicePoolDateFilter.click({ clickCount: 2 });
        await waitForWithRetry(this.buttonInvoicePoolDateFilterDesc, this.page, 5, 15000, 2000)
        await this.buttonInvoicePoolDateFilterDesc.click();
    }

    async clickPurchaseOrderOption() {
        await waitForWithRetry(this.purchaseOrderOption, this.page, 5, 15000, 2000)
        await this.purchaseOrderOption.scrollIntoViewIfNeeded();
        await this.purchaseOrderOption.click({ clickCount: 2 });
        await waitForWithRetry(this.matchProductReceipt, this.page, 5, 15000, 2000)
    }

    async clickMatchProductReceipt() {

        await this.matchProductReceipt.scrollIntoViewIfNeeded();
        await this.matchProductReceipt.click();
        await waitForWithRetry(this.invoiceMatchProductReceipt, this.page, 5, 15000, 2000)
    }

    async checkMatchProductReceipt(boxToCheck: string, index: number) {
        try {
            // Try both possible selector formats
            const locators = [
                this.page.locator(`[data-dyn-controlname="${boxToCheck}"] [role="checkbox"]`),
                this.page.locator(`[data-dyn-controlname="${boxToCheck}"] [role="checkbox"]`)
            ];

            const checkboxToCheck = locators[index];

            await waitForWithRetry(checkboxToCheck, this.page, 5, 15000, 2000)
            // Check if it's already checked
            const isChecked = await checkboxToCheck.getAttribute('aria-checked');

            if (isChecked !== 'true') {
                await checkboxToCheck.scrollIntoViewIfNeeded();
                await checkboxToCheck.focus();

                // First try using the keyboard
                await this.page.keyboard.press('Space');
                await this.page.waitForTimeout(1000);

                // Verify if it got checked
                const afterClickState = await checkboxToCheck.getAttribute('aria-checked');
                if (afterClickState !== 'true') {
                    // If not, try force clicking it
                    await checkboxToCheck.click({ force: true });
                }

                console.log("Checkbox was checked.");
            } else {
                console.log("Checkbox is already checked, skipping.");
            }

            await this.page.waitForTimeout(1000);
        } catch (error: any) {
            console.error(`Error while attempting to check checkbox: ${error.message}`);
            throw error;
        }
    }


    async clickOkButtonAfterCheckingTheMatchingLine() {
        await this.okButtonAfterCheckingTheMatchingLine.scrollIntoViewIfNeeded();
        await this.okButtonAfterCheckingTheMatchingLine.click();
        await waitForWithRetry(this.invoiceMatchProductReceipt, this.page, 5, 15000, 2000)
    }

    async clickButtonUpdateMatchStatus() {
        await this.page.waitForTimeout(6000);
        await waitForWithRetry(this.buttonUpdateMatchStatus, this.page, 5, 15000, 2000)
        await this.buttonUpdateMatchStatus.click();
        await this.page.waitForTimeout(3000);
    }

    async getMatchStatus() {
        await waitForWithRetry(this.matchStatus, this.page, 5, 15000, 2000)
        const getMatchStatus = this.matchStatus.inputValue();
        return getMatchStatus;
    }

    async clickworkflowInvoicePoolMatchingSubmit() {
        await this.workflowInvoicePoolMatching.scrollIntoViewIfNeeded();
        await this.workflowInvoicePoolMatching.click();
        await waitForWithRetry(this.submitworkflowInvoicePoolMatching, this.page, 5, 15000, 2000)
        await this.submitworkflowInvoicePoolMatching.click();
    }

    async clickSubmitButton() {
        await waitForWithRetry(this.submitButton, this.page, 5, 4000, 2000);
        await this.submitButton.click();
        await this.page.waitForTimeout(12000);
    }

    async enterInvoiceFilter(invoice: string) {
        const field = this.invoiceFilterText;
        await this.invoiceFilter.scrollIntoViewIfNeeded();
        await this.invoiceFilter.click({ clickCount: 2 });
        await waitForWithRetry(this.invoiceFilterText, this.page, 5, 15000, 2000)
        await field.waitFor({ state: 'visible' });
        await field.type(invoice, { delay: 50 }); // Or use fill() if no delay needed
        await this.applyInvoiceFilter.click();
        // await waitForWithRetry(this.selectApproverAfterFilter, this.page, 5, 15000, 2000)
        // await this.selectApproverAfterFilter.click();
    }

    async enterPaymentStatus(status: string) {
        await waitForWithRetry(this.paymentStatus, this.page, 5, 15000, 2000)
        const field = this.paymentStatus;
        await this.paymentStatus.scrollIntoViewIfNeeded();
        await this.paymentStatus.click();
        await field.waitFor({ state: 'visible' });
        await field.fill(''); // Clear any prefilled value
        await field.type(status, { delay: 200 });
        await waitForWithRetry(this.paymentSelectStatus, this.page, 5, 15000, 2000)
        await this.paymentSelectStatus.click();
        await this.page.waitForTimeout(3000);
        await this.page.locator('[class="formCaption-context largeViewSelector"]').nth(1).click();
        await this.page.waitForTimeout(3000);
    }


    async enterPaymentAmount(amount: string) {

        const field = this.paymentAmount.first();
        await this.paymentAmount.first().scrollIntoViewIfNeeded();
        await this.paymentAmount.first().click({ clickCount: 2 });
        await field.waitFor({ state: 'visible' });
        await field.fill(''); // Clear any prefilled value
        await field.type(amount, { delay: 10 }); // Or use fill() if no delay needed
    }

    async clickPostButton() {
        await this.postButton.scrollIntoViewIfNeeded();
        await this.postButton.click({ clickCount: 2 });
    }

    async waitNotificationMessageToHide() {
        await this.notificationMessage.waitFor({ state: 'hidden', timeout: 10000 });
    }



}
