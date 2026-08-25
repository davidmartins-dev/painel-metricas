import { NextResponse } from 'next/server';
import { MetricsService } from '@/services/metrics.service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category') || 'visão geral';
    const period = searchParams.get('period') || '30d';
    const search = searchParams.get('search') || '';
    
    // Controller super enxuto: Delega a regra de negócio pesada para a camada de Serviço
    const data = await MetricsService.getDashboardData(categorySlug, period, search);

    return NextResponse.json(data);

  } catch (error) {
    console.error("Fetch API Error:", error);
    return NextResponse.json({ error: "Erro ao processar dados da API" }, { status: 500 });
  }
}
