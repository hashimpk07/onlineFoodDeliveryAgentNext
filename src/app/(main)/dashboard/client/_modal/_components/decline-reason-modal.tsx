"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ORDER_DECLINE_REASONS } from "../_constants/order-decline-reasons";

type DeclineReasonModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (reason: string) => void;
};

export default function DeclineReasonModal({
  isOpen,
  closeModal,
  onSubmit,
}: DeclineReasonModalProps) {
  const [selected, setSelected] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-lg font-semibold">
            Select Decline Reason
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-5">
          <div className="rounded-xl overflow-hidden border">
            <div className="bg-[#1e4d5e] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-white">
                Reason
              </p>
            </div>
            <div className="p-4 space-y-3">
              {ORDER_DECLINE_REASONS.map((reason) => (
                <label
                  key={reason}
                  className="flex items-center gap-3 cursor-pointer rounded-lg border px-4 py-3 transition hover:bg-muted/40 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <input
                    type="radio"
                    name="decline-reason"
                    checked={selected === reason}
                    onChange={() => setSelected(reason)}
                    className="accent-primary"
                  />
                  <span className="text-sm">{reason}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 pb-6 border-t pt-4">
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!selected}
            onClick={() => onSubmit(selected)}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
