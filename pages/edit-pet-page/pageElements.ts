import { Locator, Page } from '@playwright/test';

export class PageElements {

    constructor(private readonly page: Page) { }

    get heading(): Locator {
        return this.page.getByRole("heading");
    }

    get ownerNameField(): Locator {
        return this.page.locator("#owner_name");
    }

    get typeField(): Locator {
        return this.page.locator("input#type1");
    }

    get allPetTypes(): Locator {
        return this.page.locator("select option");
    }

    get nameField(): Locator {
        return this.page.getByRole("textbox", { name: "Name" });
    }

    get typeDropdown(): Locator {
        return this.page.locator("select#type");
    }

    get updatePetButton(): Locator {
        return this.page.getByRole("button", { name: "Update Pet" });
    }
}