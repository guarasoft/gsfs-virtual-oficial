import { cloneElement, isValidElement, useId, type ReactElement, type ReactNode } from 'react'
import { TriangleAlert } from 'lucide-react'
import './fields.css'

export interface FieldProps {
  label: string
  hint?: string
  error?: string
  children: ReactNode
}

// Agrupa rótulo + controle + mensagem, fazendo a associação acessível:
// injeta id, aria-labelledby (rótulo), aria-describedby (hint/erro) e
// aria-invalid no controle filho. O erro é texto + ícone (não só cor),
// atendendo WCAG 1.3.1/1.4.1/4.1.2.
export function Field({ label, hint, error, children }: FieldProps) {
  const id = useId()
  const labelId = `${id}-label`
  const hintId = hint ? `${id}-hint` : undefined
  const errId = error ? `${id}-err` : undefined
  const describedBy = [hintId, errId].filter(Boolean).join(' ') || undefined

  const control = isValidElement(children)
    ? cloneElement(children as ReactElement, {
        id,
        'aria-labelledby': labelId,
        'aria-describedby': describedBy,
        'aria-invalid': error ? true : undefined,
      })
    : children

  return (
    <div className="gsfs-field-group">
      <label id={labelId} htmlFor={id} className="gsfs-field-grouplabel">{label}</label>
      {control}
      {hint && !error && <span id={hintId} className="gsfs-field-hint">{hint}</span>}
      {error && (
        <span id={errId} className="gsfs-field-error" role="alert">
          <TriangleAlert size={14} aria-hidden /> {error}
        </span>
      )}
    </div>
  )
}
