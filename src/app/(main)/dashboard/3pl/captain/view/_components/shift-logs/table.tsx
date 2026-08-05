"use client";
"use no memo";
import { useMemo, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateVehicleKm } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_api/update-shift-status";
import { createShiftColumns } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_components/shift-logs/column";
import UpdateVehicleKmModal from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_components/shift-logs/update-km-modal";
import { useCaptainLogs } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_hooks/use-captain-logs";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { TablePagination } from "@/components/data-table/table-pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

export function ShiftStatusLogsTable() {
  const {
    shifts,
    pagination,
    isError,
    isLoading,
    isFetching,
    shiftPageSize,
    shift_page,
    setShiftPage,
    setShiftPageSize,
  } = useCaptainLogs();

  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState<any>(null);

  const handleView = (row: any) => {
    console.log(row);
    setSelectedShift(row);
    setIsModalOpen(true);
  };

  const updateVehicleKmMutation = useMutation({
    mutationFn: (data: { start_kilometer: string; end_kilometer: string }) =>
      updateVehicleKm(selectedShift.id, {
        start_kilometer: Number(data.start_kilometer),
        end_kilometer: Number(data.end_kilometer),
      }),
    onSuccess: () => {
      toast.success("Vehicle kilometers updated successfully");
      queryClient.invalidateQueries({ queryKey: ["captain-shift-logs"] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error("Error updating vehicle kilometers:", error);
      toast.error("Failed to update vehicle kilometers");
    },
  });

  const handleModalSubmit = async (data: {
    start_kilometer: string;
    end_kilometer: string;
  }) => {
    try {
      await updateVehicleKmMutation.mutateAsync(data);
    } catch {
      // toast handled by the mutation's onError
    }
  };

  const columns = useMemo(() => createShiftColumns(handleView), [handleView]);

  const table = useDataTableInstance({
    data: shifts ?? [],
    columns,
    manualPagination: true,
    pagination: {
      pageIndex: shift_page - 1,
      pageSize: shiftPageSize,
    },
    pageCount: Math.ceil((pagination?.total ?? 0) / shiftPageSize),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 m">
        <DataTableSkeleton
          columnCount={7}
          rowCount={10}
          searchableColumnCount={0}
          filterableColumnCount={0}
          showViewOptions={false}
        />
      </div>
    );
  }

  return (
    <>
      <Card className="max-w-7xl mx-auto mt-5">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">
              Duty On - Off History
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <DataTable table={table} columns={columns} />
          <TablePagination
            totalCount={pagination?.total ?? 0}
            page={shift_page}
            pageSize={shiftPageSize}
            onPageChange={setShiftPage}
            onPageSizeChange={setShiftPageSize}
          />
        </CardContent>
      </Card>

      <UpdateVehicleKmModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        isLoading={updateVehicleKmMutation.isPending}
      />
    </>
  );
}
