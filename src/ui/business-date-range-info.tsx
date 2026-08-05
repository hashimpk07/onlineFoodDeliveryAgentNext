"use client";

interface BusinessDateRangeInfoProps {
  fromDate?: string;
  toDate?: string;
}

/* ---------- helpers ---------- */

const formatDateTime = (date: Date) =>
  date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

const getBusinessRange = (fromDate?: string, toDate?: string) => {
  if (!fromDate || !toDate) return null;

  const from = new Date(`${fromDate}T06:00:00`);
  const to = new Date(`${toDate}T05:59:00`);

  return {
    from,
    to,
  };
};

/* ---------- component ---------- */

export function BusinessDateRangeInfo({
  fromDate,
  toDate,
}: BusinessDateRangeInfoProps) {
  const range = getBusinessRange(fromDate, toDate);

  return (
    <div className="rounded-lg border bg-muted/50 p-3 text-sm space-y-1">
      <p className="font-medium text-foreground">Note:</p>

      <p className="text-muted-foreground">
        Each business day starts at <strong>06:00 AM</strong> and ends at{" "}
        <strong>05:59 AM</strong> the next day.
      </p>

      {range && (
        <p className="text-foreground">
          The selected range will include orders from{" "}
          <strong>{formatDateTime(range.from)}</strong> to{" "}
          <strong>{formatDateTime(range.to)}</strong>.
        </p>
      )}
    </div>
  );
}
