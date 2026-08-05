"use client";
import { useEffect } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { Spinner } from "@/components/ui/spinner";

const StreamLineMap = dynamic(
  () => import("./_components/streamline-map").then((mod) => mod.StreamLineMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    ),
  },
);

export default function StreamlinePage() {
  const router = useRouter();

  useEffect(() => {
    // Handle browser refresh / tab close
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    // Handle back button
    const handlePopState = () => {
      const confirmed = window.confirm(
        "Are you sure you want to leave this page?",
      );
      if (!confirmed) {
        // Push state back to prevent navigation
        window.history.pushState(null, "", window.location.href);
      } else {
        router.back();
      }
    };

    // Push a state so popstate fires on back
    window.history.pushState(null, "", window.location.href);

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  return (
    <div className="flex h-full flex-col">
      <StreamLineMap />
    </div>
  );
}
