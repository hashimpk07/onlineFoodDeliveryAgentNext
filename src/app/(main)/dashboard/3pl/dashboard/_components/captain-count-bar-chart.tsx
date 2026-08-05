"use client";
import { FileChartColumnIncreasing } from "lucide-react";

import ReusableBarChart from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_components/bar-chart";
import useChartResponse from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_hooks/use-charts";
import BarchartSkelton from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_components/barchart-skelton";

export function ActiveCaptainByOrderStatus() {
  const { online_captains, online_captains_loading } = useChartResponse();

  if (online_captains_loading) {
    return <BarchartSkelton />;
  }

  return (
    <ReusableBarChart
      data={online_captains?.data ?? []}
      colors={online_captains?.colors ?? []}
      title="Online Captains Count by Order Status"
      emptyStateIcon={<FileChartColumnIncreasing size={40} />}
    />
  );
}
