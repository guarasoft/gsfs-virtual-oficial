# Teto de Métricas — GSFS Virtual

**Projeto:** GSFS Virtual — Simulador Técnico-Institucional
**Documento:** Política de exibição numérica (preciso vs. qualitativo)
**Versão:** 1.0 (Validado pelo cliente em 28/05/2026)
**Data:** 26/05/2026
**Responsável Técnico:** Jonathan — Result
**Referências normativas:**
- PRD GSFS Virtual v0.3 (19/05/2026), seções 2.4.2, 2.4.4, 5, 6 e 9 (item 6)
- Matriz Narrativa dos 5 Cenários v0.1
- Roteiro Técnico dos 5 Cenários v0.1
- Layout do Arquivo Exportado v0.1

---

## 1. Objetivo do documento

Resolver o **Ponto em Aberto nº 6 do PRD v0.3 (seção 9)** — *"Teto de Métricas: lista de quais valores numéricos devem ser expressos com precisão e quais permanecem qualitativos"* — estabelecendo a política aplicável a todas as métricas exibidas no simulador (HUD, painéis de sensor, detecções, relatórios) e nas exportações.

Este documento é referência cruzada para Matriz, Roteiro e Layout de Exportação. **Qualquer valor numérico exibido no simulador deve estar listado aqui**; caso surja métrica nova durante o design, este teto deve ser atualizado.

---

## 2. Princípios fundamentais (PRD)

### 2.1. O que é métrica "precisa" no GSFS Virtual

| Princípio | Implicação |
|---|---|
| **PRD 2.4.2 — Caráter simbólico e plausível** | Mesmo valores "precisos" são *valores simbólicos plausíveis*, não medições reais. |
| **PRD 2.4.4 — Métricas como referência visual** | Números são primariamente *suporte à narrativa visual*, não claims técnicos. |
| **PRD 6 — Reatividades dinâmicas obrigatórias** | Apenas relógio (horário real da máquina) e bateria (decaimento proporcional ao tempo de tela) têm comportamento *dinâmico real*. |
| **PRD CA-08 — Ausência de claims técnicos fechados** | Nenhuma métrica pode ser apresentada como garantia de fábrica ou medição validada. |

### 2.2. Critérios de classificação

Cada métrica do simulador é classificada em uma de duas categorias:

| Categoria | Definição | Forma de exibição |
|---|---|---|
| **Preciso (P)** | Valor numérico com unidade e dígitos definidos. Suporta narrativa técnica e plausibilidade. | Ex: `3,0 m` · `65°` · `14:32:07` · `78%` |
| **Qualitativo (Q)** | Faixa, categoria ou indicador visual. Usado quando precisão numérica não acrescenta valor narrativo ou poderia gerar claim indevido. | Ex: `BAIXA / MÉDIA / ALTA` · barra de nível · ícone de status · escala de cor |

### 2.3. Política de arredondamento (métricas precisas)

| Tipo | Casas decimais | Justificativa |
|---|---|---|
| Profundidade (m) | 1 casa | Coerente com o teto de 5m do PRD; mais que isso passaria de plausibilidade simbólica. |
| Ângulo do veio (°) | inteiro | Convenção geofísica de campo. |
| Volume cúbico (m³) | 1 casa | Ordem de grandeza, sem aparentar medição validada. |
| Coordenadas latitude/longitude | 4 casas decimais | Plausível para GNSS-RTK simbólico (~11 m de resolução visual aparente; precisão centimétrica fica indicada pelo *status* FIX). |
| Altitude (m) | 1 casa | Mesma lógica. |
| Bateria (%) | inteiro | UX padrão de instrumento. |
| Temperatura (°C) | inteiro | UX padrão. |
| Latência (ms) | inteiro | UX padrão. |
| Tempo decorrido | `MM:SS` | Padrão de timer de missão. |
| Relógio | `HH:MM:SS` | Padrão de painel industrial. |
| Hash SHA-256 | 64 caracteres hex | Padrão criptográfico canônico (apresentado nos 8 primeiros + 64 completos na página final do PDF). |

---

## 3. Catálogo mestre de métricas

Todas as métricas exibidas no simulador, organizadas por área. Coluna `C` = Classificação (P = Preciso, Q = Qualitativo).

### 3.1. HUD persistente (sempre visível durante a varredura)

