/* eslint-disable */
"use client";

import { useState } from "react";

import {
  CheckCircle2,
  Clock,
  ShoppingBag,
  XCircle,
} from "lucide-react";

import { OrderCard } from "@/app/[locale]/(main)/streamline-3pl/_components/captain/order-card";
import { CaptainDetailsData } from "@/app/[locale]/(main)/streamline-3pl/_lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CaptainDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  captain: CaptainDetailsData | null | undefined;
  captainName?: string;
  isLoading: boolean;
  isError: boolean;
}

const StatRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) => (
  <div className="flex items-center justify-between rounded-xl border px-4 py-3">
    <div className="flex items-center gap-2 text-sm font-medium">
      {icon}
      {label}
    </div>
    <span className="rounded-md bg-muted px-3 py-1 text-sm font-bold">
      {value}
    </span>
  </div>
);

const OrderCardSkeleton = () => (
  <div className="border-b py-4 space-y-2">
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-24 rounded-md" />
    </div>
    <Skeleton className="h-3 w-48" />
    <Skeleton className="h-3 w-36" />
  </div>
);

const StatRowSkeleton = () => (
  <div className="flex items-center justify-between rounded-xl border px-4 py-3">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-6 w-10 rounded-md" />
  </div>
);

export const CaptainDetailsDialog = ({
  open,
  onOpenChange,
  captain,
  captainName,
  isLoading,
  isError,
}: CaptainDetailsDialogProps) => {
  const [tab, setTab] = useState("current");
  const displayName = captain?.name ?? captainName;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden rounded-xl">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-lg font-semibold">
            Captain Details{displayName ? ` — ${displayName}` : ""}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="w-full rounded-none h-11 bg-muted/50 p-0 border-b">
            <TabsTrigger
              value="current"
              className="flex-1 h-full rounded-none text-sm font-semibold data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Current Tasks
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="flex-1 h-full rounded-none text-sm font-semibold data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Task History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="m-0">
            <div className="max-h-[420px] overflow-y-auto px-4">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <OrderCardSkeleton key={i} />
                ))
              ) : isError ? (
                <p className="py-8 text-center text-sm text-destructive">
                  Failed to load orders. Please try again.
                </p>
              ) : !captain?.current_orders ||
                captain.current_orders.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No current orders.
                </p>
              ) : (
                captain.current_orders.map((order) => (
                  <div key={order.id} className="mb-3">
                    <OrderCard order={order} />
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="history" className="m-0">
            <div className="flex flex-col gap-3 p-4">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <StatRowSkeleton key={i} />
                ))
              ) : isError ? (
                <p className="py-8 text-center text-sm text-destructive">
                  Failed to load history. Please try again.
                </p>
              ) : (
                <>
                  <StatRow
                    icon={<ShoppingBag className="h-4 w-4 text-orange-500" />}
                    label="Total Orders"
                    value={captain?.task_history.total_orders ?? 0}
                  />
                  <StatRow
                    icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
                    label="Accepted"
                    value={captain?.task_history.total_accepted ?? 0}
                  />
                  <StatRow
                    icon={<XCircle className="h-4 w-4 text-destructive" />}
                    label="Declined"
                    value={captain?.task_history.total_declined ?? 0}
                  />
                  <StatRow
                    icon={<Clock className="h-4 w-4 text-yellow-500" />}
                    label="Missed"
                    value={captain?.task_history.missed_orders ?? 0}
                  />
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
