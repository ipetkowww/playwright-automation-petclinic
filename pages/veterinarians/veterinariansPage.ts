import { Page } from '@playwright/test';
import { PageElements } from './pageElements';
import { EditVeterinarianPage } from '../edit-veterinarian-page/editVeterinarianPage';
import { WebPage } from '../webPage';
import { Asserts } from './asserts';

export class VeterinariansAllPage extends WebPage {

    private readonly _elements: PageElements;
    private readonly _asserts: Asserts;

    constructor(protected readonly page: Page) {
        super(page);
        this._elements = new PageElements(this.page);
        this._asserts = new Asserts(this.elements);
    }

    get elements(): PageElements {
        return this._elements;
    }

    get asserts(): Asserts {
        return this._asserts;
    }

    async open(): Promise<void> {
        await this.navigationMenu.openAllVeterinariansPage();
    }

    async clickEditVetButtonForVeterinarian(veterinarianName: string): Promise<EditVeterinarianPage> {
        await this.elements.editVetButtonFor(veterinarianName).click();
        return new EditVeterinarianPage(this.page);
    }
}