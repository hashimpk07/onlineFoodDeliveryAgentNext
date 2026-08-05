/* eslint-disable */
"use client";
"use no memo";

import { Table } from "@tanstack/react-table";
import { useMemo } from "react";

import { DataTableFilterBox } from "@/components/data-table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/data-table/data-table-reset-filter";
import { DataTableSearch } from "@/components/data-table/data-table-search";

import { useUser } from "@/hooks/use-user";

import { mapToSelectOptions } from "@/app/[locale]/(main)/dashboard/3pl/captain/_types/filters";
import StatusCard from "@/app/[locale]/(main)/dashboard/3pl/order/_components/orders-cards/orders-cards";
import useOrdersFilters from "@/app/[locale]/(main)/dashboard/3pl/order/_hooks/use-order-filters";
import { useOrdersUrlParams } from "@/app/[locale]/(main)/dashboard/3pl/order/_hooks/use-orders-parms";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import Link from "next/link";

type ActiveCard = "ongoing" | "cancellation" | "delivered" | "all" | null;

const STATUS_MAP: Record<Exclude<ActiveCard, null>, string[]> = {
  ongoing: ["3", "4", "5", "6", "8", "9", "22"],
  cancellation: ["19", "12", "11"],
  delivered: ["10"],
  all: [],
};

function deriveActiveCard(status: string | string[] | null): ActiveCard {
  const current = Array.isArray(status)
    ? status.map(String).sort().join(",")
    : status
      ? String(status)
      : "";

  for (const [card, statuses] of Object.entries(STATUS_MAP) as [
    Exclude<ActiveCard, null>,
    string[],
  ][]) {
    if (statuses.sort().join(",") === current) return card;
  }
  return null;
}

type OrderFilterPanelProps = {
  table?: Table<any>;
};

export function OrderFilterPanel({ table }: OrderFilterPanelProps) {
  const { filter_captains, filter_status, order_status_counts } =
    useOrdersFilters();

  const {
    orderId,
    captain,
    status,
    orderType,
    fromdate,
    endDate,
    setOrderId,
    setCaptain,
    setStatus,
    setOrderType,
    setFromDate,
    setEndDate,
    resetFilters,
    isAnyFilterActive,
    page,
    setPage,
  } = useOrdersUrlParams();

  /** ✅ Derived from URL state */
  const localActiveCard = useMemo(() => deriveActiveCard(status), [status]);

  /** ✅ Click handler */
  const handleCardClick = (
    card: Exclude<ActiveCard, null>,
    statuses: string[],
  ) => {
    if (localActiveCard === card) {
      setStatus("");
    } else {
      setStatus(statuses);
    }
    setPage(1);
  };

  const FILTER_CAPTAIN_OPTIONS = mapToSelectOptions(
    filter_captains,
    (c) => c.name,
  );

  const FILTER_STATUS_OPTIONS = mapToSelectOptions(
    filter_status,
    (r) => r.name,
  );

  const ORDER_TYPES = [
    { value: "Fast", label: "FAST" },
    { value: "Scheduled", label: "Scheduled" },
  ];

  const { user } = useUser();
  const canViewOrders = user?.permissions.includes("view-third-party-orders");

  return (
    <>
      {/* Filters */}
      <div className="rounded-xl p-4 bg-card sm:p-6 shadow-sm space-y-4 border border-black">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DataTableSearch
            label="Client ID"
            searchKey="Search Client ID"
            searchQuery={orderId || ""}
            setSearchQuery={async (v, opts) => {
              const result = await setOrderId(v, opts);
              await setPage(1);
              return result;
            }}
          />

          <DataTableFilterBox
            label="Select Captain"
            title="Captain"
            options={FILTER_CAPTAIN_OPTIONS}
            filterValue={captain ? [captain] : null}
            setFilterValue={(value) => {
              setCaptain(value?.[0] ?? null);
              setPage(1);
            }}
          />

          <DataTableFilterBox
            label="Order Type"
            title="Type"
            options={ORDER_TYPES}
            filterValue={orderType ? [orderType] : null}
            setFilterValue={(value) => {
              setOrderType(value?.[0] ?? null);
              setPage(1);
            }}
          />

          <DataTableFilterBox
            label="Order Status"
            title="Status"
            options={FILTER_STATUS_OPTIONS}
            filterValue={status ? [status] : []}
            setFilterValue={(value) => {
              setStatus(value?.[0] ?? null);
              setPage(1);
            }}
          />

          {/* <DatePicker
            label="Start Date"
            date={fromDDMMYYYY(fromdate)}
            onChange={(date) => {
              setFromDate(date ? toDDMMYYYY(date) : null);
              setPage(1);
            }}
          />

          <DatePicker
            label="End Date"
            date={fromDDMMYYYY(endDate)}
            onChange={(date) => {
              setEndDate(date ? toDDMMYYYY(date) : null);
              setPage(1);
            }}
          /> */}
        </div>

        <div className="flex justify-end gap-2">
          {canViewOrders && (
            <Button asChild variant="outline" className="uppercase">
              <Link href="/streamline-3pl">
                <Map className="mr-2 h-4 w-4" />
                streamline view
              </Link>
            </Button>
          )}

          <DataTableResetFilter
            isFilterActive={isAnyFilterActive}
            onReset={resetFilters}
          />
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <StatusCard
          title="On Going"
          count={order_status_counts?.on_going_orders_count ?? 0}
          color="blue"
          isActive={localActiveCard === "ongoing"}
          onClick={() => handleCardClick("ongoing", STATUS_MAP.ongoing)}
        />

        <StatusCard
          title="Cancellation"
          count={order_status_counts?.request_for_cancel_orders_count ?? 0}
          color="red"
          isActive={localActiveCard === "cancellation"}
          onClick={() =>
            handleCardClick("cancellation", STATUS_MAP.cancellation)
          }
        />

        <StatusCard
          title="Delivered"
          count={""}
          color="green"
          isActive={localActiveCard === "delivered"}
          onClick={() => handleCardClick("delivered", STATUS_MAP.delivered)}
        />

        <StatusCard
          title="All"
          count={""}
          color="gray"
          isActive={localActiveCard === "all"}
          onClick={() => handleCardClick("all", STATUS_MAP.all)}
        />
      </div>
    </>
  );
}
