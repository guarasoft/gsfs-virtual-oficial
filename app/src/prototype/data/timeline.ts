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

// ---------------------------------------------------------------------------
// C1 — Veio de Ouro em Encosta Rochosa (90s)
// Detecções: Magnetita (t=35), Ouro/veio (t=60)
// ---------------------------------------------------------------------------
const c1Events: TimelineEvent[] = [
  // F2 começa em t=12
  { t: 12, kind: 'phase', label: 'F2 — Varredura principal' },

  // Detecção 1 — Magnetita (t=35)
  { t: 33, kind: 'subliminal', targetRef: 'Magnetita', label: 'Magnetita', sensors: { emi: 'pico discreto começa a surgir' } },
  { t: 35, kind: 'detection',  targetRef: 'Magnetita', label: 'Magnetita', meta: '1,8 m', sensors: { emi: 'pico definido', gnss: 'marcador [M] plotado' } },
  { t: 38, kind: 'refinement', targetRef: 'Magnetita', label: 'Magnetita', meta: '1,8 m' },

  // Detecção 2 — Ouro (veio) (t=60)
  { t: 58, kind: 'subliminal', targetRef: 'Ouro (veio)', label: 'Veio de Ouro', sensors: { gpr: 'hipérbole de reflexão começando a se formar' } },
  { t: 60, kind: 'detection',  targetRef: 'Ouro (veio)', label: 'Veio de Ouro', meta: '3,0 m · 65°', sensors: { gpr: 'hipérbole definida', gnss: 'marcador [Au] plotado' } },
  { t: 63, kind: 'refinement', targetRef: 'Ouro (veio)', label: 'Veio de Ouro', meta: '3,0 m · 65° · extensão ~4 m' },

  // F3 — Consolidação (t=80-90)
  { t: 85, kind: 'consolidation', label: 'F3 — GSFS_RECORD · hash SHA-256 gerado' },
]

// ---------------------------------------------------------------------------
// C2 — Levantamento de Massa Magnetítica (90s)
// Detecções: Magnetita A (t=25), Magnetita B (t=45), Magnetita C (t=68)
// ---------------------------------------------------------------------------
const c2Events: TimelineEvent[] = [
  // F2 começa em t=12
  { t: 12, kind: 'phase', label: 'F2 — Varredura principal' },

  // Detecção 1 — Magnetita A (t=25)
  { t: 23, kind: 'subliminal', targetRef: 'Magnetita A', label: 'Magnetita A', sensors: { emi: 'pico se intensificando' } },
  { t: 25, kind: 'detection',  targetRef: 'Magnetita A', label: 'Magnetita A', meta: '1,5 m · Centro-NW · 2×2 m', sensors: { emi: 'pico claro', gnss: 'marcador [M-A] plotado' } },
  { t: 28, kind: 'refinement', targetRef: 'Magnetita A', label: 'Magnetita A', meta: '1,5 m' },

  // Detecção 2 — Magnetita B (t=45)
  { t: 43, kind: 'subliminal', targetRef: 'Magnetita B', label: 'Magnetita B', sensors: { emi: 'pico B intensificando' } },
  { t: 45, kind: 'detection',  targetRef: 'Magnetita B', label: 'Magnetita B', meta: '2,2 m · Centro · 3×2 m', sensors: { emi: 'pico B claro', gnss: 'marcador [M-B] plotado' } },
  { t: 48, kind: 'refinement', targetRef: 'Magnetita B', label: 'Magnetita B', meta: '2,2 m' },

  // Detecção 3 — Magnetita C (t=68)
  { t: 66, kind: 'subliminal', targetRef: 'Magnetita C', label: 'Magnetita C', sensors: { gpr: 'eco profundo definindo', emi: 'pico C intensificando' } },
  { t: 68, kind: 'detection',  targetRef: 'Magnetita C', label: 'Magnetita C', meta: '3,1 m · SE · 1,5×1,5 m', sensors: { gpr: 'eco profundo claro', emi: 'pico C claro', gnss: 'marcador [M-C] plotado' } },
  { t: 71, kind: 'refinement', targetRef: 'Magnetita C', label: 'Magnetita C', meta: '3,1 m' },

  // F3 — Consolidação (t=80-90)
  { t: 85, kind: 'consolidation', label: 'F3 — volume agregado calculado · GSFS_RECORD · hash SHA-256' },
]

