import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { E3Setup } from './E3Setup'
import { useSimulator } from '../store'

beforeEach(() => useSimulator.getState().reset())
afterEach(() => cleanup())

// Helper: open the Cenário select and choose an option by its visible label
function selectCenario(label: string) {
  // The custom Select renders a combobox trigger
  const trigger = screen.getByRole('combobox')
  fireEvent.click(trigger)
  // The listbox opens; find the option
  const option = screen.getByRole('option', { name: label })
  fireEvent.click(option)
}

describe('E3Setup — tela de Setup hi-fi', () => {
  // ---- Rendering -------------------------------------------------------

  it('exibe o título CONFIGURAÇÃO DE MISSÃO', () => {
    render(<E3Setup />)
    expect(screen.getByText('CONFIGURAÇÃO DE MISSÃO')).toBeTruthy()
  })

  it('exibe o subtítulo SETUP DE OPERAÇÃO', () => {
    render(<E3Setup />)
    expect(screen.getByText('SETUP DE OPERAÇÃO')).toBeTruthy()
  })

  it('exibe a opção "Nova configuração (manual)" no select', () => {
    render(<E3Setup />)
    const trigger = screen.getByRole('combobox')
    fireEvent.click(trigger)
    expect(screen.getByRole('option', { name: 'Nova configuração (manual)' })).toBeTruthy()
  })

  it('exibe as 5 opções de cenário no select', () => {
    render(<E3Setup />)
    const trigger = screen.getByRole('combobox')
    fireEvent.click(trigger)
    expect(screen.getByRole('option', { name: /Cenário 1/ })).toBeTruthy()
    expect(screen.getByRole('option', { name: /Cenário 2/ })).toBeTruthy()
    expect(screen.getByRole('option', { name: /Cenário 3/ })).toBeTruthy()
    expect(screen.getByRole('option', { name: /Cenário 4/ })).toBeTruthy()
    expect(screen.getByRole('option', { name: /Cenário 5/ })).toBeTruthy()
  })

  // ---- Modo manual (padrão) -------------------------------------------

  it('em modo manual o botão "Iniciar varredura" está desabilitado', () => {
    render(<E3Setup />)
    const btn = screen.getByRole('button', { name: /Iniciar varredura/i })
    expect((btn as HTMLButtonElement).disabled).toBe(true)
  })

  it('em modo manual exibe os controles de solo desbloqueados', () => {
    render(<E3Setup />)
    const rochosoBtn = screen.getByRole('button', { name: 'Rochoso' })
    expect((rochosoBtn as HTMLButtonElement).disabled).toBe(false)
  })

  it('em modo manual exibe inputs de área X e Y', () => {
    render(<E3Setup />)
    expect(screen.getByLabelText('Eixo X (m)')).toBeTruthy()
    expect(screen.getByLabelText('Eixo Y (m)')).toBeTruthy()
  })

  it('em modo manual exibe os botões de preset de área', () => {
    render(<E3Setup />)
    expect(screen.getByLabelText('Preset 10 × 10 m')).toBeTruthy()
    expect(screen.getByLabelText('Preset 25 × 25 m')).toBeTruthy()
  })

  it('preset 15×15 atualiza os inputs de área', () => {
    render(<E3Setup />)
    fireEvent.click(screen.getByLabelText('Preset 15 × 15 m'))
    expect((screen.getByLabelText('Eixo X (m)') as HTMLInputElement).value).toBe('15')
    expect((screen.getByLabelText('Eixo Y (m)') as HTMLInputElement).value).toBe('15')
  })

  it('clicar em solo "Arenoso" o seleciona em modo manual', () => {
    render(<E3Setup />)
    fireEvent.click(screen.getByRole('button', { name: 'Arenoso' }))
    expect(screen.getByRole('button', { name: 'Arenoso' }).getAttribute('aria-pressed')).toBe('true')
  })

  // ---- Seleção de cenário C1 ------------------------------------------

  it('selecionar C1 chama selectScenario("c1") no store', () => {
    render(<E3Setup />)
    selectCenario('Cenário 1 — Veio de Ouro em Encosta Rochosa')
    expect(useSimulator.getState().selectedScenarioId).toBe('c1')
  })

  it('após selecionar C1 o store tem selectedScenarioId === "c1"', () => {
    render(<E3Setup />)
    selectCenario('Cenário 1 — Veio de Ouro em Encosta Rochosa')
    expect(useSimulator.getState().selectedScenarioId).toBe('c1')
  })

  it('C1 exibe solo Rochoso ativo e controles travados', () => {
    render(<E3Setup />)
    selectCenario('Cenário 1 — Veio de Ouro em Encosta Rochosa')
    const rochosoBtn = screen.getByRole('button', { name: 'Rochoso' })
    expect(rochosoBtn.getAttribute('aria-pressed')).toBe('true')
    expect((rochosoBtn as HTMLButtonElement).disabled).toBe(true)
  })

  it('C1 exibe solo Arenoso inativo e travado', () => {
    render(<E3Setup />)
    selectCenario('Cenário 1 — Veio de Ouro em Encosta Rochosa')
    const arenosoBtn = screen.getByRole('button', { name: 'Arenoso' })
    expect(arenosoBtn.getAttribute('aria-pressed')).toBe('false')
    expect((arenosoBtn as HTMLButtonElement).disabled).toBe(true)
  })

  it('C1 exibe modalidade Manual ativa e travada', () => {
    render(<E3Setup />)
    selectCenario('Cenário 1 — Veio de Ouro em Encosta Rochosa')
    const manualBtn = screen.getByRole('button', { name: 'Manual' })
    expect(manualBtn.getAttribute('aria-pressed')).toBe('true')
    expect((manualBtn as HTMLButtonElement).disabled).toBe(true)
  })

  it('C1 exibe readout de área "10 × 10 m"', () => {
    render(<E3Setup />)
    selectCenario('Cenário 1 — Veio de Ouro em Encosta Rochosa')
    expect(screen.getByLabelText('Área: 10 × 10 m')).toBeTruthy()
  })

  it('C1 o botão Iniciar fica habilitado', () => {
    render(<E3Setup />)
    selectCenario('Cenário 1 — Veio de Ouro em Encosta Rochosa')
    const btn = screen.getByRole('button', { name: /Iniciar varredura/i })
    expect((btn as HTMLButtonElement).disabled).toBe(false)
  })

  it('C1 clicar em Iniciar define step como "e4-scan"', () => {
    render(<E3Setup />)
    selectCenario('Cenário 1 — Veio de Ouro em Encosta Rochosa')
    fireEvent.click(screen.getByRole('button', { name: /Iniciar varredura/i }))
    expect(useSimulator.getState().step).toBe('e4-scan')
  })

  // ---- Cenário C5 (solo transicional / nota) ---------------------------

  it('C5 exibe Arenoso e Úmido ativos (transicional)', () => {
    render(<E3Setup />)
    selectCenario('Cenário 5 — Inteligência Subsuperficial Integrada — Demonstração GSFS')
    expect(screen.getByRole('button', { name: 'Arenoso' }).getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByRole('button', { name: 'Úmido' }).getAttribute('aria-pressed')).toBe('true')
  })

  it('C5 exibe nota "Arenoso úmido · transicional"', () => {
    render(<E3Setup />)
    selectCenario('Cenário 5 — Inteligência Subsuperficial Integrada — Demonstração GSFS')
    expect(screen.getByText('Arenoso úmido · transicional')).toBeTruthy()
  })

  // ---- Cenário C4 (nota de interferência) -----------------------------

  it('C4 exibe nota de ruído eletromagnético', () => {
    render(<E3Setup />)
    selectCenario('Cenário 4 — Operação sob Interferência Eletromagnética')
    expect(screen.getByText('Rochoso · com ruído eletromagnético')).toBeTruthy()
  })

  // ---- Contexto da operação -------------------------------------------

  it('exibe Data, Hora e Coordenadas GNSS no contexto', () => {
    render(<E3Setup />)
    expect(screen.getByText('03/06/2026')).toBeTruthy()
    expect(screen.getByText('14:34:31')).toBeTruthy()
    expect(screen.getByText('−23,5489° / −46,6388°')).toBeTruthy()
  })

  it('exibe Posicionamento FIX', () => {
    render(<E3Setup />)
    expect(screen.getByText('FIX · 12 satélites')).toBeTruthy()
  })

  it('em modo manual NÃO exibe linha Operação', () => {
    render(<E3Setup />)
    // The "Operação" row only appears when a scenario is selected
    expect(screen.queryByText('Operação')).toBeNull()
  })

  it('com C2 selecionado exibe linha Operação com a aplicação do cenário', () => {
    render(<E3Setup />)
    selectCenario('Cenário 2 — Levantamento de Massa Magnetítica')
    expect(screen.getByText('Operação')).toBeTruthy()
    // application label of c2 (mineracao → rótulo legível)
    expect(screen.getByText('Prospecção mineral')).toBeTruthy()
  })

  // ---- Navegação -------------------------------------------------------

  it('"Voltar ao menu" define step como "e2-menu"', () => {
    render(<E3Setup />)
    fireEvent.click(screen.getByRole('button', { name: /Voltar ao menu/i }))
    expect(useSimulator.getState().step).toBe('e2-menu')
  })
})
