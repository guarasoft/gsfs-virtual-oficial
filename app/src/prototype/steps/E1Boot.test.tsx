import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { E1Boot } from './E1Boot'
import { useSimulator } from '../store'

beforeEach(() => useSimulator.getState().reset())

describe('E1 Boot', () => {
  it('mostra a splash com a marca no início (elapsed 0)', () => {
    render(<E1Boot />)
    // O componente inicia no estado "splash" (elapsed = 0 < SPLASH_UNTIL)
    expect(screen.getByText('GSFS')).toBeTruthy()
    expect(screen.getByText('GROUND SCANNING FUSION SYSTEM')).toBeTruthy()
    // Tagline e caption da splash também devem aparecer
    expect(screen.getByText('INICIALIZANDO NÚCLEO GSFS')).toBeTruthy()
    expect(screen.getByText(/Carregando módulos de varredura/)).toBeTruthy()
  })

  it('monta sem erros — componente estável em estado inicial', () => {
    // Garante que não há exceção na renderização inicial
    expect(() => render(<E1Boot />)).not.toThrow()
  })
})
