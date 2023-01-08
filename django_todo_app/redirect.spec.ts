import { test, expect } from '@playwright/test';

test.describe('リダイレクトの動作確認', () => {
  test.describe('Djangoでリダイレクトが発生した場合', () => {
    test('リダイレクトに対応できること', async ({ page }) => {
      await page.goto('http://localhost:8000/playwright/redirect-from')

      // この時点でリダイレクト先(redirect-to)へと遷移している
      const result = page.locator('p')
      await expect(result).toHaveText('Redirected by Django')
    })
  })

  test.describe('Reactでリダイレクトが発生した場合', () => {
    test('リダイレクトに対応できること', async ({ page }) => {
      await page.goto('http://localhost:8000/playwright/react/redirect/from')

      // この時点でリダイレクト先(redirect-to)へと遷移している
      const result = page.locator('p')
      await expect(result).toHaveText('Redirected by react router')
    })
  })
})