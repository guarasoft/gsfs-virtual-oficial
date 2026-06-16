export type ScenarioId = 'c1' | 'c2' | 'c3' | 'c4' | 'c5'
export type Soil = 'rochoso' | 'arenoso' | 'umido' | 'transicional'
export type Modality = 'manual' | 'carrinho' | 'mochila'
export type TargetType = 'ouro' | 'magnetita' | 'vazio' | 'agua'
export type Application = 'mineracao' | 'defesa-civil' | 'institucional'

export interface Target {
  type: TargetType
  label: string
  depth: number        // metros (≤ 5 — Teto de Métricas)
  angle?: number       // graus (apenas veios)
  note?: string
}

export interface MissionConfig {
  soil: Soil
  modality: Modality
  area: { x: number; y: number }   // metros
}

export interface MissionRecord {
  recordId: string                 // GSFS-RECORD-AAAA-MM-DD-NNN
  scenarioId: ScenarioId
  startedAt: string
  durationSec: number
  targets: Target[]
  volumeM3: number
  hash: string                     // SHA-256 simbólico (64 hex)
}
