import { test as base, expect, type Page, type TestInfo } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CatalogPage } from '../pages/catalogPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { OrderConfirmationPage } from '../pages/orderConfirmationPage';
import { ShopKartPurchaseFlow } from '../flows/purchaseFlow';
import { createTestLogger, attachFailureLog, type TestLoggerData } from '../logger';
export type ShopKartFixtureHandle = {
  loginPage: LoginPage;
  catalogPage: CatalogPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  orderConfirmationPage: OrderConfirmationPage;
  purchaseFlow: ShopKartPurchaseFlow;
};

export const test = base.extend<{ shopKart: ShopKartFixtureHandle; diagnostics: TestLoggerData }>({
  diagnostics: async ({}, use, testInfo) => {
    const diagnostics = createTestLogger(testInfo);
    await use(diagnostics);
    await attachFailureLog(testInfo, diagnostics.logFile);
  },

  shopKart: async ({ page, diagnostics }, use) => {
    const loginPage = new LoginPage(page, diagnostics.logger);
    const catalogPage = new CatalogPage(page, diagnostics.logger);
    const cartPage = new CartPage(page, diagnostics.logger);
    const checkoutPage = new CheckoutPage(page, diagnostics.logger);
    const orderConfirmationPage = new OrderConfirmationPage(page, diagnostics.logger);
    const purchaseFlow = new ShopKartPurchaseFlow(page, loginPage, catalogPage, cartPage, checkoutPage, orderConfirmationPage, diagnostics.logger);

    await use({
      loginPage,
      catalogPage,
      cartPage,
      checkoutPage,
      orderConfirmationPage,
      purchaseFlow,
    });
  },
});

export { expect };
