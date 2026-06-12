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

const AppContext = createContext<AppContextValue | null>(null)

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {

  // ── Transactions ────────────────────────────────────────────────────
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

  // ── Saving Goals ────────────────────────────────────────────────────
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
          ? { ...g, currentAmount: Math.min(g.currentAmount + amount, g.targetAmount) }
          : g
      )
    )
  }, [])

  const deleteGoal = useCallback((id: string): void => {
    setGoals(prev => prev.filter(g => g.id !== id))
  }, [])

  // ── Gemini API Key ─────────────────────────────────────────────────
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

  // ── User Profile (Nama Pengguna) ────────────────────────────────────
  const [userName, setUserNameState] = useState<string>(() =>
    storageGet<string>('wealthvibe_username', 'Sabenih')
  )

  const setUserName = useCallback((name: string): void => {
    setUserNameState(name)
    storageSet('wealthvibe_username', name)
  }, [])

  // ── UI State ────────────────────────────────────────────────────────
  const [activeTab, setActiveTab]           = useState<TabType>('beranda')
  const [analisisSubTab, setAnalisisSubTab] = useState<AnalisisSubTab>('Ringkasan')
  const [isAdding, setIsAdding]             = useState<boolean>(false)
  const [hideBalance, setHideBalance]       = useState<boolean>(false)
  const [activeModal, setActiveModal]       = useState<ModalType | null>(null)
  const [budget, setBudget]                 = useState<number>(DEFAULT_BUDGET)

  // ── Toast ───────────────────────────────────────────────────────────
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
  })

  const showToast = useCallback((message: string): void => {
    setToast({ visible: true, message })
    setTimeout(() => setToast({ visible: false, message: '' }), 3000)
  }, [])

  // ── Navigation ──────────────────────────────────────────────────────
  const goTo = useCallback((tab: TabType): void => {
    setIsAdding(false)
    setActiveTab(tab)
  }, [])

  const openModal  = useCallback((name: ModalType): void => {
    setActiveModal(name)
  }, [])

  const closeModal = useCallback((): void => {
    setActiveModal(null)
  }, [])

  // ── Context value ───────────────────────────────────────────────────
  const value: AppContextValue = {
    transactions,
    addTransaction,
    deleteTransaction,
    goals,
    addGoal,
    fundGoal,
    deleteGoal,
    geminiApiKey,
    setGeminiApiKey,
    userName,
    setUserName,
    budget,
    setBudget,
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
    toast,
    showToast,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (ctx === null) {
    throw new Error('useApp harus dipakai di dalam <AppProvider>')
  }
  return ctx
}
