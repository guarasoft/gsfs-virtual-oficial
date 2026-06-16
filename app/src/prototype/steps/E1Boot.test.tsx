import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { E1Boot } from './E1Boot'
import { useSimulator } from '../store'

beforeEach(() => useSimulator.getState().reset())

describe('E1 Boot', () => {
  it('mostra a splash com a marca no início (elapsed 0)', () => {
    render(<E1Boot />)
    expect(screen.getByText('GSFS')).toBeTruthy()
    expect(screen.getByText('GROUND SCANNING FUSION SYSTEM')).toBeTruthy()
  })
})
