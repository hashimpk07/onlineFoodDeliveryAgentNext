import { cn } from "@/lib/utils";

interface IdBadgeProps {
  value?: string | number | null;
  className?: string;
}

export function ClientIdBadge({ value, className }: IdBadgeProps) {
  // only block truly empty values
  if (value === null || value === undefined || value === "") {
    return <span className="text-sm text-muted-foreground">-</span>;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center",
        "rounded-md px-2 py-1",
        "text-sm font-mono font-medium",
        "bg-blue-600/10 text-blue-400",
        className,
      )}
    >
      {String(value)}
    </span>
  );
}
