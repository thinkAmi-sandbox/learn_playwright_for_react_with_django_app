import { test, expect } from '@playwright/test';

test.describe('MUI Snackbarの動作確認', () => {
  test('MUI Snackbarの動作確認ができること', async ({ page }) => {
    await page.goto('http://localhost:8000/playwright/react/mui')

    // snackbarが表示できること
    await page.locator('#show_snackbar').click()
    await expect(page.locator('#snackbar')).toHaveText('Hello snackbar')

    // snackbarが閉じること
    await page.locator('#close_snackbar').click()
    await expect(page.locator('#snackbar')).toHaveCount(0)
  })
})
