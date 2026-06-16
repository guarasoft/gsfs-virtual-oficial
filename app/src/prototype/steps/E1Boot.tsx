import { useState } from 'react'
import { Progress } from '../../ui'
import { Screen } from '../shell/Screen'
import { useSimulator } from '../store'
import { useTimeline } from '../engine/useTimeline'
import type { TimelineEvent } from '../data/timeline'
import './E1Boot.css'

// ── Constantes ──────────────────────────────────────────────
const SPLASH_UNTIL = 1.5 // segundos

// Todos os 12 itens de diagnóstico (ordem de ativação = ordem do array)
type DiagId =
  | 'sistema'
  | 'barramento'
  | 'gpr'
  | 'emi'
  | 'imu'
  | 'gnss'
  | 'bateria'
  | 'temperatura'
  | 'record'
  | 'sha'
  | 'fusao'
  | 'interface'

const LEFT_ITEMS: { id: DiagId; label: string }[] = [
  { id: 'sistema',    label: 'SISTEMA PRINCIPAL' },
  { id: 'barramento', label: 'BARRAMENTO DE SENSORES' },
  { id: 'gpr',        label: 'MÓDULO GPR' },
  { id: 'emi',        label: 'MÓDULO EMI' },
  { id: 'imu',        label: 'IMU / INCLINAÇÃO' },
  { id: 'gnss',       label: 'GNSS-RTK' },
]

const RIGHT_ITEMS: { id: DiagId; label: string }[] = [
  { id: 'bateria',    label: 'BATERIA' },
  { id: 'temperatura', label: 'TEMPERATURA' },
  { id: 'record',     label: 'GSFS_RECORD' },
  { id: 'sha',        label: 'INTEGRIDADE SHA-256' },
  { id: 'fusao',      label: 'FUSÃO MULTIMODAL' },
  { id: 'interface',  label: 'INTERFACE OPERACIONAL' },
]

// Tempos em que cada item fica OK (staggered ao longo dos ~7 s de diag)
const BOOT_EVENTS: TimelineEvent[] = [
  { t: 2.0, kind: 'phase', label: 'sistema' },
  { t: 2.5, kind: 'phase', label: 'barramento' },
  { t: 3.0, kind: 'phase', label: 'gpr' },
  { t: 3.5, kind: 'phase', label: 'emi' },
  { t: 4.0, kind: 'phase', label: 'imu' },
  { t: 4.5, kind: 'phase', label: 'gnss' },
  { t: 5.0, kind: 'phase', label: 'bateria' },
  { t: 5.4, kind: 'phase', label: 'temperatura' },
  { t: 5.8, kind: 'phase', label: 'record' },
  { t: 6.2, kind: 'phase', label: 'sha' },
  { t: 6.6, kind: 'phase', label: 'fusao' },
  { t: 7.0, kind: 'phase', label: 'interface' },
]

const TILES: [string, string][] = [
  ['BATERIA',  '98%'],
  ['TEMP.',    '31°C'],
  ['SINAL',    '100%'],
  ['MEMÓRIA',  'OK'],
  ['BUS',      'ONLINE'],
  ['FUSÃO',    'ATIVA'],
]

// ── Subcomponentes ───────────────────────────────────────────

function StateChip({ state }: { state: 'ok' | 'test' | 'wait' }) {
  const cls = `pt-boot-state pt-boot-state--${state}`
  const label = state === 'ok' ? 'OK' : state === 'test' ? 'TEST' : 'WAIT'
  return <span className={cls}>{label}</span>
}

function DiagItem({
  label,
  okSet,
  id,
  activeId,
}: {
  label: string
  id: DiagId
  okSet: Set<DiagId>
  activeId: DiagId | null
}) {
  const state: 'ok' | 'test' | 'wait' = okSet.has(id)
    ? 'ok'
    : activeId === id
      ? 'test'
      : 'wait'
  return (
    <div className="pt-boot-item">
      <span className="pt-boot-item-label">{label}</span>
      <StateChip state={state} />
    </div>
  )
}

