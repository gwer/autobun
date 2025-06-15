import { describe, test, expect } from '@playwright/test';

describe('Nested Pages Tests', () => {
  describe('Static Path', () => {
    test('should render static nested page', async ({ page }) => {
      await page.goto('/nested/static-path');
      const content = await page.textContent('div');
      expect(content).toBe('Static Path Page');
    });
  });

  describe('Dynamic Path', () => {
    test('should render dynamic nested page with valid ID', async ({
      page,
    }) => {
      await page.goto('/nested/123');
      const content = await page.textContent('div');
      expect(content).toBe('Nested Page 123');
    });

    test('should handle different valid IDs', async ({ page }) => {
      await page.goto('/nested/456');
      const content = await page.textContent('div');
      expect(content).toBe('Nested Page 456');

      await page.goto('/nested/1');
      const updatedContent = await page.textContent('div');
      expect(updatedContent).toBe('Nested Page 1');
    });

    test('should return 404 for invalid ID (non-numeric)', async ({ page }) => {
      const response = await page.goto('/nested/invalid-id');
      expect(response?.status()).toBe(404);
    });

    test('should return 404 for non-integer ID', async ({ page }) => {
      const response = await page.goto('/nested/12.34');
      expect(response?.status()).toBe(404);
    });
  });
});
