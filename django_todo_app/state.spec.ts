import { test, expect } from '@playwright/test';

test.describe('React stateの動作確認', () => {
  test('React stateの確認ができること', async ({ page }) => {
    await page.goto('http://localhost:8000/playwright/react/state')

    // クリック前の状態を確認
    await expect(page.locator('#counter')).toHaveText('0')

    // クリック
    await page.locator('#increment').click()

    // クリック後の状態を確認
    await expect(page.locator('#counter')).toHaveText('1')
  })
})
