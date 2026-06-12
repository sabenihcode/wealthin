import type { Transaction, CategorySpending, MonthlyTrend } from '../types'

// ── Data Default ──────────────────────────────────────────────────────
export const DEFAULT_TRANSACTIONS: Transaction[] = []

export const STORAGE_KEY = 'wealthvibe_transactions'

export const DEFAULT_BUDGET = 5000000

// ── Base Values (untuk perhitungan hook) ─────────────────────────────
export const BASE_PEMASUKAN   = 15_000_000
export const BASE_PENGELUARAN = 8_500_000

export const BASE_CATEGORY_SPENDING: CategorySpending = {
  'Makan & Minum': 2_500_000,
  'Transportasi':  1_800_000,
  'Belanja':       1_200_000,
  'Kesehatan':       800_000,
  'Hiburan':         750_000,
  'Lainnya':       1_450_000,
}

// ── Tren Bulanan (untuk chart) ──────────────────────────────────────
export const MONTHLY_TRENDS: MonthlyTrend[] = [
  { label: 'Des 2024', inflow: 14_000_000, outflow: 9_000_000 },
  { label: 'Jan 2025', inflow: 13_000_000, outflow: 8_000_000 },
  { label: 'Feb 2025', inflow: 11_000_000, outflow: 7_500_000 },
  { label: 'Mar 2025', inflow: 15_000_000, outflow: 8_500_000 },
  { label: 'Apr 2025', inflow: 12_000_000, outflow: 8_100_000 },
  { label: 'Mei 2025', inflow: 15_000_000, outflow: 8_500_000 },
]

// ── Opsi Form ────────────────────────────────────────────────────────
export const QUICK_AMOUNTS   = [10_000, 25_000, 50_000]
export const PAYMENT_OPTIONS = ['Cash', 'Debit Card', 'E-Wallet']
