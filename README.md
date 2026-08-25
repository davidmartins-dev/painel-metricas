# Painel de Métricas BI - Desafio Técnico

Trata-se de um painel analítico (BI) de nível corporativo com exibição de métricas de um e-commerce fictício. O foco deste projeto vai muito além da interface visual, abrangendo qualidade de software (QA), automação de testes, CI/CD e simulação de consumo eficiente de APIs públicas.

## 🎯 Objetivo e Visão de Negócio

Exibir métricas vitais para a tomada de decisão em um e-commerce moderno, garantindo confiabilidade nos dados através de lógicas robustas de filtro e drill-down, com uma interface que foca 100% na usabilidade (UX) e leitura de dados.

## 🏗️ Arquitetura e Tecnologias

* **Next.js 16 (App Router):** Escolhido pelo poder de renderização otimizada e estruturação escalável.
* **BFF (Backend for Frontend):** Implementada uma rota de API dentro do próprio Next.js (`Route Handlers`) que atua como nossa camada lógica. Essa camada pega os dados brutos, aplica as regras de negócio (cálculo de Ticket Médio, somatória de vendas) e devolve apenas o dado consolidado, otimizando drasticamente o carregamento (KISS Principle).
* **Tailwind CSS + shadcn/ui:** Design System corporativo e responsivo, suportando perfeitamente a alternância nativa entre Tema Claro e Tema Escuro (Dark Mode).
* **Recharts:** Biblioteca flexível para a renderização visual dos dados (Client-side).
* **Vitest & Playwright:** Ferramentas de engenharia de software escolhidas para blindar as regras de negócio (backend) e a interface (frontend).

## 📊 Features & UX

1. **Visão Geral Dinâmica (KPIs):** Ticket Médio (AOV), Receita Total, Média de Itens por Carrinho e Total de Descontos.
2. **Drill-down Avançado:** Filtros de período dinâmicos (7d, 30d, personalizado) e seleção unitária por produto isolam automaticamente o contexto dos gráficos em tempo real.
3. **Design System & Dark Mode:** Respeita o tema do sistema operacional, com tokens de cores contrastantes cuidadosamente mapeados (`text-foreground`).

## 🧪 Estratégia de Qualidade (QA)

Para garantir que a matemática do BI não sofra regressões e a tela não quebre no celular do usuário, a aplicação possui duas camadas ativas de testes:

### Testes Unitários (Business Logic)
Criados utilizando **Vitest**. Focados em validar isoladamente a lógica de cálculo (multiplicadores de período, agrupamentos e descontos) no `metrics.service.ts`, implementando *Mocking* seguro para não depender de chamadas externas de rede.
```bash
npm run test
```

### Testes End-to-End (E2E & Mobile)
Criados utilizando **Playwright**. Validam o fluxo completo de interação do usuário (clicar no combo, abrir modal, alternar tema). O script de teste valida **5 instâncias paralelamente**: Chrome, Firefox, Safari (Webkit), Mobile Chrome (Pixel) e Mobile Safari (iPhone 12).
```bash
npm run test:e2e
```

## 🔄 CI/CD & Estratégia de Branches (Versionamento)

O repositório simula o ambiente rígido de uma equipe Sênior e segue uma estrutura **GitFlow**:
* `main`: Produção (Protegida).
* `develop`: Integração/Staging (Protegida).
* `feature/*`: Isolamento para novas implementações.

**Pipeline de CI (GitHub Actions):** 
Foi implementado um pipeline robusto (`.github/workflows/ci.yml`) para atuar como "Guarda-Costas" do repositório. O *Merge* de *Pull Requests* para `main` e `develop` fica travado (Status Checks) até que o servidor conclua:
1. Instalação e verificação de cache (`npm`).
2. Análise estática do código (`npm run lint`).
3. Construção (Build) com sucesso (`npm run build`).
4. Aprovação nos Testes Unitários (`Vitest`).
5. Aprovação nos Testes E2E Desktop/Mobile (`Playwright`).

## 🚀 Como Executar Localmente

1. Clone o repositório e acesse a pasta.
2. Instale as dependências:
```bash
npm install
```
3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
4. Acesse `http://localhost:3000`.
