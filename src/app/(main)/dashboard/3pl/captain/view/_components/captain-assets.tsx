/* eslint-disable */
"use client";

import { CaptainDetailsSkeleton } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_components/captain-detail-skelton";
import { useCaptainDetails } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_hooks/use-captain-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AssetsTable = () => {
  const { captain, isLoading, isError } = useCaptainDetails();

  if (isLoading) return <CaptainDetailsSkeleton />;

  if (isError || !captain) {
    return (
      <div className="py-10 text-center text-red-500">
        Failed to load captain details
      </div>
    );
  }

  const assets = captain.asset ?? [];
  const hasAssets = assets.length > 0;

  return (
    <Card className="mx-auto mt-5 max-w-7xl">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl font-bold">Assigned Assets</CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Identification Number</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {hasAssets ? (
              assets.map((asset, index) => (
                <TableRow key={index}>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>{asset.reference_number}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="py-8 text-center text-sm text-muted-foreground"
                >
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AssetsTable;
