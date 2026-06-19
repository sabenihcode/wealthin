export function SkeletonCard(): JSX.Element {
  return (
    <div className="card space-y-4 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-slate-800 rounded-lg w-24" />
          <div className="h-3 bg-slate-800/50 rounded-lg w-32" />
        </div>
        <div className="w-10 h-10 bg-slate-800 rounded-full" />
      </div>

      {/* Body */}
      <div className="space-y-2">
        <div className="h-2 bg-slate-800 rounded-full w-full" />
        <div className="h-2 bg-slate-800/70 rounded-full w-3/4" />
      </div>

      {/* Footer */}
      <div className="flex gap-2">
        <div className="h-8 bg-slate-800 rounded-xl flex-1" />
        <div className="h-8 bg-slate-800 rounded-xl flex-1" />
      </div>
    </div>
  )
}

// Multiple skeletons
export function SkeletonList({ count = 3 }: { count?: number }): JSX.Element {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
