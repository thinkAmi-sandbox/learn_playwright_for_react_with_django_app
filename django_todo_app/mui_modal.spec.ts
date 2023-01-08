import { test, expect } from '@playwright/test';

test.describe('MUI Modalの動作確認', () => {
  test('MUI Modalの動作確認ができること', async ({ page }) => {
    await page.goto('http://localhost:8000/playwright/react/mui')

    // Modalが表示されること
    await page.locator('#show_modal').click()
    await expect(page.locator('#modal_content')).toHaveText('Hello Modal')

    // Modalが閉じること
    // 特定のelementをclickできないので、Escキーで閉じる
    await page.keyboard.press('Escape')
    
    await expect(page.locator('#modal_content')).not.toBeVisible()
    await expect(page.locator('#modal_content')).toHaveCount(0)
  })
})
