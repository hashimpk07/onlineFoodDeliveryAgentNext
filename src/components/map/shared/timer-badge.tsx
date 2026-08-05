import { Clock } from "lucide-react";

import { useCountdownTimer } from "@/app/[locale]/(main)/streamline-client/_hooks/use-count-down-timer";
import { cn } from "@/lib/utils";

interface TimerBadgeProps {
  time: string;
  reducing?: boolean;
  startTime?: string | null;
  totalSecondsWorked?: number;
  tooltipText?: string;
}

export default function TimerBadge({
  time,
  reducing = true,
  startTime = null,
  totalSecondsWorked = 0,
  tooltipText = "",
}: TimerBadgeProps) {
  const {
    hr,
    min,
    sec,
    elapsedHr,
    elapsedMin,
    elapsedSec,
    liveFormattedTotalTime,
    elapsed,
    showElapsedTime,
    setShowElapsedTime,
    hasStartTime,
  } = useCountdownTimer({ time, reducing, startTime, totalSecondsWorked });

  const renderTime = () => {
    if (totalSecondsWorked && !showElapsedTime) {
      return (
        <>
          <span>{liveFormattedTotalTime.hr}</span> :{" "}
          <span>{liveFormattedTotalTime.min}</span> :{" "}
          {liveFormattedTotalTime.sec}
        </>
      );
    }
    if (!showElapsedTime) {
      return (
        <>
          <span>{hr}</span> : <span>{min}</span> : {sec}
        </>
      );
    }
    return (
      <>
        <span>{elapsedHr}</span> : <span>{elapsedMin}</span> : {elapsedSec}
      </>
    );
  };

  return (
    <div>
      <div
        className="flex items-center gap-1 text-xs font-bold text-gray-600 dark:text-gray-300 ml-auto"
        title={tooltipText}
      >
        <Clock
          size={12}
          className={cn(
            "animate-pulse cursor-default",
            elapsed && reducing ? "text-red-500" : "text-green-500",
          )}
          onMouseEnter={() => hasStartTime && setShowElapsedTime(true)}
          onMouseLeave={() => setShowElapsedTime(false)}
        />
        &nbsp;:&nbsp;
        {renderTime()}
      </div>
    </div>
  );
}
