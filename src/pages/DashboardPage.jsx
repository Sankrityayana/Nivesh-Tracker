import { useMemo, useState } from 'react'
import CoinTable from '../components/CoinTable'
import DashboardControls from '../components/DashboardControls'
import DashboardHeader from '../components/DashboardHeader'
import EmptyState from '../components/EmptyState'
import LoadingSkeleton from '../components/LoadingSkeleton'
import RefreshStatus from '../components/RefreshStatus'
import { useWatchlist } from '../context/WatchlistContext'
import { useMarketCoins } from '../hooks/useMarketCoins'
import { applyCoinFiltersAndSort } from '../utils/sortFilter'

function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('marketCapDesc')
  const [watchlistOnly, setWatchlistOnly] = useState(false)
  const [selectedCoinId, setSelectedCoinId] = useState(null)
  const { watchlistIds, toggleWatchlist } = useWatchlist()

  const { coins, loading, error, warning, refreshing, lastUpdated } = useMarketCoins({
    vsCurrency: 'usd',
    page: 1,
    perPage: 50,
    refreshInterval: 20000,
  })

  const watchlistSet = useMemo(() => new Set(watchlistIds), [watchlistIds])

  const visibleCoins = useMemo(
    () =>
      applyCoinFiltersAndSort(coins, searchQuery, sortBy, {
        watchlistOnly,
        watchlistIds: watchlistSet,
      }),
    [coins, searchQuery, sortBy, watchlistOnly, watchlistSet],
  )

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader />
        <DashboardControls
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          sortValue={sortBy}
          onSortChange={setSortBy}
          watchlistOnly={watchlistOnly}
          onWatchlistOnlyChange={setWatchlistOnly}
        />
        {!loading && !error && (
          <RefreshStatus lastUpdated={lastUpdated} refreshing={refreshing} warning={warning} />
        )}

        {loading && <LoadingSkeleton />}
        {!loading && error && <EmptyState message={error} />}
        {!loading && !error && visibleCoins.length === 0 && (
          <EmptyState message="No matching coins found." />
        )}
        {!loading && !error && visibleCoins.length > 0 && (
          <CoinTable
            coins={visibleCoins}
            watchlistIds={watchlistSet}
            onToggleWatchlist={toggleWatchlist}
            onSelectCoin={setSelectedCoinId}
          />
        )}

        {selectedCoinId && (
          <p className="mt-3 text-xs text-slate-400">
            Selected coin: <span className="text-slate-200">{selectedCoinId}</span>
          </p>
        )}
      </div>
    </main>
  )
}

export default DashboardPage
