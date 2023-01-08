import {test, expect} from "@playwright/test";

// https://playwright.dev/docs/network#http-authentication
test.describe('Basic認証', () => {
  // 引数のfixtureオブジェクトから browser を取り出す
  // pageオブジェクトは差し替えるので、browserだけで良い
  // https://playwright.dev/docs/api/class-fixtures
  test('Basic認証が必要なページを開けること', async ({ browser }) => {
    // Basic認証付きのブラウザに差し替え
    const context = await browser.newContext({
      httpCredentials: {
        username: 'foo',
        password: 'pass'
      }
    })

    const page = await context.newPage()

    // 差し替えたpageオブジェクトを使って検証
    await page.goto('http://localhost:8000/playwright/basic-auth')

    const result = page.locator('p')
    await expect(result).toHaveText('show Basic auth page')
  })
})