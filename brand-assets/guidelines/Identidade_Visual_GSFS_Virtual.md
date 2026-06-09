# Identidade Visual — GSFS Virtual

**Projeto:** GSFS Virtual — Simulador Técnico-Institucional
**Documento:** Identidade de marca (referência do cliente) + tradução para Design System (Result)
**Versão:** 0.8 (logo único lockup horizontal validado; CL-01 resolvido — identidade 100% validada — D-012)
**Data:** 02/06/2026
**Responsável Técnico:** Jonathan — Result
**Fonte da identidade:** GSFS Visual Identity System **v1.0 — Maio/2025** (cliente)
**Referências normativas:** PRD GSFS Virtual v0.3 (seções 2.4.6, 8.1); Roteiro Técnico v0.1; Teto de Métricas v0.1

---

## 1. Objetivo e estrutura do documento

Resolver o **Ponto em Aberto nº 5 do PRD v0.3** consolidando a identidade do GSFS. O cliente entregou um **sistema de identidade de marca (v1.0)** — que é uma **referência de marca**, não um design system de implementação. Este documento, portanto, tem duas partes:

- **Parte A — Identidade de Marca (cliente):** registro fiel do que o cliente definiu. É referência; não inventamos nada aqui.
- **Parte B — Tradução para Design System (Result):** a camada de engenharia que transforma a referência em tokens implementáveis (escalas, papéis semânticos, cores de status, curadoria de logos). É proposta Result ([D-010](../../discovery/Decisoes_GSFS_Virtual.md)).

---

# PARTE A — Identidade de Marca (referência do cliente, v1.0)

## A.1. Conceito da marca

> *"GSFS unifies advanced ground scanning technologies into a single, intelligent platform. By fusing multi-sensor data, it reveals what lies beneath — delivering precise insights for safer decisions, smarter design, and a more resilient world."*

**Taglines oficiais:**
- "ENGINEERED INSIGHT. REVEAL. ANALYZE. ADVANCE."
- "SUBSURFACE INTELLIGENCE. SURFACE IMPACT."

**Quatro facetas do conceito:** Fusion (integração de sensores), Precision (precisão de engenharia), Reliability (provado em campo), Progress (decisões melhores para um futuro mais resiliente).

## A.2. Pilares de marca

| Pilar | Cor de destaque | Definição |
|---|---|---|
| **Accurate** | Technical Cyan | Dados multissensor de alta resolução para decisões confiáveis. |
| **Reliable** | Controlled Green | Sistemas robustos para ambientes exigentes. |
| **Integrated** | Technical Cyan | Fusão de tecnologias em inteligência acionável. |
| **Innovative** | Technical Cyan | Avanço contínuo da ciência de subsolo. |
| **Impactful** | Technical Cyan | Resolver desafios reais com resultados mensuráveis. |

## A.3. Logo oficial e variações

O logo combina: símbolo (cubo isométrico em camadas — topo branco, bandas teal/ciano, acentos verdes — atravessado por um eixo vertical de varredura terminando em seta) + wordmark "GSFS" em Exo 2 + tagline "GROUND SCANNING FUSION SYSTEM".

**Lockups previstos pelo sistema v1.0 (referência do cliente):**
1. **Horizontal (primário)** — símbolo à esquerda + wordmark + tagline.
2. **Vertical empilhado** — símbolo acima, wordmark + tagline abaixo.
3. **Ícone (símbolo)** — cubo isolado.

> **Em uso no projeto (D-012, 02/06):** apenas o **lockup horizontal** foi efetivamente entregue e validado pelo cliente (RGB + mono branco + mono preto). Os lockups vertical e ícone **não existem por ora** e foram retirados do repositório. Ver B.5.

## A.4. Paleta oficial

| Nome | Hex |
|---|---|
| Deep Navy | `#0A1324` |
| Deep Blue | `#0D1F3A` |
| Steel Blue | `#1E3A5F` |
| Technical Cyan | `#00B6C8` |
| Controlled Green | `#7ED321` |
| Light Gray | `#E6EAF0` |
| White | `#FFFFFF` |

