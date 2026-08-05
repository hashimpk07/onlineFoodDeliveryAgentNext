import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DELIVERY_TYPE_STYLES: Record<string, string> = {
  fast: "border-transparent text-white bg-[#0284c7]",
  scheduled: "border-transparent text-white bg-[#7c3aed]",
};

const DEFAULT_STYLE = "bg-muted text-muted-foreground border-muted";

type DeliveryTypeBadgeProps = {
  type?: string | null;
  className?: string;
};

export function DeliveryTypeBadge({ type, className }: DeliveryTypeBadgeProps) {
  if (!type) return <span className="text-sm text-muted-foreground">-</span>;

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",

        DELIVERY_TYPE_STYLES[type.toLowerCase()] ?? DEFAULT_STYLE,
        className,
      )}
    >
      {type}
    </Badge>
  );
}
