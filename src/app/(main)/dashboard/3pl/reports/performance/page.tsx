import { FilterPanel } from "@/app/[locale]/(main)/dashboard/3pl/reports/performance/_components/filter-panel";
import { PerformanceTable } from "@/app/[locale]/(main)/dashboard/3pl/reports/performance/_components/performance-view";
import PlaceholderContent from "@/components/content/placeholder-content";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

export default function Page() {
  return (
    <>
      <AppBreadcrumb
        routes={[
          { label: "Home", href: "/" },
          { label: "Captain Performance" },
        ]}
      />

      <PlaceholderContent>
        <PerformanceTable />
      </PlaceholderContent>
    </>
  );
}
