import type { TerrainKind } from './sceneSpec'

/**
 * Base determinística do bloco 3D: noise coerente, relevo do terreno e a
 * curva de probabilidade da fusão (com atenuação em profundidade).
 *
 * Modelo fiel à prática geofísica real (pesquisa verificada 2026-07-08):
 * - o campo carrega uma PROBABILIDADE (saída da fusão por IA), como os
 *   modelos voxel de inversão (UBC-GIF/VOXI), extraída por limiar;
 * - limiares QUALITATIVOS de confiança (Teto de Métricas §3.7):
 *   ALTA (sólido) · MÉDIA (translúcido) · BAIXA (difuso);
 * - o sinal ATENUA com a profundidade (todo fluxo GPR real aplica ganho;
 *   brilho uniforme em profundidade denuncia imagem fake).
 * Sem Math.random: mesmo cenário → mesma imagem, sempre (CA-04).
 * A morfologia orgânica dos achados vive em isosurface.ts.
 */

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
/* Probabilidade, limiares e atenuação                                 */
/* ------------------------------------------------------------------ */

/** limiares internos das isosuperfícies (nunca expostos como número na UI) */
export const TIER_THRESHOLDS = { alta: 0.9, media: 0.7, corte: 0.5 } as const

/**
 * Converte o "score" geométrico do campo em probabilidade da fusão,
 * aplicando a atenuação com a profundidade absoluta (depthM > 0) e o
 * corte junto à superfície (nenhum corpo aflora no relevo).
 * attenuation: 0–1 (spec do cenário; solo condutivo = alto).
 */
export function fusionProb(score: number, depthM: number, attenuation: number): number {
  if (depthM < 0.1) return 0
  const surf = Math.min(1, (depthM - 0.1) / 0.35)
  const base = Math.min(0.99, Math.max(0, 0.5 + score * 0.62))
  const att = 1 - attenuation * 0.25 * Math.min(1, depthM / 5)
  return base * att * surf
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
    rampAmp: 1.5,
    rampDir: { x: 0.55, z: 0.45 },
    roughAmp: 0.62,
    base: '#70757d',
    dark: '#383e48',
    acc1: '#8f7550',
    acc2: '#41794b',
    skirt: '#5c452b',
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

/* voxelizadores removidos em 2026-07-09 (feedback round 2): a morfologia
   dos achados agora é orgânica, via isosuperfícies — ver isosurface.ts */
