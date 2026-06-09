import { useState } from 'react'
import { Link } from 'react-router-dom'
import ReviewBar from '../../components/ReviewBar'
import WfScreen from '../../components/WfScreen'
import ScanView, { type Scene } from '../../components/ScanView'

// E4 — Varredura. Estados de cena: scan · detect · c4 (snapshots, sem spoiler).
// Ações da operação: aba flutuante "AÇÕES" (direita, centro) → sheet com
// Reiniciar / Abortar, AMBOS com confirmação. Estado de review extra:
// "Menu de ações" (sheet aberto).

type SceneFull = Scene & { label: string; meta: string[] }

const SCENES: Record<'scan' | 'detect' | 'c4', SceneFull> = {
  scan: {
    label: 'Varrendo',
    meta: ['CENÁRIO: C1 · Veio de Ouro', 'MODALIDADE: Manual', 'SOLO: Rochoso'],
    progress: 55, clock: '14:33:14', bat: '91%', temp: '36°C', gnss: 'FIX · 12 sat',
    detections: [{ name: 'Magnetita', meta: '1,8 m · t=35s' }],
    detTrailing: 'varrendo… aguardando próxima anomalia',
    log: [
      ['t=00s', 'Início da varredura'],
      ['t=10s', 'GNSS · FIX adquirido'],
      ['t=12s', 'Warmup concluído · baseline estável'],
      ['t=35s', 'Detecção: Magnetita (1,8 m)'],
      ['t=52s', 'Varredura 55% · em andamento'],
    ],
  },
  detect: {
    label: 'Detecção (alerta)',
    meta: ['CENÁRIO: C1 · Veio de Ouro', 'MODALIDADE: Manual', 'SOLO: Rochoso'],
    progress: 67, clock: '14:33:21', bat: '89%', temp: '37°C', gnss: 'FIX · 12 sat',
    gprNote: 'marcador [Au] · hipérbole de reflexão',
    alert: { lead: 'DETECÇÃO · OURO', info: 'Profundidade 3,0 m · Ângulo do veio 65° · classificação simbólica' },
    detections: [
      { name: 'Magnetita', meta: '1,8 m · t=35s' },
      { name: 'Ouro (veio)', meta: '3,0 m · 65° · t=60s' },
    ],
    detTrailing: 'refinando estimativa…',
    log: [
      ['t=35s', 'Detecção: Magnetita (1,8 m)'],
      ['t=58s', 'Assinatura subliminar (GPR)'],
      ['t=60s', 'DETECÇÃO: Ouro — veio 3,0 m (65°)'],
      ['t=63s', 'Refinamento da extensão do veio'],
      ['t=67s', 'Varredura 67% · em andamento'],
    ],
  },
  c4: {
    label: 'C4 Interferência',
    meta: ['CENÁRIO: C4 · Interferência', 'MODALIDADE: Carrinho Autônomo', 'SOLO: Rochoso (c/ ruído)'],
    progress: 75, clock: '14:34:02', bat: '88%', temp: '38°C', gnss: 'FIX · 11 sat',
    emiTag: 'RUÍDO ALTO',
    gprNote: '⚠ zona de degradação · baixa confiança',
    detections: [
      { name: 'Magnetita?', meta: 'SUSPEITA → DESCARTADO · ruído', cls: 'discarded' },
      { name: 'Magnetita?', meta: 'SUSPEITA → DESCARTADO · ruído', cls: 'discarded' },
      { name: 'Ouro (veio)', meta: '3,2 m · 50° · CONFIRMADO (3 sensores)' },
    ],
    fusao: '1 confirmado · 2 falsos-ecos descartados',
    log: [
      ['t=20s', 'Zona de degradação NW sinalizada'],
      ['t=28s', 'Suspeita: Magnetita? (avaliando)'],
      ['t=32s', 'Descartado: falso-eco (ruído)'],
      ['t=48s', 'Descartado: falso-eco (ruído)'],
      ['t=75s', 'Ouro confirmado por fusão (3,2 m, 50°)'],
    ],
  },
}

export default function E4Scan() {
  const [k, setK] = useState<'scan' | 'detect' | 'c4'>('scan')
  const [sheet, setSheet] = useState(false)
  const [confirm, setConfirm] = useState<null | 'restart' | 'abort'>(null)
  const s = SCENES[k]

  const pickScene = (key: 'scan' | 'detect' | 'c4') => {
    setK(key); setSheet(false); setConfirm(null)
  }

  return (
    <>
      <ReviewBar crumb="Wireframes · E4 — Varredura">
        <div className="wf-phasebar">
          <span>Estado:</span>
          {(['scan', 'detect', 'c4'] as const).map((key) => (
            <button key={key} className={!sheet && k === key ? 'active' : ''} onClick={() => pickScene(key)}>
              {SCENES[key].label}
            </button>
          ))}
          <button className={sheet ? 'active' : ''} onClick={() => setSheet(true)}>Menu de ações</button>
        </div>
      </ReviewBar>

      <WfScreen
        title="VARREDURA EM ANDAMENTO"
        subtitle="GROUND SCANNING FUSION SYSTEM"
        meta={s.meta}
        footerRight="VARREDURA — WIREFRAME (BAIXA FIDELIDADE)"
      >
        <ScanView scene={s} />

        {/* Aba flutuante de ações (direita, centro) */}
        {!sheet && (
          <button className="wf-fab" onClick={() => setSheet(true)} title="Abrir menu de ações">AÇÕES</button>
        )}

        {/* Sheet lateral com as ações */}
        {sheet && (
          <>
            <div className="wf-sheet-overlay" onClick={() => setSheet(false)} />
            <div className="wf-sheet">
              <div className="wf-sheet-top">
                <span className="wf-sheet-h">Ações da varredura</span>
                <button className="wf-sheet-close" onClick={() => setSheet(false)} title="Fechar">✕</button>
              </div>
              <div className="wf-sheet-actions">
                <button className="wf-sheet-btn" onClick={() => setConfirm('restart')}>
                  <span className="t">↻ Reiniciar varredura</span>
                  <small>Recomeça a operação do início (t=0).</small>
                </button>
                <button className="wf-sheet-btn" onClick={() => setConfirm('abort')}>
                  <span className="t">⨯ Abortar varredura</span>
                  <small>Encerra sem gerar GSFS_RECORD.</small>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Confirmação — Reiniciar */}
        {confirm === 'restart' && (
          <div className="wf-modal-overlay">
            <div className="wf-modal">
              <div className="wf-modal-h">Reiniciar varredura?</div>
              <div className="wf-modal-body">
                A varredura recomeçará do início (<strong>t=0</strong>) e o progresso atual será descartado.
              </div>
              <div className="wf-modal-actions">
                <button className="wf-btn wf-btn-ghost" onClick={() => setConfirm(null)}>Cancelar</button>
                <button className="wf-btn" onClick={() => pickScene('scan')}>Reiniciar varredura</button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmação — Abortar */}
        {confirm === 'abort' && (
          <div className="wf-modal-overlay">
            <div className="wf-modal">
              <div className="wf-modal-h">Abortar varredura?</div>
              <div className="wf-modal-body">
                A varredura será encerrada e <strong>nenhum GSFS_RECORD será gerado</strong>.
                Esta ação não pode ser desfeita.
              </div>
              <div className="wf-modal-actions">
                <button className="wf-btn wf-btn-ghost" onClick={() => setConfirm(null)}>Continuar varredura</button>
                <Link to="/wireframe/e2-menu" className="wf-btn">Abortar varredura</Link>
              </div>
            </div>
          </div>
        )}
      </WfScreen>
    </>
  )
}
