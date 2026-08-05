"use client";
import ReusableBarChart from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_components/bar-chart";
import useChartResponse from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_hooks/use-charts";
import StatsLoading from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_components/donut-skelton";

export function CaptainByRegionChart() {
  const { captain_by_region, captain_by_region_loading } = useChartResponse();

  if (captain_by_region_loading) {
    return <StatsLoading />;
  }

  const chartData = captain_by_region.map((item) => ({
    label: item.name,
    value: item.value,
  }));
  const colors = captain_by_region.map((item) => item.color);

  return (
    <ReusableBarChart
      data={chartData}
      colors={colors}
      title="Active Captains By Region"
    />
  );
}
