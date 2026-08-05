"use client";

import {
  LogItem,
  OrderLog,
} from "@/app/[locale]/(main)/dashboard/client/orders/_types/orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/lib/date";
import { cn } from "@/lib/utils";

interface OrderLogsCardProps {
  orderId: string;
  logs: LogItem[];
  className?: string;
}

export default function OrderLogsCard({
  orderId,
  logs,
  className,
}: OrderLogsCardProps) {
  return (
    <Card className={cn("rounded-xl border bg-card shadow-sm", className)}>
      <CardHeader className="border-b bg-muted/30 bg-amber-400 rounded-t-xl p-4">
        <CardTitle className="text-sm font-semibold text-foreground dark:text-black">
          LOGS FROM ORDER
          <span className="ml-1 text-muted-foreground dark:text-black">
            #{orderId}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4 text-sm">
        <div className="grid grid-cols-4 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground border-b">
          <div>Status</div>
          <div>Note</div>
          <div>Created By</div>
          <div>Time</div>
        </div>

        {logs.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            No logs found
          </div>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              className="
            grid grid-cols-4 items-start gap-2 py-3
            border-b last:border-b-0
          "
            >
              <div className="font-medium text-foreground">{log.status}</div>

              <div className="text-muted-foreground line-clamp-2">
                {log.note ?? "-"}
              </div>

              <div className="text-foreground">{log.created_by}</div>

              <div className="text-muted-foreground">
                {formatDateTime(log.datetime)}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
