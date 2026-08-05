/* eslint-disable */
"use client";
"use no memo";

import { type RefObject, ReactNode, useState } from "react";

import { SearchX, ShoppingBag } from "lucide-react";
import { OrderCard3pl } from "@/app/[locale]/(main)/streamline-3pl/_components/orders/order-card";
import { use3plOrdersStreamlineParams } from "@/app/[locale]/(main)/streamline-3pl/_hooks/use-streamline-params";
import { OrderListItem } from "@/app/[locale]/(main)/streamline-client/_lib/types";
import { OrdersPanel } from "@/components/map/shared/order-list";
import { OrderListItemResponse } from "@/app/[locale]/(main)/streamline-3pl/_lib/types";
type Props = {
  onFocusOrder?: (order: OrderListItem) => void;
  orders?: OrderListItemResponse[] | undefined;
  loading?: boolean;
  isFetching?: boolean;
  contentRef?: RefObject<HTMLDivElement | null>;
  footer?: ReactNode;
};

function OrderCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-xl border-l-[5px] border-l-gray-200 bg-white dark:bg-zinc-900/80 p-3 shadow-sm animate-pulse">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-zinc-800 shrink-0" />
          <div className="h-3 w-24 bg-gray-200 dark:bg-zinc-800 rounded" />
        </div>
        <div className="h-6 w-16 bg-gray-100 dark:bg-zinc-800 rounded-full" />
      </div>
      <hr className="mt-2 border-gray-100 dark:border-zinc-800" />
      <div className="mt-3 space-y-3">
        <div className="flex">
          <div className="w-1/2 space-y-1">
            <div className="h-2 w-16 bg-gray-100 dark:bg-zinc-800 rounded" />
            <div className="h-3 w-24 bg-gray-200 dark:bg-zinc-800 rounded" />
          </div>
          <div className="w-1/2 space-y-1">
            <div className="h-2 w-16 bg-gray-100 dark:bg-zinc-800 rounded" />
            <div className="h-3 w-24 bg-gray-200 dark:bg-zinc-800 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrdersList3pl({
  onFocusOrder,
  orders = [],
  loading = false,
  isFetching = false,
  contentRef,
  footer,
}: Props) {
  const { order_search: searchQuery, setOrderSearch: setSearchQuery } =
    use3plOrdersStreamlineParams();

  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleOrderClick = (order: OrderListItem) => {
    setSelectedOrderId(order.id.toString());
    onFocusOrder?.(order);
  };

  return (
    <>
      <OrdersPanel
        title="Orders"
        icon={<ShoppingBag className="w-6 h-6 text-primary" />}
        totalCount={orders.length}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        minimized={isMinimized}
        onToggleMinimize={() => setIsMinimized((prev) => !prev)}
        isFetching={isFetching}
        contentRef={contentRef}
        footer={footer}
      >
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <OrderCardSkeleton key={i} />)
        ) : (
          <>
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground/60 animate-in fade-in zoom-in duration-500">
                <div className="bg-muted/30 p-4 rounded-full mb-4 text-muted-foreground/40">
                  <SearchX size={40} strokeWidth={1.5} />
                </div>
                <p className="text-sm font-semibold text-foreground/80">
                  No orders found.
                </p>
                <p className="text-xs mt-1 px-10 text-center opacity-70">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
              </div>
            ) : (
              orders.map((order) => (
                <OrderCard3pl
                  key={order.id}
                  order={order}
                  onFocus={() => handleOrderClick(order)}
                />
              ))
            )}
          </>
        )}
      </OrdersPanel>
    </>
  );
}
