import { Page, Locator } from '@playwright/test';

export class PageElements {

    constructor(private readonly page: Page) { }

    get heading(): Locator {
        return this.page.getByRole("heading");
    }

    editVetButtonFor(veterinarianName: string): Locator {
        return this.page.getByRole('row', { name: veterinarianName }).getByRole("button", { name: "Edit Vet" });
    }

    specialties(veterinarianName: string): Locator {
        return this.page.getByRole("row", { name: veterinarianName }).locator("td:nth-child(2) > div");
    }
}