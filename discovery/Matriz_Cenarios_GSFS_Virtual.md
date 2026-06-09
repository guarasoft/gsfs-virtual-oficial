# Matriz Narrativa dos 5 Cenários — GSFS Virtual

**Projeto:** GSFS Virtual — Simulador Técnico-Institucional
**Documento:** Proposta de Matriz de Cenários para validação do cliente
**Versão:** 0.2 (Cenário 5 reforçado como showcase institucional GSFS — feedback do cliente)
**Data:** 28/05/2026
**Responsável Técnico:** Jonathan — Result
**Referência normativa:** PRD GSFS Virtual v0.3 (19/05/2026)

---

## 1. Objetivo do documento

Resolver o **Ponto em Aberto nº 1 do PRD v0.3 (seção 9)** — *"Matriz de Narrativa dos 5 Cenários: validação da proposta de solos e minérios"* — formalizando a proposta dos 5 cenários determinísticos fixos previstos na **seção 5.6** do PRD, em conformidade com os Critérios de Aceitação Técnica (seção 7) e os Princípios Técnicos Fundamentais (seção 2.4).

---

## 2. Princípios de construção da matriz

A matriz foi construída para garantir aderência integral às restrições do PRD:

| Restrição do PRD | Como a matriz atende |
|---|---|
| 5 cenários determinísticos (5.6) | 5 cenários fixos, mesmo input → mesmo output |
| Escolha pelo apresentador (5.6) | Cenários acionáveis individualmente, sem dependência entre si |
| Ao menos 1 cenário com degradação de sinal e ruído magnético (5.6 / CA-06) | Cenário 4 dedicado a este requisito |
| Cobertura dos 3 tipos de solo (5.2) | Rochoso, Arenoso e Úmido contemplados |
| Cobertura das 3 modalidades (5.2) | Carrinho Autônomo, Mochila e Manual contempladas |
| Alvos exemplares (5.4): Ouro, Magnetita, Vazio, Água | Todos os 4 presentes, com profundidades e ângulos distintos |
| Profundidade máxima de 5m (8.2) | Nenhum alvo excede 5m |
| Persona primário mineração + secundário Defesa Civil (3.1) | 4 cenários de mineração + 1 de Defesa Civil/Geotecnia |
| Coerência do pipeline (2.4.3): Aquisição → Fusão → Interpretação → Visualização → GSFS_RECORD | Cada cenário fecha o pipeline completo |
| Caráter simbólico e plausível (2.4.2) | Alvos, profundidades e roteiros são plausíveis, sem claims técnicos fechados |

---

## 3. Matriz consolidada dos 5 cenários

| # | Nome do cenário | Solo | Modalidade | Área | Aplicação primária | Alvos principais (profundidade) | Diferencial técnico demonstrado |
|---|---|---|---|---|---|---|---|
| 1 | Veio de Ouro em Encosta Rochosa | Rochoso | Manual | 10×10m | Prospecção mineral (mineração) | Ouro em veio (3,0m); Magnetita acessória (1,8m) | Penetração GPR em meio denso; precisão GNSS/RTK em terreno irregular |
| 2 | Levantamento de Massa Magnetítica | Arenoso | Carrinho Autônomo | 20×20m | Mapeamento de minério ferroso (mineração) | Magnetita (1,5m / 2,2m / 3,1m, três massas) | Mapa de calor EMI dominante; varredura sistemática autônoma |
| 3 | Cavidade Subterrânea em Solo Saturado | Úmido | Mochila | 15×15m | Inspeção de risco geotécnico (Defesa Civil) | Vazio/cavidade (2,5m); Água/lençol freático (4,2m) | GPR identificando vazios; IMU compensando terreno irregular; correlação de umidade pela EMI |
| 4 | Operação sob Interferência Eletromagnética | Rochoso com massas metálicas espúrias | Carrinho Autônomo | 25×25m | Demonstração de resiliência operacional (mineração) | Ouro (3,2m) sob interferência; falsos-ecos magnéticos suprimidos pela fusão | **Cenário obrigatório CA-06**: zonas de degradação de sinal e ruído magnético; fusão multimodal corrigindo o ruído |
| 5 | Inteligência Subsuperficial Integrada — Demonstração GSFS | Arenoso úmido (transicional) | Mochila | 20×20m | Demonstração institucional dos diferenciais GSFS (fusão multimodal, inteligência subsuperficial, rastreabilidade, interpretação integrada, apoio à decisão) | Ouro (2,0m); Magnetita (3,0m); Vazio (4,0m); Água (4,5m) | Os 4 alvos servem de evidência para os 5 atributos centrais do GSFS, exibidos em sequência no fechamento |

