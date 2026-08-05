"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface IdBadgeProps {
  value?: string | number | null;
  className?: string;
}

export function IdChip({ value, className }: IdBadgeProps) {
  if (!value) return <span className="text-sm text-muted-foreground">-</span>;

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-md",
        "font-mono font-medium",
        "text-sm px-2.5 py-1",
        "border-border",
        "bg-muted/30",
        "text-slate-700 dark:text-slate-300",
        className,
      )}
    >
      {value}
    </Badge>
  );
}
