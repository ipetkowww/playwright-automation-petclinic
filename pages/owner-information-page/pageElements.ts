import { Locator, Page } from '@playwright/test';

export class PageElements {

    constructor(private readonly page: Page) { }

    get addNewPetButton(): Locator {
        return this.page.getByRole("button", { name: "Add New Pet" });
    }

    petCardElementFor(petName: string): Locator {
        return this.page.locator("app-pet-list", { hasText: petName });
    }

    petNameElementFor(petName: string): Locator {
        return this.petCardElementFor(petName).locator("dt:has-text('Name') + dd");
    }

    petBirthayElementFor(petName: string): Locator {
        return this.petCardElementFor(petName).locator("dt:has-text('Birth Date') + dd");
    }

    petTypeElementFor(petName: string): Locator {
        return this.petCardElementFor(petName).locator("dt:has-text('Type') + dd");
    }

    deletePetButtonFor(petName: string): Locator {
        return this.petCardElementFor(petName).getByRole("button", { name: "Delete Pet" });
    }

    addVisitButtonFor(petName: string): Locator {
        return this.petCardElementFor(petName).getByRole("button", { name: "Add Visit" });
    }

    visitsForPet(petName: string): Locator {
        return this.petCardElementFor(petName).locator("app-visit-list table > tr");
    }

    deleteVisitButtonFor(petName: string, visitDescription: string): Locator {
        return this.visitsForPet(petName).locator(`td:has-text("${visitDescription}") + td`)
            .getByRole("button", { name: "Delete Visit" });
    }

    editPetButtonFor(petName: string): Locator {
        return this.petCardElementFor(petName).getByRole('button', { name: 'Edit Pet' });
    }

}