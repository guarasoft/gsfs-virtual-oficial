import { useState } from 'react'
import { Segmented, NumberField } from '../../../ui'
import { DocSection, DocBlock, Cell } from '../docs-kit'

const SOLO = [
  { value: 'rochoso', label: 'Rochoso' },
  { value: 'arenoso', label: 'Arenoso' },
  { value: 'umido', label: 'Úmido' },
]

export default function ControlsDoc() {
  const [solo, setSolo] = useState('rochoso')
  const [x, setX] = useState(20)

  return (
    <DocSection
      title="Segmented & NumberField"
      desc="Controles de formulário do simulador. O Segmented ocupa toda a largura do container (opções de largura igual); suporta seleção única, múltiplos ativos e modo desabilitado/demonstrativo. O NumberField é um campo numérico com unidade opcional."
    >
      <DocBlock title="Segmented" code="<Segmented/>">
        <Cell label="seleção única (interativo)">
          <div style={{ width: 340 }}>
            <Segmented options={SOLO} value={solo} onChange={setSolo} />
          </div>
        </Cell>
        <Cell label="múltiplos ativos (ex.: solo transicional)">
          <div style={{ width: 340 }}>
            <Segmented options={SOLO} value={['arenoso', 'umido']} />
          </div>
        </Cell>
        <Cell label="desabilitado (demonstrativo)">
          <div style={{ width: 340 }}>
            <Segmented options={SOLO} value="rochoso" disabled />
          </div>
        </Cell>
      </DocBlock>

      <DocBlock title="NumberField" code="<NumberField/>">
        <Cell label="com unidade">
          <NumberField value={x} onValueChange={setX} unit="m" aria-label="Eixo X" />
        </Cell>
        <Cell label="composição (área X × Y)">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <NumberField value={x} onValueChange={setX} aria-label="Eixo X" />
            <span style={{ color: 'var(--color-text-muted)' }}>×</span>
            <NumberField value={x} onValueChange={setX} unit="m" aria-label="Eixo Y" />
          </div>
        </Cell>
      </DocBlock>
    </DocSection>
  )
}
