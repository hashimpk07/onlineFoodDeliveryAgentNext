import { Clock, Hash, MapPin, Package, Store, User } from "lucide-react";

import { CaptainOrder } from "@/app/[locale]/(main)/streamline-3pl/_lib/types";
import { Badge } from "@/components/ui/badge";

export const OrderCard = ({ order }: { order: CaptainOrder }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
    {/* Left accent bar */}
    <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-orange-400 to-orange-600" />

    <div className="pl-3">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Package className="h-3.5 w-3.5 text-orange-500" />
          <span className="text-[11px] font-extrabold tracking-widest text-orange-500 uppercase">
            #{order.id}
          </span>
        </div>
        <Badge>{order.status}</Badge>
      </div>

      {/* Divider */}
      <div className="mb-3 h-px bg-gradient-to-r from-gray-100 via-gray-200 to-transparent" />

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-2">
        {/* Client Order ID */}
        <div className="col-span-2 flex items-center gap-2">
          <Hash className="h-3.5 w-3.5 flex-none text-gray-400" />
          <span className="text-[11px] text-gray-500">Client Order</span>
          <span className="ml-auto text-[11px] font-bold text-gray-800 truncate max-w-[120px]">
            {order.client_order_id}
          </span>
        </div>

        {/* Client */}
        <div className="col-span-2 flex items-center gap-2">
          <User className="h-3.5 w-3.5 flex-none text-blue-400" />
          <span className="text-[11px] text-gray-500">Client</span>
          <span className="ml-auto text-[11px] font-bold text-gray-800 truncate max-w-[120px]">
            {order.client}
          </span>
        </div>

        {/* Shop */}
        <div className="col-span-2 flex items-center gap-2">
          <Store className="h-3.5 w-3.5 flex-none text-purple-400" />
          <span className="text-[11px] text-gray-500">Shop</span>
          <span className="ml-auto text-[11px] font-bold text-gray-800 truncate max-w-[120px]">
            {order.shop}
          </span>
        </div>

        {/* Address */}
        {order.location && (
          <div className="col-span-2 flex items-start gap-2">
            <MapPin className="h-3.5 w-3.5 flex-none text-red-400 mt-0.5" />
            <span className="text-[11px] text-gray-500">Address</span>
            <span className="ml-auto text-[11px] font-bold text-gray-800 text-right max-w-[120px] leading-tight">
              {order.location}
            </span>
          </div>
        )}

        {/* Created At */}
        <div className="col-span-2 flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 flex-none text-teal-400" />
          <span className="text-[11px] text-gray-500">Created</span>
          <span className="ml-auto text-[11px] font-bold text-gray-800 truncate max-w-[120px]">
            {order.created_at}
          </span>
        </div>
      </div>
    </div>
  </div>
);
