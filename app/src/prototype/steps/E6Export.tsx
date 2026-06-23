import { useState, useRef, useEffect } from 'react'
import { Button, Card } from '../../ui'
import { Screen } from '../shell/Screen'
import { useSimulator } from '../store'
import './E6Export.css'

// E6 — Exportação (hi-fi). Formatos: PDF / GIS / BIM, todos preview-only.
// D-007: PDF de exportação (simbólico). D-008: GIS e BIM como pacotes simbólicos preview-only.
// Disclaimer obrigatório: CA-08 (sem afirmação técnica fechada / simbólico).

type FormatId = 'pdf' | 'gis' | 'bim'

const RECORD_ID = 'GSFS-RECORD-2026-06-03-142'
const MISSION = 'CENÁRIO C1 · Veio de Ouro · 03/06/2026 14:34'

const PDF_PAGES = [
  { n: 1, name: 'Capa', content: 'Capa institucional · título · identificação' },
  { n: 2, name: 'Sumário', content: 'Métricas-chave · status dos sensores' },
  { n: 3, name: 'Mapa', content: 'Planta · trajetória · marcadores' },
  { n: 4, name: 'Alvos', content: 'Tabela de alvos · vista 3D' },
  { n: 5, name: 'Custódia', content: 'Timeline · hash · disclaimer' },
]

const GIS_TREE = `gsfs_varredura_…142.zip
├── varredura_trajetoria.shp
├── varredura_trajetoria.dbf
├── varredura_trajetoria.shx
├── alvos_detectados.shp
├── alvos_detectados.dbf
├── area_varrida.shp
├── metadata.xml
└── README.txt`

const BIM_TREE = `gsfs_subsolo_…142.zip
├── modelo_subsolo.ifc
├── alvos_subsolo.ifc
├── trajetoria_aquisicao.ifc
├── metadata.json
└── README.txt`

const DISCLAIMER_CA08 =
  'Documento gerado em ambiente de simulação técnico-institucional. Valores são representações ' +
  'simbólicas e plausíveis, não medições validadas (PRD CA-08).'

// Disclaimer por formato — exibido numa barra única no rodapé do conteúdo
const DISCLAIMER: Record<FormatId, string> = {
  pdf: DISCLAIMER_CA08,
  gis:
    'Pacote geoespacial simbólico. Coordenadas e datums são simulados para fins demonstrativos; ' +
    'integração com GIS de produção depende da implementação definitiva.',
  bim:
    'Pacote BIM simbólico. Elementos IFC são modelos paramétricos simulados para fins demonstrativos ' +
    'de integração; não representam medição estrutural validada.',
}

const FORMATS: { id: FormatId; tag: string; tone: 'info' | 'success' | 'warning'; name: string; desc: string }[] = [
  {
    id: 'pdf',
    tag: 'PDF',
    tone: 'info',
    name: 'Relatório Técnico GSFS',
    desc: 'Relatório institucional — A4, 5 páginas (capa, sumário, mapa, alvos, cadeia de custódia).',
  },
  {
    id: 'gis',
    tag: 'GIS',
    tone: 'success',
    name: 'Pacote Geoespacial',
    desc: 'Integração geoespacial — shapefiles (trajetória, alvos, área) + metadados XML.',
  },
  {
    id: 'bim',
    tag: 'BIM',
    tone: 'warning',
    name: 'Pacote Construtivo',
    desc: 'Integração construtiva — modelo IFC do subsolo + alvos paramétricos.',
  },
]

