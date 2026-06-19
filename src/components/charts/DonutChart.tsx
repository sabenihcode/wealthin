import { useMemo } from 'react'
import { CATEGORIES_CONFIG } from '../../constants/categories'
import { formatIDR } from '../../utils/formatters'
import type { CategoryName, DonutSegment } from '../../types'

interface DonutChartProps {
  total: number
  categorySpending: Record<CategoryName, number>
}

const CHART_COLORS = [
  '#87A96B', // sage-500
  '#10B981', // emerald-500
  '#F59E0B', // amber-500
  '#F43F5E', // rose-500
  '#06B6D4', // cyan-500
  '#8B5CF6', // violet-500
  '#64748B', // slate-500
]

export function DonutChart({ total, categorySpending }: DonutChartProps): JSX.Element {
  const data = useMemo(() => {
    return (Object.entries(categorySpending) as [CategoryName, number][])
      .map(([name, amount], idx) => ({
        name: name as CategoryName,
        amount,
        percentage: total > 0 ? (amount / total) * 100 : 0,
        color: CHART_COLORS[idx % CHART_COLORS.length],
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 6)
  }, [categorySpending, total])

  const radius = 70
  const strokeWidth = 20
  const center = 90
  const circumference = 2 * Math.PI * radius

  let accumulatedPercentage = 0

  return (
    <div className="space-y-4">
      {/* SVG Donut */}
      <div className="flex justify-center">
        <div className="relative">
          <svg width="180" height="180" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#1E293B"
              strokeWidth={strokeWidth}
            />

            {/* Data segments */}
            {data.map((item, idx) => {
              const segmentLength = (item.percentage / 100) * circumference
              const offset = circumference - (accumulatedPercentage / 100) * circumference
              accumulatedPercentage += item.percentage

              return (
                <circle
                  key={idx}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${segmentLength} ${circumference}`}
                  strokeDashoffset={-offset}
                  className="transition-all duration-700"
                />
              )
            })}
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center 
                          justify-center text-center">
            <p className="text-xs text-slate-500 font-bold">Total</p>
            <p className="text-lg font-extrabold text-white">
              {formatIDR(total)}
            </p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3">
        {data.map((item) => {
          const cfg = CATEGORIES_CONFIG[item.name]
          const Icon = cfg?.icon

          return (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  {Icon && <Icon className="w-3 h-3 text-slate-500" />}
                  <span className="text-[10px] text-slate-400 font-bold truncate">
                    {item.name}
                  </span>
                </div>
                <p className="text-xs font-extrabold text-white">
                  {Math.round(item.percentage)}%
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
