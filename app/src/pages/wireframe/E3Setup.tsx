import { useState } from 'react'
import { Link } from 'react-router-dom'
import ReviewBar from '../../components/ReviewBar'
import WfScreen from '../../components/WfScreen'

// E3 — Setup de Missão (PRD 5.2: solo, área, modalidade, cenário).
// Cenário selecionado → preenche e TRAVA solo/modalidade/área.
// "Nova configuração" (manual) → controles MANIPULÁVEIS (demonstrativo);
// não executa (Iniciar desabilitado). Área = híbrida (livre X×Y + atalhos).

type Scenario = {
  name: string
  manual?: boolean
  soloKeys?: string[]   // solos canônicos a destacar no seletor (Matriz §5)
  soloNote?: string     // detalhe descritivo do solo (ruído, transicional…)
  modalidade?: string
  area?: string
  aplicacao?: string
}

const SCENARIOS: Record<string, Scenario> = {
  manual: { name: 'Nova configuração (manual)', manual: true },
  c1: { name: 'Cenário 1 — Veio de Ouro em Encosta Rochosa', soloKeys: ['Rochoso'], modalidade: 'Manual', area: '10 × 10 m', aplicacao: 'Prospecção mineral' },
  c2: { name: 'Cenário 2 — Levantamento de Massa Magnetítica', soloKeys: ['Arenoso'], modalidade: 'Carrinho Autônomo', area: '20 × 20 m', aplicacao: 'Mapeamento de minério ferroso' },
  c3: { name: 'Cenário 3 — Cavidade Subterrânea em Solo Saturado', soloKeys: ['Úmido'], modalidade: 'Mochila', area: '15 × 15 m', aplicacao: 'Inspeção de risco geotécnico (Defesa Civil)' },
  c4: { name: 'Cenário 4 — Operação sob Interferência Eletromagnética', soloKeys: ['Rochoso'], soloNote: 'Rochoso · com ruído eletromagnético', modalidade: 'Carrinho Autônomo', area: '25 × 25 m', aplicacao: 'Resiliência operacional (CA-06)' },
  c5: { name: 'Cenário 5 — Inteligência Subsuperficial Integrada', soloKeys: ['Arenoso', 'Úmido'], soloNote: 'Arenoso úmido · transicional', modalidade: 'Mochila', area: '20 × 20 m', aplicacao: 'Demonstração institucional GSFS' },
}

const SOLOS = ['Rochoso', 'Arenoso', 'Úmido']
const MODALIDADES = ['Carrinho Autônomo', 'Mochila', 'Manual']
const AREA_PRESETS: [number, number][] = [[10, 10], [15, 15], [20, 20], [25, 25]]

function Seg({ options, actives, locked, onSelect }: {
  options: string[]; actives: string[]; locked?: boolean; onSelect?: (v: string) => void
}) {
  return (
    <div className="wf-seg">
      {options.map((o) => {
        const on = actives.includes(o)
        return locked ? (
          <div key={o} className={`opt${on ? ' active' : ''}`}>{o}</div>
        ) : (
          <button key={o} className={`opt${on ? ' active' : ''}`} onClick={() => onSelect?.(o)}>{o}</button>
        )
      })}
    </div>
  )
}

export default function E3Setup() {
  const [sel, setSel] = useState('manual')
  const [mSolo, setMSolo] = useState('')
  const [mModal, setMModal] = useState('')
  const [aX, setAX] = useState(20)
  const [aY, setAY] = useState(20)

  const s = SCENARIOS[sel]
  const isManual = !!s.manual

  return (
    <>
      <ReviewBar crumb="Wireframes · E3 — Setup de Missão" />
      <WfScreen
        title="CONFIGURAÇÃO DE MISSÃO"
        subtitle="SETUP DE OPERAÇÃO"
        meta={['VERSÃO: GSFS 1.0', 'MODO: SETUP', 'GNSS: FIX']}
        footerRight="SETUP — WIREFRAME (BAIXA FIDELIDADE)"
      >
        <div className="wf-setup">
          <div className="wf-field">
            <label className="wf-label" htmlFor="cenario">Cenário</label>
            <select id="cenario" className="wf-select" value={sel} onChange={(e) => setSel(e.target.value)}>
              {Object.entries(SCENARIOS).map(([k, v]) => (
                <option key={k} value={k}>{v.name}</option>
              ))}
            </select>
          </div>

          <div className="wf-setup-cols">
            <div className="wf-setup-col">
              <div className="wf-field">
                <span className="wf-label">Tipo de solo</span>
                <Seg
                  options={SOLOS}
                  actives={isManual ? (mSolo ? [mSolo] : []) : (s.soloKeys ?? [])}
                  locked={!isManual}
                  onSelect={setMSolo}
                />
                {!isManual && s.soloNote && <div className="wf-seg-note">{s.soloNote}</div>}
              </div>
              <div className="wf-field">
                <span className="wf-label">Modalidade</span>
                <Seg
                  options={MODALIDADES}
                  actives={isManual ? (mModal ? [mModal] : []) : (s.modalidade ? [s.modalidade] : [])}
                  locked={!isManual}
                  onSelect={setMModal}
                />
              </div>
              <div className="wf-field">
                <span className="wf-label">Área de varredura</span>
                {isManual ? (
                  <>
                    <div className="wf-area">
                      <input type="number" min={1} value={aX} onChange={(e) => setAX(Number(e.target.value))} aria-label="Eixo X (m)" />
                      <span className="x">×</span>
                      <input type="number" min={1} value={aY} onChange={(e) => setAY(Number(e.target.value))} aria-label="Eixo Y (m)" />
                      <span className="unit">m</span>
                    </div>
                    <div className="wf-area-presets">
                      {AREA_PRESETS.map(([x, y]) => (
                        <button key={`${x}x${y}`} className="wf-area-preset" onClick={() => { setAX(x); setAY(y) }}>
                          {x}×{y} m
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="wf-readout">{s.area}</div>
                )}
              </div>
            </div>

            <div className="wf-setup-col">
              <div className="wf-summary">
                <div className="wf-summary-h">Contexto da operação</div>
                <div className="wf-ctx">
                  <div className="wf-ctx-row"><span>Data</span><strong>03/06/2026</strong></div>
                  <div className="wf-ctx-row"><span>Hora</span><strong>14:34:31</strong></div>
                  <div className="wf-ctx-row"><span>Coordenadas (GNSS)</span><strong>−23,5489° / −46,6388°</strong></div>
                  <div className="wf-ctx-row"><span>Posicionamento</span><strong>FIX · 12 satélites</strong></div>
                  {!isManual && (
                    <div className="wf-ctx-row"><span>Operação</span><strong>{s.aplicacao}</strong></div>
                  )}
                </div>
                <div className="wf-ctx-map">[ mapa · posição atual (GNSS) ]</div>
              </div>
            </div>
          </div>

          <div className="wf-actions-bar">
            <Link to="/wireframe/e2-menu" className="wf-btn wf-btn-ghost">← Voltar ao menu</Link>
            {isManual ? (
              <button className="wf-btn" disabled title="Selecione um cenário">
                Iniciar varredura  →
              </button>
            ) : (
              <Link to="/wireframe/e4-scan" className="wf-btn">
                Iniciar varredura  →
              </Link>
            )}
          </div>
        </div>
      </WfScreen>
    </>
  )
}
