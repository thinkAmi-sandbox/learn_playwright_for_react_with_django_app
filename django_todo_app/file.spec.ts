import { test, expect } from '@playwright/test';

test.describe('ファイルまわりの動作確認', () => {
  test.describe('ファイルダウンロードの場合', () => {
    test('ファイルのダウンロードに成功すること', async ({ page }) => {
      await page.goto('http://localhost:8000/playwright/file-index')

      // https://playwright.dev/docs/downloads
      const downloadPromise = page.waitForEvent('download')

      await page.locator('#download').click()

      const download = await downloadPromise

      // Downloadオブジェクトのメソッドを使えば色々検証できそうだが、今回はファイル名のみにしておく
      // https://playwright.dev/docs/api/class-download
      const fileName = download.suggestedFilename()
      expect(fileName).toEqual('download.csv')
    })
  })

  test.describe('ファイルアップロードの場合', () => {
    test('ファイルのアップロードができること', async ({ page }) => {
      await page.goto('http://localhost:8000/playwright/file-index')

      await page.locator('#upload').setInputFiles({
        name: 'upload.csv',
        mimeType: 'text/csv',
        buffer: Buffer.from('foo, bar')
      })

      const responsePromise = page.waitForResponse('http://localhost:8000/playwright/file-upload')
      await page.locator('button').click()

      const response = await responsePromise
      expect(response.status()).toEqual(302)

      // この時点ですでに遷移済
      // フラッシュメッセージを確認
      await expect(page.locator('#message-1')).toHaveText('アップロードしました')
    })
  })
})