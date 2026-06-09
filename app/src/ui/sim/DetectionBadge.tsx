import './sim.css'

export type DetectionState = 'confirmed' | 'suspect' | 'discarded'
const MAP: Record<DetectionState, { label: string; color: string }> = {
  confirmed: { label: 'Confirmado', color: 'var(--sim-state-confirmed)' },
  suspect: { label: 'Suspeita', color: 'var(--sim-state-suspect)' },
  discarded: { label: 'Descartado', color: 'var(--sim-state-discarded)' },
}
export function DetectionBadge({ state }: { state: DetectionState }) {
  const { label, color } = MAP[state]
  return <span className="sim-chip" style={{ color }}><span className="sim-dot" />{label}</span>
}
