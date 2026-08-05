/* eslint-disable */
"use client";

import { ReactNode, RefObject } from "react";
import { LayoutList, Loader2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type OrdersPanelProps = {
  title?: string;
  icon?: ReactNode;
  totalCount?: number;

  searchValue?: string;
  onSearchChange?: (value: string) => void;

  minimized?: boolean;
  onToggleMinimize?: () => void;

  children: ReactNode;
  className?: string;
  isFetching?: boolean;
  contentRef?: RefObject<HTMLDivElement | null>;
  footer?: ReactNode;
};

export function OrdersPanel({
  title = "Orders",
  icon,
  totalCount = 0,
  searchValue = "",
  onSearchChange,
  minimized = false,
  onToggleMinimize,
  children,
  className = "",
  isFetching = false,
  contentRef,
  footer,
}: OrdersPanelProps) {
  if (minimized) {
    return (
      <div className="absolute right-4 top-16 z-10 transition-all duration-300">
        <Button
          variant="secondary"
          size="icon"
          className="h-10 w-10 bg-white/10 backdrop-blur-md shadow-md dark:bg-zinc-900/10 border border-white/20"
          onClick={onToggleMinimize}
        >
          <LayoutList size={20} />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] text-destructive-foreground flex items-center justify-center">
            {totalCount}
          </span>
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`absolute right-4 top-16 bottom-4 z-10 w-[400px]
      rounded-xl bg-white/10 dark:bg-zinc-900/10 backdrop-blur-md border border-white/20 shadow-xl
      flex flex-col transition-all duration-300 ${className}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          {icon && <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>}
          <h1 className="text-lg font-bold uppercase tracking-tight flex-1">
            {title}
          </h1>
          {isFetching && (
            <Loader2
              size={16}
              className="animate-spin text-muted-foreground ml-2"
            />
          )}

          <p className="text-sm ml-auto font-bold shrink-0">
            <span className="text-green-600">{totalCount}</span> Total
          </p>
        </div>

        {onSearchChange && (
          <div className="mt-4">
            <div className="relative">
              <Search
                className="absolute left-2.5 top-4 text-muted-foreground"
                size={14}
              />
              <Input
                placeholder="Search..."
                className="pl-8 text-xs bg-white rounded-3xl h-[45px]"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Scrollable Content Area */}
      <div ref={contentRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {children}
        {footer}
      </div>
    </div>
  );
}
