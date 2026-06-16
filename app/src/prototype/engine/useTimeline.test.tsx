import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTimeline } from './useTimeline'

describe('useTimeline', () => {
  it('começa parado em 0 quando autostart é falso', () => {
    const { result } = renderHook(() => useTimeline({ durationSec: 10 }))
    expect(result.current.elapsed).toBe(0)
    expect(result.current.progress).toBe(0)
    expect(result.current.playing).toBe(false)
  })

  it('seek posiciona elapsed e progress', () => {
    const { result } = renderHook(() => useTimeline({ durationSec: 10 }))
    act(() => result.current.seek(5))
    expect(result.current.elapsed).toBe(5)
    expect(result.current.progress).toBe(50)
  })

  it('play liga o playing', () => {
    const { result } = renderHook(() => useTimeline({ durationSec: 10 }))
    act(() => result.current.play())
    expect(result.current.playing).toBe(true)
  })

  it('pause desliga o playing', () => {
    const { result } = renderHook(() => useTimeline({ durationSec: 10 }))
    act(() => result.current.play())
    expect(result.current.playing).toBe(true)
    act(() => result.current.pause())
    expect(result.current.playing).toBe(false)
  })

  it('seek até o fim para a reprodução', () => {
    const { result } = renderHook(() => useTimeline({ durationSec: 10 }))
    act(() => {
      result.current.play()
      result.current.seek(10)
    })
    expect(result.current.elapsed).toBe(10)
    expect(result.current.playing).toBe(false)
  })
})
