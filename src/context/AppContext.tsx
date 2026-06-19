import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import { storageGet, storageSet, storageRemove } from '../utils/storage'
import {
  DEFAULT_TRANSACTIONS,
  STORAGE_KEY,
  DEFAULT_BUDGET,
} from '../constants/mockData'
import type {
  AppContextValue,
  Transaction,
  TabType,
  AnalisisSubTab,
  ModalType,
  ToastState,
  SavingGoal,
} from '../types'

// ══════════════════════════════════════════════════════════════════════
// CONTEXT CREATION
// ══════════════════════════════════════════════════════════════════════
const AppContext = createContext<AppContextValue | null>(null)

interface AppProviderProps {
  children: ReactNode
}

// ══════════════════════════════════════════════════════════════════════
// CONTEXT PROVIDER
// ══════════════════════════════════════════════════════════════════════
export function AppProvider({ children }: AppProviderProps) {

  // ──────────────────────────────────────────────────────────────────
  // TRANSACTIONS STATE
  // ──────────────────────────────────────────────────────────────────
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    storageGet<Transaction[]>(STORAGE_KEY, DEFAULT_TRANSACTIONS)
  )

  useEffect(() => {
    storageSet<Transaction[]>(STORAGE_KEY, transactions)
  }, [transactions])

  const addTransaction = useCallback((tx: Transaction): void => {
    setTransactions(prev => [tx, ...prev])
  }, [])

  const deleteTransaction = useCallback((id: string): void => {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }, [])

  const updateTransaction = useCallback((id: string, updates: Partial<Transaction>): void => {
    setTransactions(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates } : t))
    )
  }, [])

  // ──────────────────────────────────────────────────────────────────
  // SAVING GOALS STATE
  // ──────────────────────────────────────────────────────────────────
  const [goals, setGoals] = useState<SavingGoal[]>(() =>
    storageGet<SavingGoal[]>('wealthvibe_goals', [])
  )

  useEffect(() => {
    storageSet<SavingGoal[]>('wealthvibe_goals', goals)
  }, [goals])

  const addGoal = useCallback((goal: SavingGoal): void => {
    setGoals(prev => [goal, ...prev])
  }, [])

  const fundGoal = useCallback((id: string, amount: number): void => {
    setGoals(prev =>
      prev.map(g =>
        g.id === id
          ? {
              ...g,
              currentAmount: Math.min(
                g.currentAmount + amount,
                g.targetAmount
              ),
            }
          : g
      )
    )
  }, [])

  const updateGoal = useCallback((id: string, updates: Partial<SavingGoal>): void => {
    setGoals(prev =>
      prev.map(g => (g.id === id ? { ...g, ...updates } : g))
    )
  }, [])

  const deleteGoal = useCallback((id: string): void => {
    setGoals(prev => prev.filter(g => g.id !== id))
  }, [])

  // ──────────────────────────────────────────────────────────────────
  // GEMINI API KEY STATE
  // ──────────────────────────────────────────────────────────────────
  const [geminiApiKey, setGeminiApiKeyState] = useState<string>(() =>
    storageGet<string>('wealthvibe_gemini_key', '')
  )

  const setGeminiApiKey = useCallback((key: string): void => {
    setGeminiApiKeyState(key)
    if (key.trim() === '') {
      storageRemove('wealthvibe_gemini_key')
    } else {
      storageSet('wealthvibe_gemini_key', key)
    }
  }, [])

  // ──────────────────────────────────────────────────────────────────
  // USER PROFILE STATE
  // ──────────────────────────────────────────────────────────────────
  const [userName, setUserNameState] = useState<string>(() =>
    storageGet<string>('wealthvibe_username', 'Sabenih')
  )

  const setUserName = useCallback((name: string): void => {
    setUserNameState(name)
    storageSet('wealthvibe_username', name)
  }, [])

  // ──────────────────────────────────────────────────────────────────
  // THEME & APPEARANCE STATE
  // ──────────────────────────────────────────────────────────────────
  const [theme, setThemeState] = useState<'dark' | 'light'>(() =>
    storageGet<'dark' | 'light'>('wealthvibe_theme', 'dark')
  )

  const setTheme = useCallback((t: 'dark' | 'light'): void => {
    setThemeState(t)
    storageSet('wealthvibe_theme', t)
  }, [])

  // ──────────────────────────────────────────────────────────────────
  // BUDGET STATE
  // ──────────────────────────────────────────────────────────────────
  const [budget, setBudgetState] = useState<number>(() =>
    storageGet<number>('wealthvibe_budget', DEFAULT_BUDGET)
  )

  const setBudget = useCallback((amount: number): void => {
    setBudgetState(amount)
    storageSet('wealthvibe_budget', amount)
  }, [])

  // ──────────────────────────────────────────────────────────────────
  // UI STATE - NAVIGATION
  // ──────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<TabType>('beranda')
  const [analisisSubTab, setAnalisisSubTab] = useState<AnalisisSubTab>('Ringkasan')
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [hideBalance, setHideBalance] = useState<boolean>(
    storageGet<boolean>('wealthvibe_hide_balance', false)
  )
  const [activeModal, setActiveModal] = useState<ModalType | null>(null)

  useEffect(() => {
    storageSet('wealthvibe_hide_balance', hideBalance)
  }, [hideBalance])

  // ──────────────────────────────────────────────────────────────────
  // TOAST STATE
  // ──────────────────────────────────────────────────────────────────
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    type: 'success',
  })

  const showToast = useCallback(
    (message: string, type: ToastState['type'] = 'success'): void => {
      setToast({ visible: true, message, type })
      const timer = setTimeout(
        () => setToast({ visible: false, message: '', type: 'success' }),
        3000
      )
      return () => clearTimeout(timer)
    },
    []
  )

  const hideToast = useCallback((): void => {
    setToast({ visible: false, message: '', type: 'success' })
  }, [])

  // ──────────────────────────────────────────────────────────────────
  // LOADING STATE
  // ──────────────────────────────────────────────────────────────────
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // ──────────────────────────────────────────────────────────────────
  // NAVIGATION CALLBACKS
  // ──────────────────────────────────────────────────────────────────
  const goTo = useCallback((tab: TabType): void => {
    setIsAdding(false)
    setActiveTab(tab)
  }, [])

  const openModal = useCallback((name: ModalType): void => {
    setActiveModal(name)
  }, [])

  const closeModal = useCallback((): void => {
    setActiveModal(null)
  }, [])

  // ──────────────────────────────────────────────────────────────────
  // CONTEXT VALUE
  // ──────────────────────────────────────────────────────────────────
  const value: AppContextValue = {
    // Transactions
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,

    // Saving Goals
    goals,
    addGoal,
    fundGoal,
    updateGoal,
    deleteGoal,

    // Settings
    geminiApiKey,
    setGeminiApiKey,
    userName,
    setUserName,
    theme,
    setTheme,
    budget,
    setBudget,

    // UI Navigation
    activeTab,
    setActiveTab,
    goTo,
    analisisSubTab,
    setAnalisisSubTab,
    isAdding,
    setIsAdding,
    hideBalance,
    setHideBalance,
    activeModal,
    openModal,
    closeModal,

    // Toast & Feedback
    toast,
    showToast,
    hideToast,

    // Loading State
    isLoading,
    setIsLoading,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

// ══════════════════════════════════════════════════════════════════════
// CUSTOM HOOK
// ══════════════════════════════════════════════════════════════════════
export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (ctx === null) {
    throw new Error('useApp harus dipakai di dalam <AppProvider>')
  }
  return ctx
}

