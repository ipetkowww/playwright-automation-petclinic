import { expect, Page } from '@playwright/test';
import { AddPetFormData } from '../../types/add-pet-form-data';
import { AddPetPage } from '../add-pet-page/addPetPage';
import { WebPage } from '../webPage';
import { PageElements } from './pageElements';
import { Asserts } from './asserts';
import { AddVisitPage } from '../add-visit-page/addVisitPage';
import { PetVisitData } from '../../types/pet-visit-data';
import { EditPetPage } from '../edit-pet-page/editPetPage';

export class OwnerInformationPage extends WebPage {

    private readonly _elements: PageElements;
    private readonly _asserts: Asserts;

    constructor(protected readonly page: Page) {
        super(page);
        this._elements = new PageElements(this.page);
        this._asserts = new Asserts(this._elements);
    }

    get elements(): PageElements {
        return this._elements;
    }

    get asserts(): Asserts {
        return this._asserts;
    }

    async addNewPet(petData: AddPetFormData): Promise<void> {
        await this.elements.addNewPetButton.click();
        await new AddPetPage(this.page).savePet(petData);
    }

    async deletePet(petName: string): Promise<void> {
        await this.elements.deletePetButtonFor(petName).click();
    }

    async addVisitForPet(petName: string, description: string, daysBackFromToday?: number): Promise<PetVisitData> {
        await this.elements.addVisitButtonFor(petName).click();

        const addVisitPage: AddVisitPage = new AddVisitPage(this.page);
        await expect(addVisitPage.elements.heading).toHaveText("New Visit");
        await expect(addVisitPage.elements.rowForPet(petName).locator("td").nth(0)).toHaveText("Samantha");
        await expect(addVisitPage.elements.rowForPet(petName).locator("td").nth(3)).toHaveText("Jean Coleman");

        return addVisitPage.addVisit(description, daysBackFromToday);
    }

    async deletePetVisit(petName: string, ...petVisits: PetVisitData[]): Promise<void> {
        for (const petVisit of petVisits) {
            await this.elements.deleteVisitButtonFor(petName, petVisit.description).click();
            await this.page.locator(".overlay").waitFor({ state: "detached" });
        }
    }
}