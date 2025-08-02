import { expect } from '@playwright/test';
import { PageElements } from './pageElements';

export class Asserts {

    constructor(private readonly elements: PageElements) { }

    async assertAllSpecialitiesAreChecked(): Promise<void> {
        for (let specialityCheckbox of await this.elements.specialitiesCheckboxes.all()) {
            await expect(specialityCheckbox).toBeChecked();
        }
    }

    async assertAllSpecialitiesAreUnchecked(): Promise<void> {
        for (let specialityCheckbox of await this.elements.specialitiesCheckboxes.all()) {
            expect(await specialityCheckbox.isChecked()).toBeFalsy();
        }
    }
}