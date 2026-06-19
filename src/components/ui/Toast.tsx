import { CheckCircle2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export function Toast(): JSX.Element | null {
  const { toast } = useApp()
  if (!toast.visible) return null

  return (
    <div className="absolute top-14 left-4 right-4 
                    bg-slate-900 border border-sage-500/20
                    text-white px-4 py-3 rounded-2xl 
                    shadow-xl shadow-sage-500/10
                    flex items-center gap-2.5 z-50 
                    animate-slide-up">
      <div className="w-8 h-8 bg-sage-500/10 rounded-full 
                      flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-5 h-5 text-sage-400" />
      </div>
      <span className="text-xs font-semibold flex-1">{toast.message}</span>
    </div>
  )
}
