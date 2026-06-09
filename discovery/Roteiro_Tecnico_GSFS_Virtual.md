# Roteiro Técnico dos 5 Cenários — GSFS Virtual

**Projeto:** GSFS Virtual — Simulador Técnico-Institucional
**Documento:** Roteiro técnico determinístico dos 5 cenários
**Versão:** 0.2 (Cenário 5 reforçado com painel dos 5 atributos GSFS — feedback do cliente)
**Data:** 28/05/2026
**Responsável Técnico:** Jonathan — Result
**Referências normativas:**
- PRD GSFS Virtual v0.3 (19/05/2026)
- Matriz Narrativa dos 5 Cenários v0.2 (28/05/2026)

---

## 1. Objetivo do documento

Resolver o **Ponto em Aberto nº 3 do PRD v0.3 (seção 9)** — *"Roteiro Técnico: definição dos momentos exatos em que as detecções devem brotar na tela"* — formalizando, para cada um dos 5 cenários, a linha do tempo determinística completa: comportamento dos 4 sensores, trajetória da varredura, momentos exatos de detecção, falsos-ecos, zonas de degradação e transições de fechamento.

Este documento é a referência normativa para a implementação determinística da Fase 3 (Desenho das Telas em Alta Fidelidade). **Mesmo input (cenário escolhido) deve produzir o mesmo output (timeline reproduzida)** — princípio reforçado pelo PRD seção 5.6 e pelo Critério de Aceitação CA-07 (Modo Replay).

---

## 2. Convenções do roteiro

### 2.1. Duração e ritmo

- **Cenários 1 a 4:** duração total de **90 segundos** cada.
- **Cenário 5 (multi-alvo institucional):** duração total de **135 segundos** (50% maior, justificado por 4 detecções simultâneas e função de cenário de fechamento).
- **Tempo total se executados em sequência:** ~10 minutos 15 segundos.
- **Granularidade:** *beats* de 5 segundos. Eventos críticos (detecções, descartes, mudanças de fase) marcados com timestamp exato `t=XXs`.

### 2.2. Fases comuns a todos os cenários

| Fase | Intervalo (cenários 1-4) | Intervalo (cenário 5) | Descrição |
|---|---|---|---|
| **F0 — Inicialização residual** | 00-05s | 00-05s | Painel pós-boot. Os 4 sensores acendem em sequência: GPR → EMI → IMU → GNSS-RTK. |
| **F1 — Warmup** | 05-12s | 05-15s | Calibração visual: IMU zera referência, GNSS-RTK busca *FIXAÇÃO*, GPR e EMI estabilizam *baseline*. |
| **F2 — Varredura principal** | 12-80s | 15-125s | Trajetória conforme a modalidade. Detecções ocorrem nesta fase. |
| **F3 — Consolidação** | 80-90s | 125-135s | Cálculo de volume agregado, geração de hash do GSFS_RECORD, transição para o bloco 3D. |

### 2.3. Anatomia de uma detecção

Toda detecção segue **3 micro-tempos** para gerar credibilidade técnica:

1. **t-2s — Assinatura subliminar:** o sensor relevante começa a destacar a anomalia visualmente (oscilação anômala no GPR, pico no heatmap EMI), *sem rótulo*.
2. **t — Detecção formal:** rótulo da classificação *brota* na tela (popup lateral animado + marcação na visualização principal). Som de "ping" simbólico opcional.
3. **t+3s — Refinamento:** valores numéricos (profundidade, ângulo, volume) se consolidam após 1-2 passadas adicionais sobre o ponto.

### 2.4. Indicadores persistentes (todos os cenários)

- **Bateria:** decai proporcionalmente ao tempo de tela aberta (PRD 6 — Reatividades Dinâmicas Obrigatórias).
- **Temperatura:** sobe lentamente durante a varredura.
- **Relógio:** horário real da máquina.
- **Barra de progresso da varredura:** linear, atinge 100% ao final da F2.
- **Status dos 4 sensores:** sempre exibido no HUD persistente.

---

## 3. Cenário 1 — Veio de Ouro em Encosta Rochosa

