import { test, expect } from '@playwright/test';
import path from 'path';  // 追加

test.use({
  // 差し替え
  // storageState: 'secret.json'
  storageState: path.join(__dirname, 'secret.json')
});

test('test', async ({ page }) => {
  await page.goto('http://localhost:8000/admin/');
  await page.getByRole('link', { name: 'Tasks' }).click();
  await page.getByText('変更する task を選択 task を追加 操作: --------- 選択された tasks の削除 実行 1個の内ひとつも選択されていません 内容 Upd').click();
  await page.locator('input[name="_selected_action"]').check();
  await page.getByRole('combobox', { name: '操作:' }).selectOption('delete_selected');
  await page.getByRole('button', { name: '実行' }).click();
  await page.getByRole('link', { name: '戻る' }).click();
});