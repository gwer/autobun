import { describe, test, expect } from '@playwright/test';

describe('Special Props Tests', () => {
  test('should handle permanent redirect (301)', async ({ page }) => {
    await page.route('**', async (route) => {
      const response = await route.fetch({ maxRedirects: 0 });
      let headers = response.headers();
      delete headers['location'];
      delete headers['Location'];
      return route.fulfill({
        response: response,
        headers: headers,
      });
    });
    const response = await page.goto('/special-props/permanent-redirect');

    expect(response?.status()).toBe(301);
  });

  test('should handle temporary redirect (302)', async ({ page }) => {
    await page.route('**', async (route) => {
      const response = await route.fetch({ maxRedirects: 0 });
      let headers = response.headers();
      delete headers['location'];
      delete headers['Location'];
      return route.fulfill({
        response: response,
        headers: headers,
      });
    });
    const response = await page.goto('/special-props/temporary-redirect');

    expect(response?.status()).toBe(302);
  });

  test('should return 404 for not-found path', async ({ page }) => {
    const response = await page.goto('/special-props/not-found');
    expect(response?.status()).toBe(404);
  });

  test('should return 404 for unknown IDs', async ({ page }) => {
    const response = await page.goto('/special-props/unknown-id');
    expect(response?.status()).toBe(404);
  });
});
