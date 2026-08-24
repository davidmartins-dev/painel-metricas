"use client";

import { useEffect, useState } from "react";
import { MetricCard } from "@/components/metric-card";
import { RevenueChart } from "@/components/revenue-chart";
import { TopProducts } from "@/components/top-products";
import { DollarSign, ShoppingCart, RefreshCcw } from "lucide-react";

import { DashboardData } from "@/types/metrics";

interface PainelProps {
  slug: string;
}

export default function Painel({ slug }: PainelProps) {
  const isGeneral = slug === "visão geral";
  const categoryName = slug?.replace("-", " ") ?? "";

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fazemos a requisição sempre que o componente montar ou o 'slug' mudar
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(`/api/metrics?category=${slug}`);
        if (!response.ok) throw new Error("Erro ao buscar dados");
        
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Falha na requisição:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  return (
    <div className="space-y-8 px-4 py-6 md:px-8 md:py-8">
      {/* Component's Own Header */}
      <header>
        <h1 className="text-3xl font-bold tracking-tight capitalize text-slate-900">
          {isGeneral ? "Painel Geral de Vendas" : `Performance: ${categoryName}`}
        </h1>
        <p className="text-muted-foreground mt-1">
          {isGeneral
            ? "Acompanhamento em tempo real de todas as métricas consolidadas do e-commerce."
            : `Acompanhamento em tempo real das métricas da categoria de suplementos.`}
        </p>
      </header>

      {/* Exibição do estado de Loading com animação suave */}
      {loading || !data ? (
        <div className="flex h-100 items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid gap-6 animate-in fade-in duration-500">
          {/* GRID DE KPIs - Instanciando os MetricCards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
              title="Taxa de Recompra"
              value={data.kpis.taxaRecompra}
              description="Fidelização de clientes ativos"
              icon={RefreshCcw}
            />
          </div>

          {/* ÁREA DE GRÁFICOS - Instanciando os componentes complexos */}
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
