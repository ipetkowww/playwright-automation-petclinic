import { test as base } from "@playwright/test";
import { EditVeterinarianPage } from "../pages/edit-veterinarian-page/editVeterinarianPage";
import { OwnerInformationPage } from "../pages/owner-information-page/ownerInformationPage";
import { OwnersPage } from "../pages/owners-page/ownersPage";
import { PetTypesPage } from "../pages/pet-types-page/petTypesPage";
import { VeterinariansAllPage } from "../pages/veterinarians/veterinariansPage";
import { EditPetTypePage } from "../pages/edit-pet-type-page/editPetTypePage";

export type MyFixtures = {
    veterinariansAllPage: VeterinariansAllPage;
    editVeterinarianPage: EditVeterinarianPage;
    ownersPage: OwnersPage;
    ownerInformationPage: OwnerInformationPage;
    petTypesPage: PetTypesPage;
    editPetTypePage: EditPetTypePage;
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
    },

    petTypesPage: async ({ page }, use) => {
        await use(new PetTypesPage(page));
    },

    editPetTypePage: async ({ page }, use) => {
        await use(new EditPetTypePage(page));
    }
});