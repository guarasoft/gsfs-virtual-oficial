import type { Application, Modality, ScenarioId, Soil, Target } from './types'

export interface ScenarioMeta {
  id: ScenarioId
  n: 1 | 2 | 3 | 4 | 5
  name: string
  soil: Soil
  modality: Modality
  area: { x: number; y: number }
  application: Application
  durationSec: 90 | 135
  targets: Target[]
  differentiator: string
}

export const SCENARIOS: ScenarioMeta[] = [
  {
    id: 'c1', n: 1, name: 'Veio de Ouro em Encosta Rochosa',
    soil: 'rochoso', modality: 'manual', area: { x: 10, y: 10 },
    application: 'mineracao', durationSec: 90,
    targets: [
      { type: 'magnetita', label: 'Magnetita', depth: 1.8, note: 'massa acessória' },
      { type: 'ouro', label: 'Ouro (veio)', depth: 3.0, angle: 65, note: 'extensão lateral ~4 m' },
    ],
    differentiator: 'Penetração GPR em meio denso; RTK em terreno irregular',
  },
  {
    id: 'c2', n: 2, name: 'Levantamento de Massa Magnetítica',
    soil: 'arenoso', modality: 'carrinho', area: { x: 20, y: 20 },
    application: 'mineracao', durationSec: 90,
    targets: [
      { type: 'magnetita', label: 'Magnetita A', depth: 1.5, note: 'Centro-NW · 2×2 m' },
      { type: 'magnetita', label: 'Magnetita B', depth: 2.2, note: 'Centro · 3×2 m' },
      { type: 'magnetita', label: 'Magnetita C', depth: 3.1, note: 'SE · 1,5×1,5 m' },
    ],
    differentiator: 'Mapa de calor EMI dominante; varredura sistemática autônoma',
  },
  {
    id: 'c3', n: 3, name: 'Cavidade Subterrânea em Solo Saturado',
    soil: 'umido', modality: 'mochila', area: { x: 15, y: 15 },
    application: 'defesa-civil', durationSec: 90,
    targets: [
      { type: 'vazio', label: 'Cavidade/Vazio', depth: 2.5, note: 'teto; 3×2×1 m' },
      { type: 'agua', label: 'Lençol freático', depth: 4.2, note: 'lâmina contínua' },
    ],
    differentiator: 'GPR identificando vazios; correlação de umidade pela EMI',
  },
  {
    id: 'c4', n: 4, name: 'Operação sob Interferência Eletromagnética',
    soil: 'rochoso', modality: 'carrinho', area: { x: 25, y: 25 },
    application: 'mineracao', durationSec: 90,
    targets: [
      { type: 'ouro', label: 'Ouro (veio)', depth: 3.2, angle: 50, note: 'confirmado por 3 sensores' },
    ],
    differentiator: 'CA-06: zonas de degradação + ruído; fusão descartando falsos-ecos',
  },
  {
    id: 'c5', n: 5, name: 'Inteligência Subsuperficial Integrada — Demonstração GSFS',
    soil: 'transicional', modality: 'mochila', area: { x: 20, y: 20 },
    application: 'institucional', durationSec: 135,
    targets: [
      { type: 'ouro', label: 'Ouro (veio)', depth: 2.0, angle: 40 },
      { type: 'magnetita', label: 'Magnetita', depth: 3.0, note: 'massa pontual' },
      { type: 'vazio', label: 'Cavidade/Vazio', depth: 4.0, note: 'volume estimado' },
      { type: 'agua', label: 'Água (bolsão)', depth: 4.5, note: 'lâmina em bolsão' },
    ],
    differentiator: 'Showcase dos 5 atributos GSFS (painel institucional pela UI)',
  },
]

export function getScenario(id: ScenarioId): ScenarioMeta {
  const s = SCENARIOS.find((x) => x.id === id)
  if (!s) throw new Error(`Cenário desconhecido: ${id}`)
  return s
}
