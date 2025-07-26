import { Locator, Page } from "@playwright/test";

export type Button = "Edit" | "Update" | "Cancel"

export async function editPet(petName: string, page: Page): Promise<void> {
    await page.getByRole('row', { name: petName }).locator("//button[text()='Edit']").click();
    await waitForSpinner(page);
}

export async function changePetNameTo(petName: string, page: Page): Promise<void> {
    const nameInputField: Locator = page.getByRole("textbox");
    await nameInputField.clear();
    await nameInputField.fill(petName);
}

export async function clickButton(button: Button, page: Page): Promise<void> {
    await page.getByRole("button", { name: button }).click();
    await waitForSpinner(page);
}

export async function waitForSpinner(page: Page) {
    await page.locator("mat-spinner").waitFor({state: "detached"});
}