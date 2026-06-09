import { Link } from 'react-router-dom'

// O protótipo de alta fidelidade é o PRODUTO (Fase 3).
// Roda standalone, sem o chrome de review do hub.
export default function Prototype() {
  return (
    <div className="placeholder">
      <h1>Protótipo — Fase 3</h1>
      <p>
        O simulador de alta fidelidade, navegável e determinístico, será construído
        aqui na Fase 3 — aplicando o UI Kit (Fase 2) sobre os fluxos definidos nos
        wireframes (Fase 1). Roda em tela cheia, sem os menus de review.
      </p>
      <p style={{ marginTop: 24 }}>
        <Link to="/" style={{ textDecoration: 'underline' }}>
          ← Voltar ao início
        </Link>
      </p>
    </div>
  )
}
