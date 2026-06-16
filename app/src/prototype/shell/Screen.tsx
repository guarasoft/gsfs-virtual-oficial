import type { ReactNode } from 'react'
import './screen.css'

export function Screen({
  title, subtitle, meta, bare = false, edge, children,
}: {
  title?: string
  subtitle?: string
  meta?: string[]
  bare?: boolean
  edge?: ReactNode
  children: ReactNode
}) {
  return (
    <div className={`pt-screen${bare ? ' pt-screen--bare' : ''}`}>
      {!bare && (
        <header className="pt-screen-top">
          <div className="pt-screen-title">
            {title && <h1>{title}</h1>}
            {subtitle && <span className="pt-screen-sub">{subtitle}</span>}
          </div>
          {meta && (
            <div className="pt-screen-meta">
              {meta.map((m) => <span key={m}>{m}</span>)}
            </div>
          )}
        </header>
      )}
      <main className="pt-screen-body">{children}</main>
      {edge}
    </div>
  )
}
