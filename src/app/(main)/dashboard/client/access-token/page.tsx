// "use client";
import AccessTokenView from "@/app/[locale]/(main)/dashboard/client/access-token/_components/access-token-view";
import PlaceholderContent from "@/components/content/placeholder-content";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

export default function OrdersPage() {
  return (
    <>
      <AppBreadcrumb
        routes={[{ label: "Home", href: "/" }, { label: "Access Token" }]}
      />
      <PlaceholderContent>
        <AccessTokenView />
      </PlaceholderContent>
    </>
  );
}
