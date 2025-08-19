import { Locator, Page } from '@playwright/test';

export class PageElements {

    constructor(private readonly page: Page) { }

    get heading(): Locator {
        return this.page.getByRole("heading");
    }

    get addButton(): Locator {
        return this.page.getByRole("button", { name: "Add" });
    }

    get nameLabelForInputField(): Locator {
        return this.page.locator(".control-label");
    }

    get nameField(): Locator {
        return this.page.locator("#name");
    }

    get saveButton(): Locator {
        return this.page.getByRole("button", { name: "Save" });
    }

    get allPetTypeFields(): Locator {
        return this.page.locator("[name='pettype_name']");
    }

    deleteButtonForPetType(petType: string): Locator {
        return this.page.getByRole("row", { name: petType }).getByRole("button", { name: "Delete" });
    }

    editButtonForPetType(petType: string): Locator {
        return this.page.getByRole('row', { name: petType }).getByRole("button", { name: "Edit" });
    }
}