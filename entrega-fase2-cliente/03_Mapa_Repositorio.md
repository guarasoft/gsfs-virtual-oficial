# Mapa do Repositório — GSFS Virtual

**Documento:** Estrutura de pastas (comentada) — para rastreabilidade e governança
**Data:** 11/06/2026

> Este mapa descreve **a organização** do repositório (nomes de pastas e arquivos e seu
> propósito). Não inclui o conteúdo do código-fonte, que integra a entrega final. É a
> "planta" do projeto: mostra onde cada coisa mora, sem entregar a chave.

---

## Visão geral (raiz)

```
GSFS-Virtual/
├── discovery/          Documentos normativos e entregáveis das fases (Markdown)
├── brand-assets/       Identidade de marca: tokens, logos, fontes, guidelines
├── app/                Protótipo navegável (React + Vite + TypeScript) — wireframes + UI Kit
├── docs/               Documentação interna de processo (specs/planos)
├── .gitattributes      Normalização de fim de linha (EOL)
└── .gitignore          Exclusões de versionamento (ex.: node_modules, build)
```

---

## `brand-assets/` — Identidade e design tokens

```
brand-assets/
├── tokens/
│   ├── tokens.json         Fonte única dos tokens (cores, tipografia, espaçamento, raios)
│   ├── colors.css          Cores como custom properties CSS
│   ├── colors.scss         Cores como variáveis SCSS
│   └── typography.css      @font-face + papéis tipográficos
├── fonts/                  Fontes self-hosted (.woff2)
│   ├── exo-2-v26-latin/         Exo 2 (400/500/600/700/800)
│   ├── inter-v20-latin/         Inter (400/500/600/700)
│   └── jetbrains-mono-v24-latin/ JetBrains Mono (400/500)
├── logos/
│   ├── horizontal/         Lockup horizontal oficial (RGB / mono branco / mono preto)
│   ├── icon/               Símbolo isolado oficial (RGB / mono branco / mono preto) — D-018
│   ├── source/             Arquivos de origem (PNG/SVG)
│   └── favicon/            Favicon multi-resolução + apple-touch-icon
├── reference/              Imagens de apoio da linguagem visual
└── guidelines/
    └── Identidade_Visual_GSFS_Virtual.md   Identidade (cliente) + Design System (Result)
```

---

## `app/` — Protótipo (wireframes + UI Kit)

```
app/
├── src/
│   ├── ui/                      ★ BIBLIOTECA DE COMPONENTES (Fase 2)
│   │   ├── index.ts                  Barril de exportação (23 componentes)
│   │   ├── primitives/               15 componentes base (Button, Input, Select,
│   │   │                             Field, Toggle, Badge, Chip, Card, Panel, Table,
│   │   │                             Tabs, Progress, Tooltip, Textarea, EdgeTab)
│   │   └── sim/                      8 componentes de simulador/HUD (DetectionBadge,
│   │                                 ConfidenceMeter, BatteryGauge, TempGauge,
│   │                                 SensorPanel, RtkStatus, HudMetric, StatusBar)
│   ├── pages/
│   │   ├── Hub.tsx                    Portal de review (vestido com a marca)
│   │   ├── uikit/                ★ ROTA /ui-kit (galeria de design system)
│   │   │   ├── UiKitLayout.tsx        Shell master/detail
│   │   │   ├── Sidebar.tsx            Menu lateral de navegação
│   │   │   ├── docs-kit.tsx           Helpers de apresentação
│   │   │   └── sections/             Uma seção por item: Cores, Tipografia, Logo,
│   │   │                             Espacamento, Iconografia, ButtonDoc, FieldsDoc,
│   │   │                             BadgeDoc, DataDoc, DetectionDoc, GaugesDoc,
│   │   │                             SensorDoc
│   │   ├── wireframe/                 Wireframes das 7 etapas (E1…E7) — Fase 1
│   │   │   └── E1Boot … E7Replay
│   │   └── Prototype.tsx              Rota /prototype (alvo da Fase 3)
│   ├── components/                    ReviewBar, ScanView, WfScreen
│   ├── styles/                        brand.css, global.css, wireframe.css
│   ├── App.tsx                        Rotas (Hub + /ui-kit + /wireframe + /prototype)
│   └── main.tsx                       Bootstrap React
├── public/                            Estáticos
├── index.html                         Entrada Vite
├── package.json                       Dependências e scripts (dev/build/preview)
├── vite.config.ts                     Configuração do bundler
└── tsconfig*.json                     Configuração TypeScript
```

★ = entregáveis centrais da Fase 2.

---

## `discovery/` — Documentos das fases

```
discovery/
├── PRD_GSFS_Virtual_v0.3.md              Requisitos de produto
├── Cronograma_GSFS_Virtual.md            Cronograma de fases
├── Status_GSFS_Virtual.md                Radar/dashboard do projeto (vivo)
├── Decisoes_GSFS_Virtual.md              Decision log central (D-001…D-018)
├── Matriz_Cenarios_GSFS_Virtual.md       Fase 0 — 5 cenários
├── Roteiro_Tecnico_GSFS_Virtual.md       Fase 0 — momentos de detecção
├── Teto_Metricas_GSFS_Virtual.md         Fase 0 — política de métricas
├── Layout_Exportacao_GSFS_Virtual.md     Fase 0 — layout do PDF exportado
├── Stack_Tecnica_GSFS_Virtual.md         Fase 0 — stack/fallback técnico
├── Fechamento_Fase0_GSFS_Virtual.md      Marco de saída da Fase 0
└── Arquitetura_Informacao_Fase1_*.md     Marco da Fase 1 (IA, fluxos, wireframes)
```

---

*Estrutura organizada por separação de responsabilidades: documentação (`discovery/`),
identidade (`brand-assets/`) e implementação (`app/`). A biblioteca `app/src/ui/` e a rota
`app/src/pages/uikit/` são o coração da Fase 2.*
