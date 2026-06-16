import { ActionCard } from '../../../ui'
import { DocSection, DocBlock, Cell } from '../docs-kit'

export default function ActionCardDoc() {
  return (
    <DocSection
      title="ActionCard"
      desc="Tile de ação clicável (lançador) usado no Menu: numeração opcional + título + descrição. Botão acessível com foco visível (WCAG 2.4.7)."
    >
      <DocBlock title="Exemplos" code="<ActionCard/>">
        <Cell label="com numeração">
          <div style={{ width: 340 }}>
            <ActionCard
              index="01"
              title="NOVA OPERAÇÃO"
              description="Configurar solo, área, modalidade e cenário, e iniciar a varredura."
            />
          </div>
        </Cell>
        <Cell label="sem numeração">
          <div style={{ width: 340 }}>
            <ActionCard
              title="REPLAY"
              description="Reproduzir uma sessão de varredura já gravada (GSFS_RECORD)."
            />
          </div>
        </Cell>
      </DocBlock>
    </DocSection>
  )
}
