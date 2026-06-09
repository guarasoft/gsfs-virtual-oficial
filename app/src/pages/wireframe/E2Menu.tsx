import { Link } from 'react-router-dom'
import ReviewBar from '../../components/ReviewBar'
import WfScreen from '../../components/WfScreen'

// E2 — Menu / Início. Lançador do apresentador após o boot.
// Enxuto: Nova Operação (→ E3 Setup) e Replay (→ E8 Listagem).

type Action = { k: string; name: string; desc: string; to?: string }

const actions: Action[] = [
  {
    k: '01',
    name: 'NOVA OPERAÇÃO',
    desc: 'Configurar solo, área, modalidade e cenário, e iniciar a varredura.',
    to: '/wireframe/e3-setup',
  },
  {
    k: '02',
    name: 'REPLAY',
    desc: 'Reproduzir uma sessão de varredura já gravada (GSFS_RECORD).',
    to: '/wireframe/e7-replay',
  },
]

const status: [string, string][] = [
  ['SISTEMA', 'PRONTO'],
  ['BATERIA', '98%'],
  ['SENSORES', '4 / 4 OK'],
  ['GNSS', 'FIX'],
]

export default function E2Menu() {
  return (
    <>
      <ReviewBar crumb="Wireframes · E2 — Menu / Início" />
      <WfScreen
        title="MENU PRINCIPAL"
        subtitle="GROUND SCANNING FUSION SYSTEM"
        meta={['VERSÃO: GSFS 1.0', 'MODO: PRONTO', 'GNSS: FIX']}
        footerRight="MENU — WIREFRAME (BAIXA FIDELIDADE)"
      >
        <div className="wf-menu">
          <div className="wf-menu-logo">[ LOGO GSFS ]</div>
          <div style={{ textAlign: 'center' }}>
            <div className="wf-welcome">GSFS VIRTUAL</div>
            <div className="wf-welcome-sub">Selecione uma ação para começar</div>
          </div>

          <div className="wf-actions">
            {actions.map((a) => {
              const inner = (
                <>
                  <span className="wf-action-k">{a.k}</span>
                  <span className="wf-action-name">{a.name}</span>
                  <span className="wf-action-desc">{a.desc}</span>
                </>
              )
              return a.to ? (
                <Link className="wf-action" key={a.k} to={a.to}>
                  {inner}
                </Link>
              ) : (
                <div className="wf-action" key={a.k}>
                  {inner}
                </div>
              )
            })}
          </div>

          <div className="wf-status">
            {status.map(([label, value]) => (
              <span className="dot" key={label}>
                {label}: <strong>{value}</strong>
              </span>
            ))}
          </div>
        </div>
      </WfScreen>
    </>
  )
}
