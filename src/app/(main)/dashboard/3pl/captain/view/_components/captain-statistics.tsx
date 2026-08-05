/* eslint-disable */

"use client";
import StatCard from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_components/stat-card";
import { useCaptainDetails } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_hooks/use-captain-details";
import {
  CheckCircle,
  HandCoins,
  Package,
  RotateCcw,
  ShoppingCart,
  Wallet,
} from "lucide-react";

export default function CaptainStatistics() {
  const { captain_stats } = useCaptainDetails();

  const stats = [
    {
      icon: ShoppingCart,
      value: captain_stats?.attended_orders ?? 0,
      label: "Attended Orders",
      valueColor: "text-foreground",
    },
    {
      icon: Package,
      value: captain_stats?.delivered_orders ?? 0,
      label: "Delivered Orders",
      valueColor: "text-foreground",
    },
    {
      icon: CheckCircle,
      value: captain_stats?.success_rate ?? 0,
      label: "Success Rate",
      suffix: "%",
      valueColor: "text-foreground",
    },
    {
      icon: RotateCcw,
      value: captain_stats?.order_returns ?? 0,
      label: "Order Returns",
      valueColor: "text-foreground",
    },
    {
      icon: HandCoins,
      value: captain_stats?.receivable_amount ?? 0,
      label: "Receivable Amount",
      suffix: "SAR",
      valueColor: "text-red-500",
    },
    {
      icon: Wallet,
      value: captain_stats?.payable_amount ?? 0,
      label: "Payable Amount",
      suffix: "SAR",
      valueColor: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6 mt-5">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
