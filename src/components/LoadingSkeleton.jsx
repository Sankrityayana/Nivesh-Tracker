function LoadingSkeleton() {
  return (
    <section className="panel mt-4 overflow-hidden p-4">
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="h-10 animate-pulse rounded-md bg-slate-700/40" />
        ))}
      </div>
    </section>
  )
}

export default LoadingSkeleton
