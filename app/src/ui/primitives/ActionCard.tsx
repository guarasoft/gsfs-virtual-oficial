import type { ButtonHTMLAttributes } from 'react'
import './ActionCard.css'

export interface ActionCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** índice/numeração opcional (ex.: "01") */
  index?: string
  title: string
  description?: string
}

// Tile de ação clicável (lançador): numeração + título + descrição.
// Botão acessível, estilizado pelos tokens do design system.
export function ActionCard({ index, title, description, className = '', ...rest }: ActionCardProps) {
  return (
    <button type="button" className={`gsfs-actioncard ${className}`.trim()} {...rest}>
      {index && <span className="gsfs-actioncard-index">{index}</span>}
      <span className="gsfs-actioncard-title">{title}</span>
      {description && <span className="gsfs-actioncard-desc">{description}</span>}
    </button>
  )
}
