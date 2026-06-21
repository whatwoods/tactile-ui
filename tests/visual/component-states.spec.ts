import { expect, test } from '@playwright/test';

test.describe('component state visual regression', () => {
  test('matches the component gallery baseline', async ({ page }) => {
    await page.goto('/');

    const gallery = page.locator('#gallery-section');
    await gallery.scrollIntoViewIfNeeded();

    await expect(gallery).toHaveScreenshot('component-gallery.png', {
      animations: 'disabled',
      maxDiffPixelRatio: 0.03,
    });
  });
});
