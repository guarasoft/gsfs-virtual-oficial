import { useState } from 'react'
import { Button, Card, Panel, EdgeTab } from '../../ui'
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

function formatDepth(d: number): string {
  return d.toFixed(1).replace('.', ',') + ' m'
}

function formatElapsed(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// ---------------------------------------------------------------------------
// Subcomponente: Banner MODO REPLAY (D-017 — dados da missão)
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
// Subcomponente: Barra de controles de playback
// ---------------------------------------------------------------------------

function PlaybackBar({
  playing,
  elapsedSec,
  durationSec,
  rate,
  onPlay,
  onPause,
  onSeek,
  onSkipStart,
  onSkipEnd,
  onRateToggle,
}: {
  playing: boolean
  elapsedSec: number
  durationSec: number
  rate: number
  onPlay: () => void
  onPause: () => void
  onSeek: (t: number) => void
  onSkipStart: () => void
  onSkipEnd: () => void
  onRateToggle: () => void
}) {
  return (
    <div className="e7-playback">
      <button
        className="e7-pb-ctrl"
        title="Ir ao início"
        onClick={onSkipStart}
        aria-label="Ir ao início"
      >
        ⏮
      </button>
      <button
        className="e7-pb-ctrl"
        title={playing ? 'Pausar' : 'Reproduzir'}
        onClick={playing ? onPause : onPlay}
        aria-label={playing ? 'Pausar' : 'Reproduzir'}
      >
        {playing ? '⏸' : '▶'}
      </button>
      <button
        className="e7-pb-ctrl"
        title="Ir ao fim"
        onClick={onSkipEnd}
        aria-label="Ir ao fim"
      >
        ⏭
      </button>
      <input
        type="range"
        className="e7-pb-scrub"
        min={0}
        max={durationSec}
        step={1}
        value={Math.floor(elapsedSec)}
        onChange={(e) => onSeek(Number(e.target.value))}
        aria-label="Linha do tempo"
      />
      <span className="e7-pb-time">
        {formatElapsed(elapsedSec)} / {formatDuration(durationSec)}
      </span>
      <button
        className="e7-pb-rate"
        onClick={onRateToggle}
        title="Velocidade de reprodução"
        aria-label="Velocidade de reprodução"
      >
        {rate}×
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Subcomponente: Bloco de resultado final (D-020 — espelha E5)
// ---------------------------------------------------------------------------

function ReplayResultBlock({
  scenarioId,
  onBack,
}: {
  scenarioId: ScenarioId
  onBack: () => void
}) {
  const scenario = getScenario(scenarioId)
  const rec = RECORD_META[scenarioId]

  const assets = scenario.targets.map((t) => ({
    name: t.label,
    meta: formatDepth(t.depth) + (t.angle != null ? ` · ${t.angle}°` : ''),
  }))

  return (
    <div className="e7-result-overlay" role="region" aria-label="Resultado do replay">
      <div className="e7-result-header">
        <span className="e7-result-header-title">RESULTADO DA SESSÃO GRAVADA</span>
        <span className="e7-result-header-sub">
          D-020 · bloco 3D do subsolo (Guarasoft) — revisão em replay
        </span>
      </div>

      <div className="e7-result-body">
        {/* Bloco 3D — mesmo padrão visual de E5 */}
        <div className="e7-3d-block" aria-label="Visualização 3D do subsolo">
          <div className="e7-3d-inner">
            <div className="e7-3d-label">[ Bloco 3D do subsolo · perspectiva em 1ª pessoa ]</div>
            <div className="e7-3d-caption">
              vídeo interpretativo (Guarasoft) · marcadores:{' '}
              {assets.map((a) => a.name).join(', ')}
            </div>
          </div>
        </div>

        {/* Legenda lateral */}
        <aside className="e7-legend">
          <Panel title="Registro da operação">
            <div className="e7-legend-body">
              <div className="e7-legend-rows">
                <div className="e7-legend-row">
                  <span className="e7-legend-key">Data</span>
                  <strong className="e7-legend-val">{rec.dt}</strong>
                </div>
                <div className="e7-legend-row">
                  <span className="e7-legend-key">Hora</span>
                  <strong className="e7-legend-val">{rec.hora}</strong>
                </div>
                <div className="e7-legend-row">
                  <span className="e7-legend-key">Duração</span>
                  <strong className="e7-legend-val">{formatDuration(scenario.durationSec)}</strong>
                </div>
                <div className="e7-legend-row">
                  <span className="e7-legend-key">Volume cúbico</span>
                  <strong className="e7-legend-val">{rec.volume}</strong>
                </div>
              </div>

              <div className="e7-legend-section">ATIVOS IDENTIFICADOS</div>
              <div className="e7-assets">
                {assets.map((a) => (
                  <Card key={a.name}>
                    <div className="e7-asset">
                      <span className="e7-asset-name">{a.name}</span>
                      <span className="e7-asset-meta">{a.meta}</span>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="e7-legend-section">GSFS_RECORD</div>
              <div className="e7-legend-rows">
                <div className="e7-legend-row">
                  <span className="e7-legend-key">ID</span>
                  <strong className="e7-legend-val e7-legend-val--mono">{rec.id}</strong>
                </div>
              </div>

              <div className="e7-legend-section">HASH SHA-256 (cadeia de custódia)</div>
              <div className="e7-hash">{rec.hash}</div>
            </div>
          </Panel>
        </aside>
      </div>

      <div className="e7-result-actions">
        <Button variant="ghost" onClick={onBack}>← Voltar às gravações</Button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Subcomponente: Tela de Replay (um cenário em reprodução)
// ---------------------------------------------------------------------------

function ReplayPlayer({
  scenarioId,
  onBack,
}: {
  scenarioId: ScenarioId
  onBack: () => void
}) {
  const [rate, setRateState] = useState(1)
  const [completed, setCompleted] = useState(false)

  const scan = useScan(scenarioId, {
    autostart: true,
    onComplete: () => setCompleted(true),
  })

  const scenario = getScenario(scenarioId)

  function handleRateToggle() {
    const next = rate === 1 ? 2 : 1
    setRateState(next)
    scan.setRate(next)
  }

  if (completed) {
    return (
      <div className="e7-root">
        <ReplayResultBlock scenarioId={scenarioId} onBack={onBack} />
      </div>
    )
  }

  return (
    <div className="e7-root">
      <ScanView
        state={scan}
        banner={<ReplayBanner scenarioId={scenarioId} />}
        controls={
          <PlaybackBar
            playing={scan.playing}
            elapsedSec={scan.elapsedSec}
            durationSec={scenario.durationSec}
            rate={rate}
            onPlay={scan.play}
            onPause={scan.pause}
            onSeek={scan.seek}
            onSkipStart={() => scan.seek(0)}
            onSkipEnd={() => scan.seek(scenario.durationSec)}
            onRateToggle={handleRateToggle}
          />
        }
      />
      <EdgeTab side="left" onClick={onBack} title="Voltar às gravações">
        VOLTAR
      </EdgeTab>
    </div>
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
                  <Button
                    variant="primary"
                    onClick={() => onPlay(s.id)}
                  >
                    Reproduzir
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => onExport(s.id)}
                  >
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
    return (
      <ReplayPlayer
        scenarioId={replayScenarioId}
        onBack={handleBackToList}
      />
    )
  }

  return (
    <RecordList
      onPlay={handlePlay}
      onExport={() => goTo('e6-export')}
      onMenu={() => goTo('e2-menu')}
    />
  )
}
