<h1 align="center">GSFS Virtual</h1>

<p align="center">
  <strong>Simulador Técnico-Institucional</strong><br>
  <em>Portal de review + protótipo navegável de um sistema de varredura de subsuperfície</em>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <img alt="Zustand" src="https://img.shields.io/badge/state-Zustand%205-443E38">
  <img alt="R3F" src="https://img.shields.io/badge/3D-three.js%20%2B%20R3F-000000?logo=threedotjs&logoColor=white">
  <img alt="Vitest" src="https://img.shields.io/badge/tests-Vitest-6E9F18?logo=vitest&logoColor=white">
  <img alt="Status" src="https://img.shields.io/badge/status-Fase%204%20conclu%C3%ADda%20%C2%B7%20homologa%C3%A7%C3%A3o-2BC8D9">
</p>

---

## O que é

O **GSFS Virtual** é uma aplicação web que **simula, de forma demonstrativa e institucional**, a operação de um sistema GSFS de varredura de subsuperfície — um equipamento que percorre a superfície e "detecta" alvos em profundidade (veios de ouro, magnetita, cavidades, lençol de água) combinando quatro sensores: **GPR, EMI, IMU e GNSS**.

> [!IMPORTANT]
> É um **simulador demonstrativo**, não uma ferramenta de medição real. Todos os valores são **simbólicos e plausíveis** (não são leituras científicas). O que pode aparecer como número é governado pelo **Teto de Métricas** — ver [`discovery/Teto_Metricas_GSFS_Virtual.md`](discovery/Teto_Metricas_GSFS_Virtual.md). Nada de precisão RTK em cm, throughput, % de acerto de IA, etc.

A jornada da operação tem **7 etapas (E1–E7)** e **5 cenários (C1–C5)**. O resultado (E5) exibe um **bloco 3D interativo** da área escaneada (componente em runtime com three.js/React Three Fiber, produzido pela Guarasoft): terreno do cenário, trilha de varredura, achados como isosuperfícies orgânicas por nível qualitativo de confiança, inset de referência GPR e legenda. **Arraste para girar, use o scroll para aproximar** — sem interação, o bloco orbita sozinho em loop. O mesmo bloco fecha o Replay (E7), conforme a decisão D-020.

> [!NOTE]
> **Governança geoespacial (Geo-Cartucho):** os rótulos dos alvos e a exportação não exibem coordenadas — referências geoespaciais completas são ativos técnicos da missão, protegidos ("liberação mediante autenticação do Geo-Cartucho"), por definição de arquitetura do cliente (10/07/2026).

---

## Status atual

| Campo | Valor |
|---|---|
| **Fase atual** | **Fase 4 concluída** — componente 3D integrado (E5 + E7); aguardando **demonstração de homologação** para o aceite formal da Etapa 3 |
| **Saúde** | 🟢 Verde |
| **Concluído** | Fase 3 validada pelo cliente (24/06); **componente 3D validado pelo cliente (10/07)** e integrado ao protótipo com rotação manual + zoom; governança Geo-Cartucho aplicada; E6 parametrizada por cenário |
| **Próximo marco** | Demo de homologação (fluxo completo + 5 cenários) → aceite formal da Etapa 3 |

Radar completo (documento vivo): [`discovery/Status_GSFS_Virtual.md`](discovery/Status_GSFS_Virtual.md).

### Roadmap de fases

| Fase | Escopo | Status |
|---|---|---|
| Fase 0 | Cenários e desbloqueio de pendências | ✅ Concluída |
| Fase 1 | Arquitetura de informação e fluxos | ✅ Concluída |
| Fase 2 | Design visual e UI Kit | ✅ Concluída |
| Fase 3 | Telas em alta fidelidade (código) | ✅ Concluída e validada (24/06) |
| Fase 4 | Integração das peças 3D | ✅ Concluída (10/07) — aguardando homologação |
| Fase 5 | Testes e polimento | ⚪ Não iniciada |

---

## Stack técnica

| Camada | Tecnologia |
|---|---|
| UI | **React 18** |
| Build/dev | **Vite 5** |
| Linguagem | **TypeScript 5** |
| Roteamento | **React Router 6** |
| Estado | **Zustand 5** |
| 3D | **three.js 0.169** + **@react-three/fiber 8** + **@react-three/drei 9** (bloco de resultado) |
| Ícones | **lucide-react** |
| Estilo | **CSS puro** (`app/src/styles/`) consumindo os **tokens** de `brand-assets/` |
| Testes | **Vitest 4** + Testing Library + jsdom; **Playwright** (screenshots/E2E) |

> Sem Tailwind. Os gráficos de sensor e o HUD são componentes próprios; o bloco 3D é renderizado **em runtime** (WebGL, com fallback textual quando WebGL não está disponível — é o que os testes em jsdom exercitam).

---

## Como rodar

**Pré-requisitos:** Node **≥ 18** (recomendado **20 LTS**) e npm. A aplicação vive em [`app/`](app/).

```bash
# a partir da raiz do repositório
cd app
npm install          # instala dependências (node_modules não vai no git)
npm run dev          # servidor de desenvolvimento → http://localhost:5173
```

### Scripts (dentro de `app/`)

