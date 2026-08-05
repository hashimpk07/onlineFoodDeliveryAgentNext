"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { ArrowLeft, RotateCw, Store } from "lucide-react";

import { CaptainDetailsDialog } from "@/app/[locale]/(main)/streamline-3pl/_components/captain/captain-details-modal";
import { use3plOrderEvents } from "@/app/[locale]/(main)/streamline-3pl/_hooks/use-events";
import { use3plStreamline } from "@/app/[locale]/(main)/streamline-3pl/_hooks/use-streamline";
import { use3plOrdersStreamlineParams } from "@/app/[locale]/(main)/streamline-3pl/_hooks/use-streamline-params";
import {
  OrderListItemResponse as OrderListItem,
  StreamlineCaptain,
} from "@/app/[locale]/(main)/streamline-3pl/_lib/types";
import { MapcnBase } from "@/components/map/core/mapcn-base";
import {
  CaptainMarkerContent,
  CaptainMarkerPopup,
} from "@/components/map/shared/markers/captain-marker";
import {
  ShopMarkerContent,
  ShopMarkerPopup,
} from "@/components/map/shared/markers/shop-marker";
import { OrderInfoBanner } from "@/components/map/shared/overlays/order-info-banner";
import { StatusBar } from "@/components/map/shared/overlays/status-bar";
import { OrderRoutes } from "@/components/map/shared/routes/order-routes";
import { Button } from "@/components/ui/button";
import { MapMarker, type MapRef as MapcnRef } from "@/components/ui/map";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";

// ─── Sub-components ─────────────────────────────────────────────────────────

function ShopMarkers({ grouped }: { grouped: Map<number, OrderListItem[]> }) {
  return (
    <>
      {Array.from(grouped.entries()).map(([id, list]) => {
        const first = list[0];
        if (!first.location?.lng || !first.location?.lat) return null;
        return (
          <MapMarker
            key={`shop-${id}`}
            longitude={first.location.lng}
            latitude={first.location.lat}
          >
            <ShopMarkerContent orderCount={list.length} />
            <ShopMarkerPopup orders={list} />
          </MapMarker>
        );
      })}
    </>
  );
}

function CaptainMarkers({ list }: { list: StreamlineCaptain[] }) {
  return (
    <>
      {list.map((c) => {
        if (!c.geometry?.coordinates) return null;
        return (
          <MapMarker
            key={`cap-${c.id}`}
            longitude={c.geometry.coordinates[0]}
            latitude={c.geometry.coordinates[1]}
          >
            <CaptainMarkerContent captain={c} />
            <CaptainMarkerPopup captain={c} />
          </MapMarker>
        );
      })}
    </>
  );
}

function MapOverlays3pl({
  onBack,
  onRefresh,
  isRefreshing,
  filters,
  status,
  setStatus,
  selected,
  onClose,
}: any) {
  return (
    <>
      <div className="absolute left-4 top-4 flex gap-2 z-20">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-xl shadow-md border-none bg-white/90"
          onClick={onBack}
        >
          <ArrowLeft size={20} />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-xl shadow-md border-none bg-white/90"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <RotateCw size={20} className={cn(isRefreshing && "animate-spin")} />
        </Button>
      </div>
      <StatusBar
        items={filters ?? []}
        activeKey={status}
        onChange={setStatus}
      />
      {selected && (
        <OrderInfoBanner
          avatar={<Store className="text-white" />}
          fields={[
            { label: "Order Id", value: selected.client_order_id },
            { label: "Shop", value: selected.shop_name },
            { label: "Captain", value: selected.captain_name ?? "unassigned" },
            { label: "Status", value: selected.status, isStatus: true },
          ]}
          onClose={onClose}
          isOpen
        />
      )}
    </>
  );
}

// ─── Custom Hooks ────────────────────────────────────────────────────────────

function useGroupedOrders(orders: OrderListItem[] | undefined) {
  return useMemo(() => {
    const m = new Map<number, OrderListItem[]>();
    if (!orders) return m;
    for (const o of orders) {
      if (
        o.shop_id != null &&
        o.location?.lat != null &&
        o.location?.lng != null
      ) {
        const list = m.get(o.shop_id) ?? [];
        list.push(o);
        m.set(o.shop_id, list);
      }
    }
    return m;
  }, [orders]);
}

