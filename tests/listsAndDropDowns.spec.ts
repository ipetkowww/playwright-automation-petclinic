import { expect } from '@playwright/test';
import { test } from '../fixtures/base.ts';

test.beforeEach(async ({ ownersPage }) => {
    // 1. Select the OWNERS menu item in the navigation bar and then select "Search" from the drop-down menu
    // 2. Add assertion of the "Owners" text displayed
    await ownersPage.open();
})

test("TC 1: Validate selected pet types from the list",
    async ({ ownersPage, ownerInformationPage, editPetPage }) => {
        // 3. Select the first owner "George Franklin"
        // 4. Add the assertion for the owner "Name", the value "George Franklin" is displayed
        await ownersPage.openOwnerInformation("George Franklin");
        // 5. In the "Pets and Visits" section, click on "Edit Pet" button for the pet with a name "Leo"
        await ownerInformationPage.elements.editPetButtonFor("Leo").click();
        // 6. Add assertion of "Pet" text displayed as header on the page
        await expect(editPetPage.elements.heading).toHaveText("Pet");
        // 7. Add the assertion "George Franklin" name is displayed in the "Owner" field
        await expect(editPetPage.elements.ownerNameField).toHaveValue("George Franklin");
        // 8. Add the assertion the value "cat" is displayed in the "Type" field
        await expect(editPetPage.elements.typeField).toHaveValue("cat");
        // 9. Using a loop, select the values from the drop-down one by one, and add the assertion, that every selected value from the drop-down is displayed in the "Type" field
        const petTypes: string[] = await editPetPage.elements.allPetTypes.allTextContents();
        for (const petType of petTypes) {
            await editPetPage.selectPetType(petType);
            await expect(editPetPage.elements.typeField).toHaveValue(petType);
        }
    })

test("TC2: Validate the pet type update",
    async ({ page, ownersPage, ownerInformationPage, editPetPage }) => {
        // 3. Select the owner "Eduardo Rodriquez"
        await ownersPage.openOwnerInformation("Eduardo Rodriquez");
        // 4. In the "Pets and Visits" section, click on "Edit Pet" button for the pet with a name "Rosy"
        await ownerInformationPage.elements.editPetButtonFor("Rosy").click();
        // 5. Add the assertion that name "Rosy" is displayed in the input field "Name"
        await expect(editPetPage.elements.nameField).toHaveValue("Rosy");
        // 6. Add the assertion the value "dog" is displayed in the "Type" field
        await expect(editPetPage.elements.typeField).toHaveValue("dog");
        // 7. From the drop - down menu, select the value "bird"
        // 8. On the "Pet details" page, add the assertion the value "bird" is displayed in the "Type" field as well as drop - down input field
        // 9. Select "Update Pet" button
        await editPetPage.editPet("bird");
        // 10. On the "Owner Information" page, add the assertion that pet "Rosy" has a new value of the Type "bird"
        await expect(ownerInformationPage.elements.petTypeElementFor("Rosy")).toHaveText("bird");
        // 11. Select "Edit Pet" button one more time, and perform steps 6 - 10 to revert the selection of the pet type "bird" to its initial value "dog"
        await ownerInformationPage.elements.editPetButtonFor("Rosy").click();
        await expect(editPetPage.elements.typeField).toHaveValue("bird");
        await editPetPage.editPet("dog");
        await expect(ownerInformationPage.elements.petTypeElementFor("Rosy")).toHaveText("dog");
    })