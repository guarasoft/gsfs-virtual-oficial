import { useCallback, useEffect, useRef, useState } from 'react'
import type { TimelineEvent } from '../data/timeline'
import { advance, initTimeline, progressOf, seekTo, sortEvents, type TimelineState } from './timeline-core'

export interface TimelineController {
  elapsed: number
  progress: number
  playing: boolean
  play(): void
  pause(): void
  seek(t: number): void
  setRate(r: number): void
}

export interface UseTimelineOpts {
  durationSec: number
  events?: TimelineEvent[]
  autostart?: boolean
  onEvent?: (e: TimelineEvent) => void
  onComplete?: () => void
}

export function useTimeline(opts: UseTimelineOpts): TimelineController {
  const { durationSec, events = [], autostart = false, onEvent, onComplete } = opts

  const sortedRef = useRef<TimelineEvent[]>(sortEvents(events)) // eventos são fixados na montagem; mudanças em 'events' após o mount não têm efeito
  const stateRef = useRef<TimelineState>(initTimeline())
  const rateRef = useRef(1)
  const lastRef = useRef<number | null>(null)
  const onEventRef = useRef(onEvent)
  const onCompleteRef = useRef(onComplete)
  onEventRef.current = onEvent
  onCompleteRef.current = onComplete

  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(autostart) // autostart é só o estado inicial; controle com play()/pause()

  useEffect(() => {
    if (!playing) {
      lastRef.current = null
      return
    }
    let active = true
    let raf = 0
    const tick = (ts: number) => {
      if (!active) return
      if (lastRef.current == null) lastRef.current = ts
      const deltaSec = ((ts - lastRef.current) / 1000) * rateRef.current
      lastRef.current = ts
      const res = advance(stateRef.current, deltaSec, sortedRef.current, durationSec)
      stateRef.current = res.state
      res.fired.forEach((e) => onEventRef.current?.(e))
      setElapsed(res.state.elapsed)
      if (res.completed) {
        setPlaying(false)
        onCompleteRef.current?.()
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      active = false
      cancelAnimationFrame(raf)
    }
  }, [playing, durationSec])

  const play = useCallback(() => setPlaying(true), [])
  const pause = useCallback(() => setPlaying(false), [])
  const seek = useCallback(
    (t: number) => {
      stateRef.current = seekTo(t, sortedRef.current, durationSec)
      setElapsed(stateRef.current.elapsed)
      if (stateRef.current.done) setPlaying(false)
    },
    [durationSec],
  )
  const setRate = useCallback((r: number) => {
    rateRef.current = r
  }, [])

  return { elapsed, progress: progressOf(elapsed, durationSec), playing, play, pause, seek, setRate }
}
