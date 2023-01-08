import { test, expect } from '@playwright/test';

// https://playwright.dev/docs/api/class-locator
test.describe('Locatorの動作確認', () => {
  test.describe('最初のテスト', () => {
    test('idをキーに取得できること', async ({ page }) => {
      // ページへ遷移
      await page.goto('http://localhost:8000/playwright/locator')

      // locatorオブジェクトを取得
      const result = page.locator('#id_locator')

      // テキストを持っているか確認
      await expect(result).toHaveText('by id')
    })
  })

  test.describe('beforeEachを使う', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:8000/playwright/locator')
    })
  
    test('idをキーに取得できること', async ({ page }) => {
      const result = page.locator('#id_locator')
      await expect(result).toHaveText('by id')
    })
  })

  test.describe('Locatorを一致で取得', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:8000/playwright/locator')
    })
  
    test('idをキーに取得できること', async ({ page }) => {
      const result = page.locator('#id_locator')
      await expect(result).toHaveText('by id')
    })
  
    test('classをキーに取得できること', async ({ page }) => {
      const result = page.locator('.class_locator')
      await expect(result).toHaveText('by class')
    })

    test('test-idをキーに取得できること', async ({ page }) => {
      const result = page.getByTestId('test_id_locator')
      await expect(result).toHaveText('by test id')
    })

    test('ARIAのroleをキーに取得できること', async ({ page }) => {
      const result = page.getByRole('note')
      await expect(result).toHaveText('by ARIA role')
    })

    test('data属性をキーに取得できること', async ({ page }) => {
      const result = page.getByText('by Text')
      await expect(result).toHaveAttribute('data-p', '5')
    })

    test('ラベルをキーに取得できること', async ({ page }) => {
      const result = page.getByLabel('by Label')
      await expect(result).toHaveValue('ラベル')
    })

    test('placeholderをキーに取得できること', async ({ page }) => {
      const result = page.getByPlaceholder('紅玉')
      await expect(result).toHaveValue('シナノゴールド')
    })
  })

  test.describe('Locatorを正規表現で取得', () => {
    test('test-idをキーに取得できること', async ({ page }) => {
      await page.goto('http://localhost:8000/playwright/locator')

      const result = page.getByTestId(/test_.*tor/)
      await expect(result).toHaveText('by test id')
    })
  })

  test.describe('Locatorを親子関係で絞って取得', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:8000/playwright/locator')
    })

    test('何も絞り込んでいないこと', async ({ page }) => {
      const result = page.locator('.child')
      await expect(result).toHaveCount(3)
    })

    test('hasでの絞り込みができていること', async ({ page }) => {
      const result = page.locator('.child', { has: page.locator('.grandchild') })
      await expect(result).toHaveCount(1)
      await expect(result).toHaveId('child1')
    })

    test('hasTextでの絞り込みができていること', async ({ page }) => {
      const result = page.locator('.child', { hasText: '子2の子(孫)の要素2' })
      await expect(result).toHaveCount(1)
      await expect(result).toHaveId('child2')
    })
  })

  test.describe('ブラウザで見えないものの検証', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:8000/playwright/locator')
    })

    test('なにもないときはクリックできること', async ({ page }) => {
      page.on('dialog', async dialog => {
        expect(dialog.message()).toEqual('None Style')

        await dialog.accept()
      })

      const button = page.locator('#none_style')
      await button.click()
    })

    test('display: noneではクリックできないこと', async ({ page }) => {
      page.on('dialog', async dialog => {
        expect(dialog.message()).toEqual('Display None')

        await dialog.accept()
      })

      const button = page.locator('#display_none')
      
      test.skip(true, 'click()でtimeoutするため')
      await button.click()
    })

    test('visibility: hiddenではクリックできないこと', async ({ page }) => {
      page.on('dialog', async dialog => {
        expect(dialog.message()).toEqual('Visibility Hidden')

        await dialog.accept()
      })

      const button = page.locator('#visibility_hidden')

      test.skip(true, 'click()でtimeoutするため')
      await button.click()
    })

    test('opacity: 0ではクリックできること', async ({ page }) => {
      page.on('dialog', async dialog => {
        expect(dialog.message()).toEqual('Opacity zero')

        await dialog.accept()
      })

      const button = page.locator('#opacity_zero')
      await button.click()
    })
  })

  test.describe('アサーションの否定形', () => {
    test('否定形による確認もできること', async ({ page }) => {
      await page.goto('http://localhost:8000/playwright/locator')

      const result = page.locator('.class_locator')
      await expect(result).not.toHaveText('by test id')
    })
  })
})