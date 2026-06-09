import './Toggle.css'

export interface ToggleProps {
  checked: boolean
  onChange?: (v: boolean) => void
  disabled?: boolean
  label?: string
}
export function Toggle({ checked, onChange, disabled, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      className={`gsfs-toggle ${checked ? 'is-on' : ''}`}
      onClick={() => onChange?.(!checked)}
    >
      <span className="gsfs-toggle-knob" />
    </button>
  )
}
