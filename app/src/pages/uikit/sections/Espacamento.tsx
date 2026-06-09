import { DocSection, DocBlock, Cell, TokenTag } from '../docs-kit'

const SPACE = [['1', '4px'], ['2', '8px'], ['3', '12px'], ['4', '16px'], ['6', '24px'], ['8', '32px'], ['12', '48px']] as const
const RADIUS = [['sm', '4px'], ['md', '8px'], ['lg', '12px'], ['pill', '999px']] as const
const SURFACES = [['Fundo', '--color-bg'], ['Superfície', '--color-bg-surface'], ['Elevada', '--color-bg-raised']] as const

export default function Espacamento() {
  return (
    <DocSection
      title="Espaçamento & Elevação"
      desc="Escala de espaçamento, raios de canto e camadas de superfície usadas em todo o produto."
    >
      <DocBlock title="Espaçamento">
        {SPACE.map(([k, v]) => (
          <Cell key={k} label={v}>
            <div style={{ width: v, height: v, background: 'var(--color-primary)', borderRadius: 2 }} />
            <TokenTag>--space-{k}</TokenTag>
          </Cell>
        ))}
      </DocBlock>
      <DocBlock title="Raios">
        {RADIUS.map(([k, v]) => (
          <Cell key={k} label={v}>
            <div style={{ width: 72, height: 48, background: 'var(--color-bg-raised)', border: '1px solid var(--color-border-strong)', borderRadius: v }} />
            <TokenTag>--radius-{k}</TokenTag>
          </Cell>
        ))}
      </DocBlock>
      <DocBlock title="Superfícies / elevação">
        {SURFACES.map(([n, t]) => (
          <Cell key={t} label={n}>
            <div style={{ width: 120, height: 64, background: `var(${t})`, border: '1px solid var(--color-border)', borderRadius: 8 }} />
            <TokenTag>{t}</TokenTag>
          </Cell>
        ))}
      </DocBlock>
    </DocSection>
  )
}
