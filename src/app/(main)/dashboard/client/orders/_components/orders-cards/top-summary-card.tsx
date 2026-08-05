"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface OrdersSummaryCardProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  className?: string;
}

export function OrdersSummaryCard({
  label,
  value,
  icon,
  className,
}: OrdersSummaryCardProps) {
  return (
    <Card className={cn("w-full rounded-xl border shadow-sm", className)}>
      <CardContent className="flex flex-col items-center justify-center py-8 gap-3">
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-background text-muted-foreground">
            {icon}
          </div>
        )}

        <p className="text-3xl font-bold text-foreground">{value}</p>

        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
      </CardContent>
    </Card>
  );
}
