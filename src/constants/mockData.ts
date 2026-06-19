import type { Transaction, CategorySpending, MonthlyTrend } from '../types'

// ══════════════════════════════════════════════════════════════════════
// STORAGE & BUDGET
// ══════════════════════════════════════════════════════════════════════

export const STORAGE_KEY = 'wealthvibe_transactions'
export const DEFAULT_BUDGET = 5000000

// ══════════════════════════════════════════════════════════════════════
// DEFAULT TRANSACTIONS
// ══════════════════════════════════════════════════════════════════════

export const DEFAULT_TRANSACTIONS: Transaction[] = []

// ══════════════════════════════════════════════════════════════════════
// DEFAULT CATEGORY SPENDING
// ══════════════════════════════════════════════════════════════════════

export const DEFAULT_CATEGORY_SPENDING: CategorySpending = {
  'Makan & Minum': 35000,
  'Transportasi': 100000,
  'Belanja': 250000,
  'Kesehatan': 150000,
  'Hiburan': 60000,
  'Pendidikan': 200000,
  'Tagihan': 50000,
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
  { label: 'Jan', inflow: 5000000, outflow: 3500000, date: '2024-01-01' },
  { label: 'Feb', inflow: 5500000, outflow: 4000000, date: '2024-02-01' },
  { label: 'Mar', inflow: 6000000, outflow: 4200000, date: '2024-03-01' },
  { label: 'Apr', inflow: 5800000, outflow: 4500000, date: '2024-04-01' },
  { label: 'Mei', inflow: 6200000, outflow: 4000000, date: '2024-05-01' },
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

export const DEMO_GOALS = [
  {
    id: 'demo-1',
    name: 'Liburan ke Bali',
    emoji: '✈️',
    targetAmount: 5000000,
    currentAmount: 2500000,
    deadline: '2024-06-30',
  },
  {
    id: 'demo-2',
    name: 'Beli Laptop Baru',
    emoji: '💻',
    targetAmount: 10000000,
    currentAmount: 7000000,
    deadline: '2024-08-31',
  },
  {
    id: 'demo-3',
    name: 'Emergency Fund',
    emoji: '🏦',
    targetAmount: 20000000,
    currentAmount: 15000000,
    deadline: '2024-12-31',
  },
]

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
