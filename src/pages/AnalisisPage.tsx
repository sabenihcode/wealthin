import {
  ChevronRight,
  Calendar,
  Lightbulb,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  BarChart2,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useTransactions } from '../hooks/useTransactions'
import { useAnimationTrigger } from '../hooks/useAnimationTrigger'
import { formatIDR } from '../utils/formatters'
import { DonutChart } from '../components/charts/DonutChart'
import { BarTrendChart } from '../components/charts/BarTrendChart'
import { AiAssistant } from '../components/ai/AiAssistant'
import type { AnalisisSubTab, CategoryName } from '../types'

const SUB_TABS: AnalisisSubTab[] = [
  'Ringkasan',
  'Pemasukan',
  'Pengeluaran',
  'Kategori',
  'Tren',
]

interface ComparisonItem {
  label: string
  value: number
  Icon: typeof ArrowUpRight
  iconBg: string
  badge: string
  badgeBg: string
}

export function AnalisisPage(): JSX.Element {
  const { analisisSubTab, setAnalisisSubTab } = useApp()
  const {
    totalPemasukan,
    totalPengeluaran,
    saldoBersih,
    categorySpending,
    totalKategori,
  } = useTransactions()
  const triggered = useAnimationTrigger([analisisSubTab])

  // ────────────────────────────────────────────────────────────────
  // Prepare category spending for DonutChart
  // ────────────────────────────────────────────────────────────────
  const categorySpendingFilled = Object.fromEntries(
    Object.entries(categorySpending).map(([k, v]) => [k, v ?? 0])
  ) as Record<CategoryName, number>

  const comparisons: ComparisonItem[] = [
    {
      label: 'Pemasukan',
      value: totalPemasukan,
      Icon: ArrowUpRight,
      iconBg: 'bg-emerald-500/10 text-emerald-400',
      badge: '↑ 8.6%',
      badgeBg: 'text-emerald-400 bg-emerald-500/10',
    },
    {
      label: 'Pengeluaran',
      value: totalPengeluaran,
      Icon: ArrowDownRight,
      iconBg: 'bg-rose-500/10 text-rose-400',
      badge: '↓ 5.2%',
      badgeBg: 'text-rose-400 bg-rose-500/10',
    },
    {
      label: 'Cashflow',
      value: saldoBersih,
      Icon: BarChart2,
      iconBg: 'bg-sage-500/10 text-sage-400',
      badge: '↑ 15.3%',
      badgeBg: 'text-sage-400 bg-sage-500/10',
    },
  ]

  return (
    <div className="animate-fade-in space-y-5 pt-6">
      {/* ──────────────────────────────────────────────────────────
          HEADER
          ────────────────────────────────────────────────────────── */}
      <div className="flex justify-between items-center mt-2">
        <div>
          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block">
            Insight
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Analisis
          </h1>
          <p className="text-xs text-slate-500 font-semibold">
            Pahami keuanganmu lebih dalam
          </p>
        </div>
        <button
          className="flex items-center gap-1.5 bg-slate-900
                     text-slate-300 text-xs font-bold px-3 py-2
                     rounded-2xl border border-slate-800
                     hover:bg-slate-800 transition-colors
                     active:scale-95"
        >
          <Calendar className="w-4 h-4 text-sage-400" />
          <span>Bulan ini</span>
          <ChevronRight className="w-3.5 h-3.5 rotate-90 text-slate-600" />
        </button>
      </div>

      {/* ──────────────────────────────────────────────────────────
          SUB TABS
          ────────────────────────────────────────────────────────── */}
      <div className="flex border-b border-slate-800 overflow-x-auto scrollbar-none py-1">
        {SUB_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setAnalisisSubTab(tab)}
            className={`px-4 py-2.5 text-xs font-bold transition-all
                        relative shrink-0 focus:outline-none
              ${
                analisisSubTab === tab
                  ? 'text-sage-400'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
          >
            {tab}
            {analisisSubTab === tab && (
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-sage-500 rounded-full animate-fade-in shadow-lg shadow-sage-500/50" />
            )}
          </button>
        ))}
      </div>

      {/* ──────────────────────────────────────────────────────────
          RINGKASAN TAB
          ────────────────────────────────────────────────────────── */}
      {analisisSubTab === 'Ringkasan' && (
        <div className="space-y-5 animate-fade-in">
          {/* Summary Numbers */}
          <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-lg shadow-black/10 space-y-4">
            <h3 className="text-xs font-extrabold text-white">
              Ringkasan Keuangan
            </h3>

            <div className="grid grid-cols-2 gap-4 relative">
              {/* Divider */}
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-slate-800" />

              {/* Pemasukan */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-bold uppercase">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                  Pemasukan
                </div>
                <div className="text-[17px] font-extrabold text-emerald-400">
                  {formatIDR(totalPemasukan)}
                </div>
              </div>

              {/* Pengeluaran */}
              <div className="space-y-1 pl-4">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-bold uppercase">
                  <span className="w-2 h-2 bg-rose-400 rounded-full" />
                  Pengeluaran
                </div>
                <div className="text-[17px] font-extrabold text-rose-400">
                  {formatIDR(totalPengeluaran)}
                </div>
              </div>
            </div>

            {/* Cashflow Section */}
            <div className="pt-3 border-t border-slate-800 flex justify-between items-center bg-slate-950 p-2.5 rounded-2xl">
              <span className="text-xs text-slate-500 font-bold">
                Cashflow bulan ini
              </span>
              <div className="flex items-center gap-1 text-xs font-extrabold text-sage-400">
                {formatIDR(saldoBersih)}
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-lg shadow-black/10 space-y-4">
            <h3 className="text-xs font-extrabold text-white">
              Pengeluaran per Kategori
            </h3>
            <DonutChart total={totalKategori} categorySpending={categorySpendingFilled} />
          </div>

          {/* Trend Bar Chart */}
          <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-lg shadow-black/10 space-y-4">
            <h3 className="text-xs font-extrabold text-white">
              Tren Cashflow
            </h3>
            <BarTrendChart triggered={triggered} />
          </div>

          {/* Month Comparison */}
          <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-lg shadow-black/10 space-y-4">
            <h3 className="text-xs font-extrabold text-white">
              Perbandingan Bulan Lalu
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {comparisons.map(({ label, value, Icon, iconBg, badge, badgeBg }) => (
                <div
                  key={label}
                  className="bg-slate-950 rounded-2xl p-3 border border-slate-800 space-y-2 text-center"
                >
                  {/* Icon */}
                  <div className={`w-8 h-8 ${iconBg} rounded-full flex items-center justify-center mx-auto`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Content */}
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold block uppercase">
                      {label}
                    </span>
                    <span className="text-[11px] font-extrabold text-white block mt-0.5">
                      {formatIDR(value)}
                    </span>
                  </div>

                  {/* Badge */}
                  <span className={`text-[9px] ${badgeBg} px-1.5 py-0.5 rounded font-extrabold inline-block`}>
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Insight Card */}
          <div className="bg-slate-900 rounded-3xl p-4 border border-slate-800 shadow-lg shadow-black/10 flex items-start gap-3.5">
            {/* Icon */}
            <div className="w-10 h-10 bg-sage-500/10 text-sage-400 rounded-2xl flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-1">
              <h4 className="text-xs font-extrabold text-white">
                Wawasan Cepat
              </h4>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Pengeluaran Makan &amp; Minum{' '}
                <span className="text-sage-400 font-extrabold">naik 12%</span>{' '}
                dibanding bulan lalu. Coba kurangi spending di kategori ini untuk mencapai target budget-mu.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          PEMASUKAN TAB
          ────────────────────────────────────────────────────────── */}
      {analisisSubTab === 'Pemasukan' && (
        <div className="space-y-5 animate-fade-in">
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-lg shadow-black/10 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto">
              <ArrowUpRight className="w-8 h-8 text-emerald-400" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white">
                {formatIDR(totalPemasukan)}
              </h3>
              <p className="text-xs text-slate-500 font-bold mt-1">
                Total Pemasukan Bulan Ini
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-400 font-medium">
                Rata-rata harian: <span className="text-emerald-400 font-bold">{formatIDR(totalPemasukan / 30)}</span>
              </p>
            </div>

            <button
              onClick={() => setAnalisisSubTab('Ringkasan')}
              className="text-xs bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-xl font-bold hover:bg-emerald-500/20 transition-colors"
            >
              Kembali ke Ringkasan
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          PENGELUARAN TAB
          ────────────────────────────────────────────────────────── */}
      {analisisSubTab === 'Pengeluaran' && (
        <div className="space-y-5 animate-fade-in">
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-lg shadow-black/10 text-center space-y-4">
            <div className="w-16 h-16 bg-rose-500/10 rounded-3xl flex items-center justify-center mx-auto">
              <ArrowDownRight className="w-8 h-8 text-rose-400" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white">
                {formatIDR(totalPengeluaran)}
              </h3>
              <p className="text-xs text-slate-500 font-bold mt-1">
                Total Pengeluaran Bulan Ini
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-400 font-medium">
                Rata-rata harian: <span className="text-rose-400 font-bold">{formatIDR(totalPengeluaran / 30)}</span>
              </p>
            </div>

            <button
              onClick={() => setAnalisisSubTab('Ringkasan')}
              className="text-xs bg-rose-500/10 text-rose-400 px-4 py-2 rounded-xl font-bold hover:bg-rose-500/20 transition-colors"
            >
              Kembali ke Ringkasan
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          KATEGORI TAB
          ────────────────────────────────────────────────────────── */}
      {analisisSubTab === 'Kategori' && (
        <div className="space-y-5 animate-fade-in">
          <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-lg shadow-black/10 space-y-4">
            <h3 className="text-xs font-extrabold text-white">
              Rincian Pengeluaran per Kategori
            </h3>

            <div className="space-y-4">
              {Object.entries(categorySpendingFilled)
                .sort(([, a], [, b]) => b - a)
                .map(([category, amount]) => {
                  const percentage =
                    totalKategori > 0
                      ? Math.round((amount / totalKategori) * 100)
                      : 0

                  return (
                    <div key={category} className="space-y-2">
                      {/* Header */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-white">
                          {category}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-extrabold text-slate-300">
                            {formatIDR(amount)}
                          </span>
                          <span className="text-[10px] font-extrabold text-sage-400 bg-sage-500/10 px-2 py-1 rounded-full">
                            {percentage}%
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-sage-600 to-sage-500 rounded-full transition-all duration-700"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
            </div>

            <button
              onClick={() => setAnalisisSubTab('Ringkasan')}
              className="w-full text-xs bg-sage-500/10 text-sage-400 px-4 py-2 rounded-xl font-bold hover:bg-sage-500/20 transition-colors mt-4"
            >
              Kembali ke Ringkasan
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          TREN TAB
          ────────────────────────────────────────────────────────── */}
      {analisisSubTab === 'Tren' && (
        <div className="space-y-5 animate-fade-in">
          <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 shadow-lg shadow-black/10 space-y-4">
            <h3 className="text-xs font-extrabold text-white">
              Tren Cashflow 6 Bulan Terakhir
            </h3>

            <BarTrendChart triggered={triggered} />

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-500 font-bold">
                  Tren Pemasukan
                </p>
                <p className="text-sm font-extrabold text-emerald-400">
                  ↑ Stabil
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-slate-500 font-bold">
                  Tren Pengeluaran
                </p>
                <p className="text-sm font-extrabold text-rose-400">
                  ↓ Menurun
                </p>
              </div>
            </div>

            <button
              onClick={() => setAnalisisSubTab('Ringkasan')}
              className="w-full text-xs bg-sage-500/10 text-sage-400 px-4 py-2 rounded-xl font-bold hover:bg-sage-500/20 transition-colors"
            >
              Kembali ke Ringkasan
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          AI ASSISTANT
          ────────────────────────────────────────────────────────── */}
      <AiAssistant />
    </div>
  )
}
