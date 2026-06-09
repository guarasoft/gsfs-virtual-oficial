import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

// Barra de navegação de review (só aparece nas seções internas:
// wireframe e ui-kit). O /prototype roda sem este chrome.
export default function ReviewBar({
  crumb,
  children,
}: {
  crumb: string
  children?: ReactNode
}) {
  return (
    <div className="review-bar">
      <Link to="/" className="back">
        ← Início
      </Link>
      <span className="crumb">{crumb}</span>
      {children}
    </div>
  )
}
