import { useState } from 'react'
import { Button, Field, Select } from '../../ui'
import { Screen } from '../shell/Screen'
import { useSimulator } from '../store'
import { SCENARIOS, getScenario } from '../data/scenarios'
import type { ScenarioId, Soil, Modality, Application } from '../data/types'
import './E3Setup.css'

// ---- display-label maps ------------------------------------------------

const APPLICATION_LABEL: Record<Application, string> = {
  mineracao: 'Prospecção mineral',
  'defesa-civil': 'Defesa Civil / Geotecnia',
  institucional: 'Demonstração institucional GSFS',
}

const SOLOS: { key: Soil; label: string }[] = [
  { key: 'rochoso', label: 'Rochoso' },
  { key: 'arenoso', label: 'Arenoso' },
  { key: 'umido', label: 'Úmido' },
]

const MODALIDADES: { key: Modality; label: string }[] = [
  { key: 'manual', label: 'Manual' },
  { key: 'carrinho', label: 'Carrinho Autônomo' },
  { key: 'mochila', label: 'Mochila' },
]

function soilDisplayKeys(soil: Soil): Soil[] {
  // transicional = Arenoso + Úmido (C5)
  if (soil === 'transicional') return ['arenoso', 'umido']
  return [soil]
}

function soilNote(soil: Soil, scenarioId: ScenarioId): string | null {
  if (soil === 'transicional') return 'Arenoso úmido · transicional'
  // C4 special note
  if (scenarioId === 'c4') return 'Rochoso · com ruído eletromagnético'
  return null
}

const AREA_PRESETS: [number, number][] = [[10, 10], [15, 15], [20, 20], [25, 25]]

// ---- Segmented control -------------------------------------------------

