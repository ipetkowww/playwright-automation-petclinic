import { Locator, Page } from '@playwright/test';

export class PageElements {

    constructor(private readonly page: Page) { }

    getOwnerNameLink(name: string): Locator {
        return this.page.getByText(name, { exact: true });
    }

    get heading(): Locator {
        return this.page.getByRole("heading");
    }

    get ownerNameElement(): Locator {
        return this.page.locator(".ownerFullName")
    }

    get tableRows(): Locator {
        return this.page.getByRole("row");
    }
}