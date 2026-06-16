import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { E2Menu } from './E2Menu'
import { useSimulator } from '../store'

beforeEach(() => useSimulator.getState().reset())
afterEach(() => cleanup())

describe('E2Menu — tela de menu hi-fi', () => {
  it('exibe o título MENU PRINCIPAL', () => {
    render(<E2Menu />)
    expect(screen.getByText('MENU PRINCIPAL')).toBeTruthy()
  })

  it('exibe os dois cards de ação', () => {
    render(<E2Menu />)
    expect(screen.getByText('NOVA OPERAÇÃO')).toBeTruthy()
    expect(screen.getByText('REPLAY')).toBeTruthy()
  })

  it('exibe a boas-vindas: GSFS VIRTUAL', () => {
    render(<E2Menu />)
    expect(screen.getByText('GSFS VIRTUAL')).toBeTruthy()
  })

  it('clicar em "Nova Operação" navega para e3-setup', () => {
    render(<E2Menu />)
    fireEvent.click(screen.getByText('NOVA OPERAÇÃO'))
    expect(useSimulator.getState().step).toBe('e3-setup')
  })

  it('clicar em "Replay" navega para e7-replay', () => {
    render(<E2Menu />)
    fireEvent.click(screen.getByText('REPLAY'))
    expect(useSimulator.getState().step).toBe('e7-replay')
  })

  it('exibe os itens de status no rodapé', () => {
    render(<E2Menu />)
    expect(screen.getByText('PRONTO')).toBeTruthy()
    expect(screen.getByText('FIX')).toBeTruthy()
  })
})
