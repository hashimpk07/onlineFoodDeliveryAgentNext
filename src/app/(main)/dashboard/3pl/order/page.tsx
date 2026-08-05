import OrderViewPage from "@/app/[locale]/(main)/dashboard/3pl/order/_components/order-view-page";
import PlaceholderContent from "@/components/content/placeholder-content";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

export default async function Orders() {
  return (
    <>
      <AppBreadcrumb
        routes={[{ label: "Home", href: "/" }, { label: "Orders" }]}
      />

      <PlaceholderContent>
        <OrderViewPage />
      </PlaceholderContent>
    </>
  );
}
