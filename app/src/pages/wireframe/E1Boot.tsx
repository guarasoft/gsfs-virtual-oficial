import { useState } from 'react'
import ReviewBar from '../../components/ReviewBar'
import WfScreen from '../../components/WfScreen'

// E1 — Boot / Autoteste. Duas fases: 'load' (splash) → 'diag' (diagnóstico).

type State = 'ok' | 'test' | 'wait'
type Item = { label: string; state: State }

const leftItems: Item[] = [
  { label: 'SISTEMA PRINCIPAL', state: 'ok' },
  { label: 'BARRAMENTO DE SENSORES', state: 'test' },
  { label: 'MÓDULO GPR', state: 'wait' },
  { label: 'MÓDULO EMI', state: 'wait' },
  { label: 'IMU / INCLINAÇÃO', state: 'wait' },
  { label: 'GNSS-RTK', state: 'wait' },
]
const rightItems: Item[] = [
  { label: 'BATERIA', state: 'wait' },
  { label: 'TEMPERATURA', state: 'wait' },
  { label: 'GSFS_RECORD', state: 'wait' },
  { label: 'INTEGRIDADE SHA-256', state: 'wait' },
  { label: 'FUSÃO MULTIMODAL', state: 'wait' },
  { label: 'INTERFACE OPERACIONAL', state: 'wait' },
]
const tiles: [string, string][] = [
  ['BATERIA', '98%'],
  ['TEMP.', '31°C'],
  ['SINAL', '100%'],
  ['MEMÓRIA', 'OK'],
  ['BUS', 'ONLINE'],
  ['FUSÃO', 'ATIVA'],
]

function Row({ label, state }: Item) {
  return (
    <div className="wf-item">
      <span className="label">{label}</span>
      <span className={`wf-state ${state}`}>
        {state === 'test' && (
          <span className="wf-bar wf-mini">
            <span style={{ width: '55%' }} />
          </span>
        )}
        {state.toUpperCase()}
      </span>
    </div>
  )
}

function Splash() {
  return (
    <div className="wf-splash">
      <div className="wf-splash-logo">[ LOGO GSFS ]</div>
      <div className="wf-tagline">GROUND SCANNING FUSION SYSTEM</div>
      <div className="wf-init">INICIALIZANDO NÚCLEO GSFS</div>
      <div className="wf-bar">
        <span style={{ width: '60%' }} />
      </div>
      <div className="wf-caption">
        Carregando módulos de varredura, fusão de sensores e integridade operacional.
      </div>
    </div>
  )
}

function Diag() {
  return (
    <>
      <div className="wf-diag">
        <div className="wf-panel left">
          <div className="wf-panel-h">DIAGNÓSTICO DE INICIALIZAÇÃO</div>
          <div className="wf-panel-sub">
            Sequência automática de verificação antes da operação em campo.
          </div>
          <div className="wf-cols">
            <div className="wf-col">
              {leftItems.map((it) => (
                <Row key={it.label} {...it} />
              ))}
            </div>
            <div className="wf-col">
              {rightItems.map((it) => (
                <Row key={it.label} {...it} />
              ))}
            </div>
          </div>
        </div>

        <div className="wf-panel right">
          <div className="wf-panel-h">TELEMETRIA DE BOOT</div>
          <div className="wf-radar">[ radar / scope de varredura ]</div>
          <div className="wf-sensors">SENSORES:&nbsp;&nbsp;GPR • EMI • IMU • GNSS</div>
          <div className="wf-tiles">
            {tiles.map(([label, value]) => (
              <div className="wf-tile" key={label}>
                <span className="t-label">{label}</span>
                <span className="t-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wf-progress-geral">
        <div className="pg-label">
          PROGRESSO GERAL · verificação dos módulos em sequência
        </div>
        <div className="wf-bar">
          <span style={{ width: '30%' }} />
        </div>
      </div>
    </>
  )
}

export default function E1Boot() {
  const [phase, setPhase] = useState<'load' | 'diag'>('load')
  return (
    <>
      <ReviewBar crumb="Wireframes · E1 — Boot / Autoteste">
        <div className="wf-phasebar">
          <span>Fase:</span>
          <button className={phase === 'load' ? 'active' : ''} onClick={() => setPhase('load')}>
            1 · Carregando
          </button>
          <button className={phase === 'diag' ? 'active' : ''} onClick={() => setPhase('diag')}>
            2 · Diagnóstico
          </button>
        </div>
      </ReviewBar>

      {phase === 'load' ? (
        <WfScreen bare>
          <Splash />
        </WfScreen>
      ) : (
        <WfScreen
          title="AUTOTESTE INICIAL"
          subtitle="GROUND SCANNING FUSION SYSTEM • SEQUÊNCIA DE BOOT"
          meta={['VERSÃO: GSFS-BOOT 1.0', 'MODO: OPERATIONAL STANDBY', 'HASH: A9F2-C71D']}
          footerRight="AUTOTESTE — WIREFRAME (BAIXA FIDELIDADE)"
        >
          <Diag />
        </WfScreen>
      )}
    </>
  )
}