**Duração:** 90s | **Solo:** Rochoso | **Modalidade:** Manual | **Área:** 10×10m

**Trajetória implícita:** zigue-zague livre do operador, varrendo do canto inferior-esquerdo ao superior-direito. Velocidade implícita ~1,1m²/s após warmup.

### Linha do tempo

| t | Evento | GPR | EMI | IMU | GNSS-RTK |
|---|---|---|---|---|---|
| 00-05s | F0 — Sensores ligando em sequência | OFF → ON | OFF → ON | OFF → ON | OFF → ON / buscando satélites |
| 05-12s | F1 — Warmup | Baseline em meio denso (linha estável) | Baseline baixo | Calibração (oscilação inicial decai) | **FIX RTK** em t=10s |
| 12-25s | Varredura inicial, canto inferior-esquerdo | Ecos limpos em rocha | Baseline baixo | Roll/pitch variando (terreno irregular) | Trajetória em zigue-zague |
| **t=33s** | **Assinatura subliminar — Magnetita** | (sem mudança) | **Pico discreto começa a surgir** | — | — |
| **t=35s** | **DETECÇÃO 1 — Magnetita** | — | Pico definido | — | Marcador `[M]` plotado |
| 35-50s | Refinamento + prosseguimento | Ecos limpos | Pico estável | Variação contínua | Cobertura centro do plot |
| **t=58s** | **Assinatura subliminar — Ouro** | **Hipérbole de reflexão começa a se formar** | — | — | — |
| **t=60s** | **DETECÇÃO 2 — Veio de Ouro** | Hipérbole definida | — | — | Marcador `[Au]` plotado |
| 60-75s | Refinamento + mapeamento da extensão do veio | Refinamento do GPR exibindo extensão lateral ~4m | Picos secundários sobre o veio | — | Passadas adicionais sobre o veio |
| 75-85s | Cobertura final, barra de progresso → 100% | — | — | — | — |
| 80-90s | F3 — Consolidação + hash + transição | Painel apagando | Painel apagando | Painel apagando | Painel apagando |

### Detecções consolidadas

| # | Alvo | t (s) | Profundidade | Ângulo do veio | Observação |
|---|---|---|---|---|---|
| 1 | Magnetita | 35 | 1,8m | — | Massa pontual acessória |
| 2 | Ouro (veio) | 60 | 3,0m | ~65° | Extensão lateral ~4m, refinada até t=75 |

### Fechamento

- t=80s: barra de progresso 100%, animação de "Selando GSFS_RECORD".
- t=85s: hash simbólico SHA-256 gerado e exibido.
- t=88s: transição (fade ou wipe) para a **tela de resultado com bloco 3D em 1ª pessoa**.
- Legenda lateral consolidada: data/hora, volume cúbico estimado, ativos identificados, hash.

---

## 4. Cenário 2 — Levantamento de Massa Magnetítica

**Duração:** 90s | **Solo:** Arenoso | **Modalidade:** Carrinho Autônomo | **Área:** 20×20m

**Trajetória implícita:** padrão *raster* regular (passadas norte-sul / sul-norte). 9 passadas cobrindo a área. Velocidade implícita ~4,5m²/s.

### Linha do tempo

