import { test as base } from "@playwright/test";
import { VeterinariansAllPage } from "../pages/veterinarians/veterinariansPage";
import { EditVeterinarianPage } from "../pages/edit-veterinarian-page/editVeterinarianPage";

export type MyFixtures = {
    veterinariansAllPage: VeterinariansAllPage;
    editVeterinarianPage: EditVeterinarianPage;
};

export const test = base.extend<MyFixtures>({
    veterinariansAllPage: async ({ page }, use) => {
        await use(new VeterinariansAllPage(page));
    },
    
    editVeterinarianPage: async ({ page }, use) => {
        await use(new EditVeterinarianPage(page));
    }
});