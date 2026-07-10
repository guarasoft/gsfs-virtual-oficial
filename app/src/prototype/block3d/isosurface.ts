import * as THREE from 'three'
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js'
import type { TargetType } from '../data/types'
import { fusionProb, hash3, noise3, TIER_THRESHOLDS } from './voxelize'

/**
 * Morfologia ORGÂNICA dos achados (feedback do cliente, round 2 — 2026-07-09):
 * em vez de clusters de cubos, cada alvo é um campo contínuo de probabilidade
 * amostrado em grade e extraído como ISOSUPERFÍCIES suaves (marching cubes),
 * como os modelos de inversão reais renderizam volumes por limiar.
 *
 * Três superfícies por alvo = classificação QUALITATIVA de confiança
 * (Teto de Métricas §3.7 — sem percentuais expostos):
 *   ALTA  → núcleo sólido · MÉDIA → envelope translúcido · BAIXA → halo difuso
 *
 * Determinístico (noise de voxelize.ts, sem Math.random) — CA-04/CA-05.
 */

export interface IsoTiers {
  alta: THREE.BufferGeometry | null
  media: THREE.BufferGeometry | null
  baixa: THREE.BufferGeometry | null
  /** meias-extensões locais em metros — aplicar como scale do mesh */
  scale: [number, number, number]
}

/** campo local (metros, relativo ao centro do alvo) → probabilidade 0–1 */
export type FieldFn = (x: number, y: number, z: number) => number

const MAX_POLYS = 160000
const FIELD_MAT = new THREE.MeshBasicMaterial() // exigido pelo construtor; nunca renderiza

/**
 * Amostra o campo numa grade res³ (anamórfica: cada eixo cobre ±h) e extrai
 * uma isosuperfície por limiar de confiança. As geometrias saem no espaço
 * unitário [-1,1]³ — o mesh recebe scale=(hx,hy,hz).
 */
function buildTiers(field: FieldFn, hx: number, hy: number, hz: number, res: number): IsoTiers {
  const mc = new MarchingCubes(res, FIELD_MAT, false, false, MAX_POLYS)
  const half = res / 2
  let q = 0
  for (let z = 0; z < res; z++)
    for (let y = 0; y < res; y++)
      for (let x = 0; x < res; x++, q++) {
        mc.field[q] = field(((x - half) / half) * hx, ((y - half) / half) * hy, ((z - half) / half) * hz)
      }

  const snap = (iso: number): THREE.BufferGeometry | null => {
    mc.isolation = iso
    mc.update()
    const n = mc.geometry.drawRange.count
    if (n === 0) return null
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(mc.positionArray.slice(0, n * 3), 3))
    g.setAttribute('normal', new THREE.BufferAttribute(mc.normalArray.slice(0, n * 3), 3))
    return g
  }

  return {
    alta: snap(TIER_THRESHOLDS.alta),
    media: snap(TIER_THRESHOLDS.media),
    baixa: snap(TIER_THRESHOLDS.corte),
    scale: [hx, hy, hz],
  }
}

/**
 * Veio mineralizado (ouro): corpo tabular INCLINADO com espessura variável
 * (pinch-and-swell), plano ondulado, bordas irregulares, descontinuidades
 * (boudinage) e uma ramificação divergente — nada de chapa reta.
 */
export function veinField(
  sizeAlong: number,
  sizeAcross: number,
  angleDeg: number,
  centerDepth: number,
  attenuation: number,
): FieldFn {
  const th = (angleDeg * Math.PI) / 180
  const cos = Math.cos(th)
  const sin = Math.sin(th)
  const halfU = sizeAlong / 2
  const halfV = sizeAcross / 2
  const halfW = 0.2

  return (x: number, y: number, z: number): number => {
    // coords do plano com mergulho th em torno do eixo X (u=strike, v=dip, w=normal)
    const u = x
    const v = y * sin + z * cos
    const w = y * cos - z * sin
    // o plano ondula — veios reais não são chapas retas
    const wc = w - (noise3(u * 0.45 + 11.3, v * 0.45, 8.2) - 0.5) * 0.55
    // espessura variável ao longo do corpo (pinch-and-swell)
    const wLim = halfW * (0.5 + 1.0 * noise3(u * 0.8 + 3.1, v * 0.8, 1.7))
    const edge = noise3(u * 0.85 + 9.4, v * 0.85, 5.5) - 0.5
    const fu = 1 - Math.abs(u) / (halfU + edge * 1.1)
    const fv = 1 - Math.abs(v) / (halfV + edge * 1.1)

    let score = -1
    if (fu > 0 && fv > 0) {
      const t = wc / wLim
      score = Math.min(fu * 3.2, 1) * Math.min(fv * 3.2, 1) * (1 - t * t) * 1.2
      // descontinuidades ao longo do strike (corpo segmentado, não contínuo)
      const gap = noise3(u * 1.35 + 51.7, v * 0.45, 3.3)
      if (gap < 0.42) score -= (0.42 - gap) * 5.5
    }

    // ramificação: braço secundário mais fino divergindo do plano principal
    const ub = u - halfU * 0.05
    if (ub > 0) {
      const wb = wc - ub * 0.5 - 0.25
      const vb = v - halfV * 0.2
      const wLimB = halfW * 0.6 * (0.6 + 0.9 * noise3(u * 0.9 + 77.7, v * 0.9, 2.2))
      const fub = 1 - ub / (halfU * 0.78)
      const fvb = 1 - Math.abs(vb) / (halfV * 0.55)
      if (fub > 0 && fvb > 0) {
        const tb = wb / wLimB
        const sb = Math.min(fub * 3, 1) * Math.min(fvb * 3, 1) * (1 - tb * tb) * 1.05
        if (sb > score) score = sb
      }
    }

    score += (noise3(x * 2.4 + 31, y * 2.4, z * 2.4) - 0.5) * 0.2
    return fusionProb(score, centerDepth - y, attenuation)
  }
}

