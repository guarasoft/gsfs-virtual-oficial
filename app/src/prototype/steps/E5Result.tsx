import { useState } from 'react'
import { Button, Card, Panel } from '../../ui'
import { Screen } from '../shell/Screen'
import { useSimulator } from '../store'
import { getScenario } from '../data/scenarios'
import { RECORD_META, liveSessionId } from '../data/records'
import { SubsurfaceBlock } from '../block3d/SubsurfaceBlock'
import './E5Result.css'

function formatDepth(d: number): string {
  // 1 decimal, separador vírgula (pt-BR)
  return d.toFixed(1).replace('.', ',') + ' m'
}

export function E5Result() {
  const newOperation = useSimulator((s) => s.newOperation)
  const replayCurrent = useSimulator((s) => s.replayCurrent)
  const exportCurrent = useSimulator((s) => s.exportCurrent)
  const selectedScenarioId = useSimulator((s) => s.selectedScenarioId)

  const scenarioId = selectedScenarioId ?? 'c1'
  const scenario = getScenario(scenarioId)
  // volume/hash simbólicos POR CENÁRIO (data/records.ts) — coerentes com a
  // lista de gravações da E7 no fluxo completo (homologação)
  const rec = RECORD_META[scenarioId]

  // Data/hora reais da conclusão da operação (PRD §6 / Teto: timestamp real),
  // capturadas ao abrir o resultado — como na E3, que traz a data atual.
  const [now] = useState(() => new Date())
  const DATA = now.toLocaleDateString('pt-BR')
  const HORA = now.toLocaleTimeString('pt-BR')
  // ID do GSFS_RECORD com a data real — mesmo helper usado pela E6 ao
  // exportar a missão atual (coerência entre as telas)
  const RECORD_ID = liveSessionId(now)

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
        {/* ---- Bloco 3D interpretativo (D-020/CA-04 — componente Guarasoft) ---- */}
        <div className="e5-3d-block" aria-label="Visualização 3D do subsolo">
          {/* key remonta ao trocar de cenário (reinicia órbita e beat sheet) */}
          <SubsurfaceBlock key={scenarioId} scenario={scenario} />
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
                  <strong className="e5-legend-val">{rec.volume}</strong>
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
              <div className="e5-hash">{rec.hash}</div>
            </div>
          </Panel>
        </aside>
      </div>

      {/* ---- Barra de ações ---- */}
      <div className="e5-actions">
        <Button variant="ghost" onClick={() => newOperation()}>Nova operação</Button>
        <Button variant="secondary" onClick={() => replayCurrent()}>Replay</Button>
        <Button variant="primary" onClick={() => exportCurrent()}>Exportar →</Button>
      </div>
      </div>
    </Screen>
  )
}
