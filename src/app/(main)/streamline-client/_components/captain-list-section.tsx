"use client";

import { TruckElectric } from "lucide-react";

import { StreamlineCaptain } from "@/app/[locale]/(main)/streamline-client/_lib/types";
import { StreamlineCaptainPanel } from "@/components/map/shared/captain-list";
import { StreamlineListPagination } from "@/components/map/shared/streamline-list-pagination";

import { CaptainCardClient } from "./captains/captain-card-client";
import { CaptainCardSkeleton } from "./captains/captain-card-skeleton";

interface CaptainListSectionProps {
  captains: StreamlineCaptain[] | undefined;
  search: string;
  setSearch: (search: string) => void;
  handleFly: (lng: number, lat: number) => void;
  isLoading: boolean;
  isFetching: boolean;
  isRefreshing: boolean;
  hasNext?: boolean;
  hasPrev?: boolean;
  isFetchingPage?: boolean;
  onNextPage?: () => void;
  onPrevPage?: () => void;
}

// eslint-disable-next-line complexity
export function CaptainListSection({
  captains,
  search,
  setSearch,
  handleFly,
  isLoading,
  isFetching,
  isRefreshing,
  hasNext = false,
  hasPrev = false,
  isFetchingPage = false,
  onNextPage,
  onPrevPage,
}: CaptainListSectionProps) {
  const loading =
    (isLoading ?? false) || (isFetching ?? false) || (isRefreshing ?? false);
  const fetching = (isFetching ?? false) || (isRefreshing ?? false);

  return (
    <StreamlineCaptainPanel<StreamlineCaptain>
      title="Captains"
      icon={<TruckElectric className="w-8 h-8 font-bold" />}
      items={captains ?? []}
      getKey={(c) => c.id}
      search={search}
      onSearchChange={setSearch}
      emptyMessage="No captains found."
      isLoading={loading}
      isFetching={fetching}
      renderSkeleton={() => <CaptainCardSkeleton />}
      footer={
        <StreamlineListPagination
          hasPrev={hasPrev}
          hasNext={hasNext}
          onPrev={() => onPrevPage?.()}
          onNext={() => onNextPage?.()}
          isFetching={isFetchingPage}
        />
      }
    >
      {(c) => (
        <CaptainCardClient
          captain={c}
          onView={(cap) => {
            if (cap.geometry?.coordinates) {
              handleFly(
                cap.geometry.coordinates[0],
                cap.geometry.coordinates[1],
              );
            }
          }}
        />
      )}
    </StreamlineCaptainPanel>
  );
}
