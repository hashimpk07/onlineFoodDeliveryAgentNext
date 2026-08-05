import { WebhookCardSkeleton } from "@/app/[locale]/(main)/dashboard/client/access-token/_components/_cards/webhook-card-skelton";
import PlaceholderContent from "@/components/content/placeholder-content";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <AppBreadcrumb
        routes={[{ label: "Home", href: "/" }, { label: "Access Token" }]}
      />
      <PlaceholderContent>
        <div className="space-y-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-7 w-40" />
              <Skeleton className="h-4 w-72" />
            </div>
            <Skeleton className="h-9 w-36" />
          </div>

          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <div className="bg-card rounded-xl border p-4">
              <DataTableSkeleton
                columnCount={2}
                rowCount={4}
                showViewOptions={false}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <WebhookCardSkeleton />
              <WebhookCardSkeleton />
            </div>
          </div>
        </div>
      </PlaceholderContent>
    </>
  );
}
