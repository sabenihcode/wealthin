import { useState } from 'react'
import { X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import type { SavingGoal } from '../../types'

interface AddGoalSheetProps {
  onClose: () => void
}

const EMOJI_OPTIONS = [
  '🎯', '💰', '🏠', '🚗', '✈️', '🎓', 
  '💻', '📱', '🎮', '👗', '💍', '🏋️',
  '🎁', '📚', '🎸', '🏖️'
]

export function AddGoalSheet({ onClose }: AddGoalSheetProps): JSX.Element {
  const { addGoal, showToast } = useApp()

  const [name, setName]           = useState('')
  const [emoji, setEmoji]         = useState('🎯')
  const [targetAmount, setTarget] = useState<number>(0)
  const [deadline, setDeadline]   = useState('')

  const handleSubmit = () => {
    if (!name.trim()) {
      showToast('Kasih nama targetmu dulu!')
      return
    }
    if (targetAmount <= 0) {
      showToast('Masukkan jumlah target yang valid.')
      return
    }

    const newGoal: SavingGoal = {
      id:            Date.now().toString(),
      name:          name.trim(),
      emoji,
      targetAmount,
      currentAmount: 0,
      deadline,
    }

    addGoal(newGoal)
    showToast(`Target "${name}" dibuat! Semangat nabung! 🔥`)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50
                   animate-fade-in"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
        <div className="bg-slate-950 border-t border-slate-800
                        rounded-t-[32px] p-6 max-h-[85vh] overflow-y-auto">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-extrabold text-white">
                Target Baru
              </h3>
              <p className="text-[10px] text-slate-500 font-bold mt-0.5">
                Buat target tabungan impianmu
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 bg-slate-900 hover:bg-slate-800
                         rounded-full flex items-center justify-center
                         text-slate-400 hover:text-sage-400
                         transition-all active:scale-95"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Emoji Picker */}
          <div className="space-y-2 mb-4">
            <label className="text-xs font-bold text-white">
              Pilih Ikon
            </label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map(e => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`w-11 h-11 rounded-xl flex items-center
                             justify-center text-xl transition-all
                    ${emoji === e
                      ? 'bg-sage-500/20 border-2 border-sage-500 scale-110 shadow-lg shadow-sage-500/20'
                      : 'bg-slate-900 border border-slate-800 hover:border-slate-700'}`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Nama Target */}
          <div className="space-y-2 mb-4">
            <label htmlFor="goal-name" className="text-xs font-bold text-white">
              Nama Target
            </label>
            <input
              id="goal-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Contoh: Beli Laptop Baru"
              title="Nama target tabungan"
              className="w-full bg-slate-900 border border-slate-800
                         rounded-2xl py-3 px-4 text-sm font-semibold
                         text-white placeholder-slate-600
                         focus:outline-none focus:border-sage-500/50
                         focus:ring-2 focus:ring-sage-500/20
                         transition-all"
            />
          </div>

          {/* Jumlah Target */}
          <div className="space-y-2 mb-4">
            <label htmlFor="goal-amount" className="text-xs font-bold text-white">
              Jumlah Target
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2
                               text-sage-400 font-bold text-sm">
                Rp
              </span>
              <input
                id="goal-amount"
                type="number"
                value={targetAmount === 0 ? '' : targetAmount}
                onChange={e => setTarget(Number(e.target.value))}
                placeholder="0"
                title="Jumlah target dalam Rupiah"
                className="w-full bg-slate-900 border border-slate-800
                           rounded-2xl py-3 pl-12 pr-4 text-sm font-semibold
                           text-white placeholder-slate-600
                           focus:outline-none focus:border-sage-500/50
                           focus:ring-2 focus:ring-sage-500/20
                           transition-all"
              />
            </div>
          </div>

          {/* Deadline */}
          <div className="space-y-2 mb-6">
            <label htmlFor="goal-deadline" className="text-xs font-bold text-white">
              Deadline <span className="text-slate-600 font-normal">(opsional)</span>
            </label>
            <input
              id="goal-deadline"
              type="date"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              title="Tanggal deadline target"
              placeholder="Pilih tanggal deadline"
              className="w-full bg-slate-900 border border-slate-800
                         rounded-2xl py-3 px-4 text-sm font-semibold
                         text-white focus:outline-none 
                         focus:border-sage-500/50 focus:ring-2 
                         focus:ring-sage-500/20 transition-all"
              style={{ colorScheme: 'dark' }}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-sage-500 to-emerald-500
                       text-white font-bold py-3.5 rounded-2xl text-sm
                       shadow-lg shadow-sage-500/20
                       hover:shadow-sage-500/30
                       hover:from-sage-600 hover:to-emerald-600
                       active:scale-[0.98] transition-all"
          >
            Buat Target 🚀
          </button>

        </div>
      </div>
    </>
  )
}
