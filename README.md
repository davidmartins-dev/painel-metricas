# Painel de Métricas BI - Desafio Técnico

Trata-se de um pequeno painel com exibição de métricas de um e-commerce fictício, utilizando API pública de dados para simular a exibição de métricas.

## 🎯 Objetivo e Visão de Negócio

Exibir métricas relevantes para um e-commerce, como ticket médio, total de pedidos e receita total, além de gráficos mostrando a divisão de receita por categoria de produto e top produtos.

## 🏗️ Arquitetura e Tecnologias

*   **Next.js 15 (App Router):** Escolhido pelo poder de renderização otimizada, Server Components e estruturação escalável.

*   **BFF (Backend for Frontend):** Implementei uma rota de API dentro do próprio Next.js (`Route Handlers`) que atua como nossa API Simulada. Essa camada pega os dados brutos, aplica a regra de negócio (cálculo de Ticket Médio, somatória de vendas) e devolve apenas o consolidado para o Frontend, otimizando o carregamento da página no lado do cliente.

*   **Tailwind CSS + shadcn/ui:** Para construir uma interface limpa, acessível e responsiva sem perder horas escrevendo CSS do zero. Utilizei os componentes `Card` e `Chart` para compor o BI.
*   **Recharts:** Biblioteca poderosa e flexível para a renderização dos gráficos integrados ao shadcn.

## 📊 Métricas Apresentadas

As métricas foram pensadas nas KPIs reais que uma diretoria de e-commerce acompanha diariamente:

1.  **Visão Geral (Cards):** Ticket Médio (AOV), Total de Pedidos e Receita Total.

2.  **Performance de Vendas:** Gráficos mostrando a divisão de receita por categoria de produto.

3.  **Top Produtos:** Os campeões de venda (Curva A) para rápido acompanhamento de performance e estoque.

## 🚀 Como Executar o Projeto Localmente

1. Clone o repositório e acesse a pasta do projeto.
2. Instale as dependências:
```bash
npm install
```
3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
4. Acesse o painel em `http://localhost:3000` no seu navegador.
