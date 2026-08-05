"use client";

import StatsLoading from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_components/donut-skelton";
import OrderStatusDonut from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_components/order-status-donut";
import { useOrderStatusGraph } from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_hooks/use-orde-status-graph";

export default function StatsPage() {
  const { isLoading } = useOrderStatusGraph();

  if (isLoading) {
    return <StatsLoading />;
  }

  return <OrderStatusDonut />;
}