// ── Componente principal ─────────────────────────────────────

export function E1Boot() {
  const goTo = useSimulator((s) => s.goTo)
  const [okSet, setOkSet] = useState<Set<DiagId>>(new Set())
  const [activeId, setActiveId] = useState<DiagId | null>(null)

  const tl = useTimeline({
    durationSec: 8,
    events: BOOT_EVENTS,
    autostart: true,
    onEvent: (e) => {
      if (!e.label) return
      const id = e.label as DiagId
      // Marca o item como "ativo" brevemente, depois move para OK
      setActiveId(id)
      setOkSet((prev) => {
        const next = new Set(prev)
        next.add(id)
        return next
      })
    },
    onComplete: () => goTo('e2-menu'),
  })

  // ── Splash ──────────────────────────────────────────────────
  if (tl.elapsed < SPLASH_UNTIL) {
    const splashProgress = Math.round((tl.elapsed / SPLASH_UNTIL) * 40) // 0–40%
    return (
      <Screen bare>
        <div className="pt-boot-splash">
          <img
            className="pt-boot-logo"
            src="/logos/GSFS_Logo_Icon_RGB.svg"
            alt="GSFS"
          />
          <div className="pt-boot-tagline">GROUND SCANNING FUSION SYSTEM</div>
          <div className="pt-boot-init">INICIALIZANDO NÚCLEO GSFS</div>
          <div className="pt-boot-bar">
            <div className="pt-boot-bar-fill" style={{ width: `${splashProgress}%` }} />
          </div>
          <div className="pt-boot-caption">
            Carregando módulos de varredura, fusão de sensores e integridade operacional.
          </div>
        </div>
      </Screen>
    )
  }

  // ── Diagnóstico ─────────────────────────────────────────────
  return (
    <Screen
      title="AUTOTESTE INICIAL"
      subtitle="GROUND SCANNING FUSION SYSTEM • SEQUÊNCIA DE BOOT"
      meta={['VERSÃO: GSFS-BOOT 1.0', 'MODO: OPERATIONAL STANDBY', 'HASH: A9F2-C71D']}
    >
      <div className="pt-boot-diag">
        {/* ── Dois painéis lado a lado ── */}
        <div className="pt-boot-panels">
          {/* Painel esquerdo: itens de diagnóstico */}
          <div className="pt-boot-panel">
            <div className="pt-boot-panel-title">DIAGNÓSTICO DE INICIALIZAÇÃO</div>
            <div className="pt-boot-panel-sub">
              Sequência automática de verificação antes da operação em campo.
            </div>
            <div className="pt-boot-cols">
              <div className="pt-boot-col">
                {LEFT_ITEMS.map((it) => (
                  <DiagItem key={it.id} id={it.id} label={it.label} okSet={okSet} activeId={activeId} />
                ))}
              </div>
              <div className="pt-boot-col">
                {RIGHT_ITEMS.map((it) => (
                  <DiagItem key={it.id} id={it.id} label={it.label} okSet={okSet} activeId={activeId} />
                ))}
              </div>
            </div>
          </div>

          {/* Painel direito: telemetria */}
          <div className="pt-boot-panel">
            <div className="pt-boot-panel-title">TELEMETRIA DE BOOT</div>
            <div className="pt-boot-scope">[ radar / scope de varredura ]</div>
            <div className="pt-boot-sensors">SENSORES:&nbsp;&nbsp;GPR • EMI • IMU • GNSS</div>
            <div className="pt-boot-tiles">
              {TILES.map(([label, value]) => (
                <div className="pt-boot-tile" key={label}>
                  <span className="pt-boot-tile-label">{label}</span>
                  <span className="pt-boot-tile-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Progresso Geral ── */}
        <div className="pt-boot-progress-geral">
          <div className="pt-boot-progress-label">
            PROGRESSO GERAL · verificação dos módulos em sequência
          </div>
          <Progress value={tl.progress} label="Progresso geral do boot" />
        </div>
      </div>
    </Screen>
  )
}
