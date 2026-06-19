/**
 * Utility functions untuk local storage management
 */

/**
 * Get value dari localStorage dengan fallback ke default
 */
export function storageGet<T>(key: string, defaultValue: T): T {
  try {
    const item = window.localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : defaultValue
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error)
    return defaultValue
  }
}

/**
 * Set value ke localStorage
 */
export function storageSet<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error)
  }
}

/**
 * Remove value dari localStorage
 */
export function storageRemove(key: string): void {
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error)
  }
}

/**
 * Clear semua localStorage
 */
export function storageClear(): void {
  try {
    window.localStorage.clear()
  } catch (error) {
    console.error('Error clearing localStorage:', error)
  }
}

/**
 * Get all keys from localStorage
 */
export function storageKeys(): string[] {
  try {
    return Object.keys(window.localStorage)
  } catch (error) {
    console.error('Error getting localStorage keys:', error)
    return []
  }
}

/**
 * Export all data
 */
export function storageExport(): Record<string, unknown> {
  try {
    const data: Record<string, unknown> = {}
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i)
      if (key) {
        const item = window.localStorage.getItem(key)
        if (item) {
          try {
            data[key] = JSON.parse(item)
          } catch {
            data[key] = item
          }
        }
      }
    }
    return data
  } catch (error) {
    console.error('Error exporting localStorage:', error)
    return {}
  }
}
