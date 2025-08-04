import { Page, Locator } from '@playwright/test';
import { WebPage } from '../webPage';
import { PageElements } from "../edit-pet-type-page/pageElements"

export class EditPetTypePage extends WebPage {

    private readonly _elements: PageElements

    constructor(protected readonly page: Page) {
        super(page);
        this._elements = new PageElements(this.page);
    }

    get elements(): PageElements {
        return this._elements;
    }

    async editPetType(petType: string, cancelUpdate = false): Promise<void> {
        await this.elements.nameField.clear();
        await this.elements.nameField.fill(petType);
        if (cancelUpdate === true) {
            this.elements.cancelButton.click();
            return;
        } 
        await this.elements.updateButton.click();
    }

}