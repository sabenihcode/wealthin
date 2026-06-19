import { Trash2, Plus } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { formatIDR } from '../../utils/formatters'
import type { SavingGoal } from '../../types'

interface GoalCardProps {
  goal: SavingGoal
}

export function GoalCard({ goal }: GoalCardProps): JSX.Element {
  const { fundGoal, deleteGoal, showToast } = useApp()
  const pct = Math.round((goal.currentAmount / goal.targetAmount) * 100)
  const isComplete = pct >= 100

  const handleFund = () => {
    const input = window.prompt('Tambah tabungan (Rp):')
    if (input === null || isNaN(Number(input)) || Number(input) <= 0) {
      showToast('Masukkan jumlah yang valid.')
      return
    }
    fundGoal(goal.id, Number(input))
    showToast(`+${formatIDR(Number(input))} ditambahkan ke ${goal.name}! 🎉`)
  }

  const handleDelete = () => {
    const confirm = window.confirm(`Hapus target "${goal.name}"?`)
    if (confirm) {
      deleteGoal(goal.id)
      showToast('Target dihapus.')
    }
  }

  return (
    <div className={`bg-slate-900 border rounded-3xl p-4 
                     relative overflow-hidden
                     transition-all duration-300 hover:scale-[1.02]
                     ${isComplete
                       ? 'border-sage-500/30 hover:border-sage-500/40'
                       : 'border-slate-800 hover:border-slate-700'}`}>
      
      {/* Glow effect kalau complete */}
      {isComplete && (
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-sage-500
                        rounded-full filter blur-[50px] opacity-20 
                        pointer-events-none animate-pulse" />
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-11 h-11 rounded-2xl flex items-center 
                            justify-center text-2xl transition-all
              ${isComplete 
                ? 'bg-sage-500/10 scale-110' 
                : 'bg-slate-800'}`}>
              {goal.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-extrabold text-white truncate">
                {goal.name}
              </h4>
              {goal.deadline && (
                <p className="text-[10px] text-slate-500 font-bold mt-0.5">
                  🗓️ {new Date(goal.deadline).toLocaleDateString('id-ID', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleDelete}
            aria-label="Hapus target"
            className="p-1.5 text-slate-600 hover:text-rose-400 
                       transition-colors active:scale-95"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-slate-800 rounded-full 
                        overflow-hidden mb-3 relative">
          <div
            className={`h-full rounded-full transition-all duration-700
              ${isComplete
                ? 'bg-gradient-to-r from-sage-500 to-emerald-500 shadow-lg shadow-sage-500/30'
                : 'bg-gradient-to-r from-sage-600 to-sage-500'}`}
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>

        {/* Amount */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm font-extrabold text-white">
              {formatIDR(goal.currentAmount)}
            </span>
            <span className="text-[10px] text-slate-500 font-bold">
              {' '}/{' '}{formatIDR(goal.targetAmount)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-extrabold px-2.5 py-1 
                             rounded-full
              ${isComplete
                ? 'bg-sage-500/10 text-sage-400'
                : 'bg-slate-800 text-slate-400'}`}>
              {pct}%
            </span>
            {!isComplete && (
              <button
                onClick={handleFund}
                className="w-8 h-8 bg-sage-500/10 hover:bg-sage-500/20
                           text-sage-400 rounded-full flex items-center
                           justify-center transition-all active:scale-95
                           shadow-sm hover:shadow-sage-500/20"
                aria-label="Tambah tabungan"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Complete badge */}
        {isComplete && (
          <div className="mt-3 bg-sage-500/10 border border-sage-500/20 
                          rounded-2xl p-2.5 text-center animate-fade-in">
            <span className="text-xs font-extrabold text-sage-400 
                             flex items-center justify-center gap-1.5">
              ✨ Target Tercapai! 🎉
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
