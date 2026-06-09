import type { ReactNode } from 'react'
import './Table.css'

export interface Column { key: string; header: string }
export function Table({ columns, rows }: { columns: Column[]; rows: Record<string, ReactNode>[] }) {
  return (
    <table className="gsfs-table">
      <thead>
        <tr>{columns.map((c) => <th key={c.key} className="gsfs-ui-label">{c.header}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>{columns.map((c) => <td key={c.key} className="gsfs-ui">{r[c.key]}</td>)}</tr>
        ))}
      </tbody>
    </table>
  )
}
