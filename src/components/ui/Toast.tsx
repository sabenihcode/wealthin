import { CheckCircle2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export function Toast(): JSX.Element | null {
  const { toast } = useApp()
  if (!toast.visible) return null

  return (
    <div className="absolute top-14 left-4 right-4 bg-slate-900
                    text-white px-4 py-3 rounded-2xl shadow-xl
                    flex items-center gap-2.5 z-50 animate-bounce">
      <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
      <span className="text-xs font-semibold">{toast.message}</span>
    </div>
  )
}
