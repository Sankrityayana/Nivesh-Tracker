import { useEffect, useState } from 'react'
import CoinTable from '../components/CoinTable'
import DashboardControls from '../components/DashboardControls'
import DashboardHeader from '../components/DashboardHeader'
import EmptyState from '../components/EmptyState'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { fetchMarketCoins } from '../services/coingecko'

function DashboardPage() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('marketCapDesc')

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

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader />
        <DashboardControls
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          sortValue={sortBy}
          onSortChange={setSortBy}
        />

        {loading && <LoadingSkeleton />}
        {!loading && error && <EmptyState message={error} />}
        {!loading && !error && coins.length === 0 && <EmptyState message="No coins found." />}
        {!loading && !error && coins.length > 0 && <CoinTable coins={coins} />}
      </div>
    </main>
  )
}

export default DashboardPage
