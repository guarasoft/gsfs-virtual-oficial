import { useState } from 'react'
import { Table, Tabs, Progress, Tooltip, Button, type Column, type TabItem } from '../../../ui'
import { DocSection, DocBlock, Cell } from '../docs-kit'

const COLS: Column[] = [
  { key: 'id', header: 'Detecção' }, { key: 'tipo', header: 'Tipo' },
  { key: 'conf', header: 'Confiança' }, { key: 'estado', header: 'Estado' },
]
const ROWS = [
  { id: 'D-01', tipo: 'Cabo', conf: '92%', estado: 'Confirmado' },
  { id: 'D-02', tipo: 'Duto', conf: '61%', estado: 'Suspeita' },
  { id: 'D-03', tipo: 'Ruído', conf: '18%', estado: 'Descartado' },
]
const TABS: TabItem[] = [{ id: 'auto', label: 'Automático' }, { id: 'manual', label: 'Manual' }]

export default function DataDoc() {
  const [tab, setTab] = useState('auto')
  return (
    <DocSection
      title="Table, Tabs, Progress e Tooltip"
      desc="Componentes de dados e navegação: tabela com numerais tabulares, abas/segmented, barra de progresso (varredura) e dica de contexto."
    >
      <DocBlock title="Table"><div style={{ width: '100%' }}><Table columns={COLS} rows={ROWS} /></div></DocBlock>
      <DocBlock title="Tabs / Segmented"><Cell label={tab}><Tabs items={TABS} active={tab} onChange={setTab} /></Cell></DocBlock>
      <DocBlock title="Progress"><Cell label="68% (varredura)"><Progress value={68} label="Progresso da varredura" /></Cell></DocBlock>
      <DocBlock title="Tooltip"><Cell label="passe o mouse"><Tooltip text="Ground Penetrating Radar"><Button variant="secondary">GPR</Button></Tooltip></Cell></DocBlock>
    </DocSection>
  )
}
