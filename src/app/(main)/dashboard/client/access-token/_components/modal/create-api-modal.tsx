"use client";

import { useState } from "react";

import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateApiKeyModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  createdToken?: string | null;
}

export function CreateApiKeyModal({
  open,
  onClose,
  onSubmit,
  createdToken,
}: CreateApiKeyModalProps) {
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name);
    setName("");
  };

  const handleCopy = () => {
    if (createdToken) {
      navigator.clipboard.writeText(createdToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setName("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-lg font-semibold">
            {createdToken ? "API key created" : "Create API key"}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-5 space-y-4">
          {/* Key name section */}
          {!createdToken && (
            <div className="space-y-1.5">
              <Label htmlFor="api-key-name">Key name</Label>
              <Input
                id="api-key-name"
                placeholder="e.g. Order sync service"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
              <p className="text-muted-foreground text-xs">
                Helps you tell keys apart later — you can revoke it anytime.
              </p>
            </div>
          )}

          {/* Token display */}
          {createdToken && (
            <div className="rounded-xl overflow-hidden border animate-in fade-in zoom-in duration-300">
              <div className="bg-muted px-4 py-3 flex items-center justify-between border-b">
                <p className="text-xs font-semibold uppercase tracking-widest text-foreground">
                  Your new API key
                </p>
                <span className="text-[10px] text-destructive font-semibold bg-destructive/10 px-2 py-0.5 rounded-full border border-destructive/30">
                  Copy now
                </span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-muted border rounded px-3 py-2 text-sm font-mono break-all">
                    {createdToken}
                  </code>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-9 w-9 shrink-0"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Please copy this key and save it somewhere safe.{" "}
                  <span className="text-destructive font-medium">
                    For security reasons, we cannot show it to you again.
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="px-6 pb-6 border-t pt-4">
          {createdToken ? (
            <Button onClick={handleClose}>Close</Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!name.trim()}
              >
                Create key
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
