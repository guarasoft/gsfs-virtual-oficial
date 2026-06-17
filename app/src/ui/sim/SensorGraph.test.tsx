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

  it('GNSS plota um marcador por detecção alcançada pelo progresso', () => {
    // progress alto o suficiente para revelar as 2 primeiras frações (0.22, 0.46)
    const { container } = render(<SensorGraph kind="gnss" progress={100} detections={2} />)
    expect(container.querySelectorAll('.gnss-marker').length).toBe(2)
  })

  it('GNSS não plota marcador ainda não alcançado pelo progresso', () => {
    // progress baixo: nenhuma fração de marcador (≥0.22) foi atingida
    const { container } = render(<SensorGraph kind="gnss" progress={5} detections={3} />)
    expect(container.querySelectorAll('.gnss-marker').length).toBe(0)
  })

  it('EMI renderiza a curva de resposta de condutividade', () => {
    const { container } = render(<SensorGraph kind="emi" progress={40} detections={1} />)
    expect(container.querySelector('.emi-line')).not.toBeNull()
  })
})
