# Nivesh Tracker

A beginner-to-intermediate crypto tracker dashboard built with React, Vite, Tailwind CSS, and CoinGecko public APIs.

## Project Overview
Nivesh Tracker provides a live market view of top crypto assets with search, sorting, watchlist persistence, auto-refresh, and coin-level details.

## Tech Stack
- React 19
- Vite 8
- Tailwind CSS 4
- CoinGecko API (public)

## Features
- Live top coin market table (price, 24h change, market cap, volume)
- Search by coin name/symbol (case-insensitive)
- Sort by price, market cap, and 24h gainers
- Watchlist add/remove with localStorage persistence
- Watchlist-only toggle
- Auto-refresh every 20 seconds
- Last-updated timestamp + non-blocking refresh warning
- Coin details modal (rank, current price, 24h high/low, market cap, supply data)
- Mobile card layout + desktop table layout
- Loading skeleton, empty state, and error handling
- Optional polish: top gainer/top loser highlight cards

## Setup
```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
```

Run lint:
```bash
npm run lint
```

## API Used
CoinGecko Public API:
- `GET /api/v3/coins/markets`
- `GET /api/v3/coins/{id}`
- `GET /api/v3/search/trending`

## Folder Structure
```text
src/
  assets/
  components/
  context/
  hooks/
  pages/
  services/
  utils/
```

## Future Improvements
- Portfolio value calculator
- Multi-currency switch (`usd`, `inr`, `eur`)
- Sparkline mini-charts per coin
- Theme toggle (light/dark)
- Pagination/infinite scroll for larger market datasets
