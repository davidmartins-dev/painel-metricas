import { test, expect } from '@playwright/test';

test.describe('Dashboard de Métricas E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Assumindo que a aplicação roda na porta 3000 localmente
    await page.goto('http://localhost:3000/');
  });

  test('deve carregar o painel geral corretamente', async ({ page }) => {
    // Verifica se o h1 principal carregou
    await expect(page.locator('h1')).toContainText(/Painel Geral/i);
    
    // Verifica se os KPIs iniciais estão visíveis
    await expect(page.getByText('Receita Total')).toBeVisible();
    await expect(page.getByText('Ticket Médio')).toBeVisible();
    await expect(page.getByText('Média de Itens')).toBeVisible();
  });

  test('deve aplicar o drill-down de produto e atualizar a UI', async ({ page }) => {
    // 1. Encontra o botão do Combobox (usamos .first() porque o input de busca também tem role="combobox")
    const filterButton = page.getByRole('combobox').first();
    await expect(filterButton).toBeVisible();
    
    // 2. Clica para abrir o popover
    await filterButton.click();

    // 3. Busca o input de texto do Command e digita "iphone"
    const searchInput = page.getByPlaceholder('Buscar produto...');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('iphone');

    // 4. Seleciona o primeiro resultado que aparecer contendo "iphone"
    const option = page.getByRole('option').filter({ hasText: /iphone/i }).first();
    await expect(option).toBeVisible();
    await option.click();

    // 5. Verifica se o filtro aplicou (o botão deve exibir o produto selecionado)
    await expect(filterButton).toContainText(/iphone/i, { timeout: 10000 });

    // 6. O Dashboard deve continuar exibindo o gráfico e os dados
    await expect(page.getByText('Receita ao longo do tempo')).toBeVisible();
  });

  test('deve alternar o tema claro/escuro perfeitamente', async ({ page }) => {
    // 1. Encontra o botão de alternar tema pelo atributo invisível (sr-only)
    const themeButton = page.getByRole('button', { name: /Alternar tema/i });
    await expect(themeButton).toBeVisible();

    // 2. Clica para mudar o tema
    await themeButton.click();

    // 3. Verifica se o Next-Themes aplicou a classe 'dark' na tag <html>
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveClass(/dark/);
  });
});
