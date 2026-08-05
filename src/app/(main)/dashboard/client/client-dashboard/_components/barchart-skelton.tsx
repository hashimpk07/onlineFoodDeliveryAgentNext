export default function BarchartSkelton() {
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
        <div className="h-4 w-48 rounded bg-zinc-300 dark:bg-zinc-700" />
        <div className="h-3 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* Chart Skeleton */}
      <div className="h-[320px] flex items-end gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md bg-zinc-300 dark:bg-zinc-700"
            style={{
              height: `${30 + (i % 4) * 15}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
