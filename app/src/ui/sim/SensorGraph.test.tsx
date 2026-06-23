import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { SensorGraph } from './SensorGraph'

afterEach(cleanup)

describe('SensorGraph', () => {
  it('expõe rótulo acessível por tipo de sensor', () => {
    render(<SensorGraph kind="gpr" progress={50} />)
    expect(screen.getByRole('img', { name: /Radargrama GPR/i })).toBeTruthy()
  })

  it('GPR só mostra a hipérbole quando há assinatura de GPR', () => {
    const { container, rerender } = render(<SensorGraph kind="gpr" progress={50} signatures={[]} />)
    expect(container.querySelector('.gpr-hyperbola')).toBeNull()
    rerender(<SensorGraph kind="gpr" progress={50} signatures={[{ depth: 3, kind: 'hyperbola' }]} />)
    expect(container.querySelector('.gpr-hyperbola')).not.toBeNull()
  })

  it('GPR plota uma hipérbole por assinatura e linha para lâmina d’água', () => {
    const { container } = render(
      <SensorGraph kind="gpr" progress={80} signatures={[
        { depth: 2, kind: 'hyperbola' },
        { depth: 4, kind: 'hyperbola' },
        { depth: 4.5, kind: 'line' },
      ]} />,
    )
    expect(container.querySelectorAll('.gpr-hyperbola').length).toBe(2)
    expect(container.querySelectorAll('.gpr-hline').length).toBe(1)
  })

  it('GNSS plota um marcador rotulado por achado já alcançado pelo progresso', () => {
    const { container, getByText } = render(
      <SensorGraph kind="gnss" progress={100} markers={[{ at: 0.3, label: 'Au' }, { at: 0.6, label: 'H2O' }]} />,
    )
    expect(container.querySelectorAll('.gnss-marker').length).toBe(2)
    expect(getByText('Au')).toBeTruthy()
    expect(getByText('H2O')).toBeTruthy()
  })

  it('GNSS não plota marcador de achado ainda não alcançado pelo progresso', () => {
    // progress 5% → nenhum achado (em 0.3/0.6) foi atingido ainda
    const { container } = render(<SensorGraph kind="gnss" progress={5} markers={[{ at: 0.3, label: 'M' }, { at: 0.6, label: 'V' }]} />)
    expect(container.querySelectorAll('.gnss-marker').length).toBe(0)
  })

  it('EMI renderiza a curva de resposta de condutividade', () => {
    const { container } = render(<SensorGraph kind="emi" progress={40} emiPeaks={[0.3]} />)
    expect(container.querySelector('.emi-line')).not.toBeNull()
  })
})
