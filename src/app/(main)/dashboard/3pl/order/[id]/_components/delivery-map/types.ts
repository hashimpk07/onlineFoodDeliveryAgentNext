export type LatLng = [number, number];

// ── API response ──────────────────────────────────────────────────────────────

export interface DirectionResponse {
  /** Raw Mapbox routes object — only needed if you use waypoints elsewhere */
  routes: MapboxRoutes;
  shop: Shop;
  captain: Captain;
  distance: string;
  /** Order delivery location stored as "lng,lat" — same format as shop.location */
  order_location: string;
}

export interface MapboxRoutes {
  routes: Route[];
  waypoints: Waypoint[];
  code: string;
  uuid: string;
}

export interface Route {
  weight_name: string;
  weight: number;
  duration: number;
  distance: number;
  legs: Leg[];
  geometry: Geometry;
}

export interface Leg {
  via_waypoints: any[];
  admins: Admin[];
  weight: number;
  duration: number;
  steps: any[];
  distance: number;
  summary: string;
}

export interface Admin {
  iso_3166_1_alpha3: string;
  iso_3166_1: string;
}

export interface Geometry {
  coordinates: number[][];
  type: string;
}

export interface Waypoint {
  distance: number;
  name: string;
  location: number[]; // [lng, lat]
}

// ── Domain models ─────────────────────────────────────────────────────────────

export interface Shop {
  name: string;
  order_count: number;
  location: string; // "lng,lat"
  region: Region;
}

export interface Region {
  name: string;
  id: number;
}

export interface Captain {
  assigned: boolean;
  data: CaptainData;
}

export interface CaptainData {
  name: string;
  phone: string;
  vehicle: Vehicle;
}

export interface Vehicle {
  type_id: number | null;
  icon: string; // "bike" | "van"
}

// ── Map component props ───────────────────────────────────────────────────────

export type MapContentProps = {
  /** Shop marker position [lat, lng] */
  shopLocation: LatLng;
  /** Order delivery marker position [lat, lng], null if unavailable */
  orderLocation: LatLng | null;
  /** Shop data for popup */
  shop: Shop;
  /** Captain data, null when unassigned */
  captain: Captain | null;
  /** Captain marker position [lat, lng], null when unassigned */
  captainLocation: LatLng | null;
  /** Route polyline in Leaflet [lat, lng][] format */
  route: LatLng[];
};
