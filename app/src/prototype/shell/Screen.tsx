import { useEffect, useState, type ReactNode } from 'react'
import './screen.css'

// Relógio real (PRD 6) exibido na barra de status institucional do rodapé.
function FootClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const p = (n: number) => String(n).padStart(2, '0')
  return (
    <span className="pt-foot-clock">
      {p(now.getHours())}:{p(now.getMinutes())}:{p(now.getSeconds())}
    </span>
  )
}

// Casca do simulador hi-fi. Preenche a viewport: header fixo no topo,
// conteúdo no meio (rola se preciso), barra de status institucional no rodapé.
// `bare` (splash) remove header/footer e centraliza o conteúdo.
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
  if (bare) {
    return (
      <div className="pt-screen pt-screen--bare">
        <main className="pt-screen-body">{children}</main>
        {edge}
      </div>
    )
  }

  return (
    <div className="pt-screen">
      <header className="pt-screen-top">
        <div className="pt-screen-brand">
          <img className="pt-screen-logo" src="/logos/GSFS_Logo_Icon_RGB.svg" alt="GSFS" />
          <div className="pt-screen-title">
            {title && <h1>{title}</h1>}
            {subtitle && <span className="pt-screen-sub">{subtitle}</span>}
          </div>
        </div>
        {meta && (
          <div className="pt-screen-meta">
            {meta.map((m) => <span key={m}>{m}</span>)}
          </div>
        )}
      </header>

      <main className="pt-screen-body">{children}</main>

      <footer className="pt-screen-foot">
        <span className="pt-foot-id">
          GSFS Virtual <span className="pt-foot-id-sub">· Simulador Técnico-Institucional</span>
        </span>
        <span className="pt-foot-status">
          <span className="pt-foot-dot" aria-hidden="true" />
          SISTEMA OPERACIONAL
          <FootClock />
        </span>
      </footer>

      {edge}
    </div>
  )
}
