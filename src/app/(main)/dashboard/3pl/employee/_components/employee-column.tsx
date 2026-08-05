"use client";

import { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { Check, X } from "lucide-react";

import { ConfirmModal } from "@/app/[locale]/(main)/dashboard/3pl/employee/_components/active-inactive-confirm-modal";
import { useEmployeeStatusChange } from "@/app/[locale]/(main)/dashboard/3pl/employee/_hooks/use-employee-status-change";
import { Button } from "@/components/ui/button";

import type { Employee } from "../_types/employee-type";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: () => <div className="text-right">Status</div>,
    cell: ({ row }) => <EmployeeStatusCell employee={row.original} />,
  },
];

function EmployeeStatusCell({ employee }: { employee: Employee }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { statusEmployees } = useEmployeeStatusChange();

  const status = employee.status;

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleConfirm = () => {
    if (!employee.id) return;

    statusEmployees(employee.id, {
      onSuccess: () => {
        setModalOpen(false);
      },
    });
  };

  return (
    <>
      <div className="flex justify-end">
        {status === "active" ? (
          <Button
            size="sm"
            variant="outline"
            onClick={handleClick}
            className="h-7 text-xs px-3 rounded-full border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
          >
            <Check className="w-3.5 h-3.5 mr-1" />
            Active
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={handleClick}
            className="h-7 text-xs px-3 rounded-full border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"
          >
            <X className="w-3.5 h-3.5 mr-1" />
            Inactive
          </Button>
        )}
      </div>

      <ConfirmModal
        open={modalOpen}
        title={`Are you sure you want to ${status === "active" ? "deactivate" : "activate"} this employee?`}
        description={
          <>
            <strong>{employee.name}</strong> ({employee.email})
          </>
        }
        onConfirm={handleConfirm}
        onClose={() => setModalOpen(false)}
        confirmText="Yes"
        cancelText="Cancel"
      />
    </>
  );
}
