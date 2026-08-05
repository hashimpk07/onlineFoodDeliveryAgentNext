"use client";

import BarchartSkelton from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_components/barchart-skelton";
import OrderStatusBarChart from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_components/order-status-monthly-barchart";
import { useMonthlyOrderStatus } from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_hooks/use-monthly-order-status";

export default function BarChartPage() {
  const { data, isLoading } = useMonthlyOrderStatus();

  if (isLoading) {
    return <BarchartSkelton />;
  }

  return <OrderStatusBarChart data={data} />;
}
