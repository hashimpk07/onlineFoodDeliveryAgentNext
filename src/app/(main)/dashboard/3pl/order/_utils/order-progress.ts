export type ProgressResult = {
  width: number;
  text: string;
  type: "blue" | "orange" | "red";
  isPulse: boolean;
};

export function calculateOrderProgress(
  order: any,
  currentTime?: number,
): ProgressResult {
  if (!order?.start_time || !order?.end_time) {
    return {
      width: 0,
      text: "0%",
      type: "blue",
      isPulse: false,
    };
  }

  const start = new Date(order.start_time).getTime();
  const end = new Date(order.end_time).getTime();
  const now = currentTime ?? Date.now();

  if (now < start) {
    return {
      width: 0,
      text: "0%",
      type: "blue",
      isPulse: false,
    };
  }

  const total = end - start;
  const elapsed = now - start;

  let progress = Math.floor((elapsed / total) * 100);
  progress = Math.max(0, Math.min(progress, 100));

  if (progress >= 100) {
    return {
      width: 100,
      text: "Delayed",
      type: "red",
      isPulse: false,
    };
  }

  if (progress >= 75) {
    return {
      width: progress,
      text: `${progress}%`,
      type: "orange",
      isPulse: true,
    };
  }

  return {
    width: progress,
    text: `${progress}%`,
    type: "blue",
    isPulse: false,
  };
}
