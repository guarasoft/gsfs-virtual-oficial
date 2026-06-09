import type { ReactNode } from 'react'
import './surfaces.css'

export function Card({ children }: { children: ReactNode }) {
  return <div className="gsfs-card">{children}</div>
}
