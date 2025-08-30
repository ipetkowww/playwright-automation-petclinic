import { APIResponse } from "@playwright/test";
import owner from "../data/responses/owner.json";
import owners from "../data/responses/owners.json";
import { test } from "../fixtures/base.ts";

test.beforeEach(async ({ page }) => {
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

    await page.route("*/**/api/vets", async route => {
        const response: APIResponse = await route.fetch();
        const responseBody: any = await response.json();

        const targetVeterinarian = responseBody.find((vet: any) =>
            vet.firstName === "Sharon" && vet.lastName === "Jenkins"
        );

        if (targetVeterinarian) {
            targetVeterinarian.specialties = [
                { id: 5001, name: "cardiology" },
                { id: 5002, name: "neurology" },
                { id: 5003, name: "orthopedics" },
                { id: 5004, name: "pediatrics" },
                { id: 5005, name: "dermatology" },
                { id: 5006, name: "ophthalmology" },
                { id: 5007, name: "psychiatry" },
                { id: 5008, name: "oncology" },
                { id: 5009, name: "gastroenterology" },
                { id: 5010, name: "endocrinology" }
            ];
        }

        await route.fulfill({
            body: JSON.stringify(responseBody)
        })
    })
})

test("Mocking API request", async ({ ownersPage, ownerInformationPage }) => {
    const expectedPetsCount: number = 2;
    const expectedPetVisitCount: number = 10;
    const expectedOwnerName: string = "Ivan Petkov";
    const expectedAddress: string = "Bulgaria";
    const expectedCity: string = "Sofia";
    const expectedTelephone: string = "1234567890"
    const expectedPetNames: string[] = ["Mickey Mouse", "Donald Duck"]

    await ownersPage.open();

    await ownersPage.asserts.assertOwnerCountIs(2);

    await ownersPage.openOwnerInformation(expectedOwnerName);

    await ownerInformationPage.asserts.assertOwnerInformation(expectedOwnerName, expectedAddress, expectedCity, expectedTelephone);
    await ownerInformationPage.asserts.assertPets(expectedPetsCount, expectedPetNames);
    await ownerInformationPage.asserts.assertVisitCountForPetIs(expectedPetVisitCount, expectedPetNames[0]);
})

test("Intercept API response", async ({ veterinariansAllPage }) => {
    const expectedSpecialtiesCount: number = 10;
    const expectedVeterinarianName: string = "Sharon Jenkins";

    await veterinariansAllPage.open();
    await veterinariansAllPage.asserts.countOfSpecialtiesForVeterinarian(expectedSpecialtiesCount, expectedVeterinarianName);
})