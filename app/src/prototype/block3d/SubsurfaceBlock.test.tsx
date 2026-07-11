import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { SubsurfaceBlock } from './SubsurfaceBlock'
import { SCENARIOS } from '../data/scenarios'

// jsdom não tem WebGL nem matchMedia — o componente deve degradar para o
// fallback (mesmo visual do placeholder antigo da E5) sem lançar erro.
afterEach(() => cleanup())

describe('SubsurfaceBlock — fallback sem WebGL (jsdom)', () => {
  for (const s of SCENARIOS) {
    it(`renderiza o fallback do ${s.id} com os marcadores do cenário`, () => {
      render(<SubsurfaceBlock scenario={s} />)
      expect(screen.getByText(/Bloco 3D do subsolo/)).toBeTruthy()
      // caption lista todos os alvos do cenário
      const caption = screen.getByText(/vídeo interpretativo \(Guarasoft\)/)
      for (const t of s.targets) {
        expect(caption.textContent).toContain(t.label)
      }
    })
  }

  it('não renderiza coordenadas tipo-UTM (governança Geo-Cartucho, feedback 2026-07-10)', () => {
    for (const s of SCENARIOS) {
      const { container, unmount } = render(<SubsurfaceBlock scenario={s} />)
      expect(container.textContent).not.toMatch(/\d{3}\.\d{3}\s*[EN]/)
      unmount()
    }
  })
})