---

## 4. Detalhamento por cenário

### Cenário 1 — Veio de Ouro em Encosta Rochosa

- **Narrativa institucional:** Equipe de prospecção mineral opera em encosta rochosa de difícil acesso. Modalidade Manual escolhida pela topografia. Demonstra a capacidade do equipamento em terreno hostil clássico de mineração de ouro.
- **Solo:** Rochoso, alta densidade, baixa condutividade.
- **Modalidade / Área:** Manual / 10×10m.
- **Alvos determinísticos:**
  - Veio de Ouro — profundidade 3,0m, ângulo do veio aproximadamente 65°, extensão lateral ~4m.
  - Magnetita acessória — profundidade 1,8m, massa pontual.
- **Comportamento dos sensores:**
  - GPR: ecos fortes e definidos em meio rochoso.
  - EMI: baixa condutividade de fundo, picos discretos sobre a magnetita.
  - IMU: variação de pitch/roll perceptível (terreno irregular).
  - GNSS/RTK: fixação estável; trajetória em zigue-zague manual.
- **Métricas-chave exibidas:** profundidade do veio, ângulo estimado, volume cúbico simbólico.
- **Vínculo com Pilar:** destaque para Pilar 1 (Visualização) e Pilar 2 (Telemetria GNSS/RTK em terreno desafiador).

### Cenário 2 — Levantamento de Massa Magnetítica

- **Narrativa institucional:** Operação sistemática em campo aberto sobre depósito de minério ferroso. Modalidade Carrinho Autônomo executa varredura organizada. Demonstra a precisão do mapa de calor EMI e a autonomia operacional.
- **Solo:** Arenoso, baixa densidade, condutividade moderada.
- **Modalidade / Área:** Carrinho Autônomo / 20×20m.
- **Alvos determinísticos:**
  - Massa magnetítica A — profundidade 1,5m, área aproximada 2×2m.
  - Massa magnetítica B — profundidade 2,2m, área aproximada 3×2m.
  - Massa magnetítica C — profundidade 3,1m, área aproximada 1,5×1,5m.
- **Comportamento dos sensores:**
  - GPR: ecos uniformes em solo arenoso.
  - EMI: picos altos e nítidos no mapa de calor, formando padrão geométrico das massas.
  - IMU: drift baixo (trajetória regular do carrinho).
  - GNSS/RTK: padrão de varredura em malha regular.
- **Métricas-chave exibidas:** intensidade EMI por célula, profundidade média, volume agregado simbólico.
- **Vínculo com Pilar:** destaque para Pilar 1 (Mapa de Calor EMI) e Pilar 3 (Aquisição Sintética).

### Cenário 3 — Cavidade Subterrânea em Solo Saturado (Defesa Civil)

- **Narrativa institucional:** Equipe de Defesa Civil inspeciona área de risco geotécnico após chuvas intensas, buscando cavidades subterrâneas e lençol freático elevado. Modalidade Mochila pela acessibilidade restrita. Demonstra aplicação dual-use do equipamento.
- **Solo:** Úmido, alta condutividade, atenuação GPR moderada.
- **Modalidade / Área:** Mochila / 15×15m.
- **Alvos determinísticos:**
  - Cavidade/vazio subterrâneo — profundidade do teto 2,5m, dimensão aproximada 3×2×1m.
  - Lençol freático — profundidade da lâmina 4,2m.
