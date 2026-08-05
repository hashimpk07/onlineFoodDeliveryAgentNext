import { CaptainActiveInactiveChart } from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_components/active-inactive-chart";
import { CaptainByRegionChart } from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_components/captain-by-region-chart";
import { CaptainByVehicleChart } from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_components/captain-by-vehicle-chart";
import { ActiveCaptainByOrderStatus } from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_components/captain-count-bar-chart";
import { DashboardStats } from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_components/dashboard-stats";
import { DashboardFilterPanel } from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_components/filter-panel";
import { CaptainShiftStatusChart } from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_components/shift-status-chart";
import PlaceholderContent from "@/components/content/placeholder-content";

export default async function Dashboard() {
  return (
    <>
      {/* <AppBreadcrumb
        routes={[{ label: "Home", href: "/" }, { label: "Dashboard" }]}
      /> */}
      <div className="">
        <h1 className="text-xl font-semibold">
          Third Party Logistics Dashboard
        </h1>
      </div>

      <PlaceholderContent>
        <DashboardFilterPanel />
        <DashboardStats />

        <div
          className="grid gap-5 mt-5
                grid-cols-1
                md:grid-cols-2"
        >
          <CaptainByRegionChart />
          <CaptainByVehicleChart />
          <CaptainShiftStatusChart />
          <CaptainActiveInactiveChart />
        </div>

        <div className="mt-2">
          <ActiveCaptainByOrderStatus />
        </div>
      </PlaceholderContent>
    </>
  );
}
