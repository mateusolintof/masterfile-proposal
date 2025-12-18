Aqui está o documento técnico **consolidado e definitivo**.

Ele integra todas as nossas definições: a mudança para navegação horizontal (estilo *Timeless*), o foco em "Product-Led Immersion" (valorizando o CRM/ROI), a stack atualizada (Dez/2025) e o uso híbrido de HeroUI + Tailwind.

Salve este arquivo como `SPEC-MASTERFILE.md`.

```markdown
# PROPOSTA COMERCIAL: THE GLASS JOURNEY (CONVERT.AI)
**TIPO:** APRESENTAÇÃO INTERATIVA HORIZONTAL (MAPA)
**ESTRATÉGIA:** PRODUCT-LED IMMERSION (Imersão Focada no Produto)
**STATUS:** APROVADO PARA DESENVOLVIMENTO (MVP)
**DATA:** DEZEMBRO 2025

---

## 📋 ÍNDICE
1. [Visão Geral e Estratégia](#1-visão-geral-e-estratégia)
2. [Stack Tecnológica (Dec 2025)](#2-stack-tecnológica-dec-2025)
3. [Arquitetura de Navegação (Slider Core)](#3-arquitetura-de-navegação-slider-core)
4. [Jornada do Usuário (Os 6 Nós)](#4-jornada-do-usuário-os-6-nós)
5. [Design System (Glass & Tech)](#5-design-system-glass--tech)
6. [Componentes Chave](#6-componentes-chave)
7. [Checklist de Implementação](#7-checklist-de-implementação)

---

## 1. VISÃO GERAL E ESTRATÉGIA

### 1.1 O Conceito: "Clareza através do Vidro"
Abandonamos o scroll vertical. A proposta é uma **Jornada Horizontal** onde o cliente avança do "Problema" para a "Solução".
* **A Metáfora:** O cliente desliza para o lado para avançar no tempo. O fundo sofre distorções líquidas (efeito de velocidade/travessia), mas o conteúdo (informação de negócio) permanece em "placas de vidro" estavéis e nítidas.
* **Foco de Valor:** Cada tela deve matar uma objeção de venda. A estética serve para validar a competência técnica da agência, não para distrair.

### 1.2 Estrutura de Venda (Product-Led)
Em vez de textos genéricos, usamos **Live UI**: componentes que simulam o software real funcionando para provar o valor tangível (ROI, Tempo, Organização).

---

## 2. STACK TECNOLÓGICA (DEC 2025)

Selecionada para alta performance visual (WebGL) e produtividade de UI (HeroUI).

```json
{
  "name": "convert-ai-proposal",
  "version": "1.0.0",
  "dependencies": {
    "next": "16.0.4",            // App Router, Server Actions, PPR
    "react": "19.2.3",
    "react-dom": "19.2.3",
    
    "@heroui/react": "^2.8.6",   // DOWNGRADED: Estabilidade garantida (v3 instável)
    "@heroui/theme": "^2.8.6",
    
    "framer-motion": "^12.0.0",   // Animações de UI e Transições de texto
    "gsap": "^3.13.2",            // Orquestração da Timeline Horizontal
    
    "@react-three/fiber": "^9.0.0", // Core 3D
    "@react-three/drei": "^10.0.0", // Helpers (Image, ScrollControls)
    "three": "^0.182.0",          // WebGL Engine/
    
    "recharts": "^2.15.0",        // Gráficos de ROI profissionais
    "zustand": "^5.0.0",          // Gerenciamento de Estado (Slide Ativo, Inputs ROI)
    
    "lucide-react": "^0.562.0",
    "tailwind-variants": "^3.2.2",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.0.0"
  },
  "devDependencies": {
    "typescript": "^5.9.2",
    "tailwindcss": "^4.0.0",      // Engine v4 (Compilação Instantânea)
    "@tailwindcss/postcss": "4.1.18",
    "glslify": "^7.1.1"           // Shaders para o efeito "Liquid Distortion"
  }
}

