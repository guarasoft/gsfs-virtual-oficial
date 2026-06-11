# Decisões do Projeto — GSFS Virtual

**Projeto:** GSFS Virtual — Simulador Técnico-Institucional
**Documento:** Registro central de decisões (Decision Log / ADR)
**Tipo:** Documento vivo
**Última atualização:** 2026-06-11
**Responsável Técnico:** Jonathan — Result

---

## 1. Objetivo do documento

Registrar, de forma centralizada, **todas as decisões de produto, design e arquitetura tomadas durante o projeto GSFS Virtual**, mantendo rastreabilidade entre cada decisão e os **documentos por ela afetados**.

Este é um **documento vivo**: toda nova decisão entra aqui antes (ou ao mesmo tempo) de ser refletida nos demais documentos.

### Para que serve

- **Rastrear o "porquê"** de cada escolha (não apenas o "o quê").
- **Saber o que atualizar** quando uma decisão for revisada (cada decisão lista os documentos afetados).
- **Comunicar o estado decisório** ao cliente, parceiros e novos integrantes do time.
- **Evitar regressão** (decisões superadas ficam registradas com `Superseded`, não apagadas).

---

## 2. Convenções

### 2.1. Identificação

- ID no formato `D-NNN` (sequencial; nunca reaproveitar).
- Título curto e imperativo.

### 2.2. Status

| Status | Significado |
|---|---|
| `Active` | Decisão em vigor. |
| `Superseded by D-XYZ` | Substituída por outra decisão; preservada para histórico. |
| `Deprecated` | Cancelada sem substituta. |
| `Proposed` | Pendente de aprovação (interna ou do cliente). |

### 2.3. Protocolo de atualização

Sempre que uma decisão for tomada ou revisada:

1. Adicionar/atualizar a entrada nesta página (item 4).
2. Atualizar a tabela mestre (item 3).
3. Para cada documento listado em "**Documentos afetados**", abrir e atualizar a parte impactada.
4. Atualizar o **Status do Projeto** ([Status_GSFS_Virtual.md](Status_GSFS_Virtual.md)) refletindo a mudança.
5. Atualizar a data de "Última atualização" no topo deste arquivo.

### 2.4. Anatomia de uma decisão

```
### D-NNN — Título
- Status: Active / Proposed / Superseded by D-XYZ / Deprecated
- Data: YYYY-MM-DD
- Contexto: o que disparou a decisão; quais alternativas foram consideradas.
- Decisão: a escolha feita, de forma clara e direta.
- Consequências: implicações práticas (positivas e negativas).
- Documentos afetados: lista de arquivos que refletem ou consomem esta decisão.
```

---

## 3. Tabela mestre

