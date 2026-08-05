"use client";

import { MapPin } from "lucide-react";

import { MarkerContent } from "@/components/ui/map";

export function DeliveryMarkerContent() {
  return (
    <MarkerContent>
      <div className="relative flex flex-col items-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-orange-500 shadow-lg transition-transform duration-150 hover:scale-110">
          <MapPin size={16} strokeWidth={2.5} className="text-white" />
        </div>
        <div className="h-3 w-[3px] rounded-b-full bg-orange-500 shadow" />
        <div className="mt-0.5 h-1.5 w-3 rounded-full bg-black/20" />
      </div>
    </MarkerContent>
  );
}
