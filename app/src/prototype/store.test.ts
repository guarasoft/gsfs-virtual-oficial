import { describe, it, expect, beforeEach } from 'vitest'
import { useSimulator } from './store'

const get = () => useSimulator.getState()
beforeEach(() => get().reset())

describe('store do simulador', () => {
  it('começa na E1 (boot)', () => {
    expect(get().step).toBe('e1-boot')
  })

  it('goTo troca a etapa', () => {
    get().goTo('e2-menu')
    expect(get().step).toBe('e2-menu')
  })

  it('selectScenario registra o cenário', () => {
    get().selectScenario('c3')
    expect(get().selectedScenarioId).toBe('c3')
  })

  it('startMission vai para a E4', () => {
    get().startMission()
    expect(get().step).toBe('e4-scan')
  })

  it('abort volta à E2 sem registro', () => {
    get().goTo('e4-scan')
    get().abort()
    expect(get().step).toBe('e2-menu')
    expect(get().record).toBeNull()
  })

  it('reset volta à E1 e zera a sessão', () => {
    get().selectScenario('c2')
    get().goTo('e5-result')
    get().reset()
    expect(get().step).toBe('e1-boot')
    expect(get().selectedScenarioId).toBeNull()
  })
})