| t | Evento | GPR | EMI | IMU | GNSS-RTK |
|---|---|---|---|---|---|
| 00-05s | F0 — Sensores ligando | OFF → ON | OFF → ON | OFF → ON | OFF → ON |
| 05-12s | F1 — Warmup; carrinho posicionando no canto NW | Baseline em solo arenoso | Baseline moderado | Estável | **FIX RTK** em t=09s |
| 12-18s | Passada 1 (N→S, faixa NW) | Ecos uniformes | Subindo gradualmente | Drift baixo (trajetória regular do carrinho) | Linha reta |
| 18-25s | Passada 2 (S→N, faixa centro-NW) | Uniforme | **Pico A começando a surgir** | Estável | Curva de retorno |
| **t=23s** | **Assinatura subliminar — Magnetita A** | — | Pico se intensificando | — | — |
| **t=25s** | **DETECÇÃO 1 — Magnetita A** | — | Pico claro | — | Marcador `[M-A]` |
| 25-40s | Passadas 3-4 (centro); refinamento área de M-A | Uniforme | Pico A estável + **Pico B começando** | Estável | Padrão raster |
| **t=43s** | **Assinatura subliminar — Magnetita B** | — | Pico B intensificando | — | — |
| **t=45s** | **DETECÇÃO 2 — Magnetita B** | — | Pico B claro | — | Marcador `[M-B]` |
| 45-65s | Passadas 5-7 (transição centro→SE); assinatura profunda emergindo | Eco mais profundo se formando | Picos A e B estáveis + **Pico C emergindo (mais difuso)** | Estável | Padrão raster |
| **t=66s** | **Assinatura subliminar — Magnetita C** | Eco profundo definindo | Pico C intensificando | — | — |
| **t=68s** | **DETECÇÃO 3 — Magnetita C** | Eco profundo claro | Pico C claro | — | Marcador `[M-C]` |
| 68-80s | Passadas 8-9 (SE); heatmap EMI consolidando padrão geométrico das 3 massas | — | Padrão geométrico completo | Estável | Padrão raster |
| 80-90s | F3 — Consolidação + hash + transição | — | — | — | — |

### Detecções consolidadas

| # | Alvo | t (s) | Profundidade | Localização (relativa) | Área aprox. |
|---|---|---|---|---|---|
| 1 | Magnetita A | 25 | 1,5m | Centro-NW | 2×2m |
| 2 | Magnetita B | 45 | 2,2m | Centro | 3×2m |
| 3 | Magnetita C | 68 | 3,1m | SE | 1,5×1,5m |

### Fechamento

- t=82s: barra de progresso 100%, "Calculando volume agregado".
- t=85s: volume cúbico agregado das 3 massas exibido.
- t=87s: hash + transição para bloco 3D.

---

## 5. Cenário 3 — Cavidade Subterrânea em Solo Saturado

**Duração:** 90s | **Solo:** Úmido | **Modalidade:** Mochila | **Área:** 15×15m | **Aplicação:** Defesa Civil / Geotecnia

**Trajetória implícita:** caminhada pedestre, orgânica (não-raster), com 2-3 passagens sobre o ponto crítico. Velocidade implícita ~2,5m²/s.

### Linha do tempo

