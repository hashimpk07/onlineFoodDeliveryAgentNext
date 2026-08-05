"use client";
import { StatCardProps } from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_types/page";
import { Card, CardTitle } from "@/components/ui/card";
import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";

export function StatCard({
  icon,
  label,
  value,
  className,
  iconClassName,
}: StatCardProps) {
  const animatedValue = useCountUp(value);

  return (
    <Card
      className={cn(
        "rounded-2xl p-6 shadow-sm border flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1 bg-card",
        className,
      )}
    >
      <div
        className={cn(
          "p-4 rounded-2xl mb-4 transition-colors duration-300 flex items-center justify-center",
          iconClassName ?? "bg-primary/10 text-primary",
        )}
      >
        {icon}
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
          {label}
        </CardTitle>
        <p className="text-3xl font-bold tracking-tight text-foreground">
          {animatedValue}
        </p>
      </div>
    </Card>
  );
}
