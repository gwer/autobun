import { describe, test, expect } from '@playwright/test';

describe('Sample App Main Page Tests', () => {
  test('should load main page', async ({ page }) => {
    await page.goto('/');
    const text = await page.textContent('div');
    expect(text).toBe('Hello World');
  });

  test('should not load external CSS files', async ({ page }) => {
    await page.goto('/');
    const cssLinks = await page.locator('link[rel="stylesheet"]').count();
    expect(cssLinks).toBe(0);

    const cssStyles = await page.locator('style').count();
    expect(cssStyles).toBe(0);
  });

  test('should have __AUTOBUN_DATA global variable with correct structure', async ({
    page,
  }) => {
    await page.goto('/');
    const autobunData = await page.evaluate(() => window.__AUTOBUN_DATA);

    expect(autobunData).toBeDefined();
    expect(autobunData).toEqual({
      pathToApp: '/.autobun/static/pages/_app.js',
      pathToPage: '/.autobun/static/pages/index.js',
      params: {},
      pageProps: {},
      appProps: {},
    });
  });

  test('should have default page title', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title).toBe('Sample App');
  });
});
