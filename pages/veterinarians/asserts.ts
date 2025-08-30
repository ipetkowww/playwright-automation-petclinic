import { expect } from "@playwright/test";
import { PageElements } from "./pageElements";

export class Asserts {

    constructor(private readonly elements: PageElements) { }

    async countOfSpecialtiesForVeterinarian(specialtiesCount: number, veterinarianName: string): Promise<void> {
        await expect(this.elements.veterinarianSpecialties(veterinarianName)).toHaveCount(specialtiesCount);
    }
}