import { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { InvoiceModal } from "@/app/[locale]/(main)/dashboard/3pl/accounts/captain-commission/captain-commission-details/_components/captain-commission-invoice-modal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import type { CaptainCommissionDetails } from "../_types/captain-commission-details-type";

export const TableCellWrap = ({ value }: { value: any }) => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return (
    <div className="max-w-[22ch] wrap-break-word whitespace-normal">
      {String(value)}
    </div>
  );
};

export const ActionCell = ({
  row,
}: {
  row: { original: CaptainCommissionDetails };
}) => {
  const [open, setOpen] = useState(false);
  const { payment_status } = row.original;

  if (payment_status !== "Accepted") {
    return null;
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setOpen(true)}
              className="
                inline-flex items-center justify-center
                h-9 w-9 rounded-md
                text-muted-foreground
                hover:text-foreground
                hover:bg-muted
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
              "
            >
              <Eye size={20} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <span>View</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <InvoiceModal open={open} onClose={setOpen} data={row.original} />
    </>
  );
};

export const columns: ColumnDef<CaptainCommissionDetails>[] = [
  {
    accessorKey: "order_date",
    header: "Order Date",
    cell: ({ getValue }) => <TableCellWrap value={getValue()} />,
  },
  {
    accessorKey: "captain",
    header: "Captain",
    cell: ({ getValue }) => <TableCellWrap value={getValue()} />,
  },
  {
    accessorKey: "client",
    header: "Client",
    cell: ({ getValue }) => <TableCellWrap value={getValue()} />,
  },
  {
    accessorKey: "shop",
    header: "Shop",
    cell: ({ getValue }) => <TableCellWrap value={getValue()} />,
  },
  {
    accessorKey: "awb",
    header: "AWB",
    cell: ({ getValue }) => <TableCellWrap value={getValue()} />,
  },
  {
    accessorKey: "order_status",
    header: "Status",
    cell: ({ getValue }) => <TableCellWrap value={getValue()} />,
  },
  {
    accessorKey: "km",
    header: "KM",
    cell: ({ getValue }) => <TableCellWrap value={getValue()} />,
  },
  {
    accessorKey: "bde_earning",
    header: "BDE Earning",
    cell: ({ getValue }) => <TableCellWrap value={getValue()} />,
  },
  {
    accessorKey: "extra_km_earning",
    header: "Extra KM",
    cell: ({ getValue }) => <TableCellWrap value={getValue()} />,
  },
  {
    accessorKey: "total_earning",
    header: "Total Earning",
    cell: ({ getValue }) => <TableCellWrap value={getValue()} />,
  },
  {
    accessorKey: "paid_commission",
    header: "Paid",
    cell: ({ getValue }) => <TableCellWrap value={getValue()} />,
  },
  {
    accessorKey: "paid_datetime",
    header: "Paid At",
    cell: ({ getValue }) => <TableCellWrap value={getValue()} />,
  },
  {
    accessorKey: "paid_by",
    header: "Paid By",
    cell: ({ getValue }) => <TableCellWrap value={getValue()} />,
  },
  {
    accessorKey: "payment_status",
    header: "Payment Status",
    cell: ({ getValue }) => <TableCellWrap value={getValue()} />,
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ getValue }) => <TableCellWrap value={getValue()} />,
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
