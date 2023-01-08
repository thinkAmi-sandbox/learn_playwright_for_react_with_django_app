import { test, expect } from '@playwright/test';

test.describe('フォームまわりの動作確認', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8000/playwright/react/mui')
  })

  test('TextFieldに入力した値がリクエストにあること', async ({ page }) => {
    // TextField
    await page.locator('#mui_textfield').fill('シナノゴールド')

    // 送信ボタンをクリックした時に発生する、axios.post先へのリクエストをwaitする
    const requestPromise = page.waitForRequest('http://localhost:8000/api/playwright/mui/')

    // 送信ボタンをクリック
    await page.locator('#submit').click()

    const request = await requestPromise
    expect(request.postDataJSON()).toEqual({
      muiCheck: false,
      muiTextSelect: '',
      muiSelect: '',
      muiTextField: 'シナノゴールド',
    })
  })

  test('TextFieldに追記した値がリクエストにあること', async ({ page }) => {
    const textField = page.locator('#mui_textfield')
    await textField.fill('王林')

    // typeで追記
    await textField.type('秋映')

    const requestPromise = page.waitForRequest('http://localhost:8000/api/playwright/mui/')

    await page.locator('#submit').click()

    const request = await requestPromise
    expect(request.postDataJSON()).toEqual({
      muiCheck: false,
      muiTextSelect: '',
      muiSelect: '',
      muiTextField: '王林秋映',
    })
  })
  
  test('fillとtypeの違い', async ({ page }) => {
    const textField = page.locator('#mui_textfield')
    await textField.fill('王林')

    // typeは追記
    await textField.type('紅玉')
    expect(await textField.inputValue()).toEqual('王林紅玉')

    // fillは差し替え
    await textField.fill('つがる')
    expect(await textField.inputValue()).toEqual('つがる')
  })

  test('TextFieldをクリアした値がリクエストにあること', async ({ page }) => {
    await page.locator('#mui_textfield').clear()

    const requestPromise = page.waitForRequest('http://localhost:8000/api/playwright/mui/')

    await page.locator('#submit').click()

    const request = await requestPromise
    expect(request.postDataJSON()).toEqual({
      muiCheck: false,
      muiTextSelect: '',
      muiSelect: '',
    })
  })

  test('Radioで選択した値がリクエストにあること', async ({ page }) => {
    await page.locator('#mui_radio_red').click()

    const requestPromise = page.waitForRequest('http://localhost:8000/api/playwright/mui/')

    await page.locator('#submit').click()

    const request = await requestPromise
    expect(request.postDataJSON()).toEqual({
      muiCheck: false,
      muiTextSelect: '',
      muiSelect: '',
      muiRadio: 'red',
    })
  })

  test('TextField select で選択した値がリクエストにあること', async ({ page }) => {
    // セレクトボックスをクリックした後、選びたいものをクリックする
    await page.locator('#mui_textfield_select').click()
    await page.locator('#mui_textfield_select_farmersMarket').click()

    const requestPromise = page.waitForRequest('http://localhost:8000/api/playwright/mui/')

    await page.locator('#submit').click()

    const request = await requestPromise
    expect(request.postDataJSON()).toEqual({
      muiCheck: false,
      muiTextSelect: 'farmersMarket',
      muiSelect: '',
    })
  })

  test('Selectで選択した値がリクエストにあること', async ({ page }) => {
    // セレクトボックスをクリックした後、選びたいものをクリックする
    await page.locator('#mui_select').click()
    await page.locator('#mui_select_household').click()

    const requestPromise = page.waitForRequest('http://localhost:8000/api/playwright/mui/')

    await page.locator('#submit').click()

    const request = await requestPromise
    expect(request.postDataJSON()).toEqual({
      muiCheck: false,
      muiTextSelect: '',
      muiSelect: 'household',
    })
  })

  test('Checkboxのチェックがリクエストにあること', async ({ page }) => {
    await page.locator('#mui_checkbox').setChecked(true)

    const requestPromise = page.waitForRequest('http://localhost:8000/api/playwright/mui/')

    await page.locator('#submit').click()

    const request = await requestPromise
    expect(request.postDataJSON()).toEqual({
      muiCheck: true,
      muiTextSelect: '',
      muiSelect: '',
    })
  })

  test('TextAreaの改行がリクエストにあること', async ({ page }) => {
    await page.locator('#mui_textarea').fill('改行前\n改行後')

    const requestPromise = page.waitForRequest('http://localhost:8000/api/playwright/mui/')

    await page.locator('#submit').click()

    const request = await requestPromise
    expect(request.postDataJSON()).toEqual({
      muiCheck: false,
      muiTextSelect: '',
      muiSelect: '',
      muiTextAreaAutosize: '改行前\n改行後'
    })
  })
})


test.describe('DateTimePickerの操作', () => {
  test('うまくいかない', async ({ page }) => {
    
    await page.goto('http://localhost:8000/playwright/react/mui')
    
    const datetimePicker = page.locator('#mui_datetime_picker')

    await datetimePicker.click()
    await page.screenshot({path: 'click.png'})

    test.skip(true, 'ヘッドレスの場合、次のところでテストが失敗する')
    await datetimePicker.fill('2023/01/07 17:01:02')

    const requestPromise = page.waitForRequest('http://localhost:8000/api/playwright/mui/')

    await page.locator('#submit').click()

    const request = await requestPromise
    expect(request.postDataJSON()).toEqual({
      muiCheck: false,
      muiTextSelect: '',
      muiSelect: '',
      muiDateTimePicker: '2023-01-07T08:01:02.000Z'
    })
  })
})