| Métrica | C | Formato / faixa | Origem do dado | Observação |
|---|---|---|---|---|
| Relógio do sistema | P | `HH:MM:SS` | Horário real da máquina | PRD 6 — obrigatório dinâmico real |
| Bateria | P | `%` inteiro (0-100) | Decaimento proporcional ao tempo de tela | PRD 6 — obrigatório dinâmico real |
| Status da bateria | Q | `ALTA / MÉDIA / BAIXA / CRÍTICA` | Derivado da % | Cor de fundo do indicador muda conforme faixa |
| Temperatura do equipamento | P | `°C` inteiro (35-55) | Sobe lentamente durante a sessão | Plausível para equipamento industrial |
| Status da temperatura | Q | `NORMAL / ELEVADA / CRÍTICA` | Derivado do °C | — |
| Status sensor GPR | Q | `ON / OFF / ERR` | Estado simbólico | — |
| Status sensor EMI | Q | `ON / OFF / ERR` | Estado simbólico | — |
| Status sensor IMU | Q | `ON / OFF / ERR` | Estado simbólico | — |
| Status sensor GNSS-RTK | Q | `NO FIX / FLOAT / FIX` | Estado simbólico | "FIX" alcançado durante warmup conforme roteiro |
| Progresso da varredura | P | `%` inteiro (0-100) | Determinístico, linear durante F2 | — |
| Tempo decorrido da sessão | P | `MM:SS` | Determinístico | — |

### 3.2. Painel GPR (Ground Penetrating Radar)

| Métrica | C | Formato / faixa | Observação |
|---|---|---|---|
| Profundidade máxima exibida | P | `5,0 m` (fixo) | PRD 8.2 — teto teórico do simulador |
| Amplitude do eco | Q | Gráfico de oscilação contínua | Sem valor numérico |
| Atenuação por meio | Q | `NORMAL / MODERADA / ALTA` | Aplicável principalmente em Cenário 3 (solo úmido) |
| Confiança do sinal | Q | `BAIXA / MÉDIA / ALTA` | Em zonas de degradação (Cenário 4): `BAIXA` |
| Profundidade do alvo no ponto | P | `m` com 1 casa | Aparece sobre a hipérbole após a detecção |

### 3.3. Painel EMI (Electromagnetic Induction)

| Métrica | C | Formato / faixa | Observação |
|---|---|---|---|
| Intensidade no mapa de calor (por célula) | Q | Escala de cor (azul → vermelho) | Sem valor numérico exposto |
| Condutividade média da zona | Q | `BAIXA / MÉDIA / ALTA / SATURADA` | Cenário 3: `SATURADA` |
| Ruído de fundo | Q | `LOW / MED / HIGH` | Cenário 4: `HIGH` desde warmup |
| Pico de intensidade (na detecção) | Q | Destaque visual no mapa | — |

### 3.4. Painel IMU (Inertial Measurement Unit)

| Métrica | C | Formato / faixa | Observação |
|---|---|---|---|
| Roll | P | `°` inteiro (-45 a +45) | Variação simulada conforme modalidade |
| Pitch | P | `°` inteiro (-45 a +45) | Variação simulada conforme modalidade |
| Heading | P | `°` inteiro (0-359) | Direção do movimento |
| Aceleração | Q | Gráfico vetorial sem número | — |
| Drift simulado | Q | Indicador discreto | Apenas em modalidades pedestres |

### 3.5. Painel GNSS/RTK

| Métrica | C | Formato / faixa | Observação |
|---|---|---|---|
| Latitude | P | `XX,XXXX°` (4 casas) | Coordenada simbólica fixa por cenário |
| Longitude | P | `XX,XXXX°` (4 casas) | Coordenada simbólica fixa por cenário |
| Altitude | P | `m` com 1 casa | Coordenada simbólica |
| Status FIX | Q | `NO FIX / FLOAT / FIX` | Roteiro: `FIX` em ~10s do início |
| Número de satélites | P | inteiro (8-16) | Plausível para uso a céu aberto |
| HDOP / PDOP | Q | `BAIXO / MÉDIO / ALTO` | Sem número exposto |
| Precisão estimada | Q | Indicador visual "centimétrico" | **Nunca exibir número absoluto** — atende CA-08 |

