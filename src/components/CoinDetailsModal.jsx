import { useEffect, useState } from 'react'
import { fetchCoinDetails } from '../services/coingecko'
import { formatCurrency, formatNumber } from '../utils/formatters'

function MetricRow({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-700/60 bg-slate-900/40 px-3 py-2">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-100">{value}</p>
    </div>
  )
}

function CoinDetailsModal({ coinId, onClose }) {
  const [coin, setCoin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadCoinDetails() {
      setLoading(true)
      setError('')

      try {
        const details = await fetchCoinDetails(coinId)
        if (isMounted) {
          setCoin(details)
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadCoinDetails()

    return () => {
      isMounted = false
    }
  }, [coinId])

  return (
    <div
      className="fixed inset-0 z-30 flex items-end bg-slate-950/70 p-0 sm:items-center sm:justify-center sm:p-4"
      onClick={onClose}
      role="presentation"
    >
      <section
        className="w-full max-w-2xl rounded-t-2xl border border-slate-700 bg-slate-900 p-5 sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Coin Details</h2>
            <p className="text-xs text-slate-400">ID: {coinId}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-600 px-2 py-1 text-xs text-slate-200 transition hover:border-slate-400"
          >
            Close
          </button>
        </div>

        {loading && <p className="text-sm text-slate-300">Loading details...</p>}
        {!loading && error && <p className="text-sm text-rose-300">{error}</p>}

        {!loading && !error && coin && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={coin.image} alt={coin.name} className="h-10 w-10 rounded-full" />
              <div>
                <p className="text-lg font-semibold text-white">{coin.name}</p>
                <p className="text-sm uppercase text-slate-400">
                  {coin.symbol} {coin.rank ? `� Rank #${coin.rank}` : ''}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <MetricRow label="Current Price" value={formatCurrency(coin.current_price)} />
              <MetricRow label="24h High" value={formatCurrency(coin.high_24h)} />
              <MetricRow label="24h Low" value={formatCurrency(coin.low_24h)} />
              <MetricRow label="Market Cap" value={formatNumber(coin.market_cap)} />
              <MetricRow label="Circulating Supply" value={formatNumber(coin.circulating_supply)} />
              <MetricRow label="Total Supply" value={formatNumber(coin.total_supply)} />
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default CoinDetailsModal
