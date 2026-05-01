export function formatCurrency(value) {
  if (typeof value !== 'number') {
    return '-'
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value < 1 ? 6 : 2,
  }).format(value)
}

export function formatNumber(value) {
  if (typeof value !== 'number') {
    return '-'
  }

  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatPercent(value) {
  if (typeof value !== 'number') {
    return '-'
  }

  return `${value.toFixed(2)}%`
}

export function formatTime(date) {
  if (!date) {
    return '-'
  }

  return date.toLocaleTimeString('en-US', { hour12: false })
}
