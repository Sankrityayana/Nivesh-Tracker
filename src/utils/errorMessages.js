export const API_ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your internet connection.',
  RATE_LIMIT: 'CoinGecko rate limit reached. Please wait and try again.',
  GENERIC: 'Unable to fetch live market data right now.',
}

export function resolveApiError(error) {
  if (error?.name === 'AbortError') {
    return API_ERROR_MESSAGES.GENERIC
  }

  if (error?.status === 429) {
    return API_ERROR_MESSAGES.RATE_LIMIT
  }

  if (error?.status >= 500) {
    return API_ERROR_MESSAGES.GENERIC
  }

  return API_ERROR_MESSAGES.NETWORK
}
