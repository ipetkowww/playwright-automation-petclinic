import { Page } from '@playwright/test';
import { AddPetFormData } from '../../types/add-pet-form-data';
import { AddPetPage } from '../add-pet-page/addPetPage';
import { WebPage } from '../webPage';
import { PageElements } from './pageElements';
import { Asserts } from './asserts';

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
}