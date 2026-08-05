import { Suspense } from "react";

import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

import { getNotifications } from "./_api/get-notifications";
import NotificationsView from "./_components/notifications-view";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    per_page?: string;
  }>;
}

export default async function NotificationsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const per_page = Number(params.per_page) || 20;

  const initialData = await getNotifications({ page, per_page });

  return (
    <>
      <AppBreadcrumb
        routes={[
          { label: "Home", href: "/dashboard/home" },
          { label: "CRM" },
          { label: "Notifications" },
        ]}
      />
      <div className="p-4 sm:p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        </div>
        <Suspense
          fallback={
            <div className="p-8 text-center text-muted-foreground animate-pulse">
              Loading notifications...
            </div>
          }
        >
          <NotificationsView initialData={initialData} />
        </Suspense>
      </div>
    </>
  );
}
