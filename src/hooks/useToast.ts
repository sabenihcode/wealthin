import { useApp } from '../context/AppContext'

/** Shortcut hook — ambil showToast tanpa import useApp langsung */
export function useToast(): (message: string) => void {
  return useApp().showToast
}