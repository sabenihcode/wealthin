import type { LucideIcon } from 'lucide-react'

// ══════════════════════════════════════════════════════════════════════
// TRANSACTION TYPES
// ══════════════════════════════════════════════════════════════════════

export type TransactionType = 'pemasukan' | 'pengeluaran'

export interface Transaction {
  id: string
  title: string
  category: string
  amount: number
  type: TransactionType
  date: string
  brandColor: string
  brandInitial: string
  note?: string
  payment?: string
  receipt?: string | null
}

// ══════════════════════════════════════════════════════════════════════
// CATEGORY TYPES
// ══════════════════════════════════════════════════════════════════════

export interface CategoryConfig {
  color: string
  activeBg: string
  icon: LucideIcon
  fill: string
}

export type CategoryName =
  | 'Makan & Minum'
  | 'Transportasi'
  | 'Belanja'
  | 'Kesehatan'
  | 'Hiburan'
  | 'Pendidikan'
  | 'Tagihan'
  | 'Lainnya'

export type CategoriesConfig = Record<CategoryName, CategoryConfig>
export type CategorySpending = Partial<Record<CategoryName, number>>

// ══════════════════════════════════════════════════════════════════════
// GOAL TYPES
// ══════════════════════════════════════════════════════════════════════

export interface SavingGoal {
  id: string
  name: string
  emoji: string
  targetAmount: number
  currentAmount: number
  deadline: string
  createdAt?: string
  updatedAt?: string
}

// ══════════════════════════════════════════════════════════════════════
// TREND TYPES
// ══════════════════════════════════════════════════════════════════════

export interface MonthlyTrend {
  label: string
  inflow: number
  outflow: number
  date?: string
}

export interface DailyTrend {
  date: string
  inflow: number
  outflow: number
  net: number
}

// ══════════════════════════════════════════════════════════════════════
// CHART TYPES
// ══════════════════════════════════════════════════════════════════════

export interface DonutSegment {
  color: string
  percentage: number
  offset: number
  label: string
}

export interface ChartSegment {
  color: string
  percentage: number
  offset: number
  label: string
}

export interface GridLine {
  top: number
  label: string
}

// ══════════════════════════════════════════════════════════════════════
// MODAL TYPES
// ══════════════════════════════════════════════════════════════════════

export type ModalType =
  | 'metode'
  | 'kategori'
  | 'laporan'
  | 'anggaran'
  | 'keluar'
  | 'notifikasi'

// ══════════════════════════════════════════════════════════════════════
// NAVIGATION TYPES
// ══════════════════════════════════════════════════════════════════════

export type TabType = 'beranda' | 'transaksi' | 'analisis' | 'akun' | 'tambah'

export type AnalisisSubTab =
  | 'Ringkasan'
  | 'Pemasukan'
  | 'Pengeluaran'
  | 'Kategori'
  | 'Tren'

// ══════════════════════════════════════════════════════════════════════
// NOTIFICATION & FEEDBACK TYPES
// ══════════════════════════════════════════════════════════════════════

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastState {
  visible: boolean
  message: string
  type?: ToastType
  duration?: number
}

export interface Notification {
  id: string
  title: string
  message: string
  type: ToastType
  timestamp: number
  read: boolean
}

// ══════════════════════════════════════════════════════════════════════
// FINANCIAL SUMMARY TYPES
// ══════════════════════════════════════════════════════════════════════

export interface FinancialSummary {
  totalPemasukan: number
  totalPengeluaran: number
  saldoBersih: number
  categorySpending: CategorySpending
  totalKategori: number
}

export interface MonthlyComparison {
  currentMonth: FinancialSummary
  previousMonth: FinancialSummary
  percentageChange: {
    income: number
    expense: number
    net: number
  }
}

// ══════════════════════════════════════════════════════════════════════
// FORM TYPES
// ══════════════════════════════════════════════════════════════════════

export interface TransactionForm {
  type: TransactionType
  amount: number
  category: CategoryName
  date: string
  payment: string
  note: string
  receipt: string | null
}

export interface BudgetForm {
  category: CategoryName
  limit: number
  alert: number
}

// ══════════════════════════════════════════════════════════════════════
// UI COMPONENT TYPES
// ══════════════════════════════════════════════════════════════════════

export interface MenuItem {
  key: ModalType | null
  label: string
  sub: string
  Icon: LucideIcon
  bg: string
}

export interface NavItem {
  key: TabType | 'transaksi'
  label: string | null
  Icon: LucideIcon
  isFAB?: boolean
}

// ══════════════════════════════════════════════════════════════════════
// API & EXTERNAL SERVICE TYPES
// ══════════════════════════════════════════════════════════════════════

export interface GeminiResponse {
  text: string
  timestamp: number
}

export interface AIAnalysis {
  summary: string
  insights: string[]
  recommendations: string[]
}

// ══════════════════════════════════════════════════════════════════════
// STORAGE & PERSISTENCE TYPES
// ══════════════════════════════════════════════════════════════════════

export interface StorageData {
  transactions: Transaction[]
  goals: SavingGoal[]
  budget: number
  userName: string
  hideBalance: boolean
  theme: 'dark' | 'light'
}

// ══════════════════════════════════════════════════════════════════════
// CONTEXT VALUE TYPE
// ══════════════════════════════════════════════════════════════════════

export interface AppContextValue {
  // ─── Transactions ───────────────────────────────────────────────
  transactions: Transaction[]
  addTransaction: (tx: Transaction) => void
  deleteTransaction: (id: string) => void
  updateTransaction: (id: string, updates: Partial<Transaction>) => void

  // ─── Saving Goals ───────────────────────────────────────────────
  goals: SavingGoal[]
  addGoal: (goal: SavingGoal) => void
  fundGoal: (id: string, amount: number) => void
  updateGoal: (id: string, updates: Partial<SavingGoal>) => void
  deleteGoal: (id: string) => void

  // ─── Settings & User ────────────────────────────────────────────
  geminiApiKey: string
  setGeminiApiKey: (key: string) => void
  userName: string
  setUserName: (name: string) => void
  theme: 'dark' | 'light'
  setTheme: (theme: 'dark' | 'light') => void
  budget: number
  setBudget: (amount: number) => void

  // ─── UI Navigation ──────────────────────────────────────────────
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
  goTo: (tab: TabType) => void
  analisisSubTab: AnalisisSubTab
  setAnalisisSubTab: (sub: AnalisisSubTab) => void
  isAdding: boolean
  setIsAdding: (v: boolean) => void
  hideBalance: boolean
  setHideBalance: (v: boolean) => void
  activeModal: ModalType | null
  openModal: (name: ModalType) => void
  closeModal: () => void

  // ─── Toast & Feedback ───────────────────────────────────────────
  toast: ToastState
  showToast: (message: string, type?: ToastType) => void
  hideToast: () => void

  // ─── Loading State ──────────────────────────────────────────────
  isLoading: boolean
  setIsLoading: (v: boolean) => void
}
