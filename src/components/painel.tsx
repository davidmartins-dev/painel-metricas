"use client";

import { useEffect, useState } from "react";
import { MetricCard } from "@/components/metric-card";
import { RevenueChart } from "@/components/revenue-chart";
import { TopProducts } from "@/components/top-products";
import { DollarSign, ShoppingCart, Tags, Package } from "lucide-react";
import { DashboardData } from "@/types/metrics";
import { PeriodFilter } from "@/components/period-filter";
import { ProductFilter } from "@/components/product-filter";
import { RefreshButton } from "@/components/refresh-button";

interface PainelProps {
  slug: string;
}

export default function Painel({ slug }: PainelProps) {
  const isGeneral = slug === "visão geral";
  const categoryName = slug?.replace("-", " ") ?? "";

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("30d");
  const [search, setSearch] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(`/api/metrics?category=${slug}&period=${period}&search=${search}`);
        if (!response.ok) throw new Error("Erro ao buscar dados");
        
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Erro no painel:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug, period, search, refreshKey]);

  return (
    <div className="space-y-8 px-4 py-6 md:px-8 md:py-8">
      {/* Component's Own Header with Period Filter Component */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight capitalize text-foreground">
            {isGeneral ? "Painel Geral de Vendas" : `Performance: ${categoryName}`}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isGeneral
              ? "Acompanhamento em tempo real de todas as métricas consolidadas do e-commerce."
              : `Acompanhamento em tempo real das métricas da categoria.`}
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
          <ProductFilter search={search} onSearchChange={setSearch} products={data?.availableProducts || []} />
          <PeriodFilter period={period} onPeriodChange={setPeriod} />
          <RefreshButton onRefresh={() => setRefreshKey(prev => prev + 1)} isLoading={loading} />
        </div>
      </header>

      {/* Exibição do estado de Loading com animação suave */}
      {loading || !data ? (
        <div className="flex h-100 items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid gap-6 animate-in fade-in duration-500">
          {/* GRID DE KPIs */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Receita Total"
              value={data.kpis.receitaTotal}
              description="Vendas acumuladas no período"
              icon={DollarSign}
            />
            <MetricCard
              title="Ticket Médio"
              value={data.kpis.ticketMedio}
              description="Valor médio gasto por carrinho"
              icon={ShoppingCart}
            />
            <MetricCard
              title="Total de Descontos"
              value={data.kpis.totalDescontos}
              description="Diferença da receita bruta x líquida"
              icon={Tags}
            />
            <MetricCard
              title="Média de Itens"
              value={data.kpis.mediaItensCarrinho}
              description="Volume de unidades por carrinho"
              icon={Package}
            />
          </div>

          {/* ÁREA DE GRÁFICOS */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="lg:col-span-4 min-w-0">
              <RevenueChart data={data.revenueData} />
            </div>
            <div className="lg:col-span-3 min-w-0">
              <TopProducts products={data.topProducts} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
