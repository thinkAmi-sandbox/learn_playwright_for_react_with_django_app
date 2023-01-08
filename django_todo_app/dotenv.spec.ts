import { test, expect } from '@playwright/test';

test.describe('.envファイルからの読み込みを確認', () => {
  test('.envファイルに記載されたURLにアクセスしていること', async ({ page }) => {
    await page.goto(process.env.LOCATOR_URL)

    const result = page.locator('#id_locator')

    await expect(result).toHaveText('by id')
  })
})
