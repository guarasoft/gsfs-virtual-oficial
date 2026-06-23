import './sim.css'

// Leitura métrica do HUD com numerais tabulares.
// size="lg" (padrão): número-destaque (ex.: resultado E5, 32px).
// size="sm": faixa compacta do HUD de varredura (relógio/bateria/temp/GNSS).
export function HudMetric({
  label,
  value,
  unit,
  size = 'lg',
}: {
  label: string
  value: string
  unit?: string
  size?: 'sm' | 'lg'
}) {
  return (
    <div className={`gsfs-hudmetric gsfs-hudmetric--${size}`}>
      <span className="gsfs-hudmetric-label">{label}</span>
      <span className="gsfs-hudmetric-value">
        {value}
        {unit && <span className="gsfs-hudmetric-unit">{unit}</span>}
      </span>
    </div>
  )
}
