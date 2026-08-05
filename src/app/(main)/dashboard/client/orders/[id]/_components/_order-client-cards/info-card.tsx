"use client";

import { useState } from "react";

import { Check, Copy } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type InfoCardVariant = "shipping" | "billing" | "delivery";

interface InfoItem {
  label: string;
  value: string;
  showCopy?: boolean;
}

interface InfoCardProps {
  title: string;
  icon?: React.ReactNode;
  items: InfoItem[];
  centerContent?: boolean;
  className?: string;
  headerClassName?: string;
  headerTitleClassName?: string;
  variant?: InfoCardVariant;
}

const variantStyles: Record<InfoCardVariant, string> = {
  shipping: `
    border-blue-200 bg-blue-50/40
    dark:border-blue-400/30 dark:bg-blue-500/10
  `,
  billing: `
    border-emerald-200 bg-emerald-50/40
    dark:border-emerald-400/30 dark:bg-emerald-500/10
  `,
  delivery: `
    border-violet-200 bg-violet-50/40
    dark:border-violet-400/30 dark:bg-violet-500/10
  `,
};

export function InfoCard({
  title,
  icon,
  items,
  centerContent = false,
  className,
  headerClassName,
  headerTitleClassName,
  variant = "shipping",
}: InfoCardProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const copyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);

    setTimeout(() => {
      setCopiedIndex(null);
    }, 1500);
  };

  const copyAll = () => {
    const text = [
      title,
      ...items.map((item) => `${item.label} ${item.value}`),
    ].join("\n");

    navigator.clipboard.writeText(text);
    setCopiedAll(true);

    setTimeout(() => {
      setCopiedAll(false);
    }, 1500);
  };

  return (
    <Card
      className={cn(
        "rounded-xl shadow-sm border p-2",
        variantStyles[variant],
        className,
      )}
    >
      {/* Header */}
      <CardHeader className={cn("pb-2", headerClassName)}>
        <div className="flex items-center justify-between">
          <CardTitle
            className={cn(
              "text-sm font-medium text-muted-foreground",
              headerTitleClassName,
            )}
          >
            {title}
          </CardTitle>

          <button
            onClick={copyAll}
            title="Copy all"
            className="p-1 rounded-md hover:bg-muted transition"
          >
            {copiedAll ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground cursor-pointer" />
            )}
          </button>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent
        className={cn(
          "space-y-2 text-sm text-left",
          centerContent && "text-center",
        )}
      >
        {icon && <div className="flex justify-center mb-2">{icon}</div>}

        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-2">
            <div>
              <span className="text-muted-foreground">{item.label}</span>
              <span className="ml-1 font-medium text-foreground">
                {item.value}
              </span>
            </div>

            {item.showCopy && (
              <button
                onClick={() => copyText(item.value, index)}
                title="Copy"
                className="p-1 rounded-md hover:bg-muted transition"
              >
                {copiedIndex === index ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground cursor-pointer" />
                )}
              </button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
