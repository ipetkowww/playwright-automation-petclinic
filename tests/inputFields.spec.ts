import { expect } from "@playwright/test";
import { test } from "../fixtures/base";

test.beforeEach(async ({ petTypesPage }) => {
    // 1. Select the PET TYPES menu item in the navigation bar
    await petTypesPage.open();
    // 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
    await expect(petTypesPage.elements.heading).toHaveText("Pet Types")
})

test("TC1: Update pet type", async ({ petTypesPage }) => {
    const oldPetTypeValue: string = "cat";
    const newPetTypeValue: string = "rabbit";
    // 3. Click on "Edit" button for the "cat" pet type
    // 4. Add assertion of the "Edit Pet Type" text displayed
    // 5. Change the pet type name from "cat" to "rabbit" and click "Update" button
    await petTypesPage.editPetType(oldPetTypeValue, newPetTypeValue);
    // 6. Add the assertion that the first pet type in the list of types has a value "rabbit" 
    await expect(petTypesPage.elements.allPetTypeFields.first()).toHaveValue(newPetTypeValue);
    // 7. Click on "Edit" button for the same "rabbit" pet type
    // 8. Change the pet type name back from "rabbit" to "cat" and click "Update" button
    await petTypesPage.editPetType(newPetTypeValue, oldPetTypeValue);
    // 9. Add the assertion that the first pet type in the list of names has a value "cat" 
    await expect(petTypesPage.elements.allPetTypeFields.first()).toHaveValue(oldPetTypeValue);
})

test("TC2: Cancel pet type update", async ({ petTypesPage }) => {
    const cancelUpdate: boolean = true;
    // 3. Click on "Edit" button for the "dog" pet type
    // 5. Add assertion the value "moose" is displayed in the input field of the "Edit Pet Type" page
    // 6. Click on "Cancel" button
    await petTypesPage.editPetType("dog", "moose", cancelUpdate);
    // 7. Add the assertion the value "dog" is still displayed in the list of pet types
    await expect(petTypesPage.elements.allPetTypeFields.nth(1)).toHaveValue("dog");
})

test("TC3: Pet type name is required validation", async ({ petTypesPage, editPetTypePage }) => {
    // 3. Click on "Edit" button for the "lizard" pet type
    await petTypesPage.elements.editButtonForPetType("lizard").click();
    // 4. On the Edit Pet Type page, clear the input field
    await expect(editPetTypePage.elements.nameField).toHaveValue("lizard");
    await editPetTypePage.elements.nameField.clear();
    // 5. Add the assertion for the "Name is required" message below the input field
    await expect(editPetTypePage.elements.nameIsRequiredError).toHaveText("Name is required");
    // 6. Click on "Update" button
    await editPetTypePage.elements.updateButton.click();
    // 7. Add assertion that "Edit Pet Type" page is still displayed
    await expect(editPetTypePage.elements.heading).toHaveText("Edit Pet Type")
    // 8. Click on the "Cancel" button
    await editPetTypePage.elements.cancelButton.click();
    // 9. Add assertion that "Pet Types" page is displayed
    await expect(petTypesPage.elements.heading).toHaveText("Pet Types")
})