"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CaptainDetailsSkeleton() {
  return (
    <div className="space-y-6 mt-5">
      {/* Details card */}
      <Card>
        <CardContent className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
