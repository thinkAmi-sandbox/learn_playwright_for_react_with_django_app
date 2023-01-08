import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8000/playwright/react/mui-datagrid');

  test.skip(true, 'DataGridの解析が必要なのでskipする')

  await page.getByRole('button', { name: 'Menu' }).click();
  await page.getByRole('menuitem', { name: 'Filter' }).click();
  await page.getByRole('combobox', { name: 'Operator' }).selectOption('>=');
  await page.getByPlaceholder('Filter value').click();
  await page.getByPlaceholder('Filter value').fill('30');
  await page.getByPlaceholder('Filter value').press('Enter');
  await page.getByRole('columnheader', { name: 'Last name' }).getByRole('button', { name: 'Sort' }).click();
  await page.getByRole('button', { name: 'Go to next page' }).click();
  await page.getByRole('button', { name: 'Go to previous page' }).click();

  // スクショを撮って確認
  await page.screenshot({ path: 'screenshot.png' });
});