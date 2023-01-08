import { test, expect } from '@playwright/test';

test.describe('多言語化の動作確認', () => {
  test('ブラウザが日本語の場合、日本語で表示されること', async ({ browser }) => {
    const context = await browser.newContext({
      locale: 'ja'
    })

    const page = await context.newPage()

    await page.goto('http://localhost:8000/playwright/react/i18n')

    await expect(page.locator('#result')).toHaveText('シナノゴールド')
  })

  test('ブラウザが英語の場合、英語で表示されること', async ({ browser }) => {
    const context = await browser.newContext({
      locale: 'en'
    })

    const page = await context.newPage()

    await page.goto('http://localhost:8000/playwright/react/i18n')

    await expect(page.locator('#result')).toHaveText('shinano gold')
  })
})
