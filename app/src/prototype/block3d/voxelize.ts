import type { TerrainKind } from './sceneSpec'

/**
 * Geração determinística dos elementos "orgânicos" do bloco 3D:
 * relevo do terreno e clusters de voxels irregulares dos achados.
 *
 * Modelo fiel à prática geofísica real (pesquisa verificada 2026-07-08):
 * - cada voxel carrega uma PROBABILIDADE (saída da fusão por IA), como os
 *   modelos voxel de inversão (UBC-GIF/VOXI) e as isosuperfícies por limiar
 *   (GPR-SLICE, default ~75% do máximo);
 * - camadas por limiar: ≥90% sólido · 70–90% translúcido · <70% fantasma;
 * - o sinal ATENUA com a profundidade (todo fluxo GPR real aplica ganho;
 *   brilho uniforme em profundidade denuncia imagem fake).
 * Sem Math.random: mesmo cenário → mesma imagem, sempre (CA-04).
 */

export interface Voxel {
  x: number
  y: number
  z: number
  /** probabilidade da fusão, 0–1 (já com atenuação de profundidade) */
  prob: number
  /** 0 = ≥90% (sólido) · 1 = 70–90% (translúcido) · 2 = <70% (fantasma) */
  tier: 0 | 1 | 2
}

/** hash inteiro 3D → [0,1), determinístico */
export function hash3(ix: number, iy: number, iz: number): number {
  let h = (ix * 374761393 + iy * 668265263 + iz * 1440662683) | 0
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  h ^= h >>> 16
  return (h >>> 0) / 4294967296
}

function smooth(t: number): number {
  return t * t * (3 - 2 * t)
}

/** value noise 3D coerente (uma oitava), interp. trilinear */
export function noise3(x: number, y: number, z: number): number {
  const x0 = Math.floor(x)
  const y0 = Math.floor(y)
  const z0 = Math.floor(z)
  const tx = smooth(x - x0)
  const ty = smooth(y - y0)
  const tz = smooth(z - z0)
  let acc = 0
  for (let dx = 0; dx <= 1; dx++)
    for (let dy = 0; dy <= 1; dy++)
      for (let dz = 0; dz <= 1; dz++) {
        const w = (dx ? tx : 1 - tx) * (dy ? ty : 1 - ty) * (dz ? tz : 1 - tz)
        acc += w * hash3(x0 + dx, y0 + dy, z0 + dz)
      }
  return acc
}

export function noise2(x: number, z: number): number {
  return noise3(x, 17.13, z)
}

/** fbm 2D — duas oitavas bastam para relevo e máscaras */
export function fbm2(x: number, z: number): number {
  return noise2(x, z) * 0.65 + noise2(x * 2.7 + 5.2, z * 2.7 + 1.3) * 0.35
}

/* ------------------------------------------------------------------ */
/* Rampa de probabilidade (frio → quente, cores institucionais §4/§6;  */
/* mesma família da rampa EMI do briefing C2)                          */
/* ------------------------------------------------------------------ */

const RAMP: [number, number, number][] = [
  [0x14 / 255, 0x29 / 255, 0x4a / 255], // navy-800
  [0x00 / 255, 0x95 / 255, 0xa4 / 255], // ciano
  [0x7e / 255, 0xd3 / 255, 0x21 / 255], // verde
  [0xf5 / 255, 0xa6 / 255, 0x23 / 255], // âmbar
  [0xe5 / 255, 0x48 / 255, 0x4d / 255], // vermelho
]

/** cor da rampa de probabilidade (t em 0–1) → {r,g,b} em 0–1 */
export function rampColor(t: number): { r: number; g: number; b: number } {
  const c = Math.min(0.9999, Math.max(0, t)) * (RAMP.length - 1)
  const i = Math.floor(c)
  const f = c - i
  const a = RAMP[i]
  const b = RAMP[i + 1]
  return { r: a[0] + (b[0] - a[0]) * f, g: a[1] + (b[1] - a[1]) * f, b: a[2] + (b[2] - a[2]) * f }
}

