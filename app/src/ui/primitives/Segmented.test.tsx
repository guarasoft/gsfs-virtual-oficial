import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { Segmented } from './Segmented'

const OPTS = [
  { value: 'a', label: 'Alfa' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gama' },
]

afterEach(cleanup)

describe('Segmented', () => {
  it('renderiza todas as opções', () => {
    render(<Segmented options={OPTS} value="a" />)
    expect(screen.getByText('Alfa')).toBeTruthy()
    expect(screen.getByText('Beta')).toBeTruthy()
    expect(screen.getByText('Gama')).toBeTruthy()
  })

  it('marca o ativo via aria-pressed (valor único)', () => {
    render(<Segmented options={OPTS} value="b" />)
    expect(screen.getByText('Beta').getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByText('Alfa').getAttribute('aria-pressed')).toBe('false')
  })

  it('suporta múltiplos ativos (array)', () => {
    render(<Segmented options={OPTS} value={['a', 'c']} />)
    expect(screen.getByText('Alfa').getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByText('Gama').getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByText('Beta').getAttribute('aria-pressed')).toBe('false')
  })

  it('clique chama onChange com o value', () => {
    const onChange = vi.fn()
    render(<Segmented options={OPTS} value="a" onChange={onChange} />)
    fireEvent.click(screen.getByText('Gama'))
    expect(onChange).toHaveBeenCalledWith('c')
  })

  it('disabled não dispara onChange', () => {
    const onChange = vi.fn()
    render(<Segmented options={OPTS} value="a" onChange={onChange} disabled />)
    fireEvent.click(screen.getByText('Beta'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