| ID | Decisão | Status | Data |
|---|---|---|---|
| [D-001](#d-001--acionar-o-fallback-tecnico-typescript-em-lugar-do-figma-make) | Acionar o fallback técnico (TypeScript) em lugar do Figma Make | Active | 2026-05-26 |
| [D-002](#d-002--adotar-stack-react--vite--tailwind--zustand--r3f--framer-motion) | Adotar stack React + Vite + Tailwind + Zustand + R3F + Framer Motion | Active | 2026-05-26 |
| [D-003](#d-003--matriz-narrativa-dos-5-cenarios-com-foco-em-mineracao--1-defesa-civil) | Matriz narrativa dos 5 cenários (foco em mineração + 1 Defesa Civil) | Active | 2026-05-26 |
| [D-004](#d-004--cenario-4-atende-ca-06-com-2-falsos-positivos--2-zonas-de-degradacao--1-confirmado) | Cenário 4 atende CA-06 com 2 falsos-positivos + 2 zonas de degradação + 1 confirmado | Active | 2026-05-26 |
| [D-005](#d-005--duracao-dos-cenarios-90s-c1-c4-e-135s-c5) | Duração dos cenários: 90s (C1-C4) e 135s (C5) | Active | 2026-05-26 |
| [D-006](#d-006--estrutura-do-roteiro-3-micro-tempos-por-deteccao--arco-dos-4-sensores) | Estrutura do roteiro: 3 micro-tempos por detecção + arco dos 4 sensores | Active | 2026-05-26 |
| [D-007](#d-007--pdf-de-exportacao-em-a4-retrato-com-5-paginas) | PDF de exportação em A4 retrato com 5 páginas | Active | 2026-05-26 |
| [D-008](#d-008--gis-e-bim-como-pacotes-simbolicos-preview-only) | GIS e BIM como pacotes simbólicos preview-only | Active | 2026-05-26 |
| [D-009](#d-009--politica-de-metricas-preciso-vs-qualitativo--arredondamento--proibicoes) | Política de métricas: preciso vs qualitativo + arredondamento + proibições | Active | 2026-05-26 |
| [D-010](#d-010--identidade-visual-documentar-entregue--propor-design-system-completo-result) | Identidade visual: documentar entregue + propor design system completo (Result) | Active | 2026-05-26 |
| [D-011](#d-011--cenario-5-reforcado-como-showcase-institucional-gsfs-feedback-do-cliente) | Cenário 5 reforçado como showcase institucional GSFS (feedback do cliente) | Active | 2026-05-28 |
| [D-012](#d-012--logo-unico-lockup-horizontal-validado-cl-01-resolvido-vertical-e-icone-descartados) | Logo: único lockup horizontal validado; CL-01 resolvido; vertical e ícone descartados | Active | 2026-06-02 |
| [D-013](#d-013--producao-dos-videos-3d-pela-guarasoft-daniel-fase-1-nao-aguarda-as-specs) | Produção dos vídeos 3D pela Guarasoft (Daniel); Fase 1 não aguarda as specs | Active | 2026-06-02 |
| [D-014](#d-014--prototipar-a-fase-1-em-codigo-portal-de-review-em-vez-de-wireframes-no-figma) | Prototipar a Fase 1 em código (portal de review) em vez de wireframes no Figma | Active | 2026-06-02 |
| [D-015](#d-015--abortar--reiniciar-a-varredura-com-confirmacao-proposta-result) | Abortar / Reiniciar a varredura com confirmação (proposta Result) | Active | 2026-06-03 |
| [D-016](#d-016--jornada-de-7-etapas-fusao-resultado--bloco-3d-e-setup-com-manual-demonstrativo) | Jornada de 7 etapas: fusão Resultado + Bloco 3D, e setup com manual demonstrativo | Active | 2026-06-03 |
| [D-017](#d-017--replay-enriquecido-com-dados-da-missao-feedback-do-cliente) | Replay enriquecido com dados da missão, não só imagens (feedback do cliente) | Active | 2026-06-05 |
| [D-018](#d-018--simbolo-isolado-reintroduzido-como-ativo-oficial-para-usos-compactos-pedido-do-cliente) | Símbolo isolado reintroduzido como ativo oficial para usos compactos (pedido do cliente) | Active | 2026-06-11 |
| [D-019](#d-019--governanca-da-fase-2-pacote-documental-em-vez-de-acesso-ao-repositorio) | Governança da Fase 2: pacote documental ao cliente em vez de acesso ao repositório | Active | 2026-06-11 |

---

## 4. Detalhamento das decisões

### D-001 — Acionar o fallback técnico (TypeScript) em lugar do Figma Make

- **Status:** Active
- **Data:** 2026-05-26
- **Contexto:** O PRD v0.3 (seção 2.5) prevê Figma Make como ferramenta primária. O Cronograma (seção 6) prevê TypeScript como fallback técnico caso surjam limitações. Análise dos requisitos da seção 5.3 (4 painéis dinâmicos simultâneos), seção 5.5 (bloco 3D interpretativo) e seção 6 (relógio real e bateria proporcional) indicou alto risco de atrito com Figma Make. Optou-se por já partir do fallback.
- **Decisão:** A implementação será feita em código TypeScript desde o início, sem passagem por Figma Make.
- **Consequências:**
  - (+) Determinismo total e controle fino de timing (atende CA-07).
  - (+) Estabilidade em demos ao vivo (atende PRD 6).
  - (+) Código produzido vira base evolutiva para o sistema real (PRD 6 — Evolução do Código).
  - (−) Custo de iteração visual inicial maior que em Figma Make.
  - (−) Necessidade de comunicação formal ao cliente sobre o acionamento.
- **Documentos afetados:**
  - [Stack_Tecnica_GSFS_Virtual.md](Stack_Tecnica_GSFS_Virtual.md)
  - [Cronograma_GSFS_Virtual.md](Cronograma_GSFS_Virtual.md) (seções 3 — Fases 2 e 3 — e 6)
  - [PRD_GSFS_Virtual_v0.3.md](PRD_GSFS_Virtual_v0.3.md) (seção 2.5 — passa a fazer referência ao Stack Técnico)

---

### D-002 — Adotar stack React + Vite + Tailwind + Zustand + R3F + Framer Motion

- **Status:** Active
- **Data:** 2026-05-26
- **Contexto:** Decisão derivada de D-001. Avaliadas três alternativas: (A) React + Vite + Tailwind + Zustand + R3F + Framer Motion; (B) Vanilla TS + Three.js puro; (C) Svelte + Three.js. Critérios: ecossistema, afinidade com Figma Make, suporte a 3D, gerenciamento de estado para 4 sensores simultâneos, estabilidade em demo.
- **Decisão:** Adotar a opção (A).
- **Consequências:**
  - (+) Maior ecossistema e referências para UI ruggedized.
  - (+) R3F integra Three.js de forma idiomática para o bloco 3D.
  - (+) Framer Motion simplifica animações dos painéis de sensor.
  - (−) Tamanho de bundle maior que vanilla; mitigado por code-splitting e por target de demo (não há restrição mobile).
- **Documentos afetados:**
  - [Stack_Tecnica_GSFS_Virtual.md](Stack_Tecnica_GSFS_Virtual.md)

---

### D-003 — Matriz narrativa dos 5 cenários (foco em mineração + 1 Defesa Civil)

- **Status:** Active (validado pelo cliente em 2026-05-28; o ajuste do Cenário 5 virou [D-011](#d-011--cenario-5-reforcado-como-showcase-institucional-gsfs-feedback-do-cliente))
- **Data:** 2026-05-26
- **Contexto:** O PRD v0.3 (seção 9, ponto 1) lista a matriz de cenários como ponto em aberto, exigindo proposta com "solos e minérios". Persona primário do PRD é mineração; secundário é Defesa Civil. Alvos exemplares (5.4): Ouro, Magnetita, Vazio, Água. Avaliadas três distribuições; optou-se pela aderente à expressão "solos e minérios" do PRD.
- **Decisão:** 4 cenários em contexto de mineração + 1 cenário em contexto Defesa Civil/Geotecnia (Cenário 3). Cobertura dos 3 solos, 3 modalidades e 4 alvos exemplares. Cenário 5 reservado para demonstração premium institucional (multi-alvo).
- **Consequências:**
  - (+) Cobertura plena dos requisitos do PRD.
  - (+) Atende públicos primário e secundário.
  - (+) Cenário 5 vira fechamento institucional para apresentações de alto impacto (FINEP, EMBRAPII).
  - (−) Apenas 1 cenário de Defesa Civil — se cliente desejar mais ênfase neste persona, matriz precisa ser revista.
- **Documentos afetados:**
  - [Matriz_Cenarios_GSFS_Virtual.md](Matriz_Cenarios_GSFS_Virtual.md)
  - [Roteiro_Tecnico_GSFS_Virtual.md](Roteiro_Tecnico_GSFS_Virtual.md)
  - [Layout_Exportacao_GSFS_Virtual.md](Layout_Exportacao_GSFS_Virtual.md)
  - [Teto_Metricas_GSFS_Virtual.md](Teto_Metricas_GSFS_Virtual.md)

---

### D-004 — Cenário 4 atende CA-06 com 2 falsos-positivos + 2 zonas de degradação + 1 confirmado

- **Status:** Active (validado pelo cliente em 2026-05-28 — VR-03)
- **Data:** 2026-05-26
- **Contexto:** PRD CA-06 exige *"presença de simulação de ruído/interferência eletromagnética em pelo menos 1 cenário"*. Não fixa quantidade. Optou-se por composição que maximiza demonstração de resiliência sem poluir a tela.
- **Decisão:** Cenário 4 implementa: (a) ruído EMI elevado desde o warmup; (b) duas zonas de degradação de sinal explicitamente sinalizadas; (c) dois falsos-positivos brotando como "SUSPEITA · MAGNETITA?" e sendo descartados pela fusão multimodal; (d) um alvo real (ouro 3,2m / ~50°) confirmado por validação cruzada de 3 sensores.
- **Consequências:**
  - (+) Atende CA-06 com folga narrativa.
  - (+) Demonstra valor da fusão multimodal (Pilar 3).
  - (−) Cenário 4 é o mais complexo de implementar (timing dos descartes precisa ser preciso).
- **Documentos afetados:**
  - [Matriz_Cenarios_GSFS_Virtual.md](Matriz_Cenarios_GSFS_Virtual.md) (Cenário 4)
  - [Roteiro_Tecnico_GSFS_Virtual.md](Roteiro_Tecnico_GSFS_Virtual.md) (Cenário 4)
  - [Layout_Exportacao_GSFS_Virtual.md](Layout_Exportacao_GSFS_Virtual.md) (subtabela de descartes no PDF)

---

### D-005 — Duração dos cenários: 90s (C1-C4) e 135s (C5)

- **Status:** Active (validado pelo cliente em 2026-05-28 — VR-01)
- **Data:** 2026-05-26
- **Contexto:** Avaliadas três opções de pacing: 60s todos, 90s+135s, 120s todos. PRD não fixa duração. Critério: ritmo confortável para apresentação ao vivo, com cenário institucional (C5) tendo mais espaço por conter 4 detecções.
- **Decisão:** 90s para C1-C4, 135s para C5. Total de ~10min se executados em sequência.
- **Consequências:**
  - (+) Ritmo compatível com narração do apresentador.
  - (+) C5 não atropela suas 4 detecções.
  - (−) Sessão completa de demonstração não cabe em janela de 5 minutos; mitigação: cenários são selecionáveis individualmente.
- **Documentos afetados:**
  - [Roteiro_Tecnico_GSFS_Virtual.md](Roteiro_Tecnico_GSFS_Virtual.md) (seções 2.1 e 3 a 7)

---

### D-006 — Estrutura do roteiro: 3 micro-tempos por detecção + arco dos 4 sensores

- **Status:** Active
- **Data:** 2026-05-26
- **Contexto:** PRD pede "momentos exatos de detecção". Avaliada granularidade: apenas momento de detecção (simples) vs timeline completa por beats (densa). Optou-se pela densa para garantir determinismo na Fase 3 e dispensar segundo documento.
- **Decisão:** Roteiro descreve, por cenário: (a) timeline em beats de ~5s; (b) padrão de 3 micro-tempos para cada detecção — assinatura subliminar (t-2s) → rótulo formal (t) → refinamento (t+3s); (c) comportamento dos 4 sensores em cada beat.
- **Consequências:**
  - (+) Especificação auto-suficiente para implementação direta na Fase 3.
  - (+) Padrão de 3 micro-tempos cria credibilidade técnica visual.
  - (−) Documento mais longo, requer mais atenção em manutenção.
- **Documentos afetados:**
  - [Roteiro_Tecnico_GSFS_Virtual.md](Roteiro_Tecnico_GSFS_Virtual.md) (seções 2.2 e 2.3)

---

### D-007 — PDF de exportação em A4 retrato com 5 páginas

- **Status:** Active
- **Data:** 2026-05-26
- **Contexto:** PRD seção 5.5 exige relatório com data/hora, volume, ativos e hash. Pilar 4 cita exportação simbólica. Avaliados formatos: brief executivo (3 páginas), padrão técnico (5 páginas), dossiê (8+ páginas). Optou-se pelo padrão técnico por equilibrar densidade e legibilidade institucional.
- **Decisão:** PDF em A4 retrato, 5 páginas: capa, sumário executivo, mapa de varredura, alvos detectados + vista 3D, cadeia de custódia.
- **Consequências:**
  - (+) Adequado para anexo em propostas FINEP/EMBRAPII.
  - (+) Cabe a cadeia de custódia + hash sem comprometer outras páginas.
  - (−) Implementação requer template e dados consistentes (mitigado pelo Teto de Métricas).
- **Documentos afetados:**
  - [Layout_Exportacao_GSFS_Virtual.md](Layout_Exportacao_GSFS_Virtual.md) (seção 4)

---

### D-008 — GIS e BIM como pacotes simbólicos preview-only

- **Status:** Active
- **Data:** 2026-05-26
- **Contexto:** PRD Pilar 4 cita "Exportação Simbólica (GIS, BIM, PDF)". Avaliado: geração real de arquivos (shapefile/IFC) vs preview com lista simbólica. Princípio do PRD 2.4.2 (caráter simbólico) favorece preview.
- **Decisão:** GIS e BIM exibidos como preview de "pacote ZIP" — lista de arquivos plausíveis + metadados — sem geração real de binário. Disclaimer obrigatório em ambos.
- **Consequências:**
  - (+) Coerente com princípio simbólico (atende CA-08).
  - (+) Reduz complexidade de implementação.
  - (−) Cliente pode esperar download real; mitigação: validação explícita em VL-04 do layout.
- **Documentos afetados:**
  - [Layout_Exportacao_GSFS_Virtual.md](Layout_Exportacao_GSFS_Virtual.md) (seções 5 e 6)

---

### D-009 — Política de métricas: preciso vs qualitativo + arredondamento + proibições

- **Status:** Active (validado pelo cliente em 2026-05-28 — TM-V1 a TM-V5)
- **Data:** 2026-05-26
- **Contexto:** PRD ponto em aberto nº 6 pede definição do que é preciso vs qualitativo. Princípios PRD 2.4.2, 2.4.4 e CA-08 limitam claims técnicos. Catalogadas todas as métricas usadas em matriz, roteiro e layout.
- **Decisão:** Política em 3 partes: (a) classificação P/Q para toda métrica visível; (b) política de arredondamento por tipo (profundidade 1 casa, ângulo inteiro, coordenadas 4 casas, etc.); (c) lista de 8 métricas explicitamente proibidas (precisão RTK em cm, throughput, taxa de IA, etc.).
- **Consequências:**
  - (+) Protege o cliente de claim indevido em apresentações.
  - (+) Garante consistência cruzada entre telas e relatórios.
  - (−) Restrições podem frustrar audiência técnica esperando números absolutos; mitigação: justificada como prototipação simbólica.
- **Documentos afetados:**
  - [Teto_Metricas_GSFS_Virtual.md](Teto_Metricas_GSFS_Virtual.md) (documento inteiro)
  - [Matriz_Cenarios_GSFS_Virtual.md](Matriz_Cenarios_GSFS_Virtual.md) (cruzamento §5 do Teto)
  - [Roteiro_Tecnico_GSFS_Virtual.md](Roteiro_Tecnico_GSFS_Virtual.md) (cruzamento §5 do Teto)
  - [Layout_Exportacao_GSFS_Virtual.md](Layout_Exportacao_GSFS_Virtual.md) (cruzamento §5 do Teto)

---

### D-010 — Identidade visual: documentar entregue + propor design system completo (Result)

- **Status:** Active — a parte de **curadoria de logos** (matriz 3×3) foi **superada por [D-012]** em 2026-06-02 (passou a um único lockup horizontal) e **CL-01/ID-V4 foi resolvido** pela mesma decisão. O restante (cores, tipografia, estados, tokens) permanece em vigor, aprovado em 2026-05-28 (ID-V1, ID-V2, ID-V3, ID-V5).
- **Data:** 2026-05-26
- **Contexto:** PRD ponto em aberto nº 5 pede paleta, tipografia e logo. Cliente entregou 7 cores + logos (PNG e SVG). Diagnóstico revelou lacunas que **bloqueiam o trabalho**: faltam cores de status (vermelho/âmbar) exigidas pelo Roteiro (Cenário 4) e pelo Teto de Métricas; tipografia inexistente; SVGs são raster embutido (não-vetorial); PNGs em baixa resolução; sem versão de logo para fundo escuro. Avaliadas três abordagens (híbrido, propor tudo, solicitar tudo ao cliente). Optou-se por **propor o sistema completo como proposta Result**.
- **Decisão:** (a) preservar a paleta do cliente como primitivas; (b) propor escalas tonais, papéis semânticos e cores de status (âmbar `#F5A623`, vermelho `#E5484D`); (c) adotar a tipografia **Exo 2 definida pelo cliente** (hierarquia H1/H2/H3/Body/Caps oficial), com **JetBrains Mono** apenas como complemento Result para dados crus; (d) reorganizar `brand-assets/` em estrutura canônica; (e) especificar retrabalho dos logos (vetor real, alta-res, versão clara) como tarefas de produção Result. Sujeito a validação do cliente.
- **Atualização 1 (mesmo dia):** o cliente possui spec tipográfico (Exo 2) que estava em imagem de brand guidelines fora das pastas de arquivo. A proposta inicial Result (Rajdhani/Inter) foi **substituída** pela fonte oficial do cliente.
- **Atualização 2 (mesmo dia):** recebido o **GSFS Visual Identity System v1.0 (Maio/2025)** completo. Consequências: (a) **Inter é fonte secundária oficial** ("UI, captions, data interfaces") — restaurada; (b) há **gradiente de marca** oficial (navy→cyan→green) — adicionado aos tokens; (c) o cliente esclareceu que as guidelines são **referência de identidade**, não design system — o documento foi reestruturado em Parte A (cliente) + Parte B (tradução Result); (d) **curadoria de logos**: manter conjunto canônico 3 lockups × 3 tratamentos, descartar variações com artefato ("ACKED", grunge, distorção); (e) **body mantido em 14px** por decisão do projeto. Permanece como proposta Result apenas: cores de status (âmbar/vermelho), escalas tonais e a mono complementar.
- **Consequências:**
  - (+) Destrava Fases 2 e 3 sem esperar o cliente.
  - (+) Cobre todos os estados do simulador (resolve conflito com Roteiro/Teto).
  - (+) `brand-assets/tokens/tokens.json` vira fonte única consumida pelo Tailwind na Fase 3.
  - (−) Assume decisões de marca que o cliente pode querer rever; mitigado por marcar tudo como "proposta" e abrir validações ID-V1 a ID-V5.
  - (−) Retrabalho dos logos (vetor) exige ferramenta de design, fora do escopo de código.
- **Documentos afetados:**
  - [Identidade_Visual_GSFS_Virtual.md](../brand-assets/guidelines/Identidade_Visual_GSFS_Virtual.md)
  - `brand-assets/tokens/colors.css`, `colors.scss`, `typography.css`, `tokens.json`
  - [Stack_Tecnica_GSFS_Virtual.md](Stack_Tecnica_GSFS_Virtual.md) (Tailwind consome os tokens)
  - [Teto_Metricas_GSFS_Virtual.md](Teto_Metricas_GSFS_Virtual.md) (cores de estado/confiança)
  - [Roteiro_Tecnico_GSFS_Virtual.md](Roteiro_Tecnico_GSFS_Virtual.md) (cores do Cenário 4)

---

### D-011 — Cenário 5 reforçado como showcase institucional GSFS (feedback do cliente)

- **Status:** Active
- **Data:** 2026-05-28
- **Contexto:** Cliente aprovou em geral a Matriz e o Roteiro Técnico, condicionado a um ajuste no Cenário 5. Pediu que C5 deixe de ser "demonstração multi-alvo genérica" e passe a representar claramente o **diferencial central proprietário do GSFS**, mantendo a estrutura técnica intacta (duração, sensores, alvos, pipeline).
- **Decisão:** Cenário 5 renomeado para **"Inteligência Subsuperficial Integrada — Demonstração GSFS"**. Mantida toda a estrutura técnica original (135s, Mochila, 20×20m, 4 alvos nas mesmas profundidades). Reescrito o enquadramento narrativo (Matriz §4 / Roteiro §7) e o painel de fechamento, que passa a revelar em sequência os **5 atributos do diferencial GSFS** entre t=110s e t=125s: (1) Fusão Multimodal, (2) Inteligência Subsuperficial, (3) Interpretação Integrada, (4) Rastreabilidade, (5) Apoio à Decisão.
- **Consequências:**
  - (+) C5 ganha caráter institucional/proprietário; deixa de competir com demos genéricas de multi-alvo.
  - (+) Os 5 atributos viram a "assinatura visual" do GSFS no fechamento — útil em FINEP/EMBRAPII/investidores.
  - (+) Zero impacto técnico: timeline, sensores, alvos e pipeline preservados.
  - (−) O nome interno "PIPELINE COMPLETO" sai de cena — referências cruzadas atualizadas em Roteiro VR-05, Layout §7 e Fechamento §5.
- **Documentos afetados:**
  - [Matriz_Cenarios_GSFS_Virtual.md](Matriz_Cenarios_GSFS_Virtual.md) v0.2 — §3 (tabela) e §4 (detalhe C5)
  - [Roteiro_Tecnico_GSFS_Virtual.md](Roteiro_Tecnico_GSFS_Virtual.md) v0.2 — §7 (enquadramento + timeline + §7.3 5 atributos + §7.4 + VR-05)
  - [Layout_Exportacao_GSFS_Virtual.md](Layout_Exportacao_GSFS_Virtual.md) — §7 (linha C5)
  - [Fechamento_Fase0_GSFS_Virtual.md](Fechamento_Fase0_GSFS_Virtual.md) — VR-05

---

### D-012 — Logo: único lockup horizontal validado; CL-01 resolvido; vertical e ícone descartados

- **Status:** Active — a cláusula **(b) "ícone descartado"** foi **superada por [D-018]** em 2026-06-11 (símbolo isolado reintroduzido como ativo oficial, a pedido do cliente). O restante permanece em vigor: lockup horizontal como único principal, **lockup vertical segue descartado**, CL-01 resolvido.
- **Data:** 2026-06-02
- **Contexto:** O cliente validou as logos efetivamente entregues. Na prática, **só existe o lockup horizontal** — em três tratamentos (cores/RGB, mono preto, mono branco). A matriz canônica 3×3 (horizontal + vertical + ícone × 3 tratamentos) proposta na curadoria Result ([D-010], ID-V5) não corresponde mais ao material real: não há lockup vertical nem ícone por ora. O cliente confirmou ainda que os arquivos entregues atendem **CL-01** (alta-res/vetor).
- **Decisão:**
  - (a) O **único lockup oficial** é o **horizontal**, em `brand-assets/logos/horizontal/` (RGB + Mono_Black + Mono_White). É o conjunto validado.
  - (b) **Descartados por ora** os lockups **vertical** e **ícone**; as pastas `logos/vertical/` e `logos/icon/` foram **removidas do repositório**.
  - (c) **CL-01 / ID-V4 resolvido:** os arquivos entregues são os definitivos (alta-res/vetor). A identidade passa a estar **100% validada, sem pendência do cliente**.
  - (d) Supera a parte de curadoria de logos de [D-010]; o restante de [D-010] (cores, tipografia, estados, tokens) segue em vigor.
- **Consequências:**
  - (+) Identidade sem pendências — destrava integralmente as Fases 2 e 3 quanto a logo.
  - (+) `brand-assets/` enxuto: um só lockup, sem variantes não usadas.
  - (−) Se no futuro for preciso aplicar a marca em formato quadrado/empilhado (favicon de marca, selo, vídeo), não há lockup vertical/ícone — terá de ser solicitado ao cliente. (O `favicon/` atual, gerado do símbolo, foi **mantido** por ser ativo funcional do app web; `source/` mantido como arquivo de originais.)
- **Documentos afetados:**
  - [Identidade_Visual_GSFS_Virtual.md](../brand-assets/guidelines/Identidade_Visual_GSFS_Virtual.md) (A.3, B.1, B.5, B.6, B.8)
  - `brand-assets/logos/` (remoção de `vertical/` e `icon/`)
  - [Status_GSFS_Virtual.md](Status_GSFS_Virtual.md)
  - [Fechamento_Fase0_GSFS_Virtual.md](Fechamento_Fase0_GSFS_Virtual.md)

---

### D-013 — Produção dos vídeos 3D pela Guarasoft (Daniel); Fase 1 não aguarda as specs

- **Status:** Active
- **Data:** 2026-06-02
- **Contexto:** O item 2 da Fase 0 (produção dos 5 vídeos 3D) estava como acordo formal pendente, responsável "a definir" (EXT-02 / interno Result). Definiu-se agora o produtor e o fluxo de especificação técnica. Os vídeos são insumo da Fase 4 (integração das peças 3D); as specs técnicas detalhadas ainda virão do cliente.
- **Decisão:**
  - (a) A produção dos **5 vídeos 3D** (bloco volumétrico de fechamento de cada cenário) fica a cargo da **Guarasoft (Daniel)**.
  - (b) O **cliente enviará todos os detalhes técnicos** dos vídeos.
  - (c) **A Fase 1 não aguarda** o envio dessas specs — segue-se para a Fase 1 em paralelo; durante a Fase 3 a integração usa placeholders, e os vídeos definitivos entram na Fase 4.
- **Consequências:**
  - (+) Resolve o item 2 da Fase 0 (responsável definido) — remove uma das condições de fechamento.
  - (+) Desbloqueia o avanço para a Fase 1 sem esperar o detalhamento dos vídeos.
  - (+) Risco "atraso na entrega dos vídeos 3D" passa a ter dono (Guarasoft/Daniel) e fluxo de specs definido.
  - (−) As specs técnicas dos vídeos seguem como dependência do cliente para a Fase 4; se atrasarem, afetam só a integração final, não o caminho até lá.
- **Documentos afetados:**
  - [Status_GSFS_Virtual.md](Status_GSFS_Virtual.md) (bloqueios EXT-02, riscos, próximos passos)
  - [Fechamento_Fase0_GSFS_Virtual.md](Fechamento_Fase0_GSFS_Virtual.md) (item 2 / §5 / §6)

---

### D-014 — Prototipar a Fase 1 em código (portal de review) em vez de wireframes no Figma

- **Status:** Active
- **Data:** 2026-06-02
- **Contexto:** A Fase 1 prevê "wireframes em baixa fidelidade". Começamos desenhando no Figma (via MCP), mas surgiram quatro fatores: (a) **custo de token** alto por frame; (b) artefato **descartável** — a Fase 3 reconstrói tudo em código; (c) o alvo real é **tablet** e a documentação pede multi-resolução (Cronograma Fase 5: tablet/notebook/projetor), o que é trivial em código e fixo no Figma; (d) a **stack já é código** (D-001/D-002). O cliente também enviou referência estrutural do autoteste (duas fases: splash + diagnóstico/telemetria).
- **Decisão:** Construir uma **app web** (React + Vite + TS + React Router) em **`app/`**, estruturada como **portal de review**:
  - `/` **Hub** — menu do projeto, sempre com volta à home.
  - `/wireframe` — **Fase 1**, wireframes em **modo cinza/estrutural** escopado (`.wf`), referência **tablet 1280×800** responsivo (container queries). Índice das 8 etapas.
  - `/ui-kit` — **Fase 2** (placeholder por ora).
  - `/prototype` — **Fase 3**, o simulador hi-fi. **É o produto entregue ao cliente**; roda standalone, sem o chrome de review.
  - **E1 portada** (E1a splash + E1b diagnóstico + telemetria) reproduzindo a referência estrutural do cliente.
- **Consequências:**
  - (+) **Não-descartável:** o `/prototype` vira o esqueleto da Fase 3; nada se joga fora.
  - (+) **Responsivo** para tablet/notebook/projetor de graça.
  - (+) **Navegável/clicável** — melhor artefato de review que frames estáticos; um link único para o cliente acompanhar cada fase.
  - (+) Mais barato em tokens que orquestrar o Figma.
  - (−) Exige **disciplina de fidelidade**: o modo wireframe é cinza, sem UI Kit, para não atropelar a Fase 2.
  - (−) Traz a app real já na Fase 1 (mitigado: só estrutura/fluxos; visual é Fase 2).
  - Supera a escolha implícita de prototipar no Figma. O arquivo Figma da E1 fica como **histórico/insumo** (capturou a referência do cliente).
- **Documentos afetados:**
  - [Status_GSFS_Virtual.md](Status_GSFS_Virtual.md)
  - [Cronograma_GSFS_Virtual.md](Cronograma_GSFS_Virtual.md) (Fase 1 entregue em código; escopo e marco inalterados)
  - `app/` (nova aplicação — Hub + rotas wireframe/ui-kit/prototype; E1 portada)

---

### D-015 — Abortar / Reiniciar a varredura com confirmação (proposta Result)

- **Status:** Active *(validado pelo cliente em 2026-06-05, na aprovação da Fase 1; o cliente reforçou explicitamente a exigência de confirmação antes de qualquer ação que encerre/reinicie a missão)*
- **Data:** 2026-06-03
- **Contexto:** Durante a Fase 1 (wireframe da E4) identificou-se que **o PRD não prevê** abortar, reiniciar ou pausar uma varredura em curso (busca por esses termos no PRD: zero ocorrências; o modelo assume execução determinística do início ao fim — CA-05). Para uma ferramenta de **demonstração ao vivo**, o apresentador pode precisar abortar (cenário errado, tempo de apresentação) ou reiniciar.
- **Decisão:** Adicionar à tela de Varredura (E4) controles de operação via **aba flutuante "AÇÕES"** (borda direita, centro) que abre um **sheet** com **Reiniciar** e **Abortar**, **ambos com confirmação**:
  - **Reiniciar** → recomeça a varredura em `t=0` (determinística, reproduz idêntica).
  - **Abortar** → encerra **sem gerar GSFS_RECORD** → volta ao Menu (E2).
  Marcado inicialmente como proposta Result; **validado pelo cliente em 05/06/2026**, com reforço explícito da confirmação antes de encerrar/reiniciar.
- **Consequências:**
  - (+) Dá controle ao apresentador em demos ao vivo.
  - (+) Custo nulo no modelo determinístico (abortar = descartar; reiniciar = re-rodar de t=0).
  - (−) Funcionalidade além do escopo do PRD → requer aprovação explícita do cliente antes de virar Active.
- **Documentos afetados:**
  - [Arquitetura_Informacao_Fase1_GSFS_Virtual.md](Arquitetura_Informacao_Fase1_GSFS_Virtual.md) (E4)
  - `app/` (E4 — aba AÇÕES, sheet, confirmações)

---

### D-016 — Jornada de 7 etapas: fusão Resultado + Bloco 3D, e setup com manual demonstrativo

- **Status:** Active *(jornada de 7 etapas aprovada pelo cliente em 2026-06-05; modo manual mantido como demonstrativo por decisão Result, sem validação adicional)*
- **Data:** 2026-06-03
- **Contexto:** Na Fase 1, ao detalhar a jornada, três pontos de IA foram resolvidos com o cliente em revisão:
  1. O PRD 5.5 descreve **resultado e bloco 3D como uma única tela** (viewport 3D + legenda lateral).
  2. O setup (5.2) precisa de um modo de seleção de cenário; surgiu a ideia de um **select com "Nova configuração" manual** por padrão.
  3. A **área de varredura** (5.2 "definição de eixos parametrizados") admite definição livre.
- **Decisão:**
  - (a) **Fundir** Resultado (E5) e Bloco 3D (antiga E6) numa só tela → a **jornada passa de 8 para 7 etapas** (E1 Boot · E2 Menu · E3 Setup · E4 Varredura · E5 Resultado+Bloco 3D · E6 Exportação · E7 Replay).
  - (b) O select de cenário vem em **"Nova configuração (manual)"** por padrão, com os controles **manipuláveis mas demonstrativos** — o modo manual **não executa** (apenas os 5 cenários determinísticos rodam; PRD 5.6).
  - (c) A **área de varredura** no modo manual é **híbrida**: campos livres `X × Y` + atalhos para os tamanhos comuns (10×10/15×15/20×20/25×25).
- **Consequências:**
  - (+) Fiel ao PRD 5.5 (uma tela) e 5.2 (área parametrizada); jornada mais enxuta.
  - (+) O select acomoda tanto a escolha de cenário quanto a affordance de configuração manual.
  - (−) "Nova configuração" não-funcional pode confundir; mitigado por desabilitar "Iniciar" no modo manual. **Mantido como demonstrativo por decisão Result consolidada — sem validação adicional do cliente.**
- **Documentos afetados:**
  - [Arquitetura_Informacao_Fase1_GSFS_Virtual.md](Arquitetura_Informacao_Fase1_GSFS_Virtual.md) (jornada, E3, E5)
  - `app/` (E3 setup; E5 resultado+3D; índice de wireframes)

---

### D-017 — Replay enriquecido com dados da missão (feedback do cliente)

- **Status:** Active
- **Data:** 2026-06-05
- **Contexto:** Na aprovação da Fase 1, o cliente observou que a tela de **Replay (E7)** não deve apresentar *"apenas as imagens"*. Embora a E7 já espelhe a tela de varredura (`ScanView`), o cliente pediu que o replay exiba, de forma explícita, os **dados essenciais da missão** que reforçam rastreabilidade, repetibilidade e credibilidade institucional.
- **Decisão:** A E7 (Replay) deve sobrepor/expor, além da visualização da varredura: **linha do tempo**, **cenário executado**, **sensores ativos**, **timestamps**, **detecções confirmadas**, **falsos positivos descartados** (quando houver) e **referência ao GSFS_RECORD / hash**. Tudo seguindo o Teto de Métricas v1.0 (sem claims fechados). Estrutura entra no wireframe da E7 (Fase 1); o comportamento dinâmico (scrubber/timeline ao vivo) é Fase 3.
- **Consequências:**
  - (+) Reforça CA-07 (replay determinístico) e o Pilar 4 (rastreabilidade/GSFS_RECORD).
  - (+) Aproveita o `ScanView` já compartilhado entre E4 e E7; é majoritariamente acréscimo de metadados (cenário, GSFS_RECORD/hash, linha do tempo).
  - (−) A E7 ganha densidade de informação — exige cuidado de layout na Fase 2 para não competir com a visualização.
- **Documentos afetados:**
  - [Arquitetura_Informacao_Fase1_GSFS_Virtual.md](Arquitetura_Informacao_Fase1_GSFS_Virtual.md) (E7)
  - `app/` (E7 — overlay de metadados da missão no replay)

---

### D-018 — Símbolo isolado reintroduzido como ativo oficial para usos compactos (pedido do cliente)

- **Status:** Active
- **Data:** 2026-06-11
- **Contexto:** Na validação da Fase 2 (UI Kit), o cliente pediu — entre seus 6 pontos de alinhamento — que, mesmo sendo o lockup horizontal a aplicação principal, o **símbolo isolado** (cubo facetado + eixo de varredura, sem o wordmark) seja mantido como **ativo oficial** para usos compactos da interface: ícone, splash, favicon, botões reduzidos e estados de sistema. Isso reverte a cláusula (b) da [D-012], que havia descartado o lockup ícone e removido a pasta `logos/icon/`. A própria D-012 previa este cenário ("se no futuro houver necessidade de marca em formato quadrado... terá de ser solicitado ao cliente") — o pedido do cliente o concretiza.
- **Decisão:**
  - (a) O **símbolo isolado** passa a ser **ativo oficial**, nos três tratamentos: cor (RGB), mono branco e mono preto.
  - (b) Os ativos foram **extraídos em vetor real do lockup horizontal validado** (não do PNG raster antigo em `source/`): isolou-se o grupo do símbolo e recortou-se o `viewBox` para `0 0 9.15 11.13`, preservando geometria, gradiente de marca e facetas. O corte foi conferido por renderização contra o lockup original. Salvos em `brand-assets/logos/icon/` como `GSFS_Logo_Icon_RGB.svg` · `_Mono_White.svg` · `_Mono_Black.svg`, e espelhados em `app/public/logos/`.
  - (c) Exibidos na galeria do UI Kit (seção Logo) nos 3 tratamentos + amostras em tamanhos reduzidos (48/32/20 px) para aferição de legibilidade.
  - (d) **Supera apenas a cláusula (b) "ícone descartado" da [D-012]**; o restante da D-012 segue em vigor (lockup horizontal como único principal; **lockup vertical permanece descartado**; CL-01 resolvido).
  - (e) **Favicons:** os atuais (derivados do símbolo em raster) permanecem válidos; uma regeneração a partir do novo vetor fica como tarefa Result opcional, condicionada à definição do enquadramento em canvas quadrado (o símbolo é portrait ≈9,15×11,13).
- **Consequências:**
  - (+) Atende o pedido do cliente e cobre os usos compactos da UI (ícone/splash/favicon/botões/estados) que o lockup horizontal não serve bem.
  - (+) Por vir do vetor do lockup, o símbolo é fiel à arte aprovada e totalmente escalável.
  - (+) `logos/icon/` volta a existir como ativo canônico.
  - (−) Reabre uma micro-validação de identidade (o cliente confirmar visualmente o símbolo isolado como arte oficial). Aprovado internamente em 11/06; a confirmação do cliente entra junto das respostas aos 6 pontos da Fase 2.
  - (−) Símbolo portrait exige enquadramento em canvas quadrado para favicon/usos quadrados — respiro a definir na (eventual) regeneração dos favicons.
- **Documentos afetados:**
  - [Identidade_Visual_GSFS_Virtual.md](../brand-assets/guidelines/Identidade_Visual_GSFS_Virtual.md) (A.3, B.1, B.5, B.6, B.8)
  - `brand-assets/logos/icon/` (recriada — 3 SVGs) e `app/public/logos/`
  - `app/src/pages/uikit/sections/Logo.tsx` (galeria do UI Kit)
  - [Status_GSFS_Virtual.md](Status_GSFS_Virtual.md)

---

### D-019 — Governança da Fase 2: pacote documental em vez de acesso ao repositório

- **Status:** Active
- **Data:** 2026-06-11
- **Contexto:** Ao aprovar a direção da Fase 2 / UI Kit para continuidade, o cliente pediu que, no fechamento da etapa, ficasse garantida **"a entrega ou acesso organizado ao repositório/versionamento"** — com a estrutura dos tokens, componentes, rota `/ui-kit` e instruções básicas de visualização/execução — para manter **rastreabilidade e governança**. O pedido oferece a alternativa explícita: **entrega OU acesso**.
- **Decisão:** Atender o pedido por um **pacote documental autocontido** (a "entrega"), reservando o **acesso direto ao repositório de código para a entrega final** do projeto, como praxe das fases anteriores. O pacote vive em `entrega-fase2-cliente/` e cobre: índice/LEIA-ME, Fechamento da Fase 2, Catálogo do UI Kit (tokens + 23 componentes), Mapa do Repositório (árvore comentada, sem o código-fonte), Instruções de Execução e Extrato de Versionamento (histórico Git), além de `screenshots/` com as 12 seções da rota `/ui-kit` renderizadas (1280×800, 2×).
- **Consequências:**
  - (+) Satisfaz literalmente o pedido do cliente (rastreabilidade/governança) sem antecipar o código-fonte vivo.
  - (+) Material reaproveitável como base do fechamento documental das próximas fases.
  - (−) Exige manter o pacote em sintonia com o repo a cada fechamento (catálogo e versionamento).
- **Documentos afetados:**
  - `entrega-fase2-cliente/` (pacote — 6 documentos + screenshots)
  - [Status_GSFS_Virtual.md](Status_GSFS_Virtual.md)

---

## 5. Decisões pendentes ou em análise

Espaço reservado para decisões propostas ainda não classificadas. Mover para a tabela mestre quando consolidadas.

- (vazio)

---

*Este documento deve ser revisado em todo fechamento de fase do cronograma e a cada decisão tomada em reunião com o cliente ou internamente. A integridade da documentação do projeto depende dele.*
