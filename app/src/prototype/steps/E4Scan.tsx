import { Button } from '../../ui'
import { Screen } from '../shell/Screen'
import { useSimulator } from '../store'

export function E4Scan() {
  const goTo = useSimulator((s) => s.goTo)
  const abort = useSimulator((s) => s.abort)
  return (
    <Screen title="VARREDURA" subtitle="GROUND SCANNING FUSION SYSTEM" meta={['ETAPA: E4 · Varredura']}>
      <div className="pt-placeholder">
        <p>E4 — Varredura (placeholder)</p>
        <div className="pt-placeholder-actions">
          <Button variant="danger" onClick={() => abort()}>Abortar</Button>
          <Button onClick={() => goTo('e5-result')}>Concluir varredura →</Button>
        </div>
      </div>
    </Screen>
  )
}
