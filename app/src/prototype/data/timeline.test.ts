/**
 * Testes das timelines determinísticas — Roteiro Técnico dos 5 Cenários GSFS Virtual
 *
 * Referência: discovery/Roteiro_Tecnico_GSFS_Virtual.md
 * Seção 8 "Quadro-resumo de todas as detecções":
 *   C1=2, C2=3, C3=2, C4=1 (ouro confirmado), C5=4 → total=12 detecções confirmadas
 *   C4: 2 falsos-ecos descartados + 2 zonas de degradação
 */
import { describe, it, expect } from 'vitest'
import { TIMELINES, getTimeline } from './timeline'
import { getScenario } from './scenarios'
import type { ScenarioId } from './types'

const ALL_IDS: ScenarioId[] = ['c1', 'c2', 'c3', 'c4', 'c5']

describe('getTimeline()', () => {
  it('retorna a timeline correta para cada cenário', () => {
    for (const id of ALL_IDS) {
      const tl = getTimeline(id)
      expect(tl.scenarioId).toBe(id)
      expect(tl).toBe(TIMELINES[id])
    }
  })
})

describe('Contagem de detecções por cenário (Roteiro §8)', () => {
  it('C1 tem exatamente 2 detecções', () => {
    const detections = getTimeline('c1').events.filter(e => e.kind === 'detection')
    expect(detections).toHaveLength(2)
  })

  it('C2 tem exatamente 3 detecções', () => {
    const detections = getTimeline('c2').events.filter(e => e.kind === 'detection')
    expect(detections).toHaveLength(3)
  })

  it('C3 tem exatamente 2 detecções', () => {
    const detections = getTimeline('c3').events.filter(e => e.kind === 'detection')
    expect(detections).toHaveLength(2)
  })

  it('C4 tem exatamente 1 detecção confirmada (o ouro)', () => {
    const detections = getTimeline('c4').events.filter(e => e.kind === 'detection')
    expect(detections).toHaveLength(1)
  })

  it('C5 tem exatamente 4 detecções', () => {
    const detections = getTimeline('c5').events.filter(e => e.kind === 'detection')
    expect(detections).toHaveLength(4)
  })

  it('Total de detecções confirmadas = 12 (Roteiro §8)', () => {
    const total = ALL_IDS.flatMap(id =>
      getTimeline(id).events.filter(e => e.kind === 'detection')
    ).length
    expect(total).toBe(12)
  })
})

describe('C4 — CA-06: falsos-ecos e zonas de degradação', () => {
  const c4 = getTimeline('c4')

  it('C4 tem exatamente 2 eventos discard', () => {
    const discards = c4.events.filter(e => e.kind === 'discard')
    expect(discards).toHaveLength(2)
  })

  it('C4 tem exatamente 2 eventos degradation', () => {
    const degradations = c4.events.filter(e => e.kind === 'degradation')
    expect(degradations).toHaveLength(2)
  })

  it('C4 falsos-ecos precedem seus respectivos descartes', () => {
    const falseEchoes = c4.events.filter(e => e.kind === 'false-echo')
    const discards    = c4.events.filter(e => e.kind === 'discard')
    expect(falseEchoes).toHaveLength(2)
    expect(falseEchoes[0].t).toBeLessThan(discards[0].t)
    expect(falseEchoes[1].t).toBeLessThan(discards[1].t)
  })

  it('C4 detecção confirmada tem targetRef = "Ouro (veio)"', () => {
    const det = c4.events.find(e => e.kind === 'detection')
    expect(det?.targetRef).toBe('Ouro (veio)')
  })
})

describe('targetRef bate com o catálogo de alvos de cada cenário', () => {
  for (const id of ALL_IDS) {
    const tl       = getTimeline(id)
    const scenario = getScenario(id)
    const catalogLabels = new Set(scenario.targets.map(t => t.label))
    const detections = tl.events.filter(e => e.kind === 'detection' && e.targetRef != null)

    for (const det of detections) {
      it(`${id}: targetRef "${det.targetRef}" existe no catálogo de alvos`, () => {
        expect(catalogLabels.has(det.targetRef!)).toBe(true)
      })
    }
  }
})

describe('Ordenação e limites de tempo', () => {
  for (const id of ALL_IDS) {
    const tl       = getTimeline(id)
    const scenario = getScenario(id)

    it(`${id}: eventos ordenados por t (não-decrescente)`, () => {
      const times = tl.events.map(e => e.t)
      for (let i = 1; i < times.length; i++) {
        expect(times[i]).toBeGreaterThanOrEqual(times[i - 1])
      }
    })

    it(`${id}: nenhum evento ultrapassa durationSec=${scenario.durationSec}`, () => {
      for (const ev of tl.events) {
        expect(ev.t).toBeLessThanOrEqual(scenario.durationSec)
      }
    })
  }
})
