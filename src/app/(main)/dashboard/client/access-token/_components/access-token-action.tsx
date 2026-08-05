"use client";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Trash } from "lucide-react";

import { useDeleteAccessToken } from "@/app/[locale]/(main)/dashboard/client/access-token/_hooks/use-access-token";
import { Button } from "@/components/ui/button";

export function AccessTokenDeleteAction({ id }: { id: string }) {
  const deleteMutation = useDeleteAccessToken();

  const handleDelete = () => {
    deleteMutation.mutate(id);
  };

  return (
    <AlertDialog.Root>
      {/* Trigger (trash icon button) */}
      <AlertDialog.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          disabled={deleteMutation.isPending}
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <Trash size={16} />
        </Button>
      </AlertDialog.Trigger>

      {/* Dialog */}
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/40" />
        <AlertDialog.Content className="bg-card fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border p-6 shadow-lg">
          <AlertDialog.Title className="mb-2 text-lg font-semibold">
            Revoke this key?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-muted-foreground mb-4 text-sm">
            Any service using this key will immediately lose access to your
            account. This can&apos;t be undone.
          </AlertDialog.Description>

          <div className="mt-4 flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Revoking..." : "Revoke key"}
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
