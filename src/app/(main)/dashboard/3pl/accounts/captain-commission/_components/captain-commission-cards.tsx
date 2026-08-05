"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CaptainCommissionCardProps {
  title: string;
  count: string | number;
  className?: string;
}

export function CaptainCommissionCard({
  title,
  count,
  className,
}: CaptainCommissionCardProps) {
  return (
    <Card className={cn("rounded-xl shadow-sm border  h-[90%]", className)}>
      <CardContent className="flex flex-col items-center text-center p-7 space-y-2">
        <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {count}
        </div>

        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h3>
      </CardContent>
    </Card>
  );
}
