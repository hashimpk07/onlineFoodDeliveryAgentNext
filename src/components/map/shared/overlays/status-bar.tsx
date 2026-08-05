"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CategoryItem = {
  key: string;
  label: string;
  count?: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string; // expects tailwind text-* class
};

type CategoryBarProps = {
  items: CategoryItem[];
  activeKey?: string;
  onChange?: (key: string) => void;
  className?: string;
  containerClassName?: string;
};

export function StatusBar({
  items,
  activeKey,
  onChange,
  className,
  containerClassName,
}: CategoryBarProps) {
  const handleClick = (key: string) => {
    if (key === activeKey) return;
    onChange?.(key);
  };

  return (
    <div
      className={cn(
        "absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto max-w-[95vw] overflow-x-auto",
        containerClassName,
      )}
    >
      <div className={cn("flex gap-2 p-1 bg-[#192218] rounded-3xl", className)}>
        {items.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeKey === cat.key;

          return (
            <Button
              key={cat.key}
              onClick={() => handleClick(cat.key)}
              className={cn(
                "min-w-[110px] rounded-xl p-2.5 shadow-sm transition-all",
                isActive
                  ? "border bg-[#c7630f] ring-0.8 dark:bg-zinc-800 shadow-lg shadow-blue-500/50 dark:border-white dark:text-white"
                  : "bg-white/90 dark:bg-zinc-900/90 bg-[#192218] dark:border-white dark:text-white",
              )}
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <div
                  className={cn(
                    "p-1 rounded-md bg-opacity-10",
                    cat.color.replace("text-", "bg-"),
                  )}
                >
                  <Icon size={14} className={cat.color} />
                </div>
                {cat.label}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">{cat.count ?? 0}</span>

                {isActive && (
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      cat.color.replace("text-", "bg-"),
                    )}
                  />
                )}
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
