import { useState, useEffect } from 'react'
import { Button, EdgeTab } from '../../ui'
import { Screen } from '../shell/Screen'
import { useSimulator } from '../store'
import { SCENARIOS, getScenario } from '../data/scenarios'
import type { ScenarioId } from '../data/types'
import { useScan } from '../sim/useScan'
import { ScanView } from '../sim/ScanView'
import './E7Replay.css'

// ---------------------------------------------------------------------------
// Dados simbólicos de cada gravação (alinhados ao wireframe E7)
// ---------------------------------------------------------------------------

interface RecordMeta {
  id: string
  dt: string
  hora: string
  hash: string
  volume: string
}

const RECORD_META: Record<ScenarioId, RecordMeta> = {
  c1: {
    id: 'GSFS-RECORD-2026-06-03-142',
    dt: '03/06/2026',
    hora: '14:34:31',
    hash: 'a9f2c71d4e8b3f06d21a7c95e0b48f1c6d3a92e7b8045fc1ad9e23b6708c4f5d',
    volume: '2,4 m³',
  },
  c2: {
    id: 'GSFS-RECORD-2026-06-03-138',
    dt: '03/06/2026',
    hora: '11:20:08',
    hash: 'b3d1e82f5a7c40d9e13b8f26a0c97e2d4b5f18a3c6e90d7b2f41c8e35a7b9d06',
    volume: '5,1 m³',
  },
  c3: {
    id: 'GSFS-RECORD-2026-06-02-131',
    dt: '02/06/2026',
    hora: '16:05:44',
    hash: 'c7f4a20e9b1d53f8a2c6e0b7d4f19a8c3e52b0d6f8a1c4e72b9d0f3a6c8e51b4',
    volume: '3,7 m³',
  },
  c4: {
    id: 'GSFS-RECORD-2026-06-02-127',
    dt: '02/06/2026',
    hora: '10:48:22',
    hash: 'd2e8b51f6c3a07e9b4d0f2a7c5e31b8f4d6a09c7e2b5f81d3a0c6e49b7d2f0e5',
    volume: '1,8 m³',
  },
  c5: {
    id: 'GSFS-RECORD-2026-06-01-119',
    dt: '01/06/2026',
    hora: '15:12:53',
    hash: 'e5a0d73c8b2f16e4a9c3d7b0f4a8e21c5b7d0f3a9c6e82b4d1f5a0c7e34b8d2f',
    volume: '8,2 m³',
  },
}

function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// ---------------------------------------------------------------------------
// Tarja MODO REPLAY (D-017 — dados essenciais da missão)
// ---------------------------------------------------------------------------

