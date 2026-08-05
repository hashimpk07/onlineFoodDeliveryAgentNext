/* eslint-disable */

"use client";

import React from "react";
import { StreamlineCaptainPanel } from "@/components/map/shared/captain-list";
import { StreamlineListPagination } from "@/components/map/shared/streamline-list-pagination";
import { CaptainCardSkeleton } from "../../streamline-client/_components/captains/captain-card-skeleton";
import { CaptainCard3pl } from "./captain/captain-card";
import { StreamlineCaptain } from "../_lib/types";

interface CaptainList3plSectionProps {
  captains: StreamlineCaptain[] | undefined;
  search: string;
  setSearch: (search: string) => void;
  show: string | null;
  setShow: (status: string) => void;
  captainLoading: boolean;
  isFetching: boolean;
  isRefreshing: boolean;
  openCaptainDialog: (id: number, name: string) => void;
  handleFly: (lng: number, lat: number) => void;
  hasNext?: boolean;
  hasPrev?: boolean;
  isFetchingPage?: boolean;
  onNextPage?: () => void;
  onPrevPage?: () => void;
}

export function CaptainList3plSection({
  captains,
  search,
  setSearch,
  show,
  setShow,
  captainLoading,
  isFetching,
  isRefreshing,
  openCaptainDialog,
  handleFly,
  hasNext = false,
  hasPrev = false,
  isFetchingPage = false,
  onNextPage,
  onPrevPage,
}: CaptainList3plSectionProps) {
  const loading =
    (captainLoading ?? false) ||
    (isFetching ?? false) ||
    (isRefreshing ?? false);
  const fetching = (isFetching ?? false) || (isRefreshing ?? false);

  return (
    <StreamlineCaptainPanel<StreamlineCaptain, string>
      title="Captains"
      items={captains ?? []}
      getKey={(c) => c.id}
      search={search}
      onSearchChange={setSearch}
      statusOptions={["all", "free", "busy"]}
      selectedStatus={show ?? "all"}
      onStatusChange={setShow}
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
      {(c: StreamlineCaptain) => (
        <CaptainCard3pl
          captain={c}
          onView={(cap: StreamlineCaptain) =>
            openCaptainDialog(cap.id, cap.name)
          }
          onFocus={(cap: StreamlineCaptain) => {
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
