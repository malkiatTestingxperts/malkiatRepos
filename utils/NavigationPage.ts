import { waitForWithRetry } from '../utils/waitForWithRetry';
export class NavigationPage {
    constructor(private page: import('@playwright/test').Page) { }

    get mainModules() {
        return this.page.locator('#navPaneModuleID');
    }

    get home() {
        return this.page.locator('#home');
    }

    get purchaseRequisitions() {
        return this.page.locator('[data-dyn-title="Purchase requisitions"]');
    }

    get isElementVisible() {
        return this.page.locator('[data-dyn-controlname="ActionsButtonGroup"]');
    }

    get actionsGroupNewButton() {
        return this.page.locator('[data-dyn-controlname="SystemDefinedNewButton"]');
    }

    get actionsGroupSaveButton() {
        return this.page.locator('[data-dyn-controlname="SystemDefinedSaveButton"]');
    }

    get actionsGroupBackButton() {
        return this.page.locator('[data-dyn-controlname="ActionPaneHeader"] [data-dyn-controlname="SystemDefinedCloseButton"]');
    }

    get processingMessage() {
        return this.page.locator("//div/span[@id='blockingMessage']");
    }

    get oKButton() {
        return this.page.locator('button[data-dyn-controlname="OKButton"]');
    }

    async openModulesMenu() {
        await waitForWithRetry(this.mainModules, this.page, 5, 40000, 2000);
        await this.mainModules.click();
    }

    async clickNewButton() {
        await waitForWithRetry(this.actionsGroupNewButton, this.page, 5, 4000, 2000);
        await this.actionsGroupNewButton.click();
    }

    async clickSaveButton() {
        await waitForWithRetry(this.actionsGroupSaveButton, this.page, 5, 4000, 2000);
        await this.actionsGroupSaveButton.click();
    }

    async clickBackButton() {
        await this.page.waitForTimeout(2000);
        await waitForWithRetry(this.actionsGroupBackButton, this.page, 5, 4000, 2000);
        await this.actionsGroupBackButton.click();
    }

    async waitUntilProcessingMessageDisappears() {
        await this.processingMessage.waitFor({ state: 'hidden', timeout: 10000 });
        console.log("Processing message is hidden");
    }


    async clickHomeButton() {
        await waitForWithRetry(this.home, this.page, 5, 4000, 2000);
        await this.home.click();
    }

    async clickOkButton() {
        await waitForWithRetry(this.oKButton, this.page, 5, 4000, 2000);
        await this.oKButton.click();
    }
}