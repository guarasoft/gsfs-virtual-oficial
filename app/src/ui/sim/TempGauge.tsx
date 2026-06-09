import { Thermometer } from 'lucide-react'
import './sim.css'

export type TempState = 'normal' | 'elevated' | 'critical'
const COLOR: Record<TempState, string> = {
  normal: 'var(--sim-temp-normal)', elevated: 'var(--sim-temp-elevated)', critical: 'var(--sim-temp-critical)',
}
export function TempGauge({ celsius, state }: { celsius: number; state: TempState }) {
  return (
    <span className="sim-gauge" style={{ color: COLOR[state] }}>
      <Thermometer size={20} strokeWidth={1.75} />
      <span className="sim-gauge-value">{celsius}°C</span>
    </span>
  )
}
