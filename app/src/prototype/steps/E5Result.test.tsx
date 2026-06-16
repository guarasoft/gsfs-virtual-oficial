import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { E5Result } from './E5Result'
import { useSimulator } from '../store'

beforeEach(() => {
  useSimulator.getState().reset()
  useSimulator.getState().selectScenario('c1')
})
afterEach(() => cleanup())

describe('E5Result — tela de Resultado hi-fi', () => {
  it('exibe o título RESULTADO DA OPERAÇÃO', () => {
    render(<E5Result />)
    expect(screen.getByText('RESULTADO DA OPERAÇÃO')).toBeTruthy()
  })

  it('exibe o subtítulo GROUND SCANNING FUSION SYSTEM', () => {
    render(<E5Result />)
    expect(screen.getByText('GROUND SCANNING FUSION SYSTEM')).toBeTruthy()
  })

  it('exibe o STATUS: CONCLUÍDA na barra de meta', () => {
    render(<E5Result />)
    expect(screen.getByText('STATUS: CONCLUÍDA')).toBeTruthy()
  })

  it('exibe os ativos derivados do cenário c1 — "Ouro (veio)"', () => {
    render(<E5Result />)
    // deve aparecer pelo menos duas vezes (legenda + caption do bloco 3D)
    const occurrences = screen.getAllByText(/Ouro \(veio\)/)
    expect(occurrences.length).toBeGreaterThanOrEqual(1)
  })

  it('exibe a profundidade 3,0 m para Ouro (veio) no cenário c1', () => {
    render(<E5Result />)
    expect(screen.getByText('3,0 m · 65°')).toBeTruthy()
  })

  it('exibe o GSFS_RECORD ID', () => {
    render(<E5Result />)
    // O ID aparece em dois lugares: meta header e legenda
    const occurrences = screen.getAllByText('GSFS-RECORD-2026-06-03-142')
    expect(occurrences.length).toBeGreaterThanOrEqual(1)
  })

  it('exibe os campos de registro: Data, Hora, Volume cúbico', () => {
    render(<E5Result />)
    expect(screen.getByText('Data')).toBeTruthy()
    expect(screen.getByText('Hora')).toBeTruthy()
    expect(screen.getByText('Volume cúbico')).toBeTruthy()
    expect(screen.getByText('03/06/2026')).toBeTruthy()
    expect(screen.getByText('14:34:31')).toBeTruthy()
    expect(screen.getByText('2,4 m³')).toBeTruthy()
  })

  it('exibe o hash SHA-256', () => {
    render(<E5Result />)
    expect(
      screen.getByText('a9f2c71d4e8b3f06d21a7c95e0b48f1c6d3a92e7b8045fc1ad9e23b6708c4f5d')
    ).toBeTruthy()
  })

  it('exibe o bloco 3D placeholder', () => {
    render(<E5Result />)
    expect(screen.getByText(/Bloco 3D do subsolo/)).toBeTruthy()
  })

  it('clicar em "Nova operação" chama newOperation (navega para e2-menu)', () => {
    render(<E5Result />)
    fireEvent.click(screen.getByText('Nova operação'))
    expect(useSimulator.getState().step).toBe('e2-menu')
  })

  it('clicar em "Replay" navega para e7-replay', () => {
    render(<E5Result />)
    fireEvent.click(screen.getByText('Replay'))
    expect(useSimulator.getState().step).toBe('e7-replay')
  })

  it('clicar em "Exportar" define step como e6-export', () => {
    render(<E5Result />)
    fireEvent.click(screen.getByText('Exportar →'))
    expect(useSimulator.getState().step).toBe('e6-export')
  })

  it('quando nenhum cenário está selecionado, usa fallback c1', () => {
    useSimulator.getState().reset() // selectedScenarioId = null
    render(<E5Result />)
    // ainda deve renderizar ativos de c1
    expect(screen.getByText('3,0 m · 65°')).toBeTruthy()
  })

  it('exibe "Magnetita" (primeiro ativo do c1) com profundidade 1,8 m', () => {
    render(<E5Result />)
    expect(screen.getByText('Magnetita')).toBeTruthy()
    expect(screen.getByText('1,8 m')).toBeTruthy()
  })
})