function SegControl({
  options,
  activeKeys,
  locked,
  onSelect,
}: {
  options: { key: string; label: string }[]
  activeKeys: string[]
  locked?: boolean
  onSelect?: (key: string) => void
}) {
  return (
    <div className="e3-seg" role="group">
      {options.map(({ key, label }) => {
        const isActive = activeKeys.includes(key)
        return (
          <button
            key={key}
            type="button"
            disabled={locked}
            className={`e3-seg-opt${isActive ? ' is-active' : ''}`}
            aria-pressed={isActive}
            onClick={() => !locked && onSelect?.(key)}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

// ---- Select options ----------------------------------------------------

const SCENARIO_OPTIONS = [
  { value: 'manual', label: 'Nova configuração (manual)' },
  ...SCENARIOS.map((s) => ({
    value: s.id,
    label: `Cenário ${s.n} — ${s.name}`,
  })),
]

// ---- Main component ----------------------------------------------------

export function E3Setup() {
  const selectScenario = useSimulator((s) => s.selectScenario)
  const goTo = useSimulator((s) => s.goTo)
  const startMission = useSimulator((s) => s.startMission)
  const selectedScenarioId = useSimulator((s) => s.selectedScenarioId)

  // local state: which select option is chosen (may be 'manual' or a ScenarioId)
  const [selValue, setSelValue] = useState<string>(selectedScenarioId ?? 'manual')

  // manual-mode local config (demonstrative)
  const [mSolo, setMSolo] = useState<Soil>('rochoso')
  const [mModal, setMModal] = useState<Modality>('manual')
  const [aX, setAX] = useState(20)
  const [aY, setAY] = useState(20)

  const isManual = selValue === 'manual'

  // Derive display values from selected scenario or manual state
  const scenario = isManual ? null : getScenario(selValue as ScenarioId)

  const activeSoilKeys: Soil[] = isManual
    ? [mSolo]
    : soilDisplayKeys(scenario!.soil)

  const activeModalKeys: Modality[] = isManual ? [mModal] : [scenario!.modality]

  const note = isManual || !scenario ? null : soilNote(scenario.soil, scenario.id)

  const areaDisplay = isManual
    ? null
    : `${scenario!.area.x} × ${scenario!.area.y} m`

  function handleScenarioChange(val: string) {
    setSelValue(val)
    if (val !== 'manual') {
      selectScenario(val as ScenarioId)
    }
  }

  function handleSoloSelect(key: string) {
    if (!isManual) return
    setMSolo(key as Soil)
  }

  function handleModalSelect(key: string) {
    if (!isManual) return
    setMModal(key as Modality)
  }

  function handlePreset(x: number, y: number) {
    setAX(x)
    setAY(y)
  }

  return (
    <Screen
      title="CONFIGURAÇÃO DE MISSÃO"
      subtitle="SETUP DE OPERAÇÃO"
      meta={['VERSÃO: GSFS 1.0', 'MODO: SETUP', 'GNSS: FIX']}
    >
      <div className="e3-setup">

        {/* ---- Two-column body (desde o topo) ---- */}
        <div className="e3-cols">

          {/* LEFT: Cenário / Solo / Modalidade / Área — tudo via Field */}
          <div className="e3-col e3-col-form">
            <Field label="Cenário">
              <Select
                options={SCENARIO_OPTIONS}
                value={selValue}
                onChange={handleScenarioChange}
              />
            </Field>

            <Field label="Tipo de solo" hint={note ?? undefined}>
              <SegControl
                options={SOLOS}
                activeKeys={activeSoilKeys}
                locked={!isManual}
                onSelect={handleSoloSelect}
              />
            </Field>

            <Field label="Modalidade">
              <SegControl
                options={MODALIDADES}
                activeKeys={activeModalKeys}
                locked={!isManual}
                onSelect={handleModalSelect}
              />
            </Field>

            <Field label="Área de varredura">
              {isManual ? (
                <div className="e3-area-hybrid">
                  <div className="e3-area-inputs">
                    <input
                      className="e3-area-input"
                      type="number"
                      min={1}
                      value={aX}
                      onChange={(e) => setAX(Number(e.target.value))}
                      aria-label="Eixo X (m)"
                    />
                    <span className="e3-area-sep">×</span>
                    <input
                      className="e3-area-input"
                      type="number"
                      min={1}
                      value={aY}
                      onChange={(e) => setAY(Number(e.target.value))}
                      aria-label="Eixo Y (m)"
                    />
                    <span className="e3-area-unit">m</span>
                  </div>
                  <div className="e3-area-presets">
                    {AREA_PRESETS.map(([x, y]) => (
                      <button
                        key={`${x}x${y}`}
                        type="button"
                        className="e3-area-preset"
                        onClick={() => handlePreset(x, y)}
                        aria-label={`Preset ${x} × ${y} m`}
                      >
                        {x}×{y} m
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="e3-readout" aria-label={`Área: ${areaDisplay}`}>
                  {areaDisplay}
                </div>
              )}
            </Field>
          </div>

          {/* RIGHT: Contexto + mapa */}
          <div className="e3-col">
            <div className="e3-ctx-panel">
              <div className="e3-ctx-header">Contexto da operação</div>
              <div className="e3-ctx-rows">
                <div className="e3-ctx-row">
                  <span className="e3-ctx-row-label">Data</span>
                  <strong className="e3-ctx-row-value">03/06/2026</strong>
                </div>
                <div className="e3-ctx-row">
                  <span className="e3-ctx-row-label">Hora</span>
                  <strong className="e3-ctx-row-value">14:34:31</strong>
                </div>
                <div className="e3-ctx-row">
                  <span className="e3-ctx-row-label">Coordenadas (GNSS)</span>
                  <strong className="e3-ctx-row-value">−23,5489° / −46,6388°</strong>
                </div>
                <div className="e3-ctx-row">
                  <span className="e3-ctx-row-label">Posicionamento</span>
                  <strong className="e3-ctx-row-value e3-ctx-row-value--primary">
                    FIX · 12 satélites
                  </strong>
                </div>
                {!isManual && scenario && (
                  <div className="e3-ctx-row">
                    <span className="e3-ctx-row-label">Operação</span>
                    <strong className="e3-ctx-row-value">{APPLICATION_LABEL[scenario.application]}</strong>
                  </div>
                )}
              </div>
              <div className="e3-map-placeholder" aria-label="Mapa de posição GNSS">
                mapa · posição atual (GNSS)
              </div>
            </div>
          </div>
        </div>

        {/* ---- Actions bar ---- */}
        <div className="e3-actions-bar">
          <Button variant="ghost" onClick={() => goTo('e2-menu')}>
            ← Voltar ao menu
          </Button>
          <Button
            disabled={isManual}
            title={isManual ? 'Selecione um cenário para iniciar' : undefined}
            onClick={() => !isManual && startMission()}
          >
            Iniciar varredura →
          </Button>
        </div>
      </div>
    </Screen>
  )
}
