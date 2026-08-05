"use client";
"use nomemo";

import { ColumnDef } from "@tanstack/react-table";
import { KeyRound } from "lucide-react";

import { AccessTokenDeleteAction } from "@/app/[locale]/(main)/dashboard/client/access-token/_components/access-token-action";

type AccessToken = {
  id: string;
  name: string;
  token: string;
};

export const columns: ColumnDef<AccessToken>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2.5">
        <span className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
          <KeyRound className="text-muted-foreground h-4 w-4" />
        </span>
        <span className="font-medium">{row.original.name}</span>
      </div>
    ),
  },
  {
    id: "action",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <AccessTokenDeleteAction id={row.original.id} />
      </div>
    ),
  },
];