**Gradiente de marca (oficial):** barra navy → steel → cyan → green, presente na palette bar do sistema v1.0.

## A.5. Tipografia

- **Primária — Exo 2** (hierarquia editorial/marca):

| Papel | Peso | Tam/Entrelinha |
|---|---|---|
| H1 / Headline | ExtraBold (800) | 48/56 |
| H2 / Subhead | Bold (700) | 28/36 |
| H3 / Section | SemiBold (600) | 18/24 |
| Body / Copy | Regular (400) | 14/22 |
| Caps / Label | Medium (500) | 12/16 |

- **Secundária — Inter:** "Used for UI, captions, and data interfaces." É a fonte da camada funcional (HUD, painéis, tabelas, leituras de dados).

## A.6. Linguagem visual

Cinco motivos visuais oficiais:

| Motivo | Significado |
|---|---|
| **Topographic Lines** | Terreno, profundidade e precisão. |
| **Data Fusion Grids** | Dados em camadas. Inteligência unificada. |
| **Technical HUD Elements** | Precisão, varredura e medição. |
| **Data Visualization** | Transformar dados complexos em insights claros. |
| **Depth & Discovery** | Revelar o que está sob a superfície. |

Acompanha um conjunto de ícones de linha (alvo/crosshair, camadas, escudo, forma de onda, grafo de nós, cubo 3D, régua, gráfico de barras, globo, pin de localização).

> As imagens de apoio destes motivos estão salvas em [`reference/`](../reference/): `Topographic_Lines_01`, `Data_Fusion_Grids_01`, `Technical_HUD_Elements_01`, `Data_Visualization_01`, `Depth_Discovery_01`.

## A.7. Aplicações de exemplo (do sistema v1.0)

Capa de relatório, interface de software (visualização 3D de subsolo em tablet), aplicação de campo (capacete com ícone), cartão de visita. **Diretamente úteis** ao GSFS Virtual: a interface de software e a capa de relatório são referência visual direta para as telas do simulador e o PDF de exportação.

---

# PARTE B — Tradução para Design System (Result)

## B.1. Diagnóstico: referência de marca → camada de engenharia

A identidade v1.0 é excelente como **referência**, mas para **implementar** o simulador era preciso uma camada de engenharia. Estado atual dessa camada:

| Item | Cliente entregou (referência) | Camada Result | Status |
|---|---|---|---|
| Cores | 7 cores + gradiente | Escalas tonais (50→900), papéis semânticos, **cores de status (âmbar/vermelho)** | ✅ Implementado (B.2) — status colors aprovadas pelo cliente em 28/05 (ID-V1) |
| Tipografia | Exo 2 + Inter, hierarquia | Tokens/classes implementáveis + mono para hash | ✅ Implementado (B.3) |
| Estados de UI | — | Tokens de hover/active/disabled/foco, inputs, botões | ✅ Implementado (B.4) |
| Acessibilidade | — | Contraste WCAG medido + anel de foco | ✅ Implementado (B.2 / B.4) |
| Logo | 1 lockup horizontal (cores/mono), validado | Pasta canônica + favicons | ✅ Resolvido (B.5) — **CL-01 atendido** (alta-res/vetor entregue); vertical e ícone descartados (D-012) |

> **Cores de status** eram a maior lacuna funcional: o sistema do cliente só tem verde. O Cenário 4 (suspeita/descartado) e o Teto de Métricas (crítico) exigem **âmbar e vermelho** — implementados na seção B.2 e **aprovados pelo cliente em 28/05 (ID-V1)**.

## B.2. Sistema de cor

Arquivos canônicos: [`tokens/colors.css`](../tokens/colors.css), [`colors.scss`](../tokens/colors.scss), [`tokens.json`](../tokens/tokens.json).

