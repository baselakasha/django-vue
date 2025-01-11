import { test, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.navbar-brand')).toHaveText('Todo App')
})

test('register new account successfully should redirect to register success page', async ({
  page
}) => {
  await page.goto('/register')
  // Fill in form
  await page.fill('input[id="firstname"]', 'John')
  await page.fill('input[id="lastname"]', 'Doe')
  await page.fill('input[id="email"]', 'johndoe@example.com')
  await page.fill('input[id="password"]', 'password')
  await page.fill('input[id="username"]', 'johndoe')
  await page.click('input[type="submit"]')

  await expect(page.locator('text=Registration successful')).toBeVisible()
})
