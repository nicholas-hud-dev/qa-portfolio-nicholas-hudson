const { test, expect } = require('@playwright/test');

/**
 * Basic UI automation test demonstrating login flow validation.
 * This example focuses on functional verification of authentication
 * and post-login navigation behavior.
 */

test.describe('Authentication - Login Flow', () => {

  test('user can log in successfully with valid credentials', async ({ page }) => {

    // Navigate to login page
    await page.goto('https://example.com/login');

    // Verify login page loaded correctly
    await expect(page).toHaveTitle(/login/i);

    // Fill in login form
    await page.fill('#email', 'testuser@example.com');
    await page.fill('#password', 'Password123!');

    // Submit login form
    await page.click('button[type="submit"]');

    // Validate successful login redirect
    await expect(page).toHaveURL(/dashboard|home/);

    // Optional: validate presence of a known dashboard element
    await expect(page.locator('text=Welcome')).toBeVisible();

  });

  test('user sees error message with invalid credentials', async ({ page }) => {

    await page.goto('https://example.com/login');

    await page.fill('#email', 'testuser@example.com');
    await page.fill('#password', 'wrongpassword');

    await page.click('button[type="submit"]');

    // Validate error state
    const errorMessage = page.locator('.error, .alert, [role="alert"]');

    await expect(errorMessage).toBeVisible();

  });

  test('login form validation prevents empty submission', async ({ page }) => {

    await page.goto('https://example.com/login');

    await page.click('button[type="submit"]');

    // Expect validation errors without navigation
    await expect(page).toHaveURL(/login/);

    const validationMessage = page.locator('text=/required|missing|invalid/i');

    await expect(validationMessage.first()).toBeVisible();

  });

});
