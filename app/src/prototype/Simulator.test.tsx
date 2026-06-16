import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { Simulator } from './Simulator'
import { useSimulator } from './store'

beforeEach(() => useSimulator.getState().reset())
afterEach(() => cleanup())

describe('Simulator (máquina de estados)', () => {
  it('renderiza a etapa atual lida do store', () => {
    useSimulator.setState({ step: 'e2-menu' })
    render(<Simulator />)
    expect(screen.getByText('MENU PRINCIPAL')).toBeTruthy()
  })

  it('reage à troca de etapa no store', () => {
    useSimulator.setState({ step: 'e6-export' })
    render(<Simulator />)
    expect(screen.getByText(/E6 — Exportação/)).toBeTruthy()
  })
})