function veinTiers(
  sizeAlong: number,
  sizeAcross: number,
  angleDeg: number,
  centerDepth: number,
  attenuation: number,
): IsoTiers {
  const th = (angleDeg * Math.PI) / 180
  const halfV = sizeAcross / 2
  const hx = sizeAlong / 2 + 1.0
  const hy = Math.abs(halfV * Math.sin(th)) + 1.15
  const hz = Math.abs(halfV * Math.cos(th)) + 1.15
  return buildTiers(veinField(sizeAlong, sizeAcross, angleDeg, centerDepth, attenuation), hx, hy, hz, 56)
}

/**
 * Massa pontual (magnetita): corpo compacto, irregular e ASSIMÉTRICO —
 * lóbulo principal + dois satélites fundidos, raio deformado por noise
 * direcional (nunca uma esfera/caixa).
 */
export function blobField(radius: number, centerDepth: number, attenuation: number, seed = 0): FieldFn {
  const lobes: { cx: number; cy: number; cz: number; r: number }[] = [
    { cx: 0, cy: 0, cz: 0, r: radius },
    { cx: radius * 0.62, cy: radius * 0.15, cz: -radius * 0.4, r: radius * 0.62 },
    { cx: -radius * 0.55, cy: -radius * 0.25, cz: radius * 0.35, r: radius * 0.58 },
  ]

  return (x: number, y: number, z: number): number => {
    let s = 0
    for (let i = 0; i < lobes.length; i++) {
      const lo = lobes[i]
      const dist = Math.hypot(x - lo.cx, y - lo.cy, z - lo.cz)
      const rr = lo.r * (0.72 + 0.55 * noise3(x * 1.3 + seed * 7.7 + i * 13, y * 1.3, z * 1.3))
      const d = 1 - dist / Math.max(rr, 0.001)
      if (d > s) s = d
    }
    const score = s * 1.8 - 0.15 + (noise3(x * 2.8 + seed, y * 2.8 + 8.8, z * 2.8) - 0.5) * 0.24
    return fusionProb(score, centerDepth - y, attenuation)
  }
}

function blobTiers(radius: number, centerDepth: number, attenuation: number, seed = 0): IsoTiers {
  const h = radius * 2.0
  return buildTiers(blobField(radius, centerDepth, attenuation, seed), h, h, h, 44)
}

/**
 * Lâmina/bolsão d'água: camada contínua com topo irregular (nível freático
 * não é régua) e bordas que esmaecem — refletor forte, sem núcleo ALTA.
 */
export function slabField(size: { x: number; y: number; z: number }, seed = 0): FieldFn {
  const hx = size.x / 2
  const hz = size.z / 2
  const hyCore = Math.max(size.y / 2, 0.22)

  return (x: number, y: number, z: number): number => {
    const fx = 1 - Math.abs(x) / hx
    const fz = 1 - Math.abs(z) / hz
    if (fx <= 0 || fz <= 0) return 0
    const top = hyCore * (0.35 + 0.85 * noise3(x * 0.5 + seed, 3.3, z * 0.5))
    const vert = y > top ? 1 - (y - top) / 0.25 : 1 - Math.max(0, -y - hyCore) / 0.25
    if (vert <= 0) return 0
    const edgeM = Math.min(fx * hx, fz * hz) + (noise3(x * 0.9 + 40 + seed, y, z * 0.9) - 0.5) * 1.0
    return 0.84 * Math.min(1, vert) * Math.max(0, Math.min(1, edgeM / 1.2))
  }
}

function slabTiers(size: { x: number; y: number; z: number }, seed = 0): IsoTiers {
  const hy = Math.max(size.y / 2, 0.22) + 0.6
  return buildTiers(slabField(size, seed), (size.x / 2) * 1.06, hy, (size.z / 2) * 1.06, 60)
}

