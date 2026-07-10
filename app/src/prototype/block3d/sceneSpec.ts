import type { ScenarioId, TargetType } from '../data/types'

/**
 * Complemento de cena 3D por cenário (briefing-videos-3d/).
 * scenarios.ts segue sendo a fonte normativa (tipo/profundidade/ângulo);
 * aqui entram os dados espaciais que o simulador 2D não precisa:
 * posição em planta, dimensões volumétricas, beat sheet, terreno e extras
 * (falso-ecos e zonas de degradação do C4, que não são alvos do simulador).
 */

export type TrajectoryPattern = 'zigzag' | 'raster' | 'organic'

export type TerrainKind =
  | 'encosta-rochosa' // C1
  | 'campo-arenoso' // C2
  | 'solo-saturado' // C3
  | 'rochoso-plano' // C4
  | 'transicional' // C5 (arenoso → úmido)

/** estado do achado após a fusão (C4 — CA-06) */
export type TargetStatus = 'normal' | 'confirmado' | 'descartado'

export interface TargetGeom {
  /**
   * índice do alvo em scenario.targets — quando presente, label/profundidade/
   * ângulo vêm de scenarios.ts (fidelidade CA-04). Ausente = alvo "extra" da
   * cena (ex.: falso-eco do C4), que usa os campos locais abaixo.
   */
  targetIndex?: number
  kind: TargetType
  label?: string
  /** profundidade em m (centro; para 'vazio' é o TETO, como no briefing) */
  depth?: number
  angle?: number
  /** rotação do strike em planta (°) — veios atravessam o bloco em diagonal */
  azimuth?: number
  status?: TargetStatus
  /** posição do centro em planta, normalizada 0–1 sobre a área do cenário */
  plot: { x: number; z: number }
  /** dimensões em metros (antes do mergulho, no caso de veios) */
  size: { x: number; y: number; z: number }
  /** segundo (desde a montagem) em que o alvo é revelado — beat sheet */
  revealAt: number
  /** lado do callout (±1) — sobrepõe a alternância padrão quando os chips colidem */
  labelSide?: 1 | -1
  /** elevação extra do callout (m) — desempata colisões de perspectiva */
  labelLift?: number
}

/** faixa sombreada de baixa confiança (C4) — retângulo em planta, 0–1 */
export interface DegradationZone {
  rect: { x0: number; z0: number; x1: number; z1: number }
  label: string
  revealAt: number
  /** elevação extra do rótulo (m) — desvia dos chips de falso-eco no mesmo canto */
  labelLift?: number
}

export interface SceneSpec {
  scenarioId: ScenarioId
  trajectory: TrajectoryPattern
  terrain: TerrainKind
  /** intensidade da atenuação do sinal com a profundidade (0–1) */
  attenuation: number
  /**
   * Origem georreferenciada da malha (canto SW) — ATIVO TÉCNICO da missão,
   * protegido pela governança do Geo-Cartucho: existe no GSFS_RECORD mas
   * NUNCA é exibido no bloco (feedback do cliente 2026-07-10).
   */
  origin: { zone: string; e: number; n: number }
  targets: TargetGeom[]
  zones?: DegradationZone[]
}

/** Teto fixo de profundidade do simulador (PRD 8.2) — escala ABSOLUTA nos 5 vídeos */
export const DEPTH_M = 5

