import {test, expect} from "@playwright/test";

// ファイルレベルでの設定変更
// https://playwright.dev/docs/api/class-testoptions
test.use({
  httpCredentials: {
    username: 'foo',
    password: 'pass'
  }
})

test.describe('Basic認証でTestOptionを使う場合', () => {
  test('Basic認証が必要なページを開けること', async ({ page }) => {
    await page.goto('http://localhost:8000/playwright/basic-auth')
    
    const result = page.locator('p')
    await expect(result).toHaveText('show Basic auth page')
  })
})