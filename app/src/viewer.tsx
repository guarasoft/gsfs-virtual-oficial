import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { SCENARIOS, getScenario } from './prototype/data/scenarios'
import { getSceneSpec } from './prototype/block3d/sceneSpec'
import { SubsurfaceBlock } from './prototype/block3d/SubsurfaceBlock'
import type { ScenarioId } from './prototype/data/types'
import './styles/global.css'
import './styles/brand.css'
import './prototype/steps/E5Result.css'
import './pages/Block3DPreview.css'

/**
 * Viewer standalone do bloco 3D (Fase 4) — build single-file para envio ao
 * cliente via WhatsApp (`npm run build:viewer` → dist-viewer/viewer.html).
 * Mesma UI da rota /block3d, sem router (abas por estado local).
 */
function Viewer() {
  const [id, setId] = useState<ScenarioId>('c1')
  const scenario = getScenario(id)

  return (
    <div className="b3p-page">
      <header className="b3p-header">
        <span className="b3p-title">GSFS · Bloco 3D de Resultado — Preview (Fase 4)</span>
        <nav className="b3p-tabs" aria-label="Cenários">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              className={`b3p-tab${s.id === id ? ' b3p-tab--active' : ''}`}
              onClick={() => setId(s.id)}
              disabled={!getSceneSpec(s.id) && s.id !== id}
              title={s.name}
            >
              C{s.n}
            </button>
          ))}
        </nav>
      </header>

      <main className="b3p-stage">
        <div className="b3p-frame">
          <div className="e5-3d-block" aria-label="Visualização 3D do subsolo">
            <SubsurfaceBlock key={id} scenario={scenario} />
          </div>
        </div>
        <p className="b3p-meta">
          {scenario.name} · área {scenario.area.x}×{scenario.area.y} m · profundidade 0–5 m ·{' '}
          {scenario.targets.map((t) => t.label).join(' · ')}
        </p>
      </main>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Viewer />
  </React.StrictMode>,
)