const SPECS: Record<ScenarioId, SceneSpec> = {
  // C1 — Veio de Ouro em Encosta Rochosa (briefing 01)
  c1: {
    scenarioId: 'c1',
    trajectory: 'zigzag', // modalidade manual
    terrain: 'encosta-rochosa',
    attenuation: 0.35, // rocha resistiva: sinal penetra bem
    origin: { zone: '23K', e: 612430, n: 7801260 },
    targets: [
      // Magnetita acessória · 1,8 m · massa exposta na face leste (referência)
      {
        targetIndex: 0,
        kind: 'magnetita',
        plot: { x: 0.88, z: 0.3 },
        size: { x: 1.3, y: 0.9, z: 1.3 },
        revealAt: 3,
      },
      // Veio de ouro · 3,0 m · ~65° · atravessa o bloco e aflora no CORTE frontal
      {
        targetIndex: 1,
        kind: 'ouro',
        azimuth: 38,
        plot: { x: 0.5, z: 0.82 },
        size: { x: 4.6, y: 0.14, z: 3.4 },
        revealAt: 8,
      },
    ],
  },

  // C2 — Levantamento de Massa Magnetítica (briefing 02): 3 massas, raster
  c2: {
    scenarioId: 'c2',
    trajectory: 'raster',
    terrain: 'campo-arenoso',
    attenuation: 0.3,
    origin: { zone: '23K', e: 598712, n: 7794105 },
    targets: [
      {
        targetIndex: 0, // Magnetita A · 1,5 m · 2×2 m · Centro-NW
        kind: 'magnetita',
        plot: { x: 0.35, z: 0.3 },
        size: { x: 2.0, y: 1.2, z: 2.0 },
        revealAt: 3,
      },
      {
        targetIndex: 1, // Magnetita B · 2,2 m · 3×2 m — exposta no corte frontal
        kind: 'magnetita',
        plot: { x: 0.52, z: 0.88 },
        size: { x: 3.0, y: 1.4, z: 2.0 },
        revealAt: 7,
      },
      {
        targetIndex: 2, // Magnetita C · 3,1 m · 1,5×1,5 m · SE — exposta no corte leste
        kind: 'magnetita',
        plot: { x: 0.95, z: 0.74 },
        size: { x: 1.5, y: 1.0, z: 1.5 },
        revealAt: 11,
        labelSide: 1,
      },
    ],
  },

  // C3 — Cavidade em Solo Saturado (briefing 03): vazio + lençol, mochila
  c3: {
    scenarioId: 'c3',
    trajectory: 'organic',
    terrain: 'solo-saturado',
    attenuation: 0.75, // solo condutivo: atenuação alta em profundidade
    origin: { zone: '23K', e: 605338, n: 7810042 },
    targets: [
      {
        targetIndex: 0, // Cavidade · teto 2,5 m · 3×2×1 m — exposta no corte frontal
        kind: 'vazio',
        plot: { x: 0.5, z: 0.93 },
        size: { x: 3.0, y: 1.0, z: 2.0 },
        revealAt: 3,
      },
      {
        targetIndex: 1, // Lençol freático · 4,2 m · lâmina contínua (aflora nos 4 cortes)
        kind: 'agua',
        plot: { x: 0.5, z: 0.5 },
        size: { x: 15.6, y: 0.5, z: 15.6 },
        revealAt: 10,
      },
    ],
  },

  // C4 — Operação sob Interferência EM (briefing 04, CA-06):
  // zonas de degradação + 2 falso-ecos descartados + ouro confirmado
  c4: {
    scenarioId: 'c4',
    trajectory: 'raster',
    terrain: 'rochoso-plano',
    attenuation: 0.45,
    origin: { zone: '23K', e: 621904, n: 7787516 },
    zones: [
      { rect: { x0: 0.04, z0: 0.04, x1: 0.34, z1: 0.4 }, label: 'BAIXA CONFIANÇA · NW', revealAt: 3, labelLift: 1.2 },
      { rect: { x0: 0.62, z0: 0.6, x1: 0.96, z1: 0.96 }, label: 'BAIXA CONFIANÇA · SE', revealAt: 6.5, labelLift: 2.6 },
    ],
    targets: [
      // falso-ecos: não existem em scenario.targets — extras da cena
      {
        kind: 'magnetita',
        label: 'Falso-eco 1',
        depth: 2.4,
        status: 'descartado',
        plot: { x: 0.24, z: 0.24 },
        size: { x: 1.2, y: 0.9, z: 1.2 },
        revealAt: 3.5,
      },
      {
        kind: 'magnetita',
        label: 'Falso-eco 2',
        depth: 1.6,
        status: 'descartado',
        plot: { x: 0.76, z: 0.72 },
        size: { x: 1.0, y: 0.8, z: 1.0 },
        revealAt: 6.5,
      },
      // Ouro real · 3,2 m · ~50° · confirmado por 3 sensores — aflora no corte sul
      {
        targetIndex: 0,
        kind: 'ouro',
        status: 'confirmado',
        azimuth: 50,
        plot: { x: 0.52, z: 0.93 },
        size: { x: 4.6, y: 0.14, z: 3.6 },
        revealAt: 10,
        labelSide: 1,
        labelLift: 3.0,
      },
    ],
  },

  // C5 — Inteligência Subsuperficial Integrada (briefing 05): 4 alvos, showcase
  c5: {
    scenarioId: 'c5',
    trajectory: 'organic',
    terrain: 'transicional',
    attenuation: 0.5,
    origin: { zone: '23K', e: 609175, n: 7805881 },
    targets: [
      {
        targetIndex: 0, // Ouro · 2,0 m · ~40° — aflora no corte frontal
        kind: 'ouro',
        azimuth: 42,
        plot: { x: 0.32, z: 0.88 },
        size: { x: 3.8, y: 0.14, z: 2.4 },
        revealAt: 3,
      },
      {
        targetIndex: 1, // Magnetita · 3,0 m · massa exposta no corte leste
        kind: 'magnetita',
        plot: { x: 0.95, z: 0.3 },
        size: { x: 1.2, y: 0.9, z: 1.2 },
        revealAt: 6,
      },
      {
        targetIndex: 2, // Vazio · teto 4,0 m
        kind: 'vazio',
        plot: { x: 0.58, z: 0.66 },
        size: { x: 2.0, y: 0.8, z: 1.5 },
        revealAt: 9,
      },
      {
        targetIndex: 3, // Água (bolsão) · 4,5 m — lâmina localizada
        kind: 'agua',
        plot: { x: 0.36, z: 0.7 },
        size: { x: 4.0, y: 0.45, z: 3.0 },
        revealAt: 12,
      },
    ],
  },
}

