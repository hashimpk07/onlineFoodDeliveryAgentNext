"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface OrdersSummaryCardSkeletonProps {
  className?: string;
}

export function OrdersSummaryCardSkeleton({
  className,
}: OrdersSummaryCardSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {[1, 2].map((i) => (
        <Card
          key={i}
          className={cn("w-full rounded-xl border shadow-sm", className)}
        >
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            {/* Circle (icon placeholder) */}
            <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />

            {/* Big number */}
            <div className="h-8 w-24 rounded-md bg-muted animate-pulse" />

            {/* Label */}
            <div className="h-4 w-32 rounded-md bg-muted animate-pulse" />
          </div>
        </Card>
      ))}
    </div>
  );
}