- **Primitivas:** as 7 cores do cliente, preservadas, + escalas tonais 50→900 para cada matiz.
- **Status (proposta Result):** Sucesso `#7ED321` (verde do cliente) · **Alerta `#F5A623` (âmbar novo)** · **Erro `#E5484D` (vermelho novo)** · Info `#00B6C8`.
- **Semânticas:** papéis (`--color-bg`, `--color-text`, `--color-primary`, `--color-border`...). O código usa papéis, nunca hex direto.
- **Simulador:** tokens 1:1 com Roteiro/Teto (`--sim-state-confirmed/suspect/discarded`, confiança, bateria, RTK, sensores, gradiente EMI).
- **Gradiente de marca:** `--gradient-brand` (navy→cyan→green), fiel à palette bar do cliente.

### Acessibilidade (contraste WCAG, medido sobre `#0A1324`)

| Cor | Contraste | WCAG |
|---|---|---|
| Light Gray (texto) | 15,37:1 | AAA ✅ |
| Technical Cyan | 7,53:1 | AAA ✅ |
| Controlled Green | 9,92:1 | AAA ✅ |
| Âmbar `#F5A623` | 9,16:1 | AAA ✅ |
| Vermelho `#E5484D` | 4,74:1 | AA ✅ (limítrofe — usar `--red-400` para texto longo) |

## B.3. Tipografia implementável

Arquivo canônico: [`tokens/typography.css`](../tokens/typography.css). Mapeamento dos papéis do cliente para classes:

| Camada | Fonte | Classes | Uso |
|---|---|---|---|
| Marca / títulos | **Exo 2** | `.gsfs-h1/h2/h3`, `.gsfs-caps`, `.gsfs-body` | Títulos de tela, copy editorial, capa do relatório |
| Funcional / dados | **Inter** | `.gsfs-ui`, `.gsfs-ui-label`, `.gsfs-metric` | HUD, painéis de sensor, tabelas, métricas (tabular-nums) |
| Strings mono (Result) | **JetBrains Mono** | `.gsfs-data` | Hash hex (64 chars), coordenadas em coluna |

> No simulador (uma "data interface"), a regra prática é: **Exo 2 para títulos e identidade; Inter para tudo que é leitura funcional de dados**. Decisão alinhada à definição do cliente ("Inter for UI, captions, and data interfaces").

**Body a 14px:** mantido conforme spec do cliente (decisão do projeto). Para projeção em telão, avaliar modo de escala na Fase 5 sem alterar a hierarquia.

## B.4. Estados interativos e acessibilidade

Tokens em [`colors.css`](../tokens/colors.css) (seção 4) e [`tokens.json`](../tokens/tokens.json) (`color.state`). Cobrem todos os estados de componente exigidos por uma UI funcional.

### Estados por componente

| Componente | Default | Hover | Active | Disabled | Foco |
|---|---|---|---|---|---|
| **Botão primário** | `--btn-primary-bg` (ciano) | `--btn-primary-bg-hover` (ciano-400) | `--btn-primary-bg-active` (ciano-600) | `--btn-primary-bg-disabled` + texto `--btn-primary-fg-disabled` | anel `--focus-ring-*` |
| **Botão secundário** | contorno `--btn-secondary-border` | fundo `--btn-secondary-bg-hover` | — | opacidade `--state-disabled-opacity` | anel `--focus-ring-*` |
| **Botão fantasma/texto** | texto `--btn-ghost-fg` | `--btn-ghost-bg-hover` | — | opacidade | anel |
| **Botão de perigo** | `--btn-danger-bg` (vermelho) | (escurece) | — | opacidade | anel |
| **Input** | `--input-bg` + borda `--input-border` | `--input-border-hover` | — | `--input-bg-disabled` | borda `--input-border-focus` |
| **Input com erro** | borda `--input-border-error` | — | — | — | anel |

### Sobreposições genéricas e foco

