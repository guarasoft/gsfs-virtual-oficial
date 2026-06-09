import { useState } from 'react'
import { Link } from 'react-router-dom'
import ReviewBar from '../../components/ReviewBar'
import WfScreen from '../../components/WfScreen'
import ScanView, { type Scene } from '../../components/ScanView'

// E7 — Replay (PRD CA-07 + Pilar 4). Dois estados:
//  • list   — Listagem de gravações (sessões GSFS_RECORD salvas)
//  • replay — reprodução determinística, espelhando a varredura (ScanView)
//             + selo MODO REPLAY + barra de controle de reprodução.

const records = [
  { id: 'GSFS-RECORD-2026-06-03-142', cenario: 'C1 · Veio de Ouro em Encosta Rochosa', dt: '03/06/2026 14:34', dur: '01:30', alvos: '2 alvos' },
  { id: 'GSFS-RECORD-2026-06-03-138', cenario: 'C2 · Levantamento de Massa Magnetítica', dt: '03/06/2026 11:20', dur: '01:30', alvos: '3 alvos' },
  { id: 'GSFS-RECORD-2026-06-02-131', cenario: 'C3 · Cavidade Subterrânea em Solo Saturado', dt: '02/06/2026 16:05', dur: '01:30', alvos: '2 alvos' },
  { id: 'GSFS-RECORD-2026-06-02-127', cenario: 'C4 · Operação sob Interferência EM', dt: '02/06/2026 10:48', dur: '01:30', alvos: '1 alvo · 2 descartados' },
  { id: 'GSFS-RECORD-2026-06-01-119', cenario: 'C5 · Inteligência Subsuperficial Integrada', dt: '01/06/2026 15:12', dur: '02:15', alvos: '4 alvos' },
]

// Sessão de exemplo reproduzida (C1).
const REPLAY_SCENE: Scene = {
  progress: 75, clock: '14:33:28', bat: '88%', temp: '37°C', gnss: 'FIX · 12 sat',
  gprNote: 'marcador [Au] · hipérbole de reflexão',
  detections: [
    { name: 'Magnetita', meta: '1,8 m · t=35s' },
    { name: 'Ouro (veio)', meta: '3,0 m · 65° · t=60s' },
  ],
  log: [
    ['t=00s', 'Início da sessão (gravada)'],
    ['t=10s', 'GNSS · FIX adquirido'],
    ['t=35s', 'Detecção: Magnetita (1,8 m)'],
    ['t=60s', 'Detecção: Ouro — veio 3,0 m (65°)'],
    ['t=67s', 'Reprodução 75% · determinística'],
  ],
}

function ReplayBanner() {
  return (
    <div className="wf-replay-banner">
      <span className="pulse" />
      <span className="seal">MODO REPLAY</span>
      <span className="info">
        reproduzindo GSFS-RECORD-2026-06-03-142 · reprodução determinística (CA-07)
      </span>
    </div>
  )
}

function PlaybackBar() {
  return (
    <div className="wf-playback">
      <button className="ctrl" title="Anterior">⏮</button>
      <button className="ctrl" title="Pausar">⏸</button>
      <button className="ctrl" title="Próximo">⏭</button>
      <div className="scrub wf-bar"><span style={{ width: '75%' }} /></div>
      <span className="time">01:07 / 01:30</span>
      <span className="speed">1×</span>
    </div>
  )
}

export default function E7Replay() {
  const [view, setView] = useState<'list' | 'replay'>('list')

  return (
    <>
      <ReviewBar crumb="Wireframes · E7 — Replay">
        <div className="wf-phasebar">
          <span>Vista:</span>
          <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>Listagem</button>
          <button className={view === 'replay' ? 'active' : ''} onClick={() => setView('replay')}>Replay</button>
        </div>
      </ReviewBar>

      <WfScreen
        title={view === 'list' ? 'GRAVAÇÕES' : 'REPRODUÇÃO DE SESSÃO'}
        subtitle="GROUND SCANNING FUSION SYSTEM"
        meta={
          view === 'list'
            ? ['MODO: REPLAY', 'SESSÕES: 5', 'PILAR 4 · REPLAY']
            : ['CENÁRIO: C1 · Veio de Ouro', 'SESSÃO: GSFS-RECORD-…142', 'MODO: REPLAY']
        }
        footerRight="REPLAY — WIREFRAME (BAIXA FIDELIDADE)"
      >
        {view === 'list' ? (
          <div className="wf-reclist">
            <div>
              <div className="wf-reclist-h">Gravações de sessão (GSFS_RECORD)</div>
              <div className="wf-reclist-sub">Selecione uma sessão para reproduzir de forma determinística.</div>
            </div>
            {records.map((r) => (
              <div className="wf-rec" key={r.id}>
                <span className="main">{r.cenario}</span>
                <span className="col">{r.dt}</span>
                <span className="col">{r.dur}</span>
                <span className="col">{r.alvos}</span>
                <span className="col id">{r.id}</span>
                <div className="acts">
                  <button className="wf-btn" onClick={() => setView('replay')}>Reproduzir</button>
                  <Link to="/wireframe/e6-export" className="wf-btn wf-btn-ghost">Exportar</Link>
                </div>
              </div>
            ))}
            <div className="wf-actions-bar" style={{ marginTop: 'auto' }}>
              <Link to="/wireframe/e2-menu" className="wf-btn wf-btn-ghost">← Voltar ao menu</Link>
            </div>
          </div>
        ) : (
          <>
            <ScanView scene={REPLAY_SCENE} banner={<ReplayBanner />} controls={<PlaybackBar />} />
            <button
              className="wf-fab wf-fab-left"
              onClick={() => setView('list')}
              title="Voltar às gravações"
            >
              VOLTAR
            </button>
          </>
        )}
      </WfScreen>
    </>
  )
}
