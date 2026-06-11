# Catálogo do UI Kit — GSFS Virtual (Fase 2)

**Documento:** Inventário estruturado de tokens e componentes
**Data:** 11/06/2026
**Fonte dos tokens:** `brand-assets/tokens/tokens.json` (fonte única) — as 7 cores de marca
foram entregues pelo cliente; escalas e tokens semânticos são tradução Result validada.

> As capturas da rota `/ui-kit` renderizada estão na pasta `screenshots/` deste pacote.

---

## 1. Estrutura dos tokens

Tokens organizados em camadas (marca → escala → semântico → simulador), em
`brand-assets/tokens/` nos formatos **`tokens.json`** (fonte única), **`colors.css`**,
**`colors.scss`** e **`typography.css`**.

### 1.1. Cores de marca (entregues pelo cliente)

| Token | Hex |
|---|---|
| deepNavy | `#0A1324` |
| deepBlue | `#0D1F3A` |
| steelBlue | `#1E3A5F` |
| technicalCyan | `#00B6C8` |
| controlledGreen | `#7ED321` |
| lightGray | `#E6EAF0` |
| white | `#FFFFFF` |

**Gradiente oficial (palette bar v1.0):** navy → cyan → green
(`linear-gradient(90deg, #0A1324, #1E3A5F, #00B6C8, #7ED321)`).

### 1.2. Escalas

Escalas completas (50–950) derivadas para `navy`, `cyan`, `green`, `amber`, `red` e
`neutral` — base para superfícies, bordas, textos e estados.

### 1.3. Tokens semânticos (tema escuro, padrão)

| Papel | Valor |
|---|---|
| `bg` / `bgSurface` / `bgRaised` | navy 950 / 900 / 800 |
| `text` / `textStrong` / `textMuted` | neutral 100 / 0 / 400 |
| `primary` / `primaryHover` / `primaryActive` | cyan 500 / 400 / 600 |
| `accent` / `success` | green 500 |
| `warning` | amber 500 (`#F5A623`) |
| `danger` | red 500 (`#E5484D`) |
| `focusRing` | cyan 400 |

### 1.4. Tokens de simulador (HUD)

Conjunto dedicado para estados de detecção (`confirmed`/`suspect`/`discarded`), níveis de
confiança, bateria, temperatura, sensores (GPR/EMI/IMU/GNSS), RTK (fix/float/nofix) e o
mapa de calor de EMI.

### 1.5. Tipografia

| Família | Uso | Pesos (self-hosted .woff2) |
|---|---|---|
| **Exo 2** (primária) | Hierarquia editorial / marca | 400, 500, 600, 700, 800 |
| **Inter** (secundária) | Interface, captions, dados | 400, 500, 600, 700 |
| **JetBrains Mono** | Hash hex / coordenadas (complemento Result) | 400, 500 |

Papéis tipográficos definidos: `h1` (48/56 ExtraBold) … `body`, `caps`, `ui`, `uiLabel`,
`metric` (tabular), `data` (mono).

### 1.6. Espaçamento, raios e elevação

- **Spacing:** 4 / 8 / 12 / 16 / 24 / 32 / 48 px
- **Radius:** sm 4px · md 8px · lg 12px · pill 999px

### 1.7. Logo e iconografia

- **Logo:** lockup horizontal único (RGB / mono branco / mono preto) — `logos/horizontal/`.
- **Símbolo isolado** oficial para usos compactos (RGB / mono branco / mono preto) —
  `logos/icon/` (recriado em vetor, D-018).
- **Favicon** multi-resolução gerado — `logos/favicon/`.
- **Iconografia:** biblioteca **Lucide** (linha, traço consistente).

---

## 2. Inventário de componentes (`app/src/ui/`)

**23 componentes** reutilizáveis, todos consumindo os tokens acima (sem valores
hard-coded). Exportados por `app/src/ui/index.ts`.

### 2.1. Base / primitivos (15)

| Componente | Função | Estados / variações |
|---|---|---|
| **Button** | Ação primária/secundária | primary, secondary, ghost, danger · hover/active/disabled/foco |
| **EdgeTab** | Abas laterais "Voltar" (esq.) / "Ações" (dir.) | lado esquerdo/direito · ativo/foco |
| **Field** | Wrapper de campo rotulado | rótulo associado, texto de ajuda, erro (texto+ícone) |
| **Input** | Entrada de texto | normal/hover/foco/erro/disabled |
| **Select** | Seleção acessível (custom) | aberto/fechado, navegação por teclado |
| **Textarea** | Texto multilinha | normal/foco/erro/disabled |
| **Toggle** | Interruptor on/off | ligado/desligado/foco/disabled |
| **Badge** | Etiqueta de status | neutral, info, success, warning, danger |
| **Chip** | Variante pill do Badge | mesmos tons, formato arredondado |
| **Card** | Superfície de conteúdo | — |
| **Panel** | Painel/contêiner de seção | — |
| **Table** | Tabela de dados | colunas tipadas |
| **Tabs** | Abas de navegação | item ativo/foco |
| **Progress** | Barra de progresso | determinada |
| **Tooltip** | Dica contextual | posicionável |

### 2.2. Simulador / HUD (8)

| Componente | Função |
|---|---|
| **DetectionBadge** | Estado de detecção (confirmado / suspeito / descartado) |
| **ConfidenceMeter** | Medidor de confiança (alto / médio / baixo) |
| **BatteryGauge** | Indicador de bateria (ok / atenção / crítico) |
| **TempGauge** | Indicador de temperatura (normal / elevada / crítica) |
| **SensorPanel** | Painel de sensores (GPR / EMI / IMU / GNSS) |
| **RtkStatus** | Status RTK (fix / float / nofix) |
| **HudMetric** | Métrica de HUD (numérica tabular) |
| **StatusBar** | Barra de status agregada |

---

## 3. Acessibilidade

- Campos com **rótulo associado** (`label`/`for`), mensagens de **erro em texto + ícone**
  (não só cor) e **anel de foco visível** (cyan 400, 2px).
- Tema escuro como padrão; contrastes seguindo as metas WCAG para texto e estados.

---

*Catálogo fiel aos tokens validados em `brand-assets/` e à biblioteca em `app/src/ui/`.
As capturas em `screenshots/` mostram cada seção da rota `/ui-kit` renderizada.*
