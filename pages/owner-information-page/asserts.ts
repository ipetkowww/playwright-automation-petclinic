import { expect, Locator } from '@playwright/test';
import { AddPetFormData } from '../../types/add-pet-form-data';
import { Owner, Pet } from '../../types/owner-data';
import { PetVisitData } from '../../types/pet-visit-data';
import { DateUtils } from '../../utils/dateUtils';
import { PageElements } from './pageElements';

export class Asserts {

    constructor(private readonly elements: PageElements) { }

    async assertNewlyCreatedPet(petData: AddPetFormData): Promise<void> {
        await expect(this.elements.petNameElementFor(petData.name)).toHaveText(petData.name);
        await expect(this.elements.petBirthayElementFor(petData.name))
            .toHaveText(DateUtils.convertDateFormat(petData.birthDate));
        await expect(this.elements.petTypeElementFor(petData.name)).toHaveText(petData.type);
    }

    async assertNewAddedVisitForPet(petName: string): Promise<void> {
        const visitTableRows: Locator = this.elements.visitsForPet(petName);
        const todayDate = new Date().toLocaleDateString("en-CA");
        const firstVisitDate: null | string = await visitTableRows.first().locator("td").nth(0).textContent();
        expect(firstVisitDate).toEqual(todayDate);
        expect(firstVisitDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }

    async assertChronologicalOrderBetweenTwoVisits(petFirstVisit: PetVisitData, petSecondVisit: PetVisitData): Promise<void> {
        expect(new Date(petFirstVisit.visitDate).getTime()).toBeGreaterThan(new Date(petSecondVisit.visitDate).getTime());
    }

    async assertsVisitsDelete(petName: string, ...petVisits: PetVisitData[]): Promise<void> {
        for (const petVisit of petVisits) {
            await expect(this.elements.visitsForPet(petName).getByText(petVisit.description)).not.toBeVisible();
        }
    }

    async assertOwnerInformation(owner: Owner): Promise<void> {
        await expect(this.elements.ownerName).toHaveText(`${owner.firstName} ${owner.lastName}`);
        await expect(this.elements.address).toHaveText(owner.address);
        await expect(this.elements.city).toHaveText(owner.city);
        await expect(this.elements.telephone).toHaveText(owner.telephone);
    }

    async assertPets(expectedPetsCount: number, pets: Pet[]): Promise<void> {
        expect(pets.length).toEqual(expectedPetsCount);

        for (const pet of pets) {
            await expect(this.elements.petNameElementFor(pet.name)).toHaveText(pet.name);
        }
    }

    async assertVisitCountForPetIs(expectedPetVisitCount: number, pet: Pet): Promise<void> {
        await expect(this.elements.visitsForPet(pet.name)).toHaveCount(expectedPetVisitCount);
    }
}