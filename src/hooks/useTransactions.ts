import { useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { BASE_CATEGORY_SPENDING } from '../constants/mockData'
import type { CategoryName, CategorySpending, Transaction } from '../types'

export function useTransactions() {
  const { transactions, addTransaction, deleteTransaction } = useApp()

  const summary = useMemo(() => {
    const totalPemasukan = transactions
      .filter((t: Transaction) => t.type === 'pemasukan')
      .reduce((s: number, t: Transaction) => s + t.amount, 0)

    const totalPengeluaran = transactions
      .filter((t: Transaction) => t.type === 'pengeluaran')
      .reduce((s: number, t: Transaction) => s + t.amount, 0)

    const saldoBersih = totalPemasukan - totalPengeluaran

    // Clone object agar tidak mutasi data asli
    const categorySpending: CategorySpending = { ...BASE_CATEGORY_SPENDING }

    transactions.forEach((t: Transaction) => {
      if (t.type === 'pengeluaran') {
        const cat = (t.category || 'Lainnya') as CategoryName
        if (cat in categorySpending) {
          categorySpending[cat] += t.amount
        } else {
          categorySpending['Lainnya'] += t.amount
        }
      }
    })

    const totalKategori = Object.values(categorySpending).reduce((a: number, b: number) => a + b, 0)

    return { totalPemasukan, totalPengeluaran, saldoBersih, categorySpending, totalKategori }
  }, [transactions])

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    ...summary
  }
}
