import { expect } from '@playwright/test';
import { test } from "../fixtures/base.ts";
import { AddPetFormData } from '../types/add-pet-form-data.ts';
import { PetVisitData } from '../types/pet-visit-data.ts';

test.beforeEach(async ({ ownersPage }) => {
    // 1. Select the OWNERS menu item in the navigation bar and then select "Search" from the drop-down menu
    ownersPage.open();
})

test("TC1: Select the desired date in the calendar", async ({ ownersPage, ownerInformationPage, }) => {
    // 2. In the list of the Owners, locate the owner by the name "Harold Davis" and select this owner
    await ownersPage.openOwnerInformation("Harold Davis");
    // 3. On the Owner Information page, select "Add New Pet" button
    // 4. In the Name field, type any new pet name, for example "Tom"
    // 5. Add the assertion of icon in the input field, that it changed from "x" to "v"
    // 6. Click on the calendar icon for the "Birth Date" field
    // 7. Using calendar selector, select the date "May 2nd, 2014"
    // 8. Add the assertion of the in the input field is in the format "2014/05/02"
    // 9. Select the type of pet "dog" and click "Save Pet" button
    const petData: AddPetFormData = {
        name: "Tom",
        birthDate: "2014/MAY/2",
        type: "dog",
    }
    await ownerInformationPage.addNewPet(petData);
    // 10. On the Owner Information page, add assertions for the newly created pet. Name is Tom, Birth Date is in the format "2014-05-02", Type is dog
    await ownerInformationPage.asserts.assertNewlyCreatedPet(petData);
    // 11. Click "Delete Pet" button the for the new pet "Tom"
    await ownerInformationPage.deletePet(petData.name);
    // 12. Add assertion that Tom does not exist in the list of pets anymore
    await expect(ownerInformationPage.elements.petCardElementFor(petData.name)).not.toBeVisible();
})

test("TC2: Select the dates of visits and validate dates order", async ({ page, ownersPage, ownerInformationPage }) => {
    // 2. In the list of the Owners, locate the owner by the name "Jean Coleman" and select this owner
    await ownersPage.openOwnerInformation("Jean Coleman");
    // 3. In the list of pets, locate the pet with a name "Samantha" and click "Add Visit" button
    // 4. Add the assertion that "New Visit" is displayed as header of the page
    // 5. Add the assertion that pet name is "Samantha" and owner name is "Jean Coleman"
    // 6. Click on the calendar icon and select the current date in date picker
    // 7. Add assertion that selected date is displayed and it is in the format "YYYY/MM/DD"
    // 8. Type the description in the field, for example, "dermatologists visit" and click "Add Visit" button
    // 9. Add assertion that selected date of visit is displayed at the top of the list of visits for "Samantha" pet 
    // on the "Owner Information" page and is in the format "YYYY-MM-DD"
    const petFirstVisit: PetVisitData = await ownerInformationPage.addVisitForPet("Samantha", "dermatologists visit");
    await ownerInformationPage.asserts.assertNewAddedVisitForPet("Samantha");
    // 11. Click on the calendar icon and select the date which is 45 days back from the current date
    // 12. Type the description in the field, for example, "massage therapy" and click "Add Visit" button
    const petSecondVisit: PetVisitData = await ownerInformationPage.addVisitForPet("Samantha", "massage therapy", 45);
    // 13. Add the assertion, that date added at step 11 is in chronological order in relation to the previous dates for "Samantha" pet 
    // on the "Owner Information" page. The date of visit above this date in the table should be greater.
    // await ownerInformationPage.asserts.assertChronologicalOrderBetweenTwoVisits(petFirstVisit, petSecondVisit);
    // 14. Select the "Delete Visit" button for both newly created visits
    await ownerInformationPage.deletePetVisit("Samantha", petFirstVisit, petSecondVisit);
    // // 15. Add the assertion that deleted visits are no longer displayed in the table on "Owner Information" page
    await ownerInformationPage.asserts.assertsVisitsDelete("Samantha", petFirstVisit, petSecondVisit);
})