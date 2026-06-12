import { Eye, EyeOff } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useTransactions } from '../../hooks/useTransactions'
import { formatIDR } from '../../utils/formatters'

export function BalanceCard(): JSX.Element {
  const { hideBalance, setHideBalance } = useApp()
  const { saldoBersih } = useTransactions()

  return (
    <div className="relative rounded-[28px] p-6 overflow-hidden 
                    bg-slate-900 border border-slate-700/50 
                    shadow-2xl shadow-black/20">
      
      {/* 🌟 AURA EFFECT (Latar belakang gradien neon blur) */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500 rounded-full filter blur-[80px] opacity-40 pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-fuchsia-500 rounded-full filter blur-[80px] opacity-30 pointer-events-none" />

      {/* Konten tetap di atas aura */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-slate-400 text-xs font-bold tracking-wider uppercase">
            Saldo Bersih
          </span>
          <button
            onClick={() => setHideBalance(!hideBalance)}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            aria-label={hideBalance ? 'Tampilkan saldo' : 'Sembunyikan saldo'}
          >
            {hideBalance 
              ? <EyeOff className="w-4 h-4 text-slate-400" /> 
              : <Eye className="w-4 h-4 text-slate-400" />}
          </button>
        </div>

        {/* Amount dengan Gradien Text */}
        <div className="text-3xl md:text-4xl font-extrabold tracking-tight mb-5 
                        bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          {hideBalance ? 'Rp ••••••••' : formatIDR(saldoBersih)}
        </div>

        <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20
                        px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm text-emerald-400">
          <span>↑ 8.6%</span>
          <span className="text-emerald-500/70 font-semibold">dari bulan lalu</span>
        </div>
      </div>
    </div>
  )
}