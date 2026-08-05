/* eslint-disable */
"use client";
"use no memo";

import { useRef, useState } from "react";

import ChatTicketDialog from "@/app/[locale]/(main)/streamline-client/_components/chat-ticket/modal";
import { OrderDetailsModal } from "@/app/[locale]/(main)/streamline-client/_components/order-details/modal";
import { OrderListItem } from "@/app/[locale]/(main)/streamline-client/_lib/types";
import { SearchX, ShoppingBag } from "lucide-react";
import { OrdersPanel } from "@/components/map/shared/order-list";
import { StreamlineListPagination } from "@/components/map/shared/streamline-list-pagination";
import { useOrdersStreamlineParams } from "../_hooks/use-streamline-params";
import { OrderCardClient } from "@/app/[locale]/(main)/streamline-client/_components/orders/order-card-client";

type Props = {
  onFocusOrder?: (order: OrderListItem) => void;
  orders?: OrderListItem[];
  loading?: boolean;
  isFetching?: boolean;
  hasNext?: boolean;
  hasPrev?: boolean;
  isFetchingPage?: boolean;
  onNextPage?: () => void;
  onPrevPage?: () => void;
};

function OrderCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-xl border-l-[5px] border-l-gray-200 bg-white dark:bg-zinc-900/80 p-3 shadow-sm animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-zinc-800 shrink-0" />
          <div className="h-3 w-24 bg-gray-200 dark:bg-zinc-800 rounded" />
        </div>
        <div className="h-6 w-16 bg-gray-100 dark:bg-zinc-800 rounded-full" />
      </div>

      <hr className="mt-2 border-gray-100 dark:border-zinc-800" />

      {/* Grid Content Skeleton */}
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

        <div className="flex border-t border-gray-50 dark:border-zinc-800/50 pt-2 justify-end gap-2">
          <div className="h-7 w-7 rounded bg-gray-100 dark:bg-zinc-800" />
          <div className="h-7 w-7 rounded bg-gray-100 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}

export function OrdersList({
  onFocusOrder,
  orders = [],
  loading = false,
  isFetching = false,
  hasNext = false,
  hasPrev = false,
  isFetchingPage = false,
  onNextPage,
  onPrevPage,
}: Props) {
  const { search: searchQuery, setSearch: setSearchQuery } =
    useOrdersStreamlineParams();

  // const { isFetching } = useStreamline(); // Removed internal hook call
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleView = (order: OrderListItem) => {
    setSelectedOrderId(order.id.toString());
    setIsOpen(true);
  };

  const handleChat = (order: OrderListItem) => {
    setTicketOpen(true);
    setSelectedOrderId(order.id.toString());
  };

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
        contentRef={scrollRef}
        footer={
          <StreamlineListPagination
            hasPrev={hasPrev}
            hasNext={hasNext}
            onPrev={() => onPrevPage?.()}
            onNext={() => onNextPage?.()}
            isFetching={isFetchingPage}
          />
        }
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
              <>
                {orders.map((order) => (
                  <OrderCardClient
                    key={order.id}
                    order={order}
                    onFocus={() => handleOrderClick(order)}
                    onView={() => handleView(order)}
                    onChat={() => handleChat(order)}
                  />
                ))}
              </>
            )}
          </>
        )}
      </OrdersPanel>

      {/* Modals stay outside because they are business logic */}
      <OrderDetailsModal
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(false);
          setSelectedOrderId(null);
        }}
        selectedOrderId={selectedOrderId}
      />

      <ChatTicketDialog
        open={ticketOpen}
        onOpenChange={() => {
          setTicketOpen(false);
          setSelectedOrderId(null);
        }}
        orderId={selectedOrderId ?? ""}
      />
    </>
  );
}
