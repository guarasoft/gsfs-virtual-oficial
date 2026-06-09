import type { ReactNode } from 'react'

// Casca de uma tela de wireframe: o "tablet" 1280×800 com barra
// superior e rodapé padronizados. As etapas reusam isto.
// `bare` esconde topbar/rodapé (ex.: splash de carregamento da E1).
export default function WfScreen({
  title,
  subtitle,
  meta = [],
  footerRight,
  bare = false,
  children,
}: {
  title?: string
  subtitle?: string
  meta?: string[]
  footerRight?: string
  bare?: boolean
  children: ReactNode
}) {
  return (
    <div className="wf">
      <div className="tablet-stage">
        <div className="wf-screen">
          {!bare && (
            <div className="wf-topbar">
              <div className="wf-brand">
                <div className="wf-logo">LOGO</div>
                <div className="wf-title">
                  <strong>{title}</strong>
                  {subtitle && <small>{subtitle}</small>}
                </div>
              </div>
              {meta.length > 0 && (
                <div className="wf-meta">
                  {meta.map((m) => (
                    <div key={m}>{m}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          {children}

          {!bare && (
            <div className="wf-footer">
              <span>[ faixa de identidade visual — Fase 2 ]</span>
              <span>{footerRight}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
