import { Link } from 'react-router-dom'

// Hub = portal de review interno. Não é o produto final.
// Cada card leva ao entregável de uma fase.
type Card = {
  to: string
  phase: string
  name: string
  desc: string
  tag: string
  enabled: boolean
}

const cards: Card[] = [
  {
    to: '/wireframe',
    phase: 'Fase 1',
    name: 'Wireframes',
    desc: 'Arquitetura de informação e fluxos em baixa fidelidade (cinza/estrutural). Jornada em 8 etapas.',
    tag: 'Em andamento',
    enabled: true,
  },
  {
    to: '/ui-kit',
    phase: 'Fase 2',
    name: 'UI Kit',
    desc: 'Linguagem visual e componentes (cores, tipografia, HUD, painéis de sensor).',
    tag: 'Em andamento',
    enabled: true,
  },
  {
    to: '/prototype',
    phase: 'Fase 3',
    name: 'Protótipo',
    desc: 'O simulador de alta fidelidade, navegável e determinístico. É o produto entregue ao cliente.',
    tag: 'Em breve',
    enabled: false,
  },
]

export default function Hub() {
  return (
    <div className="hub">
      <p className="hub-kicker">GSFS Virtual · Portal de Review</p>
      <h1 className="hub-title">GSFS Virtual</h1>
      <p className="hub-sub">
        Ambiente interno para revisar cada entregável do projeto conforme ele avança.
        Escolha uma seção; é sempre possível voltar a esta tela inicial.
      </p>

      <div className="hub-grid">
        {cards.map((c) => {
          const inner = (
            <>
              <div className="hub-card-phase">{c.phase}</div>
              <div className="hub-card-name">{c.name}</div>
              <div className="hub-card-desc">{c.desc}</div>
              <span className="hub-card-tag">{c.tag}</span>
            </>
          )
          return c.enabled ? (
            <Link key={c.to} to={c.to} className="hub-card">
              {inner}
            </Link>
          ) : (
            <div key={c.to} className="hub-card" aria-disabled="true">
              {inner}
            </div>
          )
        })}
      </div>

      <p className="hub-footer">
        Fase 1 — wireframes em baixa fidelidade · referência tablet 1280×800 (landscape)
      </p>
    </div>
  )
}
