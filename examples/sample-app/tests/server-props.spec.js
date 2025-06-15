import { describe, test, expect } from '@playwright/test';

describe('Server Props Page Tests', () => {
  test('should have correct page title', async ({ page }) => {
    await page.goto('/server-props');
    const title = await page.title();
    expect(title).toBe('With Server Props');
  });

  test('should display server props content', async ({ page }) => {
    await page.goto('/server-props');
    const content = await page.textContent('body');
    expect(content).toContain(
      'This page has server props. App name: examples/sample-app'
    );
  });

  test('should have correct __AUTOBUN_DATA with server props', async ({
    page,
  }) => {
    await page.goto('/server-props');

    const autobunData = await page.evaluate(() => window.__AUTOBUN_DATA);

    expect(autobunData).toBeDefined();
    expect(autobunData.pathToPage).toBe(
      '/.autobun/static/pages/server-props.js'
    );
    expect(autobunData.pageProps).toBeDefined();
    expect(autobunData.pageProps.appName).toBe('examples/sample-app');
  });
});
