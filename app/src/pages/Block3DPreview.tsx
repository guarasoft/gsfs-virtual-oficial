import { Link, useSearchParams } from 'react-router-dom'
import { SCENARIOS, getScenario } from '../prototype/data/scenarios'
import { getSceneSpec } from '../prototype/block3d/sceneSpec'
import { SubsurfaceBlock } from '../prototype/block3d/SubsurfaceBlock'
import type { ScenarioId } from '../prototype/data/types'
import '../prototype/steps/E5Result.css'
import './Block3DPreview.css'

const VALID = new Set(SCENARIOS.map((s) => s.id))

/**
 * Rota interna de review do bloco 3D (Fase 4 — D-020).
 * Renderiza o SubsurfaceBlock isolado, no mesmo container da E5,
 * para validar cada cenário sem percorrer o simulador inteiro.
 */
export default function Block3DPreview() {
  const [params, setParams] = useSearchParams()
  const raw = params.get('c') ?? 'c1'
  const id = (VALID.has(raw as ScenarioId) ? raw : 'c1') as ScenarioId
  const scenario = getScenario(id)

  return (
    <div className="b3p-page">
      <header className="b3p-header">
        <Link to="/" className="b3p-back">← Hub</Link>
        <h1 className="b3p-title">Bloco 3D de Resultado — Review (Fase 4)</h1>
        <nav className="b3p-tabs" aria-label="Cenários">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              className={`b3p-tab${s.id === id ? ' b3p-tab--active' : ''}`}
              onClick={() => setParams({ c: s.id })}
              disabled={!getSceneSpec(s.id) && s.id !== id}
              title={getSceneSpec(s.id) ? s.name : `${s.name} (em breve)`}
            >
              C{s.n}
            </button>
          ))}
        </nav>
      </header>

      <main className="b3p-stage">
        <div className="b3p-frame">
          {/* mesmo container da E5 (grade técnica + vinheta via CSS existente) */}
          <div className="e5-3d-block" aria-label="Visualização 3D do subsolo">
            {/* key força remontagem ao trocar de cenário (reinicia o beat sheet) */}
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
