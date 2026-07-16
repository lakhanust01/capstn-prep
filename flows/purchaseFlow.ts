import type { Page } from '@playwright/test';
import type { Logger } from 'winston';
import { LoginPage } from '../pages/loginPage';
import { CatalogPage } from '../pages/catalogPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { OrderConfirmationPage } from '../pages/orderConfirmationPage';

export class ShopKartPurchaseFlow {
  constructor(
    private page: Page,
    private loginPage: LoginPage,
    private catalogPage: CatalogPage,
    private cartPage: CartPage,
    private checkoutPage: CheckoutPage,
    private orderConfirmationPage: OrderConfirmationPage,
    private logger: Logger
  ) {}

  async purchaseProduct(config: {
    email: string;
    password: string;
    searchTerm: string;
    productName: string;
    address: string;
    expectedPrice: string;
  }) {
    this.logger.info('Starting purchase flow', {
      email: config.email,
      searchTerm: config.searchTerm,
      productName: config.productName,
      expectedPrice: config.expectedPrice,
    });

    try {
      await this.loginPage.openLoginPage();
      await this.loginPage.signIn(config.email, config.password);

      await this.catalogPage.searchForProduct(config.searchTerm);
      await this.catalogPage.addProductToCart(config.productName);

      await this.cartPage.openCart();
      await this.cartPage.expectProductInCart(config.productName, config.expectedPrice);
      await this.cartPage.checkout();

      await this.checkoutPage.fillDeliveryAddress(config.address);
      await this.checkoutPage.placeOrder();

      await this.orderConfirmationPage.expectOrderConfirmed(config.address, config.expectedPrice);

      this.logger.info('Purchase flow completed successfully');
    } catch (error) {
      this.logger.error('Purchase flow failed', {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
      });
      throw error;
    }
  }
}