// ---------------------------------------------------------------------------
// C3 — Cavidade Subterrânea em Solo Saturado (90s)
// Detecções: Cavidade/Vazio (t=42), Lençol freático (t=75)
// ---------------------------------------------------------------------------
const c3Events: TimelineEvent[] = [
  // F2 começa em t=12
  { t: 12, kind: 'phase', label: 'F2 — Varredura principal' },

  // Detecção 1 — Cavidade/Vazio (t=42)
  { t: 40, kind: 'subliminal', targetRef: 'Cavidade/Vazio', label: 'Cavidade/Vazio', sensors: { gpr: 'hipérbole clássica de vazio começando', emi: 'contraste forte sobre a região' } },
  { t: 42, kind: 'detection',  targetRef: 'Cavidade/Vazio', label: 'Cavidade/Vazio', meta: '2,5 m · 3×2×1 m', sensors: { gpr: 'hipérbole definida na fatia de tempo', gnss: 'marcador [V] plotado' } },
  { t: 45, kind: 'refinement', targetRef: 'Cavidade/Vazio', label: 'Cavidade/Vazio', meta: '2,5 m · dimensão estimada 3×2×1 m' },

  // Detecção 2 — Lençol freático (t=75)
  { t: 73, kind: 'subliminal', targetRef: 'Lençol freático', label: 'Lençol freático', sensors: { gpr: 'linha horizontal contínua a ~4,2 m', emi: 'EMI sobe ainda mais sobre a zona' } },
  { t: 75, kind: 'detection',  targetRef: 'Lençol freático', label: 'Lençol freático', meta: '4,2 m · lâmina contínua', sensors: { gpr: 'linha horizontal confirmada', gnss: 'marcador [H2O] plotado' } },
  { t: 78, kind: 'refinement', targetRef: 'Lençol freático', label: 'Lençol freático', meta: '4,2 m · correlação EMI ↔ Lençol' },

  // F3 — Consolidação (t=80-90)
  { t: 85, kind: 'consolidation', label: 'F3 — alerta geotécnico · GSFS_RECORD · hash SHA-256' },
]

// ---------------------------------------------------------------------------
// C4 — Operação sob Interferência Eletromagnética (CA-06) (90s)
// Zonas degradação: t=20 (NW), t=50 (SE)
// Falsos-ecos: t=28→32, t=45→48
// Detecção confirmada: Ouro (veio) t=75 (fusão 3 sensores)
// ---------------------------------------------------------------------------
const c4Events: TimelineEvent[] = [
  // F2 começa em t=12
  { t: 12, kind: 'phase', label: 'F2 — Varredura principal · ruído alto ativo' },

  // Zona de degradação 1 — NW (t=20)
  { t: 20, kind: 'degradation', label: 'Zona de Degradação NW', meta: 'faixa NW · BAIXA CONFIANÇA · sombreado ativo' },

  // Falso-eco 1 (t=28) → Descarte (t=32)
  { t: 28, kind: 'false-echo', label: 'Falso-eco 1 — SUSPEITA · MAGNETITA?', sensors: { emi: 'pico isolado destacado', gnss: 'marcador amarelo [?]' }, meta: 'fusão: avaliando' },
  { t: 32, kind: 'discard',    label: 'Descarte — Falso-eco 1', sensors: { emi: 'pico reclassificado como ruído', gnss: 'marcador riscado' }, meta: 'DESCARTADO · RUÍDO' },

  // Falso-eco 2 (t=45) → Descarte (t=48)
  { t: 45, kind: 'false-echo', label: 'Falso-eco 2 — SUSPEITA · MAGNETITA?', sensors: { emi: 'pico isolado destacado', gnss: 'marcador amarelo [?]' }, meta: 'fusão: avaliando' },
  { t: 48, kind: 'discard',    label: 'Descarte — Falso-eco 2', sensors: { emi: 'pico reclassificado como ruído', gnss: 'marcador riscado' }, meta: 'DESCARTADO · RUÍDO' },

  // Zona de degradação 2 — SE (t=50)
  { t: 50, kind: 'degradation', label: 'Zona de Degradação SE', meta: 'faixa SE · BAIXA CONFIANÇA · sombreado ativo' },

  // Detecção confirmada — Ouro (veio) (t=75), validado por 3 sensores via fusão
  { t: 73, kind: 'subliminal', targetRef: 'Ouro (veio)', label: 'Ouro real', sensors: { gpr: 'hipérbole definida (ângulo ~50°)', emi: 'EMI responde positivamente — validação cruzada' }, meta: 'confiança subindo · fusão estabilizando' },
  { t: 75, kind: 'detection',  targetRef: 'Ouro (veio)', label: 'Ouro (veio)', meta: '3,2 m · 50° · CONFIRMADO por 3 sensores', sensors: { gpr: 'confirmação visual reforçada', emi: 'confirmação cruzada', gnss: 'marcador verde [Au · CONFIRMADO]' } },
  { t: 75, kind: 'fusion',     targetRef: 'Ouro (veio)', label: 'Fusão multimodal — CONFIRMADO (3 sensores)', meta: 'GPR + EMI + GNSS convergentes' },
  { t: 78, kind: 'refinement', targetRef: 'Ouro (veio)', label: 'Ouro (veio)', meta: '3,2 m · 50°' },

  // F3 — Consolidação (t=80-90)
  { t: 85, kind: 'consolidation', label: 'F3 — índice de resiliência · 2 falsos-positivos descartados · GSFS_RECORD · hash SHA-256' },
]

