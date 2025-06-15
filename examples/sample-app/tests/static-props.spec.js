import { describe, test, expect } from '@playwright/test';

describe('Static Props Page Tests', () => {
  test('should have correct page title', async ({ page }) => {
    await page.goto('/static-props');
    const title = await page.title();
    expect(title).toBe('With Static Props');
  });

  test('should display static props content', async ({ page }) => {
    await page.goto('/static-props');
    const content = await page.textContent('div');
    expect(content).toBe(
      'This page has static props. And it says: Hello World!'
    );
  });

  test('should have correct __AUTOBUN_DATA with static props', async ({
    page,
  }) => {
    await page.goto('/static-props');

    const autobunData = await page.evaluate(() => window.__AUTOBUN_DATA);

    expect(autobunData).toBeDefined();
    expect(autobunData.pathToPage).toBe(
      '/.autobun/static/pages/static-props.js'
    );
    expect(autobunData.pageProps).toBeDefined();
    expect(autobunData.pageProps.title).toBe('With Static Props');
    expect(autobunData.pageProps.myGreatProp).toBe('Hello World');
  });
});
