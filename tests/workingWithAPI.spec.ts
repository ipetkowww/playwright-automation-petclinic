import { owners as ownersData } from "../data/responses/ownersData.ts";
import { test } from "../fixtures/base.ts";

test.beforeEach(async ({ page, ownersPage }) => {
    await page.route('*/**/api/owners', async route => {
        route.fulfill({
            body: JSON.stringify(ownersData)
        })
    })

    await page.route(`*/**/api/owners/${ownersData[0].id}`, async route => {
        route.fulfill({
            body: JSON.stringify(ownersData[0])
        })
    })

    await ownersPage.open();
})

test("Mocking API request", async ({ ownersPage, ownerInformationPage, }) => {
    const ownerName: string = `${ownersData[0].firstName} ${ownersData[0].lastName}`;
    const expectedPetsCount: number = 2;
    const expectedPetVisitCount: number = 10;

    await ownersPage.asserts.assertOwnerCountIs(2);

    await ownersPage.openOwnerInformation(ownerName);

    await ownerInformationPage.asserts.assertOwnerInformation(ownersData[0]);
    await ownerInformationPage.asserts.assertPets(expectedPetsCount, ownersData[0].pets);
    await ownerInformationPage.asserts.assertVisitCountForPetIs(expectedPetVisitCount, ownersData[0].pets[0]);
})