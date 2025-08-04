import { Locator, Page } from '@playwright/test';

export class PageElements {

    constructor(private readonly page: Page) { }

    get heading(): Locator {
        return this.page.getByRole("heading");
    }

    get nameField(): Locator {
        return this.page.getByRole("textbox");
    }

    get updateButton(): Locator {
        return this.page.getByRole("button", { name: "Update" });
    }

    get cancelButton(): Locator {
        return this.page.getByRole("button", { name: "Cancel" });
    }

    get nameIsRequiredError(): Locator {
        return this.page.locator("span.help-block");
    }
}