import { expect, Locator, Page } from '@playwright/test';
import { WebPage } from '../webPage';
import { PageElements } from './pageElements';

export class EditPetPage extends WebPage {

    private readonly _elements: PageElements

    constructor(protected readonly page: Page) {
        super(page);
        this._elements = new PageElements(this.page);
    }

    get elements(): PageElements {
        return this._elements;
    }

    async editPet(petType: string): Promise<void> {
        await this.selectPetType(petType);
        await expect(this.elements.typeField).toHaveValue(petType);
        await expect(this.elements.typeDropdown).toHaveValue(petType);
        await this.elements.updatePetButton.click();
    }

    async selectPetType(petType: string): Promise<void> {
        await this.page.selectOption('select#type', petType);
    }
}