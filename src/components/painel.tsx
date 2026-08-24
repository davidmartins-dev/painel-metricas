"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PainelProps {
  slug: string;
}

export default function Painel({ slug }: PainelProps) {
  const isGeneral = slug === "visão geral";
  const categoryName = slug?.replace("-", " ") ?? "";

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-8">
      {/* 
        Component's Own Header (Self-contained)
        O H1 e o P agora vivem e respiram dentro do componente, reagindo ao slug!
      */}

      <h1 className="text-3xl font-bold tracking-tight capitalize text-slate-900">
        {isGeneral ? "Painel Geral de Vendas" : `Performance: ${categoryName}`}
      </h1>
      <p className="text-muted-foreground mt-1">
        {isGeneral
          ? "Acompanhamento em tempo real de todas as métricas consolidadas do e-commerce."
          : `Acompanhamento em tempo real das métricas da categoria de suplementos.`}
      </p>

      <div className="grid gap-6">
        {/* GRID DE KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Filtro Ativo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize text-slate-800">
                {categoryName}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Definido dinamicamente via componente
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ÁREA DE GRÁFICOS */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4 flex items-center justify-center h-[300px] border-dashed border-2 shadow-none">
            <p className="text-muted-foreground font-medium">
              O gráfico de Receita será renderizado aqui
            </p>
          </Card>

          <Card className="lg:col-span-3 flex items-center justify-center h-[300px] border-dashed border-2 shadow-none">
            <p className="text-muted-foreground font-medium">
              A lista de Top Produtos aparecerá aqui
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
