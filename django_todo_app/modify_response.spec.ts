import { test, expect } from '@playwright/test';

test.describe('レスポンスを差し替える', () => {
  test('taskが1件も存在しない時は、存在しない旨を表示すること', async ({ page }) => {
    // レスポンスが0件になるよう差し替え
    await page.route('http://localhost:8000/api/tasks/', async route => {
      // fulfill()にて、差し替え後のデータを設定
      route.fulfill({
        status: 404,
        body: JSON.stringify({})
      })
    })

    await page.goto('http://localhost:8000/tasks/')

    const message = page.locator('#message')
    await expect(message).toHaveCount(1)
    await expect(message).toHaveText('task not found')
  })
})
