import type { CategoryName } from '../types'

interface PatternRule {
  regex: RegExp
  category: CategoryName
}

const PATTERNS: PatternRule[] = [
  // Transportasi
  {
    regex: /grab|gojek|ojek|bensin|parkir|mrt|krl|busway|uber|taksi|tol/i,
    category: 'Transportasi',
  },

  // Makan & Minum
  {
    regex: /makan|resto|warung|kfc|mcd|pizza|sate|nasi|starbucks|kopi|jus|cafe|restoran|bakso|soto/i,
    category: 'Makan & Minum',
  },

  // Belanja
  {
    regex: /shopee|tokopedia|lazada|baju|sepatu|tas|uniqlo|zara|h&m|denim|pakaian|beli|shopping/i,
    category: 'Belanja',
  },

  // Kesehatan
  {
    regex: /apotek|dokter|klinik|obat|vitamin|rs |rumah sakit|kesehatan|medis|farmasi|vaksin/i,
    category: 'Kesehatan',
  },

  // Hiburan
  {
    regex: /netflix|spotify|game|steam|bioskop|cinema|hiburan|tiket|konser|musik|film/i,
    category: 'Hiburan',
  },

  // Pendidikan
  {
    regex: /kursus|sekolah|universitas|buku|pelajaran|les|online|training|seminar|workshop|edukasi/i,
    category: 'Pendidikan',
  },

  // Tagihan
  {
    regex: /listrik|air|internet|telepon|langganan|iuran|pajak|angsuran|cicilan|tagihan/i,
    category: 'Tagihan',
  },

  // Grocery (Makan & Minum)
  {
    regex: /grocery|supermarket|indomaret|alfamart|sayur|buah|beras|telur|daging|ikan|belanja makanan/i,
    category: 'Makan & Minum',
  },
]

/**
 * Auto-detect kategori dari teks transaksi.
 * Fallback ke 'Lainnya' jika tidak ada yang cocok.
 *
 * @param text - Deskripsi atau judul transaksi
 * @returns Kategori yang terdeteksi atau 'Lainnya'
 *
 * @example
 * autoDetectCategory('Beli nasi di warung') // => 'Makan & Minum'
 * autoDetectCategory('Bayar listrik bulan ini') // => 'Tagihan'
 * autoDetectCategory('Transfer ke teman') // => 'Lainnya'
 */
export function autoDetectCategory(text: string = ''): CategoryName {
  // Trim dan lowercase untuk matching yang lebih akurat
  const normalizedText = text.toLowerCase().trim()

  // Jika text kosong, return default
  if (!normalizedText) return 'Lainnya'

  // Check setiap pattern
  for (const { regex, category } of PATTERNS) {
    if (regex.test(normalizedText)) {
      return category
    }
  }

  // Default fallback
  return 'Lainnya'
}

/**
 * Suggestion helper - suggest kategori berdasarkan kategori sebelumnya
 */
export function suggestCategory(previousCategory?: CategoryName): CategoryName {
  return previousCategory || 'Lainnya'
}
