import { test, expect, Page } from '@playwright/test';

async function openCreateTrackModal(page: Page) {
  await page.click('[data-testid="create-track-button"]');
  await expect(page.locator('[data-testid="track-form"]')).toBeVisible();
}

test.describe('Create Track Modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/tracks');
  });

  test('opens modal on Create Track button click', async ({ page }) => {
    await openCreateTrackModal(page);
  });

  test('fills and submits the create track form', async ({ page }) => {
    await openCreateTrackModal(page);

    await page.fill('[data-testid="input-title"]', 'My Test Track');
    await page.fill('[data-testid="input-artist"]', 'Test Artist');
    await page.fill('[data-testid="input-album"]', 'Test Album');

    const genreSelector = page.locator('.basic-multi-select');
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

  test('closes modal when clicking on close button', async ({ page }) => {
    await openCreateTrackModal(page);

    await page.click('button.absolute.top-2.right-2');
    await expect(page.locator('[data-testid="track-form"]')).toBeHidden();
  });
});
