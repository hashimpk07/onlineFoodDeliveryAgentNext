"use client";

import { useMemo, useState } from "react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { Button } from "@/components/ui/button";
import ErrorDisplay from "@/components/ui/error-display";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { useNotifications } from "../_hooks/use-notifications";
import { useNotificationsParams } from "../_hooks/use-notifications-params";

import { CreateNotificationModal } from "./create-notification-modal";
import { createNotificationColumns } from "./notifications-columns";

import type { NotificationListResponse } from "../_types";

interface NotificationsViewProps {
  initialData: NotificationListResponse;
}

export default function NotificationsView({
  initialData,
}: NotificationsViewProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const columns = useMemo(() => createNotificationColumns(), []);

  const { page, setPage, perPage, setPerPage } = useNotificationsParams();

  const { data, isError, error, isFetching } = useNotifications(
    { page, per_page: perPage },
    initialData,
  );

  const resData = data ?? initialData;
  const notifications = resData.data.notifications;
  const total = resData.data.pagination.total;
  const lastPage = resData.data.pagination.last_page;
  const sendableTypes = resData.data.sendable_types;

  const table = useDataTableInstance({
    data: notifications,
    columns,
    pageCount: lastPage,
    manualPagination: true,
    getRowId: (row, index) => `${String(row.id)}-${index}`,
  });

  if (isError || resData.status === "error") {
    return (
      <ErrorDisplay
        title="Failed to load notifications"
        message={
          resData.message ||
          (error instanceof Error ? error.message : "An unknown error occurred")
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full min-w-0">
      <div className="flex justify-end">
        <Button onClick={() => setCreateOpen(true)}>Create Notification</Button>
      </div>

      <div className="flex-1 rounded-md border relative bg-card shadow-sm w-full min-w-0 overflow-hidden">
        {isFetching && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
            <span className="text-muted-foreground animate-pulse font-medium">
              Loading...
            </span>
          </div>
        )}
        <DataTable table={table} columns={columns} />
        <DataTablePagination
          table={table}
          totalCount={total}
          page={page}
          pageSize={perPage}
          setPage={setPage}
          setPageSize={setPerPage}
        />
      </div>

      <CreateNotificationModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        sendableTypes={sendableTypes}
      />
    </div>
  );
}
