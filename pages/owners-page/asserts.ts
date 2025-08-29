import { expect } from "@playwright/test";
import { PageElements } from "./pageElements";

export class Asserts {

    constructor(private readonly elements: PageElements) { }

    async assertOwnerCountIs(ownerCount: number): Promise<void> {
        await expect(this.elements.ownerNameElement).toHaveCount(ownerCount);
    }
}