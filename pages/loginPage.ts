import { expect, type Page } from '@playwright/test';
import type { Logger } from 'winston';

export class LoginPage {
  constructor(private page: Page, private logger: Logger) {}

  async openLoginPage() {
    const baseUrl = process.env.BASE_URL || 'http://localhost:5173';
    const url = new URL('/login', baseUrl).toString();
    this.logger.info('Navigating to login page', { url });
    await this.page.goto(url);
  }

  async signIn(email: string, password: string) {
    this.logger.info('Signing in', { email });
    await expect(this.page.getByLabel('Email')).toBeVisible();
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('form', { name: 'ShopKart sign in' }).getByRole('button', { name: 'Sign in' }).click();
    this.logger.info('Sign-in request submitted');
  }
}
