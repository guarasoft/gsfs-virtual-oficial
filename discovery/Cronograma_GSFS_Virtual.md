# Cronograma de Desenvolvimento — GSFS Virtual

**Projeto:** GSFS Virtual — Simulador Técnico-Institucional
**Responsável Técnico:** Jonathan — Result
**Ferramenta:** Código TypeScript (fallback técnico acionado — ver [D-001](Decisoes_GSFS_Virtual.md#d-001--acionar-o-fallback-tecnico-typescript-em-lugar-do-figma-make) / [D-002](Decisoes_GSFS_Virtual.md#d-002--adotar-stack-react--vite--tailwind--zustand--r3f--framer-motion))
**Modalidade:** Execução individual
**Referência:** PRD v0.3, validado em 19/05/2026
**Atualização:** 03/06/2026 — Fase 1 entregue como protótipo em código ([D-014]); menções a "Figma Make" alinhadas ao código ([D-001]/[D-002])

---

## 1. Premissas

- Execução individual no que diz respeito a design, prototipação e integração
- Produção dos ativos 3D dos 5 cenários ficará sob responsabilidade de terceiro (a definir), com entrega para integração na Fase 4
- Os 6 pontos em aberto do PRD v0.3 são resolvidos na Fase 0, parte como proposta a ser aprovada pelo cliente, parte como definição de responsabilidades

---

## 2. Visão geral em fases

| Fase | Conteúdo | Duração |
|---|---|---|
| **Fase 0** | Cenários e desbloqueio de pendências | 3 dias |
| **Fase 1** | Arquitetura de informação e fluxos | 1 semana |
| **Fase 2** | Design visual e UI Kit | 1 semana |
| **Fase 3** | Desenho das telas em alta fidelidade em código (com interatividade) | 3 semanas |
| **Fase 4** | Integração das peças 3D dos 5 cenários | 1 semana |
| **Fase 5** | Testes e polimento | 1 semana |

**Duração total: aproximadamente 7,5 semanas de execução. O prazo não considera iterações e ajustes de validações com cliente.**

---

## 3. Detalhamento das fases

### Fase 0 — Cenários e desbloqueio de pendências (3 dias)

**Objetivo:** consolidar os 6 pontos em aberto do PRD v0.3, parte como proposta a ser aprovada pelo cliente, parte como definição de responsabilidade.

| Atividade | Responsabilidade | Forma de resolução |
|---|---|---|
| Proposta de matriz narrativa dos 5 cenários (solos × aplicação × objetos × roteiro) | Result (Jonathan) | Documento de proposta enviado ao cliente para aprovação |
| Definição de responsabilidade pela produção das peças 3D | Result (Jonathan) | Acordo formal; produção delegada a terceiro |
| Coleta da identidade de marca (paleta, tipografia, logo) | Cliente | Solicitação formal ao cliente |
| Teto de métricas (quais valores aparecem com precisão vs. qualitativos) | Result (Jonathan), em conjunto com o cliente | Definição acordada e documentada |
| Layout simbólico do arquivo exportado | Result (Jonathan) | Definição interna documentada |
| Roteiro técnico (momentos de detecção em cada cenário) | Result (Jonathan) | Documento enviado ao cliente para aprovação |

**Marco de saída:** documento de fechamento da Fase 0, com a matriz de cenários proposta, teto de métricas e definição de responsabilidades documentadas e enviadas ao cliente.

**Bloqueios para Fase 1:** a Fase 1 inicia após o **fechamento formal da Fase 0** — isto é, após as validações do cliente (cenários, roteiro, teto de métricas, identidade) e a definição de responsabilidade pela produção 3D.

---

### Fase 1 — Arquitetura de informação e fluxos (1 semana)

**Objetivo:** definir fluxos de navegação completos e estrutura de cada tela em baixa fidelidade.

Atividades:

- Mapa de fluxos completo cobrindo todo o ciclo: boot → setup → varredura → resultado → replay → exportação
- Wireframes em baixa fidelidade de cada tela do PRD
- Definição das transições, estados e variações entre telas
- Documentação das interações principais para guiar a Fase 3

**Marco de saída:** wireframes cobrindo todos os fluxos do PRD.

> **Execução (03/06/2026):** entregue como **protótipo navegável em código** ([D-014]) — `app/`, modo wireframe, referência tablet 1280×800. Jornada consolidada em **7 etapas** ([D-016]). Mapa de fluxos, estados e transições documentados em [Arquitetura_Informacao_Fase1_GSFS_Virtual.md](Arquitetura_Informacao_Fase1_GSFS_Virtual.md). Concluída internamente (03/06) e **aprovada pelo cliente em 05/06** — [D-015] (abortar/reiniciar) validado e [D-017] (replay com dados da missão) incorporado.

---

### Fase 2 — Design visual e UI Kit (1 semana)

**Objetivo:** construir a linguagem visual e os componentes que serão usados em todas as telas.

Atividades:

- Estudo de referências (ruggedized UI, painéis industriais, telas de mineração)
- Sistema de cores funcional aplicando a identidade de marca recebida do cliente
- Tipografia e tom visual consolidados
- Componentes base: botões, inputs, modais, cards
- Componentes específicos: HUD, painéis de sensor, indicadores de bateria/temperatura, mapa
- Iconografia para sensores, status e ações
- Documentação curta do UI Kit

**Marco de saída:** UI Kit consolidado.

**Dependência:** identidade de marca recebida do cliente. Caso não tenha sido enviada até o início da fase, segue-se com proposta interna alinhada ao tom industrial do produto.

---

### Fase 3 — Desenho das telas em alta fidelidade em código (3 semanas)

**Objetivo:** produzir todas as telas finais em **código** (React + Vite + TypeScript — [D-001]/[D-002]), continuando o protótipo da Fase 1, com interatividade e comportamento dinâmico integrados desde a construção.

Atividades:

- Continuação do protótipo da Fase 1 (estrutura de código já estabelecida em `app/`)
- Construção de todas as telas em alta fidelidade aplicando o UI Kit (estrutura conforme o [doc de IA da Fase 1](Arquitetura_Informacao_Fase1_GSFS_Virtual.md) — 7 etapas):
  - Boot e autoteste
  - Seleção de cenário
  - Configuração de missão
  - Execução de varredura (HUD persistente + 4 painéis de sensor + indicadores)
  - Detecção e classificação em tempo real
  - Resultado final com placeholder para bloco 3D
  - Listagem de gravações
  - Replay
  - Exportação simbólica
  - Modais auxiliares (confirmações) e segurança/cadeia de custódia — integrada à E5/E6 na Fase 1; tela dedicada só se o cliente solicitar
- Implementação das reatividades dinâmicas obrigatórias (relógio real, bateria proporcional ao tempo de tela)
- Animações dos 4 painéis de sensor (GPR, EMI, IMU, GPS/RTK) com variação dinâmica
- Lógica determinística dos 5 cenários (mesmo input = mesmo output)
- Implementação do modo replay
- Simulação dos comportamentos de exportação e segurança

**Marco de saída:** simulador navegável de ponta a ponta, com todas as telas funcionais, faltando apenas a integração dos vídeos 3D finais.

---

### Fase 4 — Integração das peças 3D dos 5 cenários (1 semana)

**Objetivo:** integrar os vídeos 3D produzidos pelo terceiro nas telas de resultado de cada cenário.

Atividades:

- Recebimento e validação técnica dos 5 vídeos 3D
- Ajustes de formato, recorte e otimização para web
- Integração de cada vídeo na tela de resultado do cenário correspondente
- Sincronização das transições entre o final da varredura e a exibição do 3D
- Testes de comportamento dos vídeos durante o replay

**Dependência crítica:** entrega dos 5 vídeos pelo terceiro responsável.

**Risco:** atraso na entrega dos vídeos compromete diretamente esta fase e a seguinte. Mitigação: alinhamento de prazo com o produtor terceiro logo na Fase 0, garantindo entrega até o início da Fase 4.

---

### Fase 5 — Testes e polimento (1 semana)

**Objetivo:** garantir que o simulador rode sem falhas em apresentação ao vivo.

Atividades:

- Execução dos 5 cenários do começo ao fim, identificando bugs e travamentos
- Teste em diferentes resoluções (tablet, notebook, projetor)
- Ajustes de performance (alvo >30 FPS)
- Polimento de transições e micro-interações
- Revisão final de textos, números e consistência visual

**Marco de saída:** simulador estável, sem bugs perceptíveis em apresentação, pronto para entrega ao cliente.

---

## 4. Riscos e mitigações

| Risco | Impacto | Mitigação |
|---|---|---|
| Demora do cliente em validar a Fase 0 | Atraso no início da Fase 1 | Comunicação proativa; priorizar validações, em especial o Teto de Métricas; pacote de fechamento objetivo |
| Demora do cliente em fornecer identidade de marca | Atraso no início da Fase 2 | Identidade já documentada e proposta; depende apenas de validação do cliente |
| Atraso na entrega dos vídeos 3D pelo terceiro | Bloqueio da Fase 4 | Alinhar prazo com produtor na Fase 0; integrar com placeholders durante Fase 3 |
| Limitações técnicas do Figma Make | ✅ Mitigado — fallback de código acionado ([D-001]); protótipo em React+Vite+TS desde a Fase 1 | — |
| Projetos paralelos consumindo o tempo previsto | Estouro de prazo | Comunicação proativa sobre semanas críticas |

---

## 5. Resumo para registro em ata

- **Duração estimada:** aproximadamente 7,5 semanas de execução. O prazo não considera iterações e ajustes de validações com cliente.
- **Modalidade:** execução individual
- **Ferramenta:** Código — React + Vite + TypeScript (fallback técnico acionado — [D-001]/[D-002])
- **Produção dos ativos 3D:** sob responsabilidade de terceiro, a ser definido na Fase 0

---

## 6. Fallback técnico — ✅ ACIONADO

O fallback foi **acionado em 26/05/2026** ([D-001]): após a análise dos requisitos (4 painéis dinâmicos simultâneos, bloco 3D, relógio/bateria reais, replay determinístico), optou-se por desenvolver o protótipo diretamente em **código TypeScript** (React + Vite + Tailwind + Zustand + R3F + Framer Motion — [D-002]), em vez de Figma Make, preservando o mesmo escopo funcional e visual do PRD v0.3.

---

*Cronograma sujeito a ajuste conforme andamento e necessidades validadas em reunião.*
