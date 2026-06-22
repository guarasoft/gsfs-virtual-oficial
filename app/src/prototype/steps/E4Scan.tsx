import { useState, useCallback } from 'react'
import { Screen } from '../shell/Screen'
import { EdgeTab, Button } from '../../ui'
import { useSimulator } from '../store'
import { useScan } from '../sim/useScan'
import { ScanView } from '../sim/ScanView'
import { getScenario } from '../data/scenarios'
import './E4Scan.css'

export function E4Scan() {
  const goTo = useSimulator((s) => s.goTo)
  const abort = useSimulator((s) => s.abort)
  const selectedScenarioId = useSimulator((s) => s.selectedScenarioId)
  const scenarioId = selectedScenarioId ?? 'c1'
  const scenario = getScenario(scenarioId)

  const [sheet, setSheet] = useState(false)
  const [confirm, setConfirm] = useState<null | 'restart' | 'abort'>(null)

  const scan = useScan(scenarioId, {
    autostart: true,
    onComplete: () => goTo('e5-result'),
  })

  const openSheet = useCallback(() => {
    scan.pause()
    setSheet(true)
    setConfirm(null)
  }, [scan])

  const closeSheet = useCallback(() => {
    setSheet(false)
    setConfirm(null)
    scan.play()
  }, [scan])

  const handleRestart = useCallback(() => {
    setSheet(false)
    setConfirm(null)
    scan.restart()
  }, [scan])

  const handleAbort = useCallback(() => {
    abort()
  }, [abort])

  return (
    <Screen
      title="VARREDURA EM EXECUÇÃO"
      subtitle="GROUND SCANNING FUSION SYSTEM"
      meta={[
        `CENÁRIO: ${scenario.id.toUpperCase()} · ${scenario.name}`,
        `MODALIDADE: ${scenario.modality}`,
        `SOLO: ${scenario.soil}`,
      ]}
      edge={
        !sheet && !confirm ? (
          <EdgeTab side="right" onClick={openSheet} aria-label="Abrir menu de ações">AÇÕES</EdgeTab>
        ) : undefined
      }
    >
      <ScanView state={scan} />

      {/* Sheet lateral com as ações */}
      {sheet && (
        <>
          <div className="e4-overlay" onClick={closeSheet} />
          <div className="e4-sheet">
            <div className="e4-sheet-top">
              <span className="e4-sheet-title">Ações da varredura</span>
              <button className="e4-sheet-close" onClick={closeSheet} aria-label="Fechar">✕</button>
            </div>
            <div className="e4-sheet-actions">
              <button className="e4-sheet-btn" onClick={() => setConfirm('restart')}>
                <span className="e4-sheet-btn-t">↻ Reiniciar varredura</span>
                <small>Recomeça a operação do início (t=0).</small>
              </button>
              <button className="e4-sheet-btn e4-sheet-btn--danger" onClick={() => setConfirm('abort')}>
                <span className="e4-sheet-btn-t">⨯ Abortar varredura</span>
                <small>Encerra sem gerar GSFS_RECORD.</small>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Modal de confirmação — centralizado na tela (sobre o sheet), por cenário */}
      {confirm && (
        <div className="e4-modal-overlay" onClick={() => setConfirm(null)}>
          <div className="e4-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            {confirm === 'restart' ? (
              <>
                <div className="e4-modal-h">Reiniciar varredura?</div>
                <p className="e4-modal-body">A varredura recomeçará do início (<strong>t=0</strong>) e o progresso atual será descartado.</p>
                <div className="e4-modal-actions">
                  <Button variant="ghost" onClick={() => setConfirm(null)}>Cancelar</Button>
                  <Button onClick={handleRestart}>Reiniciar varredura</Button>
                </div>
              </>
            ) : (
              <>
                <div className="e4-modal-h">Abortar varredura?</div>
                <p className="e4-modal-body">A varredura será encerrada e <strong>nenhum GSFS_RECORD será gerado</strong>. Esta ação não pode ser desfeita.</p>
                <div className="e4-modal-actions">
                  <Button variant="ghost" onClick={() => setConfirm(null)}>Continuar varredura</Button>
                  <Button variant="danger" onClick={handleAbort}>Abortar varredura</Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Screen>
  )
}