export function E6Export() {
  const goTo = useSimulator((s) => s.goTo)
  const [active, setActive] = useState<FormatId | null>(null)
  const [exporting, setExporting] = useState(false)
  const [toast, setToast] = useState(false)
  const timers = useRef<number[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const handleBack = () => {
    if (active !== null) {
      setActive(null)
    } else {
      goTo('e5-result')
    }
  }

  // Geração SIMBÓLICA (D-008 / Layout §3): animação de geração + toast
  // "Arquivo simbólico gerado" — sem download real / binário.
  const handleExport = () => {
    if (exporting) return
    setToast(false)
    setExporting(true)
    timers.current.push(
      window.setTimeout(() => {
        setExporting(false)
        setToast(true)
        timers.current.push(window.setTimeout(() => setToast(false), 3200))
      }, 1200),
    )
  }

  return (
    <Screen
      title="EXPORTAÇÃO"
      subtitle="GROUND SCANNING FUSION SYSTEM"
      meta={[`SESSÃO: ${RECORD_ID}`, MISSION, 'PILAR 4 · EXPORTAÇÃO']}
    >
      <div className="e6-body">
        {/* ---- Cabeçalho da seção ---- */}
        <div className="e6-section-head">
          <span className="e6-section-title">
            {active === null
              ? 'Escolha um formato de exportação'
              : active === 'pdf'
              ? 'PDF · Relatório Técnico GSFS (A4, 5 páginas)'
              : active === 'gis'
              ? 'GIS · Pacote Geoespacial (preview)'
              : 'BIM · Pacote Construtivo (preview)'}
          </span>
          <span className="e6-preview-badge" aria-label="preview simbólico — sem download real">
            preview simbólico — sem download real (D-008)
          </span>
        </div>

        {/* ---- Vista: cards de seleção ---- */}
        {active === null && (
          <div className="e6-cards" data-testid="e6-format-cards">
            {FORMATS.map((f) => (
              <div className="e6-card" key={f.id}>
                <Card>
                  <div className="e6-card-inner">
                    <div className={`e6-card-icon e6-card-icon--${f.tone}`} aria-hidden="true">{f.tag}</div>
                    <span className="e6-card-name">{f.name}</span>
                    <p className="e6-card-desc">{f.desc}</p>
                    <Button variant="secondary" onClick={() => setActive(f.id)}>
                      Pré-visualizar →
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* ---- Vista: PDF preview ---- */}
        {active === 'pdf' && (
          <div className="e6-preview" data-testid="e6-pdf-preview">
            <div className="e6-pdf-pages">
              {PDF_PAGES.map((p) => (
                <div className="e6-pdf-page" key={p.n}>
                  <div className="e6-pdf-thumb">
                    <div className="e6-pdf-watermark">SIMULAÇÃO TÉCNICA</div>
                    <div className="e6-pdf-page-title">{p.name}</div>
                    <div className="e6-pdf-line" />
                    <div className="e6-pdf-line" />
                    <div className="e6-pdf-line e6-pdf-line--short" />
                  </div>
                  <div className="e6-pdf-caption">
                    Pág {p.n} · {p.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---- Vista: GIS preview ---- */}
        {active === 'gis' && (
          <div className="e6-preview" data-testid="e6-gis-preview">
            <div className="e6-pkg">
              <div className="e6-pkg-tree">
                <pre>{GIS_TREE}</pre>
              </div>
              <div className="e6-pkg-meta">
                <div className="e6-meta-label">METADADOS</div>
                <div className="e6-meta-row">
                  <span>Datum</span>
                  <strong>WGS84 (simb.)</strong>
                </div>
                <div className="e6-meta-row">
                  <span>CRS</span>
                  <strong>EPSG:4326 (simb.)</strong>
                </div>
                <div className="e6-meta-row">
                  <span>Missão</span>
                  <strong>…-142</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---- Vista: BIM preview ---- */}
        {active === 'bim' && (
          <div className="e6-preview" data-testid="e6-bim-preview">
            <div className="e6-pkg">
              <div className="e6-pkg-tree">
                <pre>{BIM_TREE}</pre>
              </div>
              <div className="e6-pkg-meta">
                <div className="e6-meta-label">METADADOS</div>
                <div className="e6-meta-row">
                  <span>Profundidade base</span>
                  <strong>5,0 m (teórico)</strong>
                </div>
                <div className="e6-meta-row">
                  <span>Volume total</span>
                  <strong>2,4 m³</strong>
                </div>
                <div className="e6-meta-row">
                  <span>Sistema</span>
                  <strong>coordenadas locais</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---- Disclaimer (rodapé do conteúdo, acima da barra de ações) ---- */}
        {active !== null && (
          <div className="e6-disclaimer" role="note">{DISCLAIMER[active]}</div>
        )}

        {/* ---- Barra de ações ---- */}
        <div className="e6-actions">
          <Button variant="secondary" onClick={handleBack}>
            {active !== null ? '← Formatos' : '← Voltar ao resultado'}
          </Button>
          {active !== null && (
            <Button
              variant="primary"
              onClick={handleExport}
              disabled={exporting}
              title="Geração simbólica — sem download real (D-008)"
            >
              {exporting ? (
                <>
                  <span className="e6-spinner" aria-hidden="true" />
                  Gerando…
                </>
              ) : (
                'Exportar arquivo'
              )}
            </Button>
          )}
        </div>

        {/* Toast de geração simbólica (sem arquivo real) */}
        {toast && (
          <div className="e6-toast" role="status">
            <span className="e6-toast-check" aria-hidden="true">✓</span>
            Arquivo simbólico gerado
          </div>
        )}
      </div>
    </Screen>
  )
}
