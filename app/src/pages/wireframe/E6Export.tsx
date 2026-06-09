import { useState } from 'react'
import { Link } from 'react-router-dom'
import ReviewBar from '../../components/ReviewBar'
import WfScreen from '../../components/WfScreen'

// E6 — Exportação (Layout_Exportacao). Tela de formatos (PDF/GIS/BIM) +
// previews simbólicos. Sem download real (D-008). Disclaimer em todos (CA-08).

type View = 'cards' | 'pdf' | 'gis' | 'bim'

const MISSION = 'CENÁRIO C1 · Veio de Ouro · 03/06/2026 14:34 · GSFS-RECORD-2026-06-03-142'

const pdfPages = [
  { n: 1, name: 'Capa', content: 'Capa institucional · título · identificação' },
  { n: 2, name: 'Sumário', content: 'Métricas-chave · status dos sensores' },
  { n: 3, name: 'Mapa', content: 'Planta · trajetória · marcadores' },
  { n: 4, name: 'Alvos', content: 'Tabela de alvos · vista 3D' },
  { n: 5, name: 'Custódia', content: 'Timeline · hash · disclaimer' },
]

const gisTree = `gsfs_varredura_…142.zip
├── varredura_trajetoria.shp
├── varredura_trajetoria.dbf
├── varredura_trajetoria.shx
├── alvos_detectados.shp
├── alvos_detectados.dbf
├── area_varrida.shp
├── metadata.xml
└── README.txt`

const bimTree = `gsfs_subsolo_…142.zip
├── modelo_subsolo.ifc
├── alvos_subsolo.ifc
├── trajetoria_aquisicao.ifc
├── metadata.json
└── README.txt`

function Toolbar({ onBack }: { onBack: () => void }) {
  return (
    <div className="wf-export-toolbar">
      <button className="wf-btn wf-btn-ghost" onClick={onBack}>← Formatos</button>
      <span className="wf-export-note">preview simbólico — sem download real (D-008)</span>
      <button className="wf-btn" title="Gera o arquivo simbólico (sem binário real)">
        Exportar arquivo
      </button>
    </div>
  )
}

export default function E6Export() {
  const [view, setView] = useState<View>('cards')

  const cards = [
    { id: 'pdf' as View, tag: 'PDF', name: 'Relatório Técnico GSFS', desc: 'Relatório institucional — A4, 5 páginas (capa, sumário, mapa, alvos, cadeia de custódia).' },
    { id: 'gis' as View, tag: 'GIS', name: 'Pacote Geoespacial', desc: 'Integração geoespacial — shapefiles (trajetória, alvos, área) + metadados.' },
    { id: 'bim' as View, tag: 'BIM', name: 'Pacote Construtivo', desc: 'Integração construtiva — modelo IFC do subsolo + alvos paramétricos.' },
  ]

  return (
    <>
      <ReviewBar crumb="Wireframes · E6 — Exportação">
        <div className="wf-phasebar">
          <span>Vista:</span>
          {(['cards', 'pdf', 'gis', 'bim'] as const).map((v) => (
            <button key={v} className={view === v ? 'active' : ''} onClick={() => setView(v)}>
              {v === 'cards' ? 'Formatos' : v.toUpperCase()}
            </button>
          ))}
        </div>
      </ReviewBar>

      <WfScreen
        title="EXPORTAÇÃO DA SESSÃO"
        subtitle="GROUND SCANNING FUSION SYSTEM"
        meta={['CENÁRIO: C1 · Veio de Ouro', 'SESSÃO: GSFS-RECORD-…142', 'PILAR 4 · EXPORTAÇÃO']}
        footerRight="EXPORTAÇÃO — WIREFRAME (BAIXA FIDELIDADE)"
      >
        <div className="wf-export">
          <div className="wf-export-head">
            <span className="h">
              {view === 'cards' ? 'Escolha um formato de exportação' :
               view === 'pdf' ? 'PDF · Relatório Técnico GSFS (A4, 5 páginas)' :
               view === 'gis' ? 'GIS · Pacote Geoespacial (preview)' :
               'BIM · Pacote Construtivo (preview)'}
            </span>
            <span className="sub">{MISSION}</span>
          </div>

          {view === 'cards' && (
            <>
              <div className="wf-export-cards">
                {cards.map((c) => (
                  <div className="wf-export-card" key={c.id}>
                    <div className="icon">[ {c.tag} ]</div>
                    <div className="name">{c.name}</div>
                    <div className="desc">{c.desc}</div>
                    <button className="wf-btn" onClick={() => setView(c.id)}>Pré-visualizar →</button>
                  </div>
                ))}
              </div>
              <div className="wf-actions-bar">
                <Link to="/wireframe/e5-result" className="wf-btn wf-btn-ghost">← Voltar ao resultado</Link>
              </div>
            </>
          )}

          {view === 'pdf' && (
            <div className="wf-pdf">
              <div className="wf-pdf-pages">
                {pdfPages.map((p) => (
                  <div className="wf-pdf-page" key={p.n}>
                    <div className="wf-pdf-thumb">
                      <div className="wm">SIMULAÇÃO TÉCNICA</div>
                      <div className="tt">{p.name}</div>
                      <div className="ln" />
                      <div className="ln" />
                      <div className="ln short" />
                    </div>
                    <div className="wf-pdf-cap">Pág {p.n} · {p.content}</div>
                  </div>
                ))}
              </div>
              <div className="wf-disclaimer" style={{ marginTop: 0 }}>
                Documento gerado em ambiente de simulação técnico-institucional. Valores são
                representações simbólicas e plausíveis, não medições validadas (PRD CA-08).
              </div>
              <Toolbar onBack={() => setView('cards')} />
            </div>
          )}

          {(view === 'gis' || view === 'bim') && (
            <div className="wf-pdf">
              <div className="wf-pkg">
                <div className="wf-pkg-tree">{view === 'gis' ? gisTree : bimTree}</div>
                <div className="wf-pkg-meta">
                  <div className="wf-legend-sub">METADADOS</div>
                  {view === 'gis' ? (
                    <>
                      <div className="wf-legend-row"><span>Datum</span><strong>WGS84 (simb.)</strong></div>
                      <div className="wf-legend-row"><span>CRS</span><strong>EPSG:4326 (simb.)</strong></div>
                      <div className="wf-legend-row"><span>Missão</span><strong>…-142</strong></div>
                      <div className="wf-disclaimer">
                        Pacote geoespacial simbólico. Coordenadas e datums são simulados para fins
                        demonstrativos; integração com GIS de produção depende da implementação definitiva.
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="wf-legend-row"><span>Profundidade base</span><strong>5,0 m (teórico)</strong></div>
                      <div className="wf-legend-row"><span>Volume total</span><strong>2,4 m³</strong></div>
                      <div className="wf-legend-row"><span>Sistema</span><strong>coordenadas locais</strong></div>
                      <div className="wf-disclaimer">
                        Pacote BIM simbólico. Elementos IFC são modelos paramétricos simulados para fins
                        demonstrativos de integração; não representam medição estrutural validada.
                      </div>
                    </>
                  )}
                </div>
              </div>
              <Toolbar onBack={() => setView('cards')} />
            </div>
          )}
        </div>
      </WfScreen>
    </>
  )
}
