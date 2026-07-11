import { create } from 'zustand'
import type { MissionConfig, MissionRecord, ScenarioId } from './data/types'

export type StepId =
  | 'e1-boot' | 'e2-menu' | 'e3-setup'
  | 'e4-scan' | 'e5-result' | 'e6-export' | 'e7-replay'

const DEFAULT_CONFIG: MissionConfig = {
  soil: 'rochoso',
  modality: 'manual',
  area: { x: 10, y: 10 },
}

export interface SimulatorState {
  step: StepId
  selectedScenarioId: ScenarioId | null
  config: MissionConfig
  record: MissionRecord | null
  /** cenário a reproduzir direto ao entrar na E7 (null = abrir a lista) */
  replayTarget: ScenarioId | null
  /** origem da exportação: missão recém-concluída (E5, data/ID reais) ou
      gravação do arquivo (E7, data/ID do GSFS_RECORD) */
  exportSource: 'mission' | 'archive'
  goTo: (step: StepId) => void
  selectScenario: (id: ScenarioId) => void
  startMission: () => void
  abort: () => void
  newOperation: () => void
  /** E5 → reproduz direto o cenário atual no Replay */
  replayCurrent: () => void
  /** Menu → abre a lista de gravações no Replay */
  openReplayList: () => void
  /** E5 → exporta a missão recém-concluída */
  exportCurrent: () => void
  /** E7 → exporta uma gravação do arquivo */
  exportRecord: (id: ScenarioId) => void
  reset: () => void
}

export const useSimulator = create<SimulatorState>((set) => ({
  step: 'e1-boot',
  selectedScenarioId: null,
  config: DEFAULT_CONFIG,
  record: null,
  replayTarget: null,
  exportSource: 'mission',
  goTo: (step) => set({ step }),
  selectScenario: (id) => set({ selectedScenarioId: id }),
  startMission: () => set({ step: 'e4-scan' }),
  abort: () => set({ step: 'e2-menu', record: null }),                       // D-015
  newOperation: () => set({ step: 'e2-menu', selectedScenarioId: null, record: null, replayTarget: null, exportSource: 'mission' }),
  replayCurrent: () => set((s) => ({ step: 'e7-replay', replayTarget: s.selectedScenarioId })),
  openReplayList: () => set({ step: 'e7-replay', replayTarget: null }),
  exportCurrent: () => set({ step: 'e6-export', exportSource: 'mission' }),
  exportRecord: (id) => set({ step: 'e6-export', selectedScenarioId: id, exportSource: 'archive' }),
  reset: () => set({ step: 'e1-boot', selectedScenarioId: null, record: null, config: DEFAULT_CONFIG, replayTarget: null, exportSource: 'mission' }),
}))
