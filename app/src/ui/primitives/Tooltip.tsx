import type { ReactNode } from 'react'
import './Tooltip.css'

export function Tooltip({ text, children }: { text: string; children: ReactNode }) {
  return (
    <span className="gsfs-tooltip">
      {children}
      <span className="gsfs-tooltip-bubble gsfs-ui" role="tooltip">{text}</span>
    </span>
  )
}
