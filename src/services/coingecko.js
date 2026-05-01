import { resolveApiError } from '../utils/errorMessages'

const BASE_URL = 'https://api.coingecko.com/api/v3'

function mapMarketCoin(coin) {
  return {
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    image: coin.image,
    current_price: coin.current_price,
    market_cap: coin.market_cap,
    total_volume: coin.total_volume,
    price_change_percentage_24h: coin.price_change_percentage_24h,
  }
}

async function fetchFromCoinGecko(path, query = {}) {
  const params = new URLSearchParams(query)
  const response = await fetch(`${BASE_URL}${path}?${params.toString()}`)

  if (!response.ok) {
    const error = new Error('CoinGecko request failed')
    error.status = response.status
    throw error
  }

  return response.json()
}

export async function fetchMarketCoins(vsCurrency = 'usd', page = 1, perPage = 50) {
  try {
    const data = await fetchFromCoinGecko('/coins/markets', {
      vs_currency: vsCurrency,
      order: 'market_cap_desc',
      per_page: perPage,
      page,
      sparkline: 'false',
      price_change_percentage: '24h',
    })

    return data.map(mapMarketCoin)
  } catch (error) {
    throw new Error(resolveApiError(error), { cause: error })
  }
}

export async function fetchCoinDetails(id) {
  try {
    const data = await fetchFromCoinGecko(`/coins/${id}`, {
      localization: 'false',
      tickers: 'false',
      market_data: 'true',
      community_data: 'false',
      developer_data: 'false',
      sparkline: 'false',
    })

    return {
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      image: data.image?.large || data.image?.small || data.image?.thumb,
      rank: data.market_cap_rank,
      current_price: data.market_data?.current_price?.usd,
      high_24h: data.market_data?.high_24h?.usd,
      low_24h: data.market_data?.low_24h?.usd,
      market_cap: data.market_data?.market_cap?.usd,
      circulating_supply: data.market_data?.circulating_supply,
      total_supply: data.market_data?.total_supply,
    }
  } catch (error) {
    throw new Error(resolveApiError(error), { cause: error })
  }
}

export async function fetchTrendingCoins() {
  try {
    const data = await fetchFromCoinGecko('/search/trending')

    return (data.coins || []).map(({ item }) => ({
      id: item.id,
      symbol: item.symbol,
      name: item.name,
      image: item.small,
      current_price: item.data?.price,
      market_cap: item.data?.market_cap,
      total_volume: item.data?.total_volume,
      price_change_percentage_24h: item.data?.price_change_percentage_24h?.usd,
    }))
  } catch (error) {
    throw new Error(resolveApiError(error), { cause: error })
  }
}
