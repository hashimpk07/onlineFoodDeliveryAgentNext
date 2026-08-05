/* eslint-disable complexity */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client";

import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { createBulkCaptainCommissionPaymentApi } from "../_api/captain-commission-confirm-payment";

import type {
  BulkCaptainCommissionPaymentRequest,
  CaptainCommissionPaymentModalProps,
} from "../_types/captain-commission-confirm-payment-type";

export function CaptainCommissionPaymentModal({
  open,
  onClose,
  onSuccess,
  selectedRows = [],
  fromDate,
  toDate,
}: CaptainCommissionPaymentModalProps) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalAmount = selectedRows.reduce(
    (sum, row) => sum + (Number(row.paying_amount) || 0),
    0,
  );

  const totalOrders = selectedRows.reduce(
    (sum, row) => sum + (Number(row.attended_orders) || 0),
    0,
  );

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const requestBody: BulkCaptainCommissionPaymentRequest = {
        captainPaymentsData: selectedRows.map((row) => ({
          id: row.captain_id || row.id,
          paying_amount: Number(row.paying_amount),
          payment_mode: row.payment_method === "Cash" ? 2 : 1,
          orders_count: Number(row.attended_orders),
          avg_comm_order: Number(row.avg_commission || 0),
          paying_salary: row.paying_salary ? Number(row.paying_salary) : null,
          worked_days: null,
          per_day_salary: null,
        })),
        from_date: fromDate,
        to_date: toDate,
      };

      const response = await createBulkCaptainCommissionPaymentApi(requestBody);

      if (response.status === "success") {
        toast.success(response.message ?? "Payments confirmed successfully");
        void queryClient.invalidateQueries({
          queryKey: ["captain-commission-confirm-payment-list"],
        });
        onSuccess?.();
        onClose();
      } else {
        toast.error(response.message ?? "Failed to process payments.");
      }
    } catch (error: any) {
      toast.error(error?.message ?? "An error occurred during confirmation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-6xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b flex-shrink-0">
          <div className="flex items-center gap-3">
            <DialogTitle className="text-lg font-semibold uppercase tracking-wider">
              Confirm Captain Commission Payments
            </DialogTitle>
            <Badge variant="outline">{selectedRows.length} selected</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Please review and confirm the payment details before processing.
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-hidden px-6 py-5">
          <div className="rounded-xl overflow-hidden border h-full flex flex-col max-h-[500px]">
            <div className="bg-[#1e4d5e] px-4 py-3 flex-shrink-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-white">
                Payment Review
              </p>
            </div>
            <ScrollArea className="flex-1">
              <Table>
                <TableHeader className="bg-muted/50 sticky top-0 z-20">
                  <TableRow>
                    <TableHead className="font-bold">Captain ID</TableHead>
                    <TableHead className="font-bold">Captain Name</TableHead>
                    <TableHead className="font-bold">Region</TableHead>
                    <TableHead className="font-bold">Vehicle</TableHead>
                    <TableHead className="text-right font-bold">
                      Orders
                    </TableHead>
                    <TableHead className="text-right font-bold">
                      Earnings
                    </TableHead>
                    <TableHead className="text-right font-bold text-primary">
                      Paying Amount
                    </TableHead>
                    <TableHead className="font-bold text-primary">
                      Method
                    </TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedRows.length > 0 ? (
                    selectedRows.map((row, index) => {
                      const captainId = row.emp_id ?? row.captain_code ?? "N/A";
                      const region =
                        row.work_region ?? row.working_region ?? "N/A";
                      const earnings =
                        row.total_earnings ?? row.total_commission ?? 0;
                      const status = row.work_status ?? row.status ?? "N/A";

                      return (
                        <TableRow
                          key={`${row.captain_id}-${index}`}
                          className="hover:bg-muted/30 transition-colors"
                        >
                          <TableCell className="font-medium text-xs">
                            {captainId}
                          </TableCell>
                          <TableCell className="font-medium">
                            {row.captain_name}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-xs">
                            {region}
                          </TableCell>
                          <TableCell className="text-xs">
                            {row.vehicle_type ?? "N/A"}
                          </TableCell>
                          <TableCell className="text-right">
                            {row.attended_orders}
                          </TableCell>
                          <TableCell className="text-right">
                            {Number(earnings).toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right font-bold text-primary">
                            {Number(row.paying_amount ?? 0).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="font-medium">
                              {row.payment_method || "N/A"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                status === "Active" ? "default" : "secondary"
                              }
                              className="text-[10px] px-1 h-5"
                            >
                              {status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        className="h-32 text-center text-muted-foreground"
                      >
                        No captains selected.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>

        <DialogFooter className="px-6 pb-6 border-t pt-4 flex-shrink-0">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="min-w-[100px]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || selectedRows.length === 0}
            className="min-w-[180px]"
          >
            {isSubmitting ? "Processing..." : "Confirm & Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
