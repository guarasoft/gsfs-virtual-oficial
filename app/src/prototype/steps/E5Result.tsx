import { Button } from '../../ui'
import { Screen } from '../shell/Screen'
import { useSimulator } from '../store'

export function E5Result() {
  const goTo = useSimulator((s) => s.goTo)
  const newOperation = useSimulator((s) => s.newOperation)
  return (
    <Screen title="RESULTADO" subtitle="GROUND SCANNING FUSION SYSTEM" meta={['ETAPA: E5 · Resultado + Bloco 3D']}>
      <div className="pt-placeholder">
        <p>E5 — Resultado (placeholder)</p>
        <div className="pt-placeholder-actions">
          <Button variant="ghost" onClick={() => newOperation()}>Nova operação</Button>
          <Button onClick={() => goTo('e7-replay')}>Replay</Button>
          <Button onClick={() => goTo('e6-export')}>Exportar →</Button>
        </div>
      </div>
    </Screen>
  )
}
