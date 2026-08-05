"use client";
import ReusablePieChart from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_components/pie-cart";
import useChartResponse from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_hooks/use-charts";
import StatsLoading from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_components/donut-skelton";

export function CaptainActiveInactiveChart() {
  const { active_inactive_chart, active_inactive_chart_loading } =
    useChartResponse();

  if (active_inactive_chart_loading) {
    return <StatsLoading />;
  }

  return (
    <ReusablePieChart
      data={active_inactive_chart}
      title="Active and Inactive Captains"
      showLabel={false}
      innerRadius={0}
      outerRadius={130}
      padingAngle={0}
      minAngle={0}
    />
  );
}
