import type { CSSProperties } from 'react'
import { Button, EdgeTab, type ButtonVariant } from '../../../ui'
import { DocSection, DocBlock, Cell } from '../docs-kit'

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger']

// Moldura que simula a área de uma tela, para a aba lateral se ancorar na borda.
const screenFrame: CSSProperties = {
  position: 'relative',
  height: 150,
  width: '100%',
  minWidth: 220,
  background: 'var(--color-bg)',
  border: '1px solid var(--color-border-subtle)',
  borderRadius: 8,
  overflow: 'hidden',
  display: 'grid',
  placeItems: 'center',
}

export default function ButtonDoc() {
  return (
    <DocSection
      title="Button"
      desc="Ação clicável. Quatro variantes (primária, secundária, fantasma, perigo) e estados normal, hover, foco e desabilitado. Inclui as abas laterais de navegação contextual das telas do simulador. Foco visível conforme WCAG 2.4.7."
    >
      <DocBlock title="Variantes">
        {VARIANTS.map((v) => <Cell key={v} label={v}><Button variant={v}>Ação</Button></Cell>)}
      </DocBlock>
      <DocBlock title="Estados (variante primária)">
        <Cell label="normal"><Button>Ação</Button></Cell>
        <Cell label="desabilitado"><Button disabled>Ação</Button></Cell>
      </DocBlock>
      <DocBlock title="Abas laterais (navegação contextual nas telas)">
        <Cell label="Esquerda — Voltar (tela de Replay)">
          <div style={screenFrame}>
            <span className="gsfs-ui-label" style={{ color: 'var(--color-text-muted)' }}>área da tela</span>
            <EdgeTab side="left" title="Voltar à tela anterior">VOLTAR</EdgeTab>
          </div>
        </Cell>
        <Cell label="Direita — Ações (tela de Varredura)">
          <div style={screenFrame}>
            <span className="gsfs-ui-label" style={{ color: 'var(--color-text-muted)' }}>área da tela</span>
            <EdgeTab side="right" title="Abrir menu de ações">AÇÕES</EdgeTab>
          </div>
        </Cell>
      </DocBlock>
    </DocSection>
  )
}
