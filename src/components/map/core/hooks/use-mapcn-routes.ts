"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchRoadRoute } from "@/components/map/api/get-direction";

import { MapOrder } from "../types";

/**
 * Fetches a road-snapped route from the Mapbox Directions API.
 */

export function useRoadRoute(
  id: string | number,
  start: [number, number],
  end: [number, number],
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ["road-route", start[0], start[1], end[0], end[1]],
    queryFn: () => fetchRoadRoute(start[0], start[1], end[0], end[1]),
    enabled: enabled && start[0] !== 0 && end[0] !== 0,
    staleTime: 1000 * 60 * 30, // 30 mins
    gcTime: 1000 * 60 * 60, // 1 hour
  });
}

export function hasDeliveryRoute(order: MapOrder): boolean {
  return (
    order.before_reached_shop === true &&
    order.location?.lat != null &&
    order.location?.lng != null &&
    order.delivery_location?.lat != null &&
    order.delivery_location?.lng != null
  );
}

export function hasCaptainRoute(order: MapOrder): boolean {
  if (order.before_reached_shop === false) return false;
  return (
    order.location?.lat != null &&
    order.location?.lng != null &&
    order.captain_location?.lat != null &&
    order.captain_location?.lng != null
  );
}
