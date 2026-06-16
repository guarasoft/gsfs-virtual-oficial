import { useSimulator } from './store'
import { E1Boot } from './steps/E1Boot'
import { E2Menu } from './steps/E2Menu'
import { E3Setup } from './steps/E3Setup'
import { E4Scan } from './steps/E4Scan'
import { E5Result } from './steps/E5Result'
import { E6Export } from './steps/E6Export'
import { E7Replay } from './steps/E7Replay'

export function Simulator() {
  const step = useSimulator((s) => s.step)
  switch (step) {
    case 'e1-boot': return <E1Boot />
    case 'e2-menu': return <E2Menu />
    case 'e3-setup': return <E3Setup />
    case 'e4-scan': return <E4Scan />
    case 'e5-result': return <E5Result />
    case 'e6-export': return <E6Export />
    case 'e7-replay': return <E7Replay />
  }
}
