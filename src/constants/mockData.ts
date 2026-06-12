import type {
  Transaction,
  CategorySpending,
  MonthlyTrend,
} from '../types'

export const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id:           '1',
    title:        'Grab Transport',
    category:     'Transportasi',
    amount:       45_000,
    type:         'pengeluaran',
    date:         'Hari ini, 08:30',
    brandColor:   '#10B981',
    brandInitial: 'G',
  },
  {
    id:           '2',
    title:        'Shopee',
    category:     'Belanja',
    amount:       120_000,
    type:         'pengeluaran',
    date:         'Kemarin, 14:20',
    brandColor:   '#FF5722',
    brandInitial: 'S',
  },
  {
    id:           '3',
    title:        'Transfer dari BCA',
    category:     'Pemasukan',
    amount:       2_500_000,
    type:         'pemasukan',
    date:         'Kemarin, 10:15',
    brandColor:   '#0052D9',
    brandInitial: 'B',
  },
  {
    id:           '4',
    title:        'Starbucks',
    category:     'Makan & Minum',
    amount:       65_000,
    type:         'pengeluaran',
    date:         '2 Jun 2025, 09:40',
    brandColor:   '#00704A',
    brandInitial: '★',
  },
]

export const BASE_PEMASUKAN    = 15_000_000
export const BASE_PENGELUARAN  = 8_500_000
export const DEFAULT_BUDGET    = 5_000_000

export const BASE_CATEGORY_SPENDING: CategorySpending = {
  'Makan & Minum': 2_500_000,
  'Transportasi':  1_800_000,
  'Belanja':       1_200_000,
  'Kesehatan':       800_000,
  'Hiburan':         750_000,
  'Lainnya':       1_450_000,
}

export const MONTHLY_TRENDS: MonthlyTrend[] = [
  { label: 'Des 2024', inflow: 14_000_000, outflow: 9_000_000 },
  { label: 'Jan 2025', inflow: 13_000_000, outflow: 8_000_000 },
  { label: 'Feb 2025', inflow: 11_000_000, outflow: 7_500_000 },
  { label: 'Mar 2025', inflow: 15_000_000, outflow: 8_500_000 },
  { label: 'Apr 2025', inflow: 12_000_000, outflow: 8_100_000 },
  { label: 'Mei 2025', inflow: 15_000_000, outflow: 8_500_000 },
]

export const STORAGE_KEY = 'wealthvibe_transactions' as const

export const QUICK_AMOUNTS     = [10_000, 25_000, 50_000] as const
export const PAYMENT_OPTIONS   = ['Cash', 'Debit Card', 'E-Wallet'] as const
export const WATER_TARGET_ML   = 2_000 as const
export const CALORIE_TARGET    = 2_000 as const