import CaptainViewPage from "@/app/[locale]/(main)/dashboard/3pl/captain/_components/captain-view";
import PlaceholderContent from "@/components/content/placeholder-content";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

export default async function Captain() {
  return (
    <>
      <AppBreadcrumb
        routes={[{ label: "Home", href: "/" }, { label: "Captains" }]}
      />

      <PlaceholderContent>
        <CaptainViewPage />
      </PlaceholderContent>
    </>
  );
}
