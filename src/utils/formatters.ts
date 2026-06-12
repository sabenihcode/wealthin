/**
 * Format angka ke Rupiah Indonesia.
 * @example formatIDR(15000000) → "Rp 15.000.000"
 */
export function formatIDR(num: number): string {
  return new Intl.NumberFormat('id-ID', {
    style:                 'currency',
    currency:              'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(num)
    .replace('Rp', 'Rp ')
}

/**
 * Waktu sekarang dalam format "HH:MM".
 * @example formatTimeNow() → "14:30"
 */
export function formatTimeNow(): string {
  return new Date().toLocaleTimeString([], {
    hour:   '2-digit',
    minute: '2-digit',
  })
}

/**
 * Format singkat angka besar.
 * @example formatShort(1500000) → "1.5jt"
 */
export function formatShort(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}jt`
  if (num >= 1_000)     return `${(num / 1_000).toFixed(0)}rb`
  return String(num)
}