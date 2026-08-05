"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ClientStatCardSkeleton({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "rounded-2xl p-6 shadow-sm border flex flex-col items-center justify-center text-center bg-card",
        className,
      )}
    >
      {/* Icon skeleton */}
      <div className="p-4 rounded-2xl mb-4 w-14 h-14 bg-muted animate-pulse" />

      {/* Text skeletons */}
      <div className="flex flex-col items-center gap-1.5 w-full">
        <div className="h-3 w-20 rounded-full bg-muted animate-pulse" />
        <div className="h-8 w-12 rounded-full bg-muted animate-pulse mt-1" />
      </div>
    </Card>
  );
}
