import { BatteryGauge, TempGauge } from '../../../ui'
import { DocSection, DocBlock, Cell } from '../docs-kit'

export default function GaugesDoc() {
  return (
    <DocSection
      title="Bateria & Temperatura"
      desc="Leituras de HUD com cor por faixa: bateria (ok/atenção/crítica) e temperatura (normal/elevada/crítica)."
    >
      <DocBlock title="Medidor de bateria" code="BatteryGauge">
        <Cell label="ok"><BatteryGauge percent={86} state="ok" /></Cell>
        <Cell label="atenção"><BatteryGauge percent={32} state="warn" /></Cell>
        <Cell label="crítica"><BatteryGauge percent={9} state="critical" /></Cell>
      </DocBlock>
      <DocBlock title="Medidor de temperatura" code="TempGauge">
        <Cell label="normal"><TempGauge celsius={38} state="normal" /></Cell>
        <Cell label="elevada"><TempGauge celsius={64} state="elevated" /></Cell>
        <Cell label="crítica"><TempGauge celsius={82} state="critical" /></Cell>
      </DocBlock>
    </DocSection>
  )
}
