import type { ReactNode } from 'react'
import { Progress, HudMetric, SensorPanel, SensorGraph, DetectionBadge } from '../../ui'
import type { SensorKind } from '../../ui'
import type { ScanState } from './useScan'
import './ScanView.css'

// ---------------------------------------------------------------------------
// Internal: full sensor panel with live visualization
// ---------------------------------------------------------------------------

function SensorPanelFull({
  kind,
  title,
  tag,
  note,
  progress,
  detections,
}: {
  kind: SensorKind
  title: string
  tag: string
  note?: string
  progress: number
  detections: number
}) {
  return (
    <div className="sv-panel">
      <div className="sv-panel-hdr">
        <span className="sv-panel-title">{title}</span>
        <span className="sv-panel-tag">{tag}</span>
      </div>
      <div className="sv-panel-body">
        <div className="sv-panel-viz">
          <SensorGraph kind={kind} progress={progress} detections={detections} />
        </div>
        {note && <div className="sv-panel-note">{note}</div>}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ScanViewProps {
  state: ScanState
  banner?: ReactNode
  controls?: ReactNode
}

// ---------------------------------------------------------------------------
// ScanView — presentational
// ---------------------------------------------------------------------------

export function ScanView({ state, banner, controls }: ScanViewProps) {
  const confirmedDetections = state.detections.filter((d) => d.state === 'confirmed')

  return (
    <div className="sv-root">
      {banner}

      {/* HUD */}
      <div className="sv-hud">
        <div className="sv-hud-progress">
          <span className="sv-hud-progress-label">PROGRESSO DA VARREDURA</span>
          <div className="sv-hud-progress-track">
            <Progress value={state.progress} label="Progresso da varredura" />
            <strong className="sv-hud-progress-pct">{state.progress}%</strong>
          </div>
        </div>
        <div className="sv-hud-metrics">
          <HudMetric size="sm" label="Relógio" value={state.clock} />
          <HudMetric size="sm" label="Bateria" value={`${state.battery}%`} />
          <HudMetric size="sm" label="Temp." value={`${state.temp}°C`} />
          <HudMetric size="sm" label="GNSS" value={state.gnss} />
        </div>
        <div className="sv-hud-sensors">
          <SensorPanel kind="gpr" state="on" compact />
          <SensorPanel kind="emi" state="on" compact />
          <SensorPanel kind="imu" state="on" compact />
          <SensorPanel kind="gnss" state={state.gnss === 'FIX' ? 'on' : 'err'} compact />
        </div>
      </div>

      {/* Faixa de detecção — sempre presente (altura reservada) para a grade
          não "saltar" quando o badge de detecção confirmada surge. */}
      <div className={`sv-alert${confirmedDetections.length > 0 ? '' : ' sv-alert--idle'}`}>
        <span className="sv-alert-pulse" />
        {confirmedDetections.length > 0 ? (
          <>
            <span className="sv-alert-lead">DETECÇÃO CONFIRMADA</span>
            <span className="sv-alert-info">
              {confirmedDetections.map((d) => `${d.label} · ${d.meta}`).join(' | ')}
            </span>
          </>
        ) : (
          <>
            <span className="sv-alert-lead">MONITORANDO</span>
            <span className="sv-alert-info">sem detecções até o momento</span>
          </>
        )}
      </div>

      {/* Body */}
      <div className="sv-body">
        {/* 4-panel sensor grid */}
        <div className="sv-sensor-grid">
          <SensorPanelFull kind="gpr" title="GPR" tag="eco / reflexão" note={state.sensorNotes.gpr} progress={state.progress} detections={state.detections.length} />
          <SensorPanelFull kind="emi" title="EMI" tag="condutividade" note={state.sensorNotes.emi} progress={state.progress} detections={state.detections.length} />
          <SensorPanelFull kind="imu" title="IMU" tag="orientação 6 eixos" note={state.sensorNotes.imu} progress={state.progress} detections={state.detections.length} />
          <SensorPanelFull kind="gnss" title="GNSS / RTK" tag="posicionamento" note={state.sensorNotes.gnss} progress={state.progress} detections={state.detections.length} />
        </div>

        {/* Right rail */}
        <div className="sv-rail">
          <div className="sv-rail-panel">
            <div className="sv-rail-h">DETECÇÕES</div>
            {state.detections.length === 0 && (
              <div className="sv-rail-empty">varrendo… aguardando anomalia</div>
            )}
            {state.detections.map((d, i) => (
              <div key={i} className="sv-det-item">
                <div className="sv-det-name">{d.label}</div>
                <div className="sv-det-meta">{d.meta}</div>
                <DetectionBadge state={d.state} />
              </div>
            ))}
            {state.fusionNote && (
              <div className="sv-fusao">FUSÃO: {state.fusionNote}</div>
            )}
          </div>
          <div className="sv-rail-panel">
            <div className="sv-rail-h">LOG DE MISSÃO</div>
            <div className="sv-log">
              {state.log.map(([t, msg], i) => (
                <div key={i} className="sv-log-line">
                  <span className="sv-log-t">{t}</span>
                  <span>{msg}</span>
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
