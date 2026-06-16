import { describe, it, expect } from 'vitest'
import { SCENARIOS, getScenario } from './scenarios'

describe('catálogo de cenários', () => {
  it('tem os 5 cenários na ordem c1..c5', () => {
    expect(SCENARIOS.map((s) => s.id)).toEqual(['c1', 'c2', 'c3', 'c4', 'c5'])
  })

  it('nenhuma profundidade de alvo excede 5 m (Teto de Métricas)', () => {
    for (const s of SCENARIOS)
      for (const t of s.targets) expect(t.depth).toBeLessThanOrEqual(5)
  })

  it('C5 mantém o nome validado', () => {
    expect(getScenario('c5').name).toBe(
      'Inteligência Subsuperficial Integrada — Demonstração GSFS',
    )
  })

  it('só o C5 dura 135 s; os demais 90 s', () => {
    expect(getScenario('c5').durationSec).toBe(135)
    for (const id of ['c1', 'c2', 'c3', 'c4'] as const)
      expect(getScenario(id).durationSec).toBe(90)
  })

  it('getScenario lança em id desconhecido', () => {
    // @ts-expect-error id inválido proposital
    expect(() => getScenario('c9')).toThrow()
  })
})
