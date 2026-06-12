import { formatIDR } from '../../utils/formatters'
import { MONTHLY_TRENDS } from '../../constants/mockData'
import type { GridLine } from '../../types'

interface BarTrendChartProps {
  triggered: boolean
}

const MAX_VALUE = 15_000_000

const GRID_LINES: GridLine[] = [
  { top: 0,  label: 'Rp 12jt' },
  { top: 48, label: 'Rp 6jt'  },
  { top: 96, label: 'Rp 0'    },
]

export function BarTrendChart(
  { triggered }: BarTrendChartProps
): JSX.Element {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Bar chart */}
      <div className="col-span-2 h-44 flex items-end
                      justify-between relative
                      border-b border-slate-100 pb-1">
        {/* Grid lines */}
        {GRID_LINES.map(({ top, label }) => (
          <div
            key={label}
            className="absolute left-0 right-0 border-t
                       border-dashed border-slate-100
                       text-[8px] text-slate-400 font-bold pt-1"
            style={{ top }}
          >
            {label}
          </div>
        ))}

        {/* Bars */}
        {MONTHLY_TRENDS.map((trend, idx) => {
          const inH  = (trend.inflow  / MAX_VALUE) * 110
          const outH = (trend.outflow / MAX_VALUE) * 110

          return (
            <div
              key={idx}
              className="flex flex-col items-center flex-1
                         group relative z-10"
            >
              <div className="flex gap-1 items-end h-32 mb-1.5">
                {/* Inflow */}
                <div
                  className="w-1.5 bg-emerald-500 rounded-full
                             origin-bottom"
                  title={`Pemasukan: ${formatIDR(trend.inflow)}`}
                  style={{
                    height:     triggered ? `${inH}px` : '0px',
                    transition: `height 800ms ease-out ${idx * 100}ms`,
                  }}
                />
                {/* Outflow */}
                <div
                  className="w-1.5 bg-blue-600 rounded-full
                             origin-bottom"
                  title={`Pengeluaran: ${formatIDR(trend.outflow)}`}
                  style={{
                    height:     triggered ? `${outH}px` : '0px',
                    transition: `height 800ms ease-out ${idx * 120}ms`,
                  }}
                />
              </div>
              <span className="text-[8px] font-extrabold
                               text-slate-400 truncate max-w-[40px]">
                {trend.label.split(' ')[0]}
              </span>
            </div>
          )
        })}
      </div>

      {/* Legend kanan */}
      <div className="space-y-4 self-center text-xs">
        {[
          {
            color: 'bg-emerald-500',
            label: 'PEMASUKAN',
            value: 15_000_000,
          },
          {
            color: 'bg-blue-600',
            label: 'PENGELUARAN',
            value: 8_500_000,
          },
        ].map(({ color, label, value }) => (
          <div key={label} className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10px]
                            text-slate-400 font-bold">
              <span className={`w-1.5 h-1.5 ${color} rounded-full`} />
              {label}
            </div>
            <p className="font-extrabold text-slate-800 text-[11px]">
              {formatIDR(value)}
            </p>
          </div>
        ))}

        <div className="bg-blue-50/50 p-2.5 rounded-2xl
                        border border-blue-100/50 space-y-0.5">
          <span className="text-[8px] text-blue-500
                           font-extrabold uppercase">
            Rata-rata
          </span>
          <p className="font-extrabold text-blue-600 text-[10px]">
            {formatIDR(6_500_000)}
          </p>
        </div>
      </div>
    </div>
  )
}