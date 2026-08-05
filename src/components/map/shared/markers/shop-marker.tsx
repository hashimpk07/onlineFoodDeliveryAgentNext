"use client";

import { Hash, House, Store } from "lucide-react";

import { MapOrder } from "@/components/map/core/types";
import { MarkerContent, MarkerPopup } from "@/components/ui/map";

export function ShopMarkerContent({ orderCount }: { orderCount: number }) {
  return (
    <MarkerContent>
      <div className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-blue-600 shadow-lg transition-transform duration-150 hover:scale-110">
        <Store size={18} strokeWidth={2} className="text-white" />
        {orderCount > 1 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white leading-none">
            {orderCount > 9 ? "9+" : orderCount}
          </span>
        )}
        <span
          aria-hidden
          className="absolute -bottom-[7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-sm bg-blue-600"
        />
      </div>
    </MarkerContent>
  );
}

export function ShopMarkerPopup({ orders }: { orders: MapOrder[] }) {
  const shopName = orders[0].shop_name ?? "Unknown Shop";

  return (
    <MarkerPopup className="w-[260px] p-0 overflow-hidden border-none shadow-xl rounded-2xl">
      <div className="bg-white dark:bg-zinc-900 p-4">
        <div className="flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 pb-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <Store size={16} className="text-blue-500" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white truncate flex-1">
            {shopName}
          </h3>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-slate-50 dark:bg-zinc-800 rounded-xl p-3 flex flex-col gap-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-zinc-700"
            >
              <div className="flex items-center gap-2">
                <Hash size={12} className="text-gray-400 shrink-0" />
                <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                  {order.client_order_id ?? `#${order.id}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <House size={12} className="text-blue-400 shrink-0" />
                <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {order.client_name ?? "—"}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tight">
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MarkerPopup>
  );
}
