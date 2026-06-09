import { Routes, Route, Navigate } from 'react-router-dom'
import Hub from './pages/Hub'
import Prototype from './pages/Prototype'
import WireframeIndex from './pages/wireframe/WireframeIndex'
import E1Boot from './pages/wireframe/E1Boot'
import E2Menu from './pages/wireframe/E2Menu'
import E3Setup from './pages/wireframe/E3Setup'
import E4Scan from './pages/wireframe/E4Scan'
import E5Result from './pages/wireframe/E5Result'
import E6Export from './pages/wireframe/E6Export'
import E7Replay from './pages/wireframe/E7Replay'
import UiKitLayout from './pages/uikit/UiKitLayout'
import Cores from './pages/uikit/sections/Cores'
import Tipografia from './pages/uikit/sections/Tipografia'
import Logo from './pages/uikit/sections/Logo'
import Espacamento from './pages/uikit/sections/Espacamento'
import Iconografia from './pages/uikit/sections/Iconografia'
import ButtonDoc from './pages/uikit/sections/ButtonDoc'
import FieldsDoc from './pages/uikit/sections/FieldsDoc'
import BadgeDoc from './pages/uikit/sections/BadgeDoc'
import DataDoc from './pages/uikit/sections/DataDoc'
import DetectionDoc from './pages/uikit/sections/DetectionDoc'
import GaugesDoc from './pages/uikit/sections/GaugesDoc'
import SensorDoc from './pages/uikit/sections/SensorDoc'

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

      {/* Fase 2 — UI Kit (galeria master/detail) */}
      <Route path="/ui-kit" element={<UiKitLayout />}>
        <Route index element={<Navigate to="cores" replace />} />
        <Route path="cores" element={<Cores />} />
        <Route path="tipografia" element={<Tipografia />} />
        <Route path="logo" element={<Logo />} />
        <Route path="espacamento" element={<Espacamento />} />
        <Route path="iconografia" element={<Iconografia />} />
        <Route path="button" element={<ButtonDoc />} />
        <Route path="campos" element={<FieldsDoc />} />
        <Route path="badge" element={<BadgeDoc />} />
        <Route path="dados" element={<DataDoc />} />
        <Route path="deteccao" element={<DetectionDoc />} />
        <Route path="medidores" element={<GaugesDoc />} />
        <Route path="sensores" element={<SensorDoc />} />
      </Route>

      {/* Fase 3 — protótipo de alta fidelidade (placeholder por ora) */}
      <Route path="/prototype" element={<Prototype />} />
    </Routes>
  )
}
