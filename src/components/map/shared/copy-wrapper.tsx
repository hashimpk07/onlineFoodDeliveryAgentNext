import { ReactNode, useRef, useState } from "react";

import { Check, Copy } from "lucide-react";

interface CopyWrapperProps {
  children: ReactNode;
  copyText?: string;
  className?: string;
  containerClassName?: string;
}

export default function CopyWrapper({
  children,
  copyText,
  className = "",
  containerClassName = "",
}: CopyWrapperProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCopy = async (e: React.MouseEvent): Promise<void> => {
    e.stopPropagation();
    const text = copyText ?? contentRef.current?.innerText?.trim() ?? "";
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`group relative flex items-center gap-1.5 ${containerClassName}`}
      onClick={handleCopy}
    >
      <div
        ref={contentRef}
        title="Click to copy"
        className={`cursor-pointer select-none transition-all duration-200 ${className}`}
      >
        {children}
      </div>

      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-muted/50 opacity-0 transition-all group-hover:opacity-100 dark:bg-zinc-800">
        {copied ? (
          <Check className="h-3 w-3 text-green-500 animate-in zoom-in duration-300" />
        ) : (
          <Copy className="h-3 w-3 text-muted-foreground transition-transform active:scale-90" />
        )}
      </div>

      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-zinc-900 px-2 py-1 text-[10px] font-medium text-white animate-in fade-in slide-in-from-bottom-1 duration-200 dark:bg-zinc-100 dark:text-zinc-900 overflow-visible whitespace-nowrap z-50">
          Copied!
        </span>
      )}
    </div>
  );
}
