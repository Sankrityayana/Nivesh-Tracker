import { useMemo, useState } from 'react'
import CoinDetailsModal from '../components/CoinDetailsModal'
import CoinTable from '../components/CoinTable'
import DashboardControls from '../components/DashboardControls'
import DashboardHeader from '../components/DashboardHeader'
import EmptyState from '../components/EmptyState'
import LoadingSkeleton from '../components/LoadingSkeleton'
import MarketHighlights from '../components/MarketHighlights'
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
    <>
      <main className="min-h-screen px-3 py-6 sm:px-6 sm:py-8 lg:px-10">
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
            <>
              <RefreshStatus lastUpdated={lastUpdated} refreshing={refreshing} warning={warning} />
              <MarketHighlights coins={visibleCoins} />
            </>
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
        </div>
      </main>

      {selectedCoinId && (
        <CoinDetailsModal coinId={selectedCoinId} onClose={() => setSelectedCoinId(null)} />
      )}
    </>
  )
}

export default DashboardPage
