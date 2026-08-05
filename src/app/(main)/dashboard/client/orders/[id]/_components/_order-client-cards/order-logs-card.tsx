"use client";

import { History } from "lucide-react";

import { OrderLog } from "@/app/[locale]/(main)/dashboard/client/orders/_types/orders";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/date";

interface OrderLogsCardProps {
  orderId: string;
  logs: OrderLog[];
  className?: string;
}

export default function OrderLogsCard({
  orderId,
  logs,
  className,
}: OrderLogsCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-card shadow-sm ${className ?? ""}`}
    >
      <div className="flex items-center gap-3 px-5 pt-6 pb-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--chart-1)_16%,var(--card))]">
          <History
            className="h-5 w-5 text-[color-mix(in_oklab,var(--chart-1)_80%,var(--foreground))]"
            strokeWidth={2.25}
          />
        </span>
        <div>
          <p className="text-[15px] font-semibold text-foreground">
            Activity log
          </p>
          <p className="font-mono text-xs text-muted-foreground">#{orderId}</p>
        </div>
      </div>
      <div className="border-t">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="pl-5 text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="text-muted-foreground">Note</TableHead>
              <TableHead className="text-muted-foreground">
                Created by
              </TableHead>
              <TableHead className="pr-5 text-right text-muted-foreground">
                Time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No logs found
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell className="pl-5 font-medium text-foreground">
                    {log.status}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="line-clamp-2">{log.note ?? "-"}</div>
                  </TableCell>
                  <TableCell className="text-foreground">
                    {log.created_by}
                  </TableCell>
                  <TableCell className="pr-5 text-right font-mono text-muted-foreground tabular-nums">
                    {formatDateTime(log.created_at)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
