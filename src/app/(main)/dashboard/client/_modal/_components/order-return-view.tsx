"use client";

import { useState } from "react";

import { PackageX, X } from "lucide-react";

import { useAcceptReturnOrder } from "@/app/[locale]/(main)/dashboard/client/orders/_hooks/use-accept";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ReturnOrderModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  reason: string;
  onAccept: () => void;
  onDecline: () => void;
};

export default function ReturnOrderModal({
  isOpen,
  closeModal,
  title,
  reason,
  onAccept,
  onDecline,
}: ReturnOrderModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { mutateAsync, isPending } = useAcceptReturnOrder(onAccept);

  const handleAccept = async () => {
    await mutateAsync(title);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[380px] p-0 gap-0 overflow-hidden [&>button]:hidden">
        {/* ---------- HEADER ---------- */}
        <DialogHeader className="px-6 pt-6 pb-0">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
              <PackageX className="h-5 w-5 text-amber-600 dark:text-amber-500" />
            </div>

            <div className="flex-1 space-y-1 pt-0.5">
              <DialogTitle className="text-lg font-semibold text-foreground">
                Order return request
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Review the customer&apos;s reason before accepting or declining
                this return.
              </DialogDescription>
            </div>

            <DialogClose asChild>
              <button
                aria-label="Close"
                className="-mt-1 -mr-1 rounded-md p-1.5 text-muted-foreground
                  hover:bg-muted hover:text-foreground
                  focus:outline-none focus:ring-2
                  focus:ring-ring/40"
              >
                <X className="h-4 w-4" />
              </button>
            </DialogClose>
          </div>
        </DialogHeader>

        {/* ---------- BODY ---------- */}
        <div className="px-6 pt-5 pb-6 space-y-4">
          <dl className="rounded-lg border bg-muted/40 divide-y">
            <div className="flex items-center justify-between px-4 py-2.5">
              <dt className="text-sm text-muted-foreground">Order number</dt>
              <dd className="text-sm font-medium text-foreground">{title}</dd>
            </div>
            <div className="flex items-start justify-between gap-4 px-4 py-2.5">
              <dt className="text-sm text-muted-foreground shrink-0">Reason</dt>
              <dd className="text-sm font-medium text-foreground text-right">
                {reason}
              </dd>
            </div>
          </dl>

          {error && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          {/* ---------- FOOTER ---------- */}
          <DialogFooter className="pt-1 flex justify-end gap-3">
            <Button
              variant="destructive"
              onClick={onDecline}
              disabled={isPending}
            >
              Decline return
            </Button>

            <Button
              onClick={handleAccept}
              disabled={isPending}
              className="bg-green-600 text-white hover:bg-green-600/90 focus-visible:ring-green-600/20 dark:focus-visible:ring-green-600/40 dark:bg-green-600/80"
            >
              {isPending ? "Accepting..." : "Accept return"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
