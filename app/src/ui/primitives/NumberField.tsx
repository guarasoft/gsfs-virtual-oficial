import type { InputHTMLAttributes } from 'react'
import './NumberField.css'

export interface NumberFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'type'> {
  value: number
  onValueChange?: (value: number) => void
  /** unidade exibida à direita (ex.: "m") */
  unit?: string
}

// Campo numérico do design system: input estilizado + unidade opcional.
export function NumberField({
  value,
  onValueChange,
  unit,
  className = '',
  ...rest
}: NumberFieldProps) {
  return (
    <span className={`gsfs-numberfield ${className}`.trim()}>
      <input
        type="number"
        className="gsfs-numberfield-input"
        value={value}
        onChange={(e) => onValueChange?.(Number(e.target.value))}
        {...rest}
      />
      {unit && <span className="gsfs-numberfield-unit">{unit}</span>}
    </span>
  )
}
