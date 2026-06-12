import * as XLSX from 'xlsx'
import type { Transaction } from '../types'

/**
 * Ekspor transaksi ke file .xlsx
 */
export function exportToExcel(transactions: Transaction[]): void {
  // Mapping ke format yang rapi berbahasa Indonesia
  const data = transactions.map(t => ({
    Tanggal:   t.date,
    Judul:     t.title,
    Kategori:  t.category,
    Tipe:      t.type === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran',
    Jumlah:    t.amount,
  }))

  // Buat worksheet & workbook
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Transaksi')

  // Atur lebar kolom agar rapi
  ws['!cols'] = [
    { wch: 20 }, // Tanggal
    { wch: 25 }, // Judul
    { wch: 18 }, // Kategori
    { wch: 14 }, // Tipe
    { wch: 18 }, // Jumlah
  ]

  // Download file
  const fileName = `WealthVibe_${new Date().toISOString().slice(0, 10)}.xlsx`
  XLSX.writeFile(wb, fileName)
}

/**
 * Impor transaksi dari file .xlsx
 * Mengembalikan array Transaction yang siap disimpan
 */
export function importFromExcel(file: File): Promise<Transaction[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer
        const wb = XLSX.read(arrayBuffer, { type: 'array' })
        const wsName = wb.SheetNames[0]
        const ws = wb.Sheets[wsName]

        // Baca sebagai array of objects
        const rawData = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws)

        // Mapping ke format Transaction internal
        const transactions: Transaction[] = rawData.map((row, idx) => {
          const title = String(row['Judul'] ?? row['Title'] ?? 'Imported')
          const type = String(row['Tipe'] ?? row['Type'] ?? 'pengeluaran').toLowerCase()
          
          return {
            id:           `import_${Date.now()}_${idx}`,
            title:        title,
            category:     String(row['Kategori'] ?? row['Category'] ?? 'Lainnya'),
            amount:       Number(row['Jumlah'] ?? row['Amount'] ?? 0),
            type:         type.includes('pemasukan') ? 'pemasukan' : 'pengeluaran',
            date:         String(row['Tanggal'] ?? row['Date'] ?? new Date().toLocaleDateString('id-ID')),
            brandColor:   type.includes('pemasukan') ? '#22C55E' : '#3B82F6',
            brandInitial: title[0].toUpperCase(),
          }
        })

        resolve(transactions)
      } catch (err) {
        reject(new Error('Gagal membaca file Excel. Pastikan formatnya benar.'))
      }
    }

    reader.onerror = () => reject(new Error('Gagal membaca file.'))
    reader.readAsArrayBuffer(file)
  })
}