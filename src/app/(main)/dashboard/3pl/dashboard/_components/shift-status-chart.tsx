"use client";
import ReusablePieChart from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_components/pie-cart";
import useChartResponse from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_hooks/use-charts";
import StatsLoading from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_components/donut-skelton";

export function CaptainShiftStatusChart() {
  const { shift_status, shift_loading } = useChartResponse();

  if (shift_loading) {
    return <StatsLoading />;
  }

  return (
    <ReusablePieChart
      data={shift_status}
      title="Captain By Shift Status"
      showLabel={false}
      innerRadius={0}
      outerRadius={130}
      padingAngle={0}
      minAngle={0}
    />
  );
}
