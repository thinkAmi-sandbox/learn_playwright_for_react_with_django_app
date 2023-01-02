import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.goto('http://localhost:8000/tasks');
  await page.getByRole('link', { name: '123' }).click();
  await page.getByRole('link', { name: 'Back' }).click();
});