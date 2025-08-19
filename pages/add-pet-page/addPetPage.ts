import { expect, Page } from '@playwright/test';
import { AddPetFormData } from '../../types/add-pet-form-data';
import { DateUtils } from '../../utils/dateUtils';
import { WebPage } from '../webPage';
import { PageElements } from './pageElements';

export class AddPetPage extends WebPage {

    private readonly _elements: PageElements;

    constructor(protected readonly page: Page) {
        super(page);
        this._elements = new PageElements(this.page);
    }

    get elements() {
        return this._elements;
    }

    async fillName(petName: string): Promise<void> {
        await this.elements.petNameTextField.fill(petName);
        await expect(this.elements.iconAtTheEndOfNameField).toHaveAttribute("class", /glyphicon-ok/);
    }

    async selectBirthDate(dateAsString: string): Promise<void> {
        const [year, month, day]: string[] = dateAsString.split("/");

        await this.elements.calendarIcon.click();
        await this.elements.monthAndYearButton.click();
        await this.elements.previous24YearsButton.click();
        await this.elements.yearButton(year).click();
        await this.elements.monthButton(month).click();
        await this.elements.dayButton(day).click();
        await expect(this.elements.petBirthDateDateField).toHaveValue(DateUtils.convertDateFormat(dateAsString, "/"));
    }

    async selectPetType(petType: string): Promise<void> {
        await this.page.selectOption("#type", petType);
    }

    async clickSavePetButton(): Promise<void> {
        await this.elements.savePetButton.click();
    }

    async savePet(petData: AddPetFormData): Promise<void> {
        await this.fillName(petData.name);
        await this.selectBirthDate(petData.birthDate);
        await this.selectPetType(petData.type);
        await this.clickSavePetButton();
    }
}