import { useCallback, useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import type { CategorySpending } from '../types'

// ══════════════════════════════════════════════════════════════════════
// TRANSACTION HOOKS
// ══════════════════════════════════════════════════════════════════════

export function useTransactionStats() {
  const { transactions } = useApp()

  return useCallback(() => {
    const stats = {
      totalIncome: 0,
      totalExpense: 0,
      netBalance: 0,
      categorySpending: {} as CategorySpending,
    }

    transactions.forEach(t => {
      if (t.type === 'pemasukan') {
        stats.totalIncome += t.amount
      } else {
        stats.totalExpense += t.amount
        const category = t.category as keyof CategorySpending
        if (category in stats.categorySpending) {
          stats.categorySpending[category] =
            (stats.categorySpending[category] || 0) + t.amount
        } else {
          stats.categorySpending[category] = t.amount
        }
      }
    })

    stats.netBalance = stats.totalIncome - stats.totalExpense
    return stats
  }, [transactions])()
}

export function useRecentTransactions(limit: number = 10) {
  const { transactions } = useApp()
  return transactions.slice(0, limit)
}

// ══════════════════════════════════════════════════════════════════════
// GOAL HOOKS
// ══════════════════════════════════════════════════════════════════════

export function useGoalProgress() {
  const { goals } = useApp()

  return useCallback(() => {
    const stats = {
      totalGoals: goals.length,
      completedGoals: 0,
      totalTarget: 0,
      totalSaved: 0,
      completionRate: 0,
    }

    goals.forEach(g => {
      stats.totalTarget += g.targetAmount
      stats.totalSaved += g.currentAmount

      if (g.currentAmount >= g.targetAmount) {
        stats.completedGoals += 1
      }
    })

    stats.completionRate =
      stats.totalGoals > 0
        ? Math.round((stats.completedGoals / stats.totalGoals) * 100)
        : 0

    return stats
  }, [goals])()
}

export function useGoalsByStatus() {
  const { goals } = useApp()

  return {
    activeGoals: goals.filter(g => g.currentAmount < g.targetAmount),
    completedGoals: goals.filter(g => g.currentAmount >= g.targetAmount),
    overdueGoals: goals.filter(
      g =>
        g.deadline &&
        new Date(g.deadline) < new Date() &&
        g.currentAmount < g.targetAmount
    ),
  }
}

// ══════════════════════════════════════════════════════════════════════
// FILTER & SEARCH HOOKS
// ══════════════════════════════════════════════════════════════════════

export function useFilterTransactions(type?: 'pemasukan' | 'pengeluaran') {
  const { transactions } = useApp()

  return useCallback(() => {
    if (!type) return transactions
    return transactions.filter(t => t.type === type)
  }, [transactions, type])()
}

export function useSearchTransactions(query: string) {
  const { transactions } = useApp()

  return useCallback(() => {
    if (!query.trim()) return transactions

    const lowerQuery = query.toLowerCase()
    return transactions.filter(
      t =>
        t.title.toLowerCase().includes(lowerQuery) ||
        t.category.toLowerCase().includes(lowerQuery)
    )
  }, [transactions, query])()
}

// ══════════════════════════════════════════════════════════════════════
// BUDGET HOOKS
// ══════════════════════════════════════════════════════════════════════

export function useBudgetStatus() {
  const { budget } = useApp()
  const stats = useTransactionStats()

  return {
    limit: budget,
    spent: stats.totalExpense,
    remaining: Math.max(0, budget - stats.totalExpense),
    percentage: budget > 0 ? Math.min(100, (stats.totalExpense / budget) * 100) : 0,
    isOverBudget: stats.totalExpense > budget,
  }
}

// ══════════════════════════════════════════════════════════════════════
// LOCAL STORAGE HOOKS
// ══════════════════════════════════════════════════════════════════════

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    },
    [key, storedValue]
  )

  return [storedValue, setValue] as const
}

// ══════════════════════════════════════════════════════════════════════
// TIMER & DEBOUNCE HOOKS
// ══════════════════════════════════════════════════════════════════════

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true
) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(async () => {
    setStatus('pending')
    setData(null)
    setError(null)

    try {
      const response = await asyncFunction()
      setData(response)
      setStatus('success')
      return response
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      setStatus('error')
    }
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { execute, status, data, error }
}
