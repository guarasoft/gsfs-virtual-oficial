import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { ActionCard } from './ActionCard'

afterEach(cleanup)

describe('ActionCard', () => {
  it('renderiza índice, título e descrição', () => {
    render(<ActionCard index="01" title="NOVA OPERAÇÃO" description="Configurar e iniciar." />)
    expect(screen.getByText('01')).toBeTruthy()
    expect(screen.getByText('NOVA OPERAÇÃO')).toBeTruthy()
    expect(screen.getByText('Configurar e iniciar.')).toBeTruthy()
  })

  it('é um botão e dispara onClick', () => {
    const onClick = vi.fn()
    render(<ActionCard title="REPLAY" onClick={onClick} />)
    fireEvent.click(screen.getByRole('button', { name: /REPLAY/i }))
    expect(onClick).toHaveBeenCalled()
  })
})
