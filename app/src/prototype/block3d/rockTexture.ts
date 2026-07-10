import * as THREE from 'three'
import { fbm2, hash3 } from './voxelize'

/**
 * Textura procedural de rocha para as laterais do bloco (referência do
 * cliente, round 3 — 2026-07-09: bloco de rocha escura "cortado", com
 * mosqueado, fraturas e vênulas finas de quartzo). Determinística (hash/fbm
 * de voxelize.ts), gerada uma vez por sessão e cacheada.
 */

let cached: THREE.CanvasTexture | null = null

export function makeRockSideTexture(): THREE.CanvasTexture | null {
  if (cached) return cached
  if (typeof document === 'undefined') return null
  const S = 512
  const canvas = document.createElement('canvas')
  canvas.width = S
  canvas.height = S
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  // base: rocha azulada escura
  ctx.fillStyle = '#12161f'
  ctx.fillRect(0, 0, S, S)

  // mosqueado mineral em duas escalas + bandamento sutil (estratos)
  for (let y = 0; y < S; y += 3)
    for (let x = 0; x < S; x += 3) {
      const big = fbm2(x * 0.014, y * 0.014)
      const fine = fbm2(x * 0.055 + 31, y * 0.055 - 17)
      let l = 0.16 + big * 0.16 + (fine - 0.5) * 0.12
      l += Math.sin(y * 0.045 + fbm2(x * 0.01, y * 0.002) * 6) * 0.02
      l = Math.max(0.07, l)
      const r = (l * 235) | 0
      const g = (l * 250) | 0
      const b = (l * 300) | 0
      ctx.fillStyle = `rgb(${r},${g},${b})`
      ctx.fillRect(x, y, 3, 3)
    }

  // fraturas escuras (polilinhas que serpenteiam)
  for (let i = 0; i < 20; i++) {
    let px = hash3(i, 1, 7) * S
    let py = hash3(i, 5, 13) * S
    let ang = hash3(i, 9, 3) * Math.PI * 2
    ctx.strokeStyle = `rgba(4,7,13,${0.35 + hash3(i, 2, 11) * 0.3})`
    ctx.lineWidth = 1 + hash3(i, 4, 17) * 1.2
    ctx.beginPath()
    ctx.moveTo(px, py)
    const steps = 24 + ((hash3(i, 6, 19) * 30) | 0)
    for (let s = 0; s < steps; s++) {
      ang += (hash3(i, s, 23) - 0.5) * 0.9
      px += Math.cos(ang) * (5 + hash3(i, s, 29) * 7)
      py += Math.sin(ang) * (5 + hash3(i, s, 29) * 7)
      ctx.lineTo(px, py)
    }
    ctx.stroke()
  }

  // vênulas claras finas (quartzo) — como na imagem de referência
  for (let i = 0; i < 12; i++) {
    let px = hash3(i + 50, 1, 7) * S
    let py = hash3(i + 50, 5, 13) * S
    let ang = hash3(i + 50, 9, 3) * Math.PI * 2
    ctx.strokeStyle = `rgba(210,220,238,${0.12 + hash3(i + 50, 2, 11) * 0.12})`
    ctx.lineWidth = 0.8
    ctx.beginPath()
    ctx.moveTo(px, py)
    const steps = 30 + ((hash3(i + 50, 6, 19) * 40) | 0)
    for (let s = 0; s < steps; s++) {
      ang += (hash3(i + 50, s, 23) - 0.5) * 0.7
      px += Math.cos(ang) * (4 + hash3(i + 50, s, 29) * 5)
      py += Math.sin(ang) * (4 + hash3(i + 50, s, 29) * 5)
      ctx.lineTo(px, py)
    }
    ctx.stroke()
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  cached = tex
  return tex
}
