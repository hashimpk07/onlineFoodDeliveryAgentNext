import {
  CheckCircle,
  Clock,
  Package,
  RotateCcw,
  Truck,
  XCircle,
} from "lucide-react";

import { DashboardStats } from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_types/client-dashboard";

export function buildStats(data: DashboardStats) {
  return [
    {
      label: "Total Orders",
      value: data.total_orders ?? 0,
      icon: Package,
      color: "blue",
    },
    {
      label: "Delivered",
      value: data.delivered_orders ?? 0,
      icon: CheckCircle,
      color: "emerald",
    },
    {
      label: "Shipped",
      value: data.shipped ?? 0,
      icon: Truck,
      color: "cyan",
    },
    {
      label: "Canceled",
      value: data.canceled ?? 0,
      icon: XCircle,
      color: "rose",
    },
    {
      label: "Returned",
      value: data.returned ?? 0,
      icon: RotateCcw,
      color: "amber",
    },
    {
      label: "Pending",
      value: data.pending ?? 0,
      icon: Clock,
      color: "orange",
    },
  ];
}
