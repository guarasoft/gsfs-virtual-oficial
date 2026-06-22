import { SensorPanel, RtkStatus, HudMetric, StatusBar, SensorGraph, type SensorKind, type SensorState, type RtkState } from '../../../ui'
import { DocSection, DocBlock, Cell } from '../docs-kit'

const KINDS: SensorKind[] = ['gpr', 'emi', 'imu', 'gnss']
const STATES: SensorState[] = ['on', 'off', 'err']
const RTK: RtkState[] = ['fix', 'float', 'nofix']
const GRAPH_LABEL: Record<SensorKind, string> = {
  gpr: 'GPR · radargrama', emi: 'EMI · resposta', imu: 'IMU · roll/pitch', gnss: 'GNSS · trajetória',
}

export default function SensorDoc() {
  return (
    <DocSection
      title="Sensores, RTK, Métricas e Status"
      desc="Componentes do HUD do simulador: painel por sensor (GPR/EMI/IMU/GNSS) com estado, status GNSS-RTK, leitura métrica grande (tabular) e a barra de status consolidada."
    >
      <DocBlock title="Painel de sensor (cada sensor, ativo)" code="SensorPanel">
        {KINDS.map((k) => <Cell key={k} label={k.toUpperCase()}><SensorPanel kind={k} state="on" /></Cell>)}
      </DocBlock>
      <DocBlock title="Painel de sensor — estados (GPR)" code="SensorPanel">
        {STATES.map((s) => <Cell key={s} label={s}><SensorPanel kind="gpr" state={s} /></Cell>)}
      </DocBlock>
      <DocBlock title="Visualização por sensor (varredura)" code="SensorGraph">
        {KINDS.map((k) => (
          <Cell key={k} label={GRAPH_LABEL[k]}>
            <div style={{ width: 220, height: 120, border: '1px solid var(--color-border)', borderRadius: 4, overflow: 'hidden' }}>
              <SensorGraph kind={k} progress={55} detections={1} signatures={[{ depth: 3, kind: 'hyperbola' }]} emiPeaks={[0.5]} motion="rough" />
            </div>
          </Cell>
        ))}
      </DocBlock>
      <DocBlock title="Sensor compacto — pílula da faixa do HUD" code="SensorPanel compact">
        {KINDS.map((k) => <Cell key={k} label={k.toUpperCase()}><SensorPanel kind={k} state="on" compact /></Cell>)}
        <Cell label="erro"><SensorPanel kind="gnss" state="err" compact /></Cell>
      </DocBlock>
      <DocBlock title="Status RTK" code="RtkStatus">
        {RTK.map((s) => <Cell key={s} label={s}><RtkStatus state={s} /></Cell>)}
      </DocBlock>
      <DocBlock title="Métrica de HUD — destaque (lg)" code="HudMetric">
        <Cell label="profundidade"><HudMetric label="Profundidade" value="1.82" unit="m" /></Cell>
        <Cell label="detecções"><HudMetric label="Detecções" value="07" /></Cell>
      </DocBlock>
      <DocBlock title="Métrica de HUD — faixa compacta (sm)" code='HudMetric size="sm"'>
        <Cell label="relógio"><HudMetric size="sm" label="Relógio" value="14:33:14" /></Cell>
        <Cell label="bateria"><HudMetric size="sm" label="Bateria" value="91%" /></Cell>
        <Cell label="temp."><HudMetric size="sm" label="Temp." value="36°C" /></Cell>
      </DocBlock>
      <DocBlock title="Barra de status (consolidada)" code="StatusBar">
        <StatusBar battery={86} batteryState="ok" temp={42} tempState="normal" rtk="fix" />
      </DocBlock>
    </DocSection>
  )
}
