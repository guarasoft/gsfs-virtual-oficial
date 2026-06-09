# Stack Técnica do Protótipo — GSFS Virtual

**Projeto:** GSFS Virtual — Simulador Técnico-Institucional
**Documento:** Formalização da stack técnica adotada (acionamento do fallback)
**Versão:** 0.1 (Decisão Formalizada)
**Data:** 26/05/2026
**Responsável Técnico:** Jonathan — Result
**Referências normativas:**
- PRD GSFS Virtual v0.3 (19/05/2026), seção 2.5
- Cronograma GSFS Virtual, seção 6 (Fallback técnico)

---

## 1. Objetivo do documento

Formalizar a **decisão de acionamento do fallback técnico** previsto na seção 6 do Cronograma — substituição do Figma Make por **desenvolvimento em TypeScript** — e definir explicitamente a stack tecnológica adotada para a implementação do protótipo.

Esta decisão afeta diretamente as Fases 1, 2, 3, 4 e 5 do cronograma e deve ser comunicada formalmente ao cliente como parte do fechamento da Fase 0.

---

## 2. Decisão

A implementação do GSFS Virtual será feita em **código TypeScript** com a seguinte stack:

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Linguagem | **TypeScript** | Tipagem estática para reduzir defeitos em apresentações ao vivo (PRD 6 — estabilidade obrigatória). |
| Framework UI | **React 18+** | Maior ecossistema; ampla disponibilidade de componentes industriais; afinidade com Figma Make (que gera código baseado em React/HTML). |
| Build tool | **Vite** | HMR rápido em desenvolvimento; bundle otimizado em produção; padrão moderno. |
| Estilização | **Tailwind CSS** | Iteração rápida em UI ruggedized/industrial; classes utilitárias evitam CSS órfão. |
| Estado global | **Zustand** | Leve, sem boilerplate, suficiente para o estado de varredura/sensores; não requer Provider tree. |
| Renderização 3D | **React Three Fiber (R3F)** + Three.js | R3F é o padrão para integração 3D em React; pipeline declarativo combina com o restante. Usado no bloco 3D do resultado final. |
| Animação | **Framer Motion** | Animação declarativa dos 4 painéis de sensor (GPR/EMI/IMU/GNSS-RTK); transições entre telas. |
| Roteamento | **React Router** | Navegação entre telas (boot → setup → varredura → resultado → replay → exportação). |
| Testes | **Vitest** + **React Testing Library** | Para regressões em telas determinísticas. |
| Lint/Format | **ESLint + Prettier** | Padronização. |
| Deploy alvo | Static build (compatível com qualquer servidor estático ou local file:// para demos offline) | PRD 5 — apresentações ao vivo demandam autonomia operacional. |

---

## 3. Justificativa do acionamento do fallback

A seção 6 do Cronograma prevê o uso de código (TypeScript) "caso sejam identificadas incompatibilidades ou limitações do Figma Make que inviabilizem a entrega dos requisitos previstos no PRD v0.3, preservando o mesmo escopo funcional e visual".

### 3.1. Razões do acionamento

| Requisito do PRD | Limitação do Figma Make | Cobertura pela stack adotada |
|---|---|---|
| PRD 6 — Bateria proporcional ao tempo de tela | Lógica temporal contínua complexa de manter | Trivial com `useEffect` + `Zustand` |
| PRD 6 — Relógio refletindo horário real | Acesso ao `Date` do sistema | Nativo em JS |
| PRD 5.3 — Variação dinâmica de dados em 4 painéis simultâneos | Animações simultâneas e sincronizadas | Framer Motion + estado central |
| PRD 5.5 — Bloco 3D interpretativo | Renderização 3D | R3F + Three.js |
| PRD 5.6 — Comportamento determinístico (mesmo input = mesmo output) | Controle preciso de seeds e timing | Determinismo total via roteiro implementado por código |
| PRD CA-07 — Modo Replay determinístico | Reprodução fiel | Naturalmente atendido por timelines em código |
| PRD 7 — Estabilidade em apresentações | Custo de iteração visual | Stack testável, com lint/types/Vitest |

### 3.2. Riscos do fallback e mitigações

| Risco | Mitigação |
|---|---|
| Tempo maior de implementação que Figma Make em telas simples | Tailwind + componentes reutilizáveis (UI Kit da Fase 2) reduzem custo marginal. |
| Curva de manutenção pós-entrega | Código documentado conforme PRD 6 (Evolução do Código), facilitando evolução para sistema real. |
| Complexidade do R3F para o bloco 3D | Mitigação: bloco 3D ainda usa vídeos pré-renderizados de terceiro (Fase 4); R3F apenas envelopa/integra. |

---

## 4. Impacto nas fases do cronograma

| Fase | Impacto |
|---|---|
| **Fase 1** (AI/fluxos) | Sem impacto direto. Wireframes seguem como planejado. |
| **Fase 2** (UI Kit) | UI Kit passa a ser implementado como **biblioteca de componentes React/Tailwind**, e não como sistema visual em Figma. |
| **Fase 3** (Telas alta fidelidade) | Implementação direta em código React desde o início. Sem "exportar do Figma Make". |
| **Fase 4** (Integração 3D) | Vídeos 3D integrados via `<video>` HTML5 ou textura em R3F, conforme necessidade. |
| **Fase 5** (Testes) | Acrescenta Vitest + Lighthouse para performance (alvo >30 FPS — PRD 6). |

---

## 5. Estrutura inicial do repositório (proposta)

```
gsfs-virtual/
├── src/
│   ├── app/                  # Roteamento e layout raiz
│   ├── screens/              # Uma pasta por tela do PRD (boot, setup, varredura, resultado, replay, exportacao)
│   ├── components/           # UI Kit (HUD, painéis de sensor, botões, modais)
│   ├── scenarios/            # Os 5 cenários determinísticos (config + roteiro implementado)
│   │   ├── c1-ouro-rochoso.ts
│   │   ├── c2-magnetita-arenoso.ts
│   │   ├── c3-cavidade-umido.ts
│   │   ├── c4-interferencia.ts
│   │   └── c5-multi-alvo.ts
│   ├── sensors/              # Lógica simbólica de cada sensor (GPR, EMI, IMU, GNSS-RTK)
│   ├── store/                # Zustand stores (sessão, sensores, detecções)
│   ├── three/                # Cenas R3F (bloco 3D do resultado)
│   ├── assets/               # Vídeos 3D, imagens, ícones
│   └── lib/                  # Utilidades (hash simbólico, formatadores)
├── public/                   # Arquivos estáticos
├── tests/                    # Vitest
├── docs/                     # Apontadores para discovery/
└── vite.config.ts
```

---

## 6. Decisões correlatas a tomar (não bloqueantes para Fase 0)

- **Hospedagem da demo:** estático (Netlify/Vercel/GitHub Pages) ou bundle local autônomo. A definir no início da Fase 3.
- **Suporte a tablet/projetor:** PRD 6 alvo >30 FPS; testar em alvos reais na Fase 5. Resoluções alvo a definir na Fase 1.
- **Internacionalização:** projeto monolíngue PT-BR; sem `i18n` nesta versão.

---

## 7. Comunicação ao cliente

Esta decisão **precisa ser comunicada formalmente ao cliente** junto ao pacote de fechamento da Fase 0, registrando que:

1. O fallback técnico (TypeScript) previsto no Cronograma seção 6 foi acionado.
2. O **escopo funcional e visual permanece idêntico ao PRD v0.3**.
3. Não há impacto no cronograma de fases.
4. Há ganho colateral: o código produzido na Fase 3 já serve de **base evolutiva para o sistema real** (PRD 6 — "Evolução do Código").

---

## 8. Validação

- [x] **ST-01:** Stack documentada com camadas explícitas.
- [x] **ST-02:** Justificativa do acionamento do fallback referenciada ao PRD e ao Cronograma.
- [x] **ST-03:** Impacto por fase do cronograma analisado.
- [x] **ST-04:** Estrutura inicial do repositório proposta.
- [x] **ST-V1:** Comunicação formal ao cliente sobre o acionamento do fallback — **ciência dada pelo cliente em 2026-05-28**.

---

*Documento sujeito a ajuste se surgirem incompatibilidades específicas durante a Fase 3. Decisões correlatas (§6) serão registradas no Decision Log do projeto.*
