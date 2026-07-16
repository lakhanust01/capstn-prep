import { test } from '../fixtures/shopkartFixture';

test.describe('ShopKart full purchase flow', () => {
  test('logs in, searches for a bag, adds it to cart, checks out and confirms the order', async ({ shopKart }) => {
    const config = {
      email: process.env.USERNAME || 'alice@shopkart.test',
      password: process.env.SHOPKART_ALICE_PASSWORD || 'alice-dev-pass',
      searchTerm: process.env.SEARCH_TERM || 'bag',
      productName: process.env.PRODUCT_NAME || 'Metro Carryall',
      address: process.env.ADDRESS || '123 Test Street',
      expectedPrice: process.env.EXPECTED_PRICE || '₹499.00',
    };

    await shopKart.purchaseFlow.purchaseProduct(config);
  });
});
