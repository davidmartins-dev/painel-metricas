import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MetricsService } from '../metrics.service';

// Mock dos dados que a API pública (DummyJSON) retornaria
const mockCartsResponse = {
  carts: [
    {
      id: 1,
      total: 1000,
      discountedTotal: 900,
      totalQuantity: 5,
      products: [
        { id: 101, title: 'iPhone 12', price: 800, quantity: 1, total: 800, discountPercentage: 10, discountedPrice: 720 },
        { id: 102, title: 'Cabo USB', price: 200, quantity: 4, total: 200, discountPercentage: 10, discountedPrice: 180 }
      ]
    },
    {
      id: 2,
      total: 500,
      discountedTotal: 450,
      totalQuantity: 2,
      products: [
        { id: 102, title: 'Cabo USB', price: 200, quantity: 2, total: 200, discountPercentage: 10, discountedPrice: 180 },
        { id: 103, title: 'Carregador', price: 300, quantity: 1, total: 300, discountPercentage: 10, discountedPrice: 270 }
      ]
    }
  ]
};

// Faz o mock do fetch global para não dependermos de internet no teste
global.fetch = vi.fn();

describe('MetricsService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockCartsResponse,
    });
  });

  it('deve calcular corretamente a receita bruta total (sem filtros)', async () => {
    const data = await MetricsService.getDashboardData('visão geral', '30d', '');
    
    // Total bruto: 1000 (carrinho 1) + 500 (carrinho 2) = 1500
    // Como a formatação BRL pode ter espaços invisíveis (\xa0), usamos toContain
    expect(data.kpis.receitaTotal).toContain('1.500');
  });

  it('deve aplicar o drill-down dinâmico e calcular métricas APENAS do produto buscado', async () => {
    const data = await MetricsService.getDashboardData('visão geral', '30d', 'iphone');
    
    // O iPhone só existe no carrinho 1. Bruto = 800, Líquido = 720, Qtd = 1
    expect(data.kpis.receitaTotal).toContain('800'); // Receita isolada do iPhone
    expect(data.kpis.totalDescontos).toContain('80'); // 800 - 720 = 80 de desconto
    expect(data.kpis.mediaItensCarrinho).toBe('1.0 unidades'); // Apenas 1 unidade vendida
  });

  it('deve aplicar multiplicadores de período corretamente (ex: filtro 7d = 0.25x)', async () => {
    const data = await MetricsService.getDashboardData('visão geral', '7d', '');
    
    // Total bruto original: 1500. Multiplicador de 7 dias é 0.25
    // 1500 * 0.25 = 375
    expect(data.kpis.receitaTotal).toContain('375');
  });
  
  it('deve montar a lista de availableProducts corretamente', async () => {
    const data = await MetricsService.getDashboardData('visão geral', '30d', '');
    
    // Deve conter 3 produtos únicos: iPhone 12, Cabo USB, Carregador
    expect(data.availableProducts.length).toBe(3);
    expect(data.availableProducts.map(p => p.label)).toContain('iPhone 12');
  });
});
