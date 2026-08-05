/* eslint-disable */

"use client";

import { useOrders3plView } from "@/app/[locale]/(main)/dashboard/3pl/order/[id]/_hooks/use-3pl-view";
import { MapcnBase } from "@/components/map/core/mapcn-base";
import { MapOrder } from "@/components/map/core/types";
import { MapMarker, MarkerContent, MarkerPopup } from "@/components/ui/map";
import { cn } from "@/lib/utils";
import { MapPin, Store } from "lucide-react";
import Link from "next/link";
import { memo, useMemo, useRef } from "react";
import { DirectionResponse, LatLng } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** DB stores "lng,lat" — returns { lat, lng } or null */
function parseLocation(
  loc?: string | null,
): { lat: number; lng: number } | null {
  if (!loc) return null;
  const parts = loc.split(",").map(Number);
  if (parts.length !== 2 || parts.some(isNaN)) return null;
  return { lng: parts[0], lat: parts[1] };
}

// ─────────────────────────────────────────────────────────────────────────────
// Shop marker
// ─────────────────────────────────────────────────────────────────────────────

function LocationMarker({
  location,
}: {
  location?: { lng: number | null; lat: number | null };
}) {
  if (!location) return null;
  if (!location?.lat || !location?.lng) return null;

  return (
    <MapMarker latitude={location.lng} longitude={location.lat}>
      <MarkerContent>
        <div
          className={cn(
            "flex items-center justify-center rounded-full shadow-md w-9 h-9",
          )}
        >
          <MapPin className="w-6 h-6 text-red-900" />
        </div>
      </MarkerContent>
    </MapMarker>
  );
}

function ShopMarker({ shop }: { shop: DirectionResponse["shop"] }) {
  const shop_location: any = parseLocation(shop.location);
  return (
    <MapMarker latitude={shop_location.lng} longitude={shop_location.lat}>
      <MarkerContent>
        <div
          className={cn(
            "flex items-center justify-center w-9 h-9",
            shop.order_count > 0 ? "text-red-900" : "text-green-900",
          )}
        >
          <Store className="w-4 h-4 " />
        </div>
      </MarkerContent>
      <MarkerPopup>
        <div className="text-sm space-y-0.5">
          <div className="font-medium">{shop.name}</div>
          <div className="text-muted-foreground">
            Region: {shop.region?.name ?? "—"}
          </div>
          <div className="text-muted-foreground">
            Pending orders: {shop.order_count}
          </div>
        </div>
      </MarkerPopup>
    </MapMarker>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// StableMap
// ─────────────────────────────────────────────────────────────────────────────

const StableMap = memo(
  function StableMap({
    center,
    order,
    shop,
  }: {
    center: LatLng;
    order: MapOrder;
    shop: DirectionResponse["shop"];
  }) {
    return (
      <MapcnBase center={center} zoom={11} className="h-full w-full">
        {/* Shop marker with popup */}
        {order.location && <LocationMarker location={order.location} />}

        {shop && <ShopMarker shop={shop} />}
        {/* Delivery route + delivery pin + captain route */}
      </MapcnBase>
    );
  },
  (prev, next) => prev.center === next.center,
);

// ─────────────────────────────────────────────────────────────────────────────
// OrderMap — public export
// ─────────────────────────────────────────────────────────────────────────────

type OrderMapProps = { id: string };

export function OrderMap({ id }: OrderMapProps) {
  const { order_map } = useOrders3plView(id);

  const { shop, captain, distance } = (order_map ??
    {}) as Partial<DirectionResponse>;

  // Parse "lng,lat" strings into { lat, lng } objects
  const shopCoords = useMemo(
    () => parseLocation(shop?.location),
    [shop?.location],
  );
  const orderCoords = useMemo(
    () => parseLocation(order_map?.order_location),
    [order_map?.order_location],
  );
  const captainCoords = useMemo(
    () => (captain?.assigned ? orderCoords : null), // swap with live coords when available
    [captain?.assigned, orderCoords],
  );

  // Build the MapOrder shape expected by OrderRoutes / useRoadRoute
  const mapOrder = useMemo<MapOrder>(
    () => ({
      id,
      location: shopCoords ?? undefined, // shop = route start
      delivery_location: orderCoords ?? undefined, // order = route end
      captain_location: captainCoords ?? undefined,
    }),
    [id, shopCoords, orderCoords, captainCoords],
  );

  // Stable map center — frozen on first valid shop parse
  const initialCenter = useRef<LatLng | null>(null);
  if (shopCoords && !initialCenter.current) {
    initialCenter.current = [shopCoords.lat, shopCoords.lng];
  }

  // ── Guard ─────────────────────────────────────────────────────────────────
  if (!shop?.region || !shopCoords || !initialCenter.current) {
    return (
      <div className="flex items-center gap-2 p-4 text-sm">
        Please add a shop zone before viewing the map.{" "}
        <Link href="#" className="btn btn-sm btn-primary">
          Edit Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {distance && (
        <div className="absolute top-3 right-14 z-10 rounded bg-primary px-4 py-1 text-sm text-white">
          Distance: {distance}
        </div>
      )}
      <StableMap center={initialCenter.current} order={mapOrder} shop={shop} />
    </div>
  );
}
