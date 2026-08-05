import { Route } from "lucide-react";

import { getOrderStatusColor } from "@/lib/order-status";

type Log = {
  status_id: number;
  status?: string;
  progress?: { name?: string };
  created_at?: string;
};

type Step = {
  log: Log;
  repeats: number;
};

type Props = {
  logs: any[];
};

const ORDER_PACKAGE = 24;
const ASSIGN_ATTEMPTS = 23;
const EXCLUDED_STATUSES = [ORDER_PACKAGE, ASSIGN_ATTEMPTS];

function processLogs(logs: Log[]): Step[] {
  if (!logs?.length) return [];
  const steps: Step[] = [];
  let repeats = 1;
  for (let i = 0; i < logs.length; i++) {
    const log = logs[i];
    if (EXCLUDED_STATUSES.includes(log.status_id)) continue;
    const next = logs[i + 1];
    if (next && log.status_id === next.status_id) {
      repeats++;
      continue;
    }
    steps.push({ log, repeats });
    repeats = 1;
  }
  return steps;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  const h = date.getHours() % 12 || 12;
  const hh = String(h).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  return `${dd}/${mm}/${yyyy} · ${hh}:${min} ${ampm}`;
}

type Theme = {
  dot: string;
  ping: string | null;
  label: string;
  connector: string;
};

function getTheme(
  isCurrent: boolean,
  isCompleted: boolean,
  statusId: number,
): Theme {
  if (isCurrent) {
    const { dot, ring } = getOrderStatusColor(statusId);
    return {
      dot: `${dot} ring-4 ${ring}`,
      ping: dot,
      label: "text-foreground font-medium",
      connector: "bg-primary/40",
    };
  }
  if (isCompleted)
    return {
      dot: "bg-primary/40 border-primary/40",
      ping: null,
      label: "text-muted-foreground",
      connector: "bg-primary/20",
    };
  return {
    dot: "bg-muted border-border",
    ping: null,
    label: "text-muted-foreground/70",
    connector: "bg-border",
  };
}

export default function OrderProgressTracker({ logs }: Props) {
  const steps = processLogs(logs);

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="flex items-center gap-3 px-5 pt-6 pb-2">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--chart-1)_16%,var(--card))]">
          <Route
            className="h-5 w-5 text-[color-mix(in_oklab,var(--chart-1)_80%,var(--foreground))]"
            strokeWidth={2.25}
          />
        </span>
        <p className="text-[15px] font-semibold text-foreground">
          Order progress
        </p>
      </div>

      {!steps.length ? (
        <p className="px-5 pt-4 pb-6 text-sm text-muted-foreground">
          No status updates yet.
        </p>
      ) : (
        <div className="w-full overflow-x-auto px-5 pt-4 pb-6">
          <div className="flex min-w-full items-start">
            {steps.map(({ log, repeats }, index) => {
              const isCurrent = index === steps.length - 1;
              const isCompleted = index < steps.length - 1;
              const isLast = index === steps.length - 1;
              const theme = getTheme(isCurrent, isCompleted, log.status_id);
              const label = log.status ?? log.progress?.name ?? "";

              return (
                <div
                  key={index}
                  className={`flex items-start ${isLast ? "" : "flex-1"}`}
                >
                  {/* Step */}
                  <div className="group relative flex w-16 min-w-16 shrink-0 cursor-default flex-col items-center">
                    {/* Dot */}
                    <div className="relative flex h-7 w-7 items-center justify-center">
                      {isCurrent && theme.ping && (
                        <span
                          className={`absolute inset-0 rounded-full opacity-30 animate-ping ${theme.ping}`}
                        />
                      )}
                      <span
                        className={`h-3 w-3 rounded-full border-2 transition-transform group-hover:scale-125 ${theme.dot}`}
                      />
                    </div>

                    {/* Label */}
                    <span
                      className={`mt-1 max-w-[72px] text-center text-[11px] leading-tight break-words ${theme.label}`}
                    >
                      {label}
                      {repeats > 1 && (
                        <span
                          className="ml-1 inline-flex items-center justify-center
                          text-[10px] bg-muted text-muted-foreground border border-border
                          rounded-full px-1.5 py-0 font-mono"
                        >
                          {repeats}×
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Connector */}
                  {!isLast && (
                    <div className="mt-3.5 flex min-w-3 flex-1 items-center">
                      <div
                        className={`h-0.5 w-full rounded-full ${theme.connector}`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
