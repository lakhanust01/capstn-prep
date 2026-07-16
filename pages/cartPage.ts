import { expect, type Page } from '@playwright/test';
import type { Logger } from 'winston';

export class CartPage {
  constructor(private page: Page, private logger: Logger) {}

  async openCart() {
    this.logger.info('Opening cart page');
    await this.page.getByRole('button', { name: 'Cart' }).first().click();
    await expect(this.page.getByRole('heading', { name: 'Your cart' })).toBeVisible();
    this.logger.info('Cart page is visible');
  }

  async expectProductInCart(productName: string, expectedPrice: string) {
    this.logger.info('Checking cart contents', { productName, expectedPrice });
    const escapedPrice = expectedPrice.replace('.', '\\.') ;
    await expect(
      this.page.getByRole('row', { name: new RegExp(`${productName}.*SKU-BAG.*1.*${escapedPrice}`) })
    ).toBeVisible();
    await expect(this.page.locator('main')).toContainText(expectedPrice);
    this.logger.info('Expected product is present in cart', { productName, expectedPrice });
  }

  async checkout() {
    this.logger.info('Starting checkout from cart');
    await this.page.getByRole('button', { name: 'Checkout' }).click();
    this.logger.info('Checkout button clicked');
  }
}
