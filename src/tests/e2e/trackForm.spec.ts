import { test, expect } from '@playwright/test';

test.describe('Create Track Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/tracks');
  });

  test('opens modal on Create Track button click', async ({ page }) => {
    await page.click('[data-testid="create-track-button"]');
    await expect(page.locator('[data-testid="track-form"]')).toBeVisible();
  });

  test('fills and submits the create track form', async ({ page }) => {
    await page.click('[data-testid="create-track-button"]');
    await expect(page.locator('[data-testid="track-form"]')).toBeVisible();

    await page.fill('[data-testid="input-title"]', 'My Test Track');
    await page.fill('[data-testid="input-artist"]', 'Test Artist');
    await page.fill('[data-testid="input-album"]', 'Test Album');

    const genreSelector = page.locator('.basic-multi-select');
    await genreSelector.waitFor({ state: 'visible', timeout: 10000 });
    await expect(genreSelector).toBeVisible();

    await genreSelector.click();

    const optionList = page.locator('.select__menu-list');
    await optionList.waitFor({ state: 'visible' });

    const options = optionList.locator('.select__option');
    const count = await options.count();
    expect(count).toBeGreaterThan(0);

    await options.first().click();

    await page.click('[data-testid="submit-button"]');
    await expect(page.locator('[data-testid="track-form"]')).toBeHidden();
  });
});
