"use client";

import { OrderListItemResponse as OrderListItem } from "@/app/[locale]/(main)/streamline-3pl/_lib/types";
import { StreamlineListPagination } from "@/components/map/shared/streamline-list-pagination";

import { OrdersList3pl } from "./orders/orders-list";

interface OrdersList3plSectionProps {
  orders: OrderListItem[] | undefined;
  order: string | null;
  setOrder: (order: string | null) => void;
  handleFly: (lng: number, lat: number) => void;
  isLoading: boolean;
  isRefreshing: boolean;
  hasNext?: boolean;
  hasPrev?: boolean;
  isFetchingPage?: boolean;
  onNextPage?: () => void;
  onPrevPage?: () => void;
}

export function OrdersList3plSection({
  orders,
  order,
  setOrder,
  handleFly,
  isLoading,
  isRefreshing,
  hasNext = false,
  hasPrev = false,
  isFetchingPage = false,
  onNextPage,
  onPrevPage,
}: OrdersList3plSectionProps) {
  const loading = (isLoading ?? false) || (isRefreshing ?? false);

  return (
    <OrdersList3pl
      orders={orders}
      loading={loading}
      isFetching={false}
      footer={
        <StreamlineListPagination
          hasPrev={hasPrev}
          hasNext={hasNext}
          onPrev={() => onPrevPage?.()}
          onNext={() => onNextPage?.()}
          isFetching={isFetchingPage}
        />
      }
      onFocusOrder={(o: OrderListItem) => {
        if (String(o.id) === order) {
          setOrder(null);
        } else if (o.location?.lng && o.location?.lat) {
          handleFly(o.location.lng, o.location.lat);
          setOrder(String(o.id));
        }
      }}
    />
  );
}
