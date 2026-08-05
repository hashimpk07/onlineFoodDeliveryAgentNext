"use client";
"use no memo";

import { useState } from "react";

import Link from "next/link";

import { Download, Map } from "lucide-react";

import {
  ClientTypes,
  getOrderShopOptions,
  getOrderStatusOptions,
} from "@/app/[locale]/(main)/dashboard/client/orders/_components/orders-table/orders-table-options";
import { useOrdersUrlParams } from "@/app/[locale]/(main)/dashboard/client/orders/_hooks/use-orders-params";
import {
  Shop,
  Status,
} from "@/app/[locale]/(main)/dashboard/client/orders/_types/orders";
import { CreateOrderModal } from "@/components/create-order-modal";
import { ClientDetails } from "@/components/create-order-modal/types";
import { DataTableFilterBox } from "@/components/data-table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/data-table/data-table-reset-filter";
import { DataTableSearch } from "@/components/data-table/data-table-search";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useUser } from "@/hooks/use-user";
import { fromApiDate, toApiDate } from "@/lib/date";
import { useExportStore } from "@/providers/export-store-provider";

type OrdersFilterPanelProps = {
  shops?: ClientTypes[];
  orderStatus?: Status[];
  shopsData?: Shop[];
  clientId?: string | null;
  clientsDetails?: ClientDetails[];
};

export function OrdersFilterPanel({
  shops,
  orderStatus,
  shopsData,
  clientId,
  clientsDetails,
}: OrdersFilterPanelProps) {
  const [openCreateOrder, setOpenCreateOrder] = useState(false);

  const openExportModal = useExportStore((s) => s.openModal);

  const {
    search: q,
    setSearch: setQ,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    shopname,
    setShopname,
    status,
    setStatus,
    resetFilters,
    isAnyFilterActive,
    setPage,
  } = useOrdersUrlParams();

  const SHOP_OPTIONS = getOrderShopOptions(shops);
  const STATUS_OPTIONS = getOrderStatusOptions(orderStatus);

  const { user } = useUser();
  const canCreateOrder = user?.permissions.includes("add-client-dispatcher");
  const canViewStreamline = user?.permissions.includes(
    "view-client-dispatcher",
  );

  return (
    <>
      <div className="rounded-xl p-4 bg-card sm:p-6 shadow-sm space-y-4 border border-black">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DateRangePicker
            label="Date Range"
            from={fromApiDate(fromDate)}
            to={fromApiDate(toDate)}
            onChange={(from, to) => {
              setFromDate(from ? toApiDate(from) : null);
              setToDate(to ? toApiDate(to) : null);
            }}
          />

          <DataTableSearch
            label="Search"
            searchKey="Order Id"
            searchQuery={q}
            setSearchQuery={setQ}
          />

          <DataTableFilterBox
            label="Select A Shop"
            title="Shop"
            options={SHOP_OPTIONS}
            filterValue={shopname ? [shopname] : null}
            setFilterValue={(value) => {
              setShopname(value?.[0] ?? "");
              setPage(1);
            }}
          />

          <DataTableFilterBox
            label="Select Order Status"
            title="Status"
            options={STATUS_OPTIONS}
            filterValue={status}
            setFilterValue={(value) => {
              setStatus(value ?? []);
              setPage(1);
            }}
          />
        </div>

        <div className="flex justify-end gap-2">
          {canCreateOrder && (
            <Button variant="outline" onClick={() => setOpenCreateOrder(true)}>
              CREATE ORDER
            </Button>
          )}

          {canViewStreamline && (
            <Button asChild variant="outline" className="uppercase">
              <Link
                href="/streamline-client"
                target="_self"
                rel="noopener noreferrer"
              >
                <Map className="mr-2 h-4 w-4" />
                streamline view
              </Link>
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() =>
              openExportModal({
                reportType: "client_order_report",
                exportUrl: "/public/export",
                method: "POST",
                payload: {
                  q: q || undefined,
                  from_date: fromDate || undefined,
                  to_date: toDate || undefined,
                  shop_id: shopname || undefined,
                  status_id: status && status.length > 0 ? status : undefined,
                },
              })
            }
            className="flex items-center gap-2"
          >
            <Download className="size-4" />
            Export
          </Button>

          <DataTableResetFilter
            isFilterActive={isAnyFilterActive}
            onReset={resetFilters}
          />
        </div>
      </div>

      {/* Create Order Modal */}
      <CreateOrderModal
        open={openCreateOrder}
        onOpenChange={setOpenCreateOrder}
        shopsData={shopsData}
        clientId={clientId ?? null}
        clientsDetails={clientsDetails}
      />
    </>
  );
}
