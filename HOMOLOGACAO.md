# GSFS Virtual — Relatório de Testes e Homologação

**Versão homologada:** v1.0.0
**Data da bateria de homologação:** 10/08/2026
**Objeto:** build de produção do simulador (`app/`, `npm run build`)
**Marco de saída:** simulador navegável de ponta a ponta, determinístico e estável nos cinco cenários de referência — **atingido**.

---

## 1. Escopo da homologação

Conforme previsto no cronograma técnico (Fase de Testes e Polimento), a bateria cobriu:

- **Execução dos cinco cenários (C1–C5) do começo ao fim** — jornada completa E1 → E7 (boot/autoteste, menu, setup, varredura, resultado com bloco 3D, replay com bloco 3D final e exportação);
- **Testes em diferentes resoluções** — 1280×800 (referência tablet), 1920×1080 (desktop) e 1366×768 (notebook);
- **Identificação de bugs e travamentos** — monitoramento de exceções de página e erros de console em todas as execuções;
- **Verificação de determinismo** — execuções independentes do mesmo cenário comparadas entre si;
- **Revisão de textos, números e consistência visual** — governada pelo Teto de Métricas ([`discovery/Teto_Metricas_GSFS_Virtual.md`](discovery/Teto_Metricas_GSFS_Virtual.md)) e pela verificação visual por capturas.

## 2. Método

Bateria automatizada (Playwright + Chromium) executada sobre o **build de produção**, com interação real de interface (cliques, seleção de cenário, navegação entre etapas) e tempo real de operação (varredura e replay completos de 90 s por cenário). Cada execução registrou capturas de tela por etapa e coletou **todos** os erros de console e exceções de página. O script está versionado em [`app/scripts/homolog.mjs`](app/scripts/homolog.mjs) e o log estruturado da bateria em [`docs/homologacao/homolog-log.json`](docs/homologacao/homolog-log.json) — a bateria é **reproduzível** por qualquer equipe.

## 3. Execuções e resultados

| # | Cenário | Resolução | Jornada | Exceções | Erros de console |
|---|---|---|---|---|---|
| 1 | C1 — Veio de Ouro em Encosta Rochosa | 1280×800 | E1→E7 completa | 0 | 0¹ |
| 2 | C2 — Levantamento de Massa Magnetítica | 1280×800 | E1→E7 completa | 0 | 0 |
| 3 | C3 — Cavidade Subterrânea em Solo Saturado | 1280×800 | E1→E7 completa | 0 | 0 |
| 4 | C4 — Operação sob Interferência Eletromagnética | 1280×800 | E1→E7 completa | 0 | 0 |
| 5 | C5 — Inteligência Subsuperficial Integrada | 1280×800 | E1→E7 completa | 0 | 0 |
| 6 | C1 (varredura de resolução) | 1920×1080 | E1→E6 | 0 | 0 |
| 7 | C1 (varredura de resolução) | 1366×768 | E1→E6 | 0 | 0 |

¹ A primeira execução identificou um único apontamento: requisição 404 do favicon (ícone da aba do navegador ausente). **Corrigido nesta mesma rodada** (favicon GSFS adicionado ao app) e re-verificado: zero erros. Este é o registro de "identificação de bugs" da bateria — nenhum outro defeito, travamento ou exceção foi observado.

### Determinismo

Três execuções independentes do cenário C1 (em resoluções e sessões distintas) produziram **resultados idênticos** — mesmos alvos, mesmas profundidades, mesmo volume cúbico e mesma composição do bloco 3D — variando apenas data/hora reais da operação, conforme projetado. O determinismo é garantido por arquitetura (timeline determinística por cenário) e verificado também pela suíte automatizada.

### Suíte de testes automatizada

**200 testes (Vitest)** em 22 arquivos, cobrindo o motor do simulador (timeline determinística, varredura, dados dos 5 cenários, registros GSFS_RECORD), as sete etapas E1–E7, o bloco 3D (spec de cena por cenário, componente com fallback sem WebGL) e os componentes de UI. A suíte **roda automaticamente a cada push** no workflow de publicação — o simulador nunca é publicado sem os 200 testes passarem. Resultado visível publicamente na aba *Actions* do repositório.

## 4. Evidências

Capturas de todas as etapas de todas as execuções (52 imagens, geradas pela bateria) em [`docs/homologacao/evidencias/`](docs/homologacao/evidencias/):

- `c1-*` … `c5-*` — jornada completa por cenário na resolução de referência (boot, menu, setup, varredura, resultado 3D, replay, encerramento 3D, exportação);
- `c1-1920x1080-*` e `c1-1366x768-*` — varredura de resoluções.

Complementarmente, o repositório mantém as 42 capturas de verificação visual produzidas durante o desenvolvimento ([`app/shots/`](app/shots/)) e as validações formais do cliente registradas no histórico do projeto (Fase 3 em 24/06; componente 3D em 10/07).

## 5. Disponibilização da versão homologada

- **Tag `v1.0.0`** — marca exata do código homologado;
- **Publicação online** — a versão homologada é a publicada via GitHub Pages (workflow do repositório), em URL própria do titular do repositório;
- **Execução offline** — `npm run build` gera o pacote estático auto-contido; `npm run build:viewer` gera o viewer 3D em arquivo único. Procedimentos no [`ENTREGA.md`](ENTREGA.md).

## 6. Conclusão

A bateria de homologação confirma o que o Relatório Técnico Final declara: o GSFS Virtual é um **simulador navegável de ponta a ponta, determinístico e estável nos cinco cenários de referência**, pronto para uso em apresentações e para evolução futura por qualquer equipe técnica.

---

<p align="center"><sub>GSFS Virtual — homologação v1.0.0 · GuaráSoft · 10/08/2026</sub></p>
