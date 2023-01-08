import { test, expect } from '@playwright/test';

test.describe('新しいタブの動作確認', () => {
  test('新しいタブが開かれること', async ({ page, context }) => {
    await page.goto('http://localhost:8000/playwright/open-tab')

    // タブの中身を確認
    // https://playwright.dev/docs/pages#handling-new-pages
    const pagePromise = context.waitForEvent('page')

    const el = page.locator('#new_tab')
    await el.click()
    
    const newPage = await pagePromise
    await newPage.waitForLoadState()

    const result = newPage.locator('p')
    await expect(result).toHaveText('New Tab!')
  })

  test('新しいタブのURLやレスポンスヘッダの中身を確認できること', async ({ page, context }) => {
    // contextの on(`response`) でレスポンスをハンドリングする
    // https://playwright.dev/docs/api/class-browsercontext#browser-context-event-response

    await page.goto('http://localhost:8000/playwright/open-tab')

    // responseが発生したときのイベントを設定する
    context.on('response', async response => {
      // リクエストが飛んだ先の検証
      expect(response.url()).toEqual('http://localhost:8000/playwright/new-tab')
      
      // ヘッダの検証
      const headers = response.headers()
      expect(headers['content-type']).toEqual('text/html; charset=utf-8')
    })

    await page.locator('#new_tab').click()
  })
})