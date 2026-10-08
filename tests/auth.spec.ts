import { test, expect } from '@playwright/test';
import { UchiAuthPage } from "./auth.page";

test.describe('Uchi.ru Authentication Flow from Inspector', () => {
  let authPage: UchiAuthPage;

  test.beforeEach(async ({ page }) => {
    authPage = new UchiAuthPage(page);

    // Открываем главную страницу Учи.ру
    await page.goto('https://uchi.ru/');
  });

  test('should complete the inspector scenario step-by-step', async ({ page }) => {
    // 1. Кликом в поле логина и вводим "TEST"
    await authPage.fillLogin('TEST');

    // 2. Кликаем в поле пароля и вводим "TEST"
    await authPage.fillPassword('TEST');

    // 3. Нажимаем кнопку "Войти"
    await authPage.submit();

    // 4. Нажимаем "Войти другим способом"
    await authPage.clickAlternativeLogin();

    // 5. Нажимаем кнопку "Завуч"
    await authPage.selectZavuchRole();

    
    await authPage.closeForm();

    // Финальная проверка: убедимся, что после закрытия формы мы вернулись на экран с кнопкой "Войти"
    await expect(authPage.loginSubmitButton()).toBeVisible();
  });
});
