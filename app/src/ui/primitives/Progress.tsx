import './Progress.css'

export function Progress({ value, label }: { value: number; label?: string }) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div className="gsfs-progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className="gsfs-progress-fill" style={{ width: `${pct}%` }} />
    </div>
  )
}
