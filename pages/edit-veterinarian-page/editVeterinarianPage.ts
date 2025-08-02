import { Page } from '@playwright/test';
import { WebPage } from '../webPage';
import { Asserts } from './asserts';
import { PageElements } from './pageElements';

export class EditVeterinarianPage extends WebPage {

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

    async openSpecialitiesDropdown(): Promise<void> {
        await this.elements.specialitiesDropdown.click();
    }

    async checkAllSpecialities(): Promise<void> {
        await this.openSpecialitiesDropdown();
        for (const specialityCheckbox of await this.elements.specialitiesCheckboxes.all()) {
            await specialityCheckbox.check();
        }
    }

    async uncheckAllSpecialities(): Promise<void> {
        await this.openSpecialitiesDropdown();
        for (const specialityCheckbox of await this.elements.specialitiesCheckboxes.all()) {
            await specialityCheckbox.uncheck();
        }
    }
}