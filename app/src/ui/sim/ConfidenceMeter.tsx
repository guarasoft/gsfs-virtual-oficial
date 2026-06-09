import './sim.css'

export type ConfidenceLevel = 'high' | 'medium' | 'low'
const COLOR: Record<ConfidenceLevel, string> = {
  high: 'var(--sim-confidence-high)', medium: 'var(--sim-confidence-medium)', low: 'var(--sim-confidence-low)',
}
export function ConfidenceMeter({ value, level }: { value: number; level: ConfidenceLevel }) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div className="sim-meter">
      <div className="sim-meter-track"><div className="sim-meter-fill" style={{ width: `${pct}%`, background: COLOR[level] }} /></div>
      <span className="sim-meter-label">{pct}%</span>
    </div>
  )
}
