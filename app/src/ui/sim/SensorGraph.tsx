import './SensorGraph.css'
import type { SensorKind } from './SensorPanel'

/** assinatura de movimento do IMU conforme a modalidade do cenário:
    smooth = carrinho (drift baixo) · walk = mochila/a pé (passos cíclicos) ·
    rough = manual sobre terreno irregular */
export type ImuMotion = 'smooth' | 'walk' | 'rough'

/** assinatura visível no radargrama GPR — uma por achado de GPR já detectado.
    hyperbola = alvo pontual (ouro/magnetita/vazio) · line = lâmina d'água */
export interface GprSignature {
  depth: number
  kind: 'hyperbola' | 'line'
  /** posição no eixo da varredura (0..1) = instante do achado; alinha a
      hipérbole com onde a linha de varredura estava ao detectar. Default 0,5 */
  at?: number
}

export interface SensorGraphProps {
  kind: SensorKind
  /** progresso da varredura 0..100 — avança a varredura / trajetória */
  progress: number
  /** GNSS: nº de detecções acumuladas — plota um marcador por achado */
  detections?: number
  /** GPR: assinaturas já reveladas (cada achado de GPR no seu instante) */
  signatures?: GprSignature[]
  /** EMI: há achado de condutividade revelado → pico na curva */
  emiActive?: boolean
  /** IMU: assinatura de movimento conforme a modalidade do cenário */
  motion?: ImuMotion
}

const VIZ_LABEL: Record<SensorKind, string> = {
  gpr: 'Radargrama GPR — eco e reflexão por profundidade',
  emi: 'Resposta de condutividade EMI — sinal no tempo',
  imu: 'Sinais inerciais IMU — roll e pitch no tempo',
  gnss: 'Trajetória de varredura GNSS / RTK',
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

// Visualização simbólica por sensor, condizente com o que cada um produz
// (Roteiro Técnico §cenários). Determinística: o conteúdo significativo é
// função de `progress`/`detections` (bate no replay — CA-07); o movimento de
// ambiente é decorativo (CSS) e respeita prefers-reduced-motion.
export function SensorGraph({
  kind,
  progress,
  detections = 0,
  signatures = [],
  emiActive = false,
  motion = 'rough',
}: SensorGraphProps) {
  return (
    <div className={`gsfs-svgraph gsfs-svgraph--${kind}`} role="img" aria-label={VIZ_LABEL[kind]}>
      {kind === 'gpr' && <Gpr progress={progress} signatures={signatures} />}
      {kind === 'emi' && <Emi progress={progress} active={emiActive} />}
      {kind === 'imu' && <Imu progress={progress} motion={motion} />}
      {kind === 'gnss' && <Gnss progress={progress} detections={detections} />}
    </div>
  )
}

// --------------------------------------------------------------------------
// GPR — radargrama B-scan: camadas de profundidade + varredura + hipérbole
// --------------------------------------------------------------------------

// profundidade (m, ≤5 — Teto) → y no radargrama (apex da hipérbole)
function depthToY(d: number): number {
  return 22 + (clamp(d, 0, 5) / 5) * 56
}

function Gpr({ progress, signatures }: { progress: number; signatures: GprSignature[] }) {
  const sweepX = 8 + (clamp(progress, 0, 100) / 100) * 184
  const hyps = signatures.filter((s) => s.kind === 'hyperbola')
  const lines = signatures.filter((s) => s.kind === 'line')
  return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="svg-gpr">
      {/* camadas de profundidade (eco/reflexão) */}
      {[20, 40, 60, 80].map((y) => (
        <line key={y} className="gpr-layer" x1="0" y1={y} x2="200" y2={y} />
      ))}
      {/* traços de eco (colunas A-scan) */}
      {Array.from({ length: 24 }, (_, i) => {
        const x = 8 + i * 8
        const h = 6 + ((i * 13) % 9)
        return <line key={i} className="gpr-trace" x1={x} y1={50 - h} x2={x} y2={50 + h} />
      })}
      {/* lâmina d'água: linha horizontal contínua na profundidade do achado */}
      {lines.map((s, i) => {
        const y = depthToY(s.depth)
        return <line key={`l${i}`} className="gpr-hline" x1="12" y1={y} x2="188" y2={y} />
      })}
      {/* hipérboles de reflexão: uma por achado de GPR, posicionada no eixo da
          varredura pelo instante do achado (x) e pela profundidade (y) */}
      {hyps.map((s, i) => {
        const cx = 8 + clamp(s.at ?? 0.5, 0, 1) * 184
        const y = depthToY(s.depth)
        return (
          <g className="gpr-hyperbola" key={`h${i}`}>
            <path d={`M ${cx - 20} ${y + 12} Q ${cx} ${y - 12} ${cx + 20} ${y + 12}`} />
            <path className="gpr-hyperbola-faint" d={`M ${cx - 24} ${y + 15} Q ${cx} ${y - 15} ${cx + 24} ${y + 15}`} />
          </g>
        )
      })}
      {/* linha de varredura (posição atual em profundidade) */}
      <line className="gpr-sweep" x1={sweepX} y1="0" x2={sweepX} y2="100" />
      <text className="svg-axis" x="4" y="12">PROF.</text>
    </svg>
  )
}

