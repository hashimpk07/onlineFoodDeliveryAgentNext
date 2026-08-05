import { ComponentType } from "react";

import { SaudiRiyal } from "lucide-react";

import { AnimatedNumber } from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_components/animated-number";
import { Card, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: ComponentType<{ className?: string }>;
  value: number;
  label: string;
  suffix?: string;
  valueColor?: string;
}

export default function StatCard({
  icon: Icon,
  value,
  label,
  suffix = "",
  valueColor = "text-foreground",
}: StatCardProps) {
  return (
    <Card className="rounded-xl shadow-sm p-6 flex flex-col items-center text-center transition-all hover:shadow-md">
      <div className="bg-primary p-4 rounded-full mb-4">
        <Icon className="w-8 h-8 text-secondary" />
      </div>

      <CardTitle
        className={cn(
          "text-3xl font-bold tracking-tight tabular-nums flex gap-2",
          valueColor,
        )}
      >
        {suffix && suffix == "SAR" && (
          <span>
            <SaudiRiyal className="w-8 h-8" />
          </span>
        )}

        <AnimatedNumber value={value} />

        {suffix && suffix == "%" && <span>%</span>}
      </CardTitle>

      <div className="text-sm font-medium mt-1">{label}</div>
    </Card>
  );
}
