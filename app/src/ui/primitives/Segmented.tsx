import type { HTMLAttributes } from 'react'
import './Segmented.css'

export interface SegmentedOption {
  value: string
  label: string
}

export interface SegmentedProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SegmentedOption[]
  /** valor único selecionado, ou lista (vários ativos, ex.: solo transicional) */
  value: string | string[]
  onChange?: (value: string) => void
  /** somente leitura (demonstrativo) — mantém o destaque, sem interação */
  disabled?: boolean
}

// Controle segmentado: opções com largura IGUAL ocupando todo o container.
// Aceita props injetadas pelo Field (id, aria-labelledby, …) via `...rest`.
export function Segmented({
  options,
  value,
  onChange,
  disabled = false,
  className = '',
  ...rest
}: SegmentedProps) {
  const actives = Array.isArray(value) ? value : [value]
  return (
    <div className={`gsfs-segmented ${className}`.trim()} role="group" {...rest}>
      {options.map((o) => {
        const on = actives.includes(o.value)
        return (
          <button
            key={o.value}
            type="button"
            disabled={disabled}
            aria-pressed={on}
            className={`gsfs-segmented-opt${on ? ' is-active' : ''}`}
            onClick={() => !disabled && onChange?.(o.value)}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
