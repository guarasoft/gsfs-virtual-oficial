import { useState, useEffect } from 'react'
import { Button, EdgeTab } from '../../ui'
import { Screen } from '../shell/Screen'
import { useSimulator } from '../store'
import { SCENARIOS, getScenario } from '../data/scenarios'
import { RECORD_META } from '../data/records'
import type { ScenarioId } from '../data/types'
import { useScan } from '../sim/useScan'
import { ScanView } from '../sim/ScanView'
import { SubsurfaceBlock } from '../block3d/SubsurfaceBlock'
import './E5Result.css' /* .e5-3d-block — mesmo container do bloco 3D da E5 */
import './E7Replay.css'

// Metadados simbólicos das gravações: fonte única em data/records.ts
// (compartilhada com a E5 para coerência dos resultados por cenário).

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
// Ao concluir, apresenta o MESMO bloco 3D de resultado da E5 (D-020: fluxo
// varredura → resultado 3D, reaproveitando o ativo sem ferir o CA-07).
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
          <div className="e7-end-title">Replay concluído · Resultado da sessão</div>
          <div className="e5-3d-block e7-end-block" aria-label="Visualização 3D do subsolo">
            <SubsurfaceBlock key={scenarioId} scenario={scenario} />
          </div>
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
  const exportRecord = useSimulator((s) => s.exportRecord)
  // Entrada vinda da E5 (replayTarget definido) → reproduz direto o cenário
  // atual; entrada pelo menu (null) → abre a lista de gravações.
  const replayTarget = useSimulator((s) => s.replayTarget)
  const [view, setView] = useState<E7View>(replayTarget ? 'replay' : 'listagem')
  const [replayScenarioId, setReplayScenarioId] = useState<ScenarioId | null>(replayTarget)
  // origem do replay atual: vindo da E5 (volta ao resultado) ou da lista (volta à lista)
  const [fromResult, setFromResult] = useState<boolean>(!!replayTarget)

  function handlePlay(id: ScenarioId) {
    setReplayScenarioId(id)
    setFromResult(false)
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
        onBack={fromResult ? () => goTo('e5-result') : handleBackToList}
      />
    )
  }

  return (
    <RecordList
      onPlay={handlePlay}
      // exporta a GRAVAÇÃO selecionada (data/ID do GSFS_RECORD, não da missão)
      onExport={(id) => exportRecord(id)}
      onMenu={() => goTo('e2-menu')}
    />
  )
}