function useStreamlineDataManagement(
  refetchAll: () => void,
  setOrder: (o: string | null) => void,
  orders: OrderListItem[] | undefined,
  order: string | null,
) {
  const mapRef = useRef<MapcnRef | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setOrder("");
    await refetchAll();
    setIsRefreshing(false);
  }, [refetchAll, setOrder]);

  const handleFly = useCallback((lng: number, lat: number) => {
    mapRef.current?.flyTo({ center: [lng, lat], zoom: 14, duration: 2000 });
  }, []);

  const grouped = useGroupedOrders(orders);

  const selectedOrder = useMemo(() => {
    if (!order || !orders) return null;
    return orders.find((o) => String(o.id) === order) ?? null;
  }, [order, orders]);

  return {
    mapRef,
    isRefreshing,
    handleRefresh,
    handleFly,
    grouped,
    selectedOrder,
  };
}

import { CaptainList3plSection } from "./captain-list-3pl-section";
import { OrdersList3plSection } from "./orders-list-3pl-section";

// ─── Main Component ──────────────────────────────────────────────────────────

export const StreamLineMap = () => {
  const router = useRouter();
  const { user } = useUser();

  const {
    filters,
    captains,
    openCaptainDialog,
    closeCaptainDialog,
    captainDetails,
    isCaptainDetailsLoading,
    isCaptainDetailsError,
    captainDialog,
    refetchAll,
    orders,
    isLoading = false,
    isFetching = false,
    captainLoading = false,
    hasNextOrders,
    hasPrevOrders,
    hasNextCaptains,
    hasPrevCaptains,
    goNextOrdersPage,
    goPrevOrdersPage,
    goNextCaptainsPage,
    goPrevCaptainsPage,
    isFetchingOrdersPage,
    isFetchingCaptainsPage,
  } = use3plStreamline();

  const {
    status,
    setStatus,
    search,
    setSearch,
    show,
    setShow,
    order,
    setOrder,
  } = use3plOrdersStreamlineParams();

  const {
    mapRef,
    isRefreshing,
    handleRefresh,
    handleFly,
    grouped,
    selectedOrder,
  } = useStreamlineDataManagement(refetchAll, setOrder, orders, order);

  use3plOrderEvents(user?.third_party_logistic_company_id, {
    onEvent: refetchAll,
  });

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <MapcnBase ref={mapRef} enableSingleTab showStyleToggle>
        <ShopMarkers grouped={grouped} />
        <CaptainMarkers list={captains ?? []} />
        {selectedOrder && <OrderRoutes order={selectedOrder} />}

        <MapOverlays3pl
          onBack={() => router.back()}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          filters={filters}
          status={status}
          setStatus={setStatus}
          selected={selectedOrder}
          onClose={() => setOrder(null)}
        />

        <OrdersList3plSection
          orders={orders}
          order={order}
          setOrder={setOrder}
          handleFly={handleFly}
          isLoading={isLoading}
          isRefreshing={isRefreshing}
          hasNext={hasNextOrders}
          hasPrev={hasPrevOrders}
          isFetchingPage={isFetchingOrdersPage}
          onNextPage={goNextOrdersPage}
          onPrevPage={goPrevOrdersPage}
        />

        <CaptainList3plSection
          captains={captains}
          search={search}
          setSearch={setSearch}
          show={show}
          setShow={setShow}
          captainLoading={captainLoading}
          isFetching={isFetching}
          isRefreshing={isRefreshing}
          openCaptainDialog={openCaptainDialog}
          handleFly={handleFly}
          hasNext={hasNextCaptains}
          hasPrev={hasPrevCaptains}
          isFetchingPage={isFetchingCaptainsPage}
          onNextPage={goNextCaptainsPage}
          onPrevPage={goPrevCaptainsPage}
        />

        <CaptainDetailsDialog
          open={captainDialog.open}
          onOpenChange={(v) => !v && closeCaptainDialog()}
          captain={captainDetails?.captain}
          captainName={captainDialog.name}
          isLoading={isCaptainDetailsLoading}
          isError={isCaptainDetailsError}
        />
      </MapcnBase>
    </div>
  );
};
