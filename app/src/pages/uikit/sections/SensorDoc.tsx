import { SensorPanel, RtkStatus, HudMetric, StatusBar, type SensorKind, type SensorState, type RtkState } from '../../../ui'
import { DocSection, DocBlock, Cell } from '../docs-kit'

const KINDS: SensorKind[] = ['gpr', 'emi', 'imu', 'gnss']
const STATES: SensorState[] = ['on', 'off', 'err']
const RTK: RtkState[] = ['fix', 'float', 'nofix']

export default function SensorDoc() {
  return (
    <DocSection
      title="Sensores, RTK, Métricas e Status"
      desc="Componentes do HUD do simulador: painel por sensor (GPR/EMI/IMU/GNSS) com estado, status GNSS-RTK, leitura métrica grande (tabular) e a barra de status consolidada."
    >
      <DocBlock title="SensorPanel (cada sensor, estado ativo)">
        {KINDS.map((k) => <Cell key={k} label={k.toUpperCase()}><SensorPanel kind={k} state="on" /></Cell>)}
      </DocBlock>
      <DocBlock title="SensorPanel — estados (GPR)">
        {STATES.map((s) => <Cell key={s} label={s}><SensorPanel kind="gpr" state={s} /></Cell>)}
      </DocBlock>
      <DocBlock title="RtkStatus">
        {RTK.map((s) => <Cell key={s} label={s}><RtkStatus state={s} /></Cell>)}
      </DocBlock>
      <DocBlock title="HudMetric">
        <Cell label="profundidade"><HudMetric label="Profundidade" value="1.82" unit="m" /></Cell>
        <Cell label="detecções"><HudMetric label="Detecções" value="07" /></Cell>
      </DocBlock>
      <DocBlock title="StatusBar (consolidada)">
        <StatusBar battery={86} batteryState="ok" temp={42} tempState="normal" rtk="fix" />
      </DocBlock>
    </DocSection>
  )
}
