"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Pencil, Power, UserPlus } from "lucide-react";

import { AssignCaptainModal } from "@/app/[locale]/(main)/dashboard/3pl/vehicle/_components/vehicle-assign-modal";
import { Button } from "@/components/ui/button";

import { useVehicleStatusChange } from "../_hooks/use-vehicle-status-change";

import { StatusConfirmModal } from "./status-confirm-modal";

interface Props {
  id: number | string;
  status: "Active" | "Inactive" | "Banned";
  currentCaptain?: string;
}

export function VehicleActions({ id, status, currentCaptain }: Props) {
  const router = useRouter();
  const { changeStatus, isPending } = useVehicleStatusChange();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const statusButtonClass =
    status === "Banned"
      ? "bg-red-600 hover:bg-red-700 text-white"
      : status === "Active"
        ? "bg-green-600 hover:bg-green-700 text-white"
        : "bg-gray-200 text-gray-700";

  return (
    <div className="flex items-center gap-2">
      <StatusConfirmModal
        loading={isPending}
        onConfirm={() => changeStatus(id)}
        trigger={
          <Button
            size="icon"
            className={statusButtonClass}
            title="status change"
          >
            <Power className="h-4 w-4" />
          </Button>
        }
      />

      <Button
        size="icon"
        variant="secondary"
        onClick={() => setIsModalOpen(true)}
      >
        <UserPlus className="h-4 w-4" />
      </Button>

      <AssignCaptainModal
        vehicleId={id}
        isReassign={!!currentCaptain}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />

      <Button
        size="icon"
        variant="outline"
        onClick={() => router.push(`/dashboard/3pl/vehicle/${id}/edit`)}
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  );
}
