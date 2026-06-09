import type { ReactNode } from 'react'
import './Badge.css'

export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger'
export function Badge({ tone = 'neutral', children }: { tone?: BadgeTone; children: ReactNode }) {
  return <span className={`gsfs-badge gsfs-badge--${tone}`}>{children}</span>
}
export function Chip({ tone = 'neutral', children }: { tone?: BadgeTone; children: ReactNode }) {
  return <span className={`gsfs-badge gsfs-badge--pill gsfs-badge--${tone}`}>{children}</span>
}
