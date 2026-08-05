export type Status =
  | "Accepted By"
  | "To Pickup"
  | "At Pickup Location"
  | "Order Picked"
  | "Start Delivery"
  | "Reached Destination"
  | "Delivered"
  | "Request For Cancel"
  | "Cancel Request Accepted"
  | "Return To WH"
  | "Return To Origin"
  | "RTO Accepted"
  | "On Hold"
  | "Canceled"
  | "Issue Reported"
  | "Re Route"
  | "Start Ride"
  | "Client Return Accepted";

interface StatusConfig {
  color: string;
}

export const STATUS_CONFIG = {
  "Accepted By": { color: "bg-blue-100 text-blue-700" },
  "To Pickup": { color: "bg-yellow-100 text-yellow-700" },
  "At Pickup Location": { color: "bg-orange-100 text-orange-700" },
  "Order Picked": { color: "bg-indigo-100 text-indigo-700" },
  "Start Delivery": { color: "bg-purple-100 text-purple-700" },
  "Reached Destination": { color: "bg-cyan-100 text-cyan-700" },
  Delivered: { color: "bg-green-100 text-green-700" },
  "Request For Cancel": { color: "bg-red-100 text-red-700" },
  "Cancel Request Accepted": { color: "bg-red-200 text-red-800" },
  "Return To WH": { color: "bg-gray-100 text-gray-700" },
  "Return To Origin": { color: "bg-gray-200 text-gray-800" },
  "RTO Accepted": { color: "bg-gray-300 text-foreground" },
  "On Hold": { color: "bg-amber-100 text-amber-700" },
  Canceled: { color: "bg-red-500 text-white" },
  "Issue Reported": { color: "bg-rose-100 text-rose-700" },
  "Re Route": { color: "bg-teal-100 text-teal-700" },
  "Start Ride": { color: "bg-green-600 text-green-900 " },
  "Client Return Accepted": {
    color: "bg-red-100 text-red-700",
  },
};
