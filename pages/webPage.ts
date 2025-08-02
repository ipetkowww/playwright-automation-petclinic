import { Page } from '@playwright/test';
import { NavigationMenuComponent } from '../web-page-components/navigationMenuComponent';

export class WebPage {

    private readonly _navigationMenu: NavigationMenuComponent;

    constructor(protected readonly page: Page) {
        this._navigationMenu = new NavigationMenuComponent(this.page);
    }

    get navigationMenu(): NavigationMenuComponent {
        return this._navigationMenu;
    }
}