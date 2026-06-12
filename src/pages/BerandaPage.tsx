import { useState } from 'react'
import { Bell, ChevronRight, Plus, Target } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useTransactions } from '../hooks/useTransactions'
import { formatIDR } from '../utils/formatters'
import { CATEGORIES_CONFIG } from '../constants/categories'
import { BalanceCard } from '../components/cards/BalanceCard'
import { TransactionItem } from '../components/cards/TransactionItem'
import { GoalCard } from '../components/goals/GoalCard'
import { AddGoalSheet } from '../components/goals/AddGoalSheet'
import type { CategoryName } from '../types'

export function BerandaPage(): JSX.Element {
  // Ambil userName dari useApp
  const {
    openModal,
    setActiveTab,
    setAnalisisSubTab,
    hideBalance,
    showToast,
    goals,
    userName,
  } = useApp()

  const {
    transactions,
    totalPemasukan,
    totalPengeluaran,
    saldoBersih,
    categorySpending,
    totalKategori,
  } = useTransactions()

  const [showAddGoal, setShowAddGoal] = useState<boolean>(false)

  const cashflowTotal = totalPemasukan + totalPengeluaran

  return (
    <div className="animate-fade-in space-y-5 pt-6">

      {/* SEKSI 1: HEADER */}
      <div className="flex justify-between items-center mt-2">
        <div>
          <span className="text-slate-500 text-xs flex items-center gap-1 font-semibold">
            Halo, {userName} 👋
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Dashboard
          </h1>
        </div>
        <button
          onClick={() => openModal('notifikasi')}
          aria-label="Notifikasi"
          className="relative w-11 h-11 bg-slate-900 border border-slate-800
                     rounded-full flex items-center justify-center shadow-sm
                     hover:scale-105 active:scale-95 transition-all"
        >
          <Bell className="w-5 h-5 text-blue-400 fill-current" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5
                           bg-red-500 rounded-full ring-2 ring-slate-950" />
        </button>
      </div>

      {/* SEKSI 2: SALDO BERSIH */}
      <BalanceCard />

      {/* SEKSI 3: SAVING GOALS */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-fuchsia-400" />
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
              Target Nabung
            </h3>
          </div>
          <button
            onClick={() => setShowAddGoal(true)}
            className="flex items-center gap-1 bg-fuchsia-500/10
                       text-fuchsia-400 text-[10px] font-extrabold
                       px-3 py-1.5 rounded-full hover:bg-fuchsia-500/20
                       transition-colors"
          >
            <Plus className="w-3 h-3" /> Baru
          </button>
        </div>

        {goals.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 border-dashed
                          rounded-3xl p-8 text-center">
            <p className="text-2xl mb-2">🎯</p>
            <p className="text-xs text-slate-500 font-bold">
              Belum ada target nabung
            </p>
            <p className="text-[10px] text-slate-600 font-medium mt-1">
              Buat target pertamamu!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {goals.map(g => (
              <GoalCard key={g.id} goal={g} />
            ))}
          </div>
        )}
      </div>

      {/* SEKSI 4: PEMASUKAN VS PENGELUARAN */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5
                      shadow-lg shadow-black/10 space-y-4">
        <h3 className="text-xs font-extrabold text-white">
          Pemasukan vs Pengeluaran
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {(
            [
              {
                label: 'Pemasukan',
                value: totalPemasukan,
                color: 'text-emerald-400',
                dot: 'bg-emerald-400',
              },
              {
                label: 'Pengeluaran',
                value: totalPengeluaran,
                color: 'text-blue-400',
                dot: 'bg-blue-400',
              },
            ] as const
          ).map(({ label, value, color, dot }) => (
            <div key={label} className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs
                              text-slate-500 font-bold">
                <span className={`w-2 h-2 ${dot} rounded-full`} />
                {label}
              </div>
              <div className={`text-base font-extrabold ${color}`}>
                {hideBalance ? 'Rp ••••••••' : formatIDR(value)}
              </div>
            </div>
          ))}
        </div>

        <div className="relative h-2 bg-slate-800 rounded-full
                        overflow-hidden flex">
          <div
            className="bg-emerald-500 h-full transition-all duration-700"
            style={{
              width: cashflowTotal > 0
                ? `${(totalPemasukan / cashflowTotal) * 100}%`
                : '50%',
            }}
          />
          <div
            className="bg-blue-500 h-full transition-all duration-700"
            style={{
              width: cashflowTotal > 0
                ? `${(totalPengeluaran / cashflowTotal) * 100}%`
                : '50%',
            }}
          />
        </div>

        <div className="pt-2.5 border-t border-slate-800
                        flex justify-between items-center text-xs">
          <span className="text-slate-500 font-bold">
            Cashflow bulan ini
          </span>
          <div className="flex items-center gap-1 font-extrabold text-blue-400">
            <span>
              {hideBalance ? 'Rp ••••••••' : formatIDR(saldoBersih)}
            </span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* SEKSI 5: KATEGORI PENGELUARAN */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5
                      shadow-lg shadow-black/10 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-extrabold text-white">
            Kategori Pengeluaran
          </h3>
          <button
            onClick={() => {
              setActiveTab('analisis')
              setAnalisisSubTab('Kategori')
            }}
            className="text-blue-400 text-xs font-extrabold
                       flex items-center gap-0.5 hover:underline"
          >
            Lihat semua <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-4">
          {(Object.entries(categorySpending) as [CategoryName, number][])
            .slice(0, 4)
            .map(([name, amount]) => {
              const pct = totalKategori > 0
                ? Math.round((amount / totalKategori) * 100)
                : 0
              const cfg = CATEGORIES_CONFIG[name] ?? CATEGORIES_CONFIG['Lainnya']
              const Icon = cfg.icon

              return (
                <div key={name} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center
                                  justify-center shrink-0 ${cfg.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center
                                   text-xs font-bold text-white mb-1">
                      <span className="truncate">{name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-300">{formatIDR(amount)}</span>
                        <span className="text-blue-400 text-[10px]
                                        bg-blue-500/10 px-1.5 py-0.5 rounded">
                          {pct}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800
                                   rounded-full overflow-hidden">
                      <div
                        className="bg-blue-500 h-full rounded-full
                                   transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      {/* SEKSI 6: TRANSAKSI TERBARU */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5
                      shadow-lg shadow-black/10 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-extrabold text-white">
            Transaksi Terbaru
          </h3>
          <button
            onClick={() => {
              setActiveTab('transaksi')
              showToast('Menampilkan semua transaksi!')
            }}
            className="text-blue-400 text-xs font-extrabold
                       flex items-center gap-0.5 hover:underline"
          >
            Lihat semua <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-2xl mb-2">📝</p>
            <p className="text-xs text-slate-500 font-bold">
              Belum ada transaksi
            </p>
            <p className="text-[10px] text-slate-600 font-medium mt-1">
              Mulai catat pemasukan atau pengeluaran
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/50">
            {transactions.slice(0, 5).map(t => (
              <TransactionItem key={t.id} transaction={t} />
            ))}
          </div>
        )}
      </div>

      {/* MODAL: TAMBAH GOAL */}
      {showAddGoal && (
        <AddGoalSheet onClose={() => setShowAddGoal(false)} />
      )}

    </div>
  )
}
