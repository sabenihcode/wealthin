import type { Transaction, CategorySpending, MonthlyTrend } from '../types'

// ══════════════════════════════════════════════════════════════════════
// STORAGE & BUDGET
// ══════════════════════════════════════════════════════════════════════

export const STORAGE_KEY = 'wealthvibe_transactions'
export const DEFAULT_BUDGET = 0

// ══════════════════════════════════════════════════════════════════════
// DEFAULT TRANSACTIONS
// ══════════════════════════════════════════════════════════════════════

export const DEFAULT_TRANSACTIONS: Transaction[] = []

// ══════════════════════════════════════════════════════════════════════
// DEFAULT CATEGORY SPENDING
// ══════════════════════════════════════════════════════════════════════

export const DEFAULT_CATEGORY_SPENDING: CategorySpending = {
  'Makan & Minum': 0,
  'Transportasi': 0,
  'Belanja': 0,
  'Kesehatan': 0,
  'Hiburan': 0,
  'Pendidikan': 0,
  'Tagihan': 0,
  'Lainnya': 0,
}

// ══════════════════════════════════════════════════════════════════════
// QUICK AMOUNTS FOR ADD TRANSACTION
// ══════════════════════════════════════════════════════════════════════

export const QUICK_AMOUNTS = [
  10_000,   // 10K
  20_000,   // 20K
  50_000,   // 50K
  100_000,  // 100K
]

// ══════════════════════════════════════════════════════════════════════
// PAYMENT OPTIONS
// ══════════════════════════════════════════════════════════════════════

export const PAYMENT_OPTIONS = [
  'Cash',
  'Debit Card',
  'Credit Card',
  'E-Wallet',
  'Transfer Bank',
  'Lainnya',
]

// ══════════════════════════════════════════════════════════════════════
// MONTHLY TRENDS (Mock Data)
// ══════════════════════════════════════════════════════════════════════

export const MONTHLY_TRENDS: MonthlyTrend[] = [
  { label: 'Jun', inflow: 6500000, outflow: 4300000, date: '2024-06-01' },
]

// ══════════════════════════════════════════════════════════════════════
// NOTIFICATION TEMPLATES
// ══════════════════════════════════════════════════════════════════════

export const NOTIFICATION_TEMPLATES = {
  budgetWarning: (category: string, percentage: number) =>
    `Pengeluaran ${category} mencapai ${percentage}% dari budget`,
  
  goalReached: (goalName: string) =>
    `Selamat! Target "${goalName}" sudah tercapai 🎉`,
  
  largeTransaction: (amount: number) =>
    `Transaksi besar terdeteksi: Rp ${amount.toLocaleString('id-ID')}`,
  
  dailySpending: (amount: number) =>
    `Pengeluaran hari ini: Rp ${amount.toLocaleString('id-ID')}`,
}

// ══════════════════════════════════════════════════════════════════════
// DEMO / TUTORIAL DATA
// ══════════════════════════════════════════════════════════════════════

export const DEMO_GOALS = []

// ══════════════════════════════════════════════════════════════════════
// VALIDATION CONSTANTS
// ══════════════════════════════════════════════════════════════════════

export const CONSTRAINTS = {
  MIN_TRANSACTION_AMOUNT: 1000,
  MAX_TRANSACTION_AMOUNT: 1000000000,
  MIN_GOAL_TARGET: 10000,
  MAX_GOAL_TARGET: 999999999999,
  MIN_USERNAME_LENGTH: 1,
  MAX_USERNAME_LENGTH: 50,
  MAX_NOTE_LENGTH: 200,
  TRANSACTION_HISTORY_LIMIT: 100,
}

// ══════════════════════════════════════════════════════════════════════
// ANIMATION & TIMING
// ══════════════════════════════════════════════════════════════════════

export const TIMING = {
  TOAST_DURATION: 3000,
  DEBOUNCE_DELAY: 300,
  ANIMATION_DURATION: 300,
  CHART_ANIMATION_DURATION: 700,
}
