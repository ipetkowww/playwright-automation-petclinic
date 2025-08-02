import { expect } from '@playwright/test';
import { AddPetFormData } from '../../types/add-pet-form-data';
import { PageElements } from './pageElements';
import { DateUtils } from '../../utils/dateUtils';

export class Asserts {

    constructor(private readonly elements: PageElements) { }

    async assertNewlyCreatedPet(petData: AddPetFormData): Promise<void> {
        await expect(this.elements.petNameElementFor(petData.name)).toHaveText(petData.name);
        await expect(this.elements.petBirthayElementFor(petData.name))
            .toHaveText(DateUtils.convertDateFormat(petData.birthDate));
        await expect(this.elements.petTypeElementFor(petData.name)).toHaveText(petData.type);
    }
}