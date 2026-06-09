import { Routes, Route } from 'react-router-dom'
import Hub from './pages/Hub'
import UiKit from './pages/UiKit'
import Prototype from './pages/Prototype'
import WireframeIndex from './pages/wireframe/WireframeIndex'
import E1Boot from './pages/wireframe/E1Boot'
import E2Menu from './pages/wireframe/E2Menu'
import E3Setup from './pages/wireframe/E3Setup'
import E4Scan from './pages/wireframe/E4Scan'
import E5Result from './pages/wireframe/E5Result'
import E6Export from './pages/wireframe/E6Export'
import E7Replay from './pages/wireframe/E7Replay'

// Portal de review do GSFS Virtual.
// O hub e as rotas /wireframe e /ui-kit são ferramentas internas de review.
// O produto entregue ao cliente é o /prototype (Fase 3), que roda standalone.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Hub />} />

      {/* Fase 1 — wireframes em baixa fidelidade */}
      <Route path="/wireframe" element={<WireframeIndex />} />
      <Route path="/wireframe/e1-boot" element={<E1Boot />} />
      <Route path="/wireframe/e2-menu" element={<E2Menu />} />
      <Route path="/wireframe/e3-setup" element={<E3Setup />} />
      <Route path="/wireframe/e4-scan" element={<E4Scan />} />
      <Route path="/wireframe/e5-result" element={<E5Result />} />
      <Route path="/wireframe/e6-export" element={<E6Export />} />
      <Route path="/wireframe/e7-replay" element={<E7Replay />} />

      {/* Fase 2 — UI Kit (placeholder por ora) */}
      <Route path="/ui-kit" element={<UiKit />} />

      {/* Fase 3 — protótipo de alta fidelidade (placeholder por ora) */}
      <Route path="/prototype" element={<Prototype />} />
    </Routes>
  )
}