- `--state-hover-overlay` / `--state-active-overlay` / `--state-selected-overlay` para qualquer alvo clicável (cards, linhas de tabela, itens de lista).
- `--state-disabled-opacity: 0.4`.
- **Anel de foco visível** (`--focus-ring-color/width/offset`) — atende **WCAG 2.4.7 (Focus Visible)**. Obrigatório em todo elemento focável para navegação por teclado.

### Acessibilidade (resumo)

- Contraste de cor medido e documentado em **B.2** (texto AAA; status colors AA+).
- Foco visível garantido pelos tokens de anel.
- Numerais tabulares (`.gsfs-metric`) evitam reflow de leitura em métricas dinâmicas.

> **Proposta Result** — estados e acessibilidade não constavam no sistema v1.0 do cliente; foram derivados da paleta e da hierarquia oficiais. Aprovados pelo cliente em 28/05 (ID-V3 inclui o tema escuro; estados seguem a paleta aprovada).

## B.5. Logo oficial em uso

**Decisão [D-012] (02/06):** o cliente validou as logos efetivamente entregues. Na prática **existe um único lockup — o horizontal** — em três tratamentos. A matriz 3×3 antes proposta por [D-010]/ID-V5 (horizontal + vertical + ícone) **não corresponde ao material real** e foi descartada.

### Conjunto oficial (3 ativos)

| Lockup | Cor cheia (fundo escuro) | Branco mono (fundo escuro) | Preto mono (fundo claro) |
|---|---|---|---|
| **Horizontal (único oficial)** | ✅ `..._RGB` | ✅ `..._Mono_White` | ✅ `..._Mono_Black` |

### Descartado / inexistente

- **Lockup vertical empilhado** — não entregue; pasta `logos/vertical/` **removida**.
- **Lockup ícone (símbolo isolado)** — não entregue; pasta `logos/icon/` **removida**.
- Variações soltas com artefato ("ACKED/ACKBD", grunge, distorção, baixa-res) — nunca foram ativos.

> Se no futuro houver necessidade de marca em formato quadrado/empilhado (selo, watermark de vídeo, etc.), o lockup correspondente terá de ser solicitado ao cliente — não existe hoje.

### Estado atual em disco

- **Lockup horizontal validado** ✅ — RGB + Mono_White + Mono_Black em `logos/horizontal/`, em **SVG vetor real** (CorelDRAW 2021; `viewBox` em unidades, escalável; sem raster embutido). **CL-01 atendido**: são os arquivos definitivos — ver B.8. *(Não há mais PNGs; exports raster podem ser gerados sob demanda a partir do SVG, se necessário.)*
- `logos/favicon/`: 7 tamanhos gerados (16→256px) — **mantidos** como ativo funcional do app web (ícone de aba do navegador), derivados do símbolo do logo.
- `logos/source/`: originais do cliente, mantidos como arquivo de proveniência.

## B.6. Estrutura de pastas (`brand-assets/`)

```
brand-assets/
├── logos/
│   ├── source/        # Originais do cliente, intocados
│   ├── horizontal/    # Único lockup oficial — RGB + Mono_White + Mono_Black ✅
│   └── favicon/       # 16→256px (gerados) ✅
├── tokens/
│   ├── colors.css / colors.scss   # cores (primitivas, semânticas, simulador, estados, gradiente)
│   ├── typography.css             # Exo 2 + Inter + mono
│   └── tokens.json                # fonte única
├── fonts/             # .woff2 self-hosted ✅ (exo-2-v26-latin/, inter-v20-latin/, jetbrains-mono-v24-latin/)
├── reference/         # Imagens de apoio da linguagem visual ✅ (5 motivos salvos)
└── guidelines/        # Este documento + o sistema v1.0 do cliente
```

**Convenção de nome** (tratamento no sufixo): `GSFS_Logo_<Lockup>_<Treatment>.<ext>`. Nomes reais em disco:
- Horizontal (único): `GSFS_Logo_Primary_Horizontal_RGB.svg` · `_Mono_White.svg` · `_Mono_Black.svg` (SVG vetor)

