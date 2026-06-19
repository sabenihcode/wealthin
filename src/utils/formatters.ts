/**
 * Format utility functions
 */

/**
 * Format angka ke format IDR (Indonesian Rupiah)
 * @param value - Nilai dalam rupiah
 * @returns String yang sudah diformat "Rp XX.XXX.XXX"
 *
 * @example
 * formatIDR(1000000) // "Rp 1.000.000"
 * formatIDR(50000)   // "Rp 50.000"
 */
export function formatIDR(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Format angka ke format compact (K, M, B)
 * @param value - Nilai untuk diformat
 * @returns String yang sudah diformat "1.5K", "2.3M", dll
 *
 * @example
 * formatCompact(1000)      // "1K"
 * formatCompact(1500000)   // "1.5M"
 * formatCompact(2000000000) // "2B"
 */
export function formatCompact(value: number): string {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(1).replace(/\.0+$/, '') + 'B'
  }
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1).replace(/\.0+$/, '') + 'M'
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1).replace(/\.0+$/, '') + 'K'
  }
  return value.toString()
}

/**
 * Format persentase
 * @param value - Nilai persentase
 * @param decimals - Jumlah desimal (default: 1)
 * @returns String yang sudah diformat "12.5%", "100%", dll
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Format tanggal ke format lokal
 * @param date - Date object atau string
 * @param locale - Locale (default: 'id-ID')
 * @returns String tanggal yang sudah diformat
 *
 * @example
 * formatDate(new Date()) // "25 Desember 2024"
 */
export function formatDate(
  date: Date | string,
  locale: string = 'id-ID'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Format waktu relative ("2 jam lalu", "3 hari lalu", dll)
 */
export function formatTimeAgo(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const seconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  if (seconds < 60) return 'Baru saja'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} menit lalu`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} jam lalu`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} hari lalu`
  
  return formatDate(dateObj)
}

/**
 * Truncate string dengan ellipsis
 */
export function truncate(text: string, length: number = 50): string {
  return text.length > length ? `${text.substring(0, length)}...` : text
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

/**
 * Format currency dengan custom locale & currency
 */
export function formatCurrency(
  value: number,
  currency: string = 'IDR',
  locale: string = 'id-ID'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value)
}
