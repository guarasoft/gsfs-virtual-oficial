import { useState } from 'react'
import { Field, Input, Select, Textarea, Toggle, type SelectOption } from '../../../ui'
import { DocSection, DocBlock, Cell } from '../docs-kit'

const CENARIOS: SelectOption[] = [
  { value: 'c1', label: 'Cenário 1 — Veio de ouro' },
  { value: 'c4', label: 'Cenário 4 — Interferência' },
  { value: 'c5', label: 'Cenário 5 — Showcase institucional' },
]

export default function FieldsDoc() {
  const [scen, setScen] = useState('c4')
  const [gpr, setGpr] = useState(true)

  return (
    <DocSection
      title="Campos"
      desc="Entradas de formulário do simulador, no padrão usado pelo Setup de Missão (E3): campo rotulado (Field) com associação acessível, texto, número, seleção (listbox estilizado), área de texto, estado de erro e interruptor de sensor. Todo controle tem rótulo associado e foco visível; o erro é texto + ícone (não apenas cor)."
    >
      <DocBlock title="Campo rotulado (Field)">
        <Field label="Identificador da missão" hint="Texto livre">
          <Input placeholder="Ex.: GSFS-2026-014" />
        </Field>
        <Field label="Eixo X (m)" hint="Mínimo 1 m">
          <Input type="number" min={1} defaultValue={20} />
        </Field>
        <Field label="Cenário">
          <Select options={CENARIOS} value={scen} onChange={setScen} />
        </Field>
        <Field label="Observações">
          <Textarea placeholder="Notas da operação…" />
        </Field>
      </DocBlock>

      <DocBlock title="Erro & desabilitado">
        <Field label="Identificador da missão" error="Campo obrigatório.">
          <Input defaultValue="" placeholder="Ex.: GSFS-2026-014" />
        </Field>
        <Field label="Cenário (bloqueado)">
          <Select options={CENARIOS} value="c4" onChange={() => {}} disabled />
        </Field>
        <Field label="Profundidade (m)">
          <Input disabled defaultValue="—" />
        </Field>
      </DocBlock>

      <DocBlock title="Interruptor (sensor on/off)">
        <Cell label={gpr ? 'ligado' : 'desligado'}>
          <div className="gsfs-switch-row">
            <Toggle checked={gpr} onChange={setGpr} label="Sensor GPR" />
            <span className="gsfs-field-grouplabel">Sensor GPR</span>
          </div>
        </Cell>
        <Cell label="desabilitado">
          <div className="gsfs-switch-row">
            <Toggle checked={false} disabled label="Sensor EMI (indisponível)" />
            <span className="gsfs-field-grouplabel" style={{ color: 'var(--color-text-muted)' }}>Sensor EMI</span>
          </div>
        </Cell>
      </DocBlock>
    </DocSection>
  )
}
