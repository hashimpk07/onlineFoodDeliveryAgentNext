export interface MapLocation {
  lat: number | null;
  lng: number | null;
}

export interface MapGeometry {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export interface MapCaptainOrder {
  id: number;
  client_order_id: string;
  client: string;
  shop: string;
}

export interface MapCaptain {
  id: number;
  name: string;
  phone_number: string;
  online_state: string;
  vehicle_type: string;
  current_order_count: number;
  geometry: MapGeometry | null;
  current_order: MapCaptainOrder[] | string;
}

export interface MapOrder {
  id: number;
  client_order_id: string | null;
  status: string;
  shop_name: string | null;
  client_name: string | null;
  location?: MapLocation;
  delivery_location?: MapLocation;
  captain_location?: MapLocation | null;
  before_reached_shop?: boolean;
}
