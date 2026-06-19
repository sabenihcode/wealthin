import { useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { DEFAULT_CATEGORY_SPENDING } from '../constants/mockData'
import type { CategorySpending, FinancialSummary, Transaction } from '../types'

/**
 * Hook untuk mengelola dan menghitung transaksi
 */
export function useTransactions() {
  const { transactions, addTransaction, deleteTransaction, updateTransaction } = useApp()

  const summary = useMemo<FinancialSummary>(() => {
    const summary: FinancialSummary = {
      totalPemasukan: 0,
      totalPengeluaran: 0,
      saldoBersih: 0,
      categorySpending: { ...DEFAULT_CATEGORY_SPENDING },
      totalKategori: 0,
    }

    transactions.forEach((tx) => {
      if (tx.type === 'pemasukan') {
        summary.totalPemasukan += tx.amount
      } else {
        summary.totalPengeluaran += tx.amount

        // Safely access category spending
        const category = tx.category as keyof CategorySpending
        if (category && category in summary.categorySpending) {
          const current = summary.categorySpending[category]
          summary.categorySpending[category] = (current ?? 0) + tx.amount
        }
      }
    })

    // Calculate total kategori spending
    summary.totalKategori = Object.values(summary.categorySpending).reduce(
      (sum, val) => sum + (val ?? 0),
      0
    )

    // Calculate net balance
    summary.saldoBersih = summary.totalPemasukan - summary.totalPengeluaran

    return summary
  }, [transactions])

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    totalPemasukan: summary.totalPemasukan,
    totalPengeluaran: summary.totalPengeluaran,
    saldoBersih: summary.saldoBersih,
    categorySpending: summary.categorySpending,
    totalKategori: summary.totalKategori,
  }
}

/**
 * Hook untuk transaksi yang sudah difilter
 */
export function useFilteredTransactions(type?: 'pemasukan' | 'pengeluaran') {
  const { transactions } = useApp()

  return useMemo(() => {
    if (!type) return transactions
    return transactions.filter((tx) => tx.type === type)
  }, [transactions, type])
}

/**
 * Hook untuk menghitung statistik kategori
 */
export function useCategoryStats() {
  const { categorySpending, totalKategori } = useTransactions()

  return useMemo(() => {
    const stats: Record<string, { amount: number; percentage: number }> = {}

    Object.entries(categorySpending).forEach(([category, amount]) => {
      stats[category] = {
        amount: amount ?? 0,
        percentage: totalKategori > 0 ? ((amount ?? 0) / totalKategori) * 100 : 0,
      }
    })

    return stats
  }, [categorySpending, totalKategori])
}
