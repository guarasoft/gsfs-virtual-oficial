import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { E7Replay } from './E7Replay'
import { useSimulator } from '../store'

// O hook real continua sendo chamado (regras de hooks preservadas); o wrap só
// força progress=100 quando o teste pede, para alcançar a tela de fim do
// replay sem reproduzir os 90–135 s da sessão.
const scanCtl = vi.hoisted(() => ({ forceComplete: false }))
vi.mock('../sim/useScan', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../sim/useScan')>()
  return {
    ...mod,
    useScan: (...args: Parameters<typeof mod.useScan>) => {
      const real = mod.useScan(...args)
      return scanCtl.forceComplete ? { ...real, progress: 100 } : real
    },
  }
})

beforeEach(() => {
  scanCtl.forceComplete = false
  useSimulator.getState().reset()
})
afterEach(() => cleanup())

describe('E7Replay — tela de Replay hi-fi', () => {
  // --------------------------------------------------------------------------
  // Listagem
  // --------------------------------------------------------------------------

  it('exibe 5 gravações na listagem (5 botões "Reproduzir")', () => {
    render(<E7Replay />)
    const btns = screen.getAllByText('Reproduzir')
    expect(btns).toHaveLength(5)
  })

  it('exibe o nome do cenário C1 na listagem', () => {
    render(<E7Replay />)
    expect(screen.getByText(/Veio de Ouro em Encosta Rochosa/)).toBeTruthy()
  })

  it('exibe o nome do cenário C5 na listagem', () => {
    render(<E7Replay />)
    expect(screen.getByText(/Inteligência Subsuperficial Integrada/)).toBeTruthy()
  })

  it('exibe os IDs GSFS_RECORD de cada gravação', () => {
    render(<E7Replay />)
    expect(screen.getByText('GSFS-RECORD-2026-06-03-142')).toBeTruthy()
    expect(screen.getByText('GSFS-RECORD-2026-06-01-119')).toBeTruthy()
  })

  it('"← Voltar ao menu" navega para e2-menu via store', () => {
    render(<E7Replay />)
    fireEvent.click(screen.getByText('← Voltar ao menu'))
    expect(useSimulator.getState().step).toBe('e2-menu')
  })

  it('"Exportar" navega para e6-export via store', () => {
    render(<E7Replay />)
    const exportBtns = screen.getAllByText('Exportar')
    fireEvent.click(exportBtns[0])
    expect(useSimulator.getState().step).toBe('e6-export')
  })

  // --------------------------------------------------------------------------
  // Transição Listagem → Replay
  // --------------------------------------------------------------------------

  it('clicar em "Reproduzir" na primeira gravação entra no estado de Replay', () => {
    render(<E7Replay />)
    fireEvent.click(screen.getAllByText('Reproduzir')[0])
    // ScanView exibe PROGRESSO DA VARREDURA
    expect(screen.getByText('PROGRESSO DA VARREDURA')).toBeTruthy()
  })

  it('Replay exibe o selo "MODO REPLAY"', () => {
    render(<E7Replay />)
    fireEvent.click(screen.getAllByText('Reproduzir')[0])
    expect(screen.getByText('MODO REPLAY')).toBeTruthy()
  })

  it('Replay exibe os metadados D-017 no banner (cenário e ID)', () => {
    render(<E7Replay />)
    fireEvent.click(screen.getAllByText('Reproduzir')[0])
    // Banner deve conter o ID da gravação C1
    expect(screen.getByText('GSFS-RECORD-2026-06-03-142')).toBeTruthy()
  })

  // --------------------------------------------------------------------------
  // VOLTAR — Replay → Listagem
  // --------------------------------------------------------------------------

  it('a aba "VOLTAR" retorna à listagem', () => {
    render(<E7Replay />)
    fireEvent.click(screen.getAllByText('Reproduzir')[0])
    // Clica na EdgeTab "VOLTAR"
    fireEvent.click(screen.getByText('VOLTAR'))
    // Volta à listagem: os 5 "Reproduzir" aparecem novamente
    expect(screen.getAllByText('Reproduzir')).toHaveLength(5)
  })

  // --------------------------------------------------------------------------
  // Replay de cenário diferente (C3)
  // --------------------------------------------------------------------------

  it('Reproduzir C3 exibe o ID correto no banner', () => {
    render(<E7Replay />)
    // C3 é o 3º item (índice 2)
    fireEvent.click(screen.getAllByText('Reproduzir')[2])
    expect(screen.getByText('GSFS-RECORD-2026-06-02-131')).toBeTruthy()
  })

  // --------------------------------------------------------------------------
  // Entrada direta vinda da E5 (replayCurrent) — reproduz o cenário atual
  // --------------------------------------------------------------------------

  it('vindo da E5 (replayCurrent) entra direto no replay do cenário atual, sem a lista', () => {
    useSimulator.getState().selectScenario('c2')
    useSimulator.getState().replayCurrent()
    render(<E7Replay />)
    // Já está no player (MODO REPLAY), não na listagem
    expect(screen.getByText('MODO REPLAY')).toBeTruthy()
    expect(screen.getByText('GSFS-RECORD-2026-06-03-138')).toBeTruthy() // ID do C2
    expect(screen.queryByText('Gravações de sessão (GSFS_RECORD)')).toBeNull()
  })

  it('no replay vindo da E5, "VOLTAR" retorna à tela de resultado (e5-result)', () => {
    useSimulator.getState().selectScenario('c1')
    useSimulator.getState().replayCurrent()
    render(<E7Replay />)
    fireEvent.click(screen.getByText('VOLTAR'))
    expect(useSimulator.getState().step).toBe('e5-result')
  })

  // --------------------------------------------------------------------------
  // Fim do replay — bloco 3D de resultado da E5 (D-020)
  // --------------------------------------------------------------------------

  it('ao concluir, apresenta o bloco 3D de resultado da E5 + Reiniciar/Voltar', async () => {
    scanCtl.forceComplete = true
    render(<E7Replay />)
    fireEvent.click(screen.getAllByText('Reproduzir')[0])
    // o player espera 600 ms após progress=100 para trocar para a tela final
    expect(await screen.findByText(/Replay concluído/, undefined, { timeout: 3000 })).toBeTruthy()
    // D-020: a E7 apresenta o MESMO bloco 3D da E5 (fallback sem WebGL no jsdom)
    expect(screen.getByText(/Bloco 3D do subsolo/)).toBeTruthy()
    expect(screen.getByText('↻ Reiniciar')).toBeTruthy()
    expect(screen.getByText('Voltar')).toBeTruthy()
  })
})
