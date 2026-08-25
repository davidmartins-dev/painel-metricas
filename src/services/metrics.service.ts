import { formatCurrency } from '@/lib/formatters';
import { DummyResponse, DashboardData } from '@/types/metrics';

export class MetricsService {
  static async getDashboardData(categorySlug: string, period: string = '30d', search: string = ''): Promise<DashboardData> {
    const response = await fetch('https://dummyjson.com/carts?limit=30', {
      next: { revalidate: 60 } 
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar dados na API pública');
    }

    const rawData: DummyResponse = await response.json();
    const carts = rawData.carts;

    let receitaTotalBruta = 0;
    let receitaTotalLiquida = 0;
    let quantidadeTotalItens = 0;
    let totalCartsWithSearch = 0;
    const productSales: Record<string, { id: string; name: string; sales: number; revenue: number }> = {};
    const allUniqueProducts = new Map<string, string>(); 

    carts.forEach(cart => {
      let cartValidGross = 0;
      let cartValidNet = 0;
      let cartValidQuantity = 0;
      let hasValidProduct = false;

      cart.products.forEach(prod => {
        // Alimenta a lista de produtos disponíveis ANTES do filtro
        allUniqueProducts.set(prod.title.toLowerCase(), prod.title);

        // Aplica o filtro de busca por produto
        if (search && !prod.title.toLowerCase().includes(search.toLowerCase())) {
          return;
        }

        hasValidProduct = true;
        cartValidGross += prod.total;
        cartValidNet += prod.discountedPrice || prod.total;
        cartValidQuantity += prod.quantity;

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

      // Lógica do Drill-down
      if (!search) {
        receitaTotalBruta += cart.total;
        receitaTotalLiquida += cart.discountedTotal;
        quantidadeTotalItens += cart.totalQuantity;
      } else {
        receitaTotalBruta += cartValidGross;
        receitaTotalLiquida += cartValidNet;
        quantidadeTotalItens += cartValidQuantity;
      }

      if (hasValidProduct || !search) {
        totalCartsWithSearch++;
      }
    });

    const ticketMedio = totalCartsWithSearch > 0 ? receitaTotalBruta / totalCartsWithSearch : 0;
    const totalDescontos = receitaTotalBruta - receitaTotalLiquida;
    const mediaItens = totalCartsWithSearch > 0 ? quantidadeTotalItens / totalCartsWithSearch : 0;

    const categoryMultiplier = categorySlug === 'visão geral' ? 1 : 0.3;
    let periodMultiplier = 1;
    
    if (period === 'all') periodMultiplier = 10;
    else if (period === '7d') periodMultiplier = 0.25;
    else if (period === '30d') periodMultiplier = 1;
    else if (period === '90d') periodMultiplier = 2.8;
    else if (period === '120d') periodMultiplier = 4.2;
    else if (period.startsWith('custom_')) periodMultiplier = 1.5; 
    
    const finalMultiplier = categoryMultiplier * periodMultiplier;

    const topProducts = Object.values(productSales)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5) 
      .map(p => ({
        id: p.id,
        name: p.name,
        sales: Math.floor(p.sales * finalMultiplier),
        revenue: formatCurrency(p.revenue * finalMultiplier)
      }));

    const availableProducts = Array.from(allUniqueProducts.entries())
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label));

    const dailyBase = receitaTotalBruta / 7;
    const revenueData = [
      { name: "Seg", total: Math.floor(dailyBase * 0.8) },
      { name: "Ter", total: Math.floor(dailyBase * 1.1) },
      { name: "Qua", total: Math.floor(dailyBase * 0.9) },
      { name: "Qui", total: Math.floor(dailyBase * 1.2) },
      { name: "Sex", total: Math.floor(dailyBase * 1.5) },
      { name: "Sáb", total: Math.floor(dailyBase * 1.3) },
      { name: "Dom", total: Math.floor(dailyBase * 0.7) },
    ];

    return {
      kpis: {
        receitaTotal: formatCurrency(receitaTotalBruta * finalMultiplier),
        ticketMedio: formatCurrency(ticketMedio * categoryMultiplier),
        totalDescontos: formatCurrency(totalDescontos * finalMultiplier),
        mediaItensCarrinho: mediaItens.toFixed(1) + " unidades",
      },
      revenueData: revenueData.map(d => ({ name: d.name, total: d.total * finalMultiplier })),
      topProducts: topProducts,
      availableProducts: availableProducts
    };
  }
}