// ══════════════════════════════════════════════════════════════════════
// HELPER HOOKS (Optional)
// ══════════════════════════════════════════════════════════════════════

/**
 * Hook untuk mengakses hanya state transaksi
 */
export function useTransactions() {
  const { transactions, addTransaction, deleteTransaction, updateTransaction } = useApp()
  return { transactions, addTransaction, deleteTransaction, updateTransaction }
}

/**
 * Hook untuk mengakses hanya state goals
 */
export function useGoals() {
  const { goals, addGoal, fundGoal, updateGoal, deleteGoal } = useApp()
  return { goals, addGoal, fundGoal, updateGoal, deleteGoal }
}

/**
 * Hook untuk mengakses hanya state UI
 */
export function useUI() {
  const {
    activeTab,
    setActiveTab,
    goTo,
    analisisSubTab,
    setAnalisisSubTab,
    isAdding,
    setIsAdding,
    hideBalance,
    setHideBalance,
    activeModal,
    openModal,
    closeModal,
    isLoading,
    setIsLoading,
  } = useApp()

  return {
    activeTab,
    setActiveTab,
    goTo,
    analisisSubTab,
    setAnalisisSubTab,
    isAdding,
    setIsAdding,
    hideBalance,
    setHideBalance,
    activeModal,
    openModal,
    closeModal,
    isLoading,
    setIsLoading,
  }
}

/**
 * Hook untuk mengakses hanya state settings
 */
export function useSettings() {
  const {
    userName,
    setUserName,
    geminiApiKey,
    setGeminiApiKey,
    theme,
    setTheme,
    budget,
    setBudget,
  } = useApp()

  return {
    userName,
    setUserName,
    geminiApiKey,
    setGeminiApiKey,
    theme,
    setTheme,
    budget,
    setBudget,
  }
}

/**
 * Hook untuk toast notifications
 */
export function useToast() {
  const { toast, showToast, hideToast } = useApp()
  return { toast, showToast, hideToast }
}
