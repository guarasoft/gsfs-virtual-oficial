import { BatteryGauge, type BatteryState } from './BatteryGauge'
import { TempGauge, type TempState } from './TempGauge'
import { RtkStatus, type RtkState } from './RtkStatus'
import './sim.css'

export function StatusBar({ battery, batteryState, temp, tempState, rtk }: {
  battery: number; batteryState: BatteryState; temp: number; tempState: TempState; rtk: RtkState
}) {
  return (
    <div className="sim-statusbar">
      <BatteryGauge percent={battery} state={batteryState} />
      <TempGauge celsius={temp} state={tempState} />
      <RtkStatus state={rtk} />
    </div>
  )
}
