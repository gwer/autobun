import { describe, test, expect } from '@playwright/test';

describe('Complex Page Tests', () => {
  test('should render page content', async ({ page }) => {
    await page.goto('/complex-page');
    const content = await page.textContent('p');
    expect(content).toBe('Complex Page.');
  });

  test('should apply CSS module styles', async ({ page }) => {
    await page.goto('/complex-page');

    const container = page.locator('#complex-page-content');

    const backgroundColor = await container.evaluate(
      (el) => getComputedStyle(el).backgroundColor
    );
    expect(backgroundColor).toBe('rgb(238, 238, 238)');

    const borderRadius = await container.evaluate(
      (el) => getComputedStyle(el).borderRadius
    );
    expect(borderRadius).toBe('10px');

    const border = await container.evaluate(
      (el) => getComputedStyle(el).border
    );
    expect(border).toContain('1px solid');

    const fontSize = await container.evaluate(
      (el) => getComputedStyle(el).fontSize
    );
    expect(fontSize).toBe('20px');

    const fontWeight = await container.evaluate(
      (el) => getComputedStyle(el).fontWeight
    );
    expect(fontWeight).toBe('700');
  });

  test('should have functional JavaScript and hydration', async ({ page }) => {
    await page.goto('/complex-page');

    const countSpan = page.locator('#count');
    const incrementButton = page.locator('#increment-button');

    await expect(countSpan).toHaveText('0');

    await incrementButton.click();
    await expect(countSpan).toHaveText('1');

    await incrementButton.click();
    await expect(countSpan).toHaveText('2');

    await incrementButton.click();
    await incrementButton.click();
    await incrementButton.click();
    await expect(countSpan).toHaveText('5');
  });
});
