import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { SensorGraph } from './SensorGraph'

afterEach(cleanup)

describe('SensorGraph', () => {
  it('expõe rótulo acessível por tipo de sensor', () => {
    render(<SensorGraph kind="gpr" progress={50} />)
    expect(screen.getByRole('img', { name: /Radargrama GPR/i })).toBeTruthy()
  })

  it('GPR só mostra a hipérbole quando há detecção', () => {
    const { container, rerender } = render(<SensorGraph kind="gpr" progress={50} detections={0} />)
    expect(container.querySelector('.gpr-hyperbola')).toBeNull()
    rerender(<SensorGraph kind="gpr" progress={50} detections={1} />)
    expect(container.querySelector('.gpr-hyperbola')).not.toBeNull()
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

  it('EMI renderiza a matriz de células', () => {
    const { container } = render(<SensorGraph kind="emi" progress={40} detections={1} />)
    expect(container.querySelectorAll('.emi-cell').length).toBeGreaterThan(0)
  })
})
