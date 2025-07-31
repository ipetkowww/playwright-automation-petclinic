import { expect, Locator, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // 1. Select the OWNERS menu item in the navigation bar and then select "Search" from the drop-down menu
    await page.getByText(/Owners/).click();
    await page.getByRole("link", { name: "Search" }).click();
})

test("TC1: Select the desired date in the calendar", async ({ page }) => {
    // 2. In the list of the Owners, locate the owner by the name "Harold Davis" and select this owner
    await page.getByRole("row", { name: "Harold Davis" }).locator(".ownerFullName a").click();
    // 3. On the Owner Information page, select "Add New Pet" button
    await page.getByRole("button", { name: "Add New Pet" }).click();
    // 4. In the Name field, type any new pet name, for example "Tom"
    const nameField: Locator = page.locator("#name");
    await nameField.fill("Tom");
    // 5. Add the assertion of icon in the input field, that it changed from "x" to "v"
    expect(await nameField.getAttribute("class")).toContain("ng-valid");
    // 6. Click on the calendar icon for the "Birth Date" field
    await page.locator("mat-datepicker-toggle button").click();
    // 7. Using calendar selector, select the date "May 2nd, 2014"
    await page.locator(".mat-calendar-period-button").click();
    await page.locator(".mat-calendar-previous-button").click();
    await page.locator(".mat-calendar-body-cell", { hasText: "2014" }).click();
    await page.locator(".mat-calendar-body-cell", { hasText: "MAY" }).click();
    await page.getByText("2", { exact: true }).click();
    // 8. Add the assertion of the in the input field is in the format "2014/05/02"
    expect(await page.locator("[name='birthDate']").inputValue()).toEqual("2014/05/02");
    // 9. Select the type of pet "dog" and click "Save Pet" button
    await page.selectOption("#type", "dog");
    await page.getByRole("button", { name: "Save Pet" }).click();
    // 10. On the Owner Information page, add assertions for the newly created pet. Name is Tom, Birth Date is in the format "2014-05-02", Type is dog
    const petCard: Locator = page.locator("app-pet-list", { hasText: "Tom" });
    await expect(petCard.locator("dt:has-text('Name') + dd")).toHaveText("Tom");
    await expect(petCard.locator("dt:has-text('Birth Date') + dd")).toHaveText("2014-05-02");
    await expect(petCard.locator("dt:has-text('Type') + dd")).toHaveText("dog");
    // 11. Click "Delete Pet" button the for the new pet "Tom"
    await petCard.getByRole("button", { name: "Delete Pet" }).click();
    // 12. Add assertion that Tom does not exist in the list of pets anymore
    await expect(petCard).not.toBeVisible();
})

test("TC2: Select the dates of visits and validate dates order", async ({ page }) => {
    // 2. In the list of the Owners, locate the owner by the name "Jean Coleman" and select this owner
    await page.getByRole("row", { name: "Jean Coleman" }).locator(".ownerFullName a").click();
    // 3. In the list of pets, locate the pet with a name "Samantha" and click "Add Visit" button
    const petCard: Locator = page.locator("app-pet-list", { hasText: "Samantha" });
    await petCard.getByRole("button", { name: "Add Visit" }).click();
    // 4. Add the assertion that "New Visit" is displayed as header of the page
    await expect(page.getByRole("heading")).toHaveText("New Visit");
    // 5. Add the assertion that pet name is "Samantha" and owner name is "Jean Coleman"
    const targetRow: Locator = page.locator(".table-striped").getByRole("row", { name: "Samantha" });
    await expect(targetRow.locator("td").nth(0)).toHaveText("Samantha");
    await expect(targetRow.locator("td").nth(3)).toHaveText("Jean Coleman");
    // 6. Click on the calendar icon and select the current date in date picker
    await page.locator("mat-datepicker-toggle button").click();
    await page.locator("button.mat-calendar-body-active").click();
    // 7. Add assertion that selected date is displayed and it is in the format "YYYY/MM/DD"
    const dateField: Locator = page.locator("input[name='date']");
    expect(await dateField.inputValue()).toMatch(/^\d{4}\/\d{2}\/\d{2}$/);
    // 8. Type the description in the field, for example, "dermatologists visit" and click "Add Visit" button
    const descriptionField: Locator = page.locator("#description");
    const addVisitButton: Locator = page.getByRole("button", { name: "Add Visit" });
    await descriptionField.fill("dermatologists visit");
    await addVisitButton.click();
    // 9. Add assertion that selected date of visit is displayed at the top of the list of visits for "Samantha" pet 
    // on the "Owner Information" page and is in the format "YYYY-MM-DD"
    const visitTableRows: Locator = petCard.locator("app-visit-list table > tr");
    // const firstRowPetVisits: Locator = petCard.locator("app-visit-list table > tr").first();
    const todayDate = new Date().toLocaleDateString("en-CA");
    const firstVisitDate: null | string = await visitTableRows.first().locator("td").nth(0).textContent();
    expect(firstVisitDate).toEqual(todayDate);
    expect(firstVisitDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    // 10. Add one more visit for "Samantha" pet by clicking "Add Visit" button
    await petCard.getByRole("button", { name: "Add Visit" }).click();
    // 11. Click on the calendar icon and select the date which is 45 days back from the current date
    const date: Date = new Date();
    date.setDate(date.getDate() - 45);
    const expectedDay: string = date.getDate().toString().padStart(2, '0');
    const expectedMonth: string = (date.getMonth() + 1).toString().padStart(2, '0');
    const expectedYear: string = date.getFullYear().toString();
    await dateField.fill(`${expectedYear}/${expectedMonth}/${expectedDay}`)
    // 12. Type the description in the field, for example, "massage therapy" and click "Add Visit" button
    await descriptionField.fill("massage therapy");
    await addVisitButton.click();
    // 13. Add the assertion, that date added at step 11 is in chronological order in relation to the previous dates for "Samantha" pet 
    // on the "Owner Information" page. The date of visit above this date in the table should be greater.
    const secondVisitDate: null | string = await visitTableRows.nth(1).locator("td").nth(0).textContent();
    expect(new Date(firstVisitDate!).getTime()).toBeGreaterThan(new Date(secondVisitDate!).getTime());
    // 14. Select the "Delete Visit" button for both newly created visits
    const createdRowsCount: number = 2;
    for (let i = 0; i < createdRowsCount; i++) {
        await visitTableRows.first().getByRole("button", { name: "Delete Visit" }).click();
    }
    // 15. Add the assertion that deleted visits are no longer displayed in the table on "Owner Information" page
    await expect(visitTableRows.getByText(firstVisitDate!)).not.toBeVisible();
    await expect(visitTableRows.getByText(secondVisitDate!)).not.toBeVisible();
})