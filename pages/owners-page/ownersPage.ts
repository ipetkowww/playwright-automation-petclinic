import { expect, Page } from '@playwright/test';
import { WebPage } from '../webPage';
import { Asserts } from './asserts';
import { PageElements } from './pageElements';

export class OwnersPage extends WebPage {

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
        this.navigationMenu.openOwnersPage();
        await expect(this.elements.heading).toHaveText("Owners")
    }

    async openOwnerInformation(ownerName: string): Promise<void> {
        await this.elements.getOwnerNameLink(ownerName).click();
        await expect(this.elements.ownerNameElement).toHaveText(ownerName);
    }
}