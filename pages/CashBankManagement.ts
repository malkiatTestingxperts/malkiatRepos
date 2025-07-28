import { get } from 'http';
import { NavigationPage } from '../utils/NavigationPage';
import { waitForWithRetry } from '../utils/waitForWithRetry';

export class CashBankManagement {

    constructor(private page: import('@playwright/test').Page) { }

    get bankAccountName() {
        return this.page.locator("[data-dyn-controlname='Identification_AccountID'] input");
    }

    get bankAccountNumber() {
        return this.page.locator("[data-dyn-controlname='Identification_AccountNum'] input");
    }


    get customerAccountName() {
        return this.page.locator("[data-dyn-controlname='Org_Name'] input");
    }

    get customerAccountNameOnFreeTaxInvoice() {
        return this.page.locator("[data-dyn-controlname='CVHeader_OrderAccount'] input");
    }


    get enterLedger() {
        return this.page.locator('[data-dyn-controlname="Ledger_Type"] input');

    }

    get enterStarCode() {
        return this.page.locator('[data-dyn-controlname="Ledger_Category"] input');

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
        return this.page.locator('[class="toggle-box"]');
    }

    get paymentOption() {
        return this.page.locator('[data-dyn-controlname="TabPayment"] button');
    }

    get paymentTerm() {
        return this.page.locator('input[name="DynamicDetail_PaymTermId"]');
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

    get mainAccount() {
        return this.page.locator('[data-dyn-controlname="Ledger_LedgerAccount"] input');
    }

    get accountDescription() {
        return this.page.locator('[data-dyn-controlname="Description_Name"] input');
    }

    get swiftCode() {
        return this.page.locator('[data-dyn-controlname="Identification_SWIFTNo"] input');
    }


    get iBAN() {
        return this.page.locator('[data-dyn-controlname="Identification_IBAN"] input');
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

    get debitAmountJournal() {
        return this.page.locator('[data-dyn-controlname="LedgerJournalTrans_AmountCurDebit"] input');
    }
    get creditAmountJournal() {
        return this.page.locator('[data-dyn-controlname="LedgerJournalTrans_AmountCurCredit"] input');
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

    get city() {
        return this.page.locator('[data-dyn-controlname="LogisticsPostalAddress_City"] input');
    }

    get phone() {
        return this.page.locator('[data-dyn-controlname="LogisticsElectronicAddressBP_Locator"] input');
    }

    get email() {
        return this.page.locator('[data-dyn-controlname="LogisticsElectronicAddressEmail_Locator"] input');
    }

    get selectFreeTaxCustomerFromGrid() {
        return this.page.locator('[data-dyn-controlname="CustTable_AccountNum"] input');
    }

    get description() {
        return this.page.locator('[data-dyn-controlname="CustInvoiceLine_Description"] input');
    }

    get vatGroup() {
        return this.page.locator('[data-dyn-controlname="CustInvoiceLine_TaxGroup"] input');
    }

    get buttonAddLine() {
        return this.page.locator('button[data-dyn-controlname="NewInvoiceLine"]');
    }

    get buttonPostInvoice() {
        return this.page.locator('button[data-dyn-controlname="ButtonCustPostInvoiceJob"]');
    }

    get quantity() {
        return this.page.locator('[data-dyn-controlname="CustInvoiceLine_Quantity"] input');
    }

    get unitPrice() {
        return this.page.locator('[data-dyn-controlname="CustInvoiceLine_UnitPrice"] input');
    }

    get saveSettlementTransactions() {
        return this.page.locator('[data-dyn-controlname="CustInvoiceLine_UnitPrice"] input');
    }

    get paymentSettlement() {
        return this.page.locator('button[data-dyn-controlname="ButtonSettlement"]');
    }

    get settleTransactions() {
        return this.page.locator('button[data-dyn-controlname="buttonSettlement"]');
    }

    get savePaymentSettlement() {
        return this.page.locator('button[data-dyn-controlname="Save"]');
    }


















    get selectGroupFromDisplayedGridStar() {
        return this.page.locator('[data-dyn-controlname="SysGen_AccountCategory"] input');
    }



    get selectGroupFromDisplayedGrid() {
        return this.page.locator('[id*="Ledger_Type"][role="option"]');
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

    get addNewLine() {

        return this.page.locator('button[data-dyn-controlname="NewLine"]');
    }

    get closeButton() {

        return this.page.locator('button[data-dyn-controlname="Close"]');
    }
    get dimensionValues() {

        return this.page.locator('button[data-dyn-controlname="DimensionValueDetails"]');
    }
    get dimensionGroupValues() {

        return this.page.locator('[data-dyn-controlname="GroupValue"] input');
    }

    get dimensionGroupValuesDescription() {

        return this.page.locator('[data-dyn-controlname="GroupDescription"] input');
    }

    get actionsGroupNewButtonStructures() {
        return this.page.locator('button[data-dyn-controlname="NewHierarchyButton"]');
    }

    get structuresDesc() {
        return this.page.locator('[data-dyn-controlname="ruleStructureName"] input');
    }

    get structuresDescDetails() {
        return this.page.locator('[data-dyn-controlname="ruleStructureDescription"] input');
    }

    get segmentButton() {
        return this.page.locator('button[data-dyn-controlname="AddSegmentButton"]');
    }

    get segmentButtonOption() {
        return this.page.locator('[data-dyn-controlname="DimensionList"] [role="option"]');
    }

    get addSegmentAfterSelecting() {
        return this.page.locator('button[data-dyn-controlname="AddButton"]');
    }

    get addCriteria() {
        return this.page.locator('button[data-dyn-controlname="AddConstraintCriteriaRowButton"]');
    }

    get addCriteriaInformation() {
        return this.page.locator('[class="public_fixedDataTableCell_cellContent"] input');
    }

    get validateButton() {
        return this.page.locator('button[data-dyn-controlname="ValidateHierarchyButton"]');
    }

    get activateButton() {
        return this.page.locator('button[data-dyn-controlname="ActivateHierarchyButton"]');
    }

    get ledgerCalenderPeriod() {
        return this.page.locator('[data-dyn-controlname="FiscalCalendarPeriod_Name1"] input');
    }

    get editLedger() {
        return this.page.locator('button[data-dyn-controlname="SystemDefinedViewEditButton"]');
    }

    get editLedgerPeriodStatus() {
        return this.page.locator('input[id*="FiscalCalendar"][aria-label="Period status"]');
    }

    get selectDesiredStatus() {
        return this.page.locator('[class*="dyn-combobox-list"] li');
    }

    get reversalOption() {
        return this.page.locator('button[data-dyn-controlname="TransactionReversalDialog"]');
    }

    get reversalOptionUnderMainMenu() {
        return this.page.locator('//button//span[contains(text(),"Reverse")]');
    }

    get enterFilterFD() {

        return this.page.locator('[data-dyn-controlname="QuickFilter_Input"] input');
    }

    get importStatement() {

        return this.page.locator('button[data-dyn-controlname="ImportButton"]');
    }

    get importStatementFile() {
        return this.page.locator('button[data-dyn-controlname="Select fileBrowseButton"]');
    }

    get importChequeFile() {
        return this.page.locator('button[data-dyn-controlname="FileUploadBrowseButton"]');
    }

    get buttonOk() {
        return this.page.locator('button[data-dyn-controlname="CommandButton"]');
    }
    get butonUpload() {
        return this.page.locator('button[data-dyn-controlname="Select fileUploadButton"]');
    }

    //********************************Methods for Cash and Bank Managment*******************
    async expandMenuIfCollapsedCashAndBank(label: string, labelsubmenu: string) {
        // Parent expandable menu item
        const parentMenu = this.page.locator(`a.modulesFlyout-LinkGroup[aria-label="${label}"]`);

        await parentMenu.waitFor({ state: 'visible' });

        // Expand if not already
        const isExpanded = await parentMenu.getAttribute('aria-expanded');
        if (isExpanded !== 'true') {
            await parentMenu.click();
            await this.page.waitForTimeout(500); // allow animation to finish
        }

        // Sub-menu item inside the expanded section
        const subLink = this.page.locator(`div.modulesFlyout-link[aria-label="${labelsubmenu}"] > a.modulesFlyout-linkText`).nth(1);
        await subLink.waitFor({ state: 'visible' });
        await subLink.click();
    }



    async enterBankAccountName(account: string) {
        await waitForWithRetry(this.bankAccountName, this.page, 5, 4000, 2000);
        await this.bankAccountName.click();
        await this.bankAccountName.fill(account);
    }

    async enterBankAccountNumber(account: string) {
        await waitForWithRetry(this.bankAccountNumber, this.page, 5, 4000, 2000);
        await this.bankAccountNumber.click();
        await this.bankAccountNumber.fill(account);
    }

    async enterRoutingNumber(routing: string) {
        await this.routingNumber.click();
        await this.routingNumber.fill(routing);
    }

    async enterMainAccount(mainAccount: string) {
        await waitForWithRetry(this.mainAccount, this.page, 5, 4000, 2000);
        await this.mainAccount.click();
        await this.mainAccount.fill(mainAccount);
    }

    async enterAccountDescription(mainAccount: string) {
        await waitForWithRetry(this.accountDescription, this.page, 5, 4000, 2000);
        await this.accountDescription.click();
        await this.accountDescription.fill(mainAccount);
    }

    async enterSwiftCode(swift: string) {
        await waitForWithRetry(this.swiftCode, this.page, 5, 4000, 2000);
        await this.swiftCode.scrollIntoViewIfNeeded();
        await this.swiftCode.click();
        await this.swiftCode.fill(swift);
    }

    async enterIBAN(iban: string) {
        await waitForWithRetry(this.iBAN, this.page, 5, 4000, 2000);
        await this.iBAN.scrollIntoViewIfNeeded();
        await this.iBAN.click();
        await this.iBAN.fill(iban);

    }

    async importBankStatement(path: string) {
        await waitForWithRetry(this.importStatement, this.page, 5, 4000, 2000);
        await this.importStatement.scrollIntoViewIfNeeded();
        await this.importStatement.click();
        await this.page.waitForTimeout(7000);
        await waitForWithRetry(this.importStatementFile, this.page, 5, 4000, 2000);
        await this.importStatementFile.scrollIntoViewIfNeeded();
        await waitForWithRetry(this.importStatementFile, this.page, 5, 12000, 2000);
        await this.page.once('filechooser', async (fileChooser) => {
            await fileChooser.setFiles(path);
        });
        await this.page.click('text=Browse');
        await this.page.waitForTimeout(7000);
        await this.butonUpload.click();
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

    async importManualCheque(path: string) {
        await waitForWithRetry(this.importChequeFile, this.page, 5, 12000, 2000);
        await this.page.once('filechooser', async (fileChooser) => {
            await fileChooser.setFiles(path);
        });
        await this.page.click('text=Browse');
        await this.page.waitForTimeout(7000);
        await this.buttonOk.click();
    }
}

