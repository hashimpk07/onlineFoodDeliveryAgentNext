/* eslint-disable */

"use client";

import { CaptainDetailsSkeleton } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_components/captain-detail-skelton";
import DetailRow from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_components/detail-row";
import { useCaptainDetails } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_hooks/use-captain-details";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";

const CaptainDetails = () => {
  const { captain, isLoading, isError } = useCaptainDetails();
  const { id } = useParams();
  const router = useRouter();

  if (isLoading) {
    return <CaptainDetailsSkeleton />;
  }

  if (isError || !captain) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load captain details
      </div>
    );
  }

  return (
    <Card className="max-w-7xl mx-auto mt-5">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">CAPTAIN DETAILS</CardTitle>

          <Button
            onClick={() => {
              router.push(`/dashboard/3pl/captain/${id}`);
            }}
          >
            Edit Captains
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {/* Left Column */}
          <div>
            <DetailRow label="Captain Id" value={captain.code} />
            <DetailRow label="Captain Name" value={captain.name} />
            <DetailRow label="Nationality" value={captain.nationality} />
            <DetailRow
              label="Employment Type"
              value={captain.employment_type}
            />
            <DetailRow
              label="Commission Per Order"
              value={String(captain.financials?.commission_per_order ?? "-")}
            />

            <DetailRow label="Mobile Number" value={captain.phone_number} />

            <DetailRow
              label="Given Custody Amount"
              value={String(captain.financials?.given_custody_amount ?? "-")}
            />

            <DetailRow label="Email" value={captain.email} />
            <DetailRow label="Work Location" value={captain.regions} />
            <DetailRow label="Joined Date" value={captain.dates.joined_at} />
            <DetailRow
              label="Auto Assign Priority"
              value={captain.meta.auto_assign_priority}
            />
            <DetailRow
              label="Last Updated At"
              value={captain.dates.updated_at ?? "N/A"}
            />
          </div>

          {/* Right Column */}
          <div>
            <DetailRow label="Status" value={captain.status.label} />

            <DetailRow
              label="Assigned Vehicle"
              value={captain.vehicle?.number ?? "Not Assigned"}
            />
            <DetailRow
              label="Current Using App Version"
              value={captain.meta.current_app_version ?? "Not Updated"}
            />

            <div className="py-3 border-b border-gray-100">
              <span className="text-sm block mb-1">Device Model</span>
              <span className="text-sm font-medium break-all">
                {captain.meta.device ?? "N/A"}
              </span>
            </div>

            <DetailRow
              label="Iqama No"
              value={captain.documents.iqama_number}
            />
            <DetailRow
              label="Iqama Expiry Date"
              value={captain.documents.iqama_expiry_date}
            />
            <DetailRow
              label="Licence No"
              value={captain.documents.licence_number}
            />
            <DetailRow
              label="Licence Expire Date"
              value={captain.documents.licence_expiry_date}
            />
            <DetailRow
              label="Created By"
              value={captain.meta.created_by ?? "N/A"}
            />
            <DetailRow
              label="Last Updated By"
              value={captain.meta.updated_by ?? "N/A"}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaptainDetails;
