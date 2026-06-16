import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { E4Scan } from './E4Scan'
import { useSimulator } from '../store'

beforeEach(() => useSimulator.getState().reset())
afterEach(() => cleanup())

describe('E4Scan — tela de varredura hi-fi', () => {
  it('exibe o HUD com PROGRESSO DA VARREDURA', () => {
    render(<E4Scan />)
    expect(screen.getByText('PROGRESSO DA VARREDURA')).toBeTruthy()
  })

  it('exibe a aba AÇÕES na borda direita', () => {
    render(<E4Scan />)
    expect(screen.getByText('AÇÕES')).toBeTruthy()
  })

  it('clicar na aba AÇÕES abre o sheet', () => {
    render(<E4Scan />)
    fireEvent.click(screen.getByText('AÇÕES'))
    expect(screen.getByText('Ações da varredura')).toBeTruthy()
  })

  it('sheet exibe botões Reiniciar e Abortar', () => {
    render(<E4Scan />)
    fireEvent.click(screen.getByText('AÇÕES'))
    expect(screen.getByText(/Reiniciar varredura/)).toBeTruthy()
    expect(screen.getByText(/Abortar varredura/)).toBeTruthy()
  })

  it('Abortar abre confirmação', () => {
    render(<E4Scan />)
    fireEvent.click(screen.getByText('AÇÕES'))
    // Find the "Abortar varredura" sheet button (not the confirmation button yet)
    const btns = screen.getAllByText(/Abortar varredura/)
    fireEvent.click(btns[0])
    expect(screen.getByText('Abortar varredura?')).toBeTruthy()
  })

  it('confirmar Abortar chama abort e vai para e2-menu', () => {
    render(<E4Scan />)
    fireEvent.click(screen.getByText('AÇÕES'))
    const btns = screen.getAllByText(/Abortar varredura/)
    fireEvent.click(btns[0])
    // Now confirm dialog is shown — click "Abortar varredura" confirm button
    const confirmBtns = screen.getAllByText(/Abortar varredura/)
    fireEvent.click(confirmBtns[confirmBtns.length - 1])
    expect(useSimulator.getState().step).toBe('e2-menu')
  })

  it('Reiniciar abre confirmação', () => {
    render(<E4Scan />)
    fireEvent.click(screen.getByText('AÇÕES'))
    fireEvent.click(screen.getByText(/Reiniciar varredura/))
    expect(screen.getByText('Reiniciar varredura?')).toBeTruthy()
  })

  it('exibe os painéis de sensor: GPR, EMI, IMU, GNSS', () => {
    render(<E4Scan />)
    // GPR, EMI, IMU, GNSS appear in both HUD sensor dots and sensor panel headers
    expect(screen.getAllByText('GPR').length).toBeGreaterThan(0)
    expect(screen.getAllByText('EMI').length).toBeGreaterThan(0)
    expect(screen.getAllByText('IMU').length).toBeGreaterThan(0)
    expect(screen.getAllByText(/GNSS/).length).toBeGreaterThan(0)
  })
})
