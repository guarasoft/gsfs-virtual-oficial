import { DocSection, DocBlock, Cell, TokenTag } from '../docs-kit'

const PANGRAM = 'O GSFS detecta cabos e dutos sob a superfície.'

export default function Tipografia() {
  return (
    <DocSection
      title="Tipografia"
      desc="Hierarquia editorial em Exo 2 (marca), camada funcional em Inter (UI, captions, dados — numerais tabulares) e mono JetBrains para strings alinhadas (hash, coordenadas)."
    >
      <DocBlock title="Hierarquia Exo 2 (marca)">
        <Cell label="H1 · ExtraBold 48/56"><p className="gsfs-h1" style={{ margin: 0 }}>Headline</p></Cell>
        <Cell label="H2 · Bold 28/36"><p className="gsfs-h2" style={{ margin: 0 }}>Subhead</p></Cell>
        <Cell label="H3 · SemiBold 18/24"><p className="gsfs-h3" style={{ margin: 0 }}>Section</p></Cell>
        <Cell label="Body · Regular 14/22"><p className="gsfs-body" style={{ margin: 0 }}>{PANGRAM}</p></Cell>
        <Cell label="Caps · Medium 12/16"><p className="gsfs-caps" style={{ margin: 0 }}>Label técnico</p></Cell>
      </DocBlock>
      <DocBlock title="Camada funcional Inter">
        <Cell label="UI · Regular 14"><p className="gsfs-ui" style={{ margin: 0 }}>{PANGRAM}</p></Cell>
        <Cell label="UI Label · 12 caixa alta"><p className="gsfs-ui-label" style={{ margin: 0 }}>Status do sensor</p></Cell>
        <Cell label="Métrica · tabular 32"><p className="gsfs-metric" style={{ margin: 0 }}>128.40</p></Cell>
      </DocBlock>
      <DocBlock title="Mono JetBrains (dados)">
        <Cell label="Hash / coordenadas"><p className="gsfs-data" style={{ margin: 0 }}>a1b2c3d4e5f6 · -23.5489, -46.6388</p></Cell>
      </DocBlock>
      <DocBlock title="Famílias">
        <Cell><TokenTag>--font-primary</TokenTag></Cell>
        <Cell><TokenTag>--font-secondary</TokenTag></Cell>
        <Cell><TokenTag>--font-mono</TokenTag></Cell>
      </DocBlock>
    </DocSection>
  )
}
