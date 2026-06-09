import type { ReactNode } from 'react'

// Corpo da tela de varredura (HUD + 4 painéis + rail de detecções/log).
// Reutilizado pela E4 (Varredura) e pela E7 (Replay, que o espelha).
// `banner` (ex.: selo MODO REPLAY) e `controls` (ex.: barra de playback)
// são chrome opcional inserido no topo e no rodapé do corpo.

export type Det = { name: string; meta: string; cls?: 'discarded' | 'suspect' }
export type Scene = {
  progress: number
  clock: string
  bat: string
  temp: string
  gnss: string
  emiTag?: string
  gprNote?: string
  alert?: { lead: string; info: string }
  detections: Det[]
  detTrailing?: string
  fusao?: string
  log: [string, string][]
}

export default function ScanView({
  scene,
  banner,
  controls,
  hudOps,
}: {
  scene: Scene
  banner?: ReactNode
  controls?: ReactNode
  hudOps?: ReactNode
}) {
  const sensors = [
    { name: 'GPR', tag: 'eco / reflexão', body: '[ radargrama — eco/reflexão por profundidade ]', note: scene.gprNote, emiTag: undefined as string | undefined },
    { name: 'EMI', tag: 'condutividade', body: '[ mapa de calor — matriz de intensidade ]', note: undefined as string | undefined, emiTag: scene.emiTag },
    { name: 'IMU', tag: 'orientação 6 eixos', body: '[ vetor de orientação — roll / pitch ]', note: undefined as string | undefined, emiTag: undefined as string | undefined },
    { name: 'GNSS / RTK', tag: 'posicionamento', body: '[ trajetória de varredura no mapa ]', note: undefined as string | undefined, emiTag: undefined as string | undefined },
  ]

  return (
    <div className="wf-scan">
      {banner}

      <div className="wf-hud">
        <div className="wf-hud-prog">
          <div className="row">
            <span>PROGRESSO DA VARREDURA</span>
            <strong>{scene.progress}%</strong>
          </div>
          <div className="wf-bar">
            <span style={{ width: `${scene.progress}%` }} />
          </div>
        </div>
        <div className="wf-hud-metrics">
          <div className="wf-hud-metric"><span className="lbl">Relógio</span><span className="val">{scene.clock}</span></div>
          <div className="wf-hud-metric"><span className="lbl">Bateria</span><span className="val">{scene.bat}</span></div>
          <div className="wf-hud-metric"><span className="lbl">Temp.</span><span className="val">{scene.temp}</span></div>
          <div className="wf-hud-metric"><span className="lbl">GNSS</span><span className="val">{scene.gnss}</span></div>
        </div>
        <div className="wf-hud-sensors">
          {['GPR', 'EMI', 'IMU', 'GNSS'].map((d) => (
            <span className="wf-sdot on" key={d}>{d}</span>
          ))}
        </div>
        {hudOps}
      </div>

      {scene.alert && (
        <div className="wf-alert">
          <span className="pulse" />
          <span className="lead">{scene.alert.lead}</span>
          <span className="info">{scene.alert.info}</span>
        </div>
      )}

      <div className="wf-scan-body">
        <div className="wf-sensor-grid">
          {sensors.map((p) => (
            <div className="wf-sensor" key={p.name}>
              <div className="wf-sensor-h">
                <span>{p.name}</span>
                {p.emiTag ? <span className="wf-tag">{p.emiTag}</span> : <span className="tag">{p.tag}</span>}
              </div>
              <div className="wf-sensor-body">
                <div>
                  {p.body}
                  {p.note && <div className="wf-sensor-note">{p.note}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="wf-rail">
          <div className="wf-rail-panel det">
            <div className="wf-rail-h">DETECÇÕES</div>
            {scene.detections.map((d, i) => (
              <div className={`wf-det-item${d.cls ? ' ' + d.cls : ''}`} key={d.name + i}>
                <span className="d-name">{d.name}</span>
                <span className="d-meta">{d.meta}</span>
              </div>
            ))}
            {scene.detTrailing && <div className="wf-det-empty">{scene.detTrailing}</div>}
            {scene.fusao && (
              <div className="wf-fusao">FUSÃO MULTIMODAL: <strong>{scene.fusao}</strong></div>
            )}
          </div>

          <div className="wf-rail-panel log">
            <div className="wf-rail-h">LOG DE MISSÃO</div>
            <div className="wf-log">
              {scene.log.map(([t, ev]) => (
                <div className="wf-log-line" key={t + ev}>
                  <span className="t">{t}</span>
                  {ev}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {controls}
    </div>
  )
}
