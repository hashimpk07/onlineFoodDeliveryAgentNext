"use client";

interface StatusCardProps {
  title: string;
  count?: number | string;
  color: "blue" | "red" | "green" | "gray";
  isActive?: boolean;
  onClick?: () => void;
}

export default function StatusCard({
  title,
  count,
  color,
  isActive = false,
  onClick,
}: StatusCardProps) {
  const colorMap = {
    blue: {
      bg: "bg-blue-100 dark:bg-blue-500/15",
      text: "text-blue-700 dark:text-blue-400",
      border: "border-black/5 dark:border-white/10",
    },
    red: {
      bg: "bg-red-100 dark:bg-red-500/15",
      text: "text-red-700 dark:text-red-400",
      border: "border-black/5 dark:border-white/10",
    },
    green: {
      bg: "bg-green-100 dark:bg-green-500/15",
      text: "text-green-700 dark:text-green-400",
      border: "border-black/5 dark:border-white/10",
    },
    gray: {
      bg: "bg-gray-100 dark:bg-gray-500/15",
      text: "text-gray-700 dark:text-gray-300",
      border: "border-black/5 dark:border-white/10",
    },
  };

  // eslint-disable-next-line security/detect-object-injection
  const styles = colorMap[color];

  return (
    <div
      onClick={onClick}
      className={[
        "rounded-xl px-6 py-2",
        "flex flex-col gap-6",
        "shadow-sm w-full cursor-pointer",
        "min-h-[50px] p-3",
        "transition-all duration-200",
        "hover:scale-[1.02] active:scale-[0.98]",
        "border",
        isActive
          ? "bg-primary border-primary shadow-md scale-[1.02]"
          : `${styles.bg} ${styles.border}`,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className={`font-bold ${isActive ? "text-white" : styles.text}`}>
        {title}
      </span>
      {count !== undefined && (
        <span className={`font-bold ${isActive ? "text-white" : styles.text}`}>
          {count}
        </span>
      )}
    </div>
  );
}
