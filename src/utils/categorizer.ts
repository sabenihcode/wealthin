import type { CategoryName } from '../types'

interface PatternRule {
  regex:    RegExp
  category: CategoryName
}

const PATTERNS: PatternRule[] = [
  {
    regex:    /grab|gojek|ojek|bensin|parkir|mrt|krl|busway/i,
    category: 'Transportasi',
  },
  {
    regex:    /makan|resto|warung|kfc|mcd|pizza|sate|nasi|starbucks|kopi|jus/i,
    category: 'Makan & Minum',
  },
  {
    regex:    /shopee|tokopedia|lazada|baju|sepatu|tas|uniqlo|zara/i,
    category: 'Belanja',
  },
  {
    regex:    /apotek|dokter|klinik|obat|vitamin|rs |rumah sakit/i,
    category: 'Kesehatan',
  },
  {
    regex:    /netflix|spotify|game|steam|bioskop|cinema|hiburan/i,
    category: 'Hiburan',
  },
  {
    regex:    /grocery|supermarket|indomaret|alfamart|sayur|buah/i,
    category: 'Makan & Minum',
  },
]

/**
 * Auto-deteksi kategori dari teks transaksi.
 * Fallback ke 'Lainnya' jika tidak ada yang cocok.
 */
export function autoDetectCategory(text: string = ''): CategoryName {
  for (const { regex, category } of PATTERNS) {
    if (regex.test(text)) return category
  }
  return 'Lainnya'
}