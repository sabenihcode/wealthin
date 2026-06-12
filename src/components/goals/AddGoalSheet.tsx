import { useState } from 'react'
import { X } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import type { SavingGoal } from '../../types'

interface AddGoalSheetProps {
  onClose: () => void
}

const EMOJI_OPTIONS = ['🎮', '📱', '💻', '✈️', '🏠', '🚗', '👗', '🎓', '💰', '🎁', '💍', '🏋️']

export function AddGoalSheet({ onClose }: AddGoalSheetProps): JSX.Element {
  const { addGoal, showToast } = useApp()

  const [name, setName]           = useState('')
  const [emoji, setEmoji]         = useState('💰')
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50
                    flex flex-col justify-end">
      <div className="bg-slate-950 border-t border-slate-800
                      rounded-t-[32px] p-6 animate-slide-up">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-extrabold text-white">
            Target Baru 🎯
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-slate-900 hover:bg-slate-800
                       rounded-full flex items-center justify-center
                       text-slate-400 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Emoji Picker */}
        <div className="space-y-2 mb-4">
          <label className="text-xs font-bold text-slate-400">Pilih Ikon</label>
          <div className="flex flex-wrap gap-2">
            {EMOJI_OPTIONS.map(e => (
              <button
                key={e}
                type="button"
                onClick={() => setEmoji(e)}
                className={`w-10 h-10 rounded-xl flex items-center
                           justify-center text-lg transition-all
                  ${emoji === e
                    ? 'bg-fuchsia-500/20 border border-fuchsia-500/50 scale-110'
                    : 'bg-slate-900 border border-slate-800 hover:border-slate-700'}`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Nama Target */}
        <div className="space-y-2 mb-4">
          <label htmlFor="goal-name" className="text-xs font-bold text-slate-400">
            Nama Target
          </label>
          <input
            id="goal-name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Contoh: Beli PS5"
            title="Nama target tabungan"
            className="w-full bg-slate-900 border border-slate-800
                       rounded-xl py-3 px-4 text-xs font-semibold
                       text-white placeholder-slate-700
                       focus:outline-none focus:border-fuchsia-500/50"
          />
        </div>

        {/* Jumlah Target */}
        <div className="space-y-2 mb-4">
          <label htmlFor="goal-amount" className="text-xs font-bold text-slate-400">
            Jumlah Target (Rp)
          </label>
          <input
            id="goal-amount"
            type="number"
            value={targetAmount === 0 ? '' : targetAmount}
            onChange={e => setTarget(Number(e.target.value))}
            placeholder="8000000"
            title="Jumlah target dalam Rupiah"
            className="w-full bg-slate-900 border border-slate-800
                       rounded-xl py-3 px-4 text-xs font-semibold
                       text-white placeholder-slate-700
                       focus:outline-none focus:border-fuchsia-500/50"
          />
        </div>

        {/* Deadline */}
        <div className="space-y-2 mb-6">
          <label htmlFor="goal-deadline" className="text-xs font-bold text-slate-400">
            Deadline <span className="text-slate-600">(opsional)</span>
          </label>
          <input
            id="goal-deadline"
            type="date"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            title="Tanggal deadline target"
            placeholder="Pilih tanggal deadline"
            className="w-full bg-slate-900 border border-slate-800
                       rounded-xl py-3 px-4 text-xs font-semibold
                       text-white focus:outline-none focus:border-fuchsia-500/50"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-fuchsia-500 to-blue-500
                     text-white font-bold py-3.5 rounded-2xl text-xs
                     hover:opacity-90 active:scale-[0.98] transition-all
                     shadow-lg shadow-fuchsia-500/20"
        >
          Buat Target 🚀
        </button>

      </div>
    </div>
  )
}