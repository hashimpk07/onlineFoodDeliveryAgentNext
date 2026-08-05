/* eslint-disable */
import { useCallback, useEffect, useRef, useState } from "react";

interface TimerTime {
  hr: string;
  min: string;
  sec: string;
}

interface UseCountdownTimerOptions {
  time: string;
  reducing?: boolean;
  startTime?: string | null;
  totalSecondsWorked?: number;
  totalDuration?: number; // In seconds, e.g. 1800 for 30m
}

interface UseCountdownTimerReturn {
  hr: string;
  min: string;
  sec: string;
  elapsedHr: string;
  elapsedMin: string;
  elapsedSec: string;
  liveFormattedTotalTime: TimerTime;
  elapsed: boolean;
  showElapsedTime: boolean;
  setShowElapsedTime: (val: boolean) => void;
  hasStartTime: boolean;
  totalSecondsDelayed: number;
  progressPercent: number;
}

const leftPad = (value: number): string =>
  value < 10 ? `0${value}` : `${value}`;

const toSeconds = (dateStr: string) =>
  Math.floor(new Date(dateStr).getTime() / 1000);

export function useCountdownTimer({
  time,
  reducing = true,
  startTime = null,
  totalSecondsWorked = 0,
  totalDuration = 1800,
}: UseCountdownTimerOptions): UseCountdownTimerReturn {
  const [display, setDisplay] = useState({ hr: "00", min: "00", sec: "00" });
  const [elapsedDisplay, setElapsedDisplay] = useState({
    hr: "00",
    min: "00",
    sec: "00",
  });
  const [liveFormattedTotalTime, setLiveFormattedTotalTime] =
    useState<TimerTime>({ hr: "00", min: "00", sec: "00" });
  const [elapsed, setElapsed] = useState(false);
  const [showElapsedTime, setShowElapsedTime] = useState(false);

  const targetTimeRef = useRef(toSeconds(time));
  const startTimeSecondsRef = useRef(startTime ? toSeconds(startTime) : null);
  const baseSecondsWorkedRef = useRef(totalSecondsWorked);
  const secondsOffsetRef = useRef(0);
  const lastUpdateTimeRef = useRef(0);
  const elapsedRef = useRef(false);
  const reducingRef = useRef(reducing);
  const timeRef = useRef(time);

  // Keep refs in sync — no setState here
  useEffect(() => {
    lastUpdateTimeRef.current = Math.floor(Date.now() / 1000);
  }, []);

  useEffect(() => {
    targetTimeRef.current = toSeconds(time);
    timeRef.current = time;
    if (startTime) startTimeSecondsRef.current = toSeconds(startTime);
    elapsedRef.current = false;
    // elapsed state will naturally reset on next tick
  }, [time, startTime]);

  useEffect(() => {
    reducingRef.current = reducing;
  }, [reducing]);

  useEffect(() => {
    baseSecondsWorkedRef.current = totalSecondsWorked;
    secondsOffsetRef.current = 0;
    lastUpdateTimeRef.current = Math.floor(Date.now() / 1000);
  }, [totalSecondsWorked]);

  const tick = useCallback(() => {
    const currentTime = Math.floor(Date.now() / 1000);
    const isReducing = reducingRef.current;

    // --- Main timer ---
    let timeDifference: number;
    if (isReducing) {
      timeDifference = targetTimeRef.current - currentTime;
      if (!elapsedRef.current && timeDifference < 0) {
        elapsedRef.current = true;
        setElapsed(true); // ✅ inside interval callback, not directly in effect body
      }
      timeDifference = Math.abs(timeDifference);
    } else {
      timeDifference = currentTime - targetTimeRef.current;
    }

    setDisplay({
      hr: leftPad(Math.floor(timeDifference / 3600)),
      min: leftPad(Math.floor((timeDifference % 3600) / 60)),
      sec: leftPad(timeDifference % 60),
    });

    // --- Elapsed time (hover) ---
    if (startTime && startTimeSecondsRef.current !== null) {
      const elapsedTime = currentTime - startTimeSecondsRef.current;
      setElapsedDisplay({
        hr: leftPad(Math.floor(elapsedTime / 3600)),
        min: leftPad(Math.floor((elapsedTime % 3600) / 60)),
        sec: leftPad(elapsedTime % 60),
      });
    }

    // --- Live total worked time ---
    if (totalSecondsWorked) {
      const elapsedSinceUpdate = currentTime - lastUpdateTimeRef.current;
      if (timeRef.current && !isReducing) {
        secondsOffsetRef.current = elapsedSinceUpdate;
      }
      const totalSeconds =
        baseSecondsWorkedRef.current + secondsOffsetRef.current;
      setLiveFormattedTotalTime({
        hr: leftPad(Math.floor(totalSeconds / 3600)),
        min: leftPad(Math.floor((totalSeconds % 3600) / 60)),
        sec: leftPad(totalSeconds % 60),
      });
    }
  }, [startTime, totalSecondsWorked]); // minimal deps — rest via refs

  // ✅ tick() is called inside setInterval callback, not synchronously in effect body
  useEffect(() => {
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [tick]);

  const currentTimeSeconds = Math.floor(Date.now() / 1000);
  const totalSecondsDelayed = elapsed
    ? Math.max(0, currentTimeSeconds - targetTimeRef.current)
    : 0;

  const startTimestamp = targetTimeRef.current - totalDuration;
  const elapsedSinceStart = currentTimeSeconds - startTimestamp;
  const progressPercent = (elapsedSinceStart / totalDuration) * 100;

  return {
    hr: display.hr,
    min: display.min,
    sec: display.sec,
    elapsedHr: elapsedDisplay.hr,
    elapsedMin: elapsedDisplay.min,
    elapsedSec: elapsedDisplay.sec,
    liveFormattedTotalTime,
    elapsed,
    showElapsedTime,
    setShowElapsedTime,
    hasStartTime: !!startTime,
    totalSecondsDelayed,
    progressPercent,
  };
}
