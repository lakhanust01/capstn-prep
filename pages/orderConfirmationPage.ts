import { expect, type Page } from '@playwright/test';
import type { Logger } from 'winston';

export class OrderConfirmationPage {
  constructor(private page: Page, private logger: Logger) {}

  async expectOrderConfirmed(address: string, expectedPrice: string) {
    this.logger.info('Verifying order confirmation', { address, expectedPrice });
    await expect(this.page.getByRole('heading', { name: 'Order confirmed' })).toBeVisible();
    await expect(this.page.getByText('PLCED')).toBeVisible();
    await expect(this.page.locator('main')).toContainText(expectedPrice);
    await expect(this.page.locator('main')).toContainText(address);
    this.logger.info('Order confirmed successfully', { address, expectedPrice });
  }
}
