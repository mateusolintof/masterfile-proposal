# PROPOSTA COMERCIAL: THE GLASS JOURNEY (CONVERT.AI)
TIPO: APRESENTACAO INTERATIVA HORIZONTAL
ESTRATEGIA: PRODUCT-LED IMMERSION
STATUS: ATUALIZADO PARA MVP
DATA: DEZEMBRO 2025
CLIENTE: CM REMEDIOS

## 1. VISAO GERAL
- Jornada horizontal guiada por navegacao por dots e setas.
- IntroGate atua como hero inicial e libera a experiencia.
- Conteudo foca em prova de valor (CRM, ROI, KPI, operacao real).

## 2. STACK TECNOLOGICA (ATUAL)
```json
{
  "dependencies": {
    "next": "16.1.0",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "@heroui/react": "2.8.6",
    "@heroui/theme": "2.4.24",
    "framer-motion": "^12.0.0",
    "@react-three/fiber": "^9.0.0",
    "@react-three/drei": "^10.0.0",
    "@react-three/postprocessing": "^3.0.4",
    "three": "^0.182.0",
    "recharts": "^2.15.0",
    "@xyflow/react": "12.10.0",
    "zustand": "^5.0.0",
    "lucide-react": "^0.562.0",
    "tailwind-variants": "^3.2.2",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.0.0"
  },
  "devDependencies": {
    "typescript": "5.9.3",
    "tailwindcss": "4.1.18",
    "@tailwindcss/postcss": "4.1.18",
    "glslify": "^7.1.1"
  }
}
```

## 3. ARQUITETURA DE NAVEGACAO
- `src/app/page.tsx` controla scroll horizontal, dots de navegacao e barra de progresso.
- `IntroGate` bloqueia a interacao inicial e apresenta o hero.
- Background 3D: `Scene` com `ElegantNetwork` + Bloom/Vignette e opacidade reduzida.
- Estado global: `useProposalStore` (slide ativo e parametros de ROI).

## 4. JORNADA DO USUARIO (11 TELAS)
1. Diagnostico - `PainPointsGrid`
2. Oportunidade - `BeforeAfterSlider`
3. Solucao - `EcosystemOrbit` (modal com fluxos por agente)
4. Dashboard - `DashboardPreview`
5. CRM & Inbox - `LiveCRM`
6. ROI - `ROICalculator`
7. Implementacao - `ImplementationPlan`
8. Oferta & Pricing - `OfferPricing`
9. Compliance - `ComplianceAssumptions`
10. Prova - `ProofWall`
11. Next Steps - `NextSteps`

## 5. CRM (TELA LIVE DEMO)
- Pipelines de vendas (kanban): Atendimento IA, Atendimento Humano, Follow-up.
- Inbox unificado: lista de conversas, chat central e painel lateral retratil com info do lead.
- Gestao de contatos: segmentos e tags por etapa.
- Visao geral: grafico de atendimentos/deals e filtros por canal/periodo.
- Fluxo explicito: chips mostram o progresso da conversa (Lead -> IA -> Qualificacao -> Escala -> CRM).

## 6. DASHBOARD
- Aba 1: Visao Geral + KPIs + funil.
- Aba 2: Gestao IA (volume, qualificados, escalados, SLA, CSAT).
- Aba 3: Atendimento Vendedores (deals, score, tempo, % fechamento).
- Aba 4: Clientes (lista + analise IA com temperatura e score).
- Aba 5: Insights + Reports (insights IA + grafico de perdas).

## 7. DESIGN SYSTEM
- Base: #02040A
- Acentos: #00FF94 (sucesso) e #00E5FF (tech)
- Erro: #FF4D4D
- Glassmorphism com blur moderado e bordas sutis.
- IntroGate usa grid tech + scanline para diferenciar do background 3D.

## 8. COMPONENTES CHAVE
```
src/
  app/
    page.tsx
    layout.tsx
  components/
    3d/
      Scene.tsx
      ElegantNetwork.tsx
    modules/
      IntroGate.tsx
      PainPointsGrid.tsx
      BeforeAfterSlider.tsx
      EcosystemOrbit.tsx
      DashboardPreview.tsx
      LiveCRM.tsx
      ROICalculator.tsx
      ImplementationPlan.tsx
      OfferPricing.tsx
      ComplianceAssumptions.tsx
      ProofWall.tsx
      NextSteps.tsx
  store/
    useProposalStore.ts
```

## 9. CHECKLIST ATUAL
- [x] IntroGate e hero atualizado
- [x] Navegacao horizontal com progress
- [x] CRM e Dashboard alinhados ao produto
- [x] Fluxos dos agentes com @xyflow/react
- [x] ROI com formulas, payback e estado global
- [ ] Inserir assets finais (videos/imagens)
- [ ] Revisao final de copy e metricas
- [ ] QA visual final (desktop/tablet/mobile)
