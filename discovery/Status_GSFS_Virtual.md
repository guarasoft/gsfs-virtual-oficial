# Status do Projeto — GSFS Virtual

**Projeto:** GSFS Virtual — Simulador Técnico-Institucional
**Documento:** Radar/dashboard do projeto (documento vivo)
**Última atualização:** 2026-06-09
**Responsável Técnico:** Jonathan — Result

---

## ⚡ Onde estamos agora

| Campo | Valor |
|---|---|
| **Fase atual** | **Fase 2 — Design visual e UI Kit.** UI Kit **entregue e aprovado internamente (09/06)**; 🟡 **aguardando validação do cliente** para fechar a fase |
| **Saúde da fase** | 🟢 Verde |
| **Próximo marco** | **Validação do cliente sobre o UI Kit.** Após o aval: iniciar a Fase 3 (vestir os wireframes em alta fidelidade, `/ui-kit` → `/prototype`), incorporando [D-017] (replay E7) e as 4 notas de continuidade |
| **Próxima fase** | Fase 3 — Telas em alta fidelidade (código) |
| **Bloqueios ativos** | **Nenhum.** Aguardando apenas o retorno do cliente sobre o UI Kit (não bloqueia trabalho interno de preparação da Fase 3). [D-017] e as 4 notas (identidade, C5 premium, Teto, exportação simbólica) serão incorporados ao vestir os wireframes na Fase 3. |

---

## 📋 Status de cada fase (referência: Cronograma)

| Fase | Duração prevista | Status | Início | Fim |
|---|---|---|---|---|
| **Fase 0** — Cenários e desbloqueio de pendências | 3 dias | ✅ Concluída | 2026-05-26 | 2026-06-02 |
| Fase 1 — Arquitetura de informação e fluxos | 1 semana | ✅ Concluída (aprovada pelo cliente em 05/06) | 2026-06-02 | 2026-06-05 |
| Fase 2 — Design visual e UI Kit | 1 semana | 🟡 UI Kit entregue (09/06) — aguardando validação do cliente | 2026-06-05 | — |
| Fase 3 — Telas em alta fidelidade (código) | 3 semanas | ⚪ Não iniciada | — | — |
| Fase 4 — Integração das peças 3D | 1 semana | ⚪ Não iniciada | — | — |
| Fase 5 — Testes e polimento | 1 semana | ⚪ Não iniciada | — | — |

Legenda: ⚪ Não iniciada · 🟡 Em andamento · ✅ Concluída · 🔴 Bloqueada

---

## 🎯 Fase 0 — detalhamento dos 7 itens

