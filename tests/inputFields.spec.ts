import { expect, Locator, test } from '@playwright/test';

let heading: Locator;

test.beforeEach(async ({ page }) => {
    await page.goto('/')

    // 1. Select the PET TYPES menu item in the navigation bar
    await page.getByTitle("pettypes").click();

    // 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
    heading = page.getByRole("heading");
    await expect(heading).toHaveText("Pet Types")
})

test("TC1: Update pet type", async ({ page }) => {
    // 3. Click on "Edit" button for the "cat" pet type
    await page.getByRole('row', { name: "cat" }).locator("//button[text()='Edit']").click();
    // 4. Add assertion of the "Edit Pet Type" text displayed
    await expect(heading).toHaveText("Edit Pet Type")
    // 5. Change the pet type name from "cat" to "rabbit" and click "Update" button
    const nameInputField: Locator = page.getByRole("textbox");
    await nameInputField.clear();
    await nameInputField.fill("rabbit");
    await page.getByRole("button", { name: "Update" }).click();
    // 6. Add the assertion that the first pet type in the list of types has a value "rabbit" 
    let firstPetType: Locator = page.getByRole("textbox").first();
    expect(firstPetType).toHaveValue("rabbit");
    // 7. Click on "Edit" button for the same "rabbit" pet type
    await page.getByRole('row', { name: "rabbit" }).locator("//button[text()='Edit']").click();
    // 8. Change the pet type name back from "rabbit" to "cat" and click "Update" button
    await nameInputField.clear();
    await nameInputField.fill("cat");
    await page.getByRole("button", { name: "Update" }).click();
    // 9. Add the assertion that the first pet type in the list of names has a value "cat" 
    firstPetType = page.getByRole("textbox").first();
    expect(firstPetType).toHaveValue("cat");
})

test("TC2: Cancel pet type update", async ({ page }) => {
    // 3. Click on "Edit" button for the "dog" pet type
    await page.getByRole('row', { name: "dog" }).locator("//button[text()='Edit']").click();
    // 4. Type the new pet type name "moose"
    const nameInputField: Locator = page.getByRole("textbox");
    await nameInputField.clear();
    await nameInputField.fill("moose");
    // 5. Add assertion the value "moose" is displayed in the input field of the "Edit Pet Type" page
    await expect(page.getByRole("textbox")).toHaveValue("moose");
    // 6. Click on "Cancel" button
    await page.getByRole("button", { name: "Cancel" }).click();
    // 7. Add the assertion the value "dog" is still displayed in the list of pet types
    await expect(page.getByRole("textbox").nth(1)).toHaveValue("dog")
})

test("TC3: Pet type name is required validation", async ({ page }) => {
    // 3. Click on "Edit" button for the "lizard" pet type
    await page.getByRole('row', { name: "lizard" }).locator("//button[text()='Edit']").click();
    // 4. On the Edit Pet Type page, clear the input field
    await page.getByRole("textbox").clear();
    // 5. Add the assertion for the "Name is required" message below the input field
    await expect(page.locator("span.help-block")).toHaveText("Name is required");
    // 6. Click on "Update" button
    await page.getByRole("button", { name: "Update" }).click();
    // 7. Add assertion that "Edit Pet Type" page is still displayed
    await expect(heading).toHaveText("Edit Pet Type")
    // 8. Click on the "Cancel" button
    await page.getByRole("button", { name: "Cancel" }).click();
    // 9. Add assertion that "Pet Types" page is displayed
    await expect(heading).toHaveText("Pet Types")
})