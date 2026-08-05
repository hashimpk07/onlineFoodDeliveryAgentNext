"use client";
import {
  Package,
  PackageCheck,
  PackageX,
  Undo2,
  UserCheck,
  UserX,
} from "lucide-react";

import { StatCard } from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_components/stats-card";
import useDashboardResponse from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_hooks/use-dashboard-response";
import { StatusCardsSkeleton } from "@/app/[locale]/(main)/dashboard/client/orders/_components/orders-table/status-card-skelton";

const TITLES: Record<string, string> = {
  delivered: "Delivered Order",
  return_to_client: "Returned to Client",
  canceled: "Canceled",
} as const;

function getTitle(name: string): string {
  return (
    TITLES[name.toLowerCase()] ??
    name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  );
}

const getStatusConfig = (name: string) => {
  const lowerName = name.toLowerCase();

  switch (lowerName) {
    case "delivered":
      return {
        icon: <PackageCheck className="w-7 h-7" />,
        className:
          "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
      };
    case "return_to_client":
    case "returned":
      return {
        icon: <Undo2 className="w-7 h-7" />,
        className:
          "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400",
      };
    case "canceled":
    case "cancelled":
      return {
        icon: <PackageX className="w-7 h-7" />,
        className:
          "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400",
      };
    default:
      return {
        icon: <Package className="w-7 h-7" />,
        className:
          "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400",
      };
  }
};

export function DashboardStats() {
  const { counts, isLoading } = useDashboardResponse();

  if (isLoading) {
    return (
      <div className="my-2">
        <StatusCardsSkeleton />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mt-3">
      <StatCard
        icon={<Package className="w-7 h-7" />}
        iconClassName="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
        label="Total Order"
        value={counts?.total_orders ?? 0}
      />

      {counts?.statuses.map((status, index) => {
        const config = getStatusConfig(status.name);
        return (
          <StatCard
            key={index}
            icon={config.icon}
            iconClassName={config.className}
            label={getTitle(status.name)}
            value={status.count}
          />
        );
      })}

      <StatCard
        icon={<UserCheck className="w-7 h-7" />}
        iconClassName="bg-teal-100 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400"
        label="Online Captains"
        value={counts?.online_captains ?? 0}
      />
      <StatCard
        icon={<UserX className="w-7 h-7" />}
        iconClassName="bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400"
        label="Offline Captains"
        value={counts?.offline_captains ?? 0}
      />
    </div>
  );
}