**Princípio:** `brand-assets/` é a fonte única da identidade; na Fase 3 o `tailwind.config` importa `tokens/tokens.json`.

## B.7. Cobertura cruzada com o PRD e o simulador

| Requisito | Atendimento |
|---|---|
| PRD 8.1 — UI industrial/ruggedized | Tema escuro + Exo 2/Inter + acento ciano/verde |
| PRD 2.4.6 — Identidade própria | Sistema do cliente, original; nenhuma cópia comercial |
| Linguagem visual (A.6) | Motivos topográfico/HUD/fusão alimentam os fundos das telas do simulador |
| Aplicação "software interface" (A.7) | Referência direta para as telas de varredura |
| Roteiro C4 — suspeita/descartado/confirmado | Tokens `--sim-state-*` |
| Teto de Métricas — faixas/crítico | Status + confiança |

## B.8. Pendências

### Concluído
- [x] **Cores de status** (âmbar/vermelho), escalas tonais, papéis semânticos — implementados e **aprovados pelo cliente em 28/05 (ID-V1)**.
- [x] **Estados interativos** (hover/active/disabled/foco, botões, inputs) — implementados.
- [x] **Acessibilidade** — contraste WCAG medido + anel de foco.
- [x] **Tipografia** — tokens/classes Exo 2 + Inter + mono.
- [x] **Logo oficial** — lockup horizontal validado pelo cliente (RGB/mono-branco/mono-preto); vertical e ícone descartados (D-012). Matriz 3×3 antiga superada.
- [x] **Favicons** — 7 tamanhos gerados (16→256px).
- [x] **Imagens de apoio** — 5 motivos salvos em `reference/`.
- [x] **Gradiente de marca** — token implementado.
- [x] **Logos mono** (PR-07) — branco/preto dos 3 lockups salvos, padronizados em pasta por-lockup e validados.
- [x] **Fontes self-hosted** (PR-04) — 11 `.woff2` (Exo 2, Inter, JetBrains Mono) em `fonts/` e ligados via `@font-face` no `typography.css`.
- [x] **Limpeza de fontes** (PR-08) — removidos os 41 `.woff2` não utilizados; restam só os 11 em uso.
- [x] **`favicon.ico` + `apple-touch-icon`** (PR-05) — ICO multi-res (16/32/48/64/256) + apple-touch 180×180 em `logos/favicon/`.

### Pendência do cliente
- [x] **CL-01:** ✅ **Resolvido em 02/06** — o cliente entregou os logos definitivos (alta-res/vetor) do lockup horizontal, validados. Não há mais pendência de insumo do cliente na identidade (D-012).

### Tarefa Result (a fazer)
- Nenhuma. Todas as tarefas Result da identidade estão concluídas e a identidade está **100% validada**.

### Validações com o cliente — ✅ todas aprovadas (ID-V1…ID-V5)
- [x] **ID-V1:** Aprovação das **cores de status** (âmbar `#F5A623`, vermelho `#E5484D`) — única lacuna da paleta, já implementada.
- [x] **ID-V2:** Aprovação da **mono complementar** (JetBrains Mono) para hash/coordenadas — Exo 2 e Inter já são oficiais.
- [x] **ID-V3:** Confirmação do **tema escuro** como padrão e dos **estados interativos** derivados da paleta.
- [x] **ID-V4:** ✅ **Atendido em 02/06** — CL-01 resolvido (logos definitivos em alta-res/vetor entregues).
- [x] **ID-V5:** Curadoria de logos — **revista por [D-012]**: passou de matriz 3×3 para **único lockup horizontal** validado; vertical e ícone descartados.

---

*Sistema de identidade **100% validado e sem pendências** (ID-V1…ID-V5; CL-01 resolvido em 02/06 — D-012). Único lockup oficial: horizontal (cores/mono). Referência normativa para o UI Kit (Fase 2) e a implementação das telas (Fase 3).*
