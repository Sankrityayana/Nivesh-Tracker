import { formatCurrency, formatPercent } from '../utils/formatters'

function HighlightCard({ title, coin, tone }) {
  if (!coin) {
    return null
  }

  return (
    <article className={`panel p-4 ${tone === 'gain' ? 'border-emerald-500/50' : 'border-rose-500/50'}`}>
      <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
      <div className="mt-2 flex items-center gap-3">
        <img src={coin.image} alt={coin.name} className="h-8 w-8 rounded-full" />
        <div>
          <p className="text-sm font-semibold text-white">{coin.name}</p>
          <p className="text-xs uppercase text-slate-400">{coin.symbol}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-200">{formatCurrency(coin.current_price)}</p>
      <p className={`text-sm font-semibold ${tone === 'gain' ? 'status-positive' : 'status-negative'}`}>
        {formatPercent(coin.price_change_percentage_24h)}
      </p>
    </article>
  )
}

function MarketHighlights({ coins }) {
  if (!coins.length) {
    return null
  }

  const sortedByChange = [...coins].sort(
    (a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0),
  )

  const topGainer = sortedByChange[0]
  const topLoser = sortedByChange[sortedByChange.length - 1]

  return (
    <section className="mt-4 grid gap-3 sm:grid-cols-2">
      <HighlightCard title="Top 24h Gainer" coin={topGainer} tone="gain" />
      <HighlightCard title="Top 24h Loser" coin={topLoser} tone="loss" />
    </section>
  )
}

export default MarketHighlights
