export const FeedSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonPost key={i} />
      ))}
    </div>
  )
}

const SkeletonPost = () => (
  <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm p-4 animate-pulse">
    {/* Header */}
    <div className="flex items-center gap-3 mb-3">
      <div className="h-10 w-10 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
      <div className="flex flex-col gap-2">
        <div className="h-3 w-32 bg-neutral-200 dark:bg-neutral-700 rounded" />
        <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-700 rounded" />
      </div>
    </div>

    {/* Content */}
    <div className="space-y-2 mb-3">
      <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-700 rounded" />
      <div className="h-3 w-5/6 bg-neutral-200 dark:bg-neutral-700 rounded" />
    </div>

    {/* Image (optional) */}
    <div className="w-full h-60 bg-neutral-200 dark:bg-neutral-700 rounded-xl mb-4" />

    {/* Footer buttons */}
    <div className="flex justify-between items-center pt-2 border-t border-neutral-100 dark:border-neutral-800">
      <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-700 rounded" />
      <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-700 rounded" />
      <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-700 rounded" />
    </div>
  </div>
)
