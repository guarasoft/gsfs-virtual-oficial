import { useState } from 'react'
import { Input, Select, Textarea, Toggle } from '../../../ui'
import { DocSection, DocBlock, Cell } from '../docs-kit'

export default function FieldsDoc() {
  const [on, setOn] = useState(true)
  return (
    <DocSection
      title="Campos"
      desc="Entradas de formulário do simulador: texto, seleção, área de texto e interruptor (usado para ligar/desligar sensores). Estados normal, hover, foco, erro e desabilitado."
    >
      <DocBlock title="Input">
        <Cell label="normal"><Input placeholder="Identificador da missão" /></Cell>
        <Cell label="erro"><Input error defaultValue="valor inválido" /></Cell>
        <Cell label="desabilitado"><Input disabled placeholder="Desabilitado" /></Cell>
      </DocBlock>
      <DocBlock title="Select">
        <Cell label="cenários">
          <Select defaultValue="c4">
            <option value="c1">Cenário 1</option>
            <option value="c4">Cenário 4</option>
            <option value="c5">Cenário 5</option>
          </Select>
        </Cell>
      </DocBlock>
      <DocBlock title="Textarea">
        <Cell label="observações"><Textarea placeholder="Notas da operação…" /></Cell>
      </DocBlock>
      <DocBlock title="Toggle (sensor on/off)">
        <Cell label={on ? 'ligado' : 'desligado'}><Toggle checked={on} onChange={setOn} /></Cell>
        <Cell label="desabilitado"><Toggle checked={false} disabled /></Cell>
      </DocBlock>
    </DocSection>
  )
}
