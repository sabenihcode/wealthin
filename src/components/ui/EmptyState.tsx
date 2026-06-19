import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action 
}: EmptyStateProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 
                    text-center space-y-4 animate-fade-in">
      {/* Icon */}
      <div className="w-20 h-20 bg-slate-900 border border-slate-800 
                      rounded-3xl flex items-center justify-center">
        <Icon className="w-10 h-10 text-slate-600" />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-base font-bold text-slate-400">
          {title}
        </h3>
        <p className="text-sm text-slate-600 font-medium max-w-xs">
          {description}
        </p>
      </div>

      {/* Action button */}
      {action && (
        <button
          onClick={action.onClick}
          className="btn-primary mt-4"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
