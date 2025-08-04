import { expect } from '@playwright/test';
import { test } from "../fixtures/base.ts";

test("TC: Add and delete pet type", async ({ petTypesPage }) => {
    const petType: string = "pig";
    // 1. Select the PET TYPES menu item in the navigation bar
    // 2. On the "Pet Types" page, add assertion of the "Pet Types" text displayed above the table with the list of pet types
    await petTypesPage.open();
    // 3. Click on "Add" button
    // 4. Add assertions of "New Pet Type" section title, "Name" header for the input field and the input field is visible
    // 5. Add a new pet type with the name "pig" and click "Save" button
    await petTypesPage.addNewPetType(petType);
    // 6. Add assertion that the last item in the list of pet types has value of "pig"
    await expect(petTypesPage.elements.allPetTypeFields.last()).toHaveValue(petType);
    // 7. Click on "Delete" button for the "pig" pet type
    // 8. Add assertion to validate the message of the dialog box "Delete the pet type?"
    // 9. Click on OK button on the dialog box
    await petTypesPage.deletePetType(petType);
    // 10, Add assertion, that the last item in the list of pet types is not the "pig"
    await expect(petTypesPage.elements.allPetTypeFields.last()).not.toHaveText(petType);
})