/** stops CSS da mesma rampa (legenda) */
export const RAMP_CSS = 'linear-gradient(90deg, #14294A 0%, #0095A4 25%, #7ED321 50%, #F5A623 75%, #E5484D 100%)'

/* ------------------------------------------------------------------ */
/* Probabilidade, limiares e atenuação                                 */
/* ------------------------------------------------------------------ */

export const TIER_THRESHOLDS = { alta: 0.9, media: 0.7, corte: 0.5 } as const

function tierFor(prob: number): Voxel['tier'] | null {
  if (prob >= TIER_THRESHOLDS.alta) return 0
  if (prob >= TIER_THRESHOLDS.media) return 1
  if (prob >= TIER_THRESHOLDS.corte) return 2
  return null
}

/**
 * Converte o "score" geométrico do gerador em probabilidade da fusão,
 * aplicando a atenuação com a profundidade absoluta do voxel (depthM > 0).
 * attenuation: 0–1 (spec do cenário; solo condutivo = alto).
 */
function toProb(score: number, depthM: number, attenuation: number): number {
  const base = Math.min(0.98, Math.max(0, 0.5 + score * 0.55))
  const att = 1 - attenuation * 0.35 * Math.min(1, depthM / 5)
  return base * att
}

/* ------------------------------------------------------------------ */
/* Relevo — presets por cenário                                        */
/* ------------------------------------------------------------------ */

export interface TerrainPreset {
  /** direção e amplitude da rampa (encosta) */
  rampAmp: number
  rampDir: { x: number; z: number }
  roughAmp: number
  /** paleta: base é interpolada até `base2` ao longo de blendAxis (transicional) */
  base: string
  base2?: string
  dark: string
  acc1: string
  acc2: string
  skirt: string
}

const TERRAIN_PRESETS: Record<TerrainKind, TerrainPreset> = {
  'encosta-rochosa': {
    rampAmp: 0.95,
    rampDir: { x: 0.55, z: 0.45 },
    roughAmp: 0.38,
    base: '#767c85',
    dark: '#484e58',
    acc1: '#7a6549',
    acc2: '#55755a',
    skirt: '#4a3f30',
  },
  'campo-arenoso': {
    rampAmp: 0.12,
    rampDir: { x: 0.5, z: 0.5 },
    roughAmp: 0.16,
    base: '#a8946e',
    dark: '#7c6d50',
    acc1: '#8f7d5c',
    acc2: '#6f7f5e',
    skirt: '#6b5b40',
  },
  'solo-saturado': {
    rampAmp: 0.22,
    rampDir: { x: 0.3, z: 0.7 },
    roughAmp: 0.2,
    base: '#565144',
    dark: '#37342c',
    acc1: '#3e5548',
    acc2: '#5d6b73',
    skirt: '#3a342b',
  },
  'rochoso-plano': {
    rampAmp: 0.3,
    rampDir: { x: 0.6, z: 0.4 },
    roughAmp: 0.3,
    base: '#6e747d',
    dark: '#454b55',
    acc1: '#5a5147',
    acc2: '#55755a',
    skirt: '#46413a',
  },
  transicional: {
    rampAmp: 0.28,
    rampDir: { x: 0.7, z: 0.3 },
    roughAmp: 0.22,
    base: '#a8946e',
    base2: '#4f5a52',
    dark: '#5f584a',
    acc1: '#8f7d5c',
    acc2: '#3e5548',
    skirt: '#5c5140',
  },
}

export function getTerrainPreset(kind: TerrainKind): TerrainPreset {
  return TERRAIN_PRESETS[kind]
}

