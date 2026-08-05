import AssetsTable from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_components/captain-assets";
import CaptainDetails from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_components/captain-details";
import DocumentsTable from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_components/captain-document";
import CaptainStatistics from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_components/captain-statistics";
import { ShiftOrderLogsTable } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_components/order-logs/table";
import { CaptainViewFilterPanel } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_components/search-filter";
import { ShiftStatusLogsTable } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_components/shift-logs/table";
import VehicleImages from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_components/vehicle-images";
import PlaceholderContent from "@/components/content/placeholder-content";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

export default async function CaptainView() {
  return (
    <>
      <AppBreadcrumb
        routes={[
          { label: "Home", href: "/" },
          { label: "Captains", href: "/dashboard/3pl/captain" },
          { label: "View" },
        ]}
      />

      <PlaceholderContent>
        <CaptainViewFilterPanel />
        <CaptainStatistics />
        <CaptainDetails />
        <ShiftStatusLogsTable />
        <ShiftOrderLogsTable />
        <AssetsTable />
        <DocumentsTable />
        <VehicleImages />
      </PlaceholderContent>
    </>
  );
}
