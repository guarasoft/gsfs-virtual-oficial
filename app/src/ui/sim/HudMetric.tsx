import './sim.css'

export function HudMetric({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span className="gsfs-ui-label" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
      <span>
        <span className="gsfs-metric" style={{ color: 'var(--color-text-strong)' }}>{value}</span>
        {unit && <span className="gsfs-ui" style={{ color: 'var(--color-text-muted)', marginLeft: 6 }}>{unit}</span>}
      </span>
    </div>
  )
}