function ReplayBanner({ scenarioId }: { scenarioId: ScenarioId }) {
  const scenario = getScenario(scenarioId)
  const rec = RECORD_META[scenarioId]
  const discardCount = scenario.id === 'c4' ? 2 : 0

  return (
    <div className="e7-banner">
      <span className="e7-banner-pulse" aria-hidden="true" />
      <span className="e7-banner-seal">MODO REPLAY</span>
      <div className="e7-banner-meta">
        <span className="e7-banner-item">
          <strong>Cenário:</strong> C{scenario.n} · {scenario.name}
        </span>
        <span className="e7-banner-item">
          <strong>ID:</strong> {rec.id}
        </span>
        <span className="e7-banner-item">
          <strong>Hash:</strong> {rec.hash.slice(0, 16)}…
        </span>
        <span className="e7-banner-item">
          <strong>Sensores:</strong> GPR · EMI · IMU · GNSS/RTK
        </span>
        <span className="e7-banner-item">
          <strong>Alvos:</strong> {scenario.targets.length} detecç{scenario.targets.length !== 1 ? 'ões' : 'ão'}
          {discardCount > 0 ? ` · ${discardCount} descartes` : ''}
        </span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Player de Replay — espelha a tela de varredura (ScanView) + tarja Replay.
// Ao concluir, o conteúdo some e aparecem dois botões centrais (D-020: o
// replay espelha a varredura 2D; o bloco 3D fica só no fechamento da E5).
// ---------------------------------------------------------------------------

function ReplayPlayer({
  scenarioId,
  onBack,
}: {
  scenarioId: ScenarioId
  onBack: () => void
}) {
  const [completed, setCompleted] = useState(false)
  const scan = useScan(scenarioId, { autostart: true })
  const scenario = getScenario(scenarioId)
  const rec = RECORD_META[scenarioId]

  // Fim da reprodução (barra em 100%): some o conteúdo e mostra Reiniciar/Voltar
  useEffect(() => {
    if (scan.progress < 100) return
    const id = window.setTimeout(() => setCompleted(true), 600)
    return () => clearTimeout(id)
  }, [scan.progress])

  const handleRestart = () => {
    setCompleted(false)
    scan.restart()
  }

  return (
    <Screen
      title="REPRODUÇÃO DE SESSÃO"
      subtitle="GROUND SCANNING FUSION SYSTEM"
      meta={[`CENÁRIO: C${scenario.n} · ${scenario.name}`, `SESSÃO: ${rec.id}`, 'MODO: REPLAY']}
      edge={
        !completed ? (
          <EdgeTab side="left" onClick={onBack} aria-label="Voltar às gravações">VOLTAR</EdgeTab>
        ) : undefined
      }
    >
      {completed ? (
        <div className="e7-end">
          <div className="e7-end-title">Replay concluído</div>
          <div className="e7-end-actions">
            <Button variant="secondary" onClick={handleRestart}>↻ Reiniciar</Button>
            <Button variant="primary" onClick={onBack}>Voltar</Button>
          </div>
        </div>
      ) : (
        <ScanView state={scan} banner={<ReplayBanner scenarioId={scenarioId} />} />
      )}
    </Screen>
  )
}

// ---------------------------------------------------------------------------
// Listagem de gravações
// ---------------------------------------------------------------------------

function RecordList({
  onPlay,
  onExport,
  onMenu,
}: {
  onPlay: (id: ScenarioId) => void
  onExport: (id: ScenarioId) => void
  onMenu: () => void
}) {
  return (
    <Screen
      title="GRAVAÇÕES"
      subtitle="GROUND SCANNING FUSION SYSTEM"
      meta={['MODO: REPLAY', `SESSÕES: ${SCENARIOS.length}`, 'PILAR 4 · REPLAY']}
    >
      <div className="e7-list-body">
        <div className="e7-list-intro">
          <span className="e7-list-intro-title">Gravações de sessão (GSFS_RECORD)</span>
          <span className="e7-list-intro-sub">
            Selecione uma sessão para reproduzir de forma determinística (CA-07).
          </span>
        </div>

        <div className="e7-records">
          {SCENARIOS.map((s) => {
            const rec = RECORD_META[s.id]
            const discards = s.id === 'c4' ? 2 : 0
            const targetLabel = `${s.targets.length} alvo${s.targets.length !== 1 ? 's' : ''}${discards > 0 ? ` · ${discards} descartados` : ''}`

            return (
              <div className="e7-rec" key={s.id}>
                <span className="e7-rec-cenario">C{s.n} · {s.name}</span>
                <span className="e7-rec-col">{rec.dt} {rec.hora.slice(0, 5)}</span>
                <span className="e7-rec-col">{formatDuration(s.durationSec)}</span>
                <span className="e7-rec-col">{targetLabel}</span>
                <span className="e7-rec-col e7-rec-id">{rec.id}</span>
                <div className="e7-rec-actions">
                  <Button variant="primary" onClick={() => onPlay(s.id)}>
                    Reproduzir
                  </Button>
                  <Button variant="ghost" onClick={() => onExport(s.id)}>
                    Exportar
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="e7-list-footer">
          <Button variant="ghost" onClick={onMenu}>← Voltar ao menu</Button>
        </div>
      </div>
    </Screen>
  )
}

// ---------------------------------------------------------------------------
// Componente principal E7Replay
// ---------------------------------------------------------------------------

type E7View = 'listagem' | 'replay'

export function E7Replay() {
  const goTo = useSimulator((s) => s.goTo)
  const [view, setView] = useState<E7View>('listagem')
  const [replayScenarioId, setReplayScenarioId] = useState<ScenarioId | null>(null)

  function handlePlay(id: ScenarioId) {
    setReplayScenarioId(id)
    setView('replay')
  }

  function handleBackToList() {
    setView('listagem')
    setReplayScenarioId(null)
  }

  if (view === 'replay' && replayScenarioId != null) {
    return <ReplayPlayer scenarioId={replayScenarioId} onBack={handleBackToList} />
  }

  return (
    <RecordList
      onPlay={handlePlay}
      onExport={() => goTo('e6-export')}
      onMenu={() => goTo('e2-menu')}
    />
  )
}
