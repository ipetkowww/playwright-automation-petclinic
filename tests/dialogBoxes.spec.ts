import { expect, Locator, test } from '@playwright/test';

test("TC: Add and delete pet type", async ({ page }) => {
    await page.goto('/')
    // 1. Select the PET TYPES menu item in the navigation bar
    await page.getByTitle("pettypes").click();
    // 2. On the "Pet Types" page, add assertion of the "Pet Types" text displayed above the table with the list of pet types
    await expect(page.getByRole("heading")).toHaveText("Pet Types")
    // 3. Click on "Add" button
    await page.getByRole("button", { name: "Add" }).click();
    // 4. Add assertions of "New Pet Type" section title, "Name" header for the input field and the input field is visible
    const nameInputField: Locator = page.locator("#name");
    await expect(page.getByRole("heading", { name: "New Pet Type" })).toBeVisible();
    await expect(page.locator(".control-label")).toBeVisible();
    await expect(nameInputField).toBeVisible();
    // 5. Add a new pet type with the name "pig" and click "Save" button
    await nameInputField.fill("pig");
    await page.getByRole("button", { name: "Save" }).click();
    // 6. Add assertion that the last item in the list of pet types has value of "pig"
    const lastPetTypeField: Locator = page.locator('[name="pettype_name"]').last();
    await expect(lastPetTypeField).toHaveValue("pig");
    // 7. Click on "Delete" button for the "pig" pet type
    page.on("dialog", dialog => {
        // 8. Add assertion to validate the message of the dialog box "Delete the pet type?"
        expect(dialog.message()).toEqual("Delete the pet type?");
        // 9. Click on OK button on the dialog box
        dialog.accept();
    })
    await page.getByRole("row", { name: "pig" }).getByRole("button", { name: "Delete" }).click();
    // 10, Add assertion, that the last item in the list of pet types is not the "pig"
    await expect(lastPetTypeField).not.toHaveText("pig");
})