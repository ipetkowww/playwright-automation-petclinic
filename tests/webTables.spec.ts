import { expect, Locator, Page, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test.describe("Tests related to OWNERS page", () => {
    test.beforeEach(async ({ page }) => {
        // 1. Select the OWNERS menu item in the navigation bar and then select "Search" from the drop-down menu
        await page.getByText(/Owners/).click();
        await page.getByRole("link", { name: "Search" }).click();
        await page.getByRole("table").waitFor({ state: "visible" });
    })

    test("TC 1: Validate the pet name city of the owner", async ({ page }) => {
        // 2. In the list of Owners, locate the owner by the name "Jeff Black". 
        // Add the assertions that this owner is from the city of "Monona" and he has a pet with a name "Lucky"
        const targetRow: Locator = page.getByRole("row", { name: "Jeff Black" });
        await expect(targetRow.locator("td").nth(2)).toHaveText("Monona");
        await expect(targetRow.locator("td").nth(4)).toHaveText("Lucky");
    })

    test("TC 2: Validate owners count of the Madison city", async ({ page }) => {
        // 2. In the list of Owners, locate all owners who live in the city of "Madison". 
        // Add the assertion that the total number of owners should be 4
        expect(await page.getByRole("row", { name: "Madison" }).all()).toHaveLength(4);
    })

    test("TC 3: Validate search by Last Name", async ({ page }) => {
        // 2. On the Owners page, in the "Last name" input field, type the last name "Black" and click the  "Find Owner" button
        await findOwnerByLastName("Black", page);
        // 3. Add the assertion that the displayed owner in the table has a last name "Black"
        const ownerFullNameLocator: Locator = page.locator(".ownerFullName");
        const ownerFullName: null | string = await ownerFullNameLocator.textContent();
        expect(ownerFullName?.endsWith("Black")).toBeTruthy();
        // 4. In the "Last name" input field, type the last name "Davis" and click the "Find Owner" button
        await findOwnerByLastName("Davis", page);
        // 5. Add the assertion that each owner displayed in the table has a last name "Davis"
        for (let ownerFullName of await ownerFullNameLocator.allTextContents()) {
            expect(ownerFullName.endsWith("Davis")).toBeTruthy();
        }
        // 6. In the "Last name" input field, type the partial match for the last name "Es" and click the "Find Owner" button
        await findOwnerByLastName("Es", page);
        // 7. Add the assertion that each owner displayed in the table has a last name containing "Es"
        for (let ownerFullName of await ownerFullNameLocator.allTextContents()) {
            expect(ownerFullName.includes("Es")).toBeTruthy();
        }
        // 8. In the "Last name" input field, type the last name "Playwright" click the "Find Owner" button
        await findOwnerByLastName("Playwright", page);
        // 9. Add the assertion of the message "No owners with LastName starting with "Playwright""
        const noOwnersMessage: Locator = page.getByText('No owners with LastName starting with "Playwright"')
        await expect(noOwnersMessage).toBeVisible();
    })

    test("TC 4: Validate phone number and pet name on the Owner Information page", async ({ page }) => {
        const targetRow: Locator = page.getByRole("row", { name: "6085552765" });
        // 2. Locate the owner by the phone number "6085552765". Extract the Pet name displayed in the table for the owner and save it to the variable. Click on this owner.
        const petName: null | string = await targetRow.locator("td").nth(4).textContent();
        await targetRow.locator(".ownerFullName a").click()
        // 3. On the Owner Information page, add the assertion that "Telephone" value in the Onner Information card is "6085552765"
        await expect(page.locator("th:has-text('Telephone') + td")).toHaveText("6085552765");
        // 4. Add the assertion that Pet Name in the Owner Information card matches the name extracted from the page on the step 2
        await expect(page.locator("dt:has-text('Name') + dd")).toHaveText(petName!);
    })

    test("TC 5: Validate pets of the Madison city", async ({ page }) => {
        let actualPetNames: string[] = [];
        const expectedPetNames: string[] = ["Leo", "George", "Mulligan", "Freddy"];
        // 2. On the Owners page, perform the assertion that Madison city has a list of pets: Leo, George, Mulligan, Freddy
        const targetRows: Locator = page.getByRole("row", { name: "Madison" });
        for (const row of await targetRows.all()) {
            const petName: null | string = await row.locator("td").nth(4).textContent();
            actualPetNames.push(petName!.trim());
        }

        expect(actualPetNames.length).toEqual(expectedPetNames.length);
        expect(actualPetNames.every((val, index) => val === expectedPetNames[index])).toBeTruthy();
    })
})



test("TC 6: Validate specialty update", async ({ page }) => {
    // 1. Select the VETERINARIANS menu item in the navigation bar, then select "All"
    await page.getByText(/Veterinarians/).click();
    await page.getByRole("link", { name: "All" }).click();
    // 2. On the Veterinarians page, add the assertion that "Rafael Ortega" has specialty "surgery"
    await expect(page.getByRole("table")).toBeVisible();
    const targetRow: Locator = page.getByRole("row", { name: "Rafael Ortega" });
    await expect(targetRow.locator("td").nth(1)).toHaveText("surgery");
    // 3. Select the SPECIALTIES menu item in the navigation bar
    await page.getByRole("link", { name: "Specialties" }).click();
    // 4. Add assertion of the "Specialties" header displayed above the table
    await expect(page.getByRole("heading", { name: "Specialties" })).toBeVisible();
    // 5. Click on "Edit" button for the "surgery" specialty
    await page.getByRole("row", { name: "surgery" }).getByRole("button", { name: "Edit" }).click();
    // 6. Add assertion "Edit Specialty" page is displayed
    await expect(page.getByRole("heading", { name: "Edit Specialty" })).toBeVisible();
    // 7. Update the specialty from "surgery" to "dermatology" and click "Update button"
    await page.locator("#name").clear();
    await page.locator("#name").fill("dermatology");
    await page.getByRole("button", {name: "Update"}).click();
    await expect(page.getByRole("heading", { name: "Specialties" })).toBeVisible();
    // 8. Add assertion that "surgery" was changed to "dermatology" in the list of specialties
    //TODO: review the test as well and add step
    // 9. Select the VETERINARIANS menu item in the navigation bar, then select "All"
    await page.getByText(/Veterinarians/).click();
    await page.getByRole("link", { name: "All" }).click();
    // 10. On the Veterinarians page, add assertion that "Rafael Ortega" has specialty "dermatology"
    await expect(targetRow.locator("td").nth(1)).toHaveText("dermatology");
    // 11. Navigate to SPECIALTIES page, revert the changes renaming "dermatology" back to "surgery"
})


async function findOwnerByLastName(lastName: string, page: Page): Promise<void> {
    const lastNameField: Locator = page.locator("#lastName");

    await lastNameField.clear();
    await lastNameField.fill(lastName);
    await page.getByRole("button", { name: "Find Owner" }).click();
    await page.locator(".overlay").waitFor({ state: "detached" });
}