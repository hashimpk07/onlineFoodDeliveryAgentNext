"use client";

import {
  hasCaptainRoute,
  hasDeliveryRoute,
  useRoadRoute,
} from "@/components/map/core/hooks/use-mapcn-routes";
import { MapOrder } from "@/components/map/core/types";
import { MapMarker, MapRoute } from "@/components/ui/map";

import { DeliveryMarkerContent } from "../markers/delivery-marker";

export function DeliveryRoute({ order }: { order: MapOrder }) {
  const { id, location, delivery_location } = order;
  const start: [number, number] = [location?.lng ?? 0, location?.lat ?? 0];
  const end: [number, number] = [
    delivery_location?.lng ?? 0,
    delivery_location?.lat ?? 0,
  ];
  const route = useRoadRoute(id, start, end, true);

  if (!route.data) return null;

  return (
    <>
      <MapRoute
        coordinates={route.data}
        color="#f97316"
        width={3}
        opacity={0.9}
      />
      <MapMarker longitude={end[0]} latitude={end[1]}>
        <DeliveryMarkerContent />
      </MapMarker>
    </>
  );
}

export function CaptainRoute({ order }: { order: MapOrder }) {
  const { id, location, captain_location } = order;
  const start: [number, number] = [
    captain_location?.lng ?? 0,
    captain_location?.lat ?? 0,
  ];
  const end: [number, number] = [location?.lng ?? 0, location?.lat ?? 0];
  const route = useRoadRoute(id, start, end, true);

  if (!route.data) return null;

  return (
    <MapRoute
      coordinates={route.data}
      color="#f97316"
      width={3}
      opacity={0.9}
    />
  );
}

export function OrderRoutes({ order }: { order: MapOrder }) {
  const delivery = hasDeliveryRoute(order);
  const captain = hasCaptainRoute(order);
  return (
    <>
      {delivery && <DeliveryRoute order={order} />}
      {captain && <CaptainRoute order={order} />}
    </>
  );
}