| Comando | O que faz |
|---|---|
| `npm run dev` | Ambiente de desenvolvimento (Vite) em `http://localhost:5173` |
| `npm run build` | Type-check (`tsc -b`) + build de produção em `app/dist/` |
| `npm run preview` | Serve localmente o build de produção |
| `npm test` | Roda a suíte de testes uma vez (Vitest) |
| `npm run test:watch` | Testes em modo watch |
| `npm run build:viewer` | **Viewer single-file do bloco 3D** → `app/dist-viewer/viewer.html` (HTML único auto-contido, abre offline via `file://` — usado para review do cliente por WhatsApp) |

---

## As quatro visões do app

O app é ao mesmo tempo o **produto** e um **portal de review** interno. Rotas principais:

| Rota | Fase | Descrição |
|---|---|---|
| `/` | — | **Hub** — portal de review (índice das visões) |
| `/wireframe/e1-boot` … `/e7-replay` | Fase 1 | Wireframes de baixa fidelidade das 7 etapas |
| `/ui-kit` | Fase 2 | **Galeria do design system** (master/detail): fundamentos (cores, tipografia, logo, espaçamento, iconografia) + todos os componentes com estados/variações |
| `/prototype` | Fase 3 | **Simulador de alta fidelidade** — é o produto entregue ao cliente; roda standalone |
| `/block3d?c=c1` | Fase 4 | **Review do bloco 3D** — o componente de resultado isolado, com abas C1–C5 |

> `/` , `/wireframe` e `/ui-kit` são **ferramentas internas de review**. O entregável ao cliente é o **`/prototype`**.

### As 7 etapas da operação (E1–E7)

| Etapa | Nome | Resumo |
|---|---|---|
| E1 | Boot / Autoteste | Splash + diagnóstico/telemetria do equipamento |
| E2 | Menu | Menu principal / seleção |
| E3 | Setup | Configuração da operação (cenário, modalidade) |
| E4 | Varredura | 4 gráficos de sensor **determinísticos** (GPR/EMI/IMU/GNSS) + HUD + eventos |
| E5 | Resultado | **Bloco 3D interativo** (girar/zoom) + registro da operação (`GSFS_RECORD` + hash SHA-256, por cenário) |
| E6 | Exportação | Pacotes simbólicos PDF/GIS/BIM (preview-only, D-007/D-008) — segue o cenário e a origem (missão atual ou gravação do arquivo) |
| E7 | Replay | Reproduz a varredura 2D determinística (CA-07) e, ao concluir, apresenta o mesmo bloco 3D da E5 (D-020) |

---

## Estrutura do repositório

```
gsfs-virtual/
├─ app/                    # Aplicação React (portal de review + simulador)
│  ├─ src/
│  │  ├─ pages/
│  │  │  ├─ Hub.tsx        # Portal de review  (/)
│  │  │  ├─ wireframe/     # Fase 1 — wireframes E1–E7
│  │  │  ├─ uikit/         # Fase 2 — galeria do design system  (/ui-kit)
│  │  │  └─ Prototype.tsx  # Fase 3 — simulador de alta fidelidade  (/prototype)
│  │  ├─ prototype/        # Motor do simulador: timeline, sensores, cenários, steps E1–E7
│  │  │  └─ block3d/       # Bloco 3D de resultado (three/R3F): cena por cenário, isosuperfícies, GPR inset
│  │  ├─ ui/               # Biblioteca de componentes reutilizáveis (base + simulador/HUD)
│  │  ├─ styles/           # CSS (brand.css, global.css, wireframe.css)
│  │  └─ test/             # Setup de testes
│  └─ package.json
├─ brand-assets/           # Design system: tokens (cores/tipografia), logos, guidelines
├─ discovery/              # Documentos normativos (PRD, cenários, roteiro, status, decisões…)
│  └─ briefing-videos-3d/  # Briefing técnico de produção dos 5 vídeos 3D (Fase 4)
├─ docs/                   # Specs e planos internos de implementação
└─ entrega-fase2-cliente/  # Pacote documental entregue ao cliente na Fase 2
```

---

## Documentação do projeto

Toda a documentação normativa e de acompanhamento vive em [`discovery/`](discovery/):

| Documento | Conteúdo |
|---|---|
| [`Status_GSFS_Virtual.md`](discovery/Status_GSFS_Virtual.md) | **Radar do projeto** (ponto de entrada — onde estamos, o que foi feito, o que vem) |
| [`PRD_GSFS_Virtual_v0.3.md`](discovery/PRD_GSFS_Virtual_v0.3.md) | Requisitos de produto |
| [`Matriz_Cenarios_GSFS_Virtual.md`](discovery/Matriz_Cenarios_GSFS_Virtual.md) | Os 5 cenários (C1–C5) |
| [`Roteiro_Tecnico_GSFS_Virtual.md`](discovery/Roteiro_Tecnico_GSFS_Virtual.md) | Roteiro técnico (momentos de detecção) |
| [`Teto_Metricas_GSFS_Virtual.md`](discovery/Teto_Metricas_GSFS_Virtual.md) | O que pode/não pode aparecer como número |
| [`Decisoes_GSFS_Virtual.md`](discovery/Decisoes_GSFS_Virtual.md) | Decision log central |
| [`briefing-videos-3d/`](discovery/briefing-videos-3d/) | Regras gerais + 1 doc por cenário para a produção dos vídeos 3D |

---

## Testes

Os testes ficam ao lado do código (`*.test.ts` / `*.test.tsx`), cobrindo o motor do simulador (timeline, cenários, varredura, etapas E1–E7) e componentes do UI Kit.

```bash
cd app
npm test            # roda tudo uma vez
```

---

<p align="center"><sub>Projeto proprietário — uso interno. © Guarasoft / GSFS.</sub></p>
