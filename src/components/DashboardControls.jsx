function DashboardControls({
  searchValue,
  onSearchChange,
  sortValue,
  onSortChange,
  watchlistOnly,
  onWatchlistOnlyChange,
  onClearFilters,
}) {
  return (
    <section className="panel mt-6 grid gap-3 p-4 lg:grid-cols-[1fr_240px_180px_auto]">
      <label className="flex flex-col gap-2 text-sm text-slate-300">
        Search coins
        <input
          type="text"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name or symbol"
          className="rounded-lg border border-slate-600 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none ring-sky-400 transition focus:ring"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-slate-300">
        Sort by
        <select
          value={sortValue}
          onChange={(event) => onSortChange(event.target.value)}
          className="rounded-lg border border-slate-600 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none ring-sky-400 transition focus:ring"
        >
          <option value="priceDesc">Price: High to Low</option>
          <option value="marketCapDesc">Market Cap: High to Low</option>
          <option value="changeDesc">24h %: Gainers First</option>
        </select>
      </label>

      <button
        type="button"
        onClick={() => onWatchlistOnlyChange((current) => !current)}
        className={`mt-6 h-10 rounded-lg border px-3 text-sm font-medium transition ${watchlistOnly ? 'border-sky-400 bg-sky-500/20 text-sky-200' : 'border-slate-600 bg-slate-900/70 text-slate-200 hover:border-slate-400'}`}
      >
        {watchlistOnly ? 'Showing Watchlist' : 'Watchlist Only'}
      </button>

      <button
        type="button"
        onClick={onClearFilters}
        className="mt-6 h-10 rounded-lg border border-slate-600 bg-slate-900/70 px-3 text-sm text-slate-200 transition hover:border-slate-400"
      >
        Clear
      </button>
    </section>
  )
}

export default DashboardControls
