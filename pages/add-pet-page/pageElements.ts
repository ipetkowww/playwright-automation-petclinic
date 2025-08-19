import { Page, Locator } from '@playwright/test';

export class PageElements {

    constructor(private readonly page: Page) { }

    get petNameTextField(): Locator {
        return this.page.locator("#name");
    }

    get iconAtTheEndOfNameField(): Locator {
        return this.page.locator("#name + span");
    }

    get petBirthDateDateField(): Locator {
        return this.page.locator("[name='birthDate']");
    }

    get savePetButton(): Locator {
        return this.page.getByRole("button", { name: "Save Pet" });
    }

    get calendarIcon(): Locator {
        return this.page.getByLabel("Open calendar");
    }

    get monthAndYearButton(): Locator {
        return this.page.getByLabel("Choose month and year");
    }

    get previous24YearsButton(): Locator {
        return this.page.getByLabel("Previous 24 years");
    }

    yearButton(year: string): Locator {
        return this.page.getByLabel(year);
    }

    monthButton(month: string): Locator {
        return this.page.getByText(month.toUpperCase());
    }

    dayButton(day: string): Locator {
        return this.page.getByText(day, { exact: true })
    }
}