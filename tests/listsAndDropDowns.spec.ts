import { expect, Locator, test } from '@playwright/test';

let heading: Locator;

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // 1. Select the OWNERS menu item in the navigation bar and then select "Search" from the drop-down menu
    await page.getByText(/Owners/).click();
    await page.getByRole("link", { name: "Search" }).click();
    // 2. Add assertion of the "Owners" text displayed
    heading = page.getByRole("heading");
    await expect(heading).toHaveText("Owners")
})

test("TC 1: Validate selected pet types from the list", async ({ page }) => {
    // 3. Select the first owner "George Franklin"
    await page.getByRole("row", { name: "George Franklin" }).getByRole("link", { name: "George Franklin" }).click()
    // 4. Add the assertion for the owner "Name", the value "George Franklin" is displayed
    await expect(page.getByRole("row", { name: "Name" }).locator("b.ownerFullName")).toHaveText("George Franklin");
    // 5. In the "Pets and Visits" section, click on "Edit Pet" button for the pet with a name "Leo"
    const petCard: Locator = page.locator('app-pet-list >> text=Leo').locator('..').locator('..');
    await petCard.getByRole('button', { name: 'Edit Pet' }).click();
    // 6. Add assertion of "Pet" text displayed as header on the page
    await expect(heading).toHaveText("Pet");
    // 7. Add the assertion "George Franklin" name is displayed in the "Owner" field
    await expect(page.locator("#owner_name")).toHaveValue("George Franklin");
    // 8. Add the assertion the value "cat" is displayed in the "Type" field
    const typeFiled: Locator = page.locator("input#type1");
    await expect(typeFiled).toHaveValue("cat");
    // 9. Using a loop, select the values from the drop-down one by one, and add the assertion, that every selected value from the drop-down is displayed in the "Type" field
    const petTypes: Locator[] = await page.locator("select option").all();
    for (const petType of petTypes) {
        const pet: null | string = await petType.textContent();
        await page.selectOption('select#type', pet);
        await expect(typeFiled).toHaveValue(pet!);
    }
})

test("TC2: Validate the pet type update", async ({ page }) => {
    // 3. Select the owner "Eduardo Rodriquez"
    await page.getByRole("row", { name: "Eduardo Rodriquez" }).getByRole("link", { name: "Eduardo Rodriquez" }).click()
    // 4. In the "Pets and Visits" section, click on "Edit Pet" button for the pet with a name "Rosy"
    const petCard: Locator = page.locator('app-pet-list >> text=Rosy').locator('..').locator('..');
    await petCard.getByRole('button', { name: 'Edit Pet' }).click();
    // 5. Add the assertion that name "Rosy" is displayed in the input field "Name"
    await expect(page.getByRole("textbox", { name: "Name" })).toHaveValue("Rosy");
    // 6. Add the assertion the value "dog" is displayed in the "Type" field
    const typeFiled: Locator = page.locator("input#type1");
    await expect(typeFiled).toHaveValue("dog");
    // 7. From the drop - down menu, select the value "bird"
    await page.selectOption('select#type', "bird");
    // 8. On the "Pet details" page, add the assertion the value "bird" is displayed in the "Type" field as well as drop - down input field
    await expect(typeFiled).toHaveValue("bird");
    await expect(page.locator("select#type")).toHaveValue("bird");
    // 9. Select "Update Pet" button
    await page.getByRole("button", { name: "Update Pet" }).click();
    // 10. On the "Owner Information" page, add the assertion that pet "Rosy" has a new value of the Type "bird"
    await expect(petCard.locator("//dt[text()='Type']//following-sibling::dd")).toHaveText("bird");
    // 11. Select "Edit Pet" button one more time, and perform steps 6 - 10 to revert the selection of the pet type "bird" to its initial value "dog"
    await petCard.getByRole('button', { name: 'Edit Pet' }).click();
    await expect(typeFiled).toHaveValue("bird");
    await page.selectOption('select#type', "dog");
    await expect(typeFiled).toHaveValue("dog");
    await expect(page.locator("select#type")).toHaveValue("dog");
    await page.getByRole("button", { name: "Update Pet" }).click();
    await expect(petCard.locator("//dt[text()='Type']//following-sibling::dd")).toHaveText("dog");
})