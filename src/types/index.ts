import type { LucideIcon } from 'lucide-react'

// ── Transaksi ────────────────────────────────────────────────────────
export type TransactionType = 'pemasukan' | 'pengeluaran'

export interface Transaction {
  id:           string
  title:        string
  category:     string
  amount:       number
  type:         TransactionType
  date:         string
  brandColor:   string
  brandInitial: string
}

// ── Kategori ─────────────────────────────────────────────────────────
export interface CategoryConfig {
  color:    string
  activeBg: string
  icon:     LucideIcon
  fill:     string
}

export type CategoryName =
  | 'Makan & Minum'
  | 'Transportasi'
  | 'Belanja'
  | 'Kesehatan'
  | 'Hiburan'
  | 'Lainnya'

export type CategoriesConfig = Record<CategoryName, CategoryConfig>
export type CategorySpending = Record<CategoryName, number>

// ── Tren Bulanan ──────────────────────────────────────────────────────
export interface MonthlyTrend {
  label:   string
  inflow:  number
  outflow: number
}

// ── Saving Goal ──────────────────────────────────────────────────────
export interface SavingGoal {
  id:            string
  name:          string
  emoji:         string
  targetAmount:  number
  currentAmount: number
  deadline:      string
}

// ── Modal ─────────────────────────────────────────────────────────────
export type ModalType =
  | 'metode'
  | 'kategori'
  | 'laporan'
  | 'anggaran'
  | 'keluar'
  | 'notifikasi'

// ── Tab Navigasi ──────────────────────────────────────────────────────
export type TabType = 'beranda' | 'transaksi' | 'analisis' | 'akun' | 'tambah'

export type AnalisisSubTab =
  | 'Ringkasan'
  | 'Pemasukan'
  | 'Pengeluaran'
  | 'Kategori'
  | 'Tren'

// ── Toast ─────────────────────────────────────────────────────────────
export interface ToastState {
  visible: boolean
  message: string
}

// ── Context ───────────────────────────────────────────────────────────
export interface AppContextValue {
  // data transaksi
  transactions:      Transaction[]
  addTransaction:    (tx: Transaction) => void
  deleteTransaction: (id: string) => void
  // saving goals
  goals:             SavingGoal[]
  addGoal:           (goal: SavingGoal) => void
  fundGoal:          (id: string, amount: number) => void
  deleteGoal:        (id: string) => void
  // gemini ai
  geminiApiKey:      string
  setGeminiApiKey:   (key: string) => void
  // user profile
  userName:          string
  setUserName:       (name: string) => void
  // budget
  budget:            number
  setBudget:         (n: number) => void
  // ui navigation
  activeTab:         TabType
  setActiveTab:      (tab: TabType) => void
  goTo:              (tab: TabType) => void
  analisisSubTab:    AnalisisSubTab
  setAnalisisSubTab: (sub: AnalisisSubTab) => void
  isAdding:          boolean
  setIsAdding:       (v: boolean) => void
  hideBalance:       boolean
  setHideBalance:    (v: boolean) => void
  activeModal:       ModalType | null
  openModal:         (name: ModalType) => void
  closeModal:        () => void
  // toast
  toast:             ToastState
  showToast:         (message: string) => void
}

// ── Form tambah transaksi ─────────────────────────────────────────────
export interface TransactionForm {
  type:    TransactionType
  amount:  number
  cat:     CategoryName
  date:    string
  payment: string
  note:    string
  receipt: string | null
}

// ── Menu item (Akun page) ─────────────────────────────────────────────
export interface MenuItem {
  key:   ModalType | null
  label: string
  sub:   string
  Icon:  LucideIcon
  bg:    string
}

// ── Nav item (Bottom nav) ─────────────────────────────────────────────
export interface NavItem {
  key:   TabType | 'transaksi'
  label: string | null
  Icon:  LucideIcon
  isFAB?: boolean
}

// ── Donut segment ─────────────────────────────────────────────────────
export interface DonutSegment {
  color:  string
  pct:    number
  offset: number
}

// ── Bar chart grid line ───────────────────────────────────────────────
export interface GridLine {
  top:   number
  label: string
}
