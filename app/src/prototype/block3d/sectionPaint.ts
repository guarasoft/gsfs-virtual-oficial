import * as THREE from 'three'
import type { ScenarioMeta } from '../data/scenarios'
import { DEPTH_M, resolveTarget, type SceneSpec, type TargetGeom } from './sceneSpec'
import { targetField, type FieldFn } from './isosurface'
import { hash3 } from './voxelize'
import type { TargetType } from '../data/types'

/**
 * VISÃO DE CORTE (referência do cliente, round 3): onde um corpo mineralizado
 * intersecta uma face do bloco, a seção fica EXPOSTA na parede de rocha —
 * ouro granular brilhante com vênulas, magnetita negra vítrea, lâmina d'água,
 * cavidade como vazio com borda fraturada. Cada face lateral ganha uma
 * textura RGBA (transparente fora das exposições) desenhada a partir do MESMO
 * campo de probabilidade dos corpos 3D — a exposição casa com o corpo atrás.
 * Determinístico (hash), gerado uma vez por cenário.
 */

export interface SectionFace {
  /** textura RGBA da face (null = nenhuma exposição nesta face) */
  texture: THREE.CanvasTexture | null
  /** posição do plano no mundo */
  position: [number, number, number]
  /** rotação Y do plano (normal para fora) */
  rotationY: number
  /** largura do plano em metros (altura é DEPTH_M) */
  width: number
}

interface PreparedTarget {
  kind: TargetType
  field: FieldFn
  cx: number
  cy: number
  cz: number
  azimuthRad: number
  descartado: boolean
  /** raio de influência (m) — poda barata antes de avaliar o campo */
  reach: number
}

function prepareTargets(scenario: ScenarioMeta, spec: SceneSpec): PreparedTarget[] {
  return spec.targets.map((geom: TargetGeom, order: number) => {
    const t = resolveTarget(geom, scenario.targets)
    const centerDepth = t.kind === 'vazio' ? t.depth + geom.size.y / 2 : t.depth
    return {
      kind: t.kind,
      // mesmos parâmetros/seed do TargetMesh (buildTargetTiers) — alinhamento exato
      field: targetField(t.kind, geom.size, t.angle, centerDepth, spec.attenuation, order * 13),
      cx: (geom.plot.x - 0.5) * scenario.area.x,
      cy: -centerDepth,
      cz: (geom.plot.z - 0.5) * scenario.area.y,
      azimuthRad: ((geom.azimuth ?? 0) * Math.PI) / 180,
      descartado: t.status === 'descartado',
      reach: Math.max(geom.size.x, geom.size.y, geom.size.z) * 0.85 + 1.6,
    }
  })
}

/** amostra a probabilidade máxima (e o tipo) de todos os alvos num ponto do mundo */
function sampleAt(targets: PreparedTarget[], wx: number, wy: number, wz: number): { p: number; kind: TargetType } {
  let best = 0
  let kind: TargetType = 'ouro'
  for (const t of targets) {
    if (t.descartado) continue
    // mundo → local do alvo (desfaz translação e azimute)
    const dx = wx - t.cx
    const dy = wy - t.cy
    const dz = wz - t.cz
    if (Math.abs(dx) > t.reach || Math.abs(dy) > t.reach || Math.abs(dz) > t.reach) continue
    const cos = Math.cos(-t.azimuthRad)
    const sin = Math.sin(-t.azimuthRad)
    const lx = dx * cos + dz * sin
    const lz = -dx * sin + dz * cos
    const p = t.field(lx, dy, lz)
    if (p > best) {
      best = p
      kind = t.kind
    }
  }
  return { p: best, kind }
}

/** pinta um pixel de exposição conforme material e probabilidade */
function paintPixel(
  data: Uint8ClampedArray,
  idx: number,
  kind: TargetType,
  p: number,
  px: number,
  py: number,
  faceSeed: number,
): void {
  const grain = hash3(px, py, faceSeed) // granulação determinística
  let r = 0
  let g = 0
  let b = 0
  let a = 0
  if (kind === 'ouro') {
    if (p >= 0.82) {
      // ouro maciço granular: dourado vivo com specks claros e escuros
      if (grain > 0.78) {
        r = 255; g = 228; b = 155
      } else if (grain < 0.12) {
        r = 116; g = 70; b = 14
      } else {
        r = 240 + ((grain * 15) | 0); g = 165 + ((grain * 35) | 0); b = 50
      }
      a = 248
    } else if (p >= 0.66) {
      // transição ainda granular (quartzo mineralizado)
      if (grain > 0.85) {
        r = 244; g = 190; b = 96
      } else {
        r = 190; g = 130; b = 36
      }
      a = 175 + grain * 55
    } else if (p >= 0.52) {
      r = 142; g = 108; b = 48
      a = ((p - 0.52) / 0.14) * 120
    }
  } else if (kind === 'magnetita') {
    if (p >= 0.88) {
      // negra vítrea com glints frios
      if (grain > 0.9) {
        r = 92; g = 102; b = 128
      } else {
        r = 13; g = 15; b = 22
      }
      a = 240
    } else if (p >= 0.7) {
      r = 26; g = 30; b = 42
      a = 170
    } else if (p >= 0.55) {
      r = 60; g = 55; b = 90
      a = ((p - 0.55) / 0.15) * 90
    }
  } else if (kind === 'agua') {
    if (p >= 0.7) {
      r = 31; g = 169; b = 188
      a = 150 + grain * 40
    } else if (p >= 0.5) {
      r = 31; g = 150; b = 170
      a = ((p - 0.5) / 0.2) * 130
    }
  } else {
    // vazio: buraco escuro com borda fraturada clara
    if (p >= 0.7) {
      r = 4; g = 6; b = 11
      a = 230
    } else if (p >= 0.5) {
      r = 142; g = 154; b = 176
      a = ((p - 0.5) / 0.2) * 120 * (grain > 0.35 ? 1 : 0.3)
    }
  }
  data[idx] = r
  data[idx + 1] = g
  data[idx + 2] = b
  data[idx + 3] = a
}

