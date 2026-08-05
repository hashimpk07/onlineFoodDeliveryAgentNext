"use client";

import { useRouter } from "next/navigation";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type CompanyInfoItem = {
  id: number;
  name: string;
  mobile_no: string;
  app_version: string;
  email: string;
  vat_id: string;
  website: string;
};

const ActionCell = ({ id }: { id: number }) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() =>
                router.push(`/dashboard/general/company-info/${id}`)
              }
              className="inline-flex items-center justify-center h-9 w-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <Eye size={20} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <span>View</span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() =>
                router.push(`/dashboard/general/company-info/${id}/edit`)
              }
              className="inline-flex items-center justify-center h-9 w-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <Pencil size={20} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <span>Edit</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export const createCompanyInfoColumns = (): ColumnDef<CompanyInfoItem>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "website",
    header: "Website",
    cell: ({ row }) => {
      const websiteUrl = row.original.website;
      if (!websiteUrl) return "-";
      return (
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {websiteUrl}
        </a>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => <ActionCell id={row.original.id} />,
  },
];
