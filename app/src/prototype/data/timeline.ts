import type { ScenarioId } from './types'

export type SensorId = 'gpr' | 'emi' | 'imu' | 'gnss'

export type EventKind =
  | 'phase' | 'subliminal' | 'detection' | 'refinement'   // 3 micro-tempos do Roteiro
  | 'false-echo' | 'discard' | 'degradation' | 'fusion'   // CA-06 (C4)
  | 'consolidation'                                        // F3: hash / GSFS_RECORD

export interface TimelineEvent {
  t: number                                     // segundos
  kind: EventKind
  targetRef?: string                            // liga a Target.label
  sensors?: Partial<Record<SensorId, string>>   // nota/estado por sensor no beat
  label?: string
  meta?: string
}

export interface ScenarioTimeline {
  scenarioId: ScenarioId
  events: TimelineEvent[]
}

// Conteúdo beat-a-beat é preenchido no sub-projeto do motor de varredura.
// Neste ciclo: estrutura pronta, events vazios.
export const TIMELINES: Record<ScenarioId, ScenarioTimeline> = {
  c1: { scenarioId: 'c1', events: [] },
  c2: { scenarioId: 'c2', events: [] },
  c3: { scenarioId: 'c3', events: [] },
  c4: { scenarioId: 'c4', events: [] },
  c5: { scenarioId: 'c5', events: [] },
}
