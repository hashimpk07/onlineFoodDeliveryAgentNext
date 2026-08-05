"use client";
import ReusablePieChart from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_components/pie-cart";
import useChartResponse from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_hooks/use-charts";
import StatsLoading from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_components/donut-skelton";

export function CaptainByVehicleChart() {
  const { captain_by_vehicle, captain_by_vehicle_loading } = useChartResponse();

  if (captain_by_vehicle_loading) {
    return <StatsLoading />;
  }

  return (
    <ReusablePieChart
      data={captain_by_vehicle}
      title="Active Captains By Vehicle Type"
      showLabel={false}
      innerRadius={0}
      outerRadius={130}
      padingAngle={2}
      minAngle={10}
    />
  );
}
