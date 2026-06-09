import { Button, type ButtonVariant } from '../../../ui'
import { DocSection, DocBlock, Cell } from '../docs-kit'

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger']

export default function ButtonDoc() {
  return (
    <DocSection
      title="Button"
      desc="Ação clicável. Quatro variantes (primária, secundária, fantasma, perigo) e estados normal, hover, foco e desabilitado. Foco visível conforme WCAG 2.4.7."
    >
      <DocBlock title="Variantes">
        {VARIANTS.map((v) => <Cell key={v} label={v}><Button variant={v}>Ação</Button></Cell>)}
      </DocBlock>
      <DocBlock title="Estados (variante primária)">
        <Cell label="normal"><Button>Ação</Button></Cell>
        <Cell label="desabilitado"><Button disabled>Ação</Button></Cell>
      </DocBlock>
    </DocSection>
  )
}
