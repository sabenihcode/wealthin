import { useMemo } from 'react'
import { useApp } from '../context/AppContext'
import {
  BASE_PEMASUKAN,
  BASE_PENGELUARAN,
  BASE_CATEGORY_SPENDING,
} from '../constants/mockData'
import type {
  CategoryName,
  CategorySpending,
  FinancialSummary,
  Transaction,
} from '../types'

export function useTransactions(): FinancialSummary {
  const { transactions } = useApp()

  return useMemo<FinancialSummary>(() => {
    const totalPemasukan = transactions
      .filter((t: Transaction) => t.type === 'pemasukan')
      .reduce((sum: number, t: Transaction) => sum + t.amount, 0)

    const totalPengeluaran = transactions
      .filter((t: Transaction) => t.type === 'pengeluaran')
      .reduce((sum: number, t: Transaction) => sum + t.amount, 0)

    const saldoBersih = totalPemasukan - totalPengeluaran

    // Hitung dari transaksi, fallback ke base jika kosong
    const categorySpending: CategorySpending =
      transactions.length > 0
        ? transactions
            .filter((t: Transaction) => t.type === 'pengeluaran')
            .reduce<CategorySpending>((acc, t) => {
              const cat = t.category as CategoryName
              acc[cat] = (acc[cat] ?? 0) + t.amount
              return acc
            }, {})
        : BASE_CATEGORY_SPENDING

    const totalKategori = Object.values(categorySpending).reduce(
      (sum: number, v: number) => sum + v,
      0
    )

    return {
      transactions,
      totalPemasukan:  totalPemasukan  || BASE_PEMASUKAN,
      totalPengeluaran: totalPengeluaran || BASE_PENGELUARAN,
      saldoBersih,
      categorySpending,
      totalKategori,
    }
  }, [transactions])
}
