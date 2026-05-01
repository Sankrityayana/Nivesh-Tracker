import { useEffect, useMemo, useState } from 'react'
import CoinTable from '../components/CoinTable'
import DashboardControls from '../components/DashboardControls'
import DashboardHeader from '../components/DashboardHeader'
import EmptyState from '../components/EmptyState'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { useWatchlist } from '../context/WatchlistContext'
import { fetchMarketCoins } from '../services/coingecko'
import { applyCoinFiltersAndSort } from '../utils/sortFilter'

function DashboardPage() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('marketCapDesc')
  const [watchlistOnly, setWatchlistOnly] = useState(false)
  const [selectedCoinId, setSelectedCoinId] = useState(null)
  const { watchlistIds, toggleWatchlist } = useWatchlist()

  useEffect(() => {
    async function loadCoins() {
      setLoading(true)
      setError('')

      try {
        const marketCoins = await fetchMarketCoins('usd', 1, 50)
        setCoins(marketCoins)
      } catch (loadError) {
        setError(loadError.message)
      } finally {
        setLoading(false)
      }
    }

    loadCoins()
  }, [])

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
