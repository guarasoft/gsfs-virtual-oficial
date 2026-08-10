# GSFS Virtual — Guia de Entrega e Continuidade

Este documento consolida tudo o que uma equipe técnica precisa para **instalar, executar, publicar, atualizar e evoluir** o GSFS Virtual após o encerramento da consultoria. Ele complementa o [`README.md`](README.md) (visão geral) e a documentação normativa em [`discovery/`](discovery/).

---

## 1. O que está sendo entregue

| Ativo | Localização | Descrição |
|---|---|---|
| Código-fonte completo | [`app/`](app/) | Aplicação React/TypeScript: simulador de alta fidelidade (`/prototype`), portal de review, UI Kit, wireframes e bloco 3D |
| Histórico de desenvolvimento | git | Commits do projeto, com mensagens descritivas por funcionalidade |
| Cinco cenários (C1–C5) | [`app/src/prototype/data/scenarios.ts`](app/src/prototype/data/scenarios.ts) + [`discovery/Matriz_Cenarios_GSFS_Virtual.md`](discovery/Matriz_Cenarios_GSFS_Virtual.md) | Dados e especificação normativa dos cenários de referência |
| Componente 3D de resultado | [`app/src/prototype/block3d/`](app/src/prototype/block3d/) | Bloco 3D interativo (three.js/R3F) renderizado em runtime, integrado à E5 e E7 |
| Design system | [`brand-assets/`](brand-assets/) | Tokens de cor/tipografia (CSS/SCSS/JSON), logos (SVG), fontes (woff2) e guidelines de identidade visual |
| Documentação do projeto | [`discovery/`](discovery/) | PRD, matriz de cenários, roteiro técnico, teto de métricas, decision log, status histórico |
| Pacote documental da Fase 2 | [`entrega-fase2-cliente/`](entrega-fase2-cliente/) | Catálogo do UI Kit, mapa do repositório, instruções e screenshots |
| Vídeo institucional aprovado | [`video/gsfs-virtual-institucional.mp4`](video/gsfs-virtual-institucional.mp4) | Versão final aprovada (MP4, 1080p) |
| Deploy automático | [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) | Publicação do simulador no GitHub Pages a cada push |
| Suíte de testes | `app/src/**/*.test.ts(x)` | 200 testes automatizados (Vitest) cobrindo motor do simulador, cenários e componentes |

---

## 2. Requisitos de ambiente

