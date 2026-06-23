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

/** marcador de achado na trajetória GNSS: instante (0..1) + rótulo do tipo
    (M Magnetita · Au Ouro · V Vazio · H2O Água) */
export interface GnssMarker {
  at: number
  label: string
}

export interface SensorGraphProps {
  kind: SensorKind
  /** progresso da varredura 0..100 — avança a varredura / trajetória */
  progress: number
  /** GNSS: marcadores dos achados (ponto/tempo + rótulo do material) */
  markers?: GnssMarker[]
  /** GPR: assinaturas já reveladas (cada achado de GPR no seu instante) */
  signatures?: GprSignature[]
  /** EMI: instantes (0..1) dos achados já revelados → picos na curva, cada um
      no seu momento */
  emiPeaks?: number[]
  /** IMU: assinatura de movimento conforme a modalidade do cenário */
  motion?: ImuMotion
  /** IMU: instantes (0..1) dos achados → agitação localizada (re-passes) */
  disturbances?: number[]
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
  markers = [],
  signatures = [],
  emiPeaks = [],
  motion = 'rough',
  disturbances = [],
}: SensorGraphProps) {
  return (
    <div className={`gsfs-svgraph gsfs-svgraph--${kind}`} role="img" aria-label={VIZ_LABEL[kind]}>
      {kind === 'gpr' && <Gpr progress={progress} signatures={signatures} />}
      {kind === 'emi' && <Emi progress={progress} peaks={emiPeaks} />}
      {kind === 'imu' && <Imu progress={progress} motion={motion} disturbances={disturbances} />}
      {kind === 'gnss' && <Gnss progress={progress} markers={markers} />}
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
            {/* arco interno (apex na profundidade) e arco externo nidificado
                com folga clara entre eles */}
            <path d={`M ${cx - 18} ${y + 10} Q ${cx} ${y - 10} ${cx + 18} ${y + 10}`} />
            <path className="gpr-hyperbola-faint" d={`M ${cx - 28} ${y + 17} Q ${cx} ${y - 25} ${cx + 28} ${y + 17}`} />
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

const EMI_N = 96
const EMI_WINDOW = 0.5 // fração da varredura visível por vez (janela que rola)
const EMI_BUMP_W = 0.04 // largura (σ) do pico de condutividade, em fração da varredura

// ruído ambiente determinístico (função da posição temporal absoluta → rola junto)
function emiAmbient(u: number): number {
  return Math.sin(u * 47) * 0.02 + Math.sin(u * 113 + 1.3) * 0.012
}

// condutividade (0..1) no instante `u` (fração da varredura): baseline de
// umidade que sobe + ruído + um pico gaussiano por achado (no seu instante)
function emiValueAt(u: number, peaks: number[]): number {
  const baseline = 0.2 + clamp(u, 0, 1) * 0.16
  let bump = 0
  for (const f of peaks) {
    const d = (u - f) / EMI_BUMP_W
    bump += Math.exp(-d * d) * 0.6
  }
  return clamp(baseline + emiAmbient(u) + bump, 0.04, 0.97)
}

function Emi({ progress, peaks }: { progress: number; peaks: number[] }) {
  const top = 14
  const bottom = 86
  const head = clamp(progress, 0, 100) / 100 // "agora" (borda direita)
  const start = head - EMI_WINDOW
  const pts: string[] = []
  for (let i = 0; i <= EMI_N; i++) {
    const u = start + (i / EMI_N) * EMI_WINDOW
    const x = (i / EMI_N) * 200
    const y = bottom - emiValueAt(u, peaks) * (bottom - top)
    pts.push(`${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  const line = 'M ' + pts.join(' L ')
  const headY = bottom - emiValueAt(head, peaks) * (bottom - top)
  return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="svg-emi">
      {[28, 50, 72].map((y) => <line key={y} className="emi-grid" x1="0" y1={y} x2="200" y2={y} />)}
      <path className="emi-line" d={line} vectorEffect="non-scaling-stroke" />
      <circle className="emi-head" cx="200" cy={headY} r="2.6" />
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

const IMU_N = 110
const IMU_WINDOW = 0.5 // janela temporal visível (rola, igual ao EMI)
const IMU_STEPF = 150 // cadência de passos (walk/rough)
const IMU_BURST_W = 0.03 // largura do burst de vibração (fração da varredura)
const IMU_BURST_F = 320 // frequência do ringing do burst
const IMU_BURST_A = 17 // amplitude do burst

interface ImuParams { roll: number; pitch: number; fa: number; fb: number; step: number }
const IMU_PARAMS: Record<ImuMotion, ImuParams> = {
  // fundo discreto por modalidade (não é o protagonista — o evento é)
  // carrinho: drift baixo, trajetória regular → amplitude baixa, sem passos
  smooth: { roll: 5, pitch: 3.5, fa: 60, fb: 27, step: 0 },
  // mochila / a pé: oscilação cíclica de passos → cadência marcada
  walk: { roll: 9, pitch: 6, fa: 64, fb: 30, step: 5 },
  // manual sobre terreno irregular → amplitude um pouco maior e errática
  rough: { roll: 11, pitch: 7, fa: 88, fb: 41, step: 4 },
}

// Burst de vibração: trepidação curta e amortecida quando o operador
// pausa/re-passa sobre um achado — é o que o IMU "traz" em relação ao achado.
function imuBurst(u: number, peaks: number[]): number {
  let s = 0
  for (const f of peaks) {
    const d = (u - f) / IMU_BURST_W
    s += Math.exp(-d * d) * Math.sin((u - f) * IMU_BURST_F) * IMU_BURST_A
  }
  return s
}

function Imu({ progress, motion, disturbances }: { progress: number; motion: ImuMotion; disturbances: number[] }) {
  const top = 14
  const bottom = 86
  const mid = 50
  const head = clamp(progress, 0, 100) / 100
  const start = head - IMU_WINDOW
  const P = IMU_PARAMS[motion]
  const warm = (u: number) => clamp(u / 0.14, 0, 1) // F1: "IMU zera referência"
  const build = (amp: number, fa: number, fb: number, ph: number, step: number, burstScale: number): string => {
    const pts: string[] = []
    for (let i = 0; i <= IMU_N; i++) {
      const u = start + (i / IMU_N) * IMU_WINDOW
      const x = (i / IMU_N) * 200
      const wave = Math.sin(u * fa + ph) * 0.7 + Math.sin(u * fb + ph * 1.7) * 0.3
      const cad = step ? Math.sin(u * IMU_STEPF + ph) * step : 0
      const ambient = wave * amp + cad
      const burst = imuBurst(u, disturbances) * burstScale
      const y = clamp(mid - warm(u) * (ambient + burst), top + 1, bottom - 1)
      pts.push(`${x.toFixed(2)} ${y.toFixed(2)}`)
    }
    return 'M ' + pts.join(' L ')
  }
  const roll = build(P.roll, P.fa, P.fb, 0, 0, 1)
  const pitch = build(P.pitch, P.fa * 0.8, P.fb * 1.3, 1.2, P.step, 1.15)
  // marcas verticais nos instantes de achado (dentro da janela) → relação explícita
  const markers = disturbances
    .map((f) => ((f - start) / IMU_WINDOW) * 200)
    .filter((x) => x >= 0 && x <= 200)
  return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="svg-imu">
      <line className="imu-zero" x1="0" y1="50" x2="200" y2="50" />
      {markers.map((x, i) => (
        <line key={i} className="imu-event" x1={x} y1="10" x2={x} y2="90" />
      ))}
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

function Gnss({ progress, markers }: { progress: number; markers: GnssMarker[] }) {
  const frac = clamp(progress, 0, 100) / 100
  const d = 'M ' + GNSS_PTS.map((p) => p.join(' ')).join(' L ')
  const head = pointAt(GNSS_PTS, frac)
  // cada marcador no ponto da trajetória onde a varredura estava no instante do
  // achado (só os já alcançados pela varredura), com o rótulo do material
  const plotted = markers
    .filter((m) => m.at <= frac)
    .map((m) => {
      const [x, y] = pointAt(GNSS_PTS, m.at)
      return { x, y, label: m.label }
    })
  return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="svg-gnss">
      {/* grade do mapa */}
      {[40, 80, 120, 160].map((x) => <line key={`v${x}`} className="gnss-grid" x1={x} y1="0" x2={x} y2="100" />)}
      {[25, 50, 75].map((y) => <line key={`h${y}`} className="gnss-grid" x1="0" y1={y} x2="200" y2={y} />)}
      {/* trajetória: pista + revelado proporcional ao progresso */}
      <path className="gnss-track-bg" d={d} />
      <path className="gnss-track" d={d} pathLength={100} style={{ strokeDashoffset: 100 - clamp(progress, 0, 100) }} />
      {/* marcadores de detecção plotados — rótulo do material acima do ponto */}
      {plotted.map((m, i) => (
        <g key={i} className="gnss-marker" transform={`translate(${m.x} ${m.y})`}>
          <circle r="2.6" />
          <text x="0" y="-4">{m.label}</text>
        </g>
      ))}
      {/* cabeça da varredura (posição atual) */}
      <circle className="gnss-head" cx={head[0]} cy={head[1]} r="3.2" />
    </svg>
  )
}
