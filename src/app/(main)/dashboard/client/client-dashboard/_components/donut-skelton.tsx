export default function StatsLoading() {
  return (
    <div
      className="
        h-[420px]
        rounded-2xl
        border
        bg-white
        dark:bg-zinc-900
        border-zinc-200
        dark:border-zinc-800
        shadow-sm
        p-4 sm:p-6
        animate-pulse
      "
    >
      {/* Header Skeleton */}
      <div className="mb-6 space-y-2">
        <div className="h-4 w-40 rounded bg-zinc-300 dark:bg-zinc-700" />
        <div className="h-3 w-28 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* Body */}
      <div className="h-[320px] flex flex-col sm:flex-row gap-6">
        {/* Legend Skeleton */}
        <div className="sm:w-1/2 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-sm bg-zinc-300 dark:bg-zinc-700" />
              <div className="h-4 w-40 rounded bg-zinc-300 dark:bg-zinc-700" />
            </div>
          ))}
        </div>

        {/* Donut Skeleton */}
        <div className="sm:w-1/2 flex items-center justify-center">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64">
            <div className="absolute inset-0 rounded-full border-[18px] border-zinc-300 dark:border-zinc-700" />
            <div className="absolute inset-12 rounded-full bg-white dark:bg-zinc-900" />
          </div>
        </div>
      </div>
    </div>
  );
}
