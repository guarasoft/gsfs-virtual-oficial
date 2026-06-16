import { GnssMap } from '../../../ui'
import { DocSection, DocBlock, Cell } from '../docs-kit'

export default function GnssDoc() {
  return (
    <DocSection
      title="Mapa GNSS"
      desc="Mapa de posição GNSS simbólico: grade lat/long, marcador com jitter controlado, anel de precisão pulsante (fixação centimétrica simbólica), bússola, coordenadas e selo FIX · satélites. Conforme PRD §5.3/§2.4 e o Teto de Métricas (coordenadas simbólicas, FIX qualitativo — nunca precisão em cm)."
    >
      <DocBlock title="Posição atual" code="<GnssMap/>">
        <Cell label="FIX · 12 satélites">
          <div style={{ width: 380, height: 220 }}>
            <GnssMap lat="−23,5489°" lng="−46,6388°" satellites={12} fix="FIX" />
          </div>
        </Cell>
      </DocBlock>
    </DocSection>
  )
}