// --------------------------------------------------------------------------
// EMI — resposta de condutividade: sinal rolando no tempo (strip-chart).
// Baseline sobe com a umidade de fundo; picos emergem sobre anomalias.
// --------------------------------------------------------------------------

const EMI_N = 72

// Valor de condutividade (0..1) numa coordenada de mundo `w`. Determinístico:
// ondulação ambiente (soma de senos) + picos recorrentes quando há anomalia.
function emiValue(w: number, baseline: number, active: boolean): number {
  const ripple =
    Math.sin(w * 0.20) * 0.06 +
    Math.sin(w * 0.53 + 1.3) * 0.04 +
    Math.sin(w * 0.11 + 0.7) * 0.05
  let v = baseline + ripple
  if (active) {
    const p = Math.sin(w * 0.16)
    v += Math.max(0, p) ** 6 * 0.5 // picos estreitos de anomalia
  }
  return clamp(v, 0.04, 0.96)
}

function Emi({ progress, active }: { progress: number; active: boolean }) {
  const top = 14
  const bottom = 86
  const pr = clamp(progress, 0, 100)
  const phase = pr * 1.4 // rola continuamente com o progresso
  const baseline = 0.22 + (pr / 100) * 0.18 // umidade de fundo sobe ao longo da varredura
  const pts: string[] = []
  for (let i = 0; i < EMI_N; i++) {
    const x = (i / (EMI_N - 1)) * 200
    const v = emiValue(i + phase, baseline, active)
    const y = bottom - v * (bottom - top)
    pts.push(`${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  const line = 'M ' + pts.join(' L ')
  return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="svg-emi">
      {[28, 50, 72].map((y) => <line key={y} className="emi-grid" x1="0" y1={y} x2="200" y2={y} />)}
      <path className="emi-line" d={line} vectorEffect="non-scaling-stroke" />
      <text className="svg-axis" x="4" y="12">COND.</text>
    </svg>
  )
}

// --------------------------------------------------------------------------
// IMU — séries temporais dos eixos inerciais (roll/pitch). Acoplado ao tempo
// narrativo: começa calmo no warmup (F1 — "IMU zera referência"), depois a
// amplitude varia com o terreno ao longo da varredura; a assinatura de
// movimento muda conforme a modalidade do cenário.
// --------------------------------------------------------------------------

const IMU_N = 80

interface ImuParams { roll: number; pitch: number; f1: number; f2: number; step: number; stepf: number }
const IMU_PARAMS: Record<ImuMotion, ImuParams> = {
  // carrinho: drift baixo, trajetória regular → amplitude baixa, sem passos
  smooth: { roll: 9, pitch: 6, f1: 0.09, f2: 0.05, step: 0, stepf: 0 },
  // mochila / a pé: oscilação cíclica de passos → cadência marcada
  walk: { roll: 17, pitch: 12, f1: 0.12, f2: 0.06, step: 9, stepf: 0.6 },
  // manual sobre terreno irregular → amplitude alta e mais errática
  rough: { roll: 26, pitch: 16, f1: 0.17, f2: 0.09, step: 5, stepf: 0.34 },
}

function Imu({ progress, motion }: { progress: number; motion: ImuMotion }) {
  const pr = clamp(progress, 0, 100)
  const phase = pr * 1.6
  // envelope do tempo narrativo: warmup calmo (≈ até 14%) → atividade que
  // varia com o terreno ao longo da varredura
  const warm = clamp(pr / 14, 0, 1)
  const terrain = 0.6 + 0.4 * (0.5 + 0.5 * Math.sin(pr * 0.11 + 0.6))
  const env = warm * terrain
  const P = IMU_PARAMS[motion]

  const build = (amp: number, phaseShift: number, stepScale: number): string => {
    const mid = 50
    const pts: string[] = []
    for (let i = 0; i < IMU_N; i++) {
      const x = (i / (IMU_N - 1)) * 200
      const w = i + phase
      const wave = Math.sin(w * P.f1 + phaseShift) * 0.7 + Math.sin(w * P.f2 + phaseShift * 1.7) * 0.3
      const step = P.step ? Math.sin(w * P.stepf + phaseShift) * P.step * stepScale : 0
      const y = mid - env * (wave * amp + step)
      pts.push(`${x.toFixed(2)} ${y.toFixed(2)}`)
    }
    return 'M ' + pts.join(' L ')
  }

  const roll = build(P.roll, 0, 0.5)
  const pitch = build(P.pitch, 1.2, 1) // a cadência de passos bate mais no pitch
  return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="svg-imu">
      <line className="imu-zero" x1="0" y1="50" x2="200" y2="50" />
      <path className="imu-roll" d={roll} vectorEffect="non-scaling-stroke" />
      <path className="imu-pitch" d={pitch} vectorEffect="non-scaling-stroke" />
      <text className="svg-axis" x="4" y="12">ROLL / PITCH</text>
    </svg>
  )
}

// --------------------------------------------------------------------------
// GNSS / RTK — trajetória de varredura (raster) revelada com o progresso
// --------------------------------------------------------------------------

const GNSS_PTS: [number, number][] = [
  [12, 18], [188, 18],
  [188, 39], [12, 39],
  [12, 60], [188, 60],
  [188, 82], [12, 82],
]
const MARKER_FRACS = [0.22, 0.46, 0.66, 0.82, 0.93]

function segLengths(pts: [number, number][]): number[] {
  const out: number[] = []
  for (let i = 1; i < pts.length; i++) {
    out.push(Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]))
  }
  return out
}
function pointAt(pts: [number, number][], frac: number): [number, number] {
  const segs = segLengths(pts)
  const total = segs.reduce((a, b) => a + b, 0)
  let target = clamp(frac, 0, 1) * total
  for (let i = 0; i < segs.length; i++) {
    if (target <= segs[i]) {
      const t = segs[i] === 0 ? 0 : target / segs[i]
      return [
        pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t,
        pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t,
      ]
    }
    target -= segs[i]
  }
  return pts[pts.length - 1]
}

function Gnss({ progress, detections }: { progress: number; detections: number }) {
  const frac = clamp(progress, 0, 100) / 100
  const d = 'M ' + GNSS_PTS.map((p) => p.join(' ')).join(' L ')
  const head = pointAt(GNSS_PTS, frac)
  const markers = MARKER_FRACS
    .slice(0, Math.max(0, detections))
    .filter((f) => f <= frac)
    .map((f) => pointAt(GNSS_PTS, f))
  return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="svg-gnss">
      {/* grade do mapa */}
      {[40, 80, 120, 160].map((x) => <line key={`v${x}`} className="gnss-grid" x1={x} y1="0" x2={x} y2="100" />)}
      {[25, 50, 75].map((y) => <line key={`h${y}`} className="gnss-grid" x1="0" y1={y} x2="200" y2={y} />)}
      {/* trajetória: pista + revelado proporcional ao progresso */}
      <path className="gnss-track-bg" d={d} />
      <path className="gnss-track" d={d} pathLength={100} style={{ strokeDashoffset: 100 - clamp(progress, 0, 100) }} />
      {/* marcadores de detecção plotados */}
      {markers.map(([x, y], i) => (
        <g key={i} className="gnss-marker" transform={`translate(${x} ${y})`}>
          <circle r="4" />
          <text x="0" y="2.6">M</text>
        </g>
      ))}
      {/* cabeça da varredura (posição atual) */}
      <circle className="gnss-head" cx={head[0]} cy={head[1]} r="3.2" />
    </svg>
  )
}
