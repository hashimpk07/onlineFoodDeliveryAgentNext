import React from "react";

export const CaptainCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-[20px] overflow-hidden max-w-sm mx-auto dark:bg-zinc-900 animate-pulse">
      {/* Top accent bar placeholder */}
      <div className="h-[3px] bg-gray-200 dark:bg-zinc-800" />

      <div className="px-[18px] py-4">
        {/* Header Skeleton */}
        <div className="flex items-center gap-3">
          <div className="w-[52px] h-[52px] rounded-2xl bg-gray-200 dark:bg-zinc-800 shrink-0" />

          <div className="flex-1 min-w-0 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-3/4" />
            <div className="h-3 bg-gray-100 dark:bg-zinc-700 rounded w-1/2" />
          </div>

          <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-zinc-800 shrink-0" />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-zinc-800 my-3" />

        {/* Footer pills Skeleton */}
        <div className="flex gap-2">
          <div className="h-9 bg-gray-50 dark:bg-zinc-800 rounded-xl flex-1" />
          <div className="h-9 bg-gray-50 dark:bg-zinc-800 rounded-xl flex-1" />
        </div>
      </div>
    </div>
  );
};
