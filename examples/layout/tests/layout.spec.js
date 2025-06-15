const { test, expect } = require('@playwright/test');

test.describe('Layout Tests', () => {
  test('home page should have nav, main and footer elements', async ({
    page,
  }) => {
    await page.goto('/');

    expect(await page.locator('nav').count()).toBe(1);
    expect(await page.locator('main').count()).toBe(1);
    expect(await page.locator('footer').count()).toBe(1);
  });

  test('home page should have only _app.css styles', async ({ page }) => {
    await page.goto('/');

    const styleLinks = page.locator('link[rel="stylesheet"]');
    const count = await styleLinks.count();

    expect(count).toBe(1);

    const href = await styleLinks.getAttribute('href');
    expect(href).toBe('/.autobun/static/pages/_app.css');
  });

  test('about page should have _app.css and about.css styles', async ({
    page,
  }) => {
    await page.goto('/about');

    const styleLinks = page.locator('link[rel="stylesheet"]');
    const count = await styleLinks.count();

    expect(count).toBe(2);

    const hrefs = await styleLinks.evaluateAll((links) =>
      links.map((link) => link.getAttribute('href'))
    );

    expect(hrefs).toContain('/.autobun/static/pages/_app.css');
    expect(hrefs).toContain('/.autobun/static/pages/about.css');
  });
});
