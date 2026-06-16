import { Screen } from '../shell/Screen'
import { useSimulator } from '../store'
import './E2Menu.css'

const actions = [
  {
    k: '01',
    name: 'NOVA OPERAÇÃO',
    desc: 'Configurar solo, área, modalidade e cenário, e iniciar a varredura.',
    step: 'e3-setup' as const,
  },
  {
    k: '02',
    name: 'REPLAY',
    desc: 'Reproduzir uma sessão de varredura já gravada (GSFS_RECORD).',
    step: 'e7-replay' as const,
  },
]

const statusItems: [string, string][] = [
  ['SISTEMA', 'PRONTO'],
  ['BATERIA', '98%'],
  ['SENSORES', '4 / 4 OK'],
  ['GNSS', 'FIX'],
]

export function E2Menu() {
  const goTo = useSimulator((s) => s.goTo)

  return (
    <Screen
      title="MENU PRINCIPAL"
      subtitle="GROUND SCANNING FUSION SYSTEM"
      meta={['MODO: PRONTO', 'GNSS: FIX']}
    >
      <div className="e2-body">
        {/* Logo (símbolo, sem tipografia) */}
        <img className="e2-logo" src="/logos/GSFS_Logo_Icon_RGB.svg" alt="GSFS" />

        {/* Boas-vindas */}
        <div className="e2-welcome">
          <div className="e2-welcome-title">GSFS VIRTUAL</div>
          <div className="e2-welcome-sub">Selecione uma ação para começar</div>
        </div>

        {/* Cards de ação */}
        <div className="e2-actions">
          {actions.map((a) => (
            <button
              key={a.k}
              className="e2-action"
              onClick={() => goTo(a.step)}
              type="button"
            >
              <span className="e2-action-k">{a.k}</span>
              <span className="e2-action-name">{a.name}</span>
              <span className="e2-action-desc">{a.desc}</span>
            </button>
          ))}
        </div>

        {/* Status inferior */}
        <div className="e2-status">
          {statusItems.map(([label, value]) => (
            <span className="e2-status-pill" key={label}>
              <span className="e2-status-dot" aria-hidden="true" />
              {label}: <strong>{value}</strong>
            </span>
          ))}
        </div>
      </div>
    </Screen>
  )
}
