// Tipagens para a API Externa (DummyJSON)
export interface DummyCartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

export interface DummyCart {
  id: number;
  products: DummyCartProduct[];
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
  userId: number;
}

export interface DummyResponse {
  carts: DummyCart[];
}

// Tipagens Internas (Nosso Domínio de E-commerce)
export interface DashboardData {
  kpis: {
    receitaTotal: string;
    ticketMedio: string;
    totalDescontos: string;
    mediaItensCarrinho: string;
  };
  revenueData: { 
    name: string; 
    total: number 
  }[];
  topProducts: { 
    id: string; 
    name: string; 
    sales: number; 
    revenue: string 
  }[];
  availableProducts: {
    value: string;
    label: string;
  }[];
}
