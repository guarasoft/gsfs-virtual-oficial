import { BatteryFull, BatteryMedium, BatteryWarning } from 'lucide-react'
import './sim.css'

export type BatteryState = 'ok' | 'warn' | 'critical'
const MAP: Record<BatteryState, { color: string; Icon: typeof BatteryFull }> = {
  ok: { color: 'var(--sim-battery-ok)', Icon: BatteryFull },
  warn: { color: 'var(--sim-battery-warn)', Icon: BatteryMedium },
  critical: { color: 'var(--sim-battery-critical)', Icon: BatteryWarning },
}
export function BatteryGauge({ percent, state }: { percent: number; state: BatteryState }) {
  const { color, Icon } = MAP[state]
  return (
    <span className="sim-gauge" style={{ color }}>
      <Icon size={20} strokeWidth={1.75} />
      <span className="sim-gauge-value">{percent}%</span>
    </span>
  )
}
