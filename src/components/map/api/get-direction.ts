"use server";

import { RouteApiResponse } from "@/components/map/types";
import { api } from "@/lib/api.client";

export async function fetchRoadRoute(
  fromLng: number,
  fromLat: number,
  toLng: number,
  toLat: number,
): Promise<[number, number][] | null> {
  try {
    const response = await api.post<RouteApiResponse>("/public/directions", {
      from: [fromLng, fromLat],
      to: [toLng, toLat],
    });

    // Check if the response was successful
    if (!response?.success) return null;
    const route = response.data.routes?.[0];
    if (
      !route ||
      !route.geometry?.coordinates ||
      route.geometry.coordinates.length < 2
    ) {
      return null;
    }

    // Return the route coordinates
    return route.geometry.coordinates;
  } catch (err) {
    console.error("Failed to fetch road route:", err);
    return null;
  }
}
