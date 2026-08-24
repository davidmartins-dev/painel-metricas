import { NextResponse } from 'next/server';
import { MetricsService } from '@/services/metrics.service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category') || 'visão geral';
    
    const data = await MetricsService.getDashboardData(categorySlug);

    return NextResponse.json(data);

  } catch (error) {
    console.error("Fetch API Error:", error);
    return NextResponse.json({ error: "Erro ao processar dados da API" }, { status: 500 });
  }
}