Conforme cronograma + item 7 derivado da decisão de stack ([D-001](Decisoes_GSFS_Virtual.md#d-001--acionar-o-fallback-tecnico-typescript-em-lugar-do-figma-make)).

| # | Pendência | Responsável | Status | Entregável |
|---|---|---|---|---|
| 1 | Matriz narrativa dos 5 cenários | Result | ✅ v0.2 — **aprovada integralmente** (V-01…V-05; C5 v0.2 validado em 02/06) | [Matriz_Cenarios_GSFS_Virtual.md](Matriz_Cenarios_GSFS_Virtual.md) |
| 2 | Produção dos ativos 3D (responsabilidade) | **Guarasoft (Daniel)** | ✅ Definido em 02/06 (D-013) — produtor definido; specs técnicas virão do cliente; Fase 1 não aguarda | Vídeos são insumo da Fase 4 |
| 3 | Identidade de marca (paleta, tipografia, logo) | Result + Cliente | ✅ **100% validada** (ID-V1…V5); **CL-01 resolvido em 02/06** (D-012) — logo único lockup horizontal | [Identidade_Visual_GSFS_Virtual.md](../brand-assets/guidelines/Identidade_Visual_GSFS_Virtual.md) + tokens |
| 4 | Teto de métricas | Result + cliente | ✅ **Validado pelo cliente em 28/05 (TM-V1…V5)** | [Teto_Metricas_GSFS_Virtual.md](Teto_Metricas_GSFS_Virtual.md) |
| 5 | Layout do arquivo exportado | Result | ✅ Concluído (decisão interna) | [Layout_Exportacao_GSFS_Virtual.md](Layout_Exportacao_GSFS_Virtual.md) |
| 6 | Roteiro técnico (momentos de detecção) | Result | ✅ v0.2 — **VR-01…VR-05 aprovados** (28/05 + C5 v0.2 em 02/06) | [Roteiro_Tecnico_GSFS_Virtual.md](Roteiro_Tecnico_GSFS_Virtual.md) |
| 7 | Formalizar fallback técnico (TypeScript + stack) | Result | ✅ Concluído — ciência ST-V1 dada em 28/05 | [Stack_Tecnica_GSFS_Virtual.md](Stack_Tecnica_GSFS_Virtual.md) |

**Progresso da Fase 0 — ✅ CONCLUÍDA em 02/06:** trabalho da Result concluído nos 7 itens e **todas as validações do cliente aprovadas** (Matriz V-01…V-05, Roteiro VR-01…VR-05 — incl. C5 v0.2 em 02/06 —, Teto TM-V1…V5, Identidade ID-V1…V5, ciência ST-V1). Pendências não-validação também resolvidas em 02/06: **acordo de produção 3D** (Guarasoft/Daniel, D-013) e **CL-01** (logos definitivos, D-012). A **Fase 1 está em andamento**; as specs técnicas dos vídeos virão do cliente mas não bloqueiam (insumo da Fase 4).

---

## ✅ Concluído (cronológico)

| Data | Entrega | Vínculo |
|---|---|---|
| 2026-05-26 | Decisão pelo fallback técnico (TypeScript) | [D-001](Decisoes_GSFS_Virtual.md#d-001--acionar-o-fallback-tecnico-typescript-em-lugar-do-figma-make) |
| 2026-05-26 | Stack adotada: React + Vite + TS + Tailwind + Zustand + R3F + Framer Motion | [D-002](Decisoes_GSFS_Virtual.md#d-002--adotar-stack-react--vite--tailwind--zustand--r3f--framer-motion) |
| 2026-05-26 | Matriz dos 5 cenários (proposta) | [D-003](Decisoes_GSFS_Virtual.md#d-003--matriz-narrativa-dos-5-cenarios-com-foco-em-mineracao--1-defesa-civil), [D-004](Decisoes_GSFS_Virtual.md#d-004--cenario-4-atende-ca-06-com-2-falsos-positivos--2-zonas-de-degradacao--1-confirmado) |
| 2026-05-26 | Roteiro técnico dos 5 cenários (proposta) | [D-005](Decisoes_GSFS_Virtual.md#d-005--duracao-dos-cenarios-90s-c1-c4-e-135s-c5), [D-006](Decisoes_GSFS_Virtual.md#d-006--estrutura-do-roteiro-3-micro-tempos-por-deteccao--arco-dos-4-sensores) |
| 2026-05-26 | Layout do arquivo exportado | [D-007](Decisoes_GSFS_Virtual.md#d-007--pdf-de-exportacao-em-a4-retrato-com-5-paginas), [D-008](Decisoes_GSFS_Virtual.md#d-008--gis-e-bim-como-pacotes-simbolicos-preview-only) |
| 2026-05-26 | Teto de métricas (preciso vs qualitativo + arredondamento + proibições) | [D-009](Decisoes_GSFS_Virtual.md#d-009--politica-de-metricas-preciso-vs-qualitativo--arredondamento--proibicoes) |
| 2026-05-26 | Documento de Decisões iniciado | [Decisoes_GSFS_Virtual.md](Decisoes_GSFS_Virtual.md) |
| 2026-05-26 | Documento de Status iniciado | (este) |
| 2026-05-26 | Identidade visual: diagnóstico + design system (cores, tipografia, tokens) + reorganização de `brand-assets/` | [D-010](Decisoes_GSFS_Virtual.md#d-010--identidade-visual-documentar-entregue--propor-design-system-completo-result) |
| 2026-05-26 | Recebido GSFS Visual Identity System v1.0 completo; guidelines reestruturado (Parte A cliente + Parte B Result); Inter restaurada, gradiente de marca, curadoria de logos 3×3 | [D-010](Decisoes_GSFS_Virtual.md#d-010--identidade-visual-documentar-entregue--propor-design-system-completo-result) |
| 2026-05-26 | Identidade v0.4: estados interativos (botões/inputs/foco) + acessibilidade implementados; imagens de apoio salvas em `reference/`; PR-01/02 reclassificados como pendência do cliente (CL-01/02) | [D-010](Decisoes_GSFS_Virtual.md#d-010--identidade-visual-documentar-entregue--propor-design-system-completo-result) |
| 2026-05-26 | Identidade v0.5: conjunto de logos 3×3 completo em disco (cor + mono branco/preto dos 3 lockups), padronizado por-lockup e validado; resta apenas alta-res/vetor (CL-01) | [D-010](Decisoes_GSFS_Virtual.md#d-010--identidade-visual-documentar-entregue--propor-design-system-completo-result) |
| 2026-05-26 | Identidade v0.6: fontes self-hosted (11 .woff2 — Exo 2/Inter/JetBrains Mono) ligadas via @font-face no typography.css (PR-04 ✅) | [D-010](Decisoes_GSFS_Virtual.md#d-010--identidade-visual-documentar-entregue--propor-design-system-completo-result) |
| 2026-05-26 | Identidade v0.7: fontes limpas (PR-08 ✅); favicon.ico multi-res + apple-touch-icon (PR-05 ✅). Tarefas Result da identidade concluídas — resta só CL-01 (cliente) e validações | [D-010](Decisoes_GSFS_Virtual.md#d-010--identidade-visual-documentar-entregue--propor-design-system-completo-result) |
| 2026-05-26 | **Documento de fechamento da Fase 0** consolidando entregáveis, decisões e validações pendentes (com destaque para Teto de Métricas) | [Fechamento_Fase0_GSFS_Virtual.md](Fechamento_Fase0_GSFS_Virtual.md) |
| 2026-05-26 | Fechamento da Fase 0 v0.3: ajustada a redação para refletir que a Fase 1 inicia após o fechamento da Fase 0 (sequência já tácita); removidas menções a paralelismo e ao nome do parceiro nas pendências de 3D | [Fechamento_Fase0_GSFS_Virtual.md](Fechamento_Fase0_GSFS_Virtual.md) |
| 2026-05-27 | **Pacote de fechamento da Fase 0 enviado ao cliente** (entregáveis .docx + carta de capa). Projeto aguardando retorno das validações (V/VR/TM/ID) e do acordo de 3D | [Fechamento_Fase0_GSFS_Virtual.md](Fechamento_Fase0_GSFS_Virtual.md) |
| 2026-05-28 | **Retorno do cliente:** validou **todos os itens necessários** — Matriz (V-01…V-05), Roteiro (VR-01…VR-04), **Teto de Métricas (TM-V1…V5)**, Identidade (ID-V1/V2/V3/V5) e ciência do Stack (ST-V1). Única ressalva: o Cenário 5 deveria ser mais *showcase* institucional → reformulado em v0.2 (D-011). CL-01 (logos) em andamento pelo cliente | [D-011](Decisoes_GSFS_Virtual.md#d-011--cenario-5-reforcado-como-showcase-institucional-gsfs-feedback-do-cliente) |
| 2026-05-29 | Documentação propagada para refletir as validações de 28/05 (Decisões D-003/004/005/009/010 → Active; Teto v1.0; Identidade ID-V1/V2/V3/V5; Fechamento v0.4). **Única pendência de validação:** aval final do C5 v0.2 (VR-05), esperado hoje | [Fechamento_Fase0_GSFS_Virtual.md](Fechamento_Fase0_GSFS_Virtual.md) |
| 2026-06-02 | **Logos validadas pelo cliente** — único lockup horizontal (cores/mono); CL-01 resolvido; pastas `vertical/` e `icon/` removidas; identidade 100% validada | [D-012](Decisoes_GSFS_Virtual.md#d-012--logo-unico-lockup-horizontal-validado-cl-01-resolvido-vertical-e-icone-descartados) |
| 2026-06-02 | **Produção dos vídeos 3D definida** — Guarasoft (Daniel); cliente enviará as specs técnicas; Fase 1 não aguarda esse envio | [D-013](Decisoes_GSFS_Virtual.md#d-013--producao-dos-videos-3d-pela-guarasoft-daniel-fase-1-nao-aguarda-as-specs) |
| 2026-06-02 | **VR-05 validado pelo cliente** (Cenário 5 v0.2) → **Fase 0 CONCLUÍDA**; todas as validações aprovadas. Início da Fase 1 | [Matriz](Matriz_Cenarios_GSFS_Virtual.md) · [Roteiro](Roteiro_Tecnico_GSFS_Virtual.md) · [Fechamento](Fechamento_Fase0_GSFS_Virtual.md) |
| 2026-06-02 | Logos definitivos em **SVG vetor** (CorelDRAW) recebidos e padronizados na convenção (`GSFS_Logo_Primary_Horizontal_RGB/_Mono_White/_Mono_Black.svg`) | [D-012](Decisoes_GSFS_Virtual.md#d-012--logo-unico-lockup-horizontal-validado-cl-01-resolvido-vertical-e-icone-descartados) |
| 2026-06-02 | **Fase 1 em código (D-014):** app `app/` (React+Vite+TS+Router) — Hub + rotas wireframe/ui-kit/prototype; **E1 (Boot/Autoteste)** portada em modo wireframe (splash + diagnóstico/telemetria), referência tablet 1280×800 | [D-014](Decisoes_GSFS_Virtual.md#d-014--prototipar-a-fase-1-em-codigo-portal-de-review-em-vez-de-wireframes-no-figma) |
| 2026-06-03 | **Fase 1 concluída (interno):** wireframes das **7 etapas** (E1…E7) no protótipo `app/`, revisados e aprovados internamente. **Documento de Arquitetura de Informação da Fase 1** escrito. Decisões [D-015] (abortar/reiniciar) e [D-016] (jornada 7 etapas) registradas | [Arquitetura_Informacao_Fase1_GSFS_Virtual.md](Arquitetura_Informacao_Fase1_GSFS_Virtual.md) |
| 2026-06-05 | **Fase 1 APROVADA pelo cliente** ("aprovada para continuidade"). [D-015] (abortar/reiniciar) validado; cliente reforçou confirmação antes de encerrar/reiniciar. Nova **[D-017]** — replay (E7) com dados da missão (timeline, cenário, sensores, timestamps, detecções, falsos positivos, GSFS_RECORD/hash). 4 notas de continuidade registradas para a Fase 2 | [D-017](Decisoes_GSFS_Virtual.md#d-017--replay-enriquecido-com-dados-da-missao-feedback-do-cliente) · [Arquitetura_Informacao_Fase1_GSFS_Virtual.md](Arquitetura_Informacao_Fase1_GSFS_Virtual.md) |
| 2026-06-09 | **UI Kit da Fase 2 entregue (interno).** Página `/ui-kit` como galeria de design system (menu lateral + detalhe, rotas próprias por item) consumindo os tokens validados de `brand-assets/` (sem duplicação). **Biblioteca de 20 componentes reais** em `app/src/ui/`: 12 base (Button, Field, Input, Select acessível, Textarea, Toggle, Badge, Chip, Card, Panel, Table, Tabs, Progress, Tooltip) + 8 de simulador (DetectionBadge, ConfidenceMeter, BatteryGauge, TempGauge, SensorPanel, RtkStatus, HudMetric, StatusBar). Fundamentos documentados (cores, tipografia, logo, espaçamento, iconografia Lucide). Hub vestido com a marca; acessibilidade dos campos (rótulos, erro texto+ícone, foco) atendendo WCAG. **Aprovado internamente; aguardando validação do cliente.** | [Status](Status_GSFS_Virtual.md) · `app/src/ui/` |

---

## ➡️ Próximos passos

### Imediatos (aguardando cliente)

1. ✅ **Fase 1 concluída e aprovada pelo cliente** (05/06) — wireframes das 7 etapas + documento de IA.
2. ✅ **UI Kit da Fase 2 entregue e aprovado internamente** (09/06) — galeria de design system + biblioteca de 20 componentes.
3. 🟡 **Aguardar a validação do cliente sobre o UI Kit** para fechar formalmente a Fase 2 (como nas Fases 0 e 1).
4. **Preparo da Fase 3 (não bloqueado):** revisar com o cliente, em paralelo, as 4 notas de continuidade (identidade, C5 premium, Teto de Métricas, exportação simbólica) e o escopo do replay enriquecido [D-017] (E7).

### Fase 2 — Design visual e UI Kit (entregue, aguardando validação)

Entregue:

- Sistema de cores, tipografia, logo, espaçamento/elevação e iconografia documentados na página `/ui-kit`, fiéis aos tokens validados em `brand-assets/`.
- Biblioteca de componentes reais e reutilizáveis em `app/src/ui/` (12 base + 8 de simulador/HUD), pronta para a Fase 3 importar.
- Acessibilidade dos campos (rótulos associados, erro texto+ícone, foco visível) atendendo WCAG.
- Hub/portal de review vestido com a paleta da marca.

### Fase 3 — Telas em alta fidelidade (após validação)

- Vestir os wireframes da Fase 1 com a linguagem visual, importando a biblioteca `app/src/ui/` (sobre `/ui-kit` e depois `/prototype`).
- Incorporar o replay enriquecido [D-017] (E7) e as 4 notas de continuidade.

A identidade está 100% validada e o UI Kit está pronto, então a Fase 3 não terá bloqueio de insumo de design.

---

## 🚧 Bloqueios e dependências externas

| ID | Descrição | Tipo | Impacto | Mitigação |
|---|---|---|---|---|
| EXT-01 | Validação da identidade visual proposta (cliente) | Aprovação externa | ✅ Resolvido — aprovada em 28/05 (ID-V1/V2/V3/V5) | Design system proposto pela Result ([D-010](Decisoes_GSFS_Virtual.md#d-010--identidade-visual-documentar-entregue--propor-design-system-completo-result)); resta apenas CL-01 |
| EXT-04 | Arquivos-fonte vetoriais / alta-res dos logos (cliente) | Insumo externo | ✅ **Resolvido em 02/06** — logos definitivos entregues e validados (CL-01, D-012) | — |
| INT-01 | Tarefas Result de identidade (fontes + favicon.ico) | Tarefa interna Result | ✅ Resolvido | Concluído em 2026-05-26 (PR-04/05/08) |
| EXT-02 | Produção dos 5 vídeos 3D | Insumo externo | 🟢 Produtor definido — **Guarasoft/Daniel** (D-013). Specs técnicas virão do cliente; vídeos são insumo da Fase 4 | Fase 1 não aguarda as specs; integrar com placeholders durante Fase 3 |
| EXT-03 | Validação do cliente sobre Matriz/Roteiro/Teto/Identidade | Aprovação externa | ✅ **Resolvido em 02/06** — todas aprovadas, incl. VR-05 (C5 v0.2) | — |

---

## ⚠️ Riscos vigentes (referência: cronograma seção 4)

| Risco | Status | Última observação |
|---|---|---|
| Demora do cliente em aprovar matriz de cenários | ✅ Resolvido | Aprovada integralmente (V-01…V-05; C5 v0.2 validado em 02/06) |
| Demora do cliente em fornecer identidade de marca | ✅ Mitigado | Identidade 100% validada; CL-01 resolvido em 02/06 (logos definitivos entregues) |
| Atraso na entrega dos vídeos 3D | 🟢 Monitorando | Produtor definido (Guarasoft/Daniel, D-013); specs técnicas virão do cliente — Fase 1 não aguarda |
| Limitações técnicas do Figma Make | ✅ Mitigado | Acionado fallback técnico ([D-001](Decisoes_GSFS_Virtual.md#d-001--acionar-o-fallback-tecnico-typescript-em-lugar-do-figma-make)) |
| Projetos paralelos consumindo o tempo previsto | 🟢 Monitorando | — |

---

## 📚 Índice da documentação do projeto

### Documentos normativos (entradas do projeto)

- [PRD_GSFS_Virtual_v0.3.md](PRD_GSFS_Virtual_v0.3.md) — Requisitos de produto (validado em 19/05/2026)
- [Cronograma_GSFS_Virtual.md](Cronograma_GSFS_Virtual.md) — Cronograma de fases

### Documentos da Fase 0 (entregáveis)

- [Matriz_Cenarios_GSFS_Virtual.md](Matriz_Cenarios_GSFS_Virtual.md) — Item 1
- [Roteiro_Tecnico_GSFS_Virtual.md](Roteiro_Tecnico_GSFS_Virtual.md) — Item 6
- [Layout_Exportacao_GSFS_Virtual.md](Layout_Exportacao_GSFS_Virtual.md) — Item 5
- [Teto_Metricas_GSFS_Virtual.md](Teto_Metricas_GSFS_Virtual.md) — Item 4
- [Stack_Tecnica_GSFS_Virtual.md](Stack_Tecnica_GSFS_Virtual.md) — Item 7
- [Fechamento_Fase0_GSFS_Virtual.md](Fechamento_Fase0_GSFS_Virtual.md) — **Marco de saída da Fase 0**

### Documentos da Fase 1 (entregáveis)

- [Arquitetura_Informacao_Fase1_GSFS_Virtual.md](Arquitetura_Informacao_Fase1_GSFS_Virtual.md) — **Arquitetura de informação, fluxos e wireframes (marco da Fase 1)**
- `app/` — protótipo navegável dos wireframes (React+Vite+TS); `npm run dev --prefix app` → http://localhost:5173

### Documentos da Fase 2 (entregáveis)

- **UI Kit navegável** — rota `/ui-kit` no app (`npm run dev --prefix app` → http://localhost:5173/ui-kit): galeria de design system com fundamentos (cores, tipografia, logo, espaçamento, iconografia) e todos os componentes com variações/estados. **Marco da Fase 2.**
- `app/src/ui/` — **biblioteca de componentes reais reutilizáveis** (12 base + 8 de simulador) que a Fase 3 importa para vestir os wireframes.
- Specs internas: [2026-06-09-ui-kit-fase2-design.md](../docs/superpowers/specs/2026-06-09-ui-kit-fase2-design.md) (design) · [2026-06-09-ui-kit-fase2.md](../docs/superpowers/plans/2026-06-09-ui-kit-fase2.md) (plano de implementação).

### Identidade visual (Item 3)

- [Identidade_Visual_GSFS_Virtual.md](../brand-assets/guidelines/Identidade_Visual_GSFS_Virtual.md) — Identidade (Parte A cliente) + Design System (Parte B Result)
- `brand-assets/tokens/` — `colors.css`, `colors.scss`, `typography.css`, `tokens.json`
- `brand-assets/logos/` — `source/`, `horizontal/` (único lockup oficial), `favicon/` (gerado). `vertical/` e `icon/` removidos (D-012)
- `brand-assets/reference/` — imagens de apoio da linguagem visual (a popular, PR-06)
- Fonte da identidade: **GSFS Visual Identity System v1.0 — Maio/2025** (arquivos definitivos entregues — CL-01/ID-V4 resolvido em 02/06)

### Documentos transversais (vivos)

- [Decisoes_GSFS_Virtual.md](Decisoes_GSFS_Virtual.md) — Decision log central
- [Status_GSFS_Virtual.md](Status_GSFS_Virtual.md) — Este documento

---

## 🔄 Protocolo de manutenção deste documento

Este documento deve ser atualizado:

1. **A cada conclusão de item** dentro de uma fase.
2. **A cada início/fim de fase** do cronograma.
3. **A cada nova decisão** registrada em [Decisoes_GSFS_Virtual.md](Decisoes_GSFS_Virtual.md).
4. **A cada mudança no estado de bloqueios ou riscos**.
5. **Ao receber retorno do cliente** sobre itens em validação.

Ao atualizar, sempre revisar:

- ⚡ "Onde estamos agora" (topo)
- 📋 Tabela de status das fases
- 🎯 Detalhamento da fase atual
- ✅ Histórico de entregas
- ➡️ Próximos passos
- 🚧 Bloqueios e dependências
- ⚠️ Riscos vigentes
- Data de "Última atualização" no topo

---

*Este documento é o ponto de entrada do projeto. Quem chegar agora deve conseguir entender, em menos de 3 minutos, onde o projeto está, o que foi feito, e o que vem a seguir.*
