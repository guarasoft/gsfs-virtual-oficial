import { Button, Card, Panel } from '../../ui'
import { Screen } from '../shell/Screen'
import { useSimulator } from '../store'
import { getScenario } from '../data/scenarios'
import './E5Result.css'

const RECORD_ID = 'GSFS-RECORD-2026-06-03-142'
const HASH = 'a9f2c71d4e8b3f06d21a7c95e0b48f1c6d3a92e7b8045fc1ad9e23b6708c4f5d'
const DATA = '03/06/2026'
const HORA = '14:34:31'
const VOLUME = '2,4 m³'

function formatDepth(d: number): string {
  // 1 decimal, separador vírgula (pt-BR)
  return d.toFixed(1).replace('.', ',') + ' m'
}

export function E5Result() {
  const goTo = useSimulator((s) => s.goTo)
  const newOperation = useSimulator((s) => s.newOperation)
  const replayCurrent = useSimulator((s) => s.replayCurrent)
  const selectedScenarioId = useSimulator((s) => s.selectedScenarioId)

  const scenarioId = selectedScenarioId ?? 'c1'
  const scenario = getScenario(scenarioId)

  const assets = scenario.targets.map((t) => ({
    name: t.label,
    meta: formatDepth(t.depth) + (t.angle != null ? ` · ${t.angle}°` : ''),
  }))

  return (
    <Screen
      title="RESULTADO DA OPERAÇÃO"
      subtitle="GROUND SCANNING FUSION SYSTEM"
      meta={[
        `CENÁRIO: ${scenario.name.toUpperCase()}`,
        `SESSÃO: ${RECORD_ID}`,
        'STATUS: CONCLUÍDA',
      ]}
    >
      <div className="e5-layout">
      <div className="e5-body">
        {/* ---- Bloco 3D (placeholder para o vídeo Guarasoft D-020) ---- */}
        <div className="e5-3d-block" aria-label="Visualização 3D do subsolo">
          <div className="e5-3d-inner">
            <div className="e5-3d-label">[ Bloco 3D do subsolo · perspectiva em 1ª pessoa ]</div>
            <div className="e5-3d-caption">
              vídeo interpretativo (Guarasoft) · marcadores:{' '}
              {assets.map((a) => a.name).join(', ')}
            </div>
          </div>
        </div>

        {/* ---- Legenda lateral ---- */}
        <aside className="e5-legend">
          <Panel title="Registro da operação">
            <div className="e5-legend-body">
              {/* Dados da sessão */}
              <div className="e5-legend-rows">
                <div className="e5-legend-row">
                  <span className="e5-legend-key">Data</span>
                  <strong className="e5-legend-val">{DATA}</strong>
                </div>
                <div className="e5-legend-row">
                  <span className="e5-legend-key">Hora</span>
                  <strong className="e5-legend-val">{HORA}</strong>
                </div>
                <div className="e5-legend-row">
                  <span className="e5-legend-key">Volume cúbico</span>
                  <strong className="e5-legend-val">{VOLUME}</strong>
                </div>
              </div>

              {/* Ativos identificados */}
              <div className="e5-legend-section">ATIVOS IDENTIFICADOS</div>
              <div className="e5-assets">
                {assets.map((a) => (
                  <Card key={a.name}>
                    <div className="e5-asset">
                      <span className="e5-asset-name">{a.name}</span>
                      <span className="e5-asset-meta">{a.meta}</span>
                    </div>
                  </Card>
                ))}
              </div>

              {/* GSFS_RECORD */}
              <div className="e5-legend-section">GSFS_RECORD</div>
              <div className="e5-legend-rows">
                <div className="e5-legend-row">
                  <span className="e5-legend-key">ID</span>
                  <strong className="e5-legend-val e5-legend-val--mono">{RECORD_ID}</strong>
                </div>
              </div>

              {/* Hash */}
              <div className="e5-legend-section">HASH SHA-256 (cadeia de custódia)</div>
              <div className="e5-hash">{HASH}</div>
            </div>
          </Panel>
        </aside>
      </div>

      {/* ---- Barra de ações ---- */}
      <div className="e5-actions">
        <Button variant="ghost" onClick={() => newOperation()}>Nova operação</Button>
        <Button variant="secondary" onClick={() => replayCurrent()}>Replay</Button>
        <Button variant="primary" onClick={() => goTo('e6-export')}>Exportar →</Button>
      </div>
      </div>
    </Screen>
  )
}
