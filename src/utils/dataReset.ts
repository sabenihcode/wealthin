import { storageRemove, storageClear } from './storage'

/**
 * Reset semua data aplikasi
 */
export function resetAllData(): void {
  // Clear localStorage
  storageClear()
  
  // Reload aplikasi
  window.location.reload()
}

/**
 * Reset hanya transaksi
 */
export function resetTransactions(): void {
  storageRemove('wealthvibe_transactions')
  window.location.reload()
}

/**
 * Reset hanya goals
 */
export function resetGoals(): void {
  storageRemove('wealthvibe_goals')
  window.location.reload()
}

/**
 * Reset hanya settings
 */
export function resetSettings(): void {
  storageRemove('wealthvibe_budget')
  storageRemove('wealthvibe_username')
  storageRemove('wealthvibe_hide_balance')
  storageRemove('wealthvibe_theme')
  storageRemove('wealthvibe_gemini_key')
  window.location.reload()
}

/**
 * Export aplikasi ke JSON sebelum reset
 */
export function exportDataBeforeReset(): void {
  const data = {
    transactions: localStorage.getItem('wealthvibe_transactions'),
    goals: localStorage.getItem('wealthvibe_goals'),
    budget: localStorage.getItem('wealthvibe_budget'),
    username: localStorage.getItem('wealthvibe_username'),
    exportDate: new Date().toISOString(),
  }

  const dataStr = JSON.stringify(data, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `backup-${Date.now()}.json`
  link.click()
}
