"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ListChipsCellProps {
  value?: string | string[] | null;
  maxVisible?: number;
}

/**
 * Renders a comma-joined string or string[] (e.g. region/area names) as a
 * capped row of chips instead of letting the column stretch to fit every
 * value. Extra items collapse into a "+N" chip with the full list on hover.
 */
export function ListChipsCell({ value, maxVisible = 2 }: ListChipsCellProps) {
  if (!value) return <span>-</span>;

  const items = (Array.isArray(value) ? value : value.split(","))
    .map((item) => item.trim())
    .filter(Boolean);

  if (items.length === 0) return <span>-</span>;

  const visible = items.slice(0, maxVisible);
  const overflow = items.slice(maxVisible);

  return (
    <div className="flex max-w-48 flex-wrap items-center gap-1">
      {visible.map((item) => (
        <Badge key={item} variant="secondary" className="font-normal">
          {item}
        </Badge>
      ))}
      {overflow.length > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="cursor-default font-normal">
                +{overflow.length}
              </Badge>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-64">
              {overflow.join(", ")}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
