import type { ReactNode } from 'react'
import { DocSection } from '../docs-kit'

// Frase única repetida em cada exemplo de texto, para comparar a aplicação
// da tipografia entre os estilos.
const FRASE = 'O GSFS revela cabos e dutos sob a superfície.'

function Specimen({ spec, children }: { spec: string; children: ReactNode }) {
  return (
    <div className="type-row">
      <span className="type-spec gsfs-ui-label">{spec}</span>
      <div>{children}</div>
    </div>
  )
}

export default function Tipografia() {
  return (
    <DocSection
      title="Tipografia"
      desc="Cada estilo é demonstrado em coluna, com a mesma frase repetida, para comparar a aplicação. Hierarquia editorial em Exo 2 (marca), camada funcional em Inter (UI, captions, dados — numerais tabulares) e mono JetBrains para strings alinhadas (hash, coordenadas)."
    >
      <h2 className="gsfs-h3 type-group-title">Hierarquia Exo 2 (marca)</h2>
      <div className="type-panel">
        <Specimen spec="H1 · Exo 2 ExtraBold 800 · 48/56"><p className="gsfs-h1" style={{ margin: 0 }}>{FRASE}</p></Specimen>
        <Specimen spec="H2 · Exo 2 Bold 700 · 28/36"><p className="gsfs-h2" style={{ margin: 0 }}>{FRASE}</p></Specimen>
        <Specimen spec="H3 · Exo 2 SemiBold 600 · 18/24"><p className="gsfs-h3" style={{ margin: 0 }}>{FRASE}</p></Specimen>
        <Specimen spec="Body · Exo 2 Regular 400 · 14/22"><p className="gsfs-body" style={{ margin: 0 }}>{FRASE}</p></Specimen>
        <Specimen spec="Caps · Exo 2 Medium 500 · 12/16"><p className="gsfs-caps" style={{ margin: 0 }}>{FRASE}</p></Specimen>
      </div>

      <h2 className="gsfs-h3 type-group-title">Camada funcional Inter</h2>
      <div className="type-panel">
        <Specimen spec="UI · Inter Regular 400 · 14/22"><p className="gsfs-ui" style={{ margin: 0 }}>{FRASE}</p></Specimen>
        <Specimen spec="UI Label · Inter SemiBold 600 · 12 caixa alta"><p className="gsfs-ui-label" style={{ margin: 0 }}>{FRASE}</p></Specimen>
        <Specimen spec="Métrica · Inter SemiBold tabular · leitura de HUD">
          <p className="gsfs-metric" style={{ margin: 0 }}>128,40 m · 07 detecções</p>
        </Specimen>
      </div>

      <h2 className="gsfs-h3 type-group-title">Mono JetBrains (dados)</h2>
      <div className="type-panel">
        <Specimen spec="Data · JetBrains Mono 400 · hash / coordenadas">
          <p className="gsfs-data" style={{ margin: 0 }}>a1b2c3d4e5f6 · -23,5489 -46,6388</p>
        </Specimen>
      </div>

      <h2 className="gsfs-h3 type-group-title">Comparação de famílias (mesma frase)</h2>
      <div className="type-panel">
        <Specimen spec="Primária — Exo 2 · --font-primary">
          <p style={{ margin: 0, fontFamily: 'var(--font-primary)', fontSize: '1.125rem' }}>{FRASE}</p>
        </Specimen>
        <Specimen spec="Secundária — Inter · --font-secondary">
          <p style={{ margin: 0, fontFamily: 'var(--font-secondary)', fontSize: '1.125rem' }}>{FRASE}</p>
        </Specimen>
        <Specimen spec="Mono — JetBrains Mono · --font-mono">
          <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '1.125rem' }}>{FRASE}</p>
        </Specimen>
      </div>
    </DocSection>
  )
}
