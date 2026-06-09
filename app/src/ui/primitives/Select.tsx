import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import './Select.css'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  id?: string
  /** id de um rótulo externo (ex.: injetado pelo componente Field). */
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
}

// Listbox acessível (padrão WAI-ARIA "select-only combobox"): combobox +
// listbox/options, navegação por teclado (setas, Home/End, Enter, Esc,
// type-ahead), aria-activedescendant e foco visível. Substitui o <select>
// nativo para que a lista aberta siga o tema escuro da marca.
export function Select({
  options,
  value,
  onChange,
  placeholder = 'Selecione…',
  disabled,
  id,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'aria-invalid': ariaInvalid,
}: SelectProps) {
  const autoId = useId()
  const cid = id ?? autoId
  const listId = `${cid}-list`
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(() => Math.max(0, options.findIndex((o) => o.value === value)))
  const rootRef = useRef<HTMLDivElement>(null)
  const typed = useRef('')

  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  function openList() {
    if (disabled) return
    setActive(Math.max(0, options.findIndex((o) => o.value === value)))
    setOpen(true)
  }
  function choose(i: number) {
    const o = options[i]
    if (o) onChange(o.value)
    setOpen(false)
  }
  function typeahead(ch: string) {
    typed.current = (typed.current + ch).toLowerCase()
    const i = options.findIndex((o) => o.label.toLowerCase().startsWith(typed.current))
    if (i >= 0) {
      if (open) setActive(i)
      else onChange(options[i].value)
    }
    window.clearTimeout((typeahead as unknown as { t?: number }).t)
    ;(typeahead as unknown as { t?: number }).t = window.setTimeout(() => { typed.current = '' }, 500)
  }

  function onKey(e: KeyboardEvent) {
    if (disabled) return
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (!open) openList()
        else setActive((a) => Math.min(options.length - 1, a + 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!open) openList()
        else setActive((a) => Math.max(0, a - 1))
        break
      case 'Home':
        if (open) { e.preventDefault(); setActive(0) }
        break
      case 'End':
        if (open) { e.preventDefault(); setActive(options.length - 1) }
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (open) choose(active)
        else openList()
        break
      case 'Escape':
        if (open) { e.preventDefault(); setOpen(false) }
        break
      case 'Tab':
        if (open) setOpen(false)
        break
      default:
        if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) typeahead(e.key)
    }
  }

  return (
    <div className="gsfs-select" ref={rootRef}>
      <div
        id={cid}
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-opt-${active}` : undefined}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-invalid={ariaInvalid}
        aria-disabled={disabled || undefined}
        className={`gsfs-select-trigger${disabled ? ' is-disabled' : ''}`}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKey}
      >
        <span className={selected ? undefined : 'is-placeholder'}>{selected ? selected.label : placeholder}</span>
        <ChevronDown size={16} aria-hidden />
      </div>
      {open && (
        <ul id={listId} role="listbox" className="gsfs-select-list">
          {options.map((o, i) => (
            <li
              key={o.value}
              id={`${listId}-opt-${i}`}
              role="option"
              aria-selected={o.value === value}
              className={`gsfs-select-opt${i === active ? ' is-active' : ''}${o.value === value ? ' is-selected' : ''}`}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(i)}
            >
              <span>{o.label}</span>
              {o.value === value && <Check size={16} aria-hidden />}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
