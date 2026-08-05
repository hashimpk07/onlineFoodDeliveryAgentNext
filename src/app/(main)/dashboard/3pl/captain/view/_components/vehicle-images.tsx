"use client";
import React from "react";

import { useCaptainDetails } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_hooks/use-captain-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const VehicleImages: React.FC = () => {
  const { captain } = useCaptainDetails();
  const images: any[] = captain?.vehicle_images ?? [];
  return (
    <Card className="max-w-7xl mx-auto mt-5">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Vehicle Images</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          {!images || images.length === 0 ? (
            <p className="text-gray-500 italic">No images available</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Vehicle Image ${index + 1}`}
                  className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg border border-gray-200 shadow-sm"
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleImages;
