"use client";

import { Phone, ShoppingBag } from "lucide-react";

import { MapCaptain, MapCaptainOrder } from "@/components/map/core/types";
import { MarkerContent, MarkerPopup } from "@/components/ui/map";

// ─── Constants ────────────────────────────────────────────────────────────────

type OnlineState = "free" | "busy" | "idle" | "offline";
type VehicleType = "bike" | "van";

const STATE_CONFIG: Record<
  OnlineState,
  { bg: string; dot: string; label: string }
> = {
  free: { bg: "bg-green-500", dot: "bg-green-300", label: "Free" },
  busy: { bg: "bg-amber-500", dot: "bg-amber-300", label: "Busy" },
  idle: { bg: "bg-sky-500", dot: "bg-sky-300", label: "Idle" },
  offline: { bg: "bg-gray-400", dot: "bg-gray-300", label: "Offline" },
};

const vehicleImages: Record<OnlineState, Record<VehicleType, string>> = {
  free: { bike: "/assets/bike.png", van: "/assets/van.png" },
  busy: { bike: "/assets/bike-busy.png", van: "/assets/van-busy.png" },
  idle: { bike: "/assets/bike-idle.png", van: "/assets/van-idle.png" },
  offline: { bike: "/assets/bike-offline.png", van: "/assets/van-offline.png" },
};

// ─── Utils ────────────────────────────────────────────────────────────────────

function getDisplayState(state: string | undefined): OnlineState {
  const s = state?.toLowerCase();
  if (s === "free" || s === "busy" || s === "idle" || s === "offline") return s;
  return "offline";
}

function getVehicleImage(state: OnlineState, type: string | undefined) {
  const t = type?.toLowerCase() === "van" ? "van" : "bike";
  return vehicleImages[state]?.[t] || vehicleImages.offline.bike;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CaptainOrders({ orders }: { orders: MapCaptainOrder[] }) {
  if (orders.length === 0) return null;

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-zinc-800 pb-2">
        Current Orders
      </p>
      <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
        {orders.map((o) => (
          <div
            key={o.id}
            className="bg-white dark:bg-zinc-800 rounded-xl p-3 flex items-center gap-3 border border-gray-50 dark:border-zinc-700/50"
          >
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
              <ShoppingBag size={14} className="text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold text-gray-400 uppercase">
                Order #
              </p>
              <p className="text-xs font-bold text-gray-900 dark:text-white">
                {o.client_order_id}
              </p>
              <p className="text-[10px] text-gray-500 truncate">{o.shop}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Components ──────────────────────────────────────────────────────────

export function CaptainMarkerContent({ captain }: { captain: MapCaptain }) {
  const state = getDisplayState(captain.online_state);
  const cfg = STATE_CONFIG[state];
  const image = getVehicleImage(state, captain.vehicle_type);

  return (
    <MarkerContent>
      <div className="relative flex flex-col items-center">
        <div
          className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-white shadow-lg transition-transform duration-150 hover:scale-110 ${cfg.bg}`}
        >
          <img src={image} className="w-10 h-10" alt={captain.name} />
          {captain.current_order_count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-gray-800 shadow leading-none border border-gray-200">
              {captain.current_order_count > 9
                ? "9+"
                : captain.current_order_count}
            </span>
          )}
          <span
            className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${cfg.dot}`}
          />
        </div>
        <span
          aria-hidden
          className={`h-[10px] w-[3px] rounded-b-full ${cfg.bg}`}
        />
        <span className="h-1 w-3 rounded-full bg-black/20" />
      </div>
    </MarkerContent>
  );
}

export function CaptainMarkerPopup({ captain }: { captain: MapCaptain }) {
  const state = getDisplayState(captain.online_state);
  const cfg = STATE_CONFIG[state];
  const image = getVehicleImage(state, captain.vehicle_type);

  const orders: MapCaptainOrder[] =
    typeof captain.current_order === "string"
      ? JSON.parse(captain.current_order)
      : captain.current_order || [];

  return (
    <MarkerPopup className="w-[280px] p-0 overflow-hidden border-none shadow-xl rounded-2xl">
      <div className="bg-white dark:bg-zinc-900 p-4">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border-2 border-white shadow-sm overflow-hidden">
            <img
              src={image}
              className="w-8 h-8 object-contain"
              alt={captain.name}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate leading-tight">
              {captain.name}
            </h3>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold mt-1 bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-gray-300">
              <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-xl p-3 flex items-center gap-3 mb-4 border border-white dark:border-zinc-800">
          <div className="w-10 h-10 rounded-full bg-blue-100/50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
            <Phone size={16} className="text-blue-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
              Mobile
            </p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              {captain.phone_number}
            </p>
          </div>
        </div>

        <CaptainOrders orders={orders} />
      </div>
    </MarkerPopup>
  );
}
