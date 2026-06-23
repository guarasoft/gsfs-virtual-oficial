import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react'
import { E6Export } from './E6Export'
import { useSimulator } from '../store'

beforeEach(() => useSimulator.getState().reset())
afterEach(() => cleanup())

describe('E6Export — tela de Exportação hi-fi', () => {
  it('renderiza o título EXPORTAÇÃO', () => {
    render(<E6Export />)
    expect(screen.getByText('EXPORTAÇÃO')).toBeTruthy()
  })

  it('renderiza o subtítulo GROUND SCANNING FUSION SYSTEM', () => {
    render(<E6Export />)
    expect(screen.getByText('GROUND SCANNING FUSION SYSTEM')).toBeTruthy()
  })

  it('exibe os três formatos: PDF, GIS e BIM', () => {
    render(<E6Export />)
    // Badges de formato
    expect(screen.getByText('PDF')).toBeTruthy()
    expect(screen.getByText('GIS')).toBeTruthy()
    expect(screen.getByText('BIM')).toBeTruthy()
  })

  it('exibe os nomes dos formatos', () => {
    render(<E6Export />)
    expect(screen.getByText('Relatório Técnico GSFS')).toBeTruthy()
    expect(screen.getByText('Pacote Geoespacial')).toBeTruthy()
    expect(screen.getByText('Pacote Construtivo')).toBeTruthy()
  })

  it('exibe a indicação preview-only (D-008)', () => {
    render(<E6Export />)
    expect(screen.getByText(/preview simbólico.*sem download real.*D-008/i)).toBeTruthy()
  })

  it('exibe três botões "Pré-visualizar"', () => {
    render(<E6Export />)
    const btns = screen.getAllByText(/Pré-visualizar/)
    expect(btns.length).toBe(3)
  })

  it('clicar em "Pré-visualizar" do PDF exibe o preview do PDF', () => {
    render(<E6Export />)
    const btns = screen.getAllByText(/Pré-visualizar/)
    fireEvent.click(btns[0]) // PDF é o primeiro
    // Deve mostrar a view PDF com "Capa" na primeira miniatura
    expect(screen.getAllByText(/Capa/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Custódia/).length).toBeGreaterThanOrEqual(1)
  })

  it('preview PDF exibe o disclaimer CA-08', () => {
    render(<E6Export />)
    const btns = screen.getAllByText(/Pré-visualizar/)
    fireEvent.click(btns[0])
    expect(screen.getByText(/CA-08/)).toBeTruthy()
    expect(screen.getByText(/simulação técnico-institucional/i)).toBeTruthy()
  })

  it('clicar em "Pré-visualizar" do GIS exibe metadados WGS84/EPSG:4326', () => {
    render(<E6Export />)
    const btns = screen.getAllByText(/Pré-visualizar/)
    fireEvent.click(btns[1]) // GIS é o segundo
    expect(screen.getByText('WGS84 (simb.)')).toBeTruthy()
    expect(screen.getByText('EPSG:4326 (simb.)')).toBeTruthy()
  })

  it('clicar em "Pré-visualizar" do GIS exibe disclaimer geoespacial simbólico', () => {
    render(<E6Export />)
    const btns = screen.getAllByText(/Pré-visualizar/)
    fireEvent.click(btns[1])
    expect(screen.getByText(/geoespacial simbólico/i)).toBeTruthy()
  })

  it('clicar em "Pré-visualizar" do BIM exibe metadados IFC/BIM', () => {
    render(<E6Export />)
    const btns = screen.getAllByText(/Pré-visualizar/)
    fireEvent.click(btns[2]) // BIM é o terceiro
    expect(screen.getByText('5,0 m (teórico)')).toBeTruthy()
    expect(screen.getByText('coordenadas locais')).toBeTruthy()
  })

  it('clicar em "Pré-visualizar" do BIM exibe disclaimer BIM simbólico', () => {
    render(<E6Export />)
    const btns = screen.getAllByText(/Pré-visualizar/)
    fireEvent.click(btns[2])
    expect(screen.getByText(/BIM simbólico/i)).toBeTruthy()
  })

  it('dentro de um preview, "← Formatos" volta para a lista de cards', () => {
    render(<E6Export />)
    const btns = screen.getAllByText(/Pré-visualizar/)
    fireEvent.click(btns[0])
    // Agora deve estar no preview
    expect(screen.queryByText('Pré-visualizar →')).toBeNull()
    // Clicar em ← Formatos
    fireEvent.click(screen.getByText('← Formatos'))
    // Voltou para os cards
    expect(screen.getAllByText(/Pré-visualizar/).length).toBe(3)
  })

  it('clicar em "← Voltar ao resultado" define store step para e5-result', () => {
    render(<E6Export />)
    fireEvent.click(screen.getByText('← Voltar ao resultado'))
    expect(useSimulator.getState().step).toBe('e5-result')
  })

  it('no estado de cards, não exibe botão "Exportar arquivo"', () => {
    render(<E6Export />)
    expect(screen.queryByText('Exportar arquivo')).toBeNull()
  })

  it('dentro de um preview, exibe botão "Exportar arquivo" habilitado (geração simbólica)', () => {
    render(<E6Export />)
    const btns = screen.getAllByText(/Pré-visualizar/)
    fireEvent.click(btns[0])
    const exportBtn = screen.getByText('Exportar arquivo')
    expect(exportBtn).toBeTruthy()
    expect((exportBtn.closest('button') as HTMLButtonElement).disabled).toBe(false)
  })

  it('clicar em "Exportar arquivo" inicia a geração simbólica e depois mostra o toast', () => {
    vi.useFakeTimers()
    try {
      render(<E6Export />)
      fireEvent.click(screen.getAllByText(/Pré-visualizar/)[0])
      fireEvent.click(screen.getByText('Exportar arquivo'))
      // durante a geração: botão vira "Gerando…"
      expect(screen.getByText('Gerando…')).toBeTruthy()
      act(() => { vi.advanceTimersByTime(1200) })
      // após a geração: toast simbólico
      expect(screen.getByText('Arquivo simbólico gerado')).toBeTruthy()
    } finally {
      vi.useRealTimers()
    }
  })
})
