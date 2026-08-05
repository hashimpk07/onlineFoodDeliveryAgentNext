"use client";

import { useEffect, useState } from "react";

import { calculateOrderProgress } from "@/app/[locale]/(main)/dashboard/3pl/order/_utils/order-progress";

export default function TimerProgress({
  start_time,
  end_time,
}: {
  start_time?: string;
  end_time?: string;
}) {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const progress = calculateOrderProgress({ start_time, end_time });

  const colorMap = {
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    red: "bg-red-600",
  };

  const colorClass = colorMap[progress.type];
  const textColor = progress.width < 50 ? "text-foreground" : "text-white";

  return (
    <div className="w-[120px]">
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden relative">
        <div
          className={`h-full transition-all duration-500 ${colorClass} ${
            progress.isPulse ? "animate-pulse" : ""
          }`}
          style={{ width: `${progress.width}%` }}
        />
        <div
          className={`absolute inset-0 flex items-center justify-center text-xs font-bold pointer-events-none ${textColor}`}
        >
          {progress.text}
        </div>
      </div>
    </div>
  );
}
