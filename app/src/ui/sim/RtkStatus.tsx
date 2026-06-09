import './sim.css'

export type RtkState = 'fix' | 'float' | 'nofix'
const MAP: Record<RtkState, { label: string; color: string }> = {
  fix: { label: 'RTK FIX', color: 'var(--sim-rtk-fix)' },
  float: { label: 'RTK FLOAT', color: 'var(--sim-rtk-float)' },
  nofix: { label: 'NO FIX', color: 'var(--sim-rtk-nofix)' },
}
export function RtkStatus({ state }: { state: RtkState }) {
  const { label, color } = MAP[state]
  return <span className="sim-chip" style={{ color }}><span className="sim-dot" />{label}</span>
}
