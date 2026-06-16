import { useState } from 'react'
import { Badge, HudMetric, Progress } from '../../ui'
import { Screen } from '../shell/Screen'
import { useSimulator } from '../store'
import { useTimeline } from '../engine/useTimeline'
import type { TimelineEvent } from '../data/timeline'

const FIRMWARE = 'GSFS-FW v0.9.3'
const SPLASH_UNTIL = 1.5 // segundos

const COMPONENTS: { id: string; label: string }[] = [
  { id: 'gpr', label: 'GPR · Ground Penetrating Radar' },
  { id: 'emi', label: 'EMI · Indução Eletromagnética' },
  { id: 'imu', label: 'IMU · Orientação 6 eixos' },
  { id: 'gnss', label: 'GNSS-RTK · Posicionamento' },
  { id: 'fusao', label: 'Fusão Multimodal' },
  { id: 'armazenamento', label: 'Armazenamento / GSFS_RECORD' },
]

const BOOT_EVENTS: TimelineEvent[] = [
  { t: 2.0, kind: 'phase', label: 'gpr' },
  { t: 2.8, kind: 'phase', label: 'emi' },
  { t: 3.6, kind: 'phase', label: 'imu' },
  { t: 4.4, kind: 'phase', label: 'gnss' },
  { t: 5.0, kind: 'phase', label: 'fusao' },
  { t: 5.6, kind: 'phase', label: 'armazenamento' },
]

export function E1Boot() {
  const goTo = useSimulator((s) => s.goTo)
  const [ok, setOk] = useState<Record<string, boolean>>({})

  const tl = useTimeline({
    durationSec: 6,
    events: BOOT_EVENTS,
    autostart: true,
    onEvent: (e) => {
      if (e.label) setOk((prev) => ({ ...prev, [e.label!]: true }))
    },
    onComplete: () => goTo('e2-menu'),
  })

  if (tl.elapsed < SPLASH_UNTIL) {
    return (
      <Screen bare>
        <div className="pt-boot-splash">
          <div className="pt-boot-logo">GSFS</div>
          <div className="pt-boot-tagline">GROUND SCANNING FUSION SYSTEM</div>
          <div className="pt-boot-fw">{FIRMWARE}</div>
        </div>
      </Screen>
    )
  }

  return (
    <Screen title="AUTOTESTE DO SISTEMA" subtitle="GROUND SCANNING FUSION SYSTEM" meta={[FIRMWARE]}>
      <div className="pt-boot">
        <div className="pt-boot-progress">
          <Progress value={tl.progress} label="Progresso do boot" />
          <span className="pt-boot-pct">{tl.progress}%</span>
        </div>

        <ul className="pt-boot-list">
          {COMPONENTS.map((c) => (
            <li key={c.id} className="pt-boot-item">
              <span>{c.label}</span>
              {ok[c.id] ? <Badge tone="success">OK</Badge> : <Badge tone="warning">VERIFICANDO</Badge>}
            </li>
          ))}
        </ul>

        <div className="pt-boot-telemetry">
          <HudMetric label="Temperatura" value="36" unit="°C" />
          <HudMetric label="Bateria" value="98" unit="%" />
          <HudMetric label="Sensores" value="4" unit="ativos" />
        </div>
      </div>
    </Screen>
  )
}
