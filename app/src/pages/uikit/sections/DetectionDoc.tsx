import { DetectionBadge, ConfidenceMeter, type DetectionState } from '../../../ui'
import { DocSection, DocBlock, Cell } from '../docs-kit'

const STATES: DetectionState[] = ['confirmed', 'suspect', 'discarded']

export default function DetectionDoc() {
  return (
    <DocSection
      title="Detecção & Confiança"
      desc="Estado de uma detecção (confirmado/suspeita/descartado, conforme Roteiro Técnico) e medidor de confiança com faixa de cor por nível."
    >
      <DocBlock title="DetectionBadge">
        {STATES.map((s) => <Cell key={s} label={s}><DetectionBadge state={s} /></Cell>)}
      </DocBlock>
      <DocBlock title="ConfidenceMeter">
        <Cell label="alta"><ConfidenceMeter value={92} level="high" /></Cell>
        <Cell label="média"><ConfidenceMeter value={61} level="medium" /></Cell>
        <Cell label="baixa"><ConfidenceMeter value={18} level="low" /></Cell>
      </DocBlock>
    </DocSection>
  )
}
