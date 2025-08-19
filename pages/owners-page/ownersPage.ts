import { expect, Page } from '@playwright/test';
import { WebPage } from '../webPage';
import { PageElements } from './pageElements';

export class OwnersPage extends WebPage {

    private readonly _elements: PageElements;

    constructor(protected readonly page: Page) {
        super(page);
        this._elements = new PageElements(this.page);
    }

    get elements(): PageElements {
        return this._elements;
    }

    async open(): Promise<void> {
        this.navigationMenu.openOwnersPage();
        await expect(this.elements.heading).toHaveText("Owners")
    }

    async openOwnerInformation(ownerName: string): Promise<void> {
        await this.elements.getOwnerNameLink(ownerName).click();
        await expect(this.elements.ownerNameElement).toHaveText(ownerName);
    }
}