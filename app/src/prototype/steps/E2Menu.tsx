import { Button } from '../../ui'
import { Screen } from '../shell/Screen'
import { useSimulator } from '../store'

export function E2Menu() {
  const goTo = useSimulator((s) => s.goTo)
  return (
    <Screen title="MENU" subtitle="GROUND SCANNING FUSION SYSTEM" meta={['ETAPA: E2 · Menu']}>
      <div className="pt-placeholder">
        <p>E2 — Menu (placeholder)</p>
        <div className="pt-placeholder-actions">
          <Button onClick={() => goTo('e3-setup')}>Nova Operação →</Button>
          <Button variant="ghost" onClick={() => goTo('e7-replay')}>Replay</Button>
        </div>
      </div>
    </Screen>
  )
}
