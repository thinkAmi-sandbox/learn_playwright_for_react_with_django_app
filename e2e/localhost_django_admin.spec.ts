import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8000/admin/login/?next=/admin/');
  await page.getByLabel('ユーザー名:').click();
  await page.getByLabel('ユーザー名:').fill('admin');
  await page.getByLabel('ユーザー名:').press('Tab');
  await page.getByLabel('パスワード:').fill('pass');
  await page.getByRole('button', { name: 'ログイン' }).click();
  await page.getByRole('link', { name: 'Tasks' }).click();
  await page.getByRole('link', { name: '123' }).click();
});