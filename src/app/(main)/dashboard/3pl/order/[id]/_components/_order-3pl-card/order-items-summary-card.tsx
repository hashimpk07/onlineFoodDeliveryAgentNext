"use client";

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
  deliveryCharges?: number | string;
  payableAmount?: number | string;
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
    <div className={className}>
      <Table className="border border-gray-200 border-collapse">
        <TableHeader>
          <TableRow className="bg-amber-400 hover:bg-amber-400">
            <TableHead
              colSpan={4}
              className="text-black border border-black-300 text-center font-bold"
            >
              ITEMS FROM ORDER #{orderId}
            </TableHead>
          </TableRow>
          <TableRow className="bg-amber-100 text-black hover:bg-amber-100">
            <TableHead className="text-black border border-black-300">
              Item
            </TableHead>
            <TableHead className="text-black border border-black-300 text-center">
              Qty
            </TableHead>
            <TableHead className="text-black border border-black-300 text-center">
              Price
            </TableHead>
            <TableHead className="text-black border border-black-300 text-right">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="h-24 text-center text-muted-foreground border border-black-300"
              >
                No items found
              </TableCell>
            </TableRow>
          ) : (
            items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-foreground border border-black-300">
                  {item.name}
                </TableCell>
                <TableCell className="text-center text-muted-foreground border border-black-300">
                  {item.quantity}
                </TableCell>
                <TableCell className="text-center text-muted-foreground border border-black-300">
                  {Number(item.price).toFixed(2)} SAR
                </TableCell>
                <TableCell className="text-right font-medium text-foreground border border-black-300">
                  {Number(item.amount).toFixed(2)} SAR
                </TableCell>
              </TableRow>
            ))
          )}
          <TableRow>
            <TableCell
              colSpan={3}
              className="text-right text-muted-foreground border border-black-300"
            >
              Delivery Charges
            </TableCell>
            <TableCell className="text-right text-muted-foreground border border-black-300">
              {deliveryCharges}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              colSpan={3}
              className="text-right font-semibold text-foreground border border-black-300"
            >
              Payable Amount
            </TableCell>
            <TableCell className="text-right font-semibold text-primary border border-black-300">
              {payableAmount}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
