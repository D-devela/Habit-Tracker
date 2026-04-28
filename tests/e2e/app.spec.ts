import { test, expect } from '@playwright/test';

test('homepage redirects to login page', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL(/.*login/);
});

test('login page renders correctly', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByTestId('auth-login-email')).toBeVisible();
  await expect(page.getByTestId('auth-login-password')).toBeVisible();
  await expect(page.getByTestId('auth-login-submit')).toBeVisible();
});

test('signup page renders correctly', async ({ page }) => {
  await page.goto('/signup');
  await expect(page.getByTestId('auth-signup-email')).toBeVisible();
  await expect(page.getByTestId('auth-signup-password')).toBeVisible();
  await expect(page.getByTestId('auth-signup-submit')).toBeVisible();
});

