import { formatCurrency, formatNumber, formatPercent } from '../utils/formatters'

function CoinTable({ coins }) {
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
            {coins.map((coin) => (
              <tr key={coin.id} className="table-row-hover border-t border-slate-700/50">
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
                <td className="px-4 py-3 text-slate-200">?</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 p-3 md:hidden">
        {coins.map((coin) => (
          <article key={coin.id} className="rounded-lg border border-slate-700/60 bg-slate-900/50 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="h-7 w-7 rounded-full" />
                <div>
                  <p className="text-sm font-semibold text-white">{coin.name}</p>
                  <p className="text-xs uppercase text-slate-400">{coin.symbol}</p>
                </div>
              </div>
              <span className="text-lg text-slate-200">?</span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
              <p>Price: <span className="text-slate-100">{formatCurrency(coin.current_price)}</span></p>
              <p className={coin.price_change_percentage_24h >= 0 ? 'status-positive' : 'status-negative'}>
                24h: {formatPercent(coin.price_change_percentage_24h)}
              </p>
              <p>Cap: <span className="text-slate-100">{formatNumber(coin.market_cap)}</span></p>
              <p>Vol: <span className="text-slate-100">{formatNumber(coin.total_volume)}</span></p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CoinTable
