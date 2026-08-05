export interface RouteApiResponse {
  success: boolean;
  data: {
    routes: Route[];
    waypoints: Waypoint[];
    code: string;
    uuid: string;
  };
  cached: boolean;
  metadata: {
    from: [number, number];
    to: [number, number];
    profile: string;
    timestamp: string;
  };
}

interface Route {
  weight_name: string;
  weight: number;
  duration: number;
  distance: number;
  legs: Leg[];
  geometry: Geometry;
}

interface Leg {
  notifications: Notification[];
  via_waypoints: any[]; // could be more specific if you have details
  admins: Admin[];
  weight: number;
  duration: number;
  steps: any[]; // could be more specific if you want step-by-step instructions
  distance: number;
  summary: string;
}

interface Notification {
  details: {
    message: string;
  };
  refresh_type: string;
  subtype: string;
  type: string;
  geometry_index_end: number;
  geometry_index_start: number;
}

interface Admin {
  iso_3166_1_alpha3: string;
  iso_3166_1: string;
}

interface Geometry {
  coordinates: [number, number][];
  type: string; // e.g., "LineString"
}

interface Waypoint {
  distance: number;
  name: string;
  location: [number, number];
}
