import { formatIDR } from '../../utils/formatters'
import { CATEGORIES_CONFIG } from '../../constants/categories'
import type { CategorySpending, DonutSegment } from '../../types'

interface DonutChartProps {
  total:           number
  categorySpending: CategorySpending
}

const SEGMENTS: DonutSegment[] = [
  { color: '#0062FF', pct: 29, offset: 0   },
  { color: '#38BDF8', pct: 21, offset: -29  },
  { color: '#A855F7', pct: 14, offset: -50  },
  { color: '#F43F5E', pct: 9,  offset: -64  },
  { color: '#F59E0B', pct: 9,  offset: -73  },
  { color: '#10B981', pct: 18, offset: -82  },
]

export function DonutChart(
  { total, categorySpending }: DonutChartProps
): JSX.Element {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      {/* SVG Donut */}
      <div className="relative w-36 h-36 shrink-0
                      flex items-center justify-center">
        <svg className="w-full h-full -rotate-90"
             viewBox="0 0 36 36">
          {SEGMENTS.map(({ color, pct, offset }, i) => (
            <circle
              key={i}
              cx="18" cy="18" r="15.915"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeDasharray={`${pct} ${100 - pct}`}
              strokeDashoffset={offset}
              className="transition-all duration-1000
                         cursor-pointer hover:stroke-[5px]"
            />
          ))}
        </svg>
        {/* Center label */}
        <div className="absolute text-center">
          <span className="text-[9px] text-slate-400
                           font-extrabold uppercase">
            Total
          </span>
          <p className="text-xs font-extrabold text-slate-800
                        tracking-tight mt-0.5">
            {formatIDR(total)}
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex-1 w-full space-y-2 text-xs">
        {(Object.entries(categorySpending) as [
          keyof typeof categorySpending, number
        ][]).map(([cat, amount]) => {
          const cfg = CATEGORIES_CONFIG[cat]
                   ?? CATEGORIES_CONFIG['Lainnya']
          const pct = Math.round((amount / total) * 100) || 0

          return (
            <div key={cat}
                 className="flex items-center justify-between
                            font-bold text-slate-700">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: cfg.fill }}
                />
                <span className="text-slate-600 font-semibold
                                 truncate max-w-[100px]">
                  {cat}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-800">
                  {formatIDR(amount)}
                </span>
                <span className="text-blue-500 font-extrabold
                                 text-[10px] w-6 text-right">
                  {pct}%
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}