### 3.6. Detecção de alvos

| Métrica | C | Formato / faixa | Observação |
|---|---|---|---|
| Classificação | Q | Rótulo: `OURO / MAGNETITA / VAZIO / ÁGUA` | — |
| Profundidade do alvo | P | `m` com 1 casa | Ex: `3,0 m` |
| Ângulo do veio | P | `°` inteiro (quando aplicável) | Apenas para veios (ouro) |
| Posição relativa | Q | `NW / N / NE / W / CENTRO / E / SW / S / SE` | Texto descritivo |
| Volume estimado | P | `m³` com 1 casa | Aparece após refinamento (t+3s da detecção) |
| Confiança da detecção | Q | `BAIXA / MÉDIA / ALTA / CONFIRMADO` | Cenário 4: usa `CONFIRMADO` ao final |
| Sensor(es) que confirmaram | Q | Lista de ícones (até 4) | Ex: `[GPR][EMI][RTK]` |
| Status (Cenário 4) | Q | `SUSPEITA / DESCARTADO / CONFIRMADO` | Visual: amarelo / riscado / verde |

### 3.7. Pipeline e fusão multimodal

| Métrica | C | Formato / faixa | Observação |
|---|---|---|---|
| Latência simbólica do pipeline | Q | Indicador `ÓTIMO / NORMAL / DEGRADADO` | **Sem número em ms** — atende CA-08 (evita claim de performance) |
| Confiança da fusão | Q | Barra (0-100%) sem número, ou `BAIXA/MÉDIA/ALTA` | — |
| Contraste antes/depois da fusão (Cenário 4) | Q | Painel comparativo visual | — |
| Resiliência da sessão (Cenário 4) | Q | Indicador no fechamento: `% sinal recuperado` simbólico | Pode ser exibido como número (`% inteiro`) por força narrativa do cenário |

### 3.8. Métricas globais da sessão (resumo final)

| Métrica | C | Formato / faixa | Observação |
|---|---|---|---|
| Duração total da sessão | P | `MM:SS` | Determinístico por cenário (90s ou 135s) |
| Área varrida | P | `m²` inteiro | Determinístico por cenário |
| Número de alvos detectados | P | inteiro | Contagem direta |
| Número de falsos-positivos descartados | P | inteiro | Aplicável ao Cenário 4 |
| Profundidade máxima atingida | P | `m` com 1 casa | Maior profundidade entre alvos do cenário |
| Volume cúbico agregado | P | `m³` com 1 casa | Soma simbólica dos volumes dos alvos |
| Confiança média da sessão | Q | `BAIXA / MÉDIA / ALTA` | Sem percentual numérico |

### 3.9. Configuração de missão (telas pré-varredura)

| Métrica | C | Formato / faixa | Observação |
|---|---|---|---|
| Tipo de solo | Q | `ROCHOSO / ARENOSO / ÚMIDO` | Seletor |
| Modalidade | Q | `CARRINHO AUTÔNOMO / MOCHILA / MANUAL` | Seletor |
| Área de varredura | P | `XX × XX m` | Parametrizado conforme cenário |
| Cenário | Q | Nome do cenário | Seletor da biblioteca dos 5 |

### 3.10. Cadeia de custódia / GSFS_RECORD / Exportação

| Métrica | C | Formato / faixa | Observação |
|---|---|---|---|
| Missão ID | P | string `GSFS-RECORD-YYYY-MM-DD-NNN` | Determinístico por cenário |
| Hash SHA-256 (curto) | P | 8 caracteres hex | Capa do PDF |
| Hash SHA-256 (completo) | P | 64 caracteres hex | Página de cadeia de custódia |
| Timestamp de geração | P | `DD/MM/YYYY HH:MM:SS` | Real-time do clock |
| Timestamps de cada detecção | P | `HH:MM:SS` ou `t=XXs` | Conforme roteiro |
| Versão do simulador | P | string `v0.x` | — |

### 3.11. Boot e autoteste

| Métrica | C | Formato / faixa | Observação |
|---|---|---|---|
| Status de cada componente | Q | `OK / FALHA / VERIFICANDO` | — |
| Progresso do boot | P | `%` inteiro | Barra de progresso |
| Versão do firmware simbólica | P | string `v0.x.y` | Texto fixo no rodapé |

---