| t | Evento | GPR | EMI | IMU | GNSS-RTK |
|---|---|---|---|---|---|
| 00-05s | F0 — Sensores ligando | OFF → ON | OFF → ON | OFF → ON | OFF → ON |
| 05-12s | F1 — Warmup; EMI já indicando umidade alta de fundo | Baseline com atenuação visível | **Baseline alto** (umidade) | Calibração caminhada | **FIX RTK** em t=11s |
| 12-25s | Varredura inicial; trajetória orgânica do operador a pé | Baseline atenuado | Condutividade elevada uniforme | Oscilação cíclica (passos) | Trajetória orgânica |
| 25-40s | Trajetória cruza região central; aviso visual sutil de atenuação GPR | **Sinal enfraquece** em profundidade; mensagem discreta "ATENUAÇÃO POR UMIDADE" | Estável alto | Caminhada | — |
| **t=40s** | **Assinatura subliminar — Cavidade** | **Hipérbole clássica de vazio começando** | Contraste forte sobre a região do vazio | — | — |
| **t=42s** | **DETECÇÃO 1 — Cavidade/Vazio** | Hipérbole definida na fatia de tempo | Contraste destacado | — | Marcador `[V]` |
| 42-60s | Confirmação por 2 passagens adicionais; estimativa dimensional | Refinamento da assinatura; dimensão estimada 3×2×1m | — | Caminhada | Re-passagens sobre o ponto |
| 60-72s | GPR mergulhando mais fundo; assinatura plana horizontal emergindo | **Assinatura horizontal contínua** (típica de lâmina d'água) | Condutividade ainda mais elevada na zona | — | — |
| **t=73s** | **Assinatura subliminar — Lençol freático** | Linha horizontal contínua a ~4,2m | EMI sobe ainda mais sobre a zona | — | — |
| **t=75s** | **DETECÇÃO 2 — Lençol Freático** | Linha horizontal confirmada | — | — | Marcador `[H2O]` |
| 75-85s | Painel de fusão exibe correlação **Umidade EMI ↔ Lençol** | — | — | — | — |
| 80-90s | F3 — Consolidação + alerta-resumo Defesa Civil + transição | — | — | — | — |

### Detecções consolidadas

| # | Alvo | t (s) | Profundidade (teto) | Dimensão estimada | Observação |
|---|---|---|---|---|---|
| 1 | Cavidade/Vazio | 42 | 2,5m | 3×2×1m | Hipérbole GPR clássica |
| 2 | Lençol freático | 75 | 4,2m | (lâmina contínua) | Correlacionado com EMI alta |

### Fechamento

- t=82s: barra de progresso 100%, "Gerando alerta de risco geotécnico".
- t=85s: card-resumo simbólico para Defesa Civil (vazio + lençol = risco de colapso/subsidência).
- t=87s: hash + transição para bloco 3D.

---

## 6. Cenário 4 — Operação sob Interferência Eletromagnética (CA-06)

**Duração:** 90s | **Solo:** Rochoso com massas metálicas espúrias | **Modalidade:** Carrinho Autônomo | **Área:** 25×25m

**Trajetória implícita:** *raster* regular. Velocidade implícita ~7m²/s. **Cenário obrigatório do CA-06**: deve exibir zonas de degradação e falsos-positivos descartados pela fusão.

### Linha do tempo

| t | Evento | GPR | EMI | IMU | GNSS-RTK | Fusão Multimodal |
|---|---|---|---|---|---|---|
| 00-05s | F0 — Sensores ligando | OFF → ON | OFF → ON | OFF → ON | OFF → ON | — |
| 05-12s | F1 — Warmup; ruído de fundo elevado | Baseline | **Ruído alto desde o início**; indicador "RUÍDO ALTO" piscando | Estável | **FIX RTK** em t=09s | Ativa em t=12s |
| 12-20s | Passadas 1-2; condição instável | Ecos com ruído | Picos espúrios distribuídos | Estável | Raster | Monitorando |
| **t=20s** | **ZONA DE DEGRADAÇÃO 1** entra no campo (faixa NW) | **Faixa marcada com sombreado**; "BAIXA CONFIANÇA" | — | — | — | Confiança reduzida |
| **t=28s** | **FALSO-ECO 1** — popup amarelo "SUSPEITA · MAGNETITA?" | — | Pico isolado destacado | — | Marcador amarelo `[?]` | **Avaliando** |
| **t=32s** | **DESCARTE — Falso-eco 1** | — | Pico reclassificado como ruído | — | Marcador riscado | **DESCARTADO · RUÍDO** |
| 35-45s | Prosseguimento; condição instável | — | Ruído contínuo | — | Raster | — |
| **t=45s** | **FALSO-ECO 2** — popup amarelo "SUSPEITA · MAGNETITA?" | — | Pico isolado destacado | — | Marcador amarelo `[?]` | **Avaliando** |
| **t=48s** | **DESCARTE — Falso-eco 2** | — | Pico reclassificado como ruído | — | Marcador riscado | **DESCARTADO · RUÍDO** |
| **t=50s** | **ZONA DE DEGRADAÇÃO 2** atravessada (faixa SE) | **Faixa marcada com sombreado** | — | — | — | Confiança reduzida |
| 60-72s | Emergência da assinatura GPR real do ouro; fusão estabiliza | **Hipérbole forte emergindo** (ângulo ~50°) | Ruído reduzido na zona do alvo | — | Re-passagens sobre o ponto | Confiança subindo |
| **t=73s** | **Assinatura subliminar — Ouro real** | Hipérbole definida | EMI também responde positivamente (validação cruzada) | — | — | Confiança alta |
| **t=75s** | **DETECÇÃO CONFIRMADA — Ouro** | Confirmação visual reforçada | Confirmação cruzada | — | Marcador verde `[Au · CONFIRMADO]` | **CONFIRMADO (3 sensores)** |
| 75-85s | Refinamento + exibição do contraste antes/depois da fusão | — | — | — | — | Painel de resiliência |
| 80-90s | F3 — Consolidação + relatório de resiliência + transição | — | — | — | — | — |

### Detecções consolidadas

| # | Tipo | t (s) | Status final | Observação |
|---|---|---|---|---|
| — | Zona de degradação NW | 20 | Sinalizada | Faixa de baixa confiança |
| — | Falso-eco 1 (Magnetita?) | 28 → 32 | **Descartado** | Ruído eletromagnético espúrio |
| — | Falso-eco 2 (Magnetita?) | 45 → 48 | **Descartado** | Ruído eletromagnético espúrio |
| — | Zona de degradação SE | 50 | Sinalizada | Faixa de baixa confiança |
| 1 | **Ouro (veio)** | **75** | **Confirmado** | 3,2m, ~50°, validado pelos 3 sensores |

### Fechamento

- t=82s: barra de progresso 100%, "Calculando índice de resiliência".
- t=85s: relatório simbólico — "Sinal recuperado: X% · 2 falsos-positivos descartados · 1 alvo confirmado".
- t=87s: hash + transição para bloco 3D.

### Aderência a CA-06

Este cenário atende ao Critério de Aceitação CA-06 do PRD por exibir, simultaneamente: (a) duas zonas distintas de degradação de sinal explicitamente sinalizadas, (b) ruído magnético constante no EMI desde o warmup, (c) dois falsos-ecos explicitamente descartados pela fusão multimodal, e (d) um alvo real confirmado por validação cruzada de 3 sensores.

---

## 7. Cenário 5 — Inteligência Subsuperficial Integrada — Demonstração GSFS

**Duração:** 135s | **Solo:** Arenoso úmido (transicional) | **Modalidade:** Mochila | **Área:** 20×20m

**Trajetória implícita:** caminhada pedestre intermediária entre orgânica e raster. Velocidade implícita ~3m²/s.

**Enquadramento institucional:** este cenário é o **showcase do diferencial proprietário do GSFS**. A estrutura técnica (4 alvos, 4 sensores, pipeline) é idêntica à dos demais; o que muda é o **enquadramento do fechamento**, que apresenta os 5 atributos centrais da plataforma — **fusão multimodal, inteligência subsuperficial, rastreabilidade, interpretação integrada e apoio à decisão** — em uma sequência visual única (ver §7.3).

### Linha do tempo

| t | Evento | GPR | EMI | IMU | GNSS-RTK | Fusão |
|---|---|---|---|---|---|---|
| 00-05s | F0 — Sensores ligando em sequência cerimonial | OFF → ON | OFF → ON | OFF → ON | OFF → ON | — |
| 05-15s | F1 — Warmup completo | Baseline | Baseline médio (transicional) | Calibração | **FIX RTK** em t=13s | Ativa em t=15s |
| 15-30s | Varredura inicial; baseline em todos sensores; pipeline de 4 fluxos visível | Ecos limpos | Variação suave (transicional) | Caminhada | Trajetória pedestre | Estável |
| **t=38s** | **Assinatura subliminar — Ouro** | **Hipérbole rasa emergindo** | Pico discreto | — | — | — |
| **t=40s** | **DETECÇÃO 1 — Ouro** | Hipérbole definida | — | — | Marcador `[Au]` | Registrado |
| 40-55s | Refinamento ouro + prosseguimento | — | **Pico EMI emergindo** (Magnetita preludindo) | — | — | — |
| **t=58s** | **Assinatura subliminar — Magnetita** | — | Pico forte | — | — | — |
| **t=60s** | **DETECÇÃO 2 — Magnetita** | — | Pico claro | — | Marcador `[M]` | Registrado |
| 60-80s | Trajetória cobre região oeste; GPR mergulhando | **GPR mais fundo, hipérbole de vazio começando** | — | Caminhada | — | — |
| **t=83s** | **Assinatura subliminar — Vazio** | Hipérbole definida em ~4,0m | — | — | — | — |
| **t=85s** | **DETECÇÃO 3 — Vazio** | Hipérbole confirmada | — | — | Marcador `[V]` | Registrado |
| 85-105s | Trajetória final; GPR ainda mais profundo; assinatura horizontal emergindo | **Linha horizontal típica de água em ~4,5m** | Condutividade sobe na zona do bolsão | — | — | — |
| **t=108s** | **Assinatura subliminar — Água** | Linha horizontal contínua | EMI confirma | — | — | — |
| **t=110s** | **DETECÇÃO 4 — Água** | Linha confirmada | — | — | Marcador `[H2O]` | Registrado |
| 110-125s | **Painel "GSFS — Inteligência Subsuperficial Integrada"** se monta no centro, revelando em sequência os 5 atributos do diferencial GSFS (ver §7.3) | — | — | — | — | Fusão consolidada |
| 125-135s | F3 — Selagem da cadeia de custódia (rastreabilidade) + GSFS_RECORD premium + transição para o bloco 3D | — | — | — | — | — |

### Detecções consolidadas

| # | Alvo | t (s) | Profundidade | Observação |
|---|---|---|---|---|
| 1 | Ouro (veio) | 40 | 2,0m | Ângulo ~40°, alvo raso |
| 2 | Magnetita | 60 | 3,0m | Massa pontual |
| 3 | Cavidade/Vazio | 85 | 4,0m | Volume estimado |
| 4 | Água (bolsão) | 110 | 4,5m | Lâmina em bolsão |

### 7.3. Fechamento — Painel "GSFS — Inteligência Subsuperficial Integrada" (5 atributos do diferencial)

Após a quarta detecção (t=110s), a tela é dominada por um painel central que **revela em sequência os 5 atributos centrais do GSFS**. Cada atributo acende como uma faceta do painel, com micro-animação de ~3s e um ícone identificável:

| t | Atributo | O que aparece na tela |
|---|---|---|
| **110-113s** | **Fusão Multimodal** | Os 4 streams de sensor (GPR/EMI/IMU/GNSS-RTK) convergem visualmente para uma única camada de interpretação. Linhas dos 4 sensores se unificam no centro. |
| **113-116s** | **Inteligência Subsuperficial** | A camada unificada se eleva a uma vista interpretativa 3D embrionária do subsolo, ainda translúcida (prelúdio ao bloco 3D final). |
| **116-119s** | **Interpretação Integrada** | Os 4 alvos (Ouro, Magnetita, Vazio, Água) deixam de ser pontos isolados e aparecem **correlacionados** num único quadro consolidado, com profundidade, ângulo e volume. |
| **119-122s** | **Rastreabilidade** | A cadeia de custódia se materializa: timeline da sessão · hash SHA-256 sendo selado · identificador do GSFS_RECORD. |
| **122-125s** | **Apoio à Decisão** | Saídas decision-ready aparecem: classificação por alvo · índice de confiança · botões de exportação simbólica (PDF/GIS/BIM). |

A barra de progresso atinge 100% em t=125s coincidindo com o último atributo.

### 7.4. Consolidação final

- **t=125s:** painel **"GSFS — Inteligência Subsuperficial Integrada"** consolidado com os 5 atributos exibidos simultaneamente por 5s.
- **t=130s:** GSFS_RECORD premium gerado, com listagem dos 4 alvos + hash SHA-256 completo.
- **t=132s:** transição (fade/wipe) para o bloco 3D em 1ª pessoa com os 4 alvos posicionados volumetricamente.

---

## 8. Quadro-resumo de todas as detecções

| Cenário | t (s) | Alvo | Profundidade | Status |
|---|---|---|---|---|
| C1 | 35 | Magnetita | 1,8m | Detecção |
| C1 | 60 | Ouro (veio) | 3,0m | Detecção |
| C2 | 25 | Magnetita A | 1,5m | Detecção |
| C2 | 45 | Magnetita B | 2,2m | Detecção |
| C2 | 68 | Magnetita C | 3,1m | Detecção |
| C3 | 42 | Cavidade/Vazio | 2,5m | Detecção |
| C3 | 75 | Lençol freático | 4,2m | Detecção |
| C4 | 28 → 32 | Falso-eco "Magnetita?" | — | **Descartado** |
| C4 | 45 → 48 | Falso-eco "Magnetita?" | — | **Descartado** |
| C4 | 75 | Ouro (veio) | 3,2m | **Confirmado por fusão** |
| C5 | 40 | Ouro (veio) | 2,0m | Detecção |
| C5 | 60 | Magnetita | 3,0m | Detecção |
| C5 | 85 | Cavidade/Vazio | 4,0m | Detecção |
| C5 | 110 | Água (bolsão) | 4,5m | Detecção |

**Total:** 12 detecções confirmadas + 2 falsos-positivos descartados (CA-06).

---

## 9. Aderência aos Critérios de Aceitação do PRD

| Critério | Como o roteiro atende |
|---|---|
| **CA-01** Pipeline completo (autoteste → exportação) | Cada cenário cobre F0 (residual do boot) → F3 (consolidação e transição para bloco 3D + GSFS_RECORD). |
| **CA-02** Coerência simultânea entre os 4 sensores | Cada beat da timeline especifica o comportamento dos 4 sensores. |
| **CA-03** Geração sistemática do GSFS_RECORD ao final | Todos os 5 cenários terminam com geração de hash e GSFS_RECORD na F3. |
| **CA-04** Bloco 3D final condizente com a trajetória e alvos | Os marcadores plotados em cada detecção alimentam diretamente o bloco 3D final. |
| **CA-05** Percurso contínuo de varredura | Trajetórias por modalidade são contínuas; sem saltos de tela. |
| **CA-06** Ruído/interferência em ao menos 1 cenário | **Cenário 4 inteiramente dedicado a este requisito.** |
| **CA-07** Modo Replay determinístico | Como toda a timeline é determinística por design, o replay é o mesmo arquivo reproduzido. |
| **CA-08** Ausência de claims técnicos fechados | Valores expressos como "simbólicos", "estimados" ou "simulados" — sem garantias absolutas. |

---

## 10. Itens dependentes (a fechar após validação deste roteiro)

1. **Teto de métricas (Ponto em Aberto nº 6 do PRD)** — definir quais valores numéricos desta timeline são exibidos com precisão (ex: profundidade em 0,1m) versus qualitativos (ex: "alta confiança").
2. **Layout do arquivo exportado (Ponto em Aberto nº 4 do PRD)** — definir como os eventos desta timeline aparecem no relatório simbólico final.
3. **Roteiro de narração do apresentador** — opcional, fora do escopo deste documento, mas recomendado para apresentações ao vivo (script falado sincronizado com a timeline).

---

## 11. Validação do cliente — ✅ VR-01…VR-05 aprovados (28/05 + C5 v0.2 em 02/06)

- [x] **VR-01:** Aprovação da duração-alvo (90s para C1-C4, 135s para C5).
- [x] **VR-02:** Aprovação dos momentos exatos de detecção em cada cenário.
- [x] **VR-03:** Confirmação de que o Cenário 4 atende plenamente ao CA-06 com 2 falsos-positivos descartados + 2 zonas de degradação + 1 alvo real confirmado.
- [x] **VR-04:** Aprovação do padrão das 3 micro-fases de detecção (assinatura subliminar → rótulo → refinamento).
- [x] **VR-05:** Aprovação do painel "**GSFS — Inteligência Subsuperficial Integrada**" como destaque visual de fechamento do Cenário 5, revelando em sequência os 5 atributos do diferencial GSFS (fusão multimodal, inteligência subsuperficial, interpretação integrada, rastreabilidade, apoio à decisão). *(Cenário 5 reformulado em v0.2 — [D-011]; **validado pelo cliente em 02/06**.)*

---

*Roteiro **aprovado integralmente** pelo cliente (VR-01 a VR-04 em 28/05; VR-05 / Cenário 5 v0.2 em 02/06). É referência normativa para a implementação determinística na Fase 3.*
