import { useCallback, useEffect, useState } from 'react'
import { fetchMarketCoins } from '../services/coingecko'

export function useMarketCoins({ vsCurrency = 'usd', page = 1, perPage = 50, refreshInterval = 20000 } = {}) {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [warning, setWarning] = useState('')
  const [lastUpdated, setLastUpdated] = useState(null)

  const loadCoins = useCallback(
    async ({ initial = false } = {}) => {
      if (initial) {
        setLoading(true)
        setError('')
      } else {
        setRefreshing(true)
      }

      try {
        const marketCoins = await fetchMarketCoins(vsCurrency, page, perPage)
        setCoins(marketCoins)
        setWarning('')
        setError('')
        setLastUpdated(new Date())
      } catch (loadError) {
        if (initial) {
          setError(loadError.message)
        } else {
          setWarning('Auto-refresh failed. Showing last successful market snapshot.')
        }
      } finally {
        if (initial) {
          setLoading(false)
        } else {
          setRefreshing(false)
        }
      }
    },
    [page, perPage, vsCurrency],
  )

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCoins({ initial: true })

    const refreshTimer = setInterval(() => {
      loadCoins()
    }, refreshInterval)

    return () => clearInterval(refreshTimer)
  }, [loadCoins, refreshInterval])

  return {
    coins,
    loading,
    refreshing,
    error,
    warning,
    lastUpdated,
    refreshNow: loadCoins,
  }
}
