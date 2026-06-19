import type { ReactNode } from 'react'

interface BentoCardProps {
  children: ReactNode
  className?: string
}

export function BentoCard({ children, className = '' }: BentoCardProps): JSX.Element {
  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-3xl p-5 
                    hover:border-sage-500/30 hover:scale-[1.02] 
                    transition-all duration-300 cursor-pointer 
                    shadow-lg shadow-black/10 hover:shadow-sage-500/5 
                    ${className}`}>
      {children}
    </div>
  )
}
