import { describe, it, expect } from 'vitest'
import { SCENARIOS } from '../data/scenarios'
import { DEPTH_M, getSceneSpec, resolveTarget, utmForTarget } from './sceneSpec'

describe('sceneSpec — dados de cena dos 5 cenários (CA-04)', () => {
  it('há spec de cena para todos os cenários', () => {
    for (const s of SCENARIOS) {
      expect(getSceneSpec(s.id), `spec ausente para ${s.id}`).toBeTruthy()
    }
  })

  it('todo alvo do simulador aparece no bloco (targetIndex cobre 0..n-1, sem repetição)', () => {
    for (const s of SCENARIOS) {
      const spec = getSceneSpec(s.id)!
      const indices = spec.targets
        .map((g) => g.targetIndex)
        .filter((i): i is number => i != null)
      expect(new Set(indices).size, `targetIndex repetido em ${s.id}`).toBe(indices.length)
      for (let i = 0; i < s.targets.length; i++) {
        expect(indices, `alvo ${i} do ${s.id} sem geometria no bloco`).toContain(i)
      }
    }
  })

  it('alvos "extras" da cena (sem targetIndex) têm label e profundidade locais', () => {
    for (const s of SCENARIOS) {
      const spec = getSceneSpec(s.id)!
      for (const g of spec.targets.filter((g) => g.targetIndex == null)) {
        expect(g.label, `extra sem label em ${s.id}`).toBeTruthy()
        expect(g.depth, `extra sem profundidade em ${s.id}`).toBeTypeOf('number')
      }
    }
  })

  it('profundidades resolvidas respeitam o teto absoluto 0–5 m (PRD 8.2)', () => {
    for (const s of SCENARIOS) {
      const spec = getSceneSpec(s.id)!
      for (const g of spec.targets) {
        const t = resolveTarget(g, s.targets)
        expect(t.depth, `${s.id}/${t.label}`).toBeGreaterThan(0)
        expect(t.depth, `${s.id}/${t.label}`).toBeLessThanOrEqual(DEPTH_M)
      }
    }
  })

  it('resolveTarget puxa label/profundidade/ângulo de scenarios.ts quando targetIndex existe', () => {
    for (const s of SCENARIOS) {
      const spec = getSceneSpec(s.id)!
      for (const g of spec.targets.filter((g) => g.targetIndex != null)) {
        const base = s.targets[g.targetIndex!]
        const t = resolveTarget(g, s.targets)
        expect(t.label).toBe(g.label ?? base.label)
        expect(t.depth).toBe(g.depth ?? base.depth)
      }
    }
  })

  it('utmForTarget é ativo técnico protegido: metros inteiros derivados da origem da malha', () => {
    // Governança Geo-Cartucho (feedback 2026-07-10): o dado existe no
    // GSFS_RECORD, mas NUNCA é renderizado no bloco (ver SubsurfaceBlock).
    for (const s of SCENARIOS) {
      const spec = getSceneSpec(s.id)!
      for (const g of spec.targets) {
        const utm = utmForTarget(spec, g, s.area)
        expect(Number.isInteger(utm.e)).toBe(true)
        expect(Number.isInteger(utm.n)).toBe(true)
        expect(utm.e).toBeGreaterThanOrEqual(spec.origin.e)
        expect(utm.n).toBeGreaterThanOrEqual(spec.origin.n)
      }
    }
  })
})
