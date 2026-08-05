"use client";

import { OrderListItem } from "@/app/[locale]/(main)/streamline-client/_lib/types";

import { OrdersList } from "./orders-list";

interface OrdersListSectionProps {
  orders: OrderListItem[] | undefined;
  order: string | null;
  setOrder: (order: string | null) => void;
  handleFly: (lng: number, lat: number) => void;
  isLoading: boolean;
  isFetching: boolean;
  isRefreshing: boolean;
  hasNext?: boolean;
  hasPrev?: boolean;
  isFetchingPage?: boolean;
  onNextPage?: () => void;
  onPrevPage?: () => void;
}

// eslint-disable-next-line complexity
export function OrdersListSection({
  orders,
  order,
  setOrder,
  handleFly,
  isLoading,
  isFetching,
  isRefreshing,
  hasNext = false,
  hasPrev = false,
  isFetchingPage = false,
  onNextPage,
  onPrevPage,
}: OrdersListSectionProps) {
  const loading =
    (isLoading ?? false) || (isFetching ?? false) || (isRefreshing ?? false);
  const fetching = (isFetching ?? false) || (isRefreshing ?? false);

  return (
    <OrdersList
      orders={orders ?? []}
      onFocusOrder={(o: OrderListItem) => {
        if (String(o.id) === order) {
          setOrder(null);
        } else if (o.location?.lng && o.location?.lat) {
          handleFly(o.location.lng, o.location.lat);
          setOrder(String(o.id));
        }
      }}
      loading={loading}
      isFetching={fetching}
      hasNext={hasNext}
      hasPrev={hasPrev}
      isFetchingPage={isFetchingPage}
      onNextPage={onNextPage}
      onPrevPage={onPrevPage}
    />
  );
}
