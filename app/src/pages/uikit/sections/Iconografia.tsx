import { Radar, Magnet, Move3d, Satellite, BatteryFull, Thermometer, MapPin, TriangleAlert, Check, X, Play, FileDown, Activity, Crosshair } from 'lucide-react'
import { DocSection, DocBlock, Cell } from '../docs-kit'

const ICONS = [
  [Radar, 'GPR'], [Magnet, 'EMI'], [Move3d, 'IMU'], [Satellite, 'GNSS'],
  [BatteryFull, 'Bateria'], [Thermometer, 'Temperatura'], [MapPin, 'RTK / posição'], [Crosshair, 'Alvo'],
  [Activity, 'Sinal'], [TriangleAlert, 'Alerta'], [Check, 'Confirmado'], [X, 'Descartado'],
  [Play, 'Replay'], [FileDown, 'Exportar'],
] as const

export default function Iconografia() {
  return (
    <DocSection
      title="Iconografia"
      desc="Ícones via Lucide, traço fino padronizado, mapeados aos papéis do simulador. Tamanho base 20px, cor herda do texto ou recebe token semântico."
    >
      <DocBlock title="Conjunto base (20px)">
        {ICONS.map(([Icon, label]) => (
          <Cell key={label} label={label}>
            <Icon size={20} color="var(--color-text)" strokeWidth={1.75} />
          </Cell>
        ))}
      </DocBlock>
    </DocSection>
  )
}
