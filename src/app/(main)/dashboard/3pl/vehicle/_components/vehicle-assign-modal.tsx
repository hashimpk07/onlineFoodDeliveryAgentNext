"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { DataTableFilterBox } from "@/components/data-table/data-table-filter-box";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { fetchCaptainData } from "../_api/get-captain-apis";
import { useAssignCaptain } from "../_hooks/use-assign-captain";

import type { Captain } from "../_types/vehicle-type";

interface Props {
  vehicleId: number | string;
  isReassign?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssignCaptainModal({
  vehicleId,
  isReassign = false,
  open,
  onOpenChange,
}: Props) {
  const [captainId, setCaptainId] = useState<string | undefined>();

  const { data: captains = [] } = useQuery<Captain[]>({
    queryKey: ["captains"],
    queryFn: fetchCaptainData,
  });

  const { mutate: assignCaptain, isPending } = useAssignCaptain();

  const handleAssign = () => {
    if (!captainId) return;
    assignCaptain(
      { captain_id: captainId, vehicle_id: vehicleId },
      {
        onSuccess: () => {
          onOpenChange(false);
          setCaptainId(undefined);
        },
      },
    );
  };

  const handleCancel = () => {
    setCaptainId(undefined);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-lg font-semibold">
            {isReassign ? "Reassign Captain" : "Assign Captain"}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-5">
          <div className="rounded-xl overflow-hidden border">
            <div className="bg-[#1e4d5e] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-white">
                Captain Selection
              </p>
            </div>
            <div className="p-4">
              <DataTableFilterBox
                label="Captain"
                title="Select Captain"
                options={captains.map((c) => ({
                  value: String(c.id),
                  label: c.name,
                }))}
                filterValue={captainId ? [captainId] : []}
                setFilterValue={(value: string[] | null) =>
                  setCaptainId(value?.[0])
                }
              />
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 pb-6 border-t pt-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={isPending || !captainId}>
            {isPending
              ? "Assigning..."
              : isReassign
                ? "Reassign Captain"
                : "Assign Captain"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
