"use client";

export function StatusCardsSkeleton() {
  return (
    <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-[72px] rounded-xl border  border-gray-90 p-4">
          <div className="flex flex-col gap-3">
            {/* Label skeleton */}
            <div className="h-3 w-20 rounded bg-muted animate-pulse" />

            {/* Value skeleton */}
            <div className="h-5 w-8 rounded bg-muted animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
