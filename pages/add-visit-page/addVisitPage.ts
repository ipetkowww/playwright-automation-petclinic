import { expect, Page } from '@playwright/test';
import { WebPage } from '../webPage';
import { PageElements } from './pageElements';
import { PetVisitData } from '../../types/pet-visit-data';

export class AddVisitPage extends WebPage {

    private readonly _elements: PageElements;

    constructor(protected readonly page: Page) {
        super(page);
        this._elements = new PageElements(this.page);
    }

    get elements(): PageElements {
        return this._elements;
    }

    async selectCurrentDateFromCalendar(): Promise<void> {
        await this.elements.calendarIcon.click();
        await this.elements.currentDay.click();
        expect(await this.elements.dateField.inputValue()).toMatch(/^\d{4}\/\d{2}\/\d{2}$/);
    }

    async selectDateBackInDaysFromToday(backDaysFromToday: number) {
        const date: Date = new Date();
        date.setDate(date.getDate() - backDaysFromToday);
        const expectedDay: string = date.toLocaleString('en-US', { day: '2-digit' })
        const expectedMonth: string = date.toLocaleString('en-US', { month: '2-digit' });
        const expectedYear: string = date.getFullYear().toString();
        await this.elements.dateField.fill(`${expectedYear}/${expectedMonth}/${expectedDay}`)
    }

    async addVisit(description: string, daysBackFromToday?: number): Promise<PetVisitData> {
        if (daysBackFromToday) {
            await this.selectDateBackInDaysFromToday(daysBackFromToday)
        } else {
            await this.selectCurrentDateFromCalendar();
        }
        await this.elements.descriptionField.fill(description)
        const visitDate: null | string = await this.elements.dateField.textContent();
        await this.elements.addVisitButton.click();

        return {
            visitDate: visitDate!,
            description: description
        }
    }
}