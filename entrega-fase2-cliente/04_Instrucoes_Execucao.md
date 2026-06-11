# Instruções de Visualização / Execução — UI Kit (Fase 2)

**Documento:** Como visualizar e executar a rota `/ui-kit`
**Data:** 11/06/2026

> Estas instruções documentam **como o UI Kit é executado** a partir do repositório, para
> rastreabilidade e para uso na **entrega final**. A forma mais simples de visualizar agora,
> sem ambiente de desenvolvimento, é pelas **capturas em `screenshots/`** deste pacote.

---

## 1. Visualização imediata (sem instalar nada)

Abra os arquivos de imagem da pasta **`screenshots/`** deste pacote. Cada captura
corresponde a uma seção da rota `/ui-kit` renderizada (fundamentos + componentes).

---

## 2. Execução local (a partir do repositório)

**Pré-requisitos:** [Node.js](https://nodejs.org) LTS (18 ou superior) e npm.

A aplicação vive na pasta `app/`. Stack: **React 18 + Vite 5 + TypeScript**; navegação por
React Router; ícones via `lucide-react`.

```bash
# 1) Instalar dependências (uma vez)
cd app
npm install

# 2) Subir o servidor de desenvolvimento
npm run dev
```

O Vite exibe a URL local (por padrão **http://localhost:5173**). Acesse:

| Rota | Conteúdo |
|---|---|
| `/` | Hub / portal de review |
| **`/ui-kit`** | **Galeria do design system (Fase 2)** — fundamentos e componentes |
| `/wireframe` | Wireframes das 7 etapas (Fase 1) |
| `/prototype` | Espaço da Fase 3 (alta fidelidade) |

---

## 3. Build de produção (opcional)

```bash
cd app
npm run build      # gera a versão estática em app/dist/
npm run preview    # serve o build localmente para conferência
```

O resultado em `app/dist/` é um conjunto de arquivos estáticos que pode ser aberto em
qualquer servidor web, sem necessidade de ambiente de desenvolvimento.

---

## 4. Scripts disponíveis (`app/package.json`)

| Script | Ação |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (hot reload) |
| `npm run build` | Verificação de tipos (`tsc`) + build de produção (Vite) |
| `npm run preview` | Pré-visualização do build de produção |

---

*A rota `/ui-kit` consome diretamente os tokens de `brand-assets/`, garantindo que o que se
vê na tela é exatamente o sistema de design documentado no [Catálogo](02_Catalogo_UI_Kit.md).*
