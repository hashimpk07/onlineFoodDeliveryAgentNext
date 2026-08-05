"use client";
import { Ban, Copy, Eye, MessageCircle, Undo2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RowActionsProps {
  copyText: string;
  onView?: () => void;
  onMessage?: () => void;
  onCancel?: () => void;
  onReturn?: () => void;
  complaintCount?: number;
  canCancel?: boolean;
  canReturn?: boolean;
  canMessage?: boolean;
}

export function RowActions({
  onView,
  onMessage,
  onCancel,
  onReturn,
  copyText,
  complaintCount = 0,
  canCancel = false,
  canReturn = false,
  canMessage = true,
}: RowActionsProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              onClick={onView}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>View Details</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 relative"
              disabled={!copyText}
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy Info</TooltipContent>
        </Tooltip>

        {onMessage && canMessage && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 relative"
                onClick={onMessage}
              >
                <MessageCircle className="h-4 w-4" />
                {complaintCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground leading-none">
                    {complaintCount}
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Message</TooltipContent>
          </Tooltip>
        )}

        {canCancel && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                onClick={onCancel}
              >
                <Ban className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Cancel Order</TooltipContent>
          </Tooltip>
        )}

        {canReturn && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                onClick={onReturn}
              >
                <Undo2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Return Order</TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}
