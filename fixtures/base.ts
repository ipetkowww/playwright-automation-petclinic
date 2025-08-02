import { test as base } from "@playwright/test";
import { VeterinariansAllPage } from "../pages/veterinarians/veterinariansPage";
import { EditVeterinarianPage } from "../pages/edit-veterinarian-page/editVeterinarianPage";
import { OwnersPage } from "../pages/owners-page/ownersPage";
import { OwnerInformationPage } from "../pages/owner-information-page/ownerInformationPage";

export type MyFixtures = {
    veterinariansAllPage: VeterinariansAllPage;
    editVeterinarianPage: EditVeterinarianPage;
    ownersPage: OwnersPage;
    ownerInformationPage: OwnerInformationPage;
};

export const test = base.extend<MyFixtures>({
    veterinariansAllPage: async ({ page }, use) => {
        await use(new VeterinariansAllPage(page));
    },

    editVeterinarianPage: async ({ page }, use) => {
        await use(new EditVeterinarianPage(page));
    },

    ownersPage: async ({ page }, use) => {
        await use(new OwnersPage(page));
    },

    ownerInformationPage: async ({ page }, use) => {
        await use(new OwnerInformationPage(page));
    }
});