/** altura do relevo (m acima do topo do bloco), determinística por preset */
export function terrainHeight(kind: TerrainKind, x: number, z: number, ax: number, az: number): number {
  const p = TERRAIN_PRESETS[kind]
  const u = x / ax + 0.5
  const v = z / az + 0.5
  const ramp = p.rampAmp * smooth(Math.min(1, Math.max(0, 1 - (u * p.rampDir.x + v * p.rampDir.z))))
  const rough = (fbm2(x * 0.55, z * 0.55) - 0.5) * p.roughAmp
  const micro = (noise2(x * 1.8, z * 1.8) - 0.5) * 0.08
  return Math.max(0.05, 0.2 + ramp + rough + micro)
}

/* ------------------------------------------------------------------ */
/* Voxelizadores                                                       */
/* ------------------------------------------------------------------ */

/** aresta do voxel, em metros */
export const VOXEL_VEIN = 0.24
export const VOXEL_BLOB = 0.17
export const VOXEL_WATER = 0.3

/**
 * Veio planar inclinado (ouro) como banda irregular de voxels axis-aligned;
 * a inclinação vem da FORMA do cluster (membership contra o plano do
 * mergulho). Coordenadas relativas ao centro do alvo (centerDepth p/ atenuação).
 */
export function voxelizeVein(
  sizeAlong: number,
  sizeAcross: number,
  angleDeg: number,
  centerDepth: number,
  attenuation: number,
): Voxel[] {
  const th = (angleDeg * Math.PI) / 180
  const cos = Math.cos(th)
  const sin = Math.sin(th)
  const halfU = sizeAlong / 2
  const halfV = sizeAcross / 2
  const halfW = 0.3
  const vs = VOXEL_VEIN
  const rx = Math.ceil((halfU + 0.5) / vs)
  const ry = Math.ceil((halfV * sin + halfW + 0.4) / vs)
  const rz = Math.ceil((halfV * cos + halfW + 0.4) / vs)
  const out: Voxel[] = []
  for (let i = -rx; i <= rx; i++)
    for (let j = -ry; j <= ry; j++)
      for (let k = -rz; k <= rz; k++) {
        // fragmentação: "furos" esparsos no corpo (pulverizado)
        if (hash3(i + 101, j + 57, k + 23) < 0.05) continue
        const x = i * vs
        const y = j * vs
        const z = k * vs
        // coords locais do plano com mergulho th em torno do eixo X
        const u = x
        const v = y * sin + z * cos
        const w = y * cos - z * sin
        const edge = noise3(x * 1.9 + 9.4, y * 1.9, z * 1.9) - 0.5
        const wLim = halfW * (0.8 + 0.4 * noise3(x * 1.1, y * 1.1 + 4.7, z * 1.1))
        if (Math.abs(w) > wLim + edge * 0.08) continue
        const fu = 1 - Math.abs(u) / (halfU + edge * 0.6)
        const fv = 1 - Math.abs(v) / (halfV + edge * 0.6)
        if (fu <= 0 || fv <= 0) continue
        const core = 1 - (Math.abs(w) / (wLim + 0.001)) * 0.6
        const score =
          Math.min(fu * 4.5, 1) * Math.min(fv * 4.5, 1) * core * 1.12 +
          (noise3(x * 2.6 + 31, y * 2.6, z * 2.6) - 0.5) * 0.24
        const prob = toProb(score, centerDepth - y, attenuation)
        const tier = tierFor(prob)
        if (tier === null) continue
        // halo <70% esparso (baixa confiança = wireframe ralo, não nuvem)
        if (tier === 2 && hash3(i + 7, j + 3, k + 11) < 0.55) continue
        out.push({ x, y, z, prob, tier })
      }
  return out
}

/**
 * Massa pontual (magnetita etc.) como blob irregular — raio deformado por
 * noise direcional. Relativo ao centro do alvo.
 */
