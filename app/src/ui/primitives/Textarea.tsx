import type { TextareaHTMLAttributes } from 'react'
import './fields.css'

export function Textarea({ className = '', ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`gsfs-field ${className}`} {...rest} />
}