// ---------------------------------------------------------------------------
// C5 — Inteligência Subsuperficial Integrada — Demonstração GSFS (135s)
// Detecções: Ouro (t=40), Magnetita (t=60), Cavidade/Vazio (t=85), Água/bolsão (t=110)
// ---------------------------------------------------------------------------
const c5Events: TimelineEvent[] = [
  // F2 começa em t=15
  { t: 15, kind: 'phase', label: 'F2 — Varredura principal · pipeline de 4 fluxos visível' },

  // Detecção 1 — Ouro (veio) (t=40)
  { t: 38, kind: 'subliminal', targetRef: 'Ouro (veio)', label: 'Ouro (veio)', sensors: { gpr: 'hipérbole rasa emergindo', emi: 'pico discreto' } },
  { t: 40, kind: 'detection',  targetRef: 'Ouro (veio)', label: 'Ouro (veio)', meta: '2,0 m · 40°', sensors: { gpr: 'hipérbole definida', gnss: 'marcador [Au] plotado' } },
  { t: 43, kind: 'refinement', targetRef: 'Ouro (veio)', label: 'Ouro (veio)', meta: '2,0 m · 40° · alvo raso' },

  // Detecção 2 — Magnetita (t=60)
  { t: 58, kind: 'subliminal', targetRef: 'Magnetita', label: 'Magnetita', sensors: { emi: 'pico forte emergindo' } },
  { t: 60, kind: 'detection',  targetRef: 'Magnetita', label: 'Magnetita', meta: '3,0 m · massa pontual', sensors: { emi: 'pico claro', gnss: 'marcador [M] plotado' } },
  { t: 63, kind: 'refinement', targetRef: 'Magnetita', label: 'Magnetita', meta: '3,0 m' },

  // Detecção 3 — Cavidade/Vazio (t=85)
  { t: 83, kind: 'subliminal', targetRef: 'Cavidade/Vazio', label: 'Cavidade/Vazio', sensors: { gpr: 'hipérbole de vazio definida em ~4,0 m' } },
  { t: 85, kind: 'detection',  targetRef: 'Cavidade/Vazio', label: 'Cavidade/Vazio', meta: '4,0 m · volume estimado', sensors: { gpr: 'hipérbole confirmada', gnss: 'marcador [V] plotado' } },
  { t: 88, kind: 'refinement', targetRef: 'Cavidade/Vazio', label: 'Cavidade/Vazio', meta: '4,0 m' },

  // Detecção 4 — Água (bolsão) (t=110)
  { t: 108, kind: 'subliminal', targetRef: 'Água (bolsão)', label: 'Água (bolsão)', sensors: { gpr: 'linha horizontal contínua a ~4,5 m', emi: 'condutividade sobe na zona do bolsão' } },
  { t: 110, kind: 'detection',  targetRef: 'Água (bolsão)', label: 'Água (bolsão)', meta: '4,5 m · lâmina em bolsão', sensors: { gpr: 'linha confirmada', emi: 'EMI confirma', gnss: 'marcador [H2O] plotado' } },
  // Painel GSFS — 5 atributos — fusão consolidada (começa junto com a 4ª detecção)
  { t: 110, kind: 'fusion', label: 'Painel GSFS — Fusão Multimodal (5 atributos iniciando)', meta: '4 streams convergindo para camada única' },
  { t: 113, kind: 'refinement', targetRef: 'Água (bolsão)', label: 'Água (bolsão)', meta: '4,5 m' },

  // F3 — Consolidação (t=125-135)
  { t: 125, kind: 'consolidation', label: 'F3 — GSFS_RECORD premium · 4 alvos · hash SHA-256 · cadeia de custódia selada' },
]

// ---------------------------------------------------------------------------
// TIMELINES — mapa principal (exportado)
// ---------------------------------------------------------------------------
export const TIMELINES: Record<ScenarioId, ScenarioTimeline> = {
  c1: { scenarioId: 'c1', events: c1Events },
  c2: { scenarioId: 'c2', events: c2Events },
  c3: { scenarioId: 'c3', events: c3Events },
  c4: { scenarioId: 'c4', events: c4Events },
  c5: { scenarioId: 'c5', events: c5Events },
}

// ---------------------------------------------------------------------------
// Accessor
// ---------------------------------------------------------------------------
export function getTimeline(id: ScenarioId): ScenarioTimeline {
  return TIMELINES[id]
}