export function getSceneSpec(id: ScenarioId): SceneSpec | undefined {
  return SPECS[id]
}

/** label/profundidade/ângulo resolvidos (scenarios.ts quando targetIndex existe) */
export interface ResolvedTarget {
  label: string
  depth: number
  angle?: number
  kind: TargetType
  status: TargetStatus
}

/**
 * Coordenada UTM simulada do alvo (metros inteiros — precisão de cm é vetada
 * pelo Teto de Métricas). Easting cresce com plot.x; Northing com o norte da
 * malha (z da cena cresce para o sul).
 *
 * GOVERNANÇA (feedback 2026-07-10): ativo técnico da missão — a visualização
 * e a exportação dependem de autenticação/autorização do Geo-Cartucho. Não
 * renderizar no bloco 3D; os rótulos exibem apenas a indicação de referência
 * geoespacial protegida.
 */
export function utmForTarget(
  spec: SceneSpec,
  geom: TargetGeom,
  area: { x: number; y: number },
): { e: number; n: number } {
  return {
    e: spec.origin.e + Math.round(geom.plot.x * area.x),
    n: spec.origin.n + Math.round((1 - geom.plot.z) * area.y),
  }
}

export function resolveTarget(
  geom: TargetGeom,
  targets: { label: string; depth: number; angle?: number }[],
): ResolvedTarget {
  const base = geom.targetIndex != null ? targets[geom.targetIndex] : undefined
  return {
    label: geom.label ?? base?.label ?? geom.kind,
    depth: geom.depth ?? base?.depth ?? 0,
    angle: geom.angle ?? base?.angle,
    kind: geom.kind,
    status: geom.status ?? 'normal',
  }
}