- **Comportamento dos sensores:**
  - GPR: assinatura clássica de vazio (hipérbole de reflexão); atenuação acentuada abaixo do lençol.
  - EMI: condutividade elevada uniforme (umidade); contraste forte sobre o vazio.
  - IMU: oscilação compatível com caminhada (operador a pé com mochila).
  - GNSS/RTK: trajetória orgânica de inspeção pedestre.
- **Métricas-chave exibidas:** volume do vazio, profundidade do teto, profundidade do lençol freático.
- **Vínculo com Pilar:** destaque para Pilar 1 (detecção de cavidades) e Pilar 3 (fusão multimodal correlacionando umidade e descontinuidade).

### Cenário 4 — Operação sob Interferência Eletromagnética (Cenário CA-06)

- **Narrativa institucional:** Operação de mineração em zona com forte ruído magnético natural (massas espúrias, formações geológicas com magnetismo residual). Demonstra resiliência operacional e a capacidade da fusão multimodal de discriminar sinal de ruído. **Este é o cenário que atende ao requisito CA-06 do PRD.**
- **Solo:** Rochoso com massas metálicas espúrias distribuídas.
- **Modalidade / Área:** Carrinho Autônomo / 25×25m.
- **Alvos determinísticos:**
  - Ouro real — profundidade 3,2m, ângulo do veio aproximadamente 50°, validado pela fusão multimodal.
  - Falsos-ecos magnéticos — duas a três regiões marcadas inicialmente como suspeitas e posteriormente descartadas pela fusão (Magnetita "fantasma").
  - Zonas de degradação de sinal — duas faixas do mapa explicitamente sinalizadas com baixa confiança.
- **Comportamento dos sensores:**
  - GPR: ecos atenuados nas zonas de degradação, com indicação visual de baixa confiança.
  - EMI: picos espúrios distribuídos, alguns descartados após fusão.
  - IMU: estável (carrinho).
  - GNSS/RTK: fixação centimétrica mantida.
- **Métricas-chave exibidas:** índice de confiança por região, contraste antes/depois da fusão, alvos confirmados vs. descartados.
- **Vínculo com Pilar:** destaque para Pilar 3 (Fusão Multimodal Simbólica + Simulação de Degradação de Sinal). Atende diretamente ao Critério de Aceitação CA-06.

### Cenário 5 — Inteligência Subsuperficial Integrada — Demonstração GSFS

- **Narrativa institucional:** Cenário de fechamento institucional, posicionado como **showcase do diferencial proprietário do GSFS**, não como mera demonstração multi-alvo. A área transicional com 4 tipos distintos de alvo é o substrato técnico; o protagonista visual é a **plataforma GSFS** entregando, no mesmo fluxo: (1) **fusão multimodal** dos 4 sensores em uma única camada de interpretação, (2) **inteligência subsuperficial** elevando dado bruto a interpretação 3D, (3) **rastreabilidade** via cadeia de custódia e GSFS_RECORD, (4) **interpretação integrada** correlacionando os 4 alvos em um quadro único e (5) **apoio à decisão** com saídas decision-ready (classificação, confiança, exportação). Audiência-alvo: investidores, FINEP/EMBRAPII, mineradoras e parceiros de pesquisa. Modalidade Mochila pela flexibilidade.
- **Solo:** Arenoso úmido / transicional, condutividade variável.
- **Modalidade / Área:** Mochila / 20×20m.
- **Alvos determinísticos:**
  - Ouro — profundidade 2,0m, ângulo do veio aproximadamente 40°.
  - Magnetita — profundidade 3,0m, massa pontual.
  - Vazio/cavidade — profundidade do teto 4,0m.
  - Água/bolsão — profundidade 4,5m.
