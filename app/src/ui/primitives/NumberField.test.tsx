import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { NumberField } from './NumberField'

afterEach(cleanup)

describe('NumberField', () => {
  it('renderiza o valor e a unidade', () => {
    render(<NumberField value={20} unit="m" aria-label="Eixo X" />)
    expect((screen.getByLabelText('Eixo X') as HTMLInputElement).value).toBe('20')
    expect(screen.getByText('m')).toBeTruthy()
  })

  it('mudança chama onValueChange com número', () => {
    const onValueChange = vi.fn()
    render(<NumberField value={20} onValueChange={onValueChange} aria-label="Eixo X" />)
    fireEvent.change(screen.getByLabelText('Eixo X'), { target: { value: '15' } })
    expect(onValueChange).toHaveBeenCalledWith(15)
  })
})
