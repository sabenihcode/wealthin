import type { Transaction } from '../types'

export const STORAGE_KEY = 'wealthvibe_transactions'

// Data dummy sudah dihapus, aplikasi mulai dari nol
export const DEFAULT_TRANSACTIONS: Transaction[] = []

export const DEFAULT_BUDGET = 5000000

export const QUICK_AMOUNTS = [
  5000,
  10000,
  25000,
  50000,
]

export const PAYMENT_OPTIONS = [
  'Cash',
  'Debit BCA',
  'GoPay',
  'OVO',
  'ShopeePay',
  'DANA',
]
