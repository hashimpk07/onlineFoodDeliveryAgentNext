import { WorkingDaysPage } from "@/app/[locale]/(main)/dashboard/3pl/reports/working-days/_components/working-days-view";
import PlaceholderContent from "@/components/content/placeholder-content";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

export default function Page() {
  return (
    <>
      <AppBreadcrumb
        routes={[
          { label: "Home", href: "/" },
          { label: "Working & productive Days" },
        ]}
      />

      <PlaceholderContent>
        <WorkingDaysPage />
      </PlaceholderContent>
    </>
  );
}
