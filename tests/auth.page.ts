import { Page, Locator } from "@playwright/test";

export class UchiAuthPage {
    constructor(protected page: Page) {}

    // Поле ввода логина
    loginInput(): Locator {
        return this.page.locator('#login');
    }

    // Поле ввода пароля
    passwordInput(): Locator {
        return this.page.locator('#password');
    }

    // Кнопка "Войти"
    loginSubmitButton(): Locator {
        return this.page.getByRole('button', { name: 'Войти' });
    }

    // Ссылка "Войти другим способом"
    alternativeLoginLink(): Locator {
        return this.page.getByRole('link', { name: 'Войти другим способом' });
    }

    // Кнопка выбора роли "Завуч"
    zavuchRoleButton(): Locator {
        return this.page.getByRole('button', { name: 'Завуч' });
    }

    
    closeFormButton(): Locator {
        return this.page.getByRole('link').filter({ hasText: /^$/ });
    }

    // МЕТОДЫ ДЕЙСТВИЙ С УМНЫМИ ОЖИДАНИЯМИ

    async fillLogin(value: string) {
        await this.loginInput().waitFor({ state: 'visible', timeout: 5000 });
        await this.loginInput().click();
        await this.loginInput().fill(value);
        await this.loginInput().press('Tab'); // Повторяем действие из инспектора
    }

    async fillPassword(value: string) {
        await this.passwordInput().waitFor({ state: 'visible', timeout: 5000 });
        await this.passwordInput().click();
        await this.passwordInput().fill(value);
    }

    async submit() {
        await this.loginSubmitButton().waitFor({ state: 'visible', timeout: 5000 });
        await this.loginSubmitButton().click();
    }

    async clickAlternativeLogin() {
        await this.alternativeLoginLink().waitFor({ state: 'visible', timeout: 5000 });
        await this.alternativeLoginLink().click();
    }

    async selectZavuchRole() {
        await this.zavuchRoleButton().waitFor({ state: 'visible', timeout: 5000 });
        await this.zavuchRoleButton().click();
    }

    async closeForm() {
        await this.closeFormButton().waitFor({ state: 'visible', timeout: 5000 });
        await this.closeFormButton().click();
    }
}
