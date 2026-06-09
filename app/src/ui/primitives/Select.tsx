import type { SelectHTMLAttributes } from 'react'
import './fields.css'

export function Select({ className = '', children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={`gsfs-field ${className}`} {...rest}>{children}</select>
}
