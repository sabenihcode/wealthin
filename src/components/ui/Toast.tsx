import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import type { ToastType } from '../../types'

export function Toast(): JSX.Element | null {
  const { toast, hideToast } = useApp()

  if (!toast.visible) return null

  const type: ToastType = toast.type || 'success'

  const config: Record<ToastType, {
    Icon: typeof CheckCircle2
    bgClass: string
    iconClass: string
  }> = {
    success: {
      Icon: CheckCircle2,
      bgClass: 'bg-sage-500/10 border-sage-500/20',
      iconClass: 'text-sage-400 bg-sage-500/10',
    },
    error: {
      Icon: AlertCircle,
      bgClass: 'bg-rose-500/10 border-rose-500/20',
      iconClass: 'text-rose-400 bg-rose-500/10',
    },
    info: {
      Icon: Info,
      bgClass: 'bg-cyan-500/10 border-cyan-500/20',
      iconClass: 'text-cyan-400 bg-cyan-500/10',
    },
    warning: {
      Icon: AlertCircle,
      bgClass: 'bg-amber-500/10 border-amber-500/20',
      iconClass: 'text-amber-400 bg-amber-500/10',
    },
  }

  const { Icon, bgClass, iconClass } = config[type]

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none 
                    flex justify-center px-4 pt-6">
      <div className={`${bgClass} border backdrop-blur-xl
                      rounded-2xl shadow-2xl flex items-center gap-3 
                      p-4 max-w-md w-full pointer-events-auto
                      animate-slide-down`}>

        {/* Icon */}
        <div className={`w-9 h-9 ${iconClass} rounded-xl 
                        flex items-center justify-center shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>

        {/* Message */}
        <p className="text-sm font-semibold text-white flex-1">
          {toast.message}
        </p>

        {/* Close button */}
        <button
          onClick={hideToast}
          className="w-8 h-8 bg-slate-800/50 hover:bg-slate-800 
                     rounded-lg flex items-center justify-center 
                     text-slate-400 hover:text-white transition-all
                     active:scale-95 shrink-0"
          aria-label="Tutup notifikasi"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
