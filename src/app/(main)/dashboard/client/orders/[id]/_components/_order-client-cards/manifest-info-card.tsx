"use client";

import { useState } from "react";

import { Check, Copy, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface InfoItem {
  label: string;
  value: string;
  showCopy?: boolean;
  badge?: boolean;
}

type ManifestAccent = "shipping" | "billing" | "delivery";

interface ManifestInfoCardProps {
  title: string;
  icon: LucideIcon;
  items: InfoItem[];
  accent: ManifestAccent;
  className?: string;
}

const accentStyles: Record<
  ManifestAccent,
  { bar: string; iconWrap: string; icon: string; badge: string }
> = {
  shipping: {
    bar: "bg-[var(--chart-1)]",
    iconWrap: "bg-[color-mix(in_oklab,var(--chart-1)_16%,var(--card))]",
    icon: "text-[color-mix(in_oklab,var(--chart-1)_80%,var(--foreground))]",
    badge:
      "bg-[color-mix(in_oklab,var(--chart-1)_16%,var(--card))] text-[color-mix(in_oklab,var(--chart-1)_80%,var(--foreground))]",
  },
  billing: {
    bar: "bg-[var(--chart-2)]",
    iconWrap: "bg-[color-mix(in_oklab,var(--chart-2)_16%,var(--card))]",
    icon: "text-[color-mix(in_oklab,var(--chart-2)_80%,var(--foreground))]",
    badge:
      "bg-[color-mix(in_oklab,var(--chart-2)_16%,var(--card))] text-[color-mix(in_oklab,var(--chart-2)_80%,var(--foreground))]",
  },
  delivery: {
    bar: "bg-[var(--chart-3)]",
    iconWrap: "bg-[color-mix(in_oklab,var(--chart-3)_16%,var(--card))]",
    icon: "text-[color-mix(in_oklab,var(--chart-3)_80%,var(--foreground))]",
    badge:
      "bg-[color-mix(in_oklab,var(--chart-3)_16%,var(--card))] text-[color-mix(in_oklab,var(--chart-3)_80%,var(--foreground))]",
  },
};

export function ManifestInfoCard({
  title,
  icon: Icon,
  items,
  accent,
  className,
}: ManifestInfoCardProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const copyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const copyAll = () => {
    const text = [
      title,
      ...items.map((item) => `${item.label} ${item.value}`),
    ].join("\n");
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  };

  const style = accentStyles[accent];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card shadow-sm",
        className,
      )}
    >
      <div className={cn("absolute inset-x-0 top-0 h-1", style.bar)} />

      <div className="flex items-center justify-between gap-3 px-5 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              style.iconWrap,
            )}
          >
            <Icon className={cn("h-5 w-5", style.icon)} strokeWidth={2.25} />
          </span>
          <p className="text-[15px] font-semibold text-foreground">{title}</p>
        </div>
        <button
          onClick={copyAll}
          title="Copy all"
          className="rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          {copiedAll ? (
            <Check className="h-4 w-4 text-primary" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>

      <dl className="space-y-4 px-5 pb-6">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-1">
            <dt className="text-xs font-medium text-muted-foreground">
              {item.label}
            </dt>
            <dd className="flex items-center gap-2">
              {item.badge ? (
                <span
                  className={cn(
                    "rounded-lg px-2.5 py-1 font-mono text-sm font-semibold tabular-nums",
                    style.badge,
                  )}
                >
                  {item.value}
                </span>
              ) : (
                <span className="text-[15px] font-medium break-words text-foreground">
                  {item.value}
                </span>
              )}
              {item.showCopy && (
                <button
                  onClick={() => copyText(item.value, index)}
                  title="Copy"
                  className="rounded p-0.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  {copiedIndex === index ? (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
