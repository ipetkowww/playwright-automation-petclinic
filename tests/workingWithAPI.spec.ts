import owner from "../data/responses/owner.json";
import owners from "../data/responses/owners.json";
import { test } from "../fixtures/base.ts";

test.beforeEach(async ({ page, ownersPage }) => {
    await page.route('*/**/api/owners', async route => {
        route.fulfill({
            body: JSON.stringify(owners)
        })
    })

    await page.route("*/**/api/owners/1", async route => {
        route.fulfill({
            body: JSON.stringify(owner)
        })
    })

    await ownersPage.open();
})

test("Mocking API request", async ({ ownersPage, ownerInformationPage, }) => {
    const expectedPetsCount: number = 2;
    const expectedPetVisitCount: number = 10;
    const expectedOwnerName: string = "Ivan Petkov";
    const expectedAddress: string = "Bulgaria";
    const expectedCity: string = "Sofia";
    const expectedTelephone: string = "1234567890"
    const expectedPetNames: string[] = ["Mickey Mouse", "Donald Duck"]

    await ownersPage.asserts.assertOwnerCountIs(2);

    await ownersPage.openOwnerInformation(expectedOwnerName);

    await ownerInformationPage.asserts.assertOwnerInformation(expectedOwnerName, expectedAddress, expectedCity, expectedTelephone);
    await ownerInformationPage.asserts.assertPets(expectedPetsCount, expectedPetNames);
    await ownerInformationPage.asserts.assertVisitCountForPetIs(expectedPetVisitCount, expectedPetNames[0]);
})