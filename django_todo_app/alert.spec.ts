import { test, expect } from '@playwright/test';

test.describe('JavaScript alertの動作確認', () => {
  test('alertのハンドリングに成功すること', async ({ page }) => {
    await page.goto('http://localhost:8000/playwright/react/alert')

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toEqual('show alert')
      await dialog.accept()

      // ここが検証コード
      await expect(page.locator('#result')).toHaveText('done alert')
    })

    await page.locator('#show_alert').click()
  })
})
