"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StreamlineListPaginationProps = {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  isFetching?: boolean;
  className?: string;
};

export function StreamlineListPagination({
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  isFetching = false,
  className,
}: StreamlineListPaginationProps) {
  if (!hasPrev && !hasNext) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 border-t border-border/60 pt-3",
        className,
      )}
    >
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-8 gap-1 px-2.5"
        onClick={onPrev}
        disabled={!hasPrev || isFetching}
      >
        <ChevronLeft className="size-4" />
        Previous
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-8 gap-1 px-2.5"
        onClick={onNext}
        disabled={!hasNext || isFetching}
      >
        Next
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
