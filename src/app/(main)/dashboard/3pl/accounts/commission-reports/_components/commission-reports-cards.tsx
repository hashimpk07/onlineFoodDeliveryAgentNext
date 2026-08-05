"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CommissionReportsCardProps {
  title: string;
  count: string | number;
  icon?: React.ReactNode;
  className?: string;
}

export function CommissionReportsCard({
  title,
  count,
  icon,
  className,
}: CommissionReportsCardProps) {
  return (
    <Card className={cn("rounded-xl shadow-sm border h-[90%]", className)}>
      <CardContent className="flex flex-col items-center justify-center text-center p-6 space-y-3">
        {icon && <div className="mb-2">{icon}</div>}
        <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {count}
        </div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
          {title}
        </h3>
      </CardContent>
    </Card>
  );
}
