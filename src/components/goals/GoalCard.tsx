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
    <div className={`bg-slate-900 border rounded-3xl p-4 relative overflow-hidden
                     transition-all duration-300 hover:scale-[1.02]
                     ${isComplete
                       ? 'border-emerald-500/30'
                       : 'border-slate-800'}`}>
      
      {/* Glow effect kalau complete */}
      {isComplete && (
        <div className="absolute -top-6 -right-6 w-20 h-20 bg-emerald-500
                        rounded-full filter blur-[40px] opacity-20 pointer-events-none" />
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{goal.emoji}</span>
            <div>
              <h4 className="text-sm font-extrabold text-white">{goal.name}</h4>
              {goal.deadline && (
                <p className="text-[10px] text-slate-500 font-bold">
                  Target: {goal.deadline}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleDelete}
            aria-label="Hapus target"
            className="p-1.5 text-slate-700 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-3">
          <div
            className={`h-full rounded-full transition-all duration-700
              ${isComplete
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                : 'bg-gradient-to-r from-fuchsia-500 to-blue-500'}`}
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>

        {/* Amount */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs font-extrabold text-white">
              {formatIDR(goal.currentAmount)}
            </span>
            <span className="text-[10px] text-slate-500 font-bold"> / {formatIDR(goal.targetAmount)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-extrabold px-2 py-1 rounded-full
              ${isComplete
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-fuchsia-500/10 text-fuchsia-400'}`}>
              {pct}%
            </span>
            {!isComplete && (
              <button
                onClick={handleFund}
                className="w-8 h-8 bg-fuchsia-500/10 hover:bg-fuchsia-500/20
                           text-fuchsia-400 rounded-full flex items-center
                           justify-center transition-colors"
                aria-label="Tambah tabungan"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Complete badge */}
        {isComplete && (
          <div className="mt-3 text-center">
            <span className="text-[10px] font-extrabold text-emerald-400
                             bg-emerald-500/10 px-3 py-1.5 rounded-full">
              ✅ Target Tercapai!
            </span>
          </div>
        )}
      </div>
    </div>
  )
}