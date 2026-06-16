import { Button } from '../../ui'
import { Screen } from '../shell/Screen'
import { useSimulator } from '../store'

export function E6Export() {
  const goTo = useSimulator((s) => s.goTo)
  return (
    <Screen title="EXPORTAÇÃO" subtitle="GROUND SCANNING FUSION SYSTEM" meta={['ETAPA: E6 · Exportação']}>
      <div className="pt-placeholder">
        <p>E6 — Exportação (placeholder)</p>
        <div className="pt-placeholder-actions">
          <Button variant="ghost" onClick={() => goTo('e5-result')}>← Voltar ao resultado</Button>
        </div>
      </div>
    </Screen>
  )
}
