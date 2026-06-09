import type { ReactNode } from 'react'

export function DocSection({ title, desc, children }: { title: string; desc?: string; children: ReactNode }) {
  return (
    <section className="doc-section">
      <header>
        <h1 className="gsfs-h2">{title}</h1>
        {desc && <p className="doc-desc gsfs-ui">{desc}</p>}
      </header>
      {children}
    </section>
  )
}

export function DocBlock({ title, code, children }: { title: string; code?: string; children: ReactNode }) {
  return (
    <div className="doc-block">
      <h2 className="gsfs-h3">
        {title}
        {code && <code className="doc-block-code">{code}</code>}
      </h2>
      <div className="doc-grid">{children}</div>
    </div>
  )
}

// Uma célula rotulada (variação ou estado) dentro de um DocBlock.
export function Cell({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="doc-cell">
      <div>{children}</div>
      {label && <span className="doc-cell-label">{label}</span>}
    </div>
  )
}

export function TokenTag({ children }: { children: ReactNode }) {
  return <code className="token-tag">{children}</code>
}

// Amostra de cor. `value` é uma string CSS (ex.: 'var(--color-primary)').
// Layout de célula uniforme: chip fixo no topo + nome com altura reservada
// (2 linhas) + token, de modo que os chips fiquem sempre alinhados em grade
// independentemente do tamanho do nome/token.
export function Swatch({ name, value, token }: { name: string; value: string; token?: string }) {
  return (
    <div className="swatch">
      <div className="swatch-chip" style={{ background: value }} />
      <span className="swatch-name">{name}</span>
      {token && <code className="swatch-token">{token}</code>}
    </div>
  )
}