/** vênulas douradas irradiando das exposições de ouro, desenhadas na face */
function paintVeinlets(
  ctx: CanvasRenderingContext2D,
  goldPixels: [number, number][],
  W: number,
  H: number,
  faceSeed: number,
): void {
  if (goldPixels.length === 0) return
  const n = Math.min(14, 4 + ((goldPixels.length / 60) | 0))
  for (let i = 0; i < n; i++) {
    const start = goldPixels[(hash3(i, faceSeed, 3) * goldPixels.length) | 0]
    let [px, py] = start
    let ang = hash3(i, faceSeed, 7) * Math.PI * 2
    ctx.strokeStyle = `rgba(244,186,78,${0.45 + hash3(i, faceSeed, 11) * 0.3})`
    ctx.lineWidth = 1 + hash3(i, faceSeed, 13) * 1.4
    ctx.beginPath()
    ctx.moveTo(px, py)
    const steps = 10 + ((hash3(i, faceSeed, 17) * 14) | 0)
    for (let s = 0; s < steps; s++) {
      ang += (hash3(i, s, faceSeed + 19) - 0.5) * 1.1
      px += Math.cos(ang) * (3 + hash3(i, s, 23) * 4)
      py += Math.sin(ang) * (3 + hash3(i, s, 23) * 4)
      if (px < 0 || px > W || py < 0 || py > H) break
      ctx.lineTo(px, py)
    }
    ctx.stroke()
  }
}

/**
 * Gera as 4 faces de seção do cenário. Mapeamento (PlaneGeometry olhando p/
 * fora, u=0 na esquerda de quem olha a face de frente):
 *   +z: x = -ax/2 → +ax/2 · -z: x = +ax/2 → -ax/2
 *   +x: z = +az/2 → -az/2 · -x: z = -az/2 → +az/2
 * Vertical: v topo (py=0) = y 0 · base = y -DEPTH_M.
 */
export function makeSectionFaces(scenario: ScenarioMeta, spec: SceneSpec): SectionFace[] {
  const ax = scenario.area.x
  const az = scenario.area.y
  const targets = prepareTargets(scenario, spec)
  const eps = 0.025

  const faces: { rotationY: number; position: [number, number, number]; width: number; toWorld: (fx: number) => [number, number] }[] = [
    { rotationY: 0, position: [0, -DEPTH_M / 2, az / 2 + eps], width: ax, toWorld: (fx) => [-ax / 2 + fx * ax, az / 2] },
    { rotationY: Math.PI, position: [0, -DEPTH_M / 2, -az / 2 - eps], width: ax, toWorld: (fx) => [ax / 2 - fx * ax, -az / 2] },
    { rotationY: Math.PI / 2, position: [ax / 2 + eps, -DEPTH_M / 2, 0], width: az, toWorld: (fx) => [ax / 2, az / 2 - fx * az] },
    { rotationY: -Math.PI / 2, position: [-ax / 2 - eps, -DEPTH_M / 2, 0], width: az, toWorld: (fx) => [-ax / 2, -az / 2 + fx * az] },
  ]

  return faces.map((face, fi) => {
    if (typeof document === 'undefined') return { texture: null, ...face }
    const W = Math.max(192, Math.min(384, (face.width * 20) | 0))
    const H = 160
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')
    if (!ctx) return { texture: null, ...face }

    const img = ctx.createImageData(W, H)
    const goldPixels: [number, number][] = []
    let any = false
    for (let py = 0; py < H; py++) {
      const wy = -(py / (H - 1)) * DEPTH_M
      for (let px = 0; px < W; px++) {
        const [wx, wz] = face.toWorld(px / (W - 1))
        const { p, kind } = sampleAt(targets, wx, wy, wz)
        if (p < 0.5) continue
        any = true
        paintPixel(img.data, (py * W + px) * 4, kind, p, px, py, fi * 101)
        if (kind === 'ouro' && p >= 0.85 && hash3(px, py, fi + 31) > 0.97) goldPixels.push([px, py])
      }
    }
    if (!any) return { texture: null, ...face }
    ctx.putImageData(img, 0, 0)
    paintVeinlets(ctx, goldPixels, W, H, fi * 101 + 7)

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return { texture, ...face }
  })
}
