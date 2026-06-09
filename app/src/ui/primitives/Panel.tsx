import type { ReactNode } from 'react'
import './surfaces.css'

export function Panel({ title, children }: { title?: ReactNode; children: ReactNode }) {
  return (
    <div className="gsfs-panel">
      {title && <div className="gsfs-panel-header gsfs-ui-label">{title}</div>}
      <div className="gsfs-panel-body">{children}</div>
    </div>
  )
}
