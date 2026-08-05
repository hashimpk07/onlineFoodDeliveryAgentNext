import { MessageSquare } from "lucide-react";

import { OrderNote } from "@/app/[locale]/(main)/dashboard/client/orders/[id]/_lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  title?: string;
  notes?: OrderNote[];
  className?: string;
};

export function OrderNotesCard({
  title = "Order Notes",
  notes = [],
  className,
}: Props) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-card shadow-sm ${className ?? ""}`}
    >
      <div className="flex items-center gap-3 px-5 pt-6 pb-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--chart-3)_16%,var(--card))]">
          <MessageSquare
            className="h-5 w-5 text-[color-mix(in_oklab,var(--chart-3)_80%,var(--foreground))]"
            strokeWidth={2.25}
          />
        </span>
        <p className="text-[15px] font-semibold text-foreground">{title}</p>
      </div>
      <div className="border-t">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="pl-5 text-muted-foreground">Note</TableHead>
              <TableHead className="text-muted-foreground">
                Created by
              </TableHead>
              <TableHead className="pr-5 text-right text-muted-foreground">
                Time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notes.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="h-24 text-center text-muted-foreground"
                >
                  No notes found
                </TableCell>
              </TableRow>
            ) : (
              notes.map((note, index) => (
                <TableRow key={note.id || `${note.created_at}-${index}`}>
                  <TableCell className="pl-5 font-medium text-foreground">
                    {note.note}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {note.created_by}
                  </TableCell>
                  <TableCell className="pr-5 text-right font-mono text-muted-foreground tabular-nums">
                    {note.created_at}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
