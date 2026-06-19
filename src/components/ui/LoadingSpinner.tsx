export function LoadingSpinner(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-slate-800 rounded-full" />
        
        {/* Spinning ring */}
        <div className="absolute inset-0 border-4 border-transparent 
                        border-t-sage-500 rounded-full animate-spin" />
        
        {/* Inner dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-sage-500 rounded-full animate-pulse-sage" />
        </div>
      </div>
    </div>
  )
}
