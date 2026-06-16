import type { TimelineEvent } from '../data/timeline'

export interface TimelineState {
  elapsed: number   // segundos lógicos
  nextIdx: number   // índice do próximo evento (sobre a lista ordenada)
  done: boolean
}

export function initTimeline(): TimelineState {
  return { elapsed: 0, nextIdx: 0, done: false }
}

export function sortEvents(events: TimelineEvent[]): TimelineEvent[] {
  return [...events].sort((a, b) => a.t - b.t)
}

export interface AdvanceResult {
  state: TimelineState
  fired: TimelineEvent[]
  completed: boolean   // true só no tick que atinge durationSec
}

export function advance(
  state: TimelineState,
  deltaSec: number,
  sortedEvents: TimelineEvent[],
  durationSec: number,
): AdvanceResult {
  if (state.done) return { state, fired: [], completed: false }
  const elapsed = Math.min(durationSec, state.elapsed + Math.max(0, deltaSec))
  const fired: TimelineEvent[] = []
  let idx = state.nextIdx
  while (idx < sortedEvents.length && sortedEvents[idx].t <= elapsed) {
    fired.push(sortedEvents[idx])
    idx++
  }
  const done = elapsed >= durationSec
  return { state: { elapsed, nextIdx: idx, done }, fired, completed: done && !state.done }
}

export function progressOf(elapsed: number, durationSec: number): number {
  if (durationSec <= 0) return 100
  return Math.round(Math.max(0, Math.min(100, (elapsed / durationSec) * 100)))
}

export function seekTo(t: number, sortedEvents: TimelineEvent[], durationSec: number): TimelineState {
  const elapsed = Math.max(0, Math.min(durationSec, t))
  let idx = 0
  while (idx < sortedEvents.length && sortedEvents[idx].t <= elapsed) idx++
  return { elapsed, nextIdx: idx, done: elapsed >= durationSec }
}
