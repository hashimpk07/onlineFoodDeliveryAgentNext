"use client";
"use nomemo";

import { ColumnDef } from "@tanstack/react-table";

import { ClientTransaction } from "@/app/[locale]/(main)/dashboard/client/transactions/_types/transaction";

export const columns: ColumnDef<ClientTransaction>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => row.original.date,
  },
  {
    accessorKey: "status_owner",
    header: "Type",
    cell: ({ row }) => {
      const status = row.original.status_owner;
      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
          ${
            status === "Paid Out"
              ? "bg-green-100 text-green-800"
              : status === "4U Paid In"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "payable",
    header: "Payable",
    cell: ({ row }) => row.original.payable ?? "-",
  },
  {
    accessorKey: "receivable",
    header: "Receivable",
    cell: ({ row }) => row.original.receivable ?? "-",
  },
  {
    accessorKey: "transferred",
    header: "Transferred",
    cell: ({ row }) => row.original.transferred ?? "-",
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => row.original.balance ?? "-",
  },
  {
    accessorKey: "payment_method",
    header: "Method",
    cell: ({ row }) => row.original.payment_method ?? "-",
  },
  {
    accessorKey: "payment_status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.payment_status;

      return (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium
          ${
            status === "Paid"
              ? "bg-green-100 text-green-800"
              : status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {status ?? "-"}
        </span>
      );
    },
  },
  {
    id: "user",
    header: "Payee",
    accessorFn: (row) => row.user?.name ?? "-",
  },
  {
    id: "attachment",
    header: "Attachment",
    cell: ({ row }) =>
      row.original.attachment ? (
        <a
          href={row.original.attachment}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View
        </a>
      ) : (
        "No Attachment"
      ),
  },
];