/**
 * Casca de cavidade (vazio): o GPR vê a INTERFACE, não o preenchimento —
 * casca elipsoidal deformada com aberturas irregulares, interior oco.
 */
export function shellField(size: { x: number; y: number; z: number }): FieldFn {
  const rx = size.x / 2
  const ry = size.y / 2
  const rz = size.z / 2

  return (x: number, y: number, z: number): number => {
    const deform = 0.82 + 0.34 * noise3(x * 1.2 + 12, y * 1.2, z * 1.2)
    const d = Math.hypot(x / (rx * deform), y / (ry * deform), z / (rz * deform))
    const band = 1 - Math.abs(d - 0.97) / 0.26
    if (band <= 0) return 0
    const holes = noise3(x * 1.7 + 66, y * 1.7, z * 1.7)
    return Math.max(0, 0.86 * band - (holes < 0.3 ? (0.3 - holes) * 1.6 : 0))
  }
}

function shellTiers(size: { x: number; y: number; z: number }): IsoTiers {
  const rx = size.x / 2
  const ry = size.y / 2
  const rz = size.z / 2
  return buildTiers(shellField(size), rx * 1.5 + 0.3, ry * 1.5 + 0.3, rz * 1.5 + 0.3, 44)
}

/**
 * Vênulas do veio (referência do cliente): filamentos finos e ramificados
 * que irradiam do plano mineralizado para a rocha encaixante. Polilinhas
 * determinísticas em coords locais do alvo (mesmo grupo/azimute do corpo).
 */
export function veinletPaths(sizeAlong: number, sizeAcross: number, angleDeg: number, seed = 0): THREE.Vector3[][] {
  const th = (angleDeg * Math.PI) / 180
  const cos = Math.cos(th)
  const sin = Math.sin(th)
  const halfU = sizeAlong / 2
  const halfV = sizeAcross / 2
  const paths: THREE.Vector3[][] = []
  const N = 16
  for (let i = 0; i < N; i++) {
    // nasce sobre o plano do veio (w=0), perto do espinhaço
    const u0 = (hash3(i, seed, 3) - 0.5) * 2 * halfU * 0.9
    const v0 = (hash3(i, seed, 7) - 0.5) * 2 * halfV * 0.7
    let u = u0
    let v = v0
    let w = 0
    // direção inicial: meio no plano, meio para fora (irradia)
    let du = (hash3(i, seed, 11) - 0.5) * 1.6
    let dv = (hash3(i, seed, 13) - 0.5) * 1.6
    let dw = (hash3(i, seed, 17) - 0.5) * 1.2
    const pts: THREE.Vector3[] = []
    const steps = 7 + ((hash3(i, seed, 19) * 5) | 0)
    for (let s = 0; s <= steps; s++) {
      pts.push(new THREE.Vector3(u, v * sin + w * cos, v * cos - w * sin))
      const len = 0.09 + hash3(i, s, 23 + seed) * 0.08
      du += (hash3(i, s, 29) - 0.5) * 0.9
      dv += (hash3(i, s, 31) - 0.5) * 0.9
      dw += (hash3(i, s, 37) - 0.5) * 0.7
      const norm = Math.hypot(du, dv, dw) || 1
      u += (du / norm) * len
      v += (dv / norm) * len
      w += (dw / norm) * len
    }
    paths.push(pts)
  }
  return paths
}

/** Constrói as isosuperfícies de um alvo conforme o tipo (mesma API p/ os 4) */
export function buildTargetTiers(
  kind: TargetType,
  size: { x: number; y: number; z: number },
  angle: number | undefined,
  centerDepth: number,
  attenuation: number,
  seed: number,
): IsoTiers {
  if (kind === 'ouro') return veinTiers(size.x, size.z, angle ?? 0, centerDepth, attenuation)
  if (kind === 'magnetita') return blobTiers(Math.max(size.x, size.y) * 0.78, centerDepth, attenuation, seed)
  if (kind === 'vazio') return shellTiers(size)
  return slabTiers(size, seed)
}

/**
 * Mesmo campo usado nos corpos, para o pintor de seção (sectionPaint.ts)
 * amostrar a probabilidade nas FACES do bloco — a exposição do corte tem
 * que casar exatamente com o corpo 3D atrás dela (mesmos parâmetros/seed).
 */
export function targetField(
  kind: TargetType,
  size: { x: number; y: number; z: number },
  angle: number | undefined,
  centerDepth: number,
  attenuation: number,
  seed: number,
): FieldFn {
  if (kind === 'ouro') return veinField(size.x, size.z, angle ?? 0, centerDepth, attenuation)
  if (kind === 'magnetita') return blobField(Math.max(size.x, size.y) * 0.78, centerDepth, attenuation, seed)
  if (kind === 'vazio') return shellField(size)
  return slabField(size, seed)
}
