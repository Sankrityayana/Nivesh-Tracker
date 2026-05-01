import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'nivesh_watchlist'

const WatchlistContext = createContext(null)

function loadStoredWatchlist() {
  try {
    const rawValue = localStorage.getItem(STORAGE_KEY)
    if (!rawValue) {
      return []
    }

    const parsed = JSON.parse(rawValue)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function WatchlistProvider({ children }) {
  const [watchlistIds, setWatchlistIds] = useState(loadStoredWatchlist)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlistIds))
  }, [watchlistIds])

  const value = useMemo(() => ({
    watchlistIds,
    toggleWatchlist: (coinId) => {
      setWatchlistIds((current) => {
        if (current.includes(coinId)) {
          return current.filter((id) => id !== coinId)
        }

        return [...current, coinId]
      })
    },
    isInWatchlist: (coinId) => watchlistIds.includes(coinId),
  }), [watchlistIds])

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>
}

export function useWatchlist() {
  const context = useContext(WatchlistContext)

  if (!context) {
    throw new Error('useWatchlist must be used inside WatchlistProvider')
  }

  return context
}
