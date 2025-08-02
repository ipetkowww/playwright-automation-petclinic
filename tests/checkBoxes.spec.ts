import { expect } from '@playwright/test';
import { test } from "../fixtures/base.ts";

test.beforeEach(async ({ page, veterinariansAllPage }) => {
    // 1. Select the VETERINARIANS menu item in the navigation bar, then select "All"
    await veterinariansAllPage.open();
})

test("TC1: Select all specialties", async ({ veterinariansAllPage, editVeterinarianPage }) => {
    // 2. Add assertion of the "Veterinarians" text displayed above the table with the list of Veterinarians
    await expect(veterinariansAllPage.elements().heading()).toHaveText("Veterinarians")
    // 3. Select the veterinarian "Helen Leary" and click "Edit Vet" button
    editVeterinarianPage = await veterinariansAllPage.clickEditVetButtonForVeterinarian("Helen Leary");
    // 4. Add assertion of the "Specialties" field. The value "radiology" is displayed
    await expect(editVeterinarianPage.elements.specialitiesDropdown).toHaveText("radiology");
    // 5. Click on the "Specialties" drop-down menu
    await editVeterinarianPage.openSpecialitiesDropdown()
    // 6. Add assertion that "radiology" specialty is checked
    await expect(editVeterinarianPage.elements.radiologyCheckbox).toBeChecked();
    // 7. Add assertion that "surgery" and "dentistry" specialties are unchecked
    expect(await editVeterinarianPage.elements.surgeryCheckbox.isChecked()).toBeFalsy();
    expect(await editVeterinarianPage.elements.dentistryCheckbox.isChecked()).toBeFalsy();
    // 8. Check the "surgery" item specialty and uncheck the "radiology" item speciality
    await editVeterinarianPage.elements.surgeryCheckbox.check();
    await editVeterinarianPage.elements.radiologyCheckbox.uncheck();
    // 9. Add assertion of the "Specialties" field displayed value "surgery"
    await expect(editVeterinarianPage.elements.specialitiesDropdown).toHaveText("surgery");
    // 10. Check the "dentistry" item specialty
    await editVeterinarianPage.elements.dentistryCheckbox.check();
    // 11. Add assertion of the "Specialties" field. The value "surgery, dentistry" is displayed
    await expect(editVeterinarianPage.elements.specialitiesDropdown).toHaveText("surgery, dentistry");
})

test("TC2: Validate selected specialties", async ({ veterinariansAllPage, editVeterinarianPage }) => {
    // 2. Select the veterinarian "Rafael Ortega" and click "Edit Vet" button
    await veterinariansAllPage.clickEditVetButtonForVeterinarian("Rafael Ortega");
    // 3. Add assertion that "Specialties" field is displayed value "surgery"
    await expect(editVeterinarianPage.elements.specialitiesDropdown).toHaveText("surgery");
    // 4. Click on the "Specialties" drop-down menu
    // 5. Check all specialties from the list
    await editVeterinarianPage.checkAllSpecialities();
    // 6. Add assertion that all specialties are checked
    await editVeterinarianPage.asserts.assertAllSpecialitiesAreChecked();
    // 7. Add assertion that all checked specialities are displayed in the "Specialties" field
    await expect(editVeterinarianPage.elements.specialitiesDropdown).toHaveText("surgery, radiology, dentistry");
})

test("TC3: Unselect all specialties", async ({ page, veterinariansAllPage, editVeterinarianPage }) => {
    // 2. Select the veterinarian "Linda Douglas" and click "Edit Vet" button
    editVeterinarianPage = await veterinariansAllPage.clickEditVetButtonForVeterinarian("Linda Douglas");
    // 3. Add assertion of the "Specialties" field displayed value "surgery, dentistry"
    await expect(editVeterinarianPage.elements.specialitiesDropdown).toHaveText("dentistry, surgery");
    // 4. Click on the "Specialties" drop-down menu
    // 5. Uncheck all specialties from the list
    await editVeterinarianPage.uncheckAllSpecialities();
    // 6. Add assertion that all specialties are unchecked
    editVeterinarianPage.asserts.assertAllSpecialitiesAreUnchecked();
    // 7. Add assertion that "Specialties" field is empty
    await expect(editVeterinarianPage.elements.specialitiesDropdown).toBeEmpty();
})