```

---

## 3. ARQUITETURA DE NAVEGAÇÃO (SLIDER CORE)

### 3.1 O Componente `<DistortionSlider />`

Este é o container principal da aplicação.

* **Input:** Drag (arrastar), Setas do Teclado, Scroll do Mouse (transformado em horizontal).
* **Camada 1 (Background R3F):** Imagens grandes ou vídeos em loop que representam o "Mood" de cada fase.
* *Efeito:* Ao trocar de slide, aplica-se um shader de deslocamento (displacement) baseado na velocidade do gesto.


* **Camada 2 (Content DOM):** HTML/React sobreposto (`z-index: 10`).
* *Comportamento:* O texto não distorce. Ele faz um *Crossfade* suave com leve delay (stagger) para dar sensação de profundidade.



### 3.2 O `<IntroGate />`

Overlay inicial bloqueante.

* **Função:** Garante interação do usuário antes de iniciar (necessário para liberar áudio e WebGL full performance).
* **Visual:** Minimalista, botão "INICIAR EXPERIÊNCIA". Ao clicar, o "vidro" se quebra ou desaparece, revelando o Slider.

---

## 4. JORNADA DO USUÁRIO (OS 6 NÓS)

### NÓ 01: O DIAGNÓSTICO (Pain & Chaos)

* **Objetivo:** "Nós sabemos onde dói."
* **Visual:** Fundo escuro com tons de alerta (vermelho/âmbar).
* **Conteúdo:** "Custo Invisível". Dados reais do cliente sobre perda de leads.
* **Componente:** `<PainPointsGrid />` - Cards que pulsam. Tooltips mostram prints reais (ex: Reclame Aqui, Zaps não respondidos).

### NÓ 02: A SOLUÇÃO (The Ecosystem)

* **Objetivo:** Tangibilizar a entrega.
* **Visual:** Fundo tecnológico limpo (Cyan/Deep Blue). O "Caos" do slide anterior se organiza em linhas retas.
* **Conteúdo:** Apresentação dos Agentes (SDR, Triage, etc) e do CRM.
* **Componente:** `<EcosystemOrbit />` - O logo do cliente ao centro. Agentes orbitando. Clicar neles abre um Modal (HeroUI) com detalhes técnicos.

### NÓ 03: GANHOS ESPERADOS (Transformation)

* **Objetivo:** Comparação visual direta.
* **Conteúdo:** Antes (Manual, Lento) vs Depois (Automático, Instantâneo).
* **Componente:** `<BeforeAfterSlider />` - Uma barra vertical interativa. O usuário arrasta para "limpar" a tela da esquerda (processos manuais) e revelar a direita (automação).

### NÓ 04: VIABILIDADE FINANCEIRA (ROI)

* **Objetivo:** A lógica racional da compra. Gamificação do lucro.
* **Componente:** `<ROICalculator />` (Uso intenso de HeroUI).
* **Aba 1 (Performance):** Slider "Leads/Mês". Gráfico de barras cresce mostrando faturamento projetado.
* **Aba 2 (Economia):** Ícones de funcionários vs Ícone da IA. Valor da economia anual brilha em verde neon.
* *Tech:* Os números devem ter animação de contagem (`countUp`) a cada alteração.



### NÓ 05: A PROVA (Live CRM)

* **Objetivo:** "Não é promessa, é software."
* **Componente:** `<LiveCRM />`.
* Uma recriação fiel do frontend do CRM (Kanban, Chat).
* **Animação Automática:** Um script roda simulando um atendimento: Lead chega -> IA responde -> Lead move para "Agendado".
* Isso valida a promessa do slide 02.



### NÓ 06: ROADMAP (Fechamento)

* **Objetivo:** Segurança e Próximos Passos.
* **Conteúdo:** Cronograma de implementação e Investimento.
* **Componente:** `<TimelineScroller />`.
* Semana 1 (Setup) -> Semana 2 (Treino) -> Semana 3 (Go Live).
* **Card de Preço:** Vidro fosco premium, valor destacado, botão magnético "INICIAR PROJETO" (Link para WhatsApp/Contrato).



---

## 5. DESIGN SYSTEM (GLASS & TECH)

### 5.1 Estética "Glassmorphism High-End"

* **Superfícies:** Branco com 5-10% opacidade + `backdrop-filter: blur(24px)`. Bordas finas (1px) brancas com 15% opacidade.
* **Tipografia:** *Inter* (Google Fonts) ou *Geist Sans*. Pesos leves (Light/Regular) para elegância, Bold apenas para números.
* **Cores:**
* Base: `#050505` (Deep Black).
* Acento: `#00FF94` (ROI/Sucesso) e `#00E5FF` (IA/Tech).
* Erro: `#FF4D4D` (Apenas no Slide 01).



### 5.2 Uso do HeroUI

Usaremos HeroUI para todos os elementos interativos funcionais para garantir acessibilidade e beleza imediata:

* `Slider` (Calculadoras).
* `Modal` (Detalhes dos Agentes).
* `Card` / `CardBody` (Containers de conteúdo).
* `Button` (CTAs).

---

## 6. COMPONENTES CHAVE (IMPLEMENTAÇÃO)

### Estrutura de Pastas Sugerida

```text
src/
├── app/
│   └── page.tsx            # Onde reside o <DistortionSlider />
├── components/
│   ├── 3d/                 # Backgrounds R3F
│   │   ├── Scene.tsx
│   │   └── Effects.tsx     # Shader de Distorção
│   ├── ui/                 # Componentes HeroUI customizados
│   └── modules/            # Os "Nós" da apresentação
│       ├── DiagnosisNode.tsx
│       ├── SolutionNode.tsx
│       ├── ComparisonNode.tsx
│       ├── ROINode.tsx
│       ├── LiveDemoNode.tsx
│       └── RoadmapNode.tsx
└── store/
    └── useProposalStore.ts # Zustand: Controla slide ativo e dados do ROI

```

---

## 7. CHECKLIST DE IMPLEMENTAÇÃO

**Fase 1: Core & Navigation**

* [ ] Setup Next.js 16 + Tailwind v4 + HeroUI.
* [ ] Criar `<IntroGate />` (Bloqueio inicial).
* [ ] Implementar `<DistortionSlider />` com imagens placeholder e transição líquida.
* [ ] Configurar Store (Zustand) para controlar o índice do slide (`activeSlide`).

**Fase 2: Content Modules**

* [ ] Construir layout estático dos 6 Nós usando Grid e Glassmorphism.
* [ ] Implementar `<PainPointsGrid />` (Nó 1) com Tooltips.
* [ ] Implementar `<BeforeAfterSlider />` (Nó 3).
* [ ] Implementar Lógica da `<ROICalculator />` (Nó 4) com sliders do HeroUI.

**Fase 3: Polish & Assets**

* [ ] Criar/Inserir os assets visuais (Vídeos/Imagens de fundo para cada fase).
* [ ] Ajustar animações de entrada (Framer Motion) para o texto não brigar com a distorção do fundo.
* [ ] Deploy na Vercel e teste de performance.

---

```

```