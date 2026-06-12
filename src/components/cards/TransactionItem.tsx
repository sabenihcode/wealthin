import { Trash2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useTransactions } from '../../hooks/useTransactions'
import { formatIDR } from '../../utils/formatters'
import type { Transaction } from '../../types'

interface TransactionItemProps {
  transaction: Transaction
}

export function TransactionItem(
  { transaction: t }: TransactionItemProps
): JSX.Element {
  const { deleteTransaction } = useTransactions()
  const { showToast }         = useApp()

  const handleDelete = (): void => {
    deleteTransaction(t.id)
    showToast('Transaksi dihapus secara permanen.')
  }

  return (
    <div className="flex items-center justify-between py-3
                    first:pt-0 last:pb-0 group">
      {/* Avatar + info */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center
                     justify-center text-white font-extrabold
                     text-sm shrink-0 shadow-sm"
          style={{ backgroundColor: t.brandColor }}
        >
          {t.brandInitial}
        </div>
        <div>
          <h4 className="text-xs font-extrabold text-slate-800">
            {t.title}
          </h4>
          <span className="text-[10px] text-slate-400 font-bold">
            {t.category}
          </span>
        </div>
      </div>

      {/* Amount + delete */}
      <div className="text-right flex items-center gap-2">
        <div>
          <div className={`text-xs font-extrabold
            ${t.type === 'pengeluaran'
              ? 'text-slate-800'
              : 'text-emerald-500'}`}>
            {t.type === 'pengeluaran' ? '-' : '+'}
            {formatIDR(t.amount)}
          </div>
          <span className="text-[10px] text-slate-400
                           font-bold block mt-0.5">
            {t.date}
          </span>
        </div>
        <button
          onClick={handleDelete}
          aria-label="Hapus transaksi"
          className="p-1.5 text-slate-300 hover:text-red-500
                     rounded-lg opacity-0 group-hover:opacity-100
                     transition-opacity"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}