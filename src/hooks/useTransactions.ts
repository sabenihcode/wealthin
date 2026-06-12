import { useMemo } from 'react'
import { useApp } from '../context/AppContext'
import {
  BASE_PEMASUKAN,
  BASE_PENGELUARAN,
  BASE_CATEGORY_SPENDING,
} from '../constants/mockData'
import type {
  Transaction,
  FinancialSummary,
  CategorySpending,
  CategoryName,
} from '../types'

interface UseTransactionsReturn extends FinancialSummary {
  transactions:      Transaction[]
  addTransaction:    (tx: Transaction) => void
  deleteTransaction: (id: string) => void
}

export function useTransactions(): UseTransactionsReturn {
  const { transactions, addTransaction, deleteTransaction } = useApp()

  const summary = useMemo<FinancialSummary>(() => {
    const totalPemasukan =
      BASE_PEMASUKAN +
      transactions
        .filter(t => t.type === 'pemasukan')
        .reduce((s, t) => s + t.amount, 0)

    const totalPengeluaran =
      BASE_PENGELUARAN +
      transactions
        .filter(t => t.type === 'pengeluaran')
        .reduce((s, t) => s + t.amount, 0)

    const saldoBersih = totalPemasukan - totalPengeluaran

    // Deep copy agar BASE tidak termutasi
    const categorySpending: CategorySpending = {
      ...BASE_CATEGORY_SPENDING,
    }

    transactions.forEach(t => {
      if (t.type !== 'pengeluaran') return
      const cat = (t.category ?? 'Lainnya') as CategoryName
      if (cat in categorySpending) {
        categorySpending[cat] += t.amount
      } else {
        categorySpending['Lainnya'] += t.amount
      }
    })

    const totalKategori = Object.values(categorySpending)
      .reduce((a, b) => a + b, 0)

    return {
      totalPemasukan,
      totalPengeluaran,
      saldoBersih,
      categorySpending,
      totalKategori,
    }
  }, [transactions])

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    ...summary,
  }
}