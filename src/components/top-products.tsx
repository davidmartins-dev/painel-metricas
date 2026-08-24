import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  sales: number;
  revenue: string;
}

interface TopProductsProps {
  products: Product[];
}

export function TopProducts({ products }: TopProductsProps) {
  return (
    <Card className="h-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-slate-800">Top Produtos</CardTitle>
        <CardDescription>
          Os itens mais vendidos desta categoria.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {products.length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhum dado encontrado.</p>
          )}
          {products.map((product) => (
            <div key={product.id} className="flex items-center">
              {/* Círculo simulando um Avatar para não depender de outra lib */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                {product.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none text-slate-800">
                  {product.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {product.sales} vendas
                </p>
              </div>
              <div className="ml-auto font-medium text-slate-800">
                {product.revenue}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
