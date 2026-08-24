"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface RevenueData {
  name: string;
  total: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

const chartConfig = {
  total: {
    label: "Receita",
    color: "hsl(var(--primary))",
  },
};

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card className="h-full shadow-sm flex flex-col">
      <CardHeader>
        <CardTitle className="text-slate-800">Receita ao longo do tempo</CardTitle>
        <CardDescription>
          Acompanhamento de vendas da categoria selecionada.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pb-4 sm:px-6 flex-1">
        {/* Wrapper para garantir que o scroll aconteça DENTRO do card e não estique a tela */}
        <div className="overflow-x-auto w-full">
          <div className="h-[300px] min-w-[500px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={65}
                    // Formata "160000" para "160k" para não comer o espaço do gráfico
                    tickFormatter={(value) => `R$${value >= 1000 ? value / 1000 + 'k' : value}`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="total"
                    fill="var(--color-total)"
                    radius={[4, 4, 0, 0]}
                    className="fill-indigo-600"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
