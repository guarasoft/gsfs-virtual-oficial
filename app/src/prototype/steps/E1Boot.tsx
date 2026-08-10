import { useEffect, useState } from 'react'
import { Progress } from '../../ui'
import { Screen } from '../shell/Screen'
import { useSimulator } from '../store'
import { useTimeline } from '../engine/useTimeline'
import type { TimelineEvent } from '../data/timeline'
import './E1Boot.css'

// ── Constantes ──────────────────────────────────────────────
const SPLASH_UNTIL = 2.0 // segundos

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

// Fechamento do boot: autoteste some (fade out) → "Concluído" → menu.
const FINISH_MS = 460 // duração do fade-out do autoteste
const DONE_MS = 1200 // tempo que "Concluído" fica na tela antes do menu

export function E1Boot() {
  const goTo = useSimulator((s) => s.goTo)
  const [okSet, setOkSet] = useState<Set<DiagId>>(new Set())
  const [activeId, setActiveId] = useState<DiagId | null>(null)
  const [phase, setPhase] = useState<'running' | 'finishing' | 'done'>('running')

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
    onComplete: () => setPhase('finishing'),
  })

  // Encadeia o fechamento: finishing (fade out) → done ("Concluído") → menu.
  useEffect(() => {
    if (phase === 'finishing') {
      const id = setTimeout(() => setPhase('done'), FINISH_MS)
      return () => clearTimeout(id)
    }
    if (phase === 'done') {
      const id = setTimeout(() => goTo('e2-menu'), DONE_MS)
      return () => clearTimeout(id)
    }
  }, [phase, goTo])

  // ── Testes concluídos (header/footer permanecem; só o conteúdo muda) ──
  if (phase === 'done') {
    return (
      <Screen
        title="AUTOTESTE INICIAL"
        subtitle="GROUND SCANNING FUSION SYSTEM • SEQUÊNCIA DE BOOT"
        meta={['VERSÃO: GSFS-BOOT 1.0', 'MODO: OPERATIONAL STANDBY', 'HASH: A9F2-C71D']}
      >
        <div className="pt-boot-done-wrap">
          <div className="pt-boot-done">
            <div className="pt-boot-done-check" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="40" height="40">
                <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.4"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="pt-boot-done-label">Testes concluídos</div>
          </div>
        </div>
      </Screen>
    )
  }

  // ── Splash ──────────────────────────────────────────────────
  if (tl.elapsed < SPLASH_UNTIL) {
    const splashProgress = Math.min(100, Math.round((tl.elapsed / SPLASH_UNTIL) * 100)) // 0–100%
    return (
      <Screen bare>
        <div className="pt-boot-splash">
          <img
            className="pt-boot-logo"
            src={import.meta.env.BASE_URL + 'logos/GSFS_Logo_Primary_Horizontal_RGB.svg'}
            alt="GSFS — Ground Scanning Fusion System"
          />
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
      <div className={`pt-boot-diag${phase === 'finishing' ? ' pt-boot-fade-out' : ''}`}>
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
            <div className="pt-boot-radar-wrap">
              <div className="pt-boot-radar" role="img" aria-label="Radar de varredura">
                <svg className="pt-boot-radar-svg" viewBox="0 0 200 200">
                  <g className="pt-boot-radar-rings">
                    <circle cx="100" cy="100" r="94" />
                    <circle cx="100" cy="100" r="64" />
                    <circle cx="100" cy="100" r="34" />
                    <line x1="100" y1="6" x2="100" y2="194" />
                    <line x1="6" y1="100" x2="194" y2="100" />
                  </g>
                  <g>
                    <circle className="pt-boot-radar-blip a" cx="142" cy="70" r="3.6" />
                    <circle className="pt-boot-radar-blip b" cx="78" cy="124" r="3" />
                    <circle className="pt-boot-radar-blip a" cx="120" cy="146" r="2.6" />
                    <circle className="pt-boot-radar-blip b" cx="62" cy="82" r="2.6" />
                    <circle className="pt-boot-radar-blip c" cx="150" cy="120" r="2.2" />
                  </g>
                </svg>
                <div className="pt-boot-radar-sweep" />
              </div>
            </div>
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
