/**
 * Type-safe localStorage wrapper dengan error handling.
 */
export function storageGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    const parsed = JSON.parse(raw) as T
    return parsed ?? fallback
  } catch (e) {
    console.warn(`[storage] Gagal membaca "${key}":`, e)
    return fallback
  }
}

export function storageSet<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (e) {
    console.warn(`[storage] Gagal menyimpan "${key}":`, e)
    return false
  }
}

export function storageRemove(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.warn(`[storage] Gagal menghapus "${key}":`, e)
  }
}