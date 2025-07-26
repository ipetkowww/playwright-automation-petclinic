import { expect, Locator, test } from '@playwright/test';
import * as actions from "./helper";

let heading: Locator;

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    page.waitForResponse("https://petclinic-api.bondaracademy.com/petclinic/api/seed");

    // 1. Select the PET TYPES menu item in the navigation bar
    await page.getByTitle("pettypes").click();
    await actions.waitForSpinner(page);

    // 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
    heading = page.getByRole("heading");
    await expect(heading).toHaveText("Pet Types")
})

test("TC1: Update pet type", async ({ page }) => {
    const cat: string = "cat";
    const rabbit: string = "rabbit";

    // 3. Click on "Edit" button for the "cat" pet type
    await actions.editPet(cat, page);
    // 4. Add assertion of the "Edit Pet Type" text displayed
    await expect(heading).toHaveText("Edit Pet Type")
    // 5. Change the pet type name from "cat" to "rabbit" and click "Update" button
    await actions.changePetNameTo(rabbit, page);
    await actions.clickButton("Update", page);
    // 6. Add the assertion that the first pet type in the list of types has a value "rabbit" 
    let firstPetTypeValue: string = await page.getByRole("textbox").first().inputValue();
    expect(firstPetTypeValue).toEqual(rabbit);
    // 7. Click on "Edit" button for the same "rabbit" pet type
    await actions.editPet(rabbit, page);
    // 8. Change the pet type name back from "rabbit" to "cat" and click "Update" button
    await actions.changePetNameTo(cat, page);
    await actions.clickButton("Update", page);
    // 9. Add the assertion that the first pet type in the list of names has a value "cat" 
    firstPetTypeValue = await page.getByRole("textbox").first().inputValue();
    expect(firstPetTypeValue).toEqual(cat);
})

test("TC2: Cancel pet type update", async ({ page }) => {
    const dog: string = "dog";
    const moose: string = "moose";

    // 3. Click on "Edit" button for the "dog" pet type
    await actions.editPet(dog, page);
    // 4. Type the new pet type name "moose"
    await actions.changePetNameTo(moose, page);
    // 5. Add assertion the value "moose" is displayed in the input field of the "Edit Pet Type" page
    await expect(page.getByRole("textbox")).toHaveValue(moose);
    // 6. Click on "Cancel" button
    await actions.clickButton("Cancel", page);
    // 7. Add the assertion the value "dog" is still displayed in the list of pet types
    const petTypeInputFields: Locator[] = await page.getByRole("textbox").all();

    const petTypes: string[] = await Promise.all(
        petTypeInputFields.map(async (e) => await e.inputValue())
    );
    expect(petTypes).toContain(dog);
})

test("TC3: Pet type name is required validation", async ({ page }) => {
    const lizard: string = "lizard";

    // 3. Click on "Edit" button for the "lizard" pet type
    await actions.editPet(lizard, page);
    // 4. On the Edit Pet Type page, clear the input field
    await page.getByRole("textbox").clear();
    // 5. Add the assertion for the "Name is required" message below the input field
    await expect(page.locator("span.help-block")).toHaveText("Name is required");
    // 6. Click on "Update" button
    await actions.clickButton("Update", page);
    await actions.waitForSpinner(page);
    // 7. Add assertion that "Edit Pet Type" page is still displayed
    await expect(heading).toHaveText("Edit Pet Type")
    // 8. Click on the "Cancel" button
    await page.getByRole("button", { name: "Cancel" }).click();
    await actions.waitForSpinner(page);
    // 9. Add assertion that "Pet Types" page is displayed
    await expect(heading).toHaveText("Pet Types")
})