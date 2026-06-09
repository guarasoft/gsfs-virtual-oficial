import { Link } from 'react-router-dom'
import ReviewBar from '../../components/ReviewBar'

type Etapa = {
  id: string
  num: string
  name: string
  desc: string
  to?: string
}

const etapas: Etapa[] = [
  { id: 'e1', num: 'E1', name: 'Boot / Autoteste', desc: 'Splash de carregamento + diagnóstico dos módulos e telemetria.', to: '/wireframe/e1-boot' },
  { id: 'e2', num: 'E2', name: 'Menu / Início', desc: 'Ponto de entrada do apresentador: nova operação, replay.', to: '/wireframe/e2-menu' },
  { id: 'e3', num: 'E3', name: 'Setup de Missão', desc: 'Solo, área, modalidade e seleção do cenário.', to: '/wireframe/e3-setup' },
  { id: 'e4', num: 'E4', name: 'Varredura', desc: '4 painéis de sensor, HUD, detecções, log de missão.', to: '/wireframe/e4-scan' },
  { id: 'e5', num: 'E5', name: 'Resultado + Bloco 3D', desc: 'Bloco 3D em 1ª pessoa + legenda (volume, ativos, hash). Consolidação do GSFS_RECORD.', to: '/wireframe/e5-result' },
  { id: 'e6', num: 'E6', name: 'Exportação', desc: 'PDF de 5 páginas + GIS/BIM como preview simbólico.', to: '/wireframe/e6-export' },
  { id: 'e7', num: 'E7', name: 'Replay', desc: 'Listagem de gravações + reprodução determinística.', to: '/wireframe/e7-replay' },
]

export default function WireframeIndex() {
  return (
    <>
      <ReviewBar crumb="Wireframes · Fase 1" />
      <div className="hub">
        <p className="hub-kicker">Fase 1 · Arquitetura de informação e fluxos</p>
        <h1 className="hub-title">Wireframes — jornada em 7 etapas</h1>
        <p className="hub-sub">
          Baixa fidelidade (cinza/estrutural), referência tablet 1280×800. Clique numa
          etapa concluída para percorrer o wireframe.
        </p>

        <div className="hub-grid">
          {etapas.map((e) => {
            const inner = (
              <>
                <div className="hub-card-phase">{e.num}</div>
                <div className="hub-card-name">{e.name}</div>
                <div className="hub-card-desc">{e.desc}</div>
                <span className="hub-card-tag">{e.to ? 'Pronta' : 'Em breve'}</span>
              </>
            )
            return e.to ? (
              <Link key={e.id} to={e.to} className="hub-card">
                {inner}
              </Link>
            ) : (
              <div key={e.id} className="hub-card" aria-disabled="true">
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
