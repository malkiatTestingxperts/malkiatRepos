/**
 * Returns a date string in dd/mm/yyyy format offset by a number of days from today.
 * @param offsetDays Number of days to offset (e.g., -1 for yesterday, 0 for today, 1 for tomorrow)
 * @returns {string} Formatted date string
 */
import { waitForWithRetry } from '../utils/waitForWithRetry';
export class DateHelper {
    constructor(private page: import('@playwright/test').Page) { }
    private index?: number;


    withIndex(index: number) {
        this.index = index;
        return this;
    }
    getFormattedDateOffset(offsetDays: number): string {
        const date = new Date();
        date.setDate(date.getDate() + offsetDays);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
        const year = date.getFullYear();

        return `${month}/${day}/${year}`;
    }
    getFormattedDateOffsetorImport(offsetDays: number): string {
        const date = new Date();
        date.setDate(date.getDate() + offsetDays);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }
    // async setDateInput(offsetDays: number, dateForm: string) {
    //     const formattedDate = this.getFormattedDateOffset(offsetDays);
    //     this.page.locator(`input[aria-controls="ui-datepicker-div"][aria-describedby*='${dateForm}']`).scrollIntoViewIfNeeded();
    //     await waitForWithRetry(this.page.locator(`input[aria-controls="ui-datepicker-div"][aria-describedby*='${dateForm}']`), this.page, 5, 4000, 2000);
    //     await this.page.locator(`input[aria-controls="ui-datepicker-div"][aria-describedby*='${dateForm}']`).fill(formattedDate);// Ensure the date is committed
    // }



    async setDateInput(offsetDays: number, dateForm: string) {
        const formattedDate = this.getFormattedDateOffset(offsetDays);
        const baseLocator = this.page.locator(
            `input[aria-controls="ui-datepicker-div"]`
        );

        const locator = this.index !== undefined ? baseLocator.nth(this.index) : baseLocator;

        await locator.scrollIntoViewIfNeeded();
        await waitForWithRetry(locator, this.page, 5, 4000, 2000);
        await locator.fill(formattedDate);

        this.index = undefined;
    }

}





