import { Clock } from "lucide-react";

import { OrderLogsTableProps } from "@/app/[locale]/(main)/streamline-client/_components/order-details/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function OrderLogsTable({
  logs,
  orderId,
  icon: Icon = Clock,
  iconColor = "text-pink-600",
  iconBgColor = "bg-pink-100",
  title,
}: OrderLogsTableProps) {
  return (
    <div className="border-t pt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className={`${iconBgColor} p-2 rounded-lg`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <h3 className={`text-base font-semibold ${iconColor} uppercase`}>
          {title ?? `LOGS FROM ORDER ${orderId}`}
        </h3>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead className="font-semibold">Order Status</TableHead>
              <TableHead className="font-semibold">Status Updated By</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Time</TableHead>
              <TableHead className="font-semibold">Time B/W Status</TableHead>
              <TableHead className="font-semibold">Processing Time</TableHead>
              <TableHead className="font-semibold">Key times</TableHead>
              <TableHead className="font-semibold">Km B/W</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={`${log.status}-${log.date}-${log.time}`}>
                <TableCell className="font-medium">{log.status}</TableCell>
                <TableCell>{log.created_by}</TableCell>
                <TableCell>{log.date}</TableCell>
                <TableCell>{log.time}</TableCell>
                <TableCell>{log.timeBWStatus}</TableCell>
                <TableCell>{log.processingTime}</TableCell>
                <TableCell>{log.keyTimes ?? "-"}</TableCell>
                <TableCell>{log.kmBW ?? "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
