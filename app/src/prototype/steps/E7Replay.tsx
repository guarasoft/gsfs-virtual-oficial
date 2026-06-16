import { Button } from '../../ui'
import { Screen } from '../shell/Screen'
import { useSimulator } from '../store'

export function E7Replay() {
  const goTo = useSimulator((s) => s.goTo)
  return (
    <Screen title="REPLAY" subtitle="GROUND SCANNING FUSION SYSTEM" meta={['ETAPA: E7 · Replay']}>
      <div className="pt-placeholder">
        <p>E7 — Replay (placeholder)</p>
        <div className="pt-placeholder-actions">
          <Button variant="ghost" onClick={() => goTo('e2-menu')}>← Voltar ao menu</Button>
        </div>
      </div>
    </Screen>
  )
}
