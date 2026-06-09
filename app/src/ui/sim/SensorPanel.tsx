import { Radar, Magnet, Move3d, Satellite } from 'lucide-react'
import './sim.css'

export type SensorKind = 'gpr' | 'emi' | 'imu' | 'gnss'
export type SensorState = 'on' | 'off' | 'err'

const KIND: Record<SensorKind, { label: string; color: string; Icon: typeof Radar }> = {
  gpr: { label: 'GPR', color: 'var(--sensor-gpr)', Icon: Radar },
  emi: { label: 'EMI', color: 'var(--sensor-emi)', Icon: Magnet },
  imu: { label: 'IMU', color: 'var(--sensor-imu)', Icon: Move3d },
  gnss: { label: 'GNSS', color: 'var(--sensor-gnss)', Icon: Satellite },
}
const STATE: Record<SensorState, { label: string; color: string }> = {
  on: { label: 'Ativo', color: 'var(--sim-sensor-on)' },
  off: { label: 'Inativo', color: 'var(--sim-sensor-off)' },
  err: { label: 'Erro', color: 'var(--sim-sensor-err)' },
}
export function SensorPanel({ kind, state }: { kind: SensorKind; state: SensorState }) {
  const k = KIND[kind]; const s = STATE[state]
  return (
    <div className="sim-sensor">
      <span className="sim-sensor-name" style={{ color: k.color }}><k.Icon size={20} strokeWidth={1.75} />{k.label}</span>
      <span className="sim-sensor-state" style={{ color: s.color }}><span className="sim-dot" /> {s.label}</span>
    </div>
  )
}
