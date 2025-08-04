import { Page } from '@playwright/test';

export class NavigationMenuComponent {

    constructor(private readonly page: Page) { }

    async openAllVeterinariansPage(): Promise<void> {
        await this.page.goto("/");
        await this.page.getByText(/Veterinarians/).click();
        await this.page.getByRole("link", { name: "All" }).click();
    }

    async openOwnersPage(): Promise<void> {
        await this.page.goto("/");
        await this.page.getByText(/Owners/).click();
        await this.page.getByRole("link", { name: "Search" }).click();
    }

    async openPetTypesPage() {
        await this.page.goto("/");
        await this.page.getByTitle("pettypes").click();
    }
}