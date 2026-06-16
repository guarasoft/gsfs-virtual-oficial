import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { GnssMap } from './GnssMap'

afterEach(cleanup)

describe('GnssMap', () => {
  it('exibe coordenadas, fix e satélites', () => {
    render(<GnssMap lat="−23,5489°" lng="−46,6388°" satellites={12} fix="FIX" />)
    expect(screen.getByText('−23,5489°')).toBeTruthy()
    expect(screen.getByText('−46,6388°')).toBeTruthy()
    expect(screen.getByText(/FIX · 12 sat/)).toBeTruthy()
  })

  it('tem rótulo acessível de posição GNSS', () => {
    render(<GnssMap lat="−23,5489°" lng="−46,6388°" satellites={12} />)
    expect(screen.getByRole('img', { name: /posição GNSS/i })).toBeTruthy()
  })
})
