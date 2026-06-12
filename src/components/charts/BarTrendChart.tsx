import { MONTHLY_TRENDS } from '../../constants/mockData'
import type { MonthlyTrend } from '../../types'

interface BarTrendChartProps {
  triggered: boolean
}

export function BarTrendChart({ triggered }: BarTrendChartProps): JSX.Element {
  const maxVal = Math.max(
    ...MONTHLY_TRENDS.flatMap((t: MonthlyTrend) => [t.inflow, t.outflow]),
    1
  )

  return (
    <div className="space-y-3">
      {MONTHLY_TRENDS.map((trend: MonthlyTrend, idx: number) => {
        const inPct  = (trend.inflow  / maxVal) * 100
        const outPct = (trend.outflow / maxVal) * 100

        return (
          <div key={trend.label} className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-500 font-bold">
                {trend.label}
              </span>
              {idx === MONTHLY_TRENDS.length - 1 && (
                <span className="text-[9px] text-fuchsia-400 font-bold">
                  Sekarang
                </span>
              )}
            </div>

            {/* Inflow bar */}
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-emerald-400 font-bold w-6">↑</span>
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                  style={{ width: triggered ? `${inPct}%` : '0%' }}
                />
              </div>
            </div>

            {/* Outflow bar */}
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-blue-400 font-bold w-6">↓</span>
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-700"
                  style={{ width: triggered ? `${outPct}%` : '0%' }}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
