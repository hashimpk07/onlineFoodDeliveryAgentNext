"use client";

import { ClientStatCardSkeleton } from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_components/dashboard-stats-skelton";
import { ClientDashboardFilterPanel } from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_components/filter-panel";
import { ClientStatCard } from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_components/stats-card";
import { useClientDashboardStats } from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_hooks/use-dashboard-stats";
import { cn } from "@/lib/utils";

const colorVariants: Record<
  string,
  { bg: string; text: string; icon: string }
> = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-600 dark:text-blue-400",
    icon: "text-blue-600 dark:text-blue-400",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-600 dark:text-emerald-400",
    icon: "text-emerald-600 dark:text-emerald-400",
  },
  cyan: {
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    text: "text-cyan-600 dark:text-cyan-400",
    icon: "text-cyan-600 dark:text-cyan-400",
  },
  rose: {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    text: "text-rose-600 dark:text-rose-400",
    icon: "text-rose-600 dark:text-rose-400",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-600 dark:text-amber-400",
    icon: "text-amber-600 dark:text-amber-400",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-950/30",
    text: "text-orange-600 dark:text-orange-400",
    icon: "text-orange-600 dark:text-orange-400",
  },
};

export function DashboardStats() {
  const { counts, isLoading } = useClientDashboardStats();

  return (
    <>
      <ClientDashboardFilterPanel />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mt-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <ClientStatCardSkeleton key={i} />
            ))
          : (counts ?? []).map((stat) => {
              const Icon = stat.icon;
              const variant = colorVariants[stat.color] || colorVariants.blue;
              return (
                <ClientStatCard
                  key={stat.label}
                  icon={<Icon className="h-6 w-6" />}
                  label={stat.label}
                  value={stat.value}
                  iconClassName={cn(
                    "p-4 rounded-2xl flex items-center justify-center",
                    variant.bg,
                    variant.icon,
                  )}
                />
              );
            })}
      </div>
    </>
  );
}
