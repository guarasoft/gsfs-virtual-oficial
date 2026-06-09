import type { InputHTMLAttributes } from 'react'
import './fields.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}
export function Input({ error, className = '', ...rest }: InputProps) {
  return <input className={`gsfs-field ${error ? 'gsfs-field--error' : ''} ${className}`} {...rest} />
}
