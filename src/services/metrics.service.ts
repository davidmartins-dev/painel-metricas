import { formatCurrency, formatPercentage } from '@/lib/formatters';

import { DummyResponse } from '@/types/metrics';

export class MetricsService {
  /**
   * Busca dados da API pública e processa os KPIs e listagens
   * Isolando a regra de negócio do roteador do Next.js.
   */
  static async getDashboardData(categorySlug: string) {
    const response = await fetch('https://dummyjson.com/carts?limit=30', {
      next: { revalidate: 60 } 
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar dados na API pública');
    }

    const rawData: DummyResponse = await response.json();
    const carts = rawData.carts;

    let receitaTotal = 0;
    const totalCarts = carts.length;
    const productSales: Record<string, { id: string; name: string; sales: number; revenue: number }> = {};

    carts.forEach(cart => {
      receitaTotal += cart.total;
      
      cart.products.forEach(prod => {
        if (!productSales[prod.id]) {
          productSales[prod.id] = {
            id: String(prod.id),
            name: prod.title,
            sales: 0,
            revenue: 0
          };
        }
        productSales[prod.id].sales += prod.quantity;
        productSales[prod.id].revenue += prod.total;
      });
    });

    const ticketMedio = totalCarts > 0 ? receitaTotal / totalCarts : 0;
    const taxaRecompra = 45;

    const topProducts = Object.values(productSales)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5) 
      .map(p => ({
        id: p.id,
        name: p.name,
        sales: p.sales,
        revenue: formatCurrency(p.revenue)
      }));

    const dailyBase = receitaTotal / 7;
    const revenueData = [
      { name: "Seg", total: Math.floor(dailyBase * 0.8) },
      { name: "Ter", total: Math.floor(dailyBase * 1.1) },
      { name: "Qua", total: Math.floor(dailyBase * 0.9) },
      { name: "Qui", total: Math.floor(dailyBase * 1.2) },
      { name: "Sex", total: Math.floor(dailyBase * 1.5) },
      { name: "Sáb", total: Math.floor(dailyBase * 1.3) },
      { name: "Dom", total: Math.floor(dailyBase * 0.7) },
    ];

    const filterMultiplier = categorySlug === 'visão geral' ? 1 : 0.3;

    return {
      kpis: {
        receitaTotal: formatCurrency(receitaTotal * filterMultiplier),
        ticketMedio: formatCurrency(ticketMedio * filterMultiplier),
        taxaRecompra: formatPercentage(taxaRecompra),
      },
      revenueData: revenueData.map(d => ({ name: d.name, total: d.total * filterMultiplier })),
      topProducts: topProducts
    };
  }
}
