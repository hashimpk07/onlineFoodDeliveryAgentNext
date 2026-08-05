"use client";

import { Package } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  amount: number;
}

interface OrderItemsSummaryCardProps {
  orderId?: string | null;
  items?: OrderItem[];
  deliveryCharges?: number;
  payableAmount?: number;
  className?: string;
}

export default function OrderItemsSummaryCard({
  orderId,
  items = [],
  deliveryCharges = 0,
  payableAmount = 0,
  className,
}: OrderItemsSummaryCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-card shadow-sm ${className ?? ""}`}
    >
      <div className="flex items-center gap-3 px-5 pt-6 pb-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--chart-5)_16%,var(--card))]">
          <Package
            className="h-5 w-5 text-[color-mix(in_oklab,var(--chart-5)_80%,var(--foreground))]"
            strokeWidth={2.25}
          />
        </span>
        <div>
          <p className="text-[15px] font-semibold text-foreground">Manifest</p>
          <p className="font-mono text-xs text-muted-foreground">#{orderId}</p>
        </div>
      </div>
      <div className="border-t">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="pl-5 text-muted-foreground">Item</TableHead>
              <TableHead className="text-center text-muted-foreground">
                Qty
              </TableHead>
              <TableHead className="text-right text-muted-foreground">
                Price
              </TableHead>
              <TableHead className="pr-5 text-right text-muted-foreground">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No items found
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="pl-5 font-medium text-foreground">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-center font-mono text-muted-foreground tabular-nums">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground tabular-nums">
                    {item.price.toFixed(2)} SAR
                  </TableCell>
                  <TableCell className="pr-5 text-right font-mono font-medium text-foreground tabular-nums">
                    {item.amount.toFixed(2)} SAR
                  </TableCell>
                </TableRow>
              ))
            )}
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={3}
                className="text-right text-muted-foreground"
              >
                Delivery charges
              </TableCell>
              <TableCell className="pr-5 text-right font-mono text-muted-foreground tabular-nums">
                {deliveryCharges.toFixed(2)} SAR
              </TableCell>
            </TableRow>
            <TableRow className="bg-primary/5 hover:bg-primary/5">
              <TableCell
                colSpan={3}
                className="text-right font-semibold text-foreground"
              >
                Payable amount
              </TableCell>
              <TableCell className="pr-5 text-right font-mono text-lg font-bold text-primary tabular-nums">
                {payableAmount.toFixed(2)} SAR
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