## 4. Métricas explicitamente proibidas

Para garantir aderência ao **CA-08 (Ausência de claims técnicos fechados)** e ao princípio **2.4.2 (Caráter simbólico)**, as seguintes métricas **não devem ser exibidas em forma numérica** em nenhuma tela ou relatório:

| Métrica proibida | Motivo |
|---|---|
| Precisão GNSS-RTK em centímetros (ex: "±2 cm") | Claim técnico fechado de geodésia; deve ficar qualitativo (`FIX` simbólico). |
| Throughput de dados em MB/s ou Hz de aquisição | Claim de performance de hardware. |
| Taxa de classificação correta da IA (ex: "98%") | Claim de validação científica. |
| Tempo de inferência da Edge AI em ms | Claim de capacidade computacional do equipamento físico. |
| Resolução real do GPR em cm | Claim técnico de sensor. |
| Profundidade máxima nominal de 30 m do equipamento real | PRD 8.2 — fixar exibição em 5 m. |
| Garantias de uptime ou MTBF | Claim de confiabilidade industrial. |
| Coeficientes de fusão multimodal (pesos numéricos) | Sugere algoritmo de produção, não simulação. |

---

## 5. Cobertura cruzada por documento

| Documento que cita métrica | Tipo de citação | Onde está aqui |
|---|---|---|
| Matriz — profundidades dos alvos (1,5 m, 1,8 m, etc.) | Precisas | §3.6 |
| Matriz — área de cada cenário (10×10m, 20×20m, etc.) | Precisas | §3.9 |
| Roteiro — timestamps (`t=35s`, `t=60s`, etc.) | Precisos | §3.10 |
| Roteiro — `FIX RTK em t=10s` | Status qualitativo | §3.5 |
| Roteiro — relógio, bateria, temperatura | Precisos (dinâmicos) | §3.1 |
| Roteiro — ruído alto, confiança baixa | Qualitativos | §3.2, §3.3, §3.7 |
| Layout — hash SHA-256, missão ID | Precisos | §3.10 |
| Layout — volume cúbico, n° de alvos | Precisos | §3.8 |
| Layout — confiança média | Qualitativa | §3.8 |
| Layout — disclaimer obrigatório | (política, não métrica) | §2.1 |

---

## 6. Dependências e itens em aberto

- **Identidade de marca (Ponto em Aberto nº 5 do PRD):** define cores dos indicadores qualitativos (verde/amarelo/vermelho — paleta institucional final).
- **Roteiro técnico v0.1:** já documentado, alimenta todos os timestamps e detecções.
- **Layout de exportação v0.1:** já documentado, consome esta política em todas as células numéricas do relatório.

---

## 7. Validação

### 7.1. Validação interna (Result)

- [x] **TM-01:** Toda métrica exibida no simulador (com base em matriz + roteiro + layout) está catalogada.
- [x] **TM-02:** Cada métrica tem classificação `P` ou `Q` explícita.
- [x] **TM-03:** Métricas precisas têm política de arredondamento definida.
- [x] **TM-04:** Métricas proibidas (CA-08) estão listadas explicitamente.
- [x] **TM-05:** Reatividades dinâmicas obrigatórias (PRD 6) estão classificadas como `P` com origem real (relógio, bateria).

### 7.2. Validação com o cliente — ✅ aprovada em 2026-05-28

- [x] **TM-V1:** Aprovação da política geral preciso vs. qualitativo.
- [x] **TM-V2:** Confirmação de que nenhuma das "métricas proibidas" (§4) é esperada pelo cliente em demonstrações.
- [x] **TM-V3:** Aprovação do **% sinal recuperado** (Cenário 4) como única métrica numérica de resiliência exibida — alternativa: deixar puramente qualitativa.
- [x] **TM-V4:** Aprovação do **número de satélites** como métrica precisa (vs. ocultá-la totalmente).
- [x] **TM-V5:** Confirmação de que a profundidade máxima de **5,0 m** (PRD 8.2) é a única referência de profundidade exibida em todo o simulador (i.e., nenhuma menção aos 30 m nominais do equipamento físico real).

---

*Teto de Métricas validado pelo cliente em 2026-05-28 (TM-V1 a TM-V5). Consolidado, é referência cruzada normativa para todos os artefatos das Fases 1, 2, 3 e 4.*
