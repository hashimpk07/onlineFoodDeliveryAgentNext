/* eslint-disable */

"use client";

import { ReactNode, RefObject, useMemo, useState } from "react";

import { ChevronLeft, Loader2, Search, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SidePanelProps<T, S extends string = string> = {
  /** Data */
  items: readonly T[];

  /** Render */
  children: (item: T) => ReactNode;
  getKey: (item: T) => string | number;

  /** Header */
  title: string;
  icon?: ReactNode;

  /** Search */
  search?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;

  /** Status Filters (Fully Controlled) */
  statusOptions?: readonly S[];
  selectedStatus?: S;
  onStatusChange?: (status: S) => void;

  /** Empty State */
  emptyMessage?: string;

  /** Layout */
  defaultMinimized?: boolean;
  className?: string;
  isLoading?: boolean;
  isFetching?: boolean;
  renderSkeleton?: () => ReactNode;
  contentRef?: RefObject<HTMLDivElement | null>;
  footer?: ReactNode;
};

export function StreamlineCaptainPanel<T, S extends string = string>({
  items,
  children,
  getKey,
  title,
  icon,
  search,
  onSearchChange,
  searchPlaceholder = "Search...",
  statusOptions,
  selectedStatus,
  onStatusChange,
  emptyMessage = "No data found.",
  defaultMinimized = false,
  className,
  isLoading = false,
  isFetching = false,
  renderSkeleton,
  contentRef,
  footer,
}: SidePanelProps<T, S>) {
  const [isMinimized, setIsMinimized] = useState(defaultMinimized);

  const showSearch = typeof onSearchChange === "function";

  const showFilters = useMemo(() => {
    return (
      Array.isArray(statusOptions) &&
      statusOptions.length > 0 &&
      typeof onStatusChange === "function"
    );
  }, [statusOptions, onStatusChange]);

  if (isMinimized) {
    return (
      <div className="absolute left-4 top-16 z-10 flex flex-col gap-2 transition-all duration-300">
        <Button
          variant="secondary"
          size="icon"
          className="h-10 w-10 bg-white/10 backdrop-blur-md shadow-md dark:bg-zinc-900/10 border border-white/20"
          onClick={() => setIsMinimized(false)}
        >
          <div className="flex flex-col items-center justify-center gap-0.5">
            <div className="h-1 w-4 rounded-full bg-gray-600 dark:bg-gray-400" />
            <div className="h-1 w-4 rounded-full bg-gray-600 dark:bg-gray-400" />
            <div className="h-1 w-4 rounded-full bg-gray-600 dark:bg-gray-400" />
          </div>
        </Button>
      </div>
    );
  }

  return (
    <aside
      className={cn(
        "absolute left-4 top-16 bottom-4 z-10 flex w-[400px] flex-col rounded-xl bg-white/10 backdrop-blur-md shadow-xl border border-white/20 dark:border-zinc-800 dark:bg-zinc-900/10 transition-all duration-300",
        className,
      )}
    >
      {/* Header */}
      <div className="flex-none p-4 pb-2 bg-transparent dark:bg-transparent">
        <div className="flex items-center justify-between mb-4 text-foreground">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 -ml-2"
              onClick={() => setIsMinimized(true)}
            >
              <ChevronLeft size={20} />
            </Button>

            <h1 className="flex items-center gap-2 text-lg font-bold uppercase text-foreground">
              {icon && (
                <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>
              )}
              {title}
              {isFetching && (
                <Loader2
                  size={16}
                  className="animate-spin text-muted-foreground"
                />
              )}
            </h1>
          </div>
        </div>

        {/* Search */}
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
            <Input
              placeholder={searchPlaceholder}
              className="h-[45px] pl-9 rounded-full bg-white dark:bg-zinc-800 text-[12px] text-foreground"
              value={search ?? ""}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}

        {/* Filters */}
        {showFilters && (
          <div className="flex items-center justify-center gap-3 flex-wrap m-3">
            {statusOptions!.map((status) => (
              <label
                key={status}
                className="flex items-center gap-1 cursor-pointer text-[11px] font-semibold uppercase"
              >
                <input
                  type="radio"
                  name="panel-status"
                  value={status}
                  checked={selectedStatus === status}
                  onChange={() => onStatusChange?.(status)}
                  className="h-3 w-3 accent-orange-500"
                />
                {status}
              </label>
            ))}
          </div>
        )}
      </div>

      {isLoading ? (
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto px-4 pb-4 space-y-3 "
        >
          {renderSkeleton
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i}>{renderSkeleton()}</div>
              ))
            : Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-zinc-800"
                />
              ))}
        </div>
      ) : (
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto px-4 pb-4 space-y-3 scroll-smooth "
        >
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground/60 animate-in fade-in zoom-in duration-500">
              <div className="bg-muted/30 p-4 rounded-full mb-4 text-muted-foreground/40">
                <SearchX size={40} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-semibold text-foreground/80">
                {emptyMessage}
              </p>
              <p className="text-xs mt-1 px-10 text-center opacity-70">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div key={getKey(item)}>{children(item)}</div>
              ))}
              {footer}
            </>
          )}
        </div>
      )}

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent dark:from-zinc-900 pointer-events-none rounded-b-xl" />
    </aside>
  );
}
