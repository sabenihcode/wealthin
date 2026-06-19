import { useState, useMemo } from 'react'
import { Search, Inbox } from 'lucide-react'
import { useTransactions } from '../hooks/useTransactions'
import { TransactionItem } from '../components/cards/TransactionItem'
import { formatIDR } from '../utils/formatters'
import type { Transaction } from '../types'

type FilterType = 'semua' | 'pemasukan' | 'pengeluaran'

const FILTER_OPTIONS: { key: FilterType; label: string }[] = [
  { key: 'semua',         label: 'Semua' },
  { key: 'pemasukan',     label: 'Pemasukan' },
  { key: 'pengeluaran',   label: 'Pengeluaran' },
]

export function TransaksiPage(): JSX.Element {
  const { transactions, totalPemasukan, totalPengeluaran } = useTransactions()
  const [filter, setFilter] = useState<FilterType>('semua')
  const [search, setSearch] = useState<string>('')

  const filtered = useMemo<Transaction[]>(() => {
    let result = transactions

    if (filter !== 'semua') {
      result = result.filter((t: Transaction) => t.type === filter)
    }

    if (search.trim() !== '') {
      const q = search.toLowerCase()
      result = result.filter((t: Transaction) =>
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      )
    }

    return result
  }, [transactions, filter, search])

  const grouped = useMemo<Record<string, Transaction[]>>(() => {
    const groups: Record<string, Transaction[]> = {}

    filtered.forEach((t: Transaction) => {
      const dateLabel = t.date.split(',')[0] ?? 'Lainnya'
      if (!groups[dateLabel]) groups[dateLabel] = []
      groups[dateLabel].push(t)
    })

    return groups
  }, [filtered])

  const summaryAmount = filter === 'pemasukan'
    ? totalPemasukan
    : filter === 'pengeluaran'
      ? totalPengeluaran
      : totalPemasukan - totalPengeluaran

  const summaryLabel = filter === 'pemasukan'
    ? 'Total Pemasukan'
    : filter === 'pengeluaran'
      ? 'Total Pengeluaran'
      : 'Cashflow Bersih'

  return (
    <div className="animate-fade-in space-y-5 pt-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Transaksi
        </h1>
        <p className="text-xs text-slate-500 font-semibold mt-1">
          Riwayat lengkap pencatatanmu
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 
                      relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-sage-500 
                        rounded-full filter blur-[60px] opacity-20 pointer-events-none" />
        <div className="relative z-10">
          <span className="text-[10px] text-slate-500 font-bold 
                           uppercase tracking-widest">
            {summaryLabel}
          </span>
          <p className="text-2xl font-extrabold text-white mt-1">
            {formatIDR(summaryAmount)}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 
                           w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari transaksi atau kategori..."
          aria-label="Cari transaksi"
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl 
                     py-3.5 pl-11 pr-4 text-xs font-semibold text-white 
                     placeholder-slate-600 focus:outline-none 
                     focus:border-sage-500/50 focus:ring-2 
                     focus:ring-sage-500/20 transition-all"
        />
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2">
        {FILTER_OPTIONS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold 
                        transition-all duration-200
              ${filter === key
                ? 'bg-sage-500 text-white shadow-lg shadow-sage-500/20'
                : 'bg-slate-900 text-slate-500 hover:text-slate-300 border border-slate-800'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      {Object.keys(grouped).length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="w-16 h-16 bg-slate-900 border border-slate-800 
                          rounded-full flex items-center justify-center">
            <Inbox className="w-7 h-7 text-slate-600" />
          </div>
          <div className="text-center">
            <h3 className="text-sm font-bold text-slate-400">Belum ada transaksi</h3>
            <p className="text-xs text-slate-600 font-medium mt-1">
              {search ? 'Coba kata kunci lain' : 'Mulai catat pemasukan atau pengeluaran'}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([dateLabel, txs]) => (
            <div key={dateLabel}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-500 
                               uppercase tracking-wider">
                  {dateLabel}
                </h3>
                <span className="text-[10px] text-slate-600 font-bold">
                  {txs.length} transaksi
                </span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-3xl 
                              p-4 divide-y divide-slate-800/50">
                {txs.map(t => (
                  <TransactionItem key={t.id} transaction={t} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
