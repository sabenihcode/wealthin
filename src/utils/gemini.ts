import { GoogleGenerativeAI } from '@google/generative-ai'
import type { FinancialSummary } from '../types'

/**
 * Membuat insight keuangan menggunakan Gemini API
 */
export async function getAiInsight(
  apiKey: string,
  summary: FinancialSummary
): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey)

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
  })

  const prompt = `
Kamu adalah "Vibe", AI asisten keuangan Gen Z di dalam aplikasi WealthVibe.
Gayamu: santai, friendly, pakai bahasa Indonesia gaul (tapi tetap jelas),
gunakan emoji yang relevan, dan berikan saran yang actionable (bisa langsung dieksekusi).

Berikut data keuangan pengguna bulan ini:
- Total Pemasukan: Rp ${summary.totalPemasukan.toLocaleString('id-ID')}
- Total Pengeluaran: Rp ${summary.totalPengeluaran.toLocaleString('id-ID')}
- Saldo Bersih: Rp ${summary.saldoBersih.toLocaleString('id-ID')}
- Pengeluaran per Kategori:
${Object.entries(summary.categorySpending)
  .map(([cat, amt]) => `  • ${cat}: Rp ${amt.toLocaleString('id-ID')}`)
  .join('\n')}

Tugasmu:
1. Berikan analisis singkat (2-3 kalimat) tentang kesehatan keuangan mereka.
2. Sebutkan 1 kategori yang paling "boros" dan kasih tips hemat yang spesifik.
3. Berikan 1 saran action langsung yang bisa dilakukan bulan depan.

Format jawaban:
🎯 **Analisis**
(isi analisis)

💡 **Tips Hemat**
(isi tips)

🚀 **Action Bulan Depan**
(isi saran)
`.trim()

  try {
    const result = await model.generateContent(prompt)
    const response = result.response
    return response.text()
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    
    if (msg.includes('API_KEY_INVALID') || msg.includes('401')) {
      throw new Error('API Key tidak valid. Cek lagi di halaman Akun ya!')
    }
    if (msg.includes('QUOTA_EXCEEDED') || msg.includes('429')) {
      throw new Error('Kuota API habis. Coba lagi nanti ya!')
    }
    throw new Error('Gagal menghubungi AI. Coba lagi nanti.')
  }
}