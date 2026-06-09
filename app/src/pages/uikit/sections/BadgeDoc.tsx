import { Badge, Chip, Card, Panel, type BadgeTone } from '../../../ui'
import { DocSection, DocBlock, Cell } from '../docs-kit'

const TONES: BadgeTone[] = ['neutral', 'info', 'success', 'warning', 'danger']

export default function BadgeDoc() {
  return (
    <DocSection
      title="Badge, Chip, Card e Panel"
      desc="Rótulos de status (badge retangular / chip arredondado) e superfícies de conteúdo (card neutro / panel elevado com cabeçalho)."
    >
      <DocBlock title="Badge">
        {TONES.map((t) => <Cell key={t} label={t}><Badge tone={t}>{t}</Badge></Cell>)}
      </DocBlock>
      <DocBlock title="Chip">
        {TONES.map((t) => <Cell key={t} label={t}><Chip tone={t}>{t}</Chip></Cell>)}
      </DocBlock>
      <DocBlock title="Superfícies">
        <Cell label="Card"><Card><p className="gsfs-ui" style={{ margin: 0 }}>Conteúdo em card neutro.</p></Card></Cell>
        <Cell label="Panel"><Panel title="Sensor GPR"><p className="gsfs-ui" style={{ margin: 0 }}>Corpo do painel elevado.</p></Panel></Cell>
      </DocBlock>
    </DocSection>
  )
}
