import { Page, expect } from '@playwright/test';
import { PageElements } from '../pet-types-page/pageElements.ts';
import { WebPage } from '../webPage';
import { Asserts } from './asserts';

export class PetTypesPage extends WebPage {

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

    async open(): Promise<void> {
        this.navigationMenu.openPetTypesPage();
        await expect(this.elements.heading).toHaveText("Pet Types");
    }

    async addNewPetType(petType: string): Promise<void> {
        await this.elements.addButton.click();
        await this._asserts.assertFieldsForAddingPetTypesAreVisible();
        await this.elements.nameField.fill(petType);
        await this.elements.saveButton.click();
    }

    async deletePetType(petType: string) {
        this.page.on("dialog", dialog => {
            expect(dialog.message()).toEqual("Delete the pet type?");
            dialog.accept();
        })
        await this.elements.deleteButtonForPetType(petType).click();
    }
}