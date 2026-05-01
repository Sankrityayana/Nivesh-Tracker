import { formatCurrency, formatNumber, formatPercent } from '../utils/formatters'

function WatchlistButton({ isSaved, onToggle }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        onToggle()
      }}
      className={`rounded-md border px-2 py-1 text-sm transition ${isSaved ? 'border-amber-400 bg-amber-500/20 text-amber-300' : 'border-slate-600 bg-slate-900/70 text-slate-200 hover:border-slate-400'}`}
      aria-label={isSaved ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      {isSaved ? '?' : '?'}
    </button>
  )
}

function CoinTable({ coins, watchlistIds, onToggleWatchlist, onSelectCoin }) {
  return (
    <section className="panel mt-4 overflow-hidden">
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-900/70 text-xs uppercase tracking-wide text-slate-300">
            <tr>
              <th className="px-4 py-3">Coin</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">24h %</th>
              <th className="px-4 py-3">Market Cap</th>
              <th className="px-4 py-3">Volume</th>
              <th className="px-4 py-3">Watchlist</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => {
              const isSaved = watchlistIds.has(coin.id)

              return (
                <tr
                  key={coin.id}
                  className="table-row-hover cursor-pointer border-t border-slate-700/50"
                  onClick={() => onSelectCoin(coin.id)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={coin.image} alt={coin.name} className="h-7 w-7 rounded-full" />
                      <div>
                        <p className="font-medium text-white">{coin.name}</p>
                        <p className="text-xs uppercase text-slate-400">{coin.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-100">{formatCurrency(coin.current_price)}</td>
                  <td className={`px-4 py-3 font-medium ${coin.price_change_percentage_24h >= 0 ? 'status-positive' : 'status-negative'}`}>
                    {formatPercent(coin.price_change_percentage_24h)}
                  </td>
                  <td className="px-4 py-3 text-slate-100">{formatNumber(coin.market_cap)}</td>
                  <td className="px-4 py-3 text-slate-100">{formatNumber(coin.total_volume)}</td>
                  <td className="px-4 py-3 text-slate-200">
                    <WatchlistButton isSaved={isSaved} onToggle={() => onToggleWatchlist(coin.id)} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 p-3 md:hidden">
        {coins.map((coin) => {
          const isSaved = watchlistIds.has(coin.id)

          return (
            <article
              key={coin.id}
              className="rounded-lg border border-slate-700/60 bg-slate-900/50 p-3"
              onClick={() => onSelectCoin(coin.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={coin.image} alt={coin.name} className="h-7 w-7 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold text-white">{coin.name}</p>
                    <p className="text-xs uppercase text-slate-400">{coin.symbol}</p>
                  </div>
                </div>
                <WatchlistButton isSaved={isSaved} onToggle={() => onToggleWatchlist(coin.id)} />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
                <p>
                  Price: <span className="text-slate-100">{formatCurrency(coin.current_price)}</span>
                </p>
                <p className={coin.price_change_percentage_24h >= 0 ? 'status-positive' : 'status-negative'}>
                  24h: {formatPercent(coin.price_change_percentage_24h)}
                </p>
                <p>
                  Cap: <span className="text-slate-100">{formatNumber(coin.market_cap)}</span>
                </p>
                <p>
                  Vol: <span className="text-slate-100">{formatNumber(coin.total_volume)}</span>
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default CoinTable
