import { test, expect } from '@playwright/test';

test.describe('クリップボードの中身を確認', () => {
  test('クリップボードにコピーされていること', async ({ context, page }) => {
    // 権限を追加する
    // https://playwright.dev/docs/api/class-browsercontext#browser-context-grant-permissions
    context.grantPermissions([
      'clipboard-write',  // ブラウザの操作で必要
      'clipboard-read',   // テストでの検証で必要
    ])

    await page.goto('http://localhost:8000/playwright/react/clipboard')

    // クリップボードへコピー
    await page.locator('#copy_clipboard').click()

    // コピー後のメッセージが表示されているか確認
    await expect(page.locator('#result')).toHaveText('saved!')

    // クリップボードの中身を取得して検証
    const result = await page.evaluate(async () => {
      return await navigator.clipboard.readText()
    })
    expect(result).toEqual('data from clipboard')
  })
})