- **Node.js ≥ 18** (recomendado 20 LTS ou superior) — [nodejs.org](https://nodejs.org)
- **npm** (acompanha o Node)
- Navegador moderno com WebGL (Chrome, Edge, Firefox, Safari) para o bloco 3D

Nenhuma outra ferramenta é necessária. O projeto roda em Windows, macOS e Linux.

## 3. Instalação e execução

```bash
# na raiz do repositório
cd app
npm install        # instala as dependências
npm run dev        # ambiente de desenvolvimento → http://localhost:5173
```

Rotas principais:

| Rota | Conteúdo |
|---|---|
| `/` | Portal de review (índice) |
| `/prototype` | **Simulador — o produto final** (E1–E7, cenários C1–C5) |
| `/ui-kit` | Galeria do design system |
| `/block3d?c=c1` | Bloco 3D isolado (abas C1–C5) |

## 4. Build de produção

```bash
cd app
npm run build      # gera app/dist/ (site estático)
npm run preview    # confere o build localmente
```

O resultado (`app/dist/`) é um **site 100% estático** — pode ser hospedado em qualquer servidor de arquivos (GitHub Pages, Vercel, Netlify, S3, nginx, IIS...). Não há backend, banco de dados nem chaves de API.

> Para hospedar em um **subdiretório** (caso do GitHub Pages), builde com `npm run build -- --base=/nome-do-repo/`. O workflow incluído já faz isso automaticamente.

### Viewer 3D offline (opcional)

```bash
npm run build:viewer   # gera app/dist-viewer/viewer.html
```

Um único arquivo HTML auto-contido com o bloco 3D — abre direto do disco (duplo clique), sem servidor e sem internet. Útil para apresentações de campo.

## 5. Testes

```bash
cd app
npm test           # 200 testes (Vitest) — todos devem passar
```

## 6. Publicação e atualização (GitHub Pages)

O repositório já contém o workflow de deploy. Uma única configuração é necessária:

1. **Settings → Pages → Source: "GitHub Actions"**
2. Qualquer push na `main` (ou execução manual em **Actions**) instala, testa, builda e publica
3. URL resultante: `https://<usuario>.github.io/<nome-do-repositorio>/` — o simulador fica em `.../prototype`

**Para atualizar o simulador no ar:** basta commitar a alteração na `main`; a publicação é automática. Não há custo — GitHub Pages é gratuito para os limites deste projeto.

**Para usar outro provedor:** builde (`npm run build`) e suba o conteúdo de `app/dist/` — nenhuma configuração adicional é necessária.

## 7. Dependências e licenças

Todas as dependências são **open source, gratuitas e instaladas via npm** — não há serviço pago, chave de API, conta de terceiros ou componente proprietário externo envolvido.

### Runtime (o que roda no navegador)

| Pacote | Versão | Licença | Papel |
|---|---|---|---|
| react / react-dom | 18 | MIT | Interface |
| react-router-dom | 6 | MIT | Rotas |
| zustand | 5 | MIT | Estado |
| three | 0.169 | MIT | Motor 3D |
| @react-three/fiber | 8 | MIT | Integração React ↔ three.js |
| @react-three/drei | 9 | MIT | Utilitários 3D (OrbitControls etc.) |
| lucide-react | 1 | ISC | Ícones |

### Desenvolvimento (build e testes)

| Pacote | Licença | Papel |
|---|---|---|
| vite 5 + @vitejs/plugin-react | MIT | Build/dev server |
| typescript 5 | Apache-2.0 | Linguagem |
| vitest 4 + Testing Library + jsdom | MIT | Testes |
| playwright | Apache-2.0 | Screenshots/E2E (opcional, apenas dev) |
| vite-plugin-singlefile | MIT | Build do viewer offline |

### Fontes e assets

- **Fontes** (Exo 2, Inter, JetBrains Mono): licença **SIL OFL** — os arquivos `.woff2` já estão no repositório (`brand-assets/fonts/`), sem dependência de CDN externo.
- **Logos e identidade visual GSFS**: ativos do projeto, incluídos em `brand-assets/`.
- **Áudio/imagens do simulador**: gerados para o projeto, incluídos no repositório.

> Resumo: **o repositório é auto-contido.** Com Node.js instalado e `npm install`, tudo funciona — inclusive offline após a instalação.

## 8. Arquitetura em uma página

```
app/src/
├─ pages/            # Rotas: Hub, wireframes, UI Kit, Prototype, Block3D
├─ prototype/        # Motor do simulador
│  ├─ engine/        #   Timeline determinística (relógio da operação)
│  ├─ data/          #   Cenários C1–C5, timeline, registros (GSFS_RECORD)
│  ├─ steps/         #   Telas E1–E7 (boot, menu, setup, varredura, resultado, exportação, replay)
│  ├─ block3d/       #   Bloco 3D de resultado (cena, isosuperfícies, texturas, specs por cenário)
│  └─ shell/         #   Moldura do equipamento (tela, transições)
├─ ui/               # Biblioteca de componentes (base + simulador/HUD)
└─ styles/           # CSS consumindo os tokens de brand-assets/
```

Conceitos-chave para quem for evoluir o projeto:

- **Determinismo:** toda a operação é dirigida por uma timeline determinística por cenário — mesma entrada, mesmo resultado, em qualquer máquina. Não há aleatoriedade em tempo de exibição.
- **Cenários:** para ajustar ou criar um cenário, o ponto de partida é `app/src/prototype/data/scenarios.ts` + a especificação em `discovery/Matriz_Cenarios_GSFS_Virtual.md`.
- **Teto de métricas:** o que pode ou não aparecer como número está normatizado em `discovery/Teto_Metricas_GSFS_Virtual.md`.
- **Decisões:** o porquê de cada escolha relevante está no decision log `discovery/Decisoes_GSFS_Virtual.md` (D-001…D-020).

## 9. Suporte pós-entrega

Com a transferência deste repositório, o cliente passa a ter **posse e autonomia completas** sobre o GSFS Virtual: código, documentação, identidade visual, vídeo e mecanismo de publicação — sem dependência operacional da equipe de desenvolvimento e sem custos recorrentes obrigatórios.

---

<p align="center"><sub>GSFS Virtual — pacote de entrega final · GuaráSoft</sub></p>
