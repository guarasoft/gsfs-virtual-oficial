import { describe, it, expect } from 'vitest'
import { advance, initTimeline, progressOf, seekTo, sortEvents } from './timeline-core'
import type { TimelineEvent } from '../data/timeline'

const evs: TimelineEvent[] = [
  { t: 1, kind: 'phase', label: 'a' },
  { t: 3, kind: 'detection', label: 'b' },
  { t: 2, kind: 'subliminal', label: 'c' },
]

describe('timeline-core', () => {
  it('ordena eventos por t', () => {
    expect(sortEvents(evs).map((e) => e.label)).toEqual(['a', 'c', 'b'])
  })

  it('advance dispara os eventos cujo t foi cruzado, em ordem', () => {
    const sorted = sortEvents(evs)
    const r1 = advance(initTimeline(), 1.5, sorted, 5)
    expect(r1.fired.map((e) => e.label)).toEqual(['a'])
    const r2 = advance(r1.state, 1.0, sorted, 5) // elapsed 2.5
    expect(r2.fired.map((e) => e.label)).toEqual(['c'])
  })

  it('nunca dispara o mesmo evento duas vezes (determinístico)', () => {
    const sorted = sortEvents(evs)
    let s = initTimeline()
    const all: string[] = []
    for (let i = 0; i < 10; i++) {
      const r = advance(s, 1, sorted, 5)
      s = r.state
      all.push(...r.fired.map((e) => e.label!))
    }
    expect(all).toEqual(['a', 'c', 'b'])
  })

  it('progress vai de 0 a 100 (inteiro) e satura', () => {
    expect(progressOf(0, 90)).toBe(0)
    expect(progressOf(45, 90)).toBe(50)
    expect(progressOf(200, 90)).toBe(100)
  })

  it('completed dispara só na transição para o fim', () => {
    const sorted = sortEvents(evs)
    const r1 = advance(initTimeline(), 5, sorted, 5)
    expect(r1.completed).toBe(true)
    const r2 = advance(r1.state, 1, sorted, 5)
    expect(r2.completed).toBe(false)
  })

  it('seekTo posiciona elapsed/nextIdx e não re-dispara o que já passou', () => {
    const sorted = sortEvents(evs)
    const s = seekTo(2, sorted, 5)
    expect(s.elapsed).toBe(2)
    const r = advance(s, 1.5, sorted, 5) // 2 → 3.5
    expect(r.fired.map((e) => e.label)).toEqual(['b'])
  })

  it('eventos com mesmo t disparam juntos no mesmo tick', () => {
    const co: TimelineEvent[] = [
      { t: 2, kind: 'phase', label: 'x' },
      { t: 2, kind: 'detection', label: 'y' },
    ]
    const sorted = sortEvents(co)
    const r = advance(initTimeline(), 2, sorted, 10)
    expect(r.fired.map((e) => e.label)).toEqual(['x', 'y'])
  })

  it('deltaSec zero ou negativo não avança o relógio', () => {
    const sorted = sortEvents(evs)
    const r0 = advance(initTimeline(), 0, sorted, 5)
    expect(r0.state.elapsed).toBe(0)
    expect(r0.fired).toEqual([])
    const rNeg = advance(initTimeline(), -3, sorted, 5)
    expect(rNeg.state.elapsed).toBe(0)
  })

  it('advance com lista de eventos vazia só avança o relógio', () => {
    const r = advance(initTimeline(), 2, [], 10)
    expect(r.state.elapsed).toBe(2)
    expect(r.fired).toEqual([])
    expect(r.completed).toBe(false)
  })

  it('seekTo com t negativo satura em 0', () => {
    const s = seekTo(-5, [], 10)
    expect(s.elapsed).toBe(0)
    expect(s.nextIdx).toBe(0)
    expect(s.done).toBe(false)
  })

  it('seekTo em t == durationSec marca done', () => {
    const sorted = sortEvents(evs)
    const s = seekTo(5, sorted, 5)
    expect(s.elapsed).toBe(5)
    expect(s.done).toBe(true)
  })

  it('progressOf retorna 100 quando durationSec é 0', () => {
    expect(progressOf(0, 0)).toBe(100)
  })
})
