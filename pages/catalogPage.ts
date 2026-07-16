import { expect, type Page } from '@playwright/test';
import type { Logger } from 'winston';

export class CatalogPage {
  constructor(private page: Page, private logger: Logger) {}

  async searchForProduct(searchTerm: string) {
    this.logger.info('Searching for product', { searchTerm });
    const searchBox = this.page.locator('input[type="search"], input[placeholder="Search products"], input[name="q"], [role="searchbox"]').first();
    await expect(searchBox).toBeVisible();
    await searchBox.fill(searchTerm);
    await this.page.getByRole('button', { name: /^Search$/i }).first().click();
    this.logger.info('Search submitted');
  }

  async addProductToCart(productName: string) {
    this.logger.info('Adding product to cart', { productName });
    await expect(this.page.getByRole('heading', { name: productName })).toBeVisible();
    await this.page
      .getByRole('article')
      .filter({ has: this.page.getByRole('heading', { name: productName }) })
      .getByRole('button', { name: 'Add to cart' }).first()
      .click();

    await expect(this.page.getByText(`${productName} added to cart`)).toBeVisible();
    this.logger.info('Product added to cart', { productName });
  }
}
