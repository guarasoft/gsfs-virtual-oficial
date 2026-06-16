import { Button } from '../../ui'
import { Screen } from '../shell/Screen'
import { useSimulator } from '../store'

export function E3Setup() {
  const goTo = useSimulator((s) => s.goTo)
  const startMission = useSimulator((s) => s.startMission)
  return (
    <Screen title="CONFIGURAÇÃO" subtitle="GROUND SCANNING FUSION SYSTEM" meta={['ETAPA: E3 · Setup']}>
      <div className="pt-placeholder">
        <p>E3 — Configuração (placeholder)</p>
        <div className="pt-placeholder-actions">
          <Button variant="ghost" onClick={() => goTo('e2-menu')}>← Voltar ao menu</Button>
          <Button onClick={() => startMission()}>Iniciar varredura →</Button>
        </div>
      </div>
    </Screen>
  )
}
