import type { Transaction, CategorySpending, MonthlyTrend } from '../types'

// ── Data Default ──────────────────────────────────────────────────────
export const DEFAULT_TRANSACTIONS: Transaction[] = []

export const STORAGE_KEY = 'wealthvibe_transactions'

export const DEFAULT_BUDGET = 0 // Mulai dari 0

export const BASE_CATEGORY_SPENDING: CategorySpending = {
  'Makan & Minum': 0,
  'Transportasi':  0,
  'Belanja':       0,
  'Kesehatan':     0,
  'Hiburan':       0,
  'Lainnya':       0,
}

export const MONTHLY_TRENDS: MonthlyTrend[] = [
  { label: 'Jan', inflow: 0, outflow: 0 },
  { label: 'Feb', inflow: 0, outflow: 0 },
  { label: 'Mar', inflow: 0, outflow: 0 },
  { label: 'Apr', inflow: 0, outflow: 0 },
  { label: 'Mei', inflow: 0, outflow: 0 },
  { label: 'Jun', inflow: 0, outflow: 0 },
]

export const QUICK_AMOUNTS   = [10_000, 25_000, 50_000]
export const PAYMENT_OPTIONS = ['Cash', 'Debit Card', 'E-Wallet']
