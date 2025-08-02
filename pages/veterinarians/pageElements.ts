import { Page, Locator } from '@playwright/test';

export class PageElements {

    constructor(private readonly page: Page) { }

    heading(): Locator {
        return this.page.getByRole("heading");
    }

    editVetButtonFor(veterinarianName: string) {
        return this.page.getByRole('row', { name: veterinarianName }).getByRole("button", { name: "Edit Vet" });
    }
}