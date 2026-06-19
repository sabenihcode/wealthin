import {
  ChevronRight, Calendar, Lightbulb,
  Sparkles, ArrowUpRight, ArrowDownRight, BarChart2,
} from 'lucide-react'
import { useApp }            from '../context/AppContext'
import { useTransactions }   from '../hooks/useTransactions'
import { useAnimationTrigger } from '../hooks/useAnimationTrigger'
import { formatIDR }         from '../utils/formatters'
import { DonutChart }        from '../components/charts/DonutChart'
import { BarTrendChart }     from '../components/charts/BarTrendChart'
import { AiAssistant }       from '../components/ai/AiAssistant'
import type { AnalisisSubTab } from '../types'

const SUB_TABS: AnalisisSubTab[] = [
  'Ringkasan', 'Pemasukan', 'Pengeluaran', 'Kategori', 'Tren',
]

interface ComparisonItem {
  label:    string
  value:    number
  Icon:     typeof ArrowUpRight
  iconBg:   string
  badge:    string
  badgeBg:  string
}

export function AnalisisPage(): JSX.Element {
  const { analisisSubTab, setAnalisisSubTab } = useApp()
  const {
    totalPemasukan, totalPengeluaran,
    saldoBersih, categorySpending, totalKategori,
  } = useTransactions()
  const triggered = useAnimationTrigger([analisisSubTab])

  const comparisons: ComparisonItem[] = [
    {
      label:   'Pemasukan',
      value:   totalPemasukan,
      Icon:    ArrowUpRight,
      iconBg:  'bg-emerald-500/10 text-emerald-400',
      badge:   '↑ 8.6%',
      badgeBg: 'text-emerald-400 bg-emerald-500/10',
    },
    {
      label:   'Pengeluaran',
      value:   totalPengeluaran,
      Icon:    ArrowDownRight,
      iconBg:  'bg-rose-500/10 text-rose-400',
      badge:   '↓ 5.2%',
      badgeBg: 'text-rose-400 bg-rose-500/10',
    },
    {
      label:   'Cashflow',
      value:   saldoBersih,
      Icon:    BarChart2,
      iconBg:  'bg-sage-500/10 text-sage-400',
      badge:   '↑ 15.3%',
      badgeBg: 'text-sage-400 bg-sage-500/10',
    },
  ]

  return (
    <div className="animate-fade-in space-y-5 pt-6">

      {/* Header */}
      <div className="flex justify-between items-center mt-2">
        <div>
          <span className="text-slate-500 text-[10px] font-bold
                           uppercase tracking-wider block">
            Insight
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Analisis
          </h1>
          <p className="text-xs text-slate-500 font-semibold">
            Pahami keuanganmu lebih dalam
          </p>
        </div>
        <button className="flex items-center gap-1.5 bg-slate-900
                           text-slate-300 text-xs font-bold px-3 py-2
                           rounded-2xl border border-slate-800
                           hover:bg-slate-800 transition-colors">
          <Calendar className="w-4 h-4 text-sage-400" />
          <span>Bulan ini</span>
          <ChevronRight className="w-3.5 h-3.5 rotate-90 text-slate-600" />
        </button>
      </div>

      {/* Sub tabs */}
      <div className="flex border-b border-slate-800
                      overflow-x-auto scrollbar-none py-1">
        {SUB_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setAnalisisSubTab(tab)}
            className={`px-4 py-2.5 text-xs font-bold transition-all
                        relative shrink-0 focus:outline-none
              ${analisisSubTab === tab
                ? 'text-sage-400'
                : 'text-slate-500 hover:text-slate-300'}`}
          >
            {tab}
            {analisisSubTab === tab && (
              <span className="absolute bottom-0 left-4 right-4
                               h-0.5 bg-sage-500 rounded-full
                               animate-fade-in shadow-lg shadow-sage-500/50" />
            )}
          </button>
        ))}
      </div>

      {/* Ringkasan */}
      {analisisSubTab === 'Ringkasan' && (
        <div className="space-y-5 animate-fade-in">

          {/* Summary numbers */}
          <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800
                          shadow-lg shadow-black/10 space-y-4">
            <h3 className="text-xs font-extrabold text-white">
              Ringkasan Keuangan
            </h3>
            <div className="grid grid-cols-2 gap-4 relative">
              <div className="absolute top-0 bottom-0 left-1/2
                              w-[1px] bg-slate-800" />
              {(
                [
                  { label: 'Pemasukan',   value: totalPemasukan,   color: 'text-emerald-400', dot: 'bg-emerald-400' },
                  { label: 'Pengeluaran', value: totalPengeluaran, color: 'text-rose-400',    dot: 'bg-rose-400'    },
                ] as const
              ).map(({ label, value, color, dot }, i) => (
                <div key={label} className={`space-y-1 ${i === 1 ? 'pl-4' : ''}`}>
                  <div className="flex items-center gap-1.5 text-[11px]
                                  text-slate-500 font-bold uppercase">
                    <span className={`w-2 h-2 ${dot} rounded-full`} />
                    {label}
                  </div>
                  <div className={`text-[17px] font-extrabold ${color}`}>
                    {formatIDR(value)}
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-800
                            flex justify-between items-center
                            bg-slate-950 p-2.5 rounded-2xl">
              <span className="text-xs text-slate-500 font-bold">
                Cashflow bulan ini
              </span>
              <div className="flex items-center gap-1 text-xs
                              font-extrabold text-sage-400">
                {formatIDR(saldoBersih)}
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Donut */}
          <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800
                          shadow-lg shadow-black/10 space-y-4">
            <h3 className="text-xs font-extrabold text-white">
              Pengeluaran per Kategori
            </h3>
            <DonutChart
              total={totalKategori}
              categorySpending={categorySpending}
            />
          </div>

          {/* Trend bars */}
          <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800
                          shadow-lg shadow-black/10 space-y-4">
            <h3 className="text-xs font-extrabold text-white">
              Tren Cashflow
            </h3>
            <BarTrendChart triggered={triggered} />
          </div>

          {/* Month comparison */}
          <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800
                          shadow-lg shadow-black/10 space-y-4">
            <h3 className="text-xs font-extrabold text-white">
              Perbandingan Bulan Lalu
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {comparisons.map(
                ({ label, value, Icon, iconBg, badge, badgeBg }) => (
                  <div key={label}
                       className="bg-slate-950 rounded-2xl p-3
                                  border border-slate-800 space-y-2
                                  text-center">
                    <div className={`w-8 h-8 ${iconBg} rounded-full
                                    flex items-center justify-center
                                    mx-auto`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500
                                       font-bold block uppercase">
                        {label}
                      </span>
                      <span className="text-[11px] font-extrabold
                                       text-white block mt-0.5">
                        {formatIDR(value)}
                      </span>
                    </div>
                    <span className={`text-[9px] ${badgeBg} px-1.5
                                     py-0.5 rounded font-extrabold
                                     inline-block`}>
                      {badge}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Insight */}
          <div className="bg-slate-900 rounded-3xl p-4 border border-slate-800
                          shadow-lg shadow-black/10 flex items-start gap-3.5">
            <div className="w-10 h-10 bg-sage-500/10 text-sage-400
                            rounded-2xl flex items-center
                            justify-center shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="text-xs font-extrabold text-white">
                Wawasan Cepat
              </h4>
              <p className="text-xs text-slate-400 font-medium
                            leading-relaxed">
                Pengeluaran Makan &amp; Minum{' '}
                <span className="text-sage-400 font-extrabold">
                  naik 12%
                </span>{' '}
                dibanding bulan lalu.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Fallback other tabs */}
      {analisisSubTab !== 'Ringkasan' && (
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800
                        shadow-lg shadow-black/10 text-center space-y-3 animate-fade-in">
          <Sparkles className="w-8 h-8 text-sage-400 mx-auto" />
          <div>
            <h3 className="text-sm font-bold text-white">
              Detail {analisisSubTab}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Data sedang disinkronisasikan ke grafik.
            </p>
          </div>
          <button
            onClick={() => setAnalisisSubTab('Ringkasan')}
            className="text-xs bg-sage-500/10 text-sage-400
                       px-4 py-2 rounded-xl font-bold
                       hover:bg-sage-500/20 transition-colors"
          >
            Kembali ke Ringkasan
          </button>
        </div>
      )}

      {/* AI Assistant Floating Button */}
      <AiAssistant />

    </div>
  )
}
