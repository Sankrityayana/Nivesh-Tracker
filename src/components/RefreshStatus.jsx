import { formatTime } from '../utils/formatters'

function RefreshStatus({ lastUpdated, refreshing, warning }) {
  return (
    <section className="mt-3 flex flex-col gap-2 text-xs text-slate-300 sm:flex-row sm:items-center sm:justify-between">
      <p>
        Last updated: <span className="text-slate-100">{formatTime(lastUpdated)}</span>
      </p>
      <div className="flex items-center gap-2">
        {refreshing && <span className="text-sky-300">Refreshing...</span>}
        {warning && <span className="text-amber-300">{warning}</span>}
      </div>
    </section>
  )
}

export default RefreshStatus
