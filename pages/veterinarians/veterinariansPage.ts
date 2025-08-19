import { Page } from '@playwright/test';
import { PageElements } from './pageElements';
import { EditVeterinarianPage } from '../edit-veterinarian-page/editVeterinarianPage';
import { WebPage } from '../webPage';

export class VeterinariansAllPage extends WebPage {

    private readonly pageElements: PageElements;

    constructor(protected readonly page: Page) {
        super(page);
        this.pageElements = new PageElements(this.page);
    }

    elements(): PageElements {
        return this.pageElements;
    }

    async open(): Promise<void> {
        await this.navigationMenu.openAllVeterinariansPage();
    }

    async clickEditVetButtonForVeterinarian(veterinarianName: string): Promise<EditVeterinarianPage> {
        await this.elements().editVetButtonFor(veterinarianName).click();
        return new EditVeterinarianPage(this.page);
    }
}