import { get } from 'http';
import { NavigationPage } from '../utils/NavigationPage';
import { waitForWithRetry } from '../utils/waitForWithRetry';
import { waitForElementToHide } from '../utils/waitForWithRetry';
import { waitForInputValue } from '../utils/waitForWithRetry';
import { off } from 'process';
import { Locator } from '@playwright/test';

export class PageMenus {
    constructor(private page: import('@playwright/test').Page) { }

    async clickMenuSubMenuOptionOnSpecificPage(mainMenuOption: string, subMenuOption: string) {
        this.page.locator(`[data-dyn-controlname="${mainMenuOption}"] button`).scrollIntoViewIfNeeded;
        const maxRetries = 5;
        for (let i = 0; i < maxRetries; i++) {
            const isDropdownVisible = await this.page.locator(`[data-dyn-controlname="${mainMenuOption}"] button`).isVisible();
            if (isDropdownVisible) break;

            try {
                await this.page.locator(`[data-dyn-controlname="${mainMenuOption}"] button`).click({ timeout: 5000 });
            } catch (error) {
                console.warn(`Attempt ${i + 1} to click main Menu failed:`, error);
            }
        }
        if (!this.page.locator(`//button//span[text()="${subMenuOption}"]`).isVisible()) {
            throw new Error('Submenu option did not appear after clicking Main menu option');
        }
        await this.page.locator(`//button//span[text()="${subMenuOption}"]`).scrollIntoViewIfNeeded();
        await this.page.locator(`//button//span[text()="${subMenuOption}"]`).click();
    }

}