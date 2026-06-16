import { Simulator } from '../prototype/Simulator'
import '../prototype/shell/screen.css'

// Produto da Fase 3: o simulador hi-fi, standalone, sem chrome de review.
// O palco centraliza o quadro 1280×800 na viewport.
export default function Prototype() {
  return (
    <div className="pt-stage">
      <Simulator />
    </div>
  )
}