export function voxelizeBlob(radius: number, centerDepth: number, attenuation: number, seed = 0): Voxel[] {
  const vs = VOXEL_BLOB
  const rMax = radius * 1.45
  const n = Math.ceil(rMax / vs)
  const out: Voxel[] = []
  for (let i = -n; i <= n; i++)
    for (let j = -n; j <= n; j++)
      for (let k = -n; k <= n; k++) {
        if (hash3(i + 11 + seed, j + 71, k + 37) < 0.05) continue
        const x = i * vs
        const y = j * vs
        const z = k * vs
        const dist = Math.hypot(x, y, z)
        const rr = radius * (0.7 + 0.6 * noise3(x * 1.6 + 3.3 + seed * 7.7, y * 1.6, z * 1.6))
        const d = 1 - dist / Math.max(rr, 0.001)
        if (d <= 0) continue
        const score = d * 1.7 + (noise3(x * 3.1 + seed, y * 3.1 + 8.8, z * 3.1) - 0.5) * 0.3
        const prob = toProb(score, centerDepth - y, attenuation)
        const tier = tierFor(prob)
        if (tier === null) continue
        if (tier === 2 && hash3(i + 7 + seed, j + 3, k + 11) < 0.55) continue
        out.push({ x, y, z, prob, tier })
      }
  return out
}

/**
 * Lâmina/bolsão d'água como voxels (mesma linguagem visual dos demais
 * achados): camada horizontal com topo levemente irregular e bordas
 * esfarelando em voxels fantasma. Relativo ao centro do alvo.
 */
export function voxelizeSlab(size: { x: number; y: number; z: number }, seed = 0): Voxel[] {
  const vs = VOXEL_WATER
  const hx = size.x / 2
  const hy = Math.max(size.y / 2, vs * 0.6)
  const hz = size.z / 2
  const nx = Math.ceil(hx / vs)
  const ny = Math.ceil((hy + vs) / vs)
  const nz = Math.ceil(hz / vs)
  const out: Voxel[] = []
  for (let i = -nx; i <= nx; i++)
    for (let j = -ny; j <= ny; j++)
      for (let k = -nz; k <= nz; k++) {
        const x = i * vs
        const y = j * vs
        const z = k * vs
        // topo irregular (nível freático não é uma régua)
        const top = hy * (0.7 + 0.6 * noise3(x * 0.5 + seed, 3.3, z * 0.5))
        if (y > top || y < -hy) continue
        const fx = 1 - Math.abs(x) / hx
        const fz = 1 - Math.abs(z) / hz
        if (fx <= 0 || fz <= 0) continue
        const edge = Math.min(fx, fz)
        const frayed = edge < 0.12 + (noise3(x * 1.3 + 40 + seed, y, z * 1.3) - 0.5) * 0.12
        if (frayed && hash3(i + 19 + seed, j + 5, k + 29) < 0.45) continue
        out.push({ x, y, z, prob: 0.8, tier: frayed || y > top - vs ? 2 : 1 })
      }
  return out
}

/**
 * Casca de cavidade (vazio): só a FRONTEIRA do volume vira voxel (o interior
 * é oco — o GPR vê a interface, não o preenchimento). Elipsoide irregular.
 */
export function voxelizeShell(size: { x: number; y: number; z: number }): Voxel[] {
  const vs = VOXEL_BLOB
  const rx = size.x / 2
  const ry = size.y / 2
  const rz = size.z / 2
  const nx = Math.ceil((rx * 1.3) / vs)
  const ny = Math.ceil((ry * 1.3) / vs)
  const nz = Math.ceil((rz * 1.3) / vs)
  const out: Voxel[] = []
  for (let i = -nx; i <= nx; i++)
    for (let j = -ny; j <= ny; j++)
      for (let k = -nz; k <= nz; k++) {
        if (hash3(i + 41, j + 17, k + 67) < 0.25) continue // casca esparsa
        const x = i * vs
        const y = j * vs
        const z = k * vs
        const deform = 0.85 + 0.3 * noise3(x * 1.4 + 12, y * 1.4, z * 1.4)
        const d = Math.hypot(x / (rx * deform), y / (ry * deform), z / (rz * deform))
        if (d < 0.78 || d > 1.08) continue // só a fronteira
        out.push({ x, y, z, prob: 0.75, tier: 1 })
      }
  return out
}
