import { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

interface PlaceholderContentProps {
  children: ReactNode;
}

export default function PlaceholderContent({
  children,
}: PlaceholderContentProps) {
  return (
    <Card className="rounded-lg border-none w-full min-w-0 overflow-hidden bg-transparent shadow-none">
      <CardContent className="p-0 sm:p-4 w-full min-w-0">
        {children}
      </CardContent>
    </Card>
  );
}
