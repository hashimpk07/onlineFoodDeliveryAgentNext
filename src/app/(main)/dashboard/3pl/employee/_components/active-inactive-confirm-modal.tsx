"use client";

import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmModal({
  open,
  title = "Are you sure?",
  description,
  confirmText = "Yes",
  cancelText = "Cancel",
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
        </DialogHeader>

        <div className="px-6 py-5">
          <div className="rounded-xl overflow-hidden border">
            <div className="bg-[#1e4d5e] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-white">
                Confirmation
              </p>
            </div>
            {description && (
              <div className="p-4">
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="px-6 pb-6 border-t pt-4">
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
