"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type OrdersCardVariant =
  | "new"
  | "ongoing"
  | "tickets"
  | "pending"
  // | "client-request"
  | "return-acceptance"
  | "cancellation"
  | "delivered"
  | "all";

interface OrdersCardProps {
  title?: string;
  value?: string | number;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: OrdersCardVariant;
  isSelected?: boolean;
}

const variantStyles: Record<OrdersCardVariant, string> = {
  new: `
    bg-gradient-to-br from-blue-500/15 to-blue-600/10
    border border-blue-500/20

    dark:bg-white/10
    dark:border-blue-400/30
  `,

  ongoing: `
    bg-gradient-to-br from-indigo-500/15 to-violet-500/10
    border border-indigo-500/20

    dark:bg-white/10
    dark:border-indigo-400/30
  `,

  tickets: `
    bg-gradient-to-br from-purple-500/15 to-fuchsia-500/10
    border border-purple-500/20

    dark:bg-white/10
    dark:border-purple-400/30
  `,

  pending: `
    bg-gradient-to-br from-amber-400/20 to-orange-400/15
    border border-amber-400/30

    dark:bg-white/10
    dark:border-amber-300/40
  `,

  // "client-request": `
  //   bg-gradient-to-br from-cyan-500/15 to-sky-500/10
  //   border border-cyan-500/20

  //   dark:bg-white/10
  //   dark:border-cyan-400/30
  // `,

  "return-acceptance": `
    bg-gradient-to-br from-teal-500/15 to-emerald-500/10
    border border-teal-500/20

    dark:bg-white/10
    dark:border-teal-400/30
  `,

  cancellation: `
    bg-gradient-to-br from-red-500/15 to-rose-500/10
    border border-red-500/20

    dark:bg-white/10
    dark:border-red-400/30
  `,

  delivered: `
    bg-gradient-to-br from-emerald-500/20 to-green-500/15
    border border-emerald-500/30

    dark:bg-white/10
    dark:border-emerald-400/30
  `,

  all: `
    bg-yellow-100
    border border-yellow-200

    dark:bg-yellow-500/10
    dark:border-yellow-500/20
  `,
};

export function OrdersCard({
  title,
  value,
  onClick,
  className,
  variant = "all",
  isSelected = false,
}: OrdersCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "w-full cursor-pointer rounded-lg transition-colors duration-200 dark:",
        "min-h-[72px] p-3",
        // eslint-disable-next-line security/detect-object-injection
        variantStyles[variant],
        isSelected &&
          "ring-2 ring-primary ring-offset-2 ring-offset-background border-primary",
        className,
      )}
    >
      <CardContent className="flex items-center justify-between p-0">
        <div className="flex flex-col">
          {title && (
            <span className="text-xs text-muted-foreground leading-snug line-clamp-2 font-extrabold">
              {title}
            </span>
          )}
          <span className="mt-1 text-lg font-bold leading-tight">
            {value ?? "--"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
