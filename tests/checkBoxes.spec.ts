import { expect, Locator, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // 1. Select the VETERINARIANS menu item in the navigation bar, then select "All"
    await page.getByText(/Veterinarians/).click();
    await page.getByRole("link", { name: "All" }).click();
})

test("TC1: Select all specialties", async ({ page }) => {
    // 2. Add assertion of the "Veterinarians" text displayed above the table with the list of Veterinarians
    await expect(page.getByRole("heading")).toHaveText("Veterinarians")
    // 3. Select the veterinarian "Helen Leary" and click "Edit Vet" button
    await page.getByRole('row', { name: "Helen Leary" }).getByRole("button", { name: "Edit Vet" }).click();
    // 4. Add assertion of the "Specialties" field. The value "radiology" is displayed
    const specialitiesDropdown: Locator = page.locator("div.dropdown-display");
    const selectedOptions: Locator = page.locator("span.selected-specialties");
    await expect(selectedOptions).toHaveText("radiology");
    // 5. Click on the "Specialties" drop-down menu
    await specialitiesDropdown.click();
    // 6. Add assertion that "radiology" specialty is checked
    const radiologyCheckbox: Locator = page.getByRole("checkbox", { name: "radiology" });
    const surgeryCheckbox: Locator = page.getByRole("checkbox", { name: "surgery" });
    const dentistryCheckbox: Locator = page.getByRole("checkbox", { name: "dentistry" });
    await expect(radiologyCheckbox).toBeChecked();
    // 7. Add assertion that "surgery" and "dentistry" specialties are unchecked
    expect(await surgeryCheckbox.isChecked()).toBeFalsy();
    expect(await dentistryCheckbox.isChecked()).toBeFalsy();
    // 8. Check the "surgery" item specialty and uncheck the "radiology" item speciality
    await surgeryCheckbox.check();
    await radiologyCheckbox.uncheck();
    // 9. Add assertion of the "Specialties" field displayed value "surgery"
    await expect(selectedOptions).toHaveText("surgery");
    // 10. Check the "dentistry" item specialty
    await dentistryCheckbox.check();
    // 11. Add assertion of the "Specialties" field. The value "surgery, dentistry" is displayed
    await expect(selectedOptions).toHaveText("surgery, dentistry");
})

test("TC2: Validate selected specialties", async ({ page }) => {
    // 2. Select the veterinarian "Rafael Ortega" and click "Edit Vet" button
    await page.getByRole('row', { name: "Rafael Ortega" }).getByRole("button", { name: "Edit Vet" }).click();
    // 3. Add assertion that "Specialties" field is displayed value "surgery"
    const specialitiesDropdown: Locator = page.locator("div.dropdown-display");
    const selectedOptions: Locator = page.locator("span.selected-specialties");
    await expect(selectedOptions).toHaveText("surgery");
    // 4. Click on the "Specialties" drop-down menu
    await specialitiesDropdown.click();
    // 5. Check all specialties from the list
    const specialitiesOptions: Locator[] = await page.getByRole("checkbox").all();
    for (const specialityOption of specialitiesOptions) {
        await specialityOption.check();
    }
    // 6. Add assertion that all specialties are checked
    for (const specialitiesOption of specialitiesOptions) {
        await expect(specialitiesOption).toBeChecked();
    }
    // 7. Add assertion that all checked specialities are displayed in the "Specialties" field
    await expect(selectedOptions).toHaveText("surgery, radiology, dentistry");
})

test("TC3: Unselect all specialties", async ({ page }) => {
    // 2. Select the veterinarian "Linda Douglas" and click "Edit Vet" button
    await page.getByRole('row', { name: "Linda Douglas" }).getByRole("button", { name: "Edit Vet" }).click();
    // 3. Add assertion of the "Specialties" field displayed value "surgery, dentistry"
    const specialitiesDropdown: Locator = page.locator("div.dropdown-display");
    const selectedOptions: Locator = page.locator("span.selected-specialties");
    await expect(selectedOptions).toHaveText("dentistry, surgery");
    // 4. Click on the "Specialties" drop-down menu
    await specialitiesDropdown.click();
    // 5. Uncheck all specialties from the list
    const specialitiesOptions: Locator[] = await page.getByRole("checkbox").all();
    for (const specialityOption of specialitiesOptions) {
        await specialityOption.uncheck();
    }
    // 6. Add assertion that all specialties are unchecked
    for (const specialitiesOption of specialitiesOptions) {
        expect(await specialitiesOption.isChecked()).toBeFalsy();
    }
    // 7. Add assertion that "Specialties" field is empty
    await expect(selectedOptions).toBeEmpty();
})