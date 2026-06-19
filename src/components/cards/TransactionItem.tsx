import { ChevronRight, Trash2 } from 'lucide-react'
import { useTransactions } from '../../hooks/useTransactions'
import { formatIDR } from '../../utils/formatters'
import type { Transaction } from '../../types'

interface TransactionItemProps {
  transaction: Transaction
}

export function TransactionItem({ transaction }: TransactionItemProps): JSX.Element {
  const { deleteTransaction } = useTransactions()
  const isIncome = transaction.type === 'pemasukan'

  const handleDelete = () => {
    if (window.confirm('Hapus transaksi ini?')) {
      deleteTransaction(transaction.id)
    }
  }

  return (
    <div className="py-3 flex items-center gap-3 group">
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-2xl flex items-center 
                   justify-center font-bold text-white shrink-0
                   shadow-sm transition-transform group-hover:scale-105"
        style={{ backgroundColor: transaction.brandColor }}
      >
        {transaction.brandInitial}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 text-left">
        <h4 className="text-sm font-bold text-white truncate">
          {transaction.title}
        </h4>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[10px] text-slate-500 font-bold">
            {transaction.category}
          </span>
          <span className="text-slate-700">•</span>
          <span className="text-[10px] text-slate-600 font-medium">
            {transaction.date}
          </span>
        </div>
      </div>

      {/* Amount */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="text-right">
          <p
            className={`text-sm font-extrabold
            ${isIncome ? 'text-emerald-400' : 'text-rose-400'}`}
          >
            {isIncome ? '+' : '-'}{formatIDR(transaction.amount)}
          </p>
        </div>

        {/* Delete button */}
        <button
          onClick={handleDelete}
          className="w-8 h-8 bg-rose-500/10 hover:bg-rose-500/20 
                     text-rose-400 rounded-lg flex items-center justify-center
                     transition-colors active:scale-95 opacity-0 
                     group-hover:opacity-100"
          aria-label="Hapus transaksi"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
