import { Page, Locator } from '@playwright/test';

export class PageElements {

    constructor(private readonly page: Page) { }

    getOwnerNameLink(name: string): Locator {
        return this.page.getByText(name, { exact: true });
    }
}