import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('should display dashboard with navigation', async ({ page }) => {
    await page.goto('/');

    // Check if main elements are visible
    await expect(page.getByRole('heading', { name: 'monaiy' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Willkommen zurück!' })
    ).toBeVisible();

    // Check navigation items
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Konten' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Umsätze' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Analysen' })).toBeVisible();
  });

  test('should open command palette with keyboard shortcut', async ({
    page,
  }) => {
    await page.goto('/');

    // Press Cmd+K (or Ctrl+K on Windows/Linux)
    await page.keyboard.press('Control+K');

    // Check if command palette is visible
    await expect(page.getByPlaceholder('Befehle durchsuchen...')).toBeVisible();

    // Check if commands are listed
    await expect(page.getByText('Bank verbinden')).toBeVisible();
    await expect(page.getByText('CSV importieren')).toBeVisible();
  });

  test('should display account information', async ({ page }) => {
    await page.goto('/');

    // Check if account cards are visible
    await expect(page.getByText('Girokonto')).toBeVisible();
    await expect(page.getByText('Sparkonto')).toBeVisible();
    await expect(page.getByText('Kreditkarte')).toBeVisible();

    // Check if balances are displayed
    await expect(page.getByText('2.450,67 €')).toBeVisible();
    await expect(page.getByText('12.500,00 €')).toBeVisible();
    await expect(page.getByText('-125,30 €')).toBeVisible();
  });

  test('should show quick stats', async ({ page }) => {
    await page.goto('/');

    // Check if stats cards are visible
    await expect(page.getByText('Gesamtguthaben')).toBeVisible();
    await expect(page.getByText('Einnahmen (Monat)')).toBeVisible();
    await expect(page.getByText('Ausgaben (Monat)')).toBeVisible();
  });

  test('should have working quick action buttons', async ({ page }) => {
    await page.goto('/');

    // Check if quick action buttons are visible
    await expect(
      page.getByRole('button', { name: 'Import starten' })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Budget erstellen' })
    ).toBeVisible();
  });
});
