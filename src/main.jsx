import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { WatchlistProvider } from './context/WatchlistContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WatchlistProvider>
      <App />
    </WatchlistProvider>
  </StrictMode>,
)
