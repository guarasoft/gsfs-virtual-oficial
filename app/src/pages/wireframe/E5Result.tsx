import { useState } from 'react'
import { Link } from 'react-router-dom'
import ReviewBar from '../../components/ReviewBar'
import WfScreen from '../../components/WfScreen'

// E5 — Resultado + Bloco 3D (PRD 5.5: bloco 3D + legenda lateral).
// Absorve a antiga E6. Dois estados: 'consol' (selagem do GSFS_RECORD,
// Roteiro F3) → 'result' (bloco 3D em 1ª pessoa + legenda).

const HASH = 'a9f2c71d4e8b3f06d21a7c95e0b48f1c6d3a92e7b8045fc1ad9e23b6708c4f5d'

const RECORD_ID = 'GSFS-RECORD-2026-06-03-142'

const assets: { name: string; meta: string }[] = [
  { name: 'Magnetita', meta: '1,8 m' },
  { name: 'Ouro (veio)', meta: '3,0 m · 65°' },
]

function Consolidando() {
  const steps: [string, string][] = [
    ['Volume agregado', 'calculado'],
    ['Hash SHA-256', 'gerado'],
    ['Cadeia de custódia · GSFS_RECORD', 'selando…'],
  ]
  return (
    <div className="wf-consol">
      <div className="wf-consol-h">CONSOLIDANDO SESSÃO</div>
      <div className="wf-consol-steps">
        {steps.map(([l, st]) => (
          <div className="wf-consol-step" key={l}>
            <span>{l}</span>
            <span className="st">{st}</span>
          </div>
        ))}
      </div>
      <div className="wf-bar"><span style={{ width: '100%' }} /></div>
      <div className="wf-consol-cap">Selando GSFS_RECORD e gerando o registro da sessão…</div>
    </div>
  )
}

function Resultado() {
  return (
    <div className="wf-result">
      <div className="wf-result-body">
        <div className="wf-3d">
          [ Bloco 3D do subsolo · perspectiva em 1ª pessoa ]
          <small>vídeo interpretativo (Guarasoft) · marcadores: Magnetita, Ouro</small>
        </div>

        <div className="wf-legend">
          <div className="wf-legend-h">Registro da operação</div>
          <div className="wf-legend-row"><span>Data</span><strong>03/06/2026</strong></div>
          <div className="wf-legend-row"><span>Hora</span><strong>14:34:31</strong></div>
          <div className="wf-legend-row"><span>Volume cúbico</span><strong>2,4 m³</strong></div>

          <div className="wf-legend-sub">ATIVOS IDENTIFICADOS</div>
          {assets.map((a) => (
            <div className="wf-asset" key={a.name}>
              <span className="a-name">{a.name}</span>
              <span className="a-meta">{a.meta}</span>
            </div>
          ))}

          <div className="wf-legend-sub">GSFS_RECORD</div>
          <div className="wf-legend-row"><span>ID</span><strong>{RECORD_ID}</strong></div>
          <div className="wf-legend-sub">HASH SHA-256 (cadeia de custódia)</div>
          <div className="wf-hash">{HASH}</div>
        </div>
      </div>

      <div className="wf-result-actions">
        <Link to="/wireframe/e2-menu" className="wf-btn wf-btn-ghost">Nova operação</Link>
        <Link to="/wireframe/e7-replay" className="wf-btn">Replay</Link>
        <Link to="/wireframe/e6-export" className="wf-btn">Exportar  →</Link>
      </div>
    </div>
  )
}

export default function E5Result() {
  const [k, setK] = useState<'consol' | 'result'>('result')
  return (
    <>
      <ReviewBar crumb="Wireframes · E5 — Resultado + Bloco 3D">
        <div className="wf-phasebar">
          <span>Estado:</span>
          <button className={k === 'consol' ? 'active' : ''} onClick={() => setK('consol')}>
            Consolidando
          </button>
          <button className={k === 'result' ? 'active' : ''} onClick={() => setK('result')}>
            Resultado
          </button>
        </div>
      </ReviewBar>

      <WfScreen
        title="RESULTADO DA OPERAÇÃO"
        subtitle="GROUND SCANNING FUSION SYSTEM"
        meta={['CENÁRIO: C1 · Veio de Ouro', 'SESSÃO: GSFS-RECORD-…142', 'STATUS: CONCLUÍDA']}
        footerRight="RESULTADO — WIREFRAME (BAIXA FIDELIDADE)"
      >
        {k === 'consol' ? <Consolidando /> : <Resultado />}
      </WfScreen>
    </>
  )
}
