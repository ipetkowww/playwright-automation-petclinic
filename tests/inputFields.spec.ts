import { expect, Locator, Page, test } from '@playwright/test';

let spinner: Locator;

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    spinner = page.locator("mat-spinner");
    page.waitForResponse("https://petclinic-api.bondaracademy.com/petclinic/api/seed");
})

test("TC1: Update pet type", async ({ page }) => {
    const cat: string = "cat";
    const rabbit: string = "rabbit";

    // 1. Select the PET TYPES menu item in the navigation bar
    await page.getByTitle("pettypes").click();
    await spinner.waitFor({ state: "detached" });
    // 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
    const heading: Locator = page.getByRole("heading");
    await expect(heading).toHaveText("Pet Types")
    // 3. Click on "Edit" button for the "cat" pet type
    await editPet(cat, page);
    // 4. Add assertion of the "Edit Pet Type" text displayed
    await expect(heading).toHaveText("Edit Pet Type")
    // 5. Change the pet type name from "cat" to "rabbit" and click "Update" button
    await changePetNameTo(rabbit, page);
    // 6. Add the assertion that the first pet type in the list of types has a value "rabbit" 
    let firstPetTypeValue: string = await page.getByRole("textbox").first().inputValue();
    expect(firstPetTypeValue).toEqual(rabbit);
    // 7. Click on "Edit" button for the same "rabbit" pet type
    await editPet(rabbit, page);
    // 8. Change the pet type name back from "rabbit" to "cat" and click "Update" button
    await changePetNameTo(cat, page);
    // 9. Add the assertion that the first pet type in the list of names has a value "cat" 
    firstPetTypeValue = await page.getByRole("textbox").first().inputValue();
    expect(firstPetTypeValue).toEqual(cat);
})

async function editPet(petName: string, page: Page): Promise<void> {
    await page.getByRole('row', { name: petName }).locator("//button[text()='Edit']").click();
    await spinner.waitFor({ state: "detached" });
}

async function changePetNameTo(petName: string, page: Page): Promise<void> {
    await page.locator("#name").clear();
    await page.locator("#name").fill(petName);
    await page.getByRole("button", { name: "Update" }).click();
    await spinner.waitFor({ state: "detached" });
}