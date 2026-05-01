export function filterCoins(coins, searchQuery, watchlistOnly = false, watchlistIds = new Set()) {
  const normalizedQuery = searchQuery.trim().toLowerCase()

  return coins.filter((coin) => {
    const matchesWatchlist = !watchlistOnly || watchlistIds.has(coin.id)
    if (!matchesWatchlist) {
      return false
    }

    if (!normalizedQuery) {
      return true
    }

    const name = coin.name?.toLowerCase() || ''
    const symbol = coin.symbol?.toLowerCase() || ''

    return name.includes(normalizedQuery) || symbol.includes(normalizedQuery)
  })
}

function sortByMetric(coins, accessor) {
  return [...coins].sort((a, b) => (accessor(b) || 0) - (accessor(a) || 0))
}

export function sortCoins(coins, sortBy) {
  switch (sortBy) {
    case 'priceDesc':
      return sortByMetric(coins, (coin) => coin.current_price)
    case 'changeDesc':
      return sortByMetric(coins, (coin) => coin.price_change_percentage_24h)
    case 'marketCapDesc':
    default:
      return sortByMetric(coins, (coin) => coin.market_cap)
  }
}

export function applyCoinFiltersAndSort(coins, searchQuery, sortBy, options = {}) {
  const { watchlistOnly = false, watchlistIds = new Set() } = options
  const filteredCoins = filterCoins(coins, searchQuery, watchlistOnly, watchlistIds)
  return sortCoins(filteredCoins, sortBy)
}
