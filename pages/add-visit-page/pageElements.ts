import { Page, Locator } from '@playwright/test';

export class PageElements {

    constructor(private readonly page: Page) { }

    get heading(): Locator {
        return this.page.getByRole("heading");
    }

    rowForPet(petName: string): Locator {
        return this.page.locator(".table-striped").getByRole("row", { name: petName });
    }

    get calendarIcon(): Locator {
        return this.page.getByLabel('Open calendar');
    }

    get currentDay(): Locator {
        return this.page.locator("button.mat-calendar-body-active");
    }

    get dateField(): Locator {
        return this.page.locator("input[name='date']");
    }

    get descriptionField(): Locator {
        return this.page.locator("#description");
    }

    get addVisitButton(): Locator {
        return this.page.getByRole("button", { name: "Add Visit" });
    }
}