- **Comportamento dos sensores:**
  - GPR: assinaturas distintas por tipo de alvo, exibidas em sequência.
  - EMI: variação de condutividade refletindo a transição arenoso → úmido.
  - IMU: padrão pedestre estável.
  - GNSS/RTK: malha de varredura intermediária entre manual e autônomo.
- **Métricas-chave exibidas:** quadro consolidado de 4 alvos com profundidade, ângulo (quando aplicável) e volume cúbico estimado.
- **Vínculo com Pilar:** demonstração simultânea dos 4 Pilares do PRD; pipeline completo de Aquisição → Fusão → Interpretação → Visualização → GSFS_RECORD. Os 4 alvos (Ouro, Magnetita, Vazio, Água) funcionam como evidências dos **5 diferenciais GSFS** apresentados no fechamento (ver Roteiro Técnico §7).

---

## 5. Cobertura cruzada (auditoria de aderência ao PRD)

| Elemento exigido pelo PRD | C1 | C2 | C3 | C4 | C5 |
|---|---|---|---|---|---|
| Solo Rochoso | ● | | | ● | |
| Solo Arenoso | | ● | | | ● (transicional) |
| Solo Úmido | | | ● | | ● (transicional) |
| Modalidade Manual | ● | | | | |
| Modalidade Carrinho Autônomo | | ● | | ● | |
| Modalidade Mochila | | | ● | | ● |
| Alvo Ouro | ● | | | ● | ● |
| Alvo Magnetita | ● | ● | | ● (fantasma) | ● |
| Alvo Vazio | | | ● | | ● |
| Alvo Água | | | ● | | ● |
| Degradação de sinal + ruído (CA-06) | | | | ● | |
| Persona Mineração (primário) | ● | ● | | ● | ● |
| Persona Defesa Civil (secundário) | | | ● | | |
| Profundidade ≤ 5m (8.2) | ● | ● | ● | ● | ● |

Todos os requisitos explícitos do PRD estão cobertos por pelo menos um cenário.

---

## 6. Itens dependentes (a fechar após validação desta matriz)

Os itens abaixo só podem ser detalhados após a aprovação desta matriz pelo cliente, e serão tratados como documentos derivados:

1. **Roteiro técnico (Ponto em Aberto nº 3 do PRD)** — definição dos *momentos exatos*, em segundos, em que cada detecção brota na tela durante cada cenário. Documento separado, a produzir.
2. **Teto de métricas (Ponto em Aberto nº 6 do PRD)** — definição de quais valores numéricos (latência, profundidade, RTK, etc.) são exibidos com precisão e quais permanecem qualitativos. Documento separado, a alinhar com o cliente.
3. **Layout do arquivo exportado (Ponto em Aberto nº 4 do PRD)** — modelo visual do relatório simbólico gerado ao final de cada cenário.

---

## 7. Validação do cliente — ✅ aprovada integralmente (incl. Cenário 5 v0.2)

Matriz aprovada pelo cliente em 28/05; o ajuste do **Cenário 5** (reforço como showcase institucional — [D-011], implementado nesta v0.2) foi **validado em definitivo em 02/06**. Validação completa, sem pendências.

- [x] **V-01:** Aprovação dos 5 cenários propostos (nomes, solos, modalidades e alvos). *(C5 v0.2 validado em 02/06)*
- [x] **V-02:** Confirmação de que o Cenário 3 (Defesa Civil / Geotecnia) representa adequadamente o uso secundário previsto no PRD.
- [x] **V-03:** Confirmação de que o Cenário 4 atende ao requisito CA-06 (degradação de sinal e ruído magnético).
- [x] **V-04:** Aprovação das profundidades e ângulos propostos, à luz do princípio de plausibilidade técnica (PRD 2.4.2).
- [x] **V-05:** Confirmação de que nenhum cenário introduz claims técnicos fechados (PRD CA-08).

---

*Matriz **aprovada integralmente** pelo cliente (28/05 + aval final do Cenário 5 v0.2 em 02/06). É referência normativa para o Roteiro Técnico (Fase 0) e para o Design das Telas (Fases 1 a 3).*
