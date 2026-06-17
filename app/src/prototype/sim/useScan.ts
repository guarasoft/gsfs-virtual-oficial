import { useState, useCallback } from 'react'
import type { GprSignature } from '../../ui'
import type { ScenarioId, Modality } from '../data/types'
import { getScenario } from '../data/scenarios'
import { getTimeline } from '../data/timeline'
import type { TimelineEvent } from '../data/timeline'
import { useTimeline } from '../engine/useTimeline'

// ---------------------------------------------------------------------------
// Pure helpers (exported for unit tests)
// ---------------------------------------------------------------------------

export function batteryFromElapsed(elapsed: number, durationSec: number): number {
  return Math.max(0, Math.round(98 - (elapsed / durationSec) * 8))
}

export function tempFromElapsed(elapsed: number, durationSec: number): number {
  return Math.min(44, Math.round(36 + (elapsed / durationSec) * 8))
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ScanDetection = {
  label: string
  meta: string
  state: 'confirmed' | 'suspect' | 'discarded'
}

export type ScanState = {
  progress: number
  /** progresso contínuo (não arredondado) — alimenta os gráficos para
      movimento fluido a cada frame, sem os "degraus" do valor inteiro */
  progressExact: number
  elapsedSec: number
  clock: string
  battery: number
  temp: number
  gnss: 'FIX' | 'NO FIX'
  /** modalidade do cenário — define a assinatura de movimento do IMU */
  modality: Modality
  /** assinaturas de GPR já reveladas (uma por achado de GPR, no seu instante) */
  gprSignatures: GprSignature[]
  /** há achado de EMI revelado → pico na curva de condutividade */
  emiActive: boolean
  sensorNotes: Partial<Record<'gpr' | 'emi' | 'imu' | 'gnss', string>>
  detections: ScanDetection[]
  fusionNote: string | null
  log: [string, string][]
  playing: boolean
  play(): void
  pause(): void
  seek(t: number): void
  setRate(r: number): void
  restart(): void
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTime(t: number): string {
  return `t=${String(Math.round(t)).padStart(2, '0')}s`
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useScan(
  scenarioId: ScenarioId,
  opts?: { autostart?: boolean; onComplete?: () => void },
): ScanState {
  const scenario = getScenario(scenarioId)
  const { durationSec } = scenario
  const { events } = getTimeline(scenarioId)

  const [detections, setDetections] = useState<ScanDetection[]>([])
  const [log, setLog] = useState<[string, string][]>([])
  const [sensorNotes, setSensorNotes] = useState<Partial<Record<'gpr' | 'emi' | 'imu' | 'gnss', string>>>({})
  const [fusionNote, setFusionNote] = useState<string | null>(null)

  const handleEvent = useCallback((e: TimelineEvent) => {
    // Accumulate sensor notes
    if (e.sensors && (e.kind === 'detection' || e.kind === 'subliminal' || e.kind === 'refinement')) {
      setSensorNotes((prev) => ({ ...prev, ...e.sensors }))
    }

    // Accumulate detections
    if (e.kind === 'detection') {
      const label = e.label ?? e.targetRef ?? '?'
      const meta = e.meta ?? ''
      setDetections((prev) => {
        // If already tracked as suspect with same label, upgrade to confirmed
        const idx = prev.findIndex((d) => d.state === 'suspect' && d.label === label)
        if (idx !== -1) {
          const next = [...prev]
          next[idx] = { ...next[idx], state: 'confirmed', meta }
          return next
        }
        return [...prev, { label, meta, state: 'confirmed' }]
      })
    } else if (e.kind === 'false-echo') {
      const label = e.label ?? '?'
      const meta = e.meta ?? ''
      setDetections((prev) => [...prev, { label, meta, state: 'suspect' }])
    } else if (e.kind === 'discard') {
      setDetections((prev) => {
        // Find last suspect and mark as discarded
        const next = [...prev]
        for (let i = next.length - 1; i >= 0; i--) {
          if (next[i].state === 'suspect') {
            next[i] = { ...next[i], state: 'discarded' }
            break
          }
        }
        return next
      })
    } else if (e.kind === 'fusion') {
      if (e.label) setFusionNote(e.label)
    }

    // Accumulate log
    const logKinds: TimelineEvent['kind'][] = [
      'phase', 'subliminal', 'detection', 'refinement',
      'degradation', 'fusion', 'consolidation',
    ]
    if (logKinds.includes(e.kind)) {
      setLog((prev) => [...prev, [formatTime(e.t), e.label ?? e.kind]])
    }
  }, [])

  const timeline = useTimeline({
    durationSec,
    events,
    autostart: opts?.autostart ?? false,
    onEvent: handleEvent,
    onComplete: opts?.onComplete,
  })

  const restart = useCallback(() => {
    // Reset all accumulated state
    setDetections([])
    setLog([])
    setSensorNotes({})
    setFusionNote(null)
    // Reset timeline to t=0 and start playing
    timeline.seek(0)
    timeline.play()
  }, [timeline])

  const { elapsed, playing, play, pause, seek, setRate } = timeline

  const clock = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  // A barra da varredura atinge 100% no fim da F2 (Roteiro §2.4); os últimos
  // 10s são F3 — Consolidação (barra em 100%, geração do GSFS_RECORD).
  const f2EndSec = Math.max(1, durationSec - 10)
  const progressExact = Math.max(0, Math.min(100, (elapsed / f2EndSec) * 100))

  // Assinaturas de GPR já reveladas: cada achado de GPR (evento de detecção com
  // nota no sensor gpr) surge no seu instante; lâmina d'água vira linha
  // horizontal, demais alvos viram hipérbole. Posicionadas pela profundidade.
  const gprSignatures: GprSignature[] = events
    .filter((e) => e.kind === 'detection' && e.sensors?.gpr && e.t <= elapsed)
    .map((e) => {
      const tgt = scenario.targets.find((t) => t.label === e.targetRef)
      if (!tgt) return null
      // `at` = instante do achado na escala da varredura (mesma da linha de
      // varredura / barra de progresso): posiciona a hipérbole onde a varredura
      // estava ao detectar.
      const at = Math.max(0, Math.min(1, e.t / f2EndSec))
      return { depth: tgt.depth, kind: tgt.type === 'agua' ? 'line' : 'hyperbola', at } as GprSignature
    })
    .filter((s): s is GprSignature => s !== null)

  const emiActive = events.some(
    (e) => e.kind === 'detection' && e.sensors?.emi && e.t <= elapsed,
  )

  return {
    progress: Math.round(progressExact),
    progressExact,
    elapsedSec: elapsed,
    clock,
    battery: batteryFromElapsed(elapsed, durationSec),
    temp: tempFromElapsed(elapsed, durationSec),
    gnss: elapsed >= scenario.fixSec ? 'FIX' : 'NO FIX',
    modality: scenario.modality,
    gprSignatures,
    emiActive,
    sensorNotes,
    detections,
    fusionNote,
    log,
    playing,
    play,
    pause,
    seek,
    setRate,
    restart,
  }
}
