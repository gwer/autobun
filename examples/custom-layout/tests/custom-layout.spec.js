const { test, expect } = require('@playwright/test');

test.describe('Layout Tests', () => {
  test('home page should have nav#header, main, footer and no nav#sidebar', async ({
    page,
  }) => {
    await page.goto('/');

    expect(await page.locator('nav#header').count()).toBe(1);
    expect(await page.locator('main').count()).toBe(1);
    expect(await page.locator('footer').count()).toBe(1);
    expect(await page.locator('nav#sidebar').count()).toBe(0);
  });

  test('about page should have nav#header, main, footer and nav#sidebar', async ({
    page,
  }) => {
    await page.goto('/about');

    expect(await page.locator('nav#header').count()).toBe(1);
    expect(await page.locator('main').count()).toBe(1);
    expect(await page.locator('footer').count()).toBe(1);
    expect(await page.locator('nav#sidebar').count()).toBe(1);
  });
});
