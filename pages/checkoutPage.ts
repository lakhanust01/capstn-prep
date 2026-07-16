import { expect, type Page } from '@playwright/test';
import type { Logger } from 'winston';

export class CheckoutPage {
  constructor(private page: Page, private logger: Logger) {}

  async fillDeliveryAddress(address: string) {
    this.logger.info('Filling delivery address', { address });
    const addressField = this.page.getByLabel('Delivery address');
    await expect(addressField).toBeVisible();
    await addressField.fill(address);
    await expect(addressField).toHaveValue(address);
    this.logger.info('Delivery address entered', { address });
  }

  async placeOrder() {
    this.logger.info('Placing order');
    await this.page.getByRole('button', { name: 'Place order' }).click();
    this.logger.info('Place order button clicked');
  }
}
