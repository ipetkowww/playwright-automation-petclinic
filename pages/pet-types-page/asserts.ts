import { expect } from '@playwright/test';
import { PageElements } from './pageElements';

export class Asserts {

    constructor(private readonly elements: PageElements) { }

    async assertFieldsForAddingPetTypesAreVisible(): Promise<void> {
        await expect(this.elements.heading.getByText("New Pet Type")).toBeVisible();
        await expect(this.elements.nameLabelForInputField).toBeVisible();
        await expect(this.elements.nameField).toBeVisible();
    }
}