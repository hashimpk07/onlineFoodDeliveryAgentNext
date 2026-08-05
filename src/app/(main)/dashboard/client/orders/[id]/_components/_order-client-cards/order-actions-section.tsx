"use client";

import { useState } from "react";

import { Settings2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

interface OrderActionsSectionProps {
  orderId: string;
  onCancel: (orderId: string) => void;
  onUpdate?: (note: string) => void;
  // isCancelled?: boolean;
  canCancel: boolean;
  disableId: number;
}

export default function OrderActionsSection({
  orderId,
  onCancel,
  onUpdate,
  disableId,
  canCancel,
  // isCancelled = false,
}: OrderActionsSectionProps) {
  const [note, setNote] = useState("");
  return (
    <div className="space-y-5 rounded-2xl border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--chart-4)_16%,var(--card))]">
            <Settings2
              className="h-5 w-5 text-[color-mix(in_oklab,var(--chart-4)_80%,var(--foreground))]"
              strokeWidth={2.25}
            />
          </span>
          <p className="text-[15px] font-semibold text-foreground">Actions</p>
        </div>

        {canCancel && (
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10"
            onClick={() => onCancel(orderId)}
          >
            <XCircle className="h-4 w-4" />
            Cancel order
          </Button>
        )}
      </div>

      <Separator />

      {/* Notes + Update */}
      <div className="space-y-3">
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note for this order..."
          className="
            min-h-[90px]
            resize-none
            bg-transparent
            text-sm
            focus-visible:ring-1
          "
        />
        <div className="flex justify-end">
          <Button
            size="sm"
            className="px-6"
            disabled={!note.trim() || !onUpdate}
            onClick={() => {
              onUpdate?.(note);
              setNote("");
            }}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
