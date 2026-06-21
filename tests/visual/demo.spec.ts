import { expect, test } from '@playwright/test';
import { PNG } from 'pngjs';

const countMeaningfulPixels = (buffer: Buffer) => {
  const png = PNG.sync.read(buffer);
  let meaningful = 0;

  for (let index = 0; index < png.data.length; index += 4) {
    const alpha = png.data[index + 3];
    if (alpha === 0) continue;
    const red = png.data[index];
    const green = png.data[index + 1];
    const blue = png.data[index + 2];
    const isNearWhite = red > 248 && green > 248 && blue > 248;
    if (!isNearWhite) meaningful += 1;
  }

  return meaningful;
};

test.describe('demo visual smoke', () => {
  test('renders a non-empty first viewport with expected landmarks', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: '秩序 · 触感 · 比例 · 细节' })).toBeVisible();

    const screenshot = await page.screenshot();
    expect(countMeaningfulPixels(screenshot)).toBeGreaterThan(20_000);
  });

  test('does not horizontally overflow at the viewport level', async ({ page }) => {
    await page.goto('/');

    const overflow = await page.evaluate(() => (
      document.documentElement.scrollWidth - document.documentElement.clientWidth
    ));

    expect(overflow).toBeLessThanOrEqual(1);
  });
});
