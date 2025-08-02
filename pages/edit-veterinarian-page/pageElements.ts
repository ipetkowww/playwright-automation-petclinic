import { Locator, Page } from '@playwright/test';
import { SpecialitiesEnum } from '../../data/enums/SpecialitiesEnum';

export class PageElements {

    constructor(private readonly page: Page) { }

    get specialitiesDropdown(): Locator {
        return this.page.locator("span.selected-specialties");
    }

    get radiologyCheckbox(): Locator {
        return this.getSpecialityCheckbox(SpecialitiesEnum.RADIOLOGY);
    }

    get surgeryCheckbox(): Locator {
        return this.getSpecialityCheckbox(SpecialitiesEnum.SURGERY);
    }

    get dentistryCheckbox(): Locator {
        return this.getSpecialityCheckbox(SpecialitiesEnum.DENTISTRY);
    }

    get specialitiesCheckboxes(): Locator {
        return this.page.getByRole("checkbox");
    }

    private getSpecialityCheckbox(specialityValue: SpecialitiesEnum): Locator {
        return this.page.getByRole("checkbox", { name: specialityValue